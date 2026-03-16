/** @type {Readonly<{APP_INIT: string, DISPLAY_ERROR: string, ENTER_SHOP_VIEW: string, ENTER_CART_VIEW: string, ENTER_ORDER_VIEW: string}>} */
export const AppActions = Object.freeze({
    APP_INIT: "APP_INIT",
    DISPLAY_ERROR: "DISPLAY_ERROR",
    ENTER_SHOP_VIEW: "ENTER_SHOP_VIEW",
    ENTER_CART_VIEW: "ENTER_CART_VIEW",
    ENTER_ORDER_VIEW: "ENTER_ORDER_VIEW",
});

/** @type {Readonly<{ADD_ITEM: string, REMOVE_ITEM: string, UPDATE_ITEM: string, CLEAR: string}>} */
export const CartActions = Object.freeze({
    ADD_ITEM: "CART_ADD_ITEM",
    REMOVE_ITEM: "CART_REMOVE_ITEM",
    UPDATE_ITEM: "CART_UPDATE_ITEM",
    CLEAR: "CLEAR_CART",
});

/** @type {Readonly<{CREATE: string, CANCEL: string, CONFIRM: string, SHIP: string, FINISH: string}>} */
export const OrderActions = Object.freeze({
    CREATE: "CREATE_ORDER",
    CANCEL: "CANCEL_ORDER",
    CONFIRM: "CONFIRM_ORDER",
    SHIP: "SHIP_ORDER",
    FINISH: "FINISH_ORDER",
});

/** @type {Readonly<{LOG_IN: string, LOG_OUT: string}>} */
export const UserActions = Object.freeze({
    LOG_IN: "LOG_USER_IN",
    LOG_OUT: "LOG_USER_OUT",
});
