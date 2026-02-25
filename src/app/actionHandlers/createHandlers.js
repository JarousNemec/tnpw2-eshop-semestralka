// src/app/actionHandlers/createHandlers.js

// Handler factory — vytváří callbacky pro konkrétní view
// TODO: Přidejte handlery pro vaše views

export function createHandlers(dispatch, viewState) {
  switch (viewState.type) {
    case 'ERROR':
      return {
        onRecoverFromError: () => dispatch({ type: 'RECOVER_FROM_ERROR' }),
      };

    // TODO: Přidejte case větve pro vaše views
    // case 'HOME':
    //   return homeHandlers(dispatch, viewState);

    default:
      return {};
  }
}
