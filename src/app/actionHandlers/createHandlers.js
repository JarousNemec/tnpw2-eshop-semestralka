// Handler factory — vytváří callbacky pro konkrétní view
import { CartActions, AppActions, OrderActions, UserActions } from '../../enums/actions.js';
import { AddressModel } from '../../models/AddressModel.js';

export function createHandlers(dispatch, viewState) {
  switch (viewState.type) {
    case 'ERROR':
      return {
        onContinue: () => dispatch({ type: AppActions.RECOVER_FROM_ERROR}),
      };

    case 'HOME':
      return {
        onAddToCart: (productId) => dispatch({ type: CartActions.ADD_ITEM, payload: { productId } }),
        onGoToCart: () => dispatch({ type: AppActions.ENTER_CART_VIEW }),
        
        onGoToLogin: () => dispatch({ type: AppActions.ENTER_LOGIN_VIEW }),
        onLogout: () => dispatch({ type: UserActions.LOG_OUT }),
        onGoToProfile: () => dispatch({ type: AppActions.ENTER_PROFILE_VIEW }),
        onGoToAdmin: () => dispatch({ type: AppActions.ENTER_ADMIN_VIEW })
      };
      
      case 'LOGIN':
        return {
          onLogin: (email, password) => dispatch({
            type: UserActions.LOG_IN,
            payload: { email, password }
          }),

          onGoToShop: () => dispatch({ type: AppActions.ENTER_HOME_VIEW }),
          onCancelOrder: (orderId) => dispatch({ tyoe: OrderActions.CANCEL, payload: { orderId } })
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

      case 'ORDER':
        return{
          onGoToShop: () => dispatch({ type: AppActions.ENTER_HOME_VIEW }),
          onGoBackToCart: () => dispatch({ type: AppActions.ENTER_CART_VIEW }),
          onCreateOrder: (addressData) => dispatch({ type: OrderActions.CREATE, payload: addressData}),


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
      
      case 'ORDER_SUCCESS':
        return{
          onGoToShop: () => dispatch({ type: AppActions.ENTER_HOME_VIEW})
        }

        case 'PROFILE':
        case 'ADMIN':
        return {
          onGoToShop: () => dispatch({ type: AppActions.ENTER_HOME_VIEW }),
          onConfirmOrder: (orderId) => dispatch({ type: OrderActions.CONFIRM, payload: { orderId } }),
          onShipOrder: (orderId) => dispatch({ type: OrderActions.SHIP, payload: { orderId } }),
          onCancelOrder: (orderId) => dispatch({ type: OrderActions.CANCEL, payload: { orderId } })
        };

    default:
        return {};
  }
}
