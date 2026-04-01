import {AppViews} from '../../enums/views.js';

/**
 * @param {{ store }} context
 * */
export async function enterHomeView({store}) {
    //switch ui state to home view
    store.setState((state) => ({
        ...state,
        ui: {...state.ui, view: AppViews.HOME},
    }));
}
