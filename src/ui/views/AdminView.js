import { h } from '../dom.js';

export function AdminView({ viewState, handlers }) {
    const orders = viewState.data?.orders || [];

    return h('main', { className: 'container' },
        h('h1', {}, 'Administrace objednávek'),
        h('section', {},
            orders.length === 0 
                ? h('p', {}, 'V systému nejsou žádné objednávky.')
                : h('table', {},
                    h('thead', {},
                        h('tr', {},
                            h('th', {}, 'ID'),
                            h('th', {}, 'Uživatel'),
                            h('th', {}, 'Stav'),
                            h('th', {}, 'Akce')
                        )
                    ),
                    h('tbody', {},
                        orders.map(order => h('tr', {},
                            h('td', {}, order.orderId),
                            h('td', {}, order.address.city),
                            h('td', {}, h('mark', {}, order.state)),
                            h('td', {}, h('div', { style: 'display: flex; gap: 0.5rem;' },
                                order.state === 'ORDER_CREATED' ? 
                                    h('button', { 
                                        className: 'outline', 
                                        style: 'padding: 0.2rem 0.5rem;',
                                        onClick: () => handlers.onConfirmOrder(order.orderId) 
                                    }, 'Potvrdit') : '',

                                order.state === 'ORDER_CONFIRMED' ? 
                                    h('button', { 
                                        className: 'outline', 
                                        style: 'padding: 0.2rem 0.5rem;',
                                        onClick: () => handlers.onShipOrder(order.orderId) 
                                    }, 'Odeslat') : '',

                                order.state !== 'ORDER_SHIPPED' && order.state !== 'ORDER_CANCELLED' ? 
                                    h('button', { 
                                        className: 'contrast outline', 
                                        style: 'padding: 0.2rem 0.5rem;',
                                        onClick: () => handlers.onCancelOrder(order.orderId) 
                                    }, 'Zrušit') : ''
                            ))
                        ))
                    )
                )
        ),
        h('div', { style: 'margin-top: 2rem;' },
            h('button', { className: 'secondary', onClick: handlers.onGoToShop }, 'Zpět do obchodu')
        )
    );
}