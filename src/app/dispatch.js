// src/app/dispatch.js

import { appInit } from './appInit.js';
import { recoverFromError } from './actions/recoverFromError.js';

// TODO: Import your action handlers here
// import { navigateTo } from './actions/navigateTo.js';

export function createDispatcher(store, api) {
  return async function dispatch(action) {
    const { type, payload = {} } = action ?? {};

    switch (type) {
      case 'APP_INIT':
        return appInit({ store, api, dispatch });

      case 'RECOVER_FROM_ERROR':
        return recoverFromError(store);

      // TODO: Add your action cases here
      // case 'NAVIGATE_TO':
      //   return navigateTo({ store, payload });

      default:
        console.warn(`Unknown action type: ${type}`);
    }
  };
}
