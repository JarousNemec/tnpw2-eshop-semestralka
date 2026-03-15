// Mock API – simuluje backend, nahraďte/rozšiřte vlastními endpointy
import {ProductModel} from "../models/ProductModel.js";

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const MOCK_TOKEN = 'user-token-1';

const users = [
    {id: 'user-1', role: 'USER', token: MOCK_TOKEN},
    {id: 'admin-1', role: 'ADMIN', token: 'admin-token-1'},
];

export const createApi = () => ({
    whoAmI: async (token) => {
        await delay(100);
        const user = users.find(u => u.token === token);
        if (!user) throw new Error('Unauthorized');
        return user;
    },
    // TODO: Přidejte endpointy pro vaše entity
    /**
     * Simuluje stažení seznamu produktů z databáze
     * @returns {Promise<ProductModel[]>}  <-- Důležité: Přidán Promise
     */
    getProducts: async () => {
        await delay(100);
        return [
            new ProductModel("1", "Herní myš X-Grip", "Ergonomická myš s RGB podsvícením a 16000 DPI.", 1290, 15, "https://picsum.photos/200"),
            new ProductModel("2", "Mechanická klávesnice Clicky", "Modré spínače, CZ layout, kovové tělo.", 2450, 8, "https://picsum.photos/200"),
            new ProductModel("3", "Monitor UltraSharp 27\"", "4K rozlišení, IPS panel, věrné podání barev.", 8900, 5, "https://picsum.photos/200"),
            new ProductModel("4", "USB-C Hub 7-v-1", "HDMI, USB 3.0, čtečka SD karet v jednom.", 750, 20, "https://picsum.photos/200"),
            new ProductModel("5", "Bezdrátová sluchátka Silence", "Aktivní potlačení hluku a výdrž 40 hodin.", 3200, 12, "https://picsum.photos/200"),
            new ProductModel("6", "Webkamera Streamer Pro", "Full HD rozlišení při 60 FPS s vestavěným světlem.", 1890, 10, "https://picsum.photos/200"),
            new ProductModel("7", "Externí SSD 1TB", "Rychlost čtení až 1050 MB/s, odolné hliníkové pouzdro.", 2100, 25, "https://picsum.photos/200"),
            new ProductModel("8", "Podložka pod myš XXL", "Hladký povrch, rozměry 900x400mm.", 450, 50, "https://picsum.photos/200"),
            new ProductModel("9", "Rameno na monitor", "Plynový píst pro snadné polohování obrazovky.", 1550, 7, "https://picsum.photos/200"),
            new ProductModel("10", "LED pásek SmartHome", "Chytré osvětlení ovládané přes mobilní aplikaci.", 690, 30, "https://picsum.photos/200")
        ]
    }
});
