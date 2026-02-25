# B-Shop 

jakože basic eshop :)

## Téma: Jednoduchý e-shop (bez plateb)

## Seznam členů týmu: 
- Radim Janeček I2400572
- Jaroslav Němec I2500139

## Rozdělení business odpovědností

### Jaroslav Němec
- Business entita: Objednávka
- Stavový automat: created -> confirmed -> shipped ->cancelled
- Popis odpovědnosti za chování:
- Povolené akce: USER_LOGIN, USER_LOGOUT
- Business pravidla: Nepřihlášený uživatel nemůže vytvořit objednávku. Přihlášený uživatel může pracovat s košíkem a objednávkami.

- Business entita: Uživatel
- Stavový automat: anonymous -> authenticated, authenticated -> anonymous
- Popis odpovědnosti za chování: 

### Radim Janeček
- Business entita: Košík
- Stavový automat: empty -> active -> checking_out -> completed
- Popis odpovědnosti za chování:

- Business entita: Položka v košíku
- Stavový automat: 
- Popis odpovědnosti za chování:

Produkt odstraněn, protože to je RO entita nikoli stavová.

## Rozdělení infrastrukturních odpovědností
### Jaroslav Němec
- IR01 - Správa stavu aplikace 
- IR02 - Dispatcher
- IR03 - Asynchronní operace
- IR05 - Selektory

### Radim Janeček
- IR04 - Router/Navigační logika
- IR06 - Renderovací logika
- IR07 - Handlery a vazba UI
- IR08 - Autentizace a technická autorizace

## Rozhraní mezi částmi

## Způsob spolupráce a kontroly práce:
- Tým používá Github Issues pro trackování progressu a definování práce, co je třeba udělat.
- Jestliže člen nesplní část, která mu byla přidělena, nemá to vliv na práci ostatních. Ostatní si stejně musí napsat mock systému a testy, aby předveli funkčnost
jejich části, takže to není potřeba řešit.
