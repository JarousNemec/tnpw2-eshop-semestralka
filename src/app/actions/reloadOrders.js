import {ProductModel} from '../../models/ProductModel.js';
import {OrderModel} from '../../models/OrderModel.js';
import {AddressModel} from '../../models/AddressModel.js';
import {UserModel} from '../../models/UserModel.js';

/**
 * Znovu načte objednávky přihlášeného uživatele z API a aktualizuje state.auth.user.orders.
 * Lze volat přímo z jiných akcí nebo dispatchovat jako akci.
 * @param {{ store, api }} context
 */
export async function reloadOrders({store, api}) {
    //load operation parameters
    const token = store.getState().auth.user.token;
    //check if user is logged in
    if (!token) return;

    //load user orders from BE
    const response = await api.orders.getUserOrders(token);

    //handle errors
    if (response.status !== 'SUCCESS') return;

    //map response to js objects
    const orders = response.orders.map((o) => {
        const products = o.items.map((i) => new ProductModel(i.productId, i.name, i.description, i.price, i.amount, i.imageUrl));
        const address = new AddressModel(o.address.country, o.address.city, o.address.street, o.address.postcode, o.address.houseNumber);
        return new OrderModel(o.orderId, products, address, null, o.state);
    });

    //update user orders state
    store.setState((state) => {
        const u = state.auth.user;
        const updatedUser = new UserModel(u.state, u.role, u.userId, u.token, u.username, u.password, orders);
        return {...state, auth: {user: updatedUser}};
    });
}
