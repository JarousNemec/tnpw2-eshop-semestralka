import {AppViews} from '../../enums/views.js';

/**
 * @param {{ store }} context
 * */
export async function enterOrderView({store}) {
    //switch ui state to order view
    store.setState((state) => ({
        ...state,
        ui: {...state.ui, view: AppViews.ORDER},
    }));
}
