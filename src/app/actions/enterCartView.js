import { AppViews } from '../../enums/views.js';
// TODO: refactor code
export async function enterCartView({ store }) {
    store.setState((state) => ({
        ...state,
        ui: { ...state.ui, view: AppViews.CART },
    }));
}
