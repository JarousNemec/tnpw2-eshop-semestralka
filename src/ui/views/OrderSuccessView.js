import { h } from '../dom.js';

export function OrderSuccessView({ handlers }) {
    return h('main', { className: 'container', style: 'text-align: center; margin-top: 4rem;' },
        h('h1', { style: 'color: var(--pico-primary); font-size: 3rem;' }, '🎉'),
        h('h1', {}, 'Děkujeme za vaši objednávku!'),
        h('p', {}, 'Vaše objednávka byla úspěšně přijata.'),
        h('button', { className: 'secondary', style: 'margin-top: 2rem;', onClick: handlers.onGoToShop }, 'Zpět k nakupování')
    );
}