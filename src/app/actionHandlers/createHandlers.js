// Handler factory — vytváří callbacky pro konkrétní view
import { CartActions, AppActions, OrderActions} from '../../enums/actions.js';
import { AddressModel } from '../../models/AddressModel.js';

export function createHandlers(dispatch, viewState) {
  switch (viewState.type) {
    case 'ERROR':
      return {
        onRecoverFromError: () => dispatch({ type: 'RECOVER_FROM_ERROR' }),
      };

    case 'HOME':
      return {
        onAddToCart: (productId) => {
          
           dispatch({ 
             type: CartActions.ADD_ITEM, 
             payload: { productId } 
           });
        },
        onGoToCart: () => dispatch({type: AppActions.ENTER_CART_VIEW})
      };

    case 'CART':
      return{
        onGoToShop: () => dispatch({ type: AppActions.ENTER_HOME_VIEW}),

        onRemoveItem: (productId) => dispatch({ 
          type: CartActions.REMOVE_ITEM,
          payload: { productId }
        }),

        onUpdateAmount: (productId, newQuantity) => {
          if(newQuantity >= 0){
            dispatch({
              type: CartActions.UPDATE_ITEM,
              payload: { productId, quantity: newQuantity }
            });
          }
        },

        onCheckout: () => {dispatch({ type: AppActions.ENTER_ORDER_VIEW })}
      };

      case'ORDER':
        return{
          onGoToShop: () => dispatch({ type: AppActions.ENTER_HOME_VIEW }),

          onGoBackToCart: () => dispatch({ type: AppActions.ENTER_CART_VIEW }),

          onSubmitOrder: (data) => {
            const address = new AddressModel(
              data.country,
              data.city,
              data.street,
              data.postcode,
              data.houseNumber
            );

            dispatch({ type: OrderActions.CREATE, payload: { address } });
          }
        };

    default:
        return {};
  }
}
