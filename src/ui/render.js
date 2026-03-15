// src/ui/render.js

import { selectViewState } from '../infra/store/selectors.js';
import { createHandlers } from '../app/actionHandlers/createHandlers.js';

import { LoadingView } from './views/LoadingView.js';
import { ErrorView } from './views/ErrorView.js';

import { HomeView } from './views/HomeView.js';

export function render(root, state, dispatch) {
  root.replaceChildren();
  console.log(state) //todo: remove for prod

  const viewState = selectViewState(state);

  const handlers = createHandlers(dispatch, viewState);

  let view;

  switch (viewState.type) {
    case 'LOADING':
      view = LoadingView();
      break;

    case 'ERROR':
      view = ErrorView({ message: viewState.message, handlers });
      break;

    case 'HOME':
      view = HomeView({ viewState, handlers });
      break;

    default:
      view = document.createTextNode(`Unknown view type: ${viewState.type}`);
  }

  root.appendChild(view);

  // notifikace (toast)
  const { notification } = state.ui;

  if (notification) {
    const notificationElement = document.createElement('div');
    notificationElement.textContent = notification.message;
    notificationElement.classList.add('notification');
    root.appendChild(notificationElement);
  }
}
