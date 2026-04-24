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

  if (status === 'LOADING') return { type: 'LOADING' };
  if (status === 'ERROR') return { type: 'ERROR', message: errorMessage };
  if (status !== 'READY') return { type: 'ERROR', message: `Unknown ui status: ${status}` };

  const isAuth = state.auth.user.state === 'AUTHENTICATED';
  const isAdmin = state.auth.user.role === 'ADMIN';

  switch (view) {
    case 'HOME':
      return { 
          type: 'HOME', 
          data: { products: state.shop.products }, 
          capabilities: {
              canAddToCart: isAuth,
              isAdmin: isAdmin,
              isAuth: isAuth,
          } 
      };
    case 'CART':
      return {
          type: 'CART',
          data: { cart: state.shop.cart },
          capabilities: {
              canCheckout: state.shop.cart && state.shop.cart.products.length > 0
          }
      };
    case 'ORDER':
      return { type: 'ORDER', data: { cart: state.shop.cart }, capabilities: {} };

    case 'LOGIN':
      return { type: 'LOGIN', data: {}, capabilities: {} };

    case 'ORDER_SUCCESS':
      return { type: 'ORDER_SUCCESS', data: {}, capabilities: {} };

    case 'PROFILE':
      return { type: 'PROFILE', data: { orders: state.auth.user?.orders || [] }, capabilities: { isAuth: isAuth } };
      
    case 'ADMIN':
      return { type: 'ADMIN', data: { orders: state.admin?.allOrders || [] }, capabilities: { isAdmin: isAdmin} };

  default:
    return { type: 'HOME', data: { products:state.shop.products }, capabilities: {isAuth, isAdmin, canAddToCart: isAuth } };
  }
}
