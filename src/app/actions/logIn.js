import { ProductModel } from '../../models/ProductModel.js';
import { OrderModel } from '../../models/OrderModel.js';
import { AddressModel } from '../../models/AddressModel.js';
import { UserModel } from '../../models/UserModel.js';
import { UserStates, UserRoles, OrderStates } from '../../enums/states.js';
import { AppActions } from '../../enums/actions.js';
// TODO: refactor code
/**
 * @param {{ store, api, dispatch, payload: { email: string, password: string } }} context
 */
export async function logIn({ store, api, dispatch, payload }) {
    const { email, password } = payload;

    const response = await api.auth.login(email, password);

    if (response.status !== 'SUCCESS') {
        dispatch({ type: AppActions.DISPLAY_ERROR, payload: { message: response.reason } });
        return;
    }

    const ordersResponse = await api.orders.getUserOrders(response.token);
    const orders = ordersResponse.status === 'SUCCESS'
        ? ordersResponse.orders.map((o) => {
            const products = o.items.map((i) => new ProductModel(i.productId, i.name, i.description, i.price, i.amount, i.imageUrl));
            const address = new AddressModel(o.address.country, o.address.city, o.address.street, o.address.postcode, o.address.houseNumber);
            return new OrderModel(o.orderId, products, address, null, o.state);
        })
        : [];

    const role = response.role === UserRoles.ADMIN ? UserRoles.ADMIN : UserRoles.CUSTOMER;
    const user = new UserModel(UserStates.AUTHENTICATED, role, response.userId, response.token, response.email, '', orders);

    store.setState((state) => ({
        ...state,
        auth: { user },
    }));
}
