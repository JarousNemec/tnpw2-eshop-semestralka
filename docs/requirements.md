(aktualizováno 4.2.2026)
Termín odevzdání
výstup: rozdělení odpovědností a plán práce: pátek 6. března 2026, 23:59
výstup: projekt: pátek 24. dubna 2026, 23:59
Bodová dotace (minimální hranice)
100 bodů (min. 60 bodů)
Způsob odevzdání
Výlučně v e-kurzu prostřednictvím nástroje „odevzdání semestrálního projektu“.
1. ÚČEL PROJEKTU
   Semestrálním projektem „Architektura SPA“ student prokazuje, že  je schopen:
   navrhnout a realizovat interaktivní aplikaci jako stavový systém reagující na akce
   strukturovat aplikaci podle architektonického vzoru Single-Page Application (SPA)
   oddělit stav, chování, projekce a infrastrukturu
   pracovat v týmu s jasně vymezenými zodpovědnostmi
   samostatně obhájit funkčnost své části systému nezávisle na ostatních členech týmu
   Projekt není zaměřen na vizuální stránku aplikace, ale na architekturu, strukturu a srozumitelnost řešení
2. ZÁKLADNÍ PRAVIDLA PRÁCE NA PROJEKTU
   2.1 Práce v týmu a odpovědnosti
   Projekt je řešen týmově (2–4 studenti).
   Každý student nese individuální odpovědnost za vymezenou část systému.
   Týmová práce neznamená kolektivní odpovědnost za výsledek.
   Projekt je hodnocen kombinací týmového a individuálního hodnocení.
   2.2 Výstup 1 - Rozdělení odpovědností a plán práce
   Toto je povinný milník projektu. Bez jeho splnění nelze projekt hodnotit.
   Termín odevzdání: 4. týden semestru
   Forma: krátký dokument , max. 2–3 strany
   Hodnocení: splněno / nesplněno (ANO / NE)
   Deliverable 1 je hodnocen samostatně.
   Slouží jako referenční dokument při obhajobě i při individuálním hodnocení.
   Změny v rozdělení odpovědností jsou možné pouze po dohodě s vyučujícím.
   Bodové hodnocení: 0 bodů (podmínka pro hodnocení projektu)
   Obsah
   Tento dokument slouží jako závazná dohoda v týmu a zároveň jako podklad pro pozdější individuální hodnocení.
   Musí obsahovat:
   Seznam členů týmu
   jméno, identifikace studenta
   Rozdělení business odpovědností
   ke každému studentovi:
   alespoň jedna business entita,
   její stavový automat (stavy a povolené přechody),
   stručný popis odpovědnosti za její chování.
   Rozdělení infrastrukturních odpovědností
   ke každému studentovi:
   minimálně dvě infrastrukturní role (IR01–IR08),
   stručný popis, co student v rámci těchto rolí realizuje.
   Rozhraní mezi částmi
   stručný popis:
   jaké akce, data nebo kontrakty jednotlivé části poskytují ostatním,
   kde se části systému „potkávají“.
   Způsob spolupráce a kontroly práce
   jakým způsobem tým:
   sleduje postup práce (např. issues, checklisty)
   řeší nesplnění odpovědnosti některým členem
   Podmínky splnění
   Výstup 1 je hodnocen jako SPLNĚN, pokud:
   je odevzdán v termínu,
   obsahuje:
   jména všech členů týmu,
   přiřazení business entit + stavových automatů ke konkrétním studentům,
   přiřazení minimálně dvou infrastrukturních rolí ke každému studentovi,
   stručný popis rozhraní mezi částmi systému,
   rozdělení práce je:
   konkrétní (není vágní typu „společně“, „podle potřeby“),
   bez překryvů odpovědností, pokud nejsou výslovně zdůvodněny.
   Nesplnění
   Výstup 1 je hodnocen jako NESPLNĚN, pokud:
   není odevzdán,
   nebo:
   nevymezuje odpovědnosti jednotlivých členů,
   používá neurčité formulace bez přiřazení odpovědnosti,
   neumožňuje jednoznačně určit, kdo je za co odpovědný.
   Vztah k hodnocení projektu
   Výstup 1 nepřidává body, ale je nutnou podmínkou pro:
   individuální hodnocení
   uznání dílčí funkčnosti
   obhajobu projektu
   Vztah k obhajobě projektu
   Při obhajobě:
   se student odkazuje právě na tento dokument,
   a obhajuje svou deklarovanou odpovědnost, ne práci celého týmu.
   2.3 Důsledky nesplnění Výstupu 1
   Nesplnění Deliverable 1 znamená, že projekt nemůže být plně hodnocen a nebude možné přiznat body za práci jednotlivých členů týmu.
   2.4 Výstup 2 - Kompletní projekt
   Výstup 2 je kompletní projekt, který je dále detailněji popsán.
   Termín odevzdání: 11. týden semestru
   Forma: repozitář + dokumentace
   Obsah
   Zdrojový kód aplikace
   odpovídající požadavkům zadání,
   architektura SPA dle principů probíraných v předmětu,
   bez použití zakázaných technologií.
   Dokumentace projektu
   Povinné části:
   architektonický popis aplikace,
   popis stavu, akcí, dispatch mechanismu,
   popis business entit a jejich stavových automatů,
   popis rozdělení práce (aktualizovaná verze Výstupu 1),
   stručný popis testovacích scénářů / skriptů.
   Testovací skripty / scénáře (individuální část)
   každý student musí doložit:
   testy nebo scénáře, které prokazují funkčnost jeho části,
   i v případě, že celek aplikace není plně funkční.
   Sebehodnocení (checklist)
   vyplněný checklist dle hodnoticích rubrik,
   slouží jako podklad k obhajobě.
   2.5 Vztah mezi výstupy a hodnocením
   Projekt je hodnocen na základě architektury a odpovědností, nikoli na základě vizuální úplnosti aplikace.
   Student není povinen kompenzovat neodvedenou práci jiných členů týmu.
   Výstup 1:
   ověřuje schopnost navrhnout a řídit dělbu práce
   je klíčový pro individuální hodnocení
   Výstup 2:
   ověřuje architektonické myšlení a realizaci
   hodnotí se jak celek, tak individuální přínos
   Pokud některá část aplikace chybí:
   student není penalizován za práci ostatních
   rozhodující je:
   kvalita jeho části
   dokumentace
   testovací skripty dokazující funkčnost
3. POVOLENÉ A ZAKÁZANÉ TECHNOLOGIE
   3.1 Povinné vlastnosti řešení
   Aplikace musí:
   běžet v webovém prohlížeči
   být implementována jako Single-Page Application
   mít centrální stav a řízené změny stavu pomocí akcí
   3.2 Doporučené technologie
   JavaScript (ES6+) – doporučená a referenční volba
   Funkcionální styl programování
   3.3 Povolené alternativy (po domluvě)
   Elm
   Kotlin (JS target)
   jiný jazyk s:
   explicitní prací se stavem
   funkcionálním nebo deklarativním stylem
   3.4 Zakázané technologie
   Frameworky typu:
   React, Vue, Angular, Svelte
   Redux, MobX apod.
   Generátory aplikací a „hotové architektury“
   Server-side rendering (SSR)
   Použití knihoven je povoleno pouze tehdy, pokud nenahrazují architekturu, ale řeší dílčí technický problém.
4. ARCHITEKTURA APLIKACE (POVINNÁ)
   Aplikace musí být strukturována minimálně do následujících vrstev:
   Stav
   centrální datový model aplikace
   Akce
   pojmenované záměry uživatele nebo systému
   Dispatcher
   centrální interpretace akcí
   Selektory
   výběr a příprava dat pro pohledy
   Pohledy
   projekce stavu do UI
   Infrastruktura
   API, persistence, routing, autentizace
5. BUSINESS ČÁST PROJEKTU
   5.1 Business entity
   Každý student je odpovědný minimálně za:
   1 business entitu
   její stavový automat (stavy + přechody)
   Administrátorská role s neomezenými právy se nepočítá jako business role.
   5.2 Business pravidla
   Autorizace (kdo smí provést jakou akci) je součástí business logiky.
   Business pravidla musí být:
   explicitně pojmenovaná
   realizovaná mimo UI
6. INFRASTRUKTURNÍ ČÁSTI
   Infrastrukturní role představují technické části aplikace, které nejsou business logikou samotnou, ale umožňují její fungování. Každá infrastrukturní role má jasně vymezenou odpovědnost a hranice.
   Každý student je povinen být odpovědný minimálně za dvě různé infrastrukturní role z IR01 až IR08:
   IR01 – Správa stavu aplikace (State Management)
   Odpovědnost:
   definice struktury globálního stavu aplikace
   inicializace stavu
   řízené aktualizace stavu
   Typické činnosti:
   návrh datového modelu stavu
   oddělení doménových a technických dat
   zajištění konzistence stavu
   Nezahrnuje:
   business rozhodování
   vykreslování UI
   IR02 – Dispatcher / Interpretace akcí
   Odpovědnost:
   centrální zpracování akcí
   rozhodování, jak akce ovlivní stav
   koordinace synchronních a asynchronních operací
   Typické činnosti:
   interpretace action.type a kontextu
   volání business funkcí
   vyvolání změn stavu
   Nezahrnuje:
   přímou manipulaci s UI
   definici business pravidel
   IR03 – Asynchronní operace a side-effects
   Odpovědnost:
   řízení asynchronního chování aplikace
   práce s časem, čekáním, odpověďmi
   Typické činnosti:
   komunikace s API (mock nebo reálné)
   zpracování úspěchů a chyb
   přechody do stavů loading, error
   Nezahrnuje:
   rozhodování o platnosti operací (to patří backendu / business logice)
   IR04 – Router / Navigační logika
   Odpovědnost:
   mapování URL na aplikační kontext
   synchronizace stavu aplikace s adresou prohlížeče
   Typické činnosti:
   parsování URL
   převod URL → akce
   reakce na změny historie prohlížeče
   Nezahrnuje:
   vykreslování pohledů
   business logiku
   IR05 – Selektory (výběr dat ze stavu)
   Odpovědnost:
   výběr a transformace dat ze stavu pro UI
   pojmenování významových stavů aplikace
   Typické činnosti:
   filtrování kolekcí
   odvozování hodnot (canRegister, currentRegistration)
   příprava dat pro konkrétní pohled
   Nezahrnuje:
   změny stavu
   práci s DOM
   IR06 – Renderovací logika (View composition)
   Odpovědnost:
   převod view-state na konkrétní UI strukturu
   oddělení rozhodování co zobrazit od jak zobrazit
   Typické činnosti:
   sestavení DOM stromu
   podmíněné zobrazení částí UI
   práce s komponentami / funkcemi pohledů
   Nezahrnuje:
   přímé rozhodování o stavu aplikace
   IR07 – Handlery a vazba UI → akce
   Odpovědnost:
   převod uživatelských interakcí na akce
   izolace UI od business logiky
   Typické činnosti:
   definice handlerů (onClick, onSubmit)
   mapování interakcí na dispatch(action)
   práce s kontextem pohledu
   Nezahrnuje:
   změny stavu přímo v UI
   IR08 – Autentizace a technická autorizace
   Odpovědnost:
   správa identity uživatele z technického hlediska
   uchovávání informací o přihlášení
   Typické činnosti:
   uložení informace o uživateli / roli
   práce s tokenem nebo identitou (i simulovanou)
   inicializace autentizačního stavu
   Nezahrnuje:
   business autorizaci (co smí / nesmí dělat)
   → ta patří do business logiky
   Poznámky k hodnocení
   Infrastrukturní role nesmí být sloučeny bez zdůvodnění. Student musí jasně doložit:
   které role řešil
   jaké části kódu k nim patří
   Jedna část kódu může plnit více rolí, ale musí to být explicitně popsáno.
   Autentizace patří mezi infrastrukturní části, autorizace mezi business logiku.
7. ŘÍZENÍ PRÁCE V TÝMU
   Součástí projektu je dokumentované řízení dělby práce, které musí obsahovat:
   rozdělení odpovědností mezi členy týmu
   vazbu odpovědností na části architektury
   evidenci změn (commit history, log práce)
   Každý student je hodnocen především za svou část.
8. DOKUMENTACE PROJEKTU
   Dokumentace musí obsahovat:
   popis architektury aplikace
   seznam business entit a jejich stavových automatů
   popis rolí a povolených akcí
   popis infrastruktury
   mapování odpovědností na členy týmu
9. POŽADAVKY NA HTML A PRÁCI S DOM
   9.1 Práce s DOM (povinné omezení)
   V projektu není dovoleno používat innerHTML.
   Důvody:
   innerHTML míchá data, strukturu a prezentaci
   innerHTML obchází architektonické principy kurzu
   innerHTML znemožňuje kontrolu nad vznikem UI
   9.2 Povolený způsob práce s DOM
   UI musí být vytvářeno pomocí:
   explicitní tvorby DOM uzlů (document.createElement),
   skládání stromu prvků,
   čistých renderovacích funkcí.
   Renderování je chápáno jako projekce stavu, nikoli jako manipulace s HTML řetězci.
10. POŽADAVKY NA CCS
    10.1 Co je dovoleno
    Použití hotových CSS knihoven nebo frameworků je povoleno a doporučeno.
    CSS může být:
    externí knihovna
    jednoduchý vlastní soubor
    kombinace obojího
    10.2 Doporučené řešení
    Doporučená volba (není povinná): Pico.css
    pouze se přilinkuje do HTML,
    nevyžaduje konfiguraci,
    nenutí konkrétní strukturu aplikace,
    nezastiňuje architekturu.
    Použití CSS má sloužit pouze k:
    základní čitelnosti rozhraní
    rozlišení prvků
    odstranění nutnosti psát vlastní styly
    10.3 Co se v CSS neřeší
    design tokeny
    komplexní layouty
    animace
    detailní typografie
11. HODNOCENÍ
    11.1 Co je předmětem hodnocení
    Projekt je hodnocen výhradně z hlediska:
    architektonického návrhu aplikace
    práce se stavem a akcemi
    oddělení odpovědností
    srozumitelnosti struktury kódu
    schopnosti studenta samostatně obhájit svou část systému
    11.2 Co není předmětem hodnocení
    Následující aspekty nejsou předmětem hodnocení a nemají vliv na bodové hodnocení:
    estetická stránka uživatelského rozhraní
    vizuální design
    použitelnost (UX)
    uživatelský zážitek (UX/UI)
    responzivita
    marketingové či prezentační kvality aplikace
    11.3 Bodové rozdělení
    Architektura aplikace: 60 bodů
    Individuální hodnocení člena týmu: 15 bodů
    Dokumentace projektu: 15 bodů
    Technická kázeň: 10 bodů
    Podrobná kriteria hodnocení jsou uvedena v dokumentu Hodnotící stupnice semestrálního projektu Architektura SPA.
    Technická kázeň je hodnocena nezávisle na funkčnosti aplikace – cílem je ověřit schopnost psát udržitelný, čitelný a kontrolovatelný kód, nikoli estetickou kvalitu výstupu.
12. INDIVIDUÁLNÍ HODNOCENÍ PŘI NEFUNKČNÍM CELKU
    12.1 Zásadní pravidlo
    Nezprovoznění celé aplikace neznamená automaticky znamenat neúspěch jednotlivce.
    Každý student musí být schopen prokázat funkčnost své části nezávisle.
    12.2 Prokázání funkčnosti pomocí testovacích scénářů
    Pokud aplikace jako celek není funkční, student je povinen dodat:
    testovací scénáře (skripty)
    které simulují vstupy do jeho části systému
    a ověřují očekávané chování
    Nejedná se o UI testy.
    12.3 Co musí testy prokazovat
    Testy musí jasně ukazovat:
    vstupní stav
    akci / záměr
    výsledný stav nebo návratovou hodnotu
13. POVINNÁ ŠABLONA TESTOVACÍHO SOUBORU
    Každý student přiloží soubor s testy. Ukázka testu je uvedena v příloze test-script-template.docx .
    Student může přidat libovolný počet scénářů, ale musí pokrýt celou svou odpovědnost.
14. VÝSTUPY A HARMONOGRAM
    Výstupy jsou dva:
    Výstup 1 – rozdělení práce
    Výstup 2 – kompletní projekt
    Termíny odevzdání:
    Výstup 1: 4. týden semestru
    Výstup 2: 11. týden semestru
15. ZÁVĚREČNÉ USTANOVENÍ
    Projekt je hodnocen podle:
    architektonické kvality
    srozumitelnosti návrhu
    schopnosti izolovat odpovědnosti
    schopnosti samostatně obhájit vlastní část systému
    Funkční UI není důkaz architektury. Správně navržené chování systému ano.
    ODEVZDÁNÍ ROZDĚLENÍ PRÁCE (výstupu 1)
    Odevzdávané náležitosti:
    dokument Rozdělení odpovědností a plán práce
    Jednotlivé položky zabalte do jediného souboru s názvem PrijmeniJmeno např. formátu *.zip, a odevzdejte v e-kurzu.
    ODEVZDÁNÍ PROJEKTU (výstupu 2)
    Odevzdávané náležitosti:
    projekt
    dokumentace projektu
    testovací skripty, pokud jsou potřeba, viz bod 12 (test-script-template.docx )
    vyplněný kontrolní seznam hodnocení (evaluation-checklist.docx )
    Jednotlivé položky zabalte do jediného souboru s názvem PrijmeniJmeno např. formátu *.zip, a odevzdejte v e-kurzu.