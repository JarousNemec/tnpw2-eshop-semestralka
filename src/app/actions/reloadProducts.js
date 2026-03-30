import { ProductModel } from '../../models/ProductModel.js';
// TODO: refactor code
/**
 * Znovu načte produkty z API a aktualizuje state.shop.products.
 * Lze volat přímo z jiných akcí nebo dispatchovat jako akci.
 * @param {{ store, api }} context
 */
export async function reloadProducts({ store, api }) {
    const response = await api.products.getProducts();

    if (response.status !== 'SUCCESS') return;

    const products = response.products.map(
        (p) => new ProductModel(p.productId, p.name, p.description, p.price, p.amount, p.imageUrl)
    );

    store.setState((state) => ({
        ...state,
        shop: { ...state.shop, products },
    }));
}
