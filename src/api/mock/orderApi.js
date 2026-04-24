import {delay} from '../utils.js';

export function createOrderApi(db) {
    return {
        /**
         * Vytvoří novou objednávku.
         * @param {string} token - Auth token přihlášeného uživatele
         * @param {{ productId: string, quantity: number }[]} items - Položky objednávky
         * @param {Object} address - Dodací adresa
         */
        async createOrder(token, items, address) {

            //simulate real http call delay
            await delay();

            //check if user is logged in to create order
            const user = db.users.find((u) => u.token === token);
            if (!user) {
                return {status: 'REJECTED', reason: 'Uživatel není přihlášen'};
            }

            //check if all products in cart are still available
            for (const item of items) {
                const product = db.products.find((p) => p.productId === item.productId);
                if (!product) {
                    return {status: 'REJECTED', reason: `Produkt s ID ${item.productId} neexistuje`};
                }
                if (product.amount <= item.quantity) {
                    return {status: 'REJECTED', reason: `Nedostatečné množství na skladě: ${product.name}`};
                }
            }


            const orderItems = items.map((item) => {

                //find instance in warehouse
                const product = db.products.find((p) => p.productId === item.productId);

                //decrease stored amount in warehouse (db)
                product.amount -= item.quantity;

                //create instance copy and return the instance into map as new item
                return {...structuredClone(product), amount: item.quantity};
            });

            //init new order object and push it to the mock db
            const order = {
                orderId: 'order-' + Date.now(),
                userId: user.userId,
                items: orderItems,
                address: {...address},
                state: 'ORDER_CREATED',
                createdAt: new Date().toISOString(),
            };

            db.orders.push(order);
            return {status: 'SUCCESS', order: structuredClone(order)};
        },

        async getUserOrders(token) {
            //simulate real http call delay
            await delay();

            //check if user is logged in to create order
            const user = db.users.find((u) => u.token === token);
            if (!user) {
                return {status: 'REJECTED', reason: 'Uživatel není přihlášen'};
            }

            //load and return all orders with the userId
            const orders = db.orders.filter((o) => o.userId === user.userId);
            return {status: 'SUCCESS', orders: structuredClone(orders)};
        },

        async getAllOrders(token){
            await delay();

            const user = db.users.find((u) => u.token === token);
            if(!user || user.role !== 'ADMIN'){
                return {status: 'REJECTED', reason: 'Přístup odepřen'};
            }
            return {status: 'SUCCESS', orders: structuredClone(db.orders)};
        },

        async cancelOrder(token, orderId) {
            //simulate real http call delay
            await delay();

            //check if user is logged in to create order
            const user = db.users.find((u) => u.token === token);
            if (!user) {
                return {status: 'REJECTED', reason: 'Uživatel není přihlášen'};
            }

            //get order object from db
            const order = db.orders.find((o) => o.orderId === orderId);

            //check if order exists
            if (!order) {
                return {status: 'REJECTED', reason: 'Objednávka nenalezena'};
            }

            //check if order belongs to user
            if (order.userId !== user.userId && user.role !== 'ADMIN') {
                return {status: 'REJECTED', reason: 'Přístup odepřen'};
            }

            //check if it is possible to cancel the order
            if (order.state !== 'ORDER_CREATED') {
                return {status: 'REJECTED', reason: 'Objednávku v tomto stavu nelze zrušit'};
            }

            //set new order state (because of reference to the object, this is all we need to do)
            order.state = 'ORDER_CANCELLED';
            return {status: 'SUCCESS'};
        },
    };
}
