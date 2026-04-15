import { assert, testAsync, makeStore, readyState, stateWithCartItem, sampleProduct } from './helpers.mjs';
import { CartModel } from '../../src/models/CartModel.js';
import { ProductModel } from '../../src/models/ProductModel.js';
import { CartStates } from '../../src/enums/states.js';
import { addToCart } from '../../src/app/actions/addToCart.js';
import { removeFromCart } from '../../src/app/actions/removeFromCart.js';
import { updateCartItem } from '../../src/app/actions/updateCartItem.js';
import { clearCart } from '../../src/app/actions/clearCart.js';

/*
 * Testy cart akcí: addToCart, removeFromCart, updateCartItem, clearCart
 */

// ── addToCart ─────────────────────────────────────────────────────────────────

testAsync('addToCart: přidá nový produkt do prázdného košíku', async () => {
  const store = makeStore(readyState());
  await addToCart({ store, payload: { productId: '1' } });
  const cart = store.getState().shop.cart;
  assert(cart.products.length === 1, 'košík má 1 položku');
  assert(cart.products[0].productId === '1', 'productId === "1"');
});

testAsync('addToCart: nastaví stav košíku na ACTIVE', async () => {
  const store = makeStore(readyState());
  await addToCart({ store, payload: { productId: '1' } });
  assert(store.getState().shop.cart.state === CartStates.ACTIVE, 'cart.state === ACTIVE');
});

testAsync('addToCart: zvýší množství, pokud je produkt v košíku', async () => {
  const store = makeStore(stateWithCartItem('1'));
  await addToCart({ store, payload: { productId: '1', amount: 1 } });
  const cart = store.getState().shop.cart;
  assert(cart.products.length === 1, 'stále 1 záznam v košíku');
  assert(cart.products[0].amount === 2, 'amount === 2');
});

testAsync('addToCart: respektuje vlastní amount z payload', async () => {
  const store = makeStore(readyState());
  await addToCart({ store, payload: { productId: '1', amount: 3 } });
  assert(store.getState().shop.cart.products[0].amount === 3, 'amount === 3');
});

testAsync('addToCart: neudělá nic pro neznámý productId', async () => {
  const store = makeStore(readyState());
  await addToCart({ store, payload: { productId: 'neexistuje' } });
  assert(store.getState().shop.cart.products.length === 0, 'košík zůstal prázdný');
});

testAsync('addToCart: nevytvoří duplicitní záznamy', async () => {
  const store = makeStore(readyState());
  await addToCart({ store, payload: { productId: '1' } });
  await addToCart({ store, payload: { productId: '1' } });
  await addToCart({ store, payload: { productId: '1' } });
  assert(store.getState().shop.cart.products.length === 1, 'stále 1 záznam');
});

// ── removeFromCart ────────────────────────────────────────────────────────────

testAsync('removeFromCart: odebere produkt z košíku', async () => {
  // košík se dvěma různými produkty
  const base = readyState();
  base.shop.products.push(sampleProduct('2'));
  base.shop.cart = new CartModel([
    new ProductModel('1', 'Myš', '', 100, 1, ''),
    new ProductModel('2', 'Klávesnice', '', 200, 1, ''),
  ], CartStates.ACTIVE);
  const store = makeStore(base);
  await removeFromCart({ store, payload: { productId: '1' } });
  const cart = store.getState().shop.cart;
  assert(cart.products.length === 1, 'košík má 1 položku');
  assert(cart.products[0].productId === '2', 'zbyl produkt "2"');
});

testAsync('removeFromCart: nastaví stav na EMPTY při odebrání poslední položky', async () => {
  const store = makeStore(stateWithCartItem('1'));
  await removeFromCart({ store, payload: { productId: '1' } });
  assert(store.getState().shop.cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});

testAsync('removeFromCart: stav zůstane ACTIVE pokud v košíku zbydou položky', async () => {
  const base = readyState();
  base.shop.cart = new CartModel([
    new ProductModel('1', 'Myš', '', 100, 1, ''),
    new ProductModel('2', 'Klávesnice', '', 200, 1, ''),
  ], CartStates.ACTIVE);
  const store = makeStore(base);
  await removeFromCart({ store, payload: { productId: '1' } });
  assert(store.getState().shop.cart.state === CartStates.ACTIVE, 'cart.state === ACTIVE');
});

testAsync('removeFromCart: neudělá nic pro neznámý productId', async () => {
  const store = makeStore(stateWithCartItem('1'));
  await removeFromCart({ store, payload: { productId: 'neexistuje' } });
  assert(store.getState().shop.cart.products.length === 1, 'košík nezměněn');
});

// ── updateCartItem ────────────────────────────────────────────────────────────

testAsync('updateCartItem: aktualizuje množství položky', async () => {
  const store = makeStore(stateWithCartItem('1'));
  await updateCartItem({ store, payload: { productId: '1', quantity: 5 } });
  assert(store.getState().shop.cart.products[0].amount === 5, 'amount === 5');
});

testAsync('updateCartItem: odebere položku při quantity === 0', async () => {
  const store = makeStore(stateWithCartItem('1'));
  await updateCartItem({ store, payload: { productId: '1', quantity: 0 } });
  assert(store.getState().shop.cart.products.length === 0, 'košík je prázdný');
});

testAsync('updateCartItem: nastaví stav na EMPTY při odebrání poslední položky', async () => {
  const store = makeStore(stateWithCartItem('1'));
  await updateCartItem({ store, payload: { productId: '1', quantity: 0 } });
  assert(store.getState().shop.cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});

// ── clearCart ─────────────────────────────────────────────────────────────────

testAsync('clearCart: odebere všechny produkty z košíku', async () => {
  const base = readyState();
  base.shop.cart = new CartModel([
    new ProductModel('1', 'Myš', '', 100, 2, ''),
    new ProductModel('2', 'Klávesnice', '', 200, 1, ''),
  ], CartStates.ACTIVE);
  const store = makeStore(base);
  await clearCart({ store });
  assert(store.getState().shop.cart.products.length === 0, 'košík je prázdný');
});

testAsync('clearCart: nastaví stav košíku na EMPTY', async () => {
  const store = makeStore(stateWithCartItem('1'));
  await clearCart({ store });
  assert(store.getState().shop.cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});

testAsync('clearCart: funguje i na prázdný košík', async () => {
  const store = makeStore(readyState());
  await clearCart({ store });
  assert(store.getState().shop.cart.products.length === 0, 'košík zůstal prázdný');
  assert(store.getState().shop.cart.state === CartStates.EMPTY, 'cart.state === EMPTY');
});
