import { ProductModel } from '../../models/ProductModel.js';
import { OrderModel } from '../../models/OrderModel.js';
import { AddressModel } from '../../models/AddressModel.js';
import { UserModel } from '../../models/UserModel.js';
import { UserStates, UserRoles } from '../../enums/states.js';
// TODO: refactor code
/**
 * Ověří token, načte čerstvá data uživatele a jeho objednávky z API.
 * Pokud token není platný, resetuje uživatele na anonymního.
 * Lze volat přímo z jiných akcí nebo dispatchovat jako akci.
 * @param {{ store, api }} context
 */
export async function reloadUser({ store, api }) {
    const token = store.getState().auth.user.token;
    if (!token) return;

    const whoAmIResponse = await api.auth.whoAmI(token);

    if (whoAmIResponse.status !== 'SUCCESS') {
        store.setState((state) => ({
            ...state,
            auth: {
                user: new UserModel(UserStates.ANONYMOUS, UserRoles.ANONYMOUS, '', '', '', '', []),
            },
        }));
        return;
    }

    const ordersResponse = await api.orders.getUserOrders(token);
    const orders = ordersResponse.status === 'SUCCESS'
        ? ordersResponse.orders.map((o) => {
            const products = o.items.map((i) => new ProductModel(i.productId, i.name, i.description, i.price, i.amount, i.imageUrl));
            const address = new AddressModel(o.address.country, o.address.city, o.address.street, o.address.postcode, o.address.houseNumber);
            return new OrderModel(o.orderId, products, address, null, o.state);
        })
        : [];

    store.setState((state) => {
        const u = state.auth.user;
        const role = whoAmIResponse.role === UserRoles.ADMIN ? UserRoles.ADMIN : UserRoles.CUSTOMER;
        const updatedUser = new UserModel(UserStates.AUTHENTICATED, role, whoAmIResponse.userId, token, whoAmIResponse.email, '', orders);
        return { ...state, auth: { user: updatedUser } };
    });
}
