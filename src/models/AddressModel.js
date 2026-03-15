export class AddressModel {
    /**
     * @param {string} country - Název státu
     * @param {string} city - Název města
     * @param {string} street - Název ulice
     * @param {string} postcode - PSČ (může být "150 00" nebo 15000)
     * @param {string} houseNumber - Číslo popisné/orientační
     */
    constructor(country, city, street, postcode, houseNumber) {
        this.country = country;
        this.city = city;
        this.street = street;
        this.postcode = postcode;
        this.houseNumber = houseNumber;
    }

    /**
     * Vrátí adresu zformátovanou pro tisk na štítek
     * @returns {string}
     */
    getFullAddress() {
        return `${this.street} ${this.houseNumber}, ${this.postcode} ${this.city}, ${this.country}`;
    }
}