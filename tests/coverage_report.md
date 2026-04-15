# Přehled pokrytí testy

**Projekt:** B-Shop (TNPW2 semestrální práce)  
**Datum:** 2026-04-16  
**Celkový počet testů:** 101 test cases (133 asercí)  
**Úspěšnost:** 100 %

---

## Souhrnná tabulka

| Oblast                          | Souborů | Pokrytí  | Stav             |
|---------------------------------|---------|----------|------------------|
| Akce – autentizace              | 3       | ~85 %    | ✅ Pokryto       |
| Akce – košík                    | 4       | ~80 %    | ✅ Pokryto       |
| Akce – objednávky               | 5       | ~85 %    | ✅ Pokryto       |
| Akce – aplikace (init, reload)  | 3       | ~75 %    | ✅ Pokryto       |
| Akce – UI (error, navigace)     | 5       | ~70 %    | ✅ Pokryto       |
| Dispatcher (dispatch.js)        | 1       | ~60 %    | ⚠️ Nepřímo      |
| Store (createStore.js)          | 1       | ~40 %    | ⚠️ Nepřímo      |
| Selektory (selectors.js)        | 1       | 0 %      | ❌ Netestováno   |
| Router (router.js)              | 1       | 0 %      | ❌ Netestováno   |
| Modely (models/)                | 5       | ~15 %    | ⚠️ Nepřímo      |
| Mock API (api/)                 | 5       | ~45 %    | ⚠️ Nepřímo      |
| UI – DOM helper (dom.js)        | 1       | 0 %      | ❌ Netestováno   |
| UI – Views (views/)             | 6       | 0 %      | ❌ Netestováno   |
| UI – render.js                  | 1       | 0 %      | ❌ Netestováno   |
| UI – createHandlers.js          | 1       | 0 %      | ❌ Netestováno   |
| Enumy (enums/)                  | 3       | N/A      | ℹ️ Konstanty    |
| Stav (state.js)                 | 1       | ~35 %    | ⚠️ Nepřímo      |
| Inicializace (init.js)          | 1       | ~30 %    | ⚠️ Nepřímo      |

**Odhadované celkové pokrytí: ~40–45 %**

Legenda: ✅ přímé unit testy | ⚠️ kód se spouští nepřímo v rámci jiných testů | ❌ žádné testy | ℹ️ netřeba testovat

---

## Podrobný rozpis

### Akce – autentizace (`src/app/actions/`)

| Soubor         | Testů | Pokrytí | Poznámka                                              |
|----------------|-------|---------|-------------------------------------------------------|
| logIn.js       | 8     | ~85 %   | Happy path (zákazník i admin), chybné heslo, orders    |
| logOut.js      | 4     | ~85 %   | Reset stavu, vyčištění košíku, vymazání tokenu         |
| reloadUser.js  | 4     | ~80 %   | Prázdný token, neplatný token, úspěšný reload, modely  |

**Netestováno:** neplatný formát emailu, prázdné heslo, timeout API

### Akce – košík (`src/app/actions/`)

| Soubor            | Testů | Pokrytí | Poznámka                                            |
|-------------------|-------|---------|-----------------------------------------------------|
| addToCart.js       | 6     | ~85 %   | Přidání, duplikát, vlastní amount, neznámý productId |
| removeFromCart.js  | 4     | ~80 %   | Odebrání, poslední položka → EMPTY, neznámý ID       |
| updateCartItem.js  | 3     | ~75 %   | Změna množství, odebrání při quantity=0               |
| clearCart.js       | 3     | ~80 %   | Vyprázdnění, idempotence na prázdný košík             |

**Netestováno:** záporné množství, neceločíselné hodnoty, souběžné operace

### Akce – objednávky (`src/app/actions/`)

| Soubor          | Testů | Pokrytí | Poznámka                                              |
|-----------------|-------|---------|-------------------------------------------------------|
| createOrder.js  | 7     | ~85 %   | Vytvoření, typ OrderModel, vyčištění košíku, chyba API |
| cancelOrder.js  | 4     | ~85 %   | Zrušení, chyba API, izolace ostatních objednávek       |
| confirmOrder.js | 4     | ~85 %   | Admin potvrzení, odmítnutí CUSTOMER role                |
| shipOrder.js    | 3     | ~80 %   | Admin odeslání, odmítnutí CUSTOMER role                 |
| finishOrder.js  | 3     | ~80 %   | Admin dokončení, odmítnutí CUSTOMER role                |

**Netestováno:** vytvoření objednávky s prázdným košíkem, neplatné přechody stavů (např. ship nepotvrzené objednávky), validace adresy

### Akce – aplikace (`src/app/actions/`)

| Soubor            | Testů | Pokrytí | Poznámka                                          |
|-------------------|-------|---------|----------------------------------------------------|
| appInit.js        | 7     | ~80 %   | Inicializace, produkty, košík, chyba API            |
| reloadProducts.js | 4     | ~75 %   | Reload, typ ProductModel, tiché selhání, izolace   |
| reloadOrders.js   | 5     | ~75 %   | Anonymní uživatel, reload, typ OrderModel, izolace |

**Netestováno:** částečné selhání API, neplatná data z API

### Akce – UI (`src/app/actions/`)

| Soubor              | Testů | Pokrytí | Poznámka                                    |
|---------------------|-------|---------|----------------------------------------------|
| displayError.js     | 4     | ~80 %   | Zobrazení chyby, záložní zpráva, izolace     |
| recoverFromError.js | 3     | ~70 %   | Reset na READY, vymazání zprávy, zachování view |
| enterHomeView.js    | 1     | ~60 %   | Základní přepnutí view                        |
| enterCartView.js    | 1     | ~60 %   | Základní přepnutí view                        |
| enterOrderView.js   | 1     | ~60 %   | Základní přepnutí view                        |

**Netestováno:** vícenásobné chyby za sebou, přepínání view z libovolného stavu

### Dispatcher (`src/app/dispatch.js`)

| Testů   | Pokrytí | Poznámka                                                      |
|---------|---------|----------------------------------------------------------------|
| nepřímo | ~60 %   | 22 integračních testů routuje akce přes dispatcher; pokrývá všech 20 typů akcí. Neznámá akce a null akce otestovány. |

**Netestováno:** přímé unit testy dispatcheru, edge cases v payload předávání

### Store (`src/infra/store/createStore.js`)

| Testů | Pokrytí | Poznámka                                                       |
|-------|---------|----------------------------------------------------------------|
| 0     | ~40 %   | getState/setState se volají ve všech testech (přes makeStore). subscribe není přímo testováno. |

**Netestováno:** subscribe notifikace, vícenásobné subscribery, setState s identickou hodnotou

### Selektory (`src/infra/store/selectors.js`)

| Funkce          | Testů | Pokrytí | Poznámka                                           |
|-----------------|-------|---------|-----------------------------------------------------|
| selectAuth      | 0     | 0 %     | Triviální, ale bez testu                             |
| selectViewState | 0     | 0 %     | Klíčová logika: LOADING/ERROR/HOME/CART/ORDER větve  |

**Netestováno:** všechny větve selectViewState, neznámý ui.status, chybějící view case

### Router (`src/infra/router/router.js`)

| Funkce        | Testů | Pokrytí | Poznámka                                     |
|---------------|-------|---------|-----------------------------------------------|
| urlToRoute    | 0     | 0 %     | Parsování URL hashe                            |
| parseUrl      | 0     | 0 %     | Syntaktická analýza cesty → context            |
| routeToAction | 0     | 0 %     | Mapování route → navigační akce                |
| urlToAction   | 0     | 0 %     | Kompozice urlToRoute + routeToAction           |

### Modely (`src/models/`)

| Soubor          | Testů | Pokrytí | Poznámka                                           |
|-----------------|-------|---------|-----------------------------------------------------|
| UserModel.js    | 0     | ~20 %   | Konstruktor volán nepřímo přes akční testy           |
| ProductModel.js | 0     | ~20 %   | Konstruktor volán nepřímo přes akční testy           |
| CartModel.js    | 0     | ~15 %   | Konstruktor nepřímo; getTotalPrice() bez testu       |
| OrderModel.js   | 0     | ~15 %   | Konstruktor nepřímo; getTotalPrice() bez testu       |
| AddressModel.js | 0     | ~10 %   | Konstruktor nepřímo; getFullAddress() bez testu      |

### Mock API (`src/api/`)

| Soubor             | Testů | Pokrytí | Poznámka                                         |
|--------------------|-------|---------|---------------------------------------------------|
| mockApi.js         | 0     | ~50 %   | createApi() kompozice volaná nepřímo               |
| utils.js           | 0     | ~50 %   | delay() volaná nepřímo přes API                    |
| mock/authApi.js    | 0     | ~50 %   | whoAmI/login/logout volány přes akční testy         |
| mock/productApi.js | 0     | ~40 %   | getProducts přes reload; getProductById méně        |
| mock/orderApi.js   | 0     | ~45 %   | createOrder/getUserOrders/cancelOrder nepřímo        |
| mock/data.js       | 0     | ~30 %   | createMockDatabase() inicializována nepřímo          |

**Netestováno:** hraniční případy API (neplatné ID, chybějící pole, neexistující uživatel)

### UI vrstva

| Soubor                     | Testů | Pokrytí | Poznámka                      |
|----------------------------|-------|---------|--------------------------------|
| dom.js (createElement/h)   | 0     | 0 %     | Žádné testy                    |
| render.js                  | 0     | 0 %     | Žádné testy                    |
| views/LoadingView.js       | 0     | 0 %     | Žádné testy                    |
| views/ErrorView.js         | 0     | 0 %     | Žádné testy                    |
| views/HomeView.js          | 0     | 0 %     | Žádné testy                    |
| views/CartView.js          | 0     | 0 %     | Žádné testy                    |
| views/OrderView.js         | 0     | 0 %     | Žádné testy                    |
| views/OrderSuccessView.js  | 0     | 0 %     | Prázdný soubor (TODO)          |
| createHandlers.js          | 0     | 0 %     | Žádné testy                    |

Poznámka: UI testy vyžadují DOM prostředí (jsdom), které projekt aktuálně nepoužívá.

### Enumy (`src/enums/`)

| Soubor      | Pokrytí | Poznámka                                               |
|-------------|---------|--------------------------------------------------------|
| actions.js  | N/A     | Konstanty – implicitně ověřeny použitím v testech      |
| states.js   | N/A     | Konstanty – implicitně ověřeny použitím v testech      |
| views.js    | N/A     | Konstanty – implicitně ověřeny použitím v testech      |

---

## Testovací sady

| Sada                     | Soubor                   | Testů |
|--------------------------|--------------------------|-------|
| Autentizace              | authActions.test.mjs     | 14    |
| Košík                    | cartActions.test.mjs     | 17    |
| Objednávky               | orderActions.test.mjs    | 23    |
| Aplikace (init, reload)  | shopActions.test.mjs     | 15    |
| UI akce                  | uiActions.test.mjs       | 10    |
| Integrační / systémové   | appFlows.test.mjs        | 22    |
| **Celkem**               |                          | **101** |

---

## Nepokryté oblasti (dle priority)

### Vysoká priorita
1. **Selektory** (`selectors.js`) – selectViewState je klíčová funkce rozhodující o zobrazení UI; čistá funkce, snadno testovatelná
2. **Router** (`router.js`) – 4 čisté funkce pro navigaci; 0 testů, přitom kritické pro správné směrování

### Střední priorita
3. **Modely – metody** – getTotalPrice() v CartModel a OrderModel, getFullAddress() v AddressModel; obsahují výpočetní logiku
4. **Store** (`createStore.js`) – subscribe mechanismus, notifikace listenerů
5. **Mock API** – přímé testy hraničních případů (neplatný token, neexistující produkt)

### Nízká priorita (vyžaduje DOM)
6. **Views, render.js, dom.js, createHandlers.js** – vyžadují jsdom nebo podobné prostředí; největší nepokrytá oblast, ale nejnáročnější na implementaci
