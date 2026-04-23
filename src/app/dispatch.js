import { appInit } from './actions/appInit.js';
import { recoverFromError } from './actions/recoverFromError.js';
import { displayError } from './actions/displayError.js';
import { enterHomeView } from './actions/enterHomeView.js';
import { enterCartView } from './actions/enterCartView.js';
import { enterOrderView } from './actions/enterOrderView.js';
import { enterOrderSuccessView } from './actions/enterOrderSuccessView.js';
import { addToCart } from './actions/addToCart.js';
import { removeFromCart } from './actions/removeFromCart.js';
import { updateCartItem } from './actions/updateCartItem.js';
import { clearCart } from './actions/clearCart.js';
import { createOrder } from './actions/createOrder.js';
import { cancelOrder } from './actions/cancelOrder.js';
import { confirmOrder } from './actions/confirmOrder.js';
import { shipOrder } from './actions/shipOrder.js';
import { finishOrder } from './actions/finishOrder.js';
import { logIn } from './actions/logIn.js';
import { logOut } from './actions/logOut.js';
import { reloadProducts } from './actions/reloadProducts.js';
import { reloadOrders } from './actions/reloadOrders.js';
import { reloadUser } from './actions/reloadUser.js';
import { AppActions, CartActions, OrderActions, UserActions } from '../enums/actions.js';


export function createDispatcher(store, api) {
    return async function dispatch(action) {
        const { type, payload = {} } = action ?? {};

        switch (type) {

            // application actions
            case AppActions.APP_INIT:
                return appInit({ store, api, dispatch });

            case AppActions.RECOVER_FROM_ERROR:
                return recoverFromError(store);

            case AppActions.DISPLAY_ERROR:
                return displayError({ store, payload });

            case AppActions.ENTER_HOME_VIEW:
                return enterHomeView({ store });

            case AppActions.ENTER_CART_VIEW:
                return enterCartView({ store });

            case AppActions.ENTER_ORDER_VIEW:
                return enterOrderView({ store });

            case AppActions.ENTER_ORDER_SUCCESS_VIEW:
                return enterOrderSuccessView({ store });

            // cart actions
            case CartActions.ADD_ITEM:
                return addToCart({ store, payload });

            case CartActions.REMOVE_ITEM:
                return removeFromCart({ store, payload });

            case CartActions.UPDATE_ITEM:
                return updateCartItem({ store, payload });

            case CartActions.CLEAR:
                return clearCart({ store });

            // order actions
            case OrderActions.CREATE:
                return createOrder({ store, api, dispatch, payload });

            case OrderActions.CANCEL:
                return cancelOrder({ store, api, dispatch, payload });

            case OrderActions.CONFIRM:
                return confirmOrder({ store, payload });

            case OrderActions.SHIP:
                return shipOrder({ store, payload });

            case OrderActions.FINISH:
                return finishOrder({ store, payload });

            // user actions
            case UserActions.LOG_IN:
                return logIn({ store, api, dispatch, payload });

            case UserActions.LOG_OUT:
                return logOut({ store, api });

            // reload actions
            case AppActions.RELOAD_PRODUCTS:
                return reloadProducts({ store, api });

            case AppActions.RELOAD_ORDERS:
                return reloadOrders({ store, api });

            case AppActions.RELOAD_USER:
                return reloadUser({ store, api });

            // default reaction to unknown action
            default:
                console.warn(`Unknown action type: ${type}`);
        }
    };
}
