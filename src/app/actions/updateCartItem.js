import { ProductModel } from '../../models/ProductModel.js';
import { CartModel } from '../../models/CartModel.js';
import { CartStates } from '../../enums/states.js';
// TODO: refactor code
/**
 * @param {{ store, payload: { productId: string, quantity: number } }} context
 */
export async function updateCartItem({ store, payload }) {
    const { productId, quantity } = payload;

    store.setState((state) => {
        const updatedProducts = quantity === 0
            ? state.shop.cart.products.filter((p) => p.productId !== productId)
            : state.shop.cart.products.map((p) =>
                p.productId === productId
                    ? new ProductModel(p.productId, p.name, p.description, p.price, quantity, p.imageUrl)
                    : p
            );

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
