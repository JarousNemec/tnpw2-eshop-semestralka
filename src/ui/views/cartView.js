import { h } from './dom.js';

/**
 * 
 * @param {Object} cartState
 * @param {Function} dispatch
 */
export function renderCart(cartState, dispatch) {
    if (cartState.status === 'empty') {
        return h('div', { className: 'cart empty-cart' },
            h('h2', {}, 'Váš košík'),
            h('p', {}, 'Košík je prázdný.')
        );
    }

    return h('div', { className: 'cart active-cart' },
        h('h2', {}, 'Váš košík'),
        h('ul', { className: 'cart-item-list' },
            cartState.items.map(item => 
                h('li', { className: 'cart-item' },
                    h('span', {}, `${item.name} - ${item.price} Kč`),
                    h('button', { 
                        onClick: () => dispatch({ 
                            type: 'CART_REMOVE_ITEM', 
                            payload: { productId: item.id } 
                        }) 
                    }, 'Odebrat')
                )
            )
        ),
        
        cartState.status === 'active' ? h('button', { 
            className: 'checkout-btn',
            onClick: () => dispatch({ type: 'CART_START_CHECKOUT' })
        }, 'Přejít k pokladně') : null
    );
}