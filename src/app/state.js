// src/app/state.js
/*
UI state contract
=================
state.ui = {
  status: 'READY' | 'LOADING' | 'ERROR',
  errorMessage: null | string,
};
READY -> LOADING -> READY
READY -> ERROR
*/

export function createInitialState() {
  return {
    // TODO: Přidejte doménová data (např. products: [], orders: [])

    // ====== identity  ======
    auth: {
      role: 'ANONYMOUS', // ANONYMOUS | USER | ADMIN
      userId: null,
      token: null,
    },

    // ====== UI state =========
    ui: {
      view: 'HOME',       // TODO: Definujte pohledy (HOME | LIST | DETAIL | ...)
      selectedId: null,
      status: 'LOADING',  // LOADING | READY | ERROR
      errorMessage: null,
      notification: null,
    },
  };
}
