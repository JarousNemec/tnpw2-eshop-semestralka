import {CartModel} from '../../models/CartModel.js';
import {CartStates} from '../../enums/states.js';

/**
 * @param {{ store, payload: { productId: string } }} context
 */
export async function removeFromCart({store, payload}) {
    //load operation parameters
    const {productId} = payload;

    //filter from cart all products with the given id, than update cart state and update app shop state
    store.setState((state) => {
        const updatedProducts = state.shop.cart.products.filter((p) => p.productId !== productId);
        const cartState = updatedProducts.length === 0 ? CartStates.EMPTY : CartStates.ACTIVE;

        return {
            ...state,
            shop: {
                ...state.shop,
                cart: new CartModel(updatedProducts, cartState),
            },
        };
    });
}
