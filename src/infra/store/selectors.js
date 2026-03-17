// src/infra/store/selectors.js
// selectViewState je jediné místo rozhodování o stavo-pohledu aplikace

export function selectAuth(state) {
  return state.auth;
}

// TODO: Přidejte doménové selektory
// export function selectProducts(state) {
//   return state.products ?? [];
// }

/*
 * Vrací objekt ve tvaru:
 * {
 *   type: 'LOADING' | 'ERROR' | 'HOME' | ...,
 *   message?: string,
 *   data?: any,
 *   capabilities?: { ... },
 * }
 */
export function selectViewState(state) {
  const { status, errorMessage, view } = state.ui;

  if (status === 'LOADING') {
    return { type: 'LOADING' };
  }

  if (status === 'ERROR') {
    return { type: 'ERROR', message: errorMessage };
  }

  if (status !== 'READY') {
    return { type: 'ERROR', message: `Unknown ui status: ${status}` };
  }

  // TODO: Přidejte case větve pro vaše views
  switch (view) {
    case 'HOME':
      // TADY přidáváme products do dat, aby je HomeView vidělo
      return { 
          type: 'HOME', 
          data: { products: state.shop.products }, 
          capabilities: {} 
      };
  }
}
