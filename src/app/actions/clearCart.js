import { CartModel } from '../../models/CartModel.js';
import { CartStates } from '../../enums/states.js';
// TODO: refactor code
export async function clearCart({ store }) {
    store.setState((state) => ({
        ...state,
        shop: { ...state.shop, cart: new CartModel([], CartStates.EMPTY) },
    }));
}
