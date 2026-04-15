import {
  assert, testAsync,
  makeStore, readyState, customerState,
  createMockApi, createMockDispatch, mockApiOrder,
} from '../testFramework.mjs';
import { CartModel } from '../../src/models/CartModel.js';
import { ProductModel } from '../../src/models/ProductModel.js';
import { OrderModel } from '../../src/models/OrderModel.js';
import { CartStates, UiStates } from '../../src/enums/states.js';
import { AppViews } from '../../src/enums/views.js';
import { appInit } from '../../src/app/actions/appInit.js';
import { reloadProducts } from '../../src/app/actions/reloadProducts.js';
import { reloadOrders } from '../../src/app/actions/reloadOrders.js';

/*
 * Testy shop/init akcí: appInit, reloadProducts, reloadOrders
 */

// ── appInit ───────────────────────────────────────────────────────────────────

testAsync('appInit: nastaví ui.status na READY při úspěchu', async () => {
  const store = makeStore(readyState());
  await appInit({ store, api: createMockApi(), dispatch: createMockDispatch() });
  assert(store.getState().ui.status === UiStates.READY, 'ui.status === READY');
});

testAsync('appInit: naplní shop.products produkty z API', async () => {
  const store = makeStore(readyState());
  await appInit({ store, api: createMockApi(), dispatch: createMockDispatch() });
  assert(store.getState().shop.products.length > 0, 'shop.products.length > 0');
});

testAsync('appInit: produkty jsou instance ProductModel', async () => {
  const store = makeStore(readyState());
  await appInit({ store, api: createMockApi(), dispatch: createMockDispatch() });
  assert(store.getState().shop.products[0] instanceof ProductModel, 'products[0] instanceof ProductModel');
});

testAsync('appInit: inicializuje košík jako prázdný CartModel', async () => {
  const store = makeStore(readyState());
  await appInit({ store, api: createMockApi(), dispatch: createMockDispatch() });
  const cart = store.getState().shop.cart;
  assert(cart instanceof CartModel, 'cart instanceof CartModel');
  assert(cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
  assert(cart.products.length === 0, 'cart.products.length === 0');
});

testAsync('appInit: nastaví ui.view na HOME', async () => {
  const store = makeStore(readyState());
  await appInit({ store, api: createMockApi(), dispatch: createMockDispatch() });
  assert(store.getState().ui.view === AppViews.HOME, 'ui.view === HOME');
});

testAsync('appInit: nastaví ui.status na ERROR při selhání API', async () => {
  const store = makeStore(readyState());
  const api = createMockApi({
    products: {
      async getProducts() { return { status: 'REJECTED', reason: 'Chyba serveru' }; },
    },
  });
  await appInit({ store, api, dispatch: createMockDispatch() });
  assert(store.getState().ui.status === UiStates.ERROR, 'ui.status === ERROR');
});

testAsync('appInit: uloží chybovou zprávu při selhání API', async () => {
  const store = makeStore(readyState());
  const api = createMockApi({
    products: {
      async getProducts() { return { status: 'REJECTED', reason: 'Chyba serveru' }; },
    },
  });
  await appInit({ store, api, dispatch: createMockDispatch() });
  assert(store.getState().ui.errorMessage !== null, 'ui.errorMessage !== null');
});

// ── reloadProducts ────────────────────────────────────────────────────────────

testAsync('reloadProducts: aktualizuje shop.products z API', async () => {
  const base = readyState();
  base.shop.products = []; // začínáme s prázdným seznamem
  const store = makeStore(base);
  await reloadProducts({ store, api: createMockApi() });
  assert(store.getState().shop.products.length > 0, 'shop.products byl naplněn');
});

testAsync('reloadProducts: produkty jsou instance ProductModel', async () => {
  const store = makeStore(readyState());
  await reloadProducts({ store, api: createMockApi() });
  assert(store.getState().shop.products[0] instanceof ProductModel, 'products[0] instanceof ProductModel');
});

testAsync('reloadProducts: tiše neudělá nic při selhání API', async () => {
  const base = readyState();
  const originalProducts = base.shop.products;
  const store = makeStore(base);
  const api = createMockApi({
    products: {
      async getProducts() { return { status: 'REJECTED', reason: 'Chyba serveru' }; },
    },
  });
  await reloadProducts({ store, api });
  assert(store.getState().shop.products === originalProducts, 'shop.products nezměněn');
});

testAsync('reloadProducts: nezmění auth stav', async () => {
  const state = customerState();
  const store = makeStore(state);
  await reloadProducts({ store, api: createMockApi() });
  assert(store.getState().auth === state.auth, 'auth nezměněn');
});

// ── reloadOrders ──────────────────────────────────────────────────────────────

testAsync('reloadOrders: neudělá nic pro anonymního uživatele bez tokenu', async () => {
  const state = readyState(); // token === ''
  const store = makeStore(state);
  await reloadOrders({ store, api: createMockApi() });
  assert(store.getState().auth === state.auth, 'auth nezměněn');
});

testAsync('reloadOrders: aktualizuje user.orders z API', async () => {
  const store = makeStore(customerState());
  const api = createMockApi({
    orders: {
      async getUserOrders(_token) {
        return { status: 'SUCCESS', orders: [mockApiOrder()] };
      },
    },
  });
  await reloadOrders({ store, api });
  assert(store.getState().auth.user.orders.length === 1, 'user.orders.length === 1');
});

testAsync('reloadOrders: objednávky jsou instance OrderModel', async () => {
  const store = makeStore(customerState());
  const api = createMockApi({
    orders: {
      async getUserOrders(_token) {
        return { status: 'SUCCESS', orders: [mockApiOrder()] };
      },
    },
  });
  await reloadOrders({ store, api });
  assert(store.getState().auth.user.orders[0] instanceof OrderModel, 'orders[0] instanceof OrderModel');
});

testAsync('reloadOrders: tiše neudělá nic při selhání API', async () => {
  const state = customerState();
  state.auth.user.orders = [];
  const store = makeStore(state);
  const api = createMockApi({
    orders: {
      async getUserOrders(_token) {
        return { status: 'REJECTED', reason: 'Chyba serveru' };
      },
    },
  });
  await reloadOrders({ store, api });
  assert(store.getState().auth.user.orders.length === 0, 'user.orders nezměněn');
});

testAsync('reloadOrders: nezmění shop.products', async () => {
  const state = customerState();
  const store = makeStore(state);
  const api = createMockApi({
    orders: {
      async getUserOrders(_token) {
        return { status: 'SUCCESS', orders: [mockApiOrder()] };
      },
    },
  });
  await reloadOrders({ store, api });
  assert(store.getState().shop.products === state.shop.products, 'shop.products nezměněn');
});
