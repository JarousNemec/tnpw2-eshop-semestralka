import { AppViews } from '../../enums/views.js';
// TODO: refactor code
export async function enterOrderView({ store }) {
    store.setState((state) => ({
        ...state,
        ui: { ...state.ui, view: AppViews.ORDER },
    }));
}
