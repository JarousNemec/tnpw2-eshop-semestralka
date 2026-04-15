import {
  assert, testAsync,
  makeStore, stateWithCartItem, stateWithOrder, adminStateWithOrder, adminState,
  createMockApi, createMockDispatch, sampleAddress, sampleProduct,
} from './helpers.mjs';
import { OrderModel } from '../../src/models/OrderModel.js';
import { CartStates, OrderStates } from '../../src/enums/states.js';
import { createOrder } from '../../src/app/actions/createOrder.js';
import { cancelOrder } from '../../src/app/actions/cancelOrder.js';
import { confirmOrder } from '../../src/app/actions/confirmOrder.js';
import { shipOrder } from '../../src/app/actions/shipOrder.js';
import { finishOrder } from '../../src/app/actions/finishOrder.js';

/*
 * Testy order akcí: createOrder, cancelOrder, confirmOrder, shipOrder, finishOrder
 */

// ── createOrder ───────────────────────────────────────────────────────────────

testAsync('createOrder: přidá objednávku do user.orders při úspěchu', async () => {
  const store = makeStore(stateWithCartItem());
  await createOrder({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { address: sampleAddress() } });
  assert(store.getState().auth.user.orders.length === 1, 'user.orders.length === 1');
});

testAsync('createOrder: přidaná objednávka je instance OrderModel', async () => {
  const store = makeStore(stateWithCartItem());
  await createOrder({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { address: sampleAddress() } });
  assert(store.getState().auth.user.orders[0] instanceof OrderModel, 'orders[0] instanceof OrderModel');
});

testAsync('createOrder: objednávka má stav CREATED', async () => {
  const store = makeStore(stateWithCartItem());
  await createOrder({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { address: sampleAddress() } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.CREATED, 'orders[0].state === ORDER_CREATED');
});

testAsync('createOrder: vyčistí košík po úspěchu', async () => {
  const store = makeStore(stateWithCartItem());
  await createOrder({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { address: sampleAddress() } });
  const cart = store.getState().shop.cart;
  assert(cart.products.length === 0, 'cart.products.length === 0');
  assert(cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});

testAsync('createOrder: dispatchuje ENTER_ORDER_VIEW po úspěchu', async () => {
  const store = makeStore(stateWithCartItem());
  const dispatch = createMockDispatch();
  await createOrder({ store, api: createMockApi(), dispatch, payload: { address: sampleAddress() } });
  assert(dispatch.calledWith('ENTER_ORDER_VIEW'), 'byl volán ENTER_ORDER_VIEW');
});

testAsync('createOrder: dispatchuje DISPLAY_ERROR při selhání API', async () => {
  const store = makeStore(stateWithCartItem());
  const dispatch = createMockDispatch();
  const api = createMockApi({
    orders: {
      async createOrder() { return { status: 'REJECTED', reason: 'Chyba serveru' }; },
    },
  });
  await createOrder({ store, api, dispatch, payload: { address: sampleAddress() } });
  assert(dispatch.calledWith('DISPLAY_ERROR'), 'byl volán DISPLAY_ERROR');
});

testAsync('createOrder: nezmění stav při selhání API', async () => {
  const initialState = stateWithCartItem();
  const store = makeStore(initialState);
  const api = createMockApi({
    orders: {
      async createOrder() { return { status: 'REJECTED', reason: 'Chyba serveru' }; },
    },
  });
  await createOrder({ store, api, dispatch: createMockDispatch(), payload: { address: sampleAddress() } });
  assert(store.getState().auth.user.orders.length === 0, 'user.orders zůstalo prázdné');
});

// ── cancelOrder ───────────────────────────────────────────────────────────────

testAsync('cancelOrder: nastaví stav objednávky na CANCELLED', async () => {
  const store = makeStore(stateWithOrder('order-1', OrderStates.CREATED));
  await cancelOrder({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.CANCELLED, 'order.state === ORDER_CANCELLED');
});

testAsync('cancelOrder: dispatchuje DISPLAY_ERROR při selhání API', async () => {
  const store = makeStore(stateWithOrder('order-1'));
  const dispatch = createMockDispatch();
  const api = createMockApi({
    orders: {
      async cancelOrder() { return { status: 'REJECTED', reason: 'Chyba serveru' }; },
    },
  });
  await cancelOrder({ store, api, dispatch, payload: { orderId: 'order-1' } });
  assert(dispatch.calledWith('DISPLAY_ERROR'), 'byl volán DISPLAY_ERROR');
});

testAsync('cancelOrder: nezruší objednávku při selhání API', async () => {
  const store = makeStore(stateWithOrder('order-1', OrderStates.CREATED));
  const api = createMockApi({
    orders: {
      async cancelOrder() { return { status: 'REJECTED', reason: 'Chyba serveru' }; },
    },
  });
  await cancelOrder({ store, api, dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.CREATED, 'order.state zůstal CREATED');
});

testAsync('cancelOrder: nezmění ostatní objednávky', async () => {
  // stav se dvěma objednávkami
  const base = stateWithOrder('order-1');
  const secondOrder = new OrderModel('order-2', [sampleProduct()], sampleAddress(), base.auth.user, OrderStates.CREATED);
  base.auth.user.orders.push(secondOrder);
  const store = makeStore(base);
  await cancelOrder({ store, api: createMockApi(), dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  const orders = store.getState().auth.user.orders;
  assert(orders.find(o => o.orderId === 'order-2').state === OrderStates.CREATED, 'order-2 zůstal CREATED');
});

// ── confirmOrder ──────────────────────────────────────────────────────────────

testAsync('confirmOrder: nastaví stav na CONFIRMED pro uživatele s rolí ADMIN', async () => {
  const store = makeStore(adminStateWithOrder('order-1'));
  await confirmOrder({ store, dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.CONFIRMED, 'order.state === ORDER_CONFIRMED');
});

testAsync('confirmOrder: dispatchuje DISPLAY_ERROR pro uživatele s rolí CUSTOMER', async () => {
  const store = makeStore(stateWithOrder('order-1'));
  const dispatch = createMockDispatch();
  await confirmOrder({ store, dispatch, payload: { orderId: 'order-1' } });
  assert(dispatch.calledWith('DISPLAY_ERROR'), 'byl volán DISPLAY_ERROR');
});

testAsync('confirmOrder: nezapne objednávku pro CUSTOMER', async () => {
  const store = makeStore(stateWithOrder('order-1', OrderStates.CREATED));
  await confirmOrder({ store, dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.CREATED, 'order.state zůstal CREATED');
});

testAsync('confirmOrder: nezmění ostatní objednávky', async () => {
  const base = adminStateWithOrder('order-1');
  const secondOrder = new OrderModel('order-2', [sampleProduct()], sampleAddress(), base.auth.user, OrderStates.CREATED);
  base.auth.user.orders.push(secondOrder);
  const store = makeStore(base);
  await confirmOrder({ store, dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders.find(o => o.orderId === 'order-2').state === OrderStates.CREATED, 'order-2 nezměněn');
});

// ── shipOrder ─────────────────────────────────────────────────────────────────

testAsync('shipOrder: nastaví stav na SHIPPED pro uživatele s rolí ADMIN', async () => {
  const store = makeStore(adminStateWithOrder('order-1', OrderStates.CONFIRMED));
  await shipOrder({ store, dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.SHIPPED, 'order.state === ORDER_SHIPPED');
});

testAsync('shipOrder: dispatchuje DISPLAY_ERROR pro uživatele s rolí CUSTOMER', async () => {
  const store = makeStore(stateWithOrder('order-1'));
  const dispatch = createMockDispatch();
  await shipOrder({ store, dispatch, payload: { orderId: 'order-1' } });
  assert(dispatch.calledWith('DISPLAY_ERROR'), 'byl volán DISPLAY_ERROR');
});

testAsync('shipOrder: nezmění ostatní objednávky', async () => {
  const base = adminStateWithOrder('order-1', OrderStates.CONFIRMED);
  const secondOrder = new OrderModel('order-2', [sampleProduct()], sampleAddress(), base.auth.user, OrderStates.CONFIRMED);
  base.auth.user.orders.push(secondOrder);
  const store = makeStore(base);
  await shipOrder({ store, dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders.find(o => o.orderId === 'order-2').state === OrderStates.CONFIRMED, 'order-2 nezměněn');
});

// ── finishOrder ───────────────────────────────────────────────────────────────

testAsync('finishOrder: nastaví stav na DONE pro uživatele s rolí ADMIN', async () => {
  const store = makeStore(adminStateWithOrder('order-1', OrderStates.SHIPPED));
  await finishOrder({ store, dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders[0].state === OrderStates.DONE, 'order.state === ORDER_DONE');
});

testAsync('finishOrder: dispatchuje DISPLAY_ERROR pro uživatele s rolí CUSTOMER', async () => {
  const store = makeStore(stateWithOrder('order-1'));
  const dispatch = createMockDispatch();
  await finishOrder({ store, dispatch, payload: { orderId: 'order-1' } });
  assert(dispatch.calledWith('DISPLAY_ERROR'), 'byl volán DISPLAY_ERROR');
});

testAsync('finishOrder: nezmění ostatní objednávky', async () => {
  const base = adminStateWithOrder('order-1', OrderStates.SHIPPED);
  const secondOrder = new OrderModel('order-2', [sampleProduct()], sampleAddress(), base.auth.user, OrderStates.SHIPPED);
  base.auth.user.orders.push(secondOrder);
  const store = makeStore(base);
  await finishOrder({ store, dispatch: createMockDispatch(), payload: { orderId: 'order-1' } });
  assert(store.getState().auth.user.orders.find(o => o.orderId === 'order-2').state === OrderStates.SHIPPED, 'order-2 nezměněn');
});
