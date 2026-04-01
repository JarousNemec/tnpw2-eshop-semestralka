/**
 * @param {{ store }} context
 * */
export function recoverFromError({store}) {
    //change state from error to ready and running state
    store.setState((state) => ({
        ...state,
        ui: {
            ...state.ui,
            status: "READY",
            errorMessage: null,
        },
    }));
}
