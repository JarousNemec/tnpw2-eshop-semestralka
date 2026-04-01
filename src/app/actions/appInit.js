import {UserRoles, UserStates, CartStates, UiStates} from "../../enums/states.js";
import {AppViews} from "../../enums/views.js";
import {UserModel} from "../../models/UserModel.js";
import {CartModel} from "../../models/CartModel.js";
import {ProductModel} from "../../models/ProductModel.js";

/**
 * @param {Object} context
 * @param {Object} context.store - State management aplikace
 * @param {ReturnType<typeof import('../../api/mockApi.js').createApi>} context.api - Instance Mock API
 * @param {Function} context.dispatch - Funkce pro odesílání akcí
 */
export async function appInit({store, api, dispatch}) {
    //move app in to loading state
    store.setState((state) => ({
        ...state,
        ui: {...state.ui, status: UiStates.LOADING, errorMessage: null},
    }));

    //load products for home page
    const response = await api.products.getProducts();

    //handle request error
    if (response.status !== 'SUCCESS') {
        store.setState((state) => ({
            ...state,
            ui: {...state.ui, status: UiStates.ERROR, errorMessage: response.reason},
        }));
        return;
    }

    //get products from response
    const products = response.products.map(
        (p) => new ProductModel(p.productId, p.name, p.description, p.price, p.amount, p.imageUrl)
    );

    //initialized complete default app state and set loaded products to shop state mechanism
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
        shop: {products, cart: new CartModel([], CartStates.EMPTY)}
    }));
}
