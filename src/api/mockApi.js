// Mock API – simuluje backend, nahraďte/rozšiřte vlastními endpointy
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const MOCK_TOKEN = 'user-token-1';

const users = [
  { id: 'user-1', role: 'USER', token: MOCK_TOKEN },
  { id: 'admin-1', role: 'ADMIN', token: 'admin-token-1' },
];

export const createApi = () => ({
  whoAmI: async (token) => {
    await delay(100);
    const user = users.find(u => u.token === token);
    if (!user) throw new Error('Unauthorized');
    return user;
  },
  // TODO: Přidejte endpointy pro vaše entity
});
