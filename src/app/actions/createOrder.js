import { ProductModel } from '../../models/ProductModel.js';
import { OrderModel } from '../../models/OrderModel.js';
import { AddressModel } from '../../models/AddressModel.js';
import { CartModel } from '../../models/CartModel.js';
import { UserModel } from '../../models/UserModel.js';
import { CartStates, OrderStates } from '../../enums/states.js';
import { AppActions } from '../../enums/actions.js';
import { reloadProducts } from './reloadProducts.js';
// TODO: refactor code
/**
 * @param {{ store, api, dispatch, payload: { address: import('../../models/AddressModel.js').AddressModel } }} context
 */
export async function createOrder({ store, api, dispatch, payload }) {
    const { address } = payload;
    const state = store.getState();
    const token = state.auth.user.token;
    const cartProducts = state.shop.cart.products;

    const items = cartProducts.map((p) => ({ productId: p.productId, quantity: p.amount }));

    const response = await api.orders.createOrder(token, items, address);

    if (response.status !== 'SUCCESS') {
        dispatch({ type: AppActions.DISPLAY_ERROR, payload: { message: response.reason } });
        return;
    }

    const o = response.order;
    const orderProducts = o.items.map((i) => new ProductModel(i.productId, i.name, i.description, i.price, i.amount, i.imageUrl));
    const orderAddress = new AddressModel(o.address.country, o.address.city, o.address.street, o.address.postcode, o.address.houseNumber);
    const order = new OrderModel(o.orderId, orderProducts, orderAddress, state.auth.user, OrderStates.CREATED);

    store.setState((s) => {
        const u = s.auth.user;
        const updatedUser = new UserModel(u.state, u.role, u.userId, u.token, u.username, u.password, [...u.orders, order]);
        return {
            ...s,
            auth: { user: updatedUser },
            shop: { ...s.shop, cart: new CartModel([], CartStates.EMPTY) },
        };
    });

    await reloadProducts({ store, api });

    dispatch({ type: AppActions.ENTER_ORDER_VIEW });
}
