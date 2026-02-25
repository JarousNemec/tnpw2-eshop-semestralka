// src/ui/views/HomeView.js

export function HomeView({ viewState, handlers }) {
  const el = document.createElement('main');

  const h1 = document.createElement('h1');
  h1.textContent = 'Vítejte';

  const p = document.createElement('p');
  p.textContent = 'TODO: Implementujte HomeView';

  el.appendChild(h1);
  el.appendChild(p);

  return el;
}
