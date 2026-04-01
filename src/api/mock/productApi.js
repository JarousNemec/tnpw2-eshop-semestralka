import {delay} from '../utils.js';

export function createProductApi(db) {
    return {

        /**
         * get all products in db
         * */
        async getProducts() {
            await delay();
            return {status: 'SUCCESS', products: structuredClone(db.products)};
        },

        /**
         * get specific product by id
         * @param {{ productId : string}} context
         */
        async getProductById({productId}) {
            await delay();

            const product = db.products.find((p) => p.productId === productId);

            if (!product) {
                return {status: 'REJECTED', reason: 'Produkt nenalezen'};
            }

            return {status: 'SUCCESS', product: structuredClone(product)};
        },
    };
}
