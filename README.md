# B-Shop 

jakože basic eshop :)

## Téma: Jednoduchý e-shop (bez plateb)

## Seznam členů týmu: 
- Radim Janeček janecra1
- Jaroslav Němec jaroslav.nemec

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
- IR01 - Správa stavu aplikace (návrh struktury globálního stavu, inicializace a aktualizace stavu)
- IR02 - Dispatcher (implementace centrální interpretace akcí, koordinace změn stavu)
- IR03 - Asynchronní operace (simulace načítání produktů (mock API), zpracování chybových stavů)
- IR05 - Selektory (implementace funkcí pro výběr dat ze stavu (např. obsah košíku, celková cena))

### Radim Janeček
- IR04 - Router/Navigační logika (mapování URL na aplikační kontext, synchronizace stavu aplikace s adresou prohlížeče)
- IR06 - Renderovací logika (implementace view funkcí a skládání UI)
- IR07 - Handlery a vazba UI (mapování uživatelských akcí na dispatch(action))
- IR08 - Autentizace a technická autorizace (řízení ui módů podle rolí přihlášených uživatelů, uchovávání informací o přihlášení)

## Rozhraní mezi částmi
Jednotlivé části aplikace spolu komunikují výhradně prostřednictvím:
- akcí (actions),
- centrálního stavu,
- selektorů.
### Rozhraní: Košík ↔ Objednávka
- Akce: ORDER_CREATE využívá data z košíku
- Sdílená data: cart.items, cart.totalPrice,
- Pravidlo: objednávku lze vytvořit pouze z neprázdného košíku
### Rozhraní: Uživatel ↔ Objednávka
- Akce: USER_LOGIN, USER_LOGOUT, ORDER_CREATE
- Sdílená data: auth.currentUser
- Pravidlo: objednávku může vytvořit pouze přihlášený uživatel
### Rozhraní: Dispatcher ↔ Business části
- Dispatcher přijímá všechny akce a deleguje je na příslušné business moduly
- Business logika nemění stav přímo, ale vrací nový stav
### Rozhraní: Selektory ↔ View
- Selektory poskytují data pro UI: selectCartItems, selectCartTotalPrice, selectCurrentUser
- View nepřistupuje ke stavu přímo

### Rozhraní: Router ↔ Aplikace
- Router převádí URL na akce (např. otevření detailu produktu nebo košíku)
- Navigace je řízena změnami stavu
## Způsob spolupráce a kontroly práce:
- Tým používá Github Issues pro trackování progressu a definování práce, co je třeba udělat.
- Jestliže člen nesplní část, která mu byla přidělena, nemá to vliv na práci ostatních. Ostatní si stejně musí napsat mock systému a testy, aby předveli funkčnost
jejich části, takže to není potřeba řešit.
