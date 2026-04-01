import {CartModel} from '../../models/CartModel.js';
import {CartStates} from '../../enums/states.js';

/**
 * @param {{ store }} context
 */
export async function clearCart({store}) {

    //update app state with clear new instance of cart
    store.setState((state) => ({
        ...state,
        shop: {...state.shop, cart: new CartModel([], CartStates.EMPTY)},
    }));
}
