// src/infra/router/router.js
import {AppActions} from '../../enums/actions.js';
import {AppViews} from "../../enums/views.js";

// --------------------------------------------------
// Router pracuje s LOGICKOU CESTOU aplikace,
// nikoli s celou URL (protokol, host, port ho nezajímají).
//
// TODO: Definujte navigační kontexty aplikace:
//   #/         ... domovská stránka
//   #/list     ... seznam entit
//   #/detail/:id ... detail entity
// --------------------------------------------------

// URL -> route
// odstraníme # a technické části
export function urlToRoute(url) {
    const hashIndex = url.indexOf('#');
    const path = hashIndex >= 0 ? url.slice(hashIndex + 1) : '';
    return parseUrl(path);
}

// parsování - syntaktická analýza cesty
export function parseUrl(path) {
    const parts = path.split('/').filter(Boolean);
    const routeName = parts[0] || '';

    // TODO: Přidejte pravidla pro vaše URL
    switch (routeName) {
        case 'cart':
            return {context: 'CART'};
        case 'order':
            return {context: 'ORDER'};
        default:
            return {context: 'HOME'};
    }
}

// route -> navigační akce
export function routeToAction(route) {
    // TODO: Přidejte mapování route -> akce
    switch (route.context) {
        case AppViews.CART:
            return {type: AppActions.ENTER_CART_VIEW};
        case AppViews.ORDER:
            return {type: AppActions.ENTER_ORDER_VIEW};
        case AppViews.HOME:
            return {type: AppActions.ENTER_HOME_VIEW};
        default:
            return {type: AppActions.ENTER_HOME_VIEW};
    }
}

export function urlToAction(url) {
    const route = urlToRoute(url);
    return routeToAction(route);
}