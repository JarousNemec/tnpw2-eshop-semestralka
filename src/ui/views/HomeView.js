import { h } from '../dom.js';

export function HomeView({ viewState, handlers }) {
    const products = viewState.data?.products || [];

    if (products.length === 0) {
        return h('main', { className: 'container' },
            h('h1', {}, 'Katalog produktů'),
            h('p', {}, 'Načítám produkty...')
        );
    }

    return h('main', { className: 'container' },
        h('div', {style: 'display: flex; justify-content: space-between; align-items:center'},
            h('h1', {}, 'Katalog produktů'),
            h('button', {
                className: 'secondary',
                onClick: handlers.onGoToCart
            }, 'Přejít do košíku')
        ),
        
            h('div', { className: 'katalog-grid' }, 
                products.map(product => 
                    h('article', { className: 'card' },
                        h('h3', {}, product.name),
                        h('p', {}, product.description),
                        h('strong', {}, `${product.price} Kč`),
                    
                        h('button', { 
                            onClick: () => {
                                if (handlers.onAddToCart) {
                                    handlers.onAddToCart(product.productId);
                                } else {
                                    console.log('Kliknuto na produkt:', product.productId);
                                }
                            }
                        }, 'Přidat do košíku')
                    )
                )
            )
        );
}