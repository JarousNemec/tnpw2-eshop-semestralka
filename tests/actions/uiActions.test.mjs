import {assert, testAsync, makeStore, readyState, deepStrictEqual} from './helpers.mjs';
import {displayError} from '../../src/app/actions/displayError.js';
import {recoverFromError} from '../../src/app/actions/recoverFromError.js';
import {enterHomeView} from '../../src/app/actions/enterHomeView.js';
import {enterCartView} from '../../src/app/actions/enterCartView.js';
import {enterOrderView} from '../../src/app/actions/enterOrderView.js';

/*
 * Testy UI akcí: displayError, recoverFromError, enterHomeView, enterCartView, enterOrderView
 */

// ── displayError ──────────────────────────────────────────────────────────────

testAsync('displayError: nastaví ui.status na ERROR', async () => {
    const store = makeStore(readyState());
    await displayError({store, payload: {message: 'Testovací chyba'}});
    assert(store.getState().ui.status === 'ERROR', 'ui.status === ERROR');
});

testAsync('displayError: uloží zprávu do ui.errorMessage', async () => {
    const store = makeStore(readyState());
    await displayError({store, payload: {message: 'Testovací chyba'}});
    assert(store.getState().ui.errorMessage === 'Testovací chyba', 'ui.errorMessage === "Testovací chyba"');
});

testAsync('displayError: použije záložní zprávu "Neznámá chyba" když message chybí', async () => {
    const store = makeStore(readyState());
    await displayError({store, payload: {}});
    assert(store.getState().ui.errorMessage === 'Neznámá chyba', 'ui.errorMessage === "Neznámá chyba"');
});

testAsync('displayError: nezmění auth a shop', async () => {
    const state = readyState();
    const store = makeStore(state);
    await displayError({store, payload: {message: 'Chyba'}});
    const after = store.getState();
    assert(deepStrictEqual(after.auth, state.auth), 'auth obsah nezměněn');
    assert(deepStrictEqual(after.shop, state.shop), 'shop obsah nezměněn');
    assert(after.auth === state.auth, 'auth nezměněn');
    assert(after.shop === state.shop, 'shop nezměněn');
});

// ── recoverFromError ──────────────────────────────────────────────────────────
// Pozor: recoverFromError(store) — bere store jako poziční argument, ne { store }

testAsync('recoverFromError: nastaví ui.status na READY', async () => {
    const store = makeStore({...readyState(), ui: {view: 'HOME', status: 'ERROR', errorMessage: 'Chyba'}});
    recoverFromError(store);
    assert(store.getState().ui.status === 'READY', 'ui.status === READY');
});

testAsync('recoverFromError: vymaže ui.errorMessage na null', async () => {
    const store = makeStore({...readyState(), ui: {view: 'HOME', status: 'ERROR', errorMessage: 'Chyba'}});
    recoverFromError(store);
    assert(store.getState().ui.errorMessage === null, 'ui.errorMessage === null');
});

testAsync('recoverFromError: zachová ui.view', async () => {
    const store = makeStore({...readyState(), ui: {view: 'CART', status: 'ERROR', errorMessage: 'Chyba'}});
    recoverFromError(store);
    assert(store.getState().ui.view === 'CART', 'ui.view se nezměnil');
});

// ── enterHomeView / enterCartView / enterOrderView ────────────────────────────

testAsync('enterHomeView: nastaví ui.view na HOME', async () => {
    const store = makeStore({...readyState(), ui: {view: 'CART', status: 'READY', errorMessage: null}});
    await enterHomeView({store});
    assert(store.getState().ui.view === 'HOME', 'ui.view === HOME');
});

testAsync('enterCartView: nastaví ui.view na CART', async () => {
    const store = makeStore(readyState());
    await enterCartView({store});
    assert(store.getState().ui.view === 'CART', 'ui.view === CART');
});

testAsync('enterOrderView: nastaví ui.view na ORDER', async () => {
    const store = makeStore(readyState());
    await enterOrderView({store});
    assert(store.getState().ui.view === 'ORDER', 'ui.view === ORDER');
});
