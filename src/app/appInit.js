// Načte identitu uživatele a inicializuje stav aplikace
export async function appInit({ store, api, dispatch }) {
  const token = 'user-token-1';

  store.setState((state) => ({
    ...state,
    ui: { ...state.ui, status: 'LOADING', errorMessage: null },
  }));

  try {
    const user = await api.whoAmI(token);
    store.setState((state) => ({
      ...state,
      auth: { role: user.role, userId: user.id, token },
      ui: { ...state.ui, view: 'HOME', status: 'READY', errorMessage: null },
    }));
    // TODO: Načtěte potřebná data (produkty, objednávky, ...)
  } catch (e) {
    store.setState((state) => ({
      ...state,
      ui: { ...state.ui, status: 'ERROR', errorMessage: e.message },
    }));
  }
}
