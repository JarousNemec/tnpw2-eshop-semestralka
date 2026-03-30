import { delay } from '../utils.js';

export function createOrderApi(db) {
  return {
    /**
     * Vytvoří novou objednávku.
     * @param {string} token - Auth token přihlášeného uživatele
     * @param {{ productId: string, quantity: number }[]} items - Položky objednávky
     * @param {Object} address - Dodací adresa
     */
    async createOrder(token, items, address) {
      await delay();

      const user = db.users.find((u) => u.token === token);
      if (!user) {
        return { status: 'REJECTED', reason: 'Uživatel není přihlášen' };
      }

      for (const item of items) {
        const product = db.products.find((p) => p.productId === item.productId);
        if (!product) {
          return { status: 'REJECTED', reason: `Produkt s ID ${item.productId} neexistuje` };
        }
        if (product.amount < item.quantity) {
          return { status: 'REJECTED', reason: `Nedostatečné množství na skladě: ${product.name}` };
        }
      }

      const orderItems = items.map((item) => {
        const product = db.products.find((p) => p.productId === item.productId);
        product.amount -= item.quantity;
        return { ...structuredClone(product), amount: item.quantity };
      });

      const order = {
        orderId: 'order-' + Date.now(),
        userId: user.userId,
        items: orderItems,
        address: { ...address },
        state: 'ORDER_CREATED',
        createdAt: new Date().toISOString(),
      };

      db.orders.push(order);
      return { status: 'SUCCESS', order: structuredClone(order) };
    },

    async getUserOrders(token) {
      await delay();

      const user = db.users.find((u) => u.token === token);
      if (!user) {
        return { status: 'REJECTED', reason: 'Uživatel není přihlášen' };
      }

      const orders = db.orders.filter((o) => o.userId === user.userId);
      return { status: 'SUCCESS', orders: structuredClone(orders) };
    },

    async cancelOrder(token, orderId) {
      await delay();

      const user = db.users.find((u) => u.token === token);
      if (!user) {
        return { status: 'REJECTED', reason: 'Uživatel není přihlášen' };
      }

      const order = db.orders.find((o) => o.orderId === orderId);
      if (!order) {
        return { status: 'REJECTED', reason: 'Objednávka nenalezena' };
      }
      if (order.userId !== user.userId) {
        return { status: 'REJECTED', reason: 'Přístup odepřen' };
      }
      if (order.state !== 'ORDER_CREATED') {
        return { status: 'REJECTED', reason: 'Objednávku v tomto stavu nelze zrušit' };
      }

      order.state = 'ORDER_CANCELLED';
      return { status: 'SUCCESS' };
    },
  };
}
