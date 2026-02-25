// src/infra/router/router.js

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

  // TODO: Přidejte pravidla pro vaše URL

  return { context: 'HOME' };
}

// route -> navigační akce
export function routeToAction(route) {
  // TODO: Přidejte mapování route -> akce
  switch (route.context) {
    case 'HOME':
      return { type: 'APP_INIT' };
    default:
      return { type: 'APP_INIT' };
  }
}

export function urlToAction(url) {
  const route = urlToRoute(url);
  return routeToAction(route);
}
