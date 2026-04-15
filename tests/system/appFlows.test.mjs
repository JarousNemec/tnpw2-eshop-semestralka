/**
 * Systémové (integrační) testy
 *
 * Na rozdíl od unit testů akcí v tests/actions/ zde testujeme celý stack:
 *   createStore + createDispatcher + reálné enum hodnoty akcí
 *
 * Testy ověřují, že dispatcher správně předává akce do action handlerů
 * a že výsledný stav odpovídá očekávání — stejně jako v reálné aplikaci,
 * jen místo prohlížeče jde vše přes Node.js a mock API bez delay.
 */

import { createStore } from '../../src/infra/store/createStore.js';
import { createInitialState } from '../../src/app/state.js';
import { createDispatcher } from '../../src/app/dispatch.js';
import { AppActions, CartActions, OrderActions, UserActions } from '../../src/enums/actions.js';
import { UiStates, UserStates, UserRoles, CartStates, OrderStates } from '../../src/enums/states.js';
import { AppViews } from '../../src/enums/views.js';
import { ProductModel } from '../../src/models/ProductModel.js';
import { CartModel } from '../../src/models/CartModel.js';
import { OrderModel } from '../../src/models/OrderModel.js';
import { UserModel } from '../../src/models/UserModel.js';
import { AddressModel } from '../../src/models/AddressModel.js';
import { assert, testAsync, createMockApi, mockApiOrder } from '../testFramework.mjs';

/*
 * Pomocná funkce: vytvoří store + dispatcher s mock API
 * Vrátí { store, dispatch } připravené k použití v testech
 */
function createSystem(apiOverrides = {}) {
  const store = createStore(createInitialState());
  const api = createMockApi(apiOverrides);
  const dispatch = createDispatcher(store, api);
  return { store, dispatch };
}

function sampleAddress() {
  return new AddressModel('CZ', 'Praha', 'Hlavní', '110 00', '1');
}

// ── Inicializace aplikace ─────────────────────────────────────────────────────

testAsync('APP_INIT: nastaví ui.status na READY', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  assert(store.getState().ui.status === UiStates.READY, 'ui.status === READY');
});

testAsync('APP_INIT: nastaví ui.view na HOME', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  assert(store.getState().ui.view === AppViews.HOME, 'ui.view === HOME');
});

testAsync('APP_INIT: naplní shop.products', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  assert(store.getState().shop.products.length > 0, 'shop.products.length > 0');
});

testAsync('APP_INIT: inicializuje prázdný košík', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  const cart = store.getState().shop.cart;
  assert(cart instanceof CartModel, 'shop.cart instanceof CartModel');
  assert(cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});

testAsync('APP_INIT: nastaví ui.status na ERROR při selhání API', async () => {
  const { store, dispatch } = createSystem({
    products: { async getProducts() { return { status: 'REJECTED', reason: 'Výpadek' }; } },
  });
  await dispatch({ type: AppActions.APP_INIT });
  assert(store.getState().ui.status === UiStates.ERROR, 'ui.status === ERROR');
});

// ── Zobrazení chyby a zotavení ────────────────────────────────────────────────

testAsync('DISPLAY_ERROR → RECOVER_FROM_ERROR: cyklus chyby', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: AppActions.DISPLAY_ERROR, payload: { message: 'Testovací chyba' } });
  assert(store.getState().ui.status === UiStates.ERROR, 'po DISPLAY_ERROR: status === ERROR');
  assert(store.getState().ui.errorMessage === 'Testovací chyba', 'errorMessage uložena');
  await dispatch({ type: AppActions.RECOVER_FROM_ERROR });
  assert(store.getState().ui.status === UiStates.READY, 'po RECOVER: status === READY');
  assert(store.getState().ui.errorMessage === null, 'po RECOVER: errorMessage === null');
});

// ── Navigace ──────────────────────────────────────────────────────────────────

testAsync('ENTER_CART_VIEW: změní ui.view na CART', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.ENTER_CART_VIEW });
  assert(store.getState().ui.view === AppViews.CART, 'ui.view === CART');
});

testAsync('ENTER_ORDER_VIEW: změní ui.view na ORDER', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.ENTER_ORDER_VIEW });
  assert(store.getState().ui.view === AppViews.ORDER, 'ui.view === ORDER');
});

testAsync('ENTER_HOME_VIEW: vrátí ui.view na HOME', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.ENTER_CART_VIEW });
  await dispatch({ type: AppActions.ENTER_HOME_VIEW });
  assert(store.getState().ui.view === AppViews.HOME, 'ui.view === HOME');
});

// ── Přihlášení a odhlášení ────────────────────────────────────────────────────

testAsync('LOG_IN: přihlásí zákazníka přes dispatcher', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: UserActions.LOG_IN, payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  const user = store.getState().auth.user;
  assert(user.state === UserStates.AUTHENTICATED, 'user.state === AUTHENTICATED');
  assert(user.role === UserRoles.CUSTOMER, 'user.role === CUSTOMER');
});

testAsync('LOG_IN: přihlásí admina přes dispatcher', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: UserActions.LOG_IN, payload: { email: 'admin@bshop.cz', password: 'admin123' } });
  assert(store.getState().auth.user.role === UserRoles.ADMIN, 'user.role === ADMIN');
});

testAsync('LOG_IN s chybným heslem: stav zůstane ANONYMOUS', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: UserActions.LOG_IN, payload: { email: 'jan@bshop.cz', password: 'spatne' } });
  assert(store.getState().auth.user.state === UserStates.ANONYMOUS, 'user.state === ANONYMOUS');
});

testAsync('LOG_OUT: resetuje uživatele a vyčistí košík', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: UserActions.LOG_IN, payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  await dispatch({ type: CartActions.ADD_ITEM, payload: { productId: '1' } });
  await dispatch({ type: UserActions.LOG_OUT });
  const state = store.getState();
  assert(state.auth.user.state === UserStates.ANONYMOUS, 'user.state === ANONYMOUS');
  assert(state.shop.cart.products.length === 0, 'cart prázdný po odhlášení');
});

// ── Správa košíku ─────────────────────────────────────────────────────────────

testAsync('ADD_ITEM: přidá produkt do košíku', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: CartActions.ADD_ITEM, payload: { productId: '1' } });
  assert(store.getState().shop.cart.products.length === 1, 'cart.products.length === 1');
  assert(store.getState().shop.cart.state === CartStates.ACTIVE, 'cart.state === ACTIVE');
});

testAsync('REMOVE_ITEM: odebere produkt z košíku', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: CartActions.ADD_ITEM, payload: { productId: '1' } });
  await dispatch({ type: CartActions.REMOVE_ITEM, payload: { productId: '1' } });
  assert(store.getState().shop.cart.products.length === 0, 'cart prázdný');
  assert(store.getState().shop.cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});

testAsync('UPDATE_ITEM: aktualizuje množství produktu', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: CartActions.ADD_ITEM, payload: { productId: '1' } });
  await dispatch({ type: CartActions.UPDATE_ITEM, payload: { productId: '1', quantity: 4 } });
  assert(store.getState().shop.cart.products[0].amount === 4, 'amount === 4');
});

await testAsync('CLEAR_CART: vyprázdní celý košík', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: CartActions.ADD_ITEM, payload: { productId: '1' } });
  await dispatch({ type: CartActions.CLEAR });
  assert(store.getState().shop.cart.products.length === 0, 'cart prázdný');
  assert(store.getState().shop.cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});

// ── Reload akcí ───────────────────────────────────────────────────────────────

testAsync('RELOAD_PRODUCTS: aktualizuje produkty z API', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  store.setState(s => ({ ...s, shop: { ...s.shop, products: [] } })); // vymaž produkty
  await dispatch({ type: AppActions.RELOAD_PRODUCTS });
  assert(store.getState().shop.products.length > 0, 'shop.products znovu načteny');
});

testAsync('RELOAD_ORDERS: aktualizuje objednávky přihlášeného uživatele', async () => {
  const { store, dispatch } = createSystem({
    orders: {
      async getUserOrders(token) {
        if (!token) return { status: 'REJECTED', reason: 'Bez tokenu' };
        return { status: 'SUCCESS', orders: [mockApiOrder()] };
      },
    },
  });
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: UserActions.LOG_IN, payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  await dispatch({ type: AppActions.RELOAD_ORDERS });
  assert(store.getState().auth.user.orders.length === 1, 'user.orders.length === 1');
});

testAsync('RELOAD_USER: obnoví data přihlášeného uživatele', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: UserActions.LOG_IN, payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  await dispatch({ type: AppActions.RELOAD_USER });
  const user = store.getState().auth.user;
  assert(user.state === UserStates.AUTHENTICATED, 'user.state === AUTHENTICATED po reload');
  assert(user.username === 'jan@bshop.cz', 'username zachován');
});

// ── Kompletní flow: nákup ─────────────────────────────────────────────────────

testAsync('Nákupní flow: init → login → přidej do košíku → vytvoř objednávku', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: UserActions.LOG_IN, payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  await dispatch({ type: CartActions.ADD_ITEM, payload: { productId: '1' } });
  assert(store.getState().shop.cart.products.length === 1, 'produkt v košíku');
  await dispatch({ type: OrderActions.CREATE, payload: { address: sampleAddress() } });
  const state = store.getState();
  assert(state.auth.user.orders.length === 1, 'objednávka vytvořena');
  assert(state.shop.cart.products.length === 0, 'košík vyprázdněn');
  assert(state.auth.user.orders[0].state === OrderStates.CREATED, 'order.state === ORDER_CREATED');
  assert(state.ui.view === AppViews.ORDER, 'přesměrováno na ORDER view');
});

// ── Kompletní flow: správa objednávky adminem ─────────────────────────────────

testAsync('Admin flow: potvrdit → odeslat → dokončit objednávku', async () => {
  // Nastavíme systém s adminem, který má jednu objednávku v stavu CREATED
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  await dispatch({ type: UserActions.LOG_IN, payload: { email: 'admin@bshop.cz', password: 'admin123' } });

  // Přidáme objednávku přímo do store (simulace zákazníkovy objednávky u admina)
  const address = sampleAddress();
  const product = new ProductModel('1', 'Herní myš', '', 1290, 1, '');
  store.setState(s => {
    const u = s.auth.user;
    const order = new OrderModel('adm-order-1', [product], address, u, OrderStates.CREATED);
    const updatedUser = new UserModel(u.state, u.role, u.userId, u.token, u.username, u.password, [order]);
    return { ...s, auth: { user: updatedUser } };
  });

  await dispatch({ type: OrderActions.CONFIRM, payload: { orderId: 'adm-order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.CONFIRMED, 'stav → CONFIRMED');

  await dispatch({ type: OrderActions.SHIP, payload: { orderId: 'adm-order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.SHIPPED, 'stav → SHIPPED');

  await dispatch({ type: OrderActions.FINISH, payload: { orderId: 'adm-order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.DONE, 'stav → DONE');
});

// ── Dispatcher: neznámá akce ──────────────────────────────────────────────────

testAsync('Neznámý typ akce: stav zůstane nezměněn', async () => {
  const { store, dispatch } = createSystem();
  await dispatch({ type: AppActions.APP_INIT });
  const stateBefore = store.getState();
  await dispatch({ type: 'NEEXISTUJICI_AKCE' });
  assert(store.getState() === stateBefore, 'stav nezměněn po neznámé akci');
});

testAsync('Null akce: dispatcher nepadne', async () => {
  const { store, dispatch } = createSystem();
  let threw = false;
  try { await dispatch(null); } catch { threw = true; }
  assert(!threw, 'dispatch(null) nezpůsobí výjimku');
});
