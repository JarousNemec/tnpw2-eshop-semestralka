export class ProductModel {
    /**
     * @param {string} productId - Unikátní ID produktu
     * @param {string} name - Název produktu
     * @param {string} description - Krátký popis
     * @param {number} price - Cena za kus
     * @param {number} amount - Skladová zásoba (počet kusů)
     * @param {string} imageUrl - Cesta k obrázku nebo URL
     */
    constructor(productId, name, description, price, amount, imageUrl) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.amount = amount;
        this.imageUrl = imageUrl;
    }
}