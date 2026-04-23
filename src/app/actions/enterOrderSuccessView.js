import {AppViews} from '../../enums/views.js';

/**
 * @param {{ store }} context
 * */
export async function enterOrderSuccessView({store}) {
    //switch ui state to order success view
    store.setState((state) => ({
        ...state,
        ui: {...state.ui, view: AppViews.ORDER_SUCCESS},
    }));
}
