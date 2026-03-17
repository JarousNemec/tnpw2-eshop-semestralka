// src/app/actionHandlers/createHandlers.js

// Handler factory — vytváří callbacky pro konkrétní view
// TODO: Přidejte handlery pro vaše views

// src/app/actionHandlers/createHandlers.js
import { CartActions } from '../../enums/actions.js';

export function createHandlers(dispatch, viewState) {
  switch (viewState.type) {
    case 'ERROR':
      return {
        onRecoverFromError: () => dispatch({ type: 'RECOVER_FROM_ERROR' }),
      };

    case 'HOME':
      return {
        // Tuto funkci jsme si nachystali v HomeView.js
        onAddToCart: (productId) => {
          
           dispatch({ 
             type: CartActions.ADD_ITEM, 
             payload: { productId } 
           });
        }
      };

    


    // TODO: Přidejte case větve pro vaše views
    // case 'HOME':
    //   return homeHandlers(dispatch, viewState);
    default:
        return {};
  }
}
