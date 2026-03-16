import {UserRoles, UserStates, CartStates, UiStates} from "../enums/states.js";
import {AppViews} from "../enums/views.js";
import {UserModel} from "../models/UserModel.js";
import {CartModel} from "../models/CartModel.js";
/**
 * @param {Object} context
 * @param {Object} context.store - State management aplikace
 * @param {ReturnType<typeof import('./api/mockApi.js').createApi>} context.api - Instance tvého Mock API
 * @param {Function} context.dispatch - Funkce pro odesílání akcí
 */
export async function appInit({store, api, dispatch}) {
    store.setState((state) => ({
        ...state,
        ui: {...state.ui, status: UiStates.LOADING, errorMessage: null},
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
