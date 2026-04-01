import {UiStates} from '../../enums/states.js';

/**
 * @param {{ store, payload: { message: string } }} context
 */
export async function displayError({store, payload}) {
    //switch app in to error state and set error message
    store.setState((state) => ({
        ...state,
        ui: {...state.ui, status: UiStates.ERROR, errorMessage: payload.message ?? 'Neznámá chyba'},
    }));
}
