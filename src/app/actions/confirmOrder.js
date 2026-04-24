import { UserRoles } from '../../enums/states.js';
import { AppActions } from '../../enums/actions.js';

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
        const updatedAdminOrders = (state.admin?.allOrders || []).map((o) =>
            o.orderId === orderId
                ? { ...o, state: 'ORDER_CONFIRMED' }
                : o
        );

        return {
            ...state, 
            admin: { ...state.admin, allOrders: updatedAdminOrders }
        };
    });
}
