import { UiStates } from '../../enums/states.js';
// TODO: refactor code
export async function displayError({ store, payload }) {
    store.setState((state) => ({
        ...state,
        ui: { ...state.ui, status: UiStates.ERROR, errorMessage: payload.message ?? 'Neznámá chyba' },
    }));
}
