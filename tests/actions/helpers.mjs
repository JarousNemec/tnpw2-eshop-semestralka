import {createStore} from '../../src/infra/store/createStore.js';
import {createInitialState} from '../../src/app/state.js';
import {UserModel} from '../../src/models/UserModel.js';
import {CartModel} from '../../src/models/CartModel.js';
import {ProductModel} from '../../src/models/ProductModel.js';
import {OrderModel} from '../../src/models/OrderModel.js';
import {AddressModel} from '../../src/models/AddressModel.js';
import {UserStates, UserRoles, CartStates, OrderStates} from '../../src/enums/states.js';
import {AppViews} from '../../src/enums/views.js';

const tests = [];

const stats = {
    passed: 0,
    failed: 0,
};

export function printSummary() {
    const total = stats.passed + stats.failed;

    console.log('\n📊 TEST SUMMARY');
    console.log(`✅ Passed: ${stats.passed}`);
    console.log(`❌ Failed: ${stats.failed}`);
    console.log(`📦 Total: ${total}`);

    if (stats.failed === 0) {
        console.log('🎉 Všechny testy prošly!');
    }
}

export async function runTests() {
    for (const t of tests) {
        console.log(`TEST: ${t.name}`);
        try {
            await t.fn();
        } catch (e) {
            console.error('❌ Error while doing test:', e.message);
        }
    }
}

export function assert(condition, message) {
    if (!condition) {
        stats.failed++;
        console.error('❌ FAILED:', message);
    } else {
        stats.passed++;
        console.log('✅ SUCCESS:', message);
    }
}

export function deepStrictEqual(a, b) {
    if (a === b) return true;

    if (typeof a !== typeof b) return false;

    if (a === null || b === null) return a === b;

    if (typeof a !== 'object') return a === b;

    // různé konstruktory (např. UserModel vs Object)
    if (a.constructor !== b.constructor) return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!deepStrictEqual(a[key], b[key])) return false;
    }

    return true;
}

export async function testAsync(name, fn) {
    tests.push({ name, fn });
}

/*
 * Mock dispatch — zaznamenává volání dispatch() uvnitř akcí
 */
export function createMockDispatch() {
    const calls = [];
    const dispatch = async (action) => {
        calls.push(action);
    };
    dispatch.calls = calls;
    dispatch.lastCall = () => calls[calls.length - 1];
    dispatch.calledWith = (type) => calls.some(c => c.type === type);
    return dispatch;
}

/*
 * Mock API — nulová latence, odpovědi odpovídají tvarům reálného API
 * Každou sekci lze přepsat přes overrides.auth / overrides.products / overrides.orders
 */
export function createMockApi(overrides = {}) {
    const auth = {
        async login(email, password) {
            if (email === 'jan@bshop.cz' && password === 'heslo123') {
                return {status: 'SUCCESS', token: 'customer-token-1', userId: 'customer-1', role: 'CUSTOMER', email};
            }
            if (email === 'admin@bshop.cz' && password === 'admin123') {
                return {status: 'SUCCESS', token: 'admin-token-1', userId: 'admin-1', role: 'ADMIN', email};
            }
            return {status: 'REJECTED', reason: 'Nesprávný e-mail nebo heslo'};
        },
        async logout(_token) {
            return {status: 'SUCCESS'};
        },
        async whoAmI(token) {
            if (token === 'customer-token-1') {
                return {status: 'SUCCESS', userId: 'customer-1', role: 'CUSTOMER', email: 'jan@bshop.cz'};
            }
            if (token === 'admin-token-1') {
                return {status: 'SUCCESS', userId: 'admin-1', role: 'ADMIN', email: 'admin@bshop.cz'};
            }
            return {status: 'REJECTED', reason: 'Neplatný token'};
        },
        ...(overrides.auth || {}),
    };

    const products = {
        async getProducts() {
            return {
                status: 'SUCCESS',
                products: [
                    {
                        productId: '1',
                        name: 'Herní myš X-Grip',
                        description: 'Ergonomická myš',
                        price: 1290,
                        amount: 15,
                        imageUrl: 'mouse.jpg'
                    },
                ],
            };
        },
        ...(overrides.products || {}),
    };

    const orders = {
        async getUserOrders(token) {
            if (!token) return {status: 'REJECTED', reason: 'Uživatel není přihlášen'};
            return {status: 'SUCCESS', orders: []};
        },
        async createOrder(token, items, address) {
            if (!token) return {status: 'REJECTED', reason: 'Uživatel není přihlášen'};
            return {
                status: 'SUCCESS',
                order: {
                    orderId: 'order-mock-1',
                    items: items.map(i => ({
                        productId: i.productId,
                        name: 'Herní myš X-Grip',
                        description: 'Ergonomická myš',
                        price: 1290,
                        amount: i.quantity,
                        imageUrl: 'mouse.jpg',
                    })),
                    address: {
                        country: address.country,
                        city: address.city,
                        street: address.street,
                        postcode: address.postcode,
                        houseNumber: address.houseNumber,
                    },
                },
            };
        },
        async cancelOrder(_token, _orderId) {
            return {status: 'SUCCESS'};
        },
        ...(overrides.orders || {}),
    };

    return {auth, products, orders};
}

/*
 * Surová data objednávky ve tvaru, který vrací API (ne OrderModel)
 */
export function mockApiOrder(orderId = 'order-api-1', state = 'ORDER_CREATED') {
    return {
        orderId,
        items: [
            {
                productId: '1',
                name: 'Herní myš X-Grip',
                description: 'Ergonomická myš',
                price: 1290,
                amount: 1,
                imageUrl: 'mouse.jpg'
            },
        ],
        address: {country: 'CZ', city: 'Praha', street: 'Hlavní', postcode: '110 00', houseNumber: '1'},
        state,
    };
}

/*
 * Fixtures stavu — funkce, aby každý test dostal čerstvou instanci
 */
export function sampleProduct(id = '1') {
    return new ProductModel(id, 'Herní myš X-Grip', 'Ergonomická myš', 1290, 15, 'mouse.jpg');
}

export function sampleAddress() {
    return new AddressModel('CZ', 'Praha', 'Hlavní', '110 00', '1');
}

export function readyState() {
    return {
        auth: {user: new UserModel(UserStates.ANONYMOUS, UserRoles.ANONYMOUS, '', '', '', '', [])},
        ui: {view: AppViews.HOME, status: 'READY', errorMessage: null},
        shop: {products: [sampleProduct()], cart: new CartModel([], CartStates.EMPTY)},
    };
}

export function customerState() {
    return {
        auth: {user: new UserModel(UserStates.AUTHENTICATED, UserRoles.CUSTOMER, 'customer-1', 'customer-token-1', 'jan@bshop.cz', '', [])},
        ui: {view: AppViews.HOME, status: 'READY', errorMessage: null},
        shop: {products: [sampleProduct()], cart: new CartModel([], CartStates.EMPTY)},
    };
}

export function adminState() {
    return {
        auth: {user: new UserModel(UserStates.AUTHENTICATED, UserRoles.ADMIN, 'admin-1', 'admin-token-1', 'admin@bshop.cz', '', [])},
        ui: {view: AppViews.HOME, status: 'READY', errorMessage: null},
        shop: {products: [sampleProduct()], cart: new CartModel([], CartStates.EMPTY)},
    };
}

export function stateWithCartItem(productId = '1') {
    const base = customerState();
    const product = sampleProduct(productId);
    return {
        ...base,
        shop: {
            ...base.shop,
            cart: new CartModel(
                [new ProductModel(productId, product.name, product.description, product.price, 1, product.imageUrl)],
                CartStates.ACTIVE,
            ),
        },
    };
}

export function stateWithOrder(orderId = 'order-test-1', orderState = OrderStates.CREATED) {
    const base = customerState();
    const order = new OrderModel(orderId, [sampleProduct()], sampleAddress(), base.auth.user, orderState);
    return {
        ...base,
        auth: {
            user: new UserModel(
                UserStates.AUTHENTICATED, UserRoles.CUSTOMER, 'customer-1', 'customer-token-1', 'jan@bshop.cz', '',
                [order],
            ),
        },
    };
}

export function adminStateWithOrder(orderId = 'order-test-1', orderState = OrderStates.CREATED) {
    const base = adminState();
    const order = new OrderModel(orderId, [sampleProduct()], sampleAddress(), base.auth.user, orderState);
    return {
        ...base,
        auth: {
            user: new UserModel(
                UserStates.AUTHENTICATED, UserRoles.ADMIN, 'admin-1', 'admin-token-1', 'admin@bshop.cz', '',
                [order],
            ),
        },
    };
}

export function makeStore(state) {
    return createStore(state);
}
