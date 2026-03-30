import { ProductModel } from '../../models/ProductModel.js';
import { CartModel } from '../../models/CartModel.js';
import { CartStates } from '../../enums/states.js';

// TODO: refactor code

/**
 * @param {{ store, payload: { productId: string, amount?: number } }} context
 */
export async function addToCart({ store, payload }) {
    const { productId, amount = 1 } = payload;

    store.setState((state) => {
        const product = state.shop.products.find((p) => p.productId === productId);
        if (!product) return state;

        const existing = state.shop.cart.products.find((p) => p.productId === productId);

        const updatedProducts = existing
            ? state.shop.cart.products.map((p) =>
                p.productId === productId
                    ? new ProductModel(p.productId, p.name, p.description, p.price, p.amount + amount, p.imageUrl)
                    : p
            )
            : [...state.shop.cart.products, new ProductModel(product.productId, product.name, product.description, product.price, amount, product.imageUrl)];

        return {
            ...state,
            shop: {
                ...state.shop,
                cart: new CartModel(updatedProducts, CartStates.ACTIVE),
            },
        };
    });
}
