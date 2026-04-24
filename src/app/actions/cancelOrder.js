import {OrderModel} from '../../models/OrderModel.js';
import {UserModel} from '../../models/UserModel.js';
import {OrderStates} from '../../enums/states.js';
import {AppActions} from '../../enums/actions.js';

/**
 * @param {{ store, api, dispatch, payload: { orderId: string } }} context
 */
export async function cancelOrder({store, api, dispatch, payload}) {

    //load operation parameters
    const {orderId} = payload;
    const token = store.getState().auth.user.token;

    //execute order cancellation operation
    const response = await api.orders.cancelOrder(token, orderId);

    //handle operation fail
    if (response.status !== 'SUCCESS') {
        dispatch({type: AppActions.DISPLAY_ERROR, payload: {message: response.reason}});
        return;
    }

    //update application state especially user state
    store.setState((state) => {
        const u = state.auth.user;
        const updatedOrders = u.orders.map((o) =>
            o.orderId === orderId
                ? new OrderModel(o.orderId, o.products, o.address, o.user, OrderStates.CANCELLED)
                : o
        );
        const updatedUser = new UserModel(u.state, u.role, u.userId, u.token, u.username, u.password, updatedOrders);
        const updatedAdminOrders = (state.admin?.allOrders || []).map((o) => o.orderId === orderId ? { ...o, state: 'ORDER_CANCELLED' } : o
        );
        return {...state, auth: {user: updatedUser}, admin: { allOrders: updatedAdminOrders}};
    });
}
