export class OrderModel {
    /**
     * @param {string} orderId - Unikátní identifikátor objednávky
     * @param {import('./ProductModel.js').ProductModel[]} products - Pole zakoupených produktů
     * @param {import('./AddressModel.js').AddressModel} address - Instance dodací adresy
     * @param {import('./UserModel.js').UserModel} user - Instance uživatele, který objednal
     * @param {import('../enums/order/OrderStates.js').OrderStates} state - Stav objednávky (např. 'rozpracováno', 'zaplaceno', 'odesláno')
     */
    constructor(orderId, products, address, user, state) {
        this.orderId = orderId;
        this.products = products; // Tady editor uvidí metody z ProductModel
        this.address = address;   // Tady uvidí metody z AddressModel
        this.user = user;         // Tady uvidí jméno, roli atd. z UserModel
        this.state = state;
        this.createdAt = new Date();
    }

    /**
     * Spočítá celkovou cenu všech produktů v objednávce
     * @returns {number}
     */
    getTotalPrice() {
        return this.products.reduce((sum, product) => sum + (product.price * product.amount), 0);
    }
}