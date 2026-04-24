import {AppViews} from "../enums/views.js";
import {UserModel} from "../models/UserModel.js";
import {UserStates, UiStates} from "../enums/states.js";

export function createInitialState() {
    return {
        // ====== identity  ======
        auth: {
            user: new UserModel(UserStates.ANONYMOUS, "", "", "", "", "", [])
        },

        // ====== UI state =========
        ui: {
            view: AppViews.HOME,
            status: UiStates.LOADING,
            errorMessage: null,
        },

        shop: {
            products: [],
            cart: null
        },

        admin: {
            allOrders: []
        }
    };
}
