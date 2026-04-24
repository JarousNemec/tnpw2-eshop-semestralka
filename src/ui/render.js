// src/ui/render.js

import { selectViewState } from '../infra/store/selectors.js';
import { createHandlers } from '../app/actionHandlers/createHandlers.js';
import { LoadingView } from './views/LoadingView.js';
import { ErrorView } from './views/ErrorView.js';
import { HomeView } from './views/HomeView.js';
import { CartView } from './views/CartView.js';
import { OrderView } from './views/OrderView.js';
import { LoginView } from './views/LoginView.js';
import { OrderSuccessView } from './views/OrderSuccessView.js';
import { ProfileView } from './views/ProfileView.js';
import { AdminView } from './views/AdminView.js';


export function render(root, state, dispatch) {
  root.replaceChildren();
  //console.log(state) (Ať to nespamuje konzoli)

  const viewState = selectViewState(state);

  const handlers = createHandlers(dispatch, viewState);

  let view;

  switch (viewState.type) {
    case 'LOADING':
      view = LoadingView(); 
      break;

    case'LOGIN':
      view = LoginView({ handlers });
      break;

    case 'ERROR':
      view = ErrorView({ message: viewState.message, handlers });
      break;

    case 'HOME':
      view = HomeView({ viewState, handlers });
      break;

    case 'CART':
      view = CartView({ viewState, handlers});
      break;

    case 'ORDER':
      view = OrderView({ viewState, handlers });
      break;
      
    case 'ORDER_SUCCESS':
      view = OrderSuccessView({ handlers });
      break;

    case 'PROFILE':
      view = ProfileView({ viewState, handlers });
      break;

    case 'ADMIN':
      view = AdminView({ viewState, handlers });
      break;

    default:
      view = document.createTextNode(`Unknown view type: ${viewState.type}`);
      break;
  }

  root.appendChild(view);

  const { notification } = state.ui;

  if (notification) {
    const notificationElement = document.createElement('div');
    notificationElement.textContent = notification.message;
    notificationElement.classList.add('notification');
    root.appendChild(notificationElement);
  }
}
