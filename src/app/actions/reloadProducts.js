import {ProductModel} from '../../models/ProductModel.js';

/**
 * Znovu načte produkty z API a aktualizuje state.shop.products.
 * Lze volat přímo z jiných akcí nebo dispatchovat jako akci.
 * @param {{ store, api }} context
 */
export async function reloadProducts({store, api}) {
    //get current products list from api
    const response = await api.products.getProducts();

    //handle errors
    if (response.status !== 'SUCCESS') return;

    //map objects from response to ProductModel type in app
    const products = response.products.map(
        (p) => new ProductModel(p.productId, p.name, p.description, p.price, p.amount, p.imageUrl)
    );

    //update products list in shop state
    store.setState((state) => ({
        ...state,
        shop: {...state.shop, products},
    }));
}
