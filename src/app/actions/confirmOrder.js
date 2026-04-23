import {OrderModel} from '../../models/OrderModel.js';
import {UserModel} from '../../models/UserModel.js';
import {OrderStates, UserRoles} from '../../enums/states.js';
import {AppActions} from '../../enums/actions.js';

/**
 * @param {{ store, dispatch, payload: { orderId: string } }} context
 */
export async function confirmOrder({store, dispatch, payload}) {

    //load operation parameters
    const {orderId} = payload;
    const user = store.getState().auth.user;

    //check if user is permitted to executed the operation
    if (user.role !== UserRoles.ADMIN) {
        dispatch({type: AppActions.DISPLAY_ERROR, payload: {message: 'Nedostatečná oprávnění'}});
        return;
    }

    store.setState((state) => {
        //get current user
        const u = state.auth.user;

        //update specific order in user list
        const updatedOrders = u.orders.map((o) =>
            o.orderId === orderId
                ? new OrderModel(o.orderId, o.products, o.address, o.user, OrderStates.CONFIRMED)
                : o
        );

        //update user state
        const updatedUser = new UserModel(u.state, u.role, u.userId, u.token, u.username, u.password, updatedOrders);

        //update app state
        return {...state, auth: {user: updatedUser}};
    });
}
