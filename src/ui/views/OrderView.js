import { h } from '../dom.js';

export function OrderView({ viewState, handlers }) {
    const cart = viewState .data?.cart;

    if (!cart || !cart.products || cart.products.length === 0){
        return h('main', { className: 'container' },
            h('h1', {}, 'Pokladna'),
            h('p', {}, 'Váš košík je prázdný. S prázdným košíkem nelze vytvořit objednávku'),
            h('button', { onClick: handlers.onGoToShop }, 'Zpět do obchodu')
        );
    }

    return h('main', {className: 'container' },
        h('h1', {}, 'Dokončení objednávky'),
        h('p', {style: 'margin-bottom: 2rem' }, 'Vyplňte doručovací údaje'),

        //Formulář pro adresu
        h('form', {
            onSubmit: (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                handlers.onCreateOrder({
                    street: formData.get('street'),
                    houseNumber: formData.get('houseNumber'),
                    city: formData.get('city'),
                    postcode: formData.get('postcode'),
                    country: formData.get('country'),
                });
            }
        },
        
            h('div', {className:'grid' },
                h('label', {}, 'Ulice', h('input', {name: 'street', required: true})),
                h('label', {}, 'Číslo popisné', h('input', {name: 'houseNumber', required: true})),
            ),
            h('div', {className: 'grid' },
                h('label', {}, 'Město', h('input', {name: 'city', required: true})),
                h('label', {}, 'PSČ', h('input', {name: 'postcode', required: true})),
            ),
            h('label', {}, 'Země', h('input', {name: 'country', value: 'Česká Republika', required: true})),

            h('div', {style: 'display: flex; justify-content: space-between; margin-top: 2rem;'},
                h('button', {type: 'button', className: 'secondary outline', onClick: handlers.onGoBackToCart}, 'Zpět do košíku'),
                h('button', {type: 'submit' }, `Závazně objednat (${cart.getTotalPrice()} Kč)`)
            )
        )
    );
}