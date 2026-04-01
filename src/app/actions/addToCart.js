import {ProductModel} from '../../models/ProductModel.js';
import {CartModel} from '../../models/CartModel.js';
import {CartStates} from '../../enums/states.js';

/**
 * @param {{ store, payload: { productId: string, amount?: number } }} context
 */
export async function addToCart({store, payload}) {
    //load params from payload
    const {productId, amount = 1} = payload;

    //update state
    store.setState((state) => {

        //get complete product record
        const product = state.shop.products.find((p) => p.productId === productId);
        if (!product) return state;

        //see if product is already in cart
        const existing = state.shop.cart.products.find((p) => p.productId === productId);

        //create new cart product list updated based on if the product is contained in cart or not
        const updatedProducts = existing
            ? state.shop.cart.products.map((p) =>
                p.productId === productId
                    ? new ProductModel(p.productId, p.name, p.description, p.price, p.amount + amount, p.imageUrl)
                    : p
            )
            : [...state.shop.cart.products, new ProductModel(product.productId, product.name, product.description, product.price, amount, product.imageUrl)];

        //return new state
        return {
            ...state,
            shop: {
                ...state.shop,
                cart: new CartModel(updatedProducts, CartStates.ACTIVE),
            },
        };
    });
}
