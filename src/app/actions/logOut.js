import { UserModel } from '../../models/UserModel.js';
import { CartModel } from '../../models/CartModel.js';
import { UserStates, UserRoles, CartStates } from '../../enums/states.js';
// TODO: refactor code
/**
 * @param {{ store, api }} context
 */
export async function logOut({ store, api }) {
    const token = store.getState().auth.user.token;

    await api.auth.logout(token);

    store.setState((state) => ({
        ...state,
        auth: {
            user: new UserModel(UserStates.ANONYMOUS, UserRoles.ANONYMOUS, '', '', '', '', []),
        },
        shop: {
            ...state.shop,
            cart: new CartModel([], CartStates.EMPTY),
        },
    }));
}
