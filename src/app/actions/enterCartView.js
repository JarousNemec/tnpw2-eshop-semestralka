import {AppViews} from '../../enums/views.js';

/**
 * @param {{ store }} context
 * */
export async function enterCartView({store}) {
    //switch ui state to cart view
    store.setState((state) => ({
        ...state,
        ui: {...state.ui, view: AppViews.CART},
    }));
}
