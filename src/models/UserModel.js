export class UserModel {
    /**
     * Vytvoří nového uživatele
     * @param {import('../enums/user/UserStates.js').UserStates} state - Stav zda je uživatel přihlá
     * @param {import('../enums/user/UserRoles.js').UserRoles} role - Role uživatele (např. 'admin', 'user')
     * @param {string} userId - Unikátní ID z databáze
     * @param {string} token - Autentizační token
     * @param {string} username - Přihlašovací jméno
     * @param {string} password - Heslo
     * @param {import('./OrderModel.js').OrderModel[]} orders - Pole zakoupených produktů
     */
    constructor(state, role, userId, token, username, password, orders) {
        this.state = state;
        this.role = role;
        this.userId = userId;
        this.token = token;
        this.username = username;
        this.password = password;
        this.orders = orders;
    }
}