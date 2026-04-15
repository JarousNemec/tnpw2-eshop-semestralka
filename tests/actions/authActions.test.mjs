import {
  assert, testAsync,
  makeStore, readyState, customerState,
  createMockApi, createMockDispatch, mockApiOrder,
} from '../testFramework.mjs';
import { UserStates, UserRoles, CartStates } from '../../src/enums/states.js';
import { OrderModel } from '../../src/models/OrderModel.js';
import { logIn } from '../../src/app/actions/logIn.js';
import { logOut } from '../../src/app/actions/logOut.js';
import { reloadUser } from '../../src/app/actions/reloadUser.js';

/*
 * Testy auth akcí: logIn, logOut, reloadUser
 */

// ── logIn ─────────────────────────────────────────────────────────────────────

testAsync('logIn: nastaví user.state na AUTHENTICATED při platných údajích zákazníka', async () => {
  const store = makeStore(readyState());
  await logIn({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  assert(store.getState().auth.user.state === UserStates.AUTHENTICATED, 'user.state === AUTHENTICATED');
});

testAsync('logIn: nastaví user.role na CUSTOMER pro zákaznické přihlášení', async () => {
  const store = makeStore(readyState());
  await logIn({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  assert(store.getState().auth.user.role === UserRoles.CUSTOMER, 'user.role === CUSTOMER');
});

testAsync('logIn: správně uloží token do stavu', async () => {
  const store = makeStore(readyState());
  await logIn({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  assert(store.getState().auth.user.token === 'customer-token-1', 'user.token === "customer-token-1"');
});

testAsync('logIn: nastaví user.role na ADMIN pro admin přihlášení', async () => {
  const store = makeStore(readyState());
  await logIn({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { email: 'admin@bshop.cz', password: 'admin123' } });
  assert(store.getState().auth.user.role === UserRoles.ADMIN, 'user.role === ADMIN');
});

testAsync('logIn: dispatchuje DISPLAY_ERROR při chybném hesle', async () => {
  const store = makeStore(readyState());
  const dispatch = createMockDispatch();
  await logIn({ store, api: createMockApi(), dispatch, payload: { email: 'jan@bshop.cz', password: 'spatneHeslo' } });
  assert(dispatch.calledWith('DISPLAY_ERROR'), 'byl volán DISPLAY_ERROR');
});

testAsync('logIn: při selhání stav zůstane ANONYMOUS', async () => {
  const store = makeStore(readyState());
  await logIn({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { email: 'jan@bshop.cz', password: 'spatneHeslo' } });
  assert(store.getState().auth.user.state === UserStates.ANONYMOUS, 'user.state === ANONYMOUS');
});

testAsync('logIn: naplní user.orders po úspěšném přihlášení', async () => {
  const store = makeStore(readyState());
  const api = createMockApi({
    orders: {
      async getUserOrders(_token) {
        return { status: 'SUCCESS', orders: [mockApiOrder()] };
      },
    },
  });
  await logIn({ store, api, dispatch: createMockDispatch(), payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  assert(store.getState().auth.user.orders.length === 1, 'user.orders.length === 1');
});

testAsync('logIn: přihlásí uživatele i když getUserOrders selže', async () => {
  const store = makeStore(readyState());
  const api = createMockApi({
    orders: {
      async getUserOrders(_token) {
        return { status: 'REJECTED', reason: 'Chyba serveru' };
      },
    },
  });
  await logIn({ store, api, dispatch: createMockDispatch(), payload: { email: 'jan@bshop.cz', password: 'heslo123' } });
  assert(store.getState().auth.user.state === UserStates.AUTHENTICATED, 'user.state === AUTHENTICATED přes selhání orders');
  assert(store.getState().auth.user.orders.length === 0, 'user.orders === []');
});

// ── logOut ────────────────────────────────────────────────────────────────────

testAsync('logOut: resetuje user.state na ANONYMOUS', async () => {
  const store = makeStore(customerState());
  await logOut({ store, api: createMockApi() });
  assert(store.getState().auth.user.state === UserStates.ANONYMOUS, 'user.state === ANONYMOUS');
});

testAsync('logOut: resetuje user.role na ANONYMOUS', async () => {
  const store = makeStore(customerState());
  await logOut({ store, api: createMockApi() });
  assert(store.getState().auth.user.role === UserRoles.ANONYMOUS, 'user.role === ANONYMOUS');
});

testAsync('logOut: vymaže token', async () => {
  const store = makeStore(customerState());
  await logOut({ store, api: createMockApi() });
  assert(store.getState().auth.user.token === '', 'token === ""');
});

testAsync('logOut: vyčistí košík', async () => {
  const store = makeStore(customerState());
  await logOut({ store, api: createMockApi() });
  const cart = store.getState().shop.cart;
  assert(cart.products.length === 0, 'cart.products.length === 0');
  assert(cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});

// ── reloadUser ────────────────────────────────────────────────────────────────

testAsync('reloadUser: neudělá nic při prázdném tokenu', async () => {
  const state = readyState(); // anonymní uživatel, token === ''
  const store = makeStore(state);
  await reloadUser({ store, api: createMockApi() });
  assert(store.getState().auth === state.auth, 'auth nezměněn');
});

testAsync('reloadUser: resetuje na ANONYMOUS při neplatném tokenu', async () => {
  const store = makeStore(customerState());
  const api = createMockApi({
    auth: {
      async whoAmI(_token) {
        return { status: 'REJECTED', reason: 'Neplatný token' };
      },
    },
  });
  await reloadUser({ store, api });
  assert(store.getState().auth.user.state === UserStates.ANONYMOUS, 'user.state === ANONYMOUS');
});

testAsync('reloadUser: aktualizuje data uživatele z API', async () => {
  const store = makeStore(customerState());
  await reloadUser({ store, api: createMockApi() });
  const user = store.getState().auth.user;
  assert(user.state === UserStates.AUTHENTICATED, 'user.state === AUTHENTICATED');
  assert(user.userId === 'customer-1', 'user.userId === "customer-1"');
});

testAsync('reloadUser: mapuje objednávky z API na OrderModel instance', async () => {
  const store = makeStore(customerState());
  const api = createMockApi({
    orders: {
      async getUserOrders(_token) {
        return { status: 'SUCCESS', orders: [mockApiOrder()] };
      },
    },
  });
  await reloadUser({ store, api });
  const orders = store.getState().auth.user.orders;
  assert(orders.length === 1, 'orders.length === 1');
  assert(orders[0] instanceof OrderModel, 'orders[0] instanceof OrderModel');
});
