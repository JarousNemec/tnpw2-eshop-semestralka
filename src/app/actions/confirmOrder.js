import {OrderModel} from '../../models/OrderModel.js';
import {UserModel} from '../../models/UserModel.js';
import {OrderStates, UserRoles} from '../../enums/states.js';
import {AppActions} from '../../enums/actions.js';

/**
 * @param {{ store, dispatch, payload: { orderId: string } }} context
 */
export async function confirmOrder({store, dispatch, payload}) {
    const {orderId} = payload;
    const user = store.getState().auth.user;

    if (user.role !== UserRoles.ADMIN) {
        dispatch({type: AppActions.DISPLAY_ERROR, payload: {message: 'Nedostatečná oprávnění'}});
        return;
    }

    store.setState((state) => {
        const u = state.auth.user;
        const updatedOrders = u.orders.map((o) =>
            o.orderId === orderId
                ? new OrderModel(o.orderId, o.products, o.address, o.user, OrderStates.CONFIRMED)
                : o
        );
        const updatedUser = new UserModel(u.state, u.role, u.userId, u.token, u.username, u.password, updatedOrders);
        return {...state, auth: {user: updatedUser}};
    });
}
