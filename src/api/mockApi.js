import { createMockDatabase } from './mock/data.js';
import { createAuthApi } from './mock/authApi.js';
import { createProductApi } from './mock/productApi.js';
import { createOrderApi } from './mock/orderApi.js';

export function createApi() {
  const db = createMockDatabase();
  return {
    auth: createAuthApi(db),
    products: createProductApi(db),
    orders: createOrderApi(db),
  };
}
