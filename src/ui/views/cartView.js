import { h } from '../dom.js';

export function CartView({ viewState, handlers }) {
    const cart = viewState.data?.cart;

    if (!cart || !cart.products || cart.products.length === 0) {
        return h('main', { className: 'container' },
            h('h1', {}, 'Košík'),
            h('p', {}, 'Košík je prázdný.'),
            h('button', {
                className: 'secondary',
                onClick: handlers.onGoToShop
                }, 'Zpět do obchodu')
            );
    }

    //Aktivní košík
    return h('main', { className: 'container' },
        h('div', { style: 'display: flex; justify-content: space-between; align-items: center;'},
            h('h1', {}, 'Váš nákupiní košík'),
            h('button', {className: 'secondary outline', onClick: handlers.onGoToShop }, 'Pokračovat v nákupu')
        ),

        h('div', { className: 'cart-items' },
            cart.products.map(product => 
                h('article', { className: 'card cart-item', style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;' },
                    h('div', {},
                        h('strong', {}, product.name),
                        h('div', {}, `${product.price} Kč / ks`)
                    ),
                    h('div', { className: 'cart-item', style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;' },
                        h('button', { className: 'outline', onClick: () => handlers.onUpdateAmount(product.productId, product.amount - 1) }, '-'),
                        h('span', {}, `${product.amount} ks`),
                        h('button', { className: 'outline', onClick: () => handlers.onUpdateAmount(product.productId, product.amount + 1) }, '+'),
                        h('button', { className: 'contrast', onClick: () => handlers.onRemoveItem(product.productId) }, 'Odebrat')
                    )
                )
            ),
        ),

        h('footer', { style: 'margin-top: 2rem; textalign:right;'},
            h('h3', {}, `Celkem: ${cart.getTotalPrice()} Kč`),
            h('button', { onClick: handlers.onCheckout }, 'Přejít k pokladně')
        )
    )
 
}