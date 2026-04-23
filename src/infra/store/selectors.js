// src/infra/store/selectors.js
// selectViewState je jediné místo rozhodování o stavo-pohledu aplikace

export function selectAuth(state) {
  return state.auth;
}

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

  switch (view) {
    case 'HOME':
      return { 
          type: 'HOME', 
          data: { products: state.shop.products }, 
          capabilities: {} 
      };


    case 'CART':
      return{
          type: 'CART',
          data: {cart: state.shop.cart},
          capabilities: {}
      };
    
    case 'ORDER':
      return{
        type: 'ORDER',
        data: { cart: state.shop.cart },
        capabilities: {}
      };  
  }
}
