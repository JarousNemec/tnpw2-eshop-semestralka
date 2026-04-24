import { h } from '../dom.js';

export function LoginView({ handlers }) {
    return h('main', { className: 'container' },
        h('h1', {}, 'Přihlášení'),
        h('form', {
            onSubmit: (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handlers.onLogin(formData.get('email'), formData.get('password'));
            }
        },
            h('label', {}, 'E-mail', h('input', { type: 'email', name: 'email', required: true })),
            h('label', {}, 'Heslo', h('input', { type: 'password', name: 'password', required: true })),
            h('button', { type: 'submit' }, 'Přihlásit se'),
            h('button', { type: 'button', className: 'secondary outline', onClick: handlers.onGoToShop }, 'Zpět do katalogu'),
        )
    );
}