/** @type {Readonly<{LOADING: string, READY: string, ERROR: string}>} */
export const UiStates = Object.freeze({
    LOADING: "LOADING",
    READY: "READY",
    ERROR: "ERROR",
});

/** @type {Readonly<{ANONYMOUS: string, AUTHENTICATED: string}>} */
export const UserStates = Object.freeze({
    ANONYMOUS: "ANONYMOUS",
    AUTHENTICATED: "AUTHENTICATED",
});

/** @type {Readonly<{ANONYMOUS: string, ADMIN: string, CUSTOMER: string}>} */
export const UserRoles = Object.freeze({
    ANONYMOUS: "ANONYMOUS",
    ADMIN: "ADMIN",
    CUSTOMER: "CUSTOMER",
});

/** @type {Readonly<{EMPTY: string, ACTIVE: string, CHECKING_OUT: string}>} */
export const CartStates = Object.freeze({
    EMPTY: "EMPTY",
    ACTIVE: "ACTIVE"
});

/** @type {Readonly<{CREATED: string, CONFIRMED: string, SHIPPED: string, DONE: string, CANCELLED: string}>} */
export const OrderStates = Object.freeze({
    CREATED: "ORDER_CREATED",
    CONFIRMED: "ORDER_CONFIRMED",
    SHIPPED: "ORDER_SHIPPED",
    DONE: "ORDER_DONE",
    CANCELLED: "ORDER_CANCELLED",
});
