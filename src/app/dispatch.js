import {appInit} from './appInit.js';
import {recoverFromError} from './actions/recoverFromError.js';
import {AppActions, CartActions, OrderActions, UserActions} from "../enums/actions.js";


export function createDispatcher(store, api) {
    return async function dispatch(action) {
        const {type, payload = {}} = action ?? {};

        switch (type) {

            // application inside actions
            case AppActions.APP_INIT:
                return appInit({store, api, dispatch});

            case 'RECOVER_FROM_ERROR':
                return recoverFromError(store);

            case AppActions.DISPLAY_ERROR:
                break;
            case AppActions.ENTER_CART_VIEW:
                break;
            case AppActions.ENTER_ORDER_VIEW:
                break;
            case AppActions.ENTER_SHOP_VIEW:
                break;

            // cart state actions
            case CartActions.ADD_ITEM:
                break;
            case CartActions.CLEAR:
                break;
            case CartActions.REMOVE_ITEM:
                break;
            case CartActions.UPDATE_ITEM:
                break;

            // order state actions
            case OrderActions.CREATE:
                break;
            case OrderActions.SHIP:
                break;
            case OrderActions.CANCEL:
                break;
            case OrderActions.CONFIRM:
                break;
            case OrderActions.FINISH:
                break;

            // user state actions
            case UserActions.LOG_IN:
                break;
            case UserActions.LOG_OUT:
                break;

            // default reaction to unknown action
            default:
                console.warn(`Unknown action type: ${type}`);
        }
    };
}
