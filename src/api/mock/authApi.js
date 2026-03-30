import { delay } from '../utils.js';

export function createAuthApi(db) {
  return {
    async whoAmI(token) {
      await delay();

      if (!token) {
        return { status: 'REJECTED', reason: 'Uživatel není přihlášen' };
      }

      const user = db.users.find((u) => u.token === token);

      if (!user) {
        return { status: 'REJECTED', reason: 'Neplatný token' };
      }

      return { status: 'SUCCESS', userId: user.userId, role: user.role, email: user.email };
    },

    async login(email, password) {
      await delay();

      const user = db.users.find((u) => u.email === email && u.password === password);

      if (!user) {
        return { status: 'REJECTED', reason: 'Nesprávný e-mail nebo heslo' };
      }

      return { status: 'SUCCESS', token: user.token, userId: user.userId, role: user.role, email: user.email };
    },

    async logout(token) {
      await delay();
      return { status: 'SUCCESS' };
    },
  };
}
