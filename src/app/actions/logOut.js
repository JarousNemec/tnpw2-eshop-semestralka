import { UserModel } from '../../models/UserModel.js';
import { CartModel } from '../../models/CartModel.js';
import { UserStates, UserRoles, CartStates } from '../../enums/states.js';

/**
 * @param {{ store, api }} context
 */
export async function logOut({ store, api }) {

    //get user token from auth context
    const token = store.getState().auth.user.token;

    //logout user on backend
    await api.auth.logout(token);

    //remove current user from app state and enter anonymous state
    //todo: je dobré že se při odhlášení smaže i košík nebo ne???
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
