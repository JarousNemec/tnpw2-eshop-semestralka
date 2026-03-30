import { CartModel } from '../../models/CartModel.js';
import { CartStates } from '../../enums/states.js';
// TODO: refactor code
/**
 * @param {{ store, payload: { productId: string } }} context
 */
export async function removeFromCart({ store, payload }) {
    const { productId } = payload;

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
