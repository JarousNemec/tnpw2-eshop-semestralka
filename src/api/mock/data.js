export function createMockDatabase() {
    //mock BE database
    return {
        users: [
            {
                userId: 'customer-1',
                email: 'jan@bshop.cz',
                password: 'heslo123',
                role: 'CUSTOMER',
                token: 'customer-token-1',
            },
            {
                userId: 'admin-1',
                email: 'admin@bshop.cz',
                password: 'admin123',
                role: 'ADMIN',
                token: 'admin-token-1',
            },
        ],

        products: [
            {
                productId: '1',
                name: 'Herní myš X-Grip',
                description: 'Ergonomická myš s RGB podsvícením a 16000 DPI.',
                price: 1290,
                amount: 15,
                imageUrl: 'https://picsum.photos/seed/p1/200'
            },
            {
                productId: '2',
                name: 'Mechanická klávesnice Clicky',
                description: 'Modré spínače, CZ layout, kovové tělo.',
                price: 2450,
                amount: 8,
                imageUrl: 'https://picsum.photos/seed/p2/200'
            },
            {
                productId: '3',
                name: 'Monitor UltraSharp 27"',
                description: '4K rozlišení, IPS panel, věrné podání barev.',
                price: 8900,
                amount: 5,
                imageUrl: 'https://picsum.photos/seed/p3/200'
            },
            {
                productId: '4',
                name: 'USB-C Hub 7-v-1',
                description: 'HDMI, USB 3.0, čtečka SD karet v jednom.',
                price: 750,
                amount: 20,
                imageUrl: 'https://picsum.photos/seed/p4/200'
            },
            {
                productId: '5',
                name: 'Bezdrátová sluchátka Silence',
                description: 'Aktivní potlačení hluku a výdrž 40 hodin.',
                price: 3200,
                amount: 12,
                imageUrl: 'https://picsum.photos/seed/p5/200'
            },
            {
                productId: '6',
                name: 'Webkamera Streamer Pro',
                description: 'Full HD rozlišení při 60 FPS s vestavěným světlem.',
                price: 1890,
                amount: 10,
                imageUrl: 'https://picsum.photos/seed/p6/200'
            },
            {
                productId: '7',
                name: 'Externí SSD 1TB',
                description: 'Rychlost čtení až 1050 MB/s, odolné hliníkové pouzdro.',
                price: 2100,
                amount: 25,
                imageUrl: 'https://picsum.photos/seed/p7/200'
            },
            {
                productId: '8',
                name: 'Podložka pod myš XXL',
                description: 'Hladký povrch, rozměry 900×400 mm.',
                price: 450,
                amount: 50,
                imageUrl: 'https://picsum.photos/seed/p8/200'
            },
            {
                productId: '9',
                name: 'Rameno na monitor',
                description: 'Plynový píst pro snadné polohování obrazovky.',
                price: 1550,
                amount: 7,
                imageUrl: 'https://picsum.photos/seed/p9/200'
            },
            {
                productId: '10',
                name: 'LED pásek SmartHome',
                description: 'Chytré osvětlení ovládané přes mobilní aplikaci.',
                price: 690,
                amount: 30,
                imageUrl: 'https://picsum.photos/seed/p10/200'
            },
        ],

        orders: [],
    };
}
