export class CartModel {
    /**
     * @param {import('./ProductModel.js').ProductModel[]} products - Pole vybraných produktů
     * @param {import('../enums/cart/CartStates.js').CartStates} state - Stav objednávky (např. 'rozpracováno', 'zaplaceno', 'odesláno')
     */
    constructor(products, state) {
        this.products = products;
        this.state = state;
    }

    /**
     * Spočítá celkovou cenu všech produktů v košíku
     * @returns {number}
     */
    getTotalPrice() {
        return this.products.reduce((sum, product) => sum + (product.price * product.amount), 0);
    }
}