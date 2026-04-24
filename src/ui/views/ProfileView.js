import { h } from '../dom.js';

export function ProfileView({ viewState, handlers }) {
    const orders = viewState.data?.orders || [];

    return h('main', { className: 'container' },
        h('h1', {}, 'Můj profil'),
        h('section', {},
            h('h2', {}, 'Historie objednávek'),
            orders.length === 0 
                ? h('p', {}, 'Zatím jste neudělali žádnou objednávku.')
                : h('table', {},
                    h('thead', {},
                        h('tr', {},
                            h('th', {}, 'ID'),
                            h('th', {}, 'Stav'),
                            h('th', {}, 'Země'),
                            h('th', {}, 'Město'),
                            h('th', {}, 'Akce')
                        )
                    ),
                    h('tbody', {},
                        orders.map(order => h('tr', {},
                            h('td', {}, order.orderId),
                            h('td', {}, h('mark', {}, order.state)),
                            h('td', {}, order.address.country),
                            h('td', {}, order.address.city),
                            h('td', {}, 
                                order.state === 'ORDER_CREATED' 
                                    ? h('button', { 
                                        className: 'contrast outline', 
                                        style: 'padding: 0.2rem 0.5rem; font-size: 0.8rem;',
                                        onClick: () => handlers.onCancelOrder(order.orderId)
                                      }, 'Zrušit') 
                                    : ''
                            )
                        ))
                    )
                )
        ),
        h('div', { style: 'margin-top: 2rem;' },
            h('button', { className: 'secondary', onClick: handlers.onGoToShop }, 'Zpět do obchodu')
        )
    );
}