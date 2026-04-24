import { h } from '../dom.js';

export function HomeView({ viewState, handlers }) {
    const products = viewState.data?.products || [];
    const { isAuth, isAdmin, canAddToCart } = viewState.capabilities;

    if (products.length === 0) {
        return h('main', { className: 'container' },
            h('h1', {}, 'Katalog produktů'),
            h('p', {}, 'Načítám produkty...')
        );
    }

    return h('main', { className: 'container' },
        h('div', {style: 'display: flex; gap: 1rem; align-items:center; margin-bottom: 2rem; flex-wrap: wrap;'},
            h('h1', {style: 'margin: 0; flex-grow: 1;'}, 'Katalog produktů'),
            
            isAuth ? h('button', { className: 'secondary outline', onClick: handlers.onGoToProfile }, 'Můj profil') : '',
            isAdmin ? h('button', { className: 'secondary outline', onClick: handlers.onGoToAdmin }, 'Admin Panel') : '',
            isAuth ? h('button', { className: 'secondary', onClick: handlers.onLogout }, 'Odhlásit') : h('button', { className: 'secondary', onClick: handlers.onGoToLogin }, 'Přihlásit'),
            h('button', { className: 'primary', onClick: handlers.onGoToCart }, 'Košík')
        ),

        h('div', { className: 'katalog-grid' }, 
            products.map(product => 
                h('article', { className: 'card' },
                    h('h3', {}, product.name),
                    h('p', {}, product.description),
                    h('strong', {}, `${product.price} Kč`),
                
                    canAddToCart ? h('button', { onClick: () => handlers.onAddToCart(product.productId) }, 'Přidat do košíku') : ''
                )
            )
        )
    );
}