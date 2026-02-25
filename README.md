# B-Shop 

jakože basic eshop :)

## Téma: Jednoduchý e-shop (bez plateb)

## Seznam členů týmu: 
- Radim Janeček I2400572
- Jaroslav Němec I2500139

## Rozdělení business odpovědností

### Jaroslav Němec
- Business entita: Objednávka
- Stavový automat: created -> confirmed / cancelled -> shipped -> done
- Popis odpovědnosti za chování: vytvoření objednávky z košíku a správu jejího životního cyklu
- Business pravidla: Objednávku lze vytvořit pouze z neprázdného košíku. Objednávku může vytvořit pouze přihlášený uživatel. Vytvořenou objednávku nelze upravovat.
------------------------------------------------------------------
- Business entita: Uživatel
- Stavový automat: anonymous -> authenticated, authenticated -> anonymous
- Popis odpovědnosti za chování: stav uživatele z business hlediska a pravidla autorizace
- Business pravidla: Nepřihlášený uživatel nemůže vytvořit objednávku a může pouze procházet katalog. Přihlášený uživatel může pracovat s košíkem a vytvářet objednávky.

### Radim Janeček
- Business entita: Košík
- Stavový automat: empty -> active -> checking_out -> empty, active -> empty
- Popis odpovědnosti za chování: správa nákupního košíku, manipulace s položkami a udržení konzistence jeho stavu
- Business pravidla: Množství položky musí být větší než 0.

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
