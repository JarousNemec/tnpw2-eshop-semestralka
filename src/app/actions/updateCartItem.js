import {ProductModel} from '../../models/ProductModel.js';
import {CartModel} from '../../models/CartModel.js';
import {CartStates} from '../../enums/states.js';

/**
 * @param {{ store, payload: { productId: string, quantity: number } }} context
 */
export async function updateCartItem({store, payload}) {
    //load operation parameters
    const {productId, quantity} = payload;

    store.setState((state) => {

        // if quantity is 0 completely remove product record from cart, if it is greater than 0 than update the quantity
        const updatedProducts = quantity === 0
            ? state.shop.cart.products.filter((p) => p.productId !== productId)
            : state.shop.cart.products.map((p) =>
                p.productId === productId
                    ? new ProductModel(p.productId, p.name, p.description, p.price, quantity, p.imageUrl)
                    : p
            );

        //check and update cart state
        const cartState = updatedProducts.length === 0 ? CartStates.EMPTY : CartStates.ACTIVE;

        //update shop cart state
        return {
            ...state,
            shop: {
                ...state.shop,
                cart: new CartModel(updatedProducts, cartState),
            },
        };
    });
}
