import {UserRoles} from "../enums/user/UserRoles.js";
import {AppViews} from "../enums/app/AppViews.js";
import {UiStates} from "../enums/app/UiStates.js";
import {UserModel} from "../models/UserModel.js";
import {UserStates} from "../enums/user/UserStates.js";
import {CartModel} from "../models/CartModel.js";
import {CartStates} from "../enums/cart/CartStates.js";
import {AppStates} from "../enums/app/AppStates.js";
/**
 * @param {Object} context
 * @param {Object} context.store - State management aplikace
 * @param {ReturnType<typeof import('./api/mockApi.js').createApi>} context.api - Instance tvého Mock API
 * @param {Function} context.dispatch - Funkce pro odesílání akcí
 */
export async function appInit({store, api, dispatch}) {
    store.setState((state) => ({
        ...state,
        ui: {...state.ui, status: AppStates.LOADING, errorMessage: null},
    }));

    try {
        const products = await api.getProducts();
        store.setState((state) => ({
            ...state,
            auth: {
                user: new UserModel(UserStates.ANONYMOUS, UserRoles.ANONYMOUS, "", "", "", "", [])
            },
            ui: {
                ...state.ui,
                view: AppViews.HOME,
                status: UiStates.READY,
                errorMessage: null
            },
            shop: {products: products, cart: new CartModel([], CartStates.EMPTY)}
        }));
        // TODO: Načtěte potřebná data (produkty, objednávky, ...)
    } catch (e) {
        store.setState((state) => ({
            ...state,
            ui: {...state.ui, status: UiStates.ERROR, errorMessage: e.message},
        }));
    }
}
