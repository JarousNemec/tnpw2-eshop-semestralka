import {AppViews} from "../enums/app/AppViews.js";
import {UserModel} from "../models/UserModel.js";
import {UserStates} from "../enums/user/UserStates.js";
import {UiStates} from "../enums/app/UiStates.js";

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
        }
    };
}
