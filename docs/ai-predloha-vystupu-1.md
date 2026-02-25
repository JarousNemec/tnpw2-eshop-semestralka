# Rozdělení odpovědností a plán práce

**Semestrální projekt – Architektura SPA**

---

## 1. Členové týmu

* Jan Novák (xnovak00)
* Petr Svoboda (xsvobo12)
* Anna Dvořáková (xdvora34)

---

## 2. Rozdělení business odpovědností

### Jan Novák – Entita: Košík (Cart)

**Popis odpovědnosti:**
Student odpovídá za správu nákupního košíku, manipulaci s položkami a udržení konzistence jeho stavu.

**Stavový automat:**

* `empty` → `active` (přidání položky)
* `active` → `active` (změna množství)
* `active` → `empty` (odebrání všech položek)

**Povolené akce:**

* `CART_ADD_ITEM`
* `CART_REMOVE_ITEM`
* `CART_CLEAR`
* `CART_UPDATE_QUANTITY`

**Business pravidla:**

* Nelze odebrat položku, která není v košíku
* Množství položky musí být větší než 0
* Košík přechází do stavu `empty`, pokud neobsahuje žádné položky

---

### Petr Svoboda – Entita: Objednávka (Order)

**Popis odpovědnosti:**
Student odpovídá za vytvoření objednávky z košíku a správu jejího životního cyklu.

**Stavový automat:**

* `draft` → `created` (vytvoření objednávky)
* `created` → `cancelled` (zrušení objednávky)

**Povolené akce:**

* `ORDER_CREATE`
* `ORDER_CANCEL`

**Business pravidla:**

* Objednávku lze vytvořit pouze z neprázdného košíku
* Objednávku může vytvořit pouze přihlášený uživatel
* Vytvořenou objednávku nelze upravovat

---

### Anna Dvořáková – Entita: Uživatel (User)

**Popis odpovědnosti:**
Student odpovídá za stav uživatele z business hlediska a pravidla autorizace.

**Stavový automat:**

* `anonymous` → `authenticated` (přihlášení)
* `authenticated` → `anonymous` (odhlášení)

**Povolené akce:**

* `USER_LOGIN`
* `USER_LOGOUT`

**Business pravidla:**

* Nepřihlášený uživatel nemůže vytvořit objednávku
* Přihlášený uživatel může pracovat s košíkem a objednávkami

---

## 3. Rozdělení infrastrukturních odpovědností

### Jan Novák

* **IR01 – Správa stavu aplikace**

  * návrh struktury globálního stavu
  * inicializace a aktualizace stavu
* **IR05 – Selektory**

  * implementace funkcí pro výběr dat ze stavu (např. obsah košíku, celková cena)

---

### Petr Svoboda

* **IR02 – Dispatcher**

  * implementace centrální interpretace akcí
  * koordinace změn stavu
* **IR03 – Asynchronní operace**

  * simulace načítání produktů (mock API)
  * zpracování chybových stavů

---

### Anna Dvořáková

* **IR06 – Renderovací logika**

  * implementace view funkcí a skládání UI
* **IR07 – Handlery**

  * mapování uživatelských akcí na dispatch(action)

---

## 4. Rozhraní mezi částmi

Jednotlivé části aplikace spolu komunikují výhradně prostřednictvím:

* akcí (actions),
* centrálního stavu,
* selektorů.

### Rozhraní: Košík ↔ Objednávka

* Akce:

  * `ORDER_CREATE` využívá data z košíku
* Sdílená data:

  * `cart.items`
  * `cart.totalPrice`
* Pravidlo:

  * objednávku lze vytvořit pouze z neprázdného košíku

---

### Rozhraní: Uživatel ↔ Objednávka

* Akce:

  * `USER_LOGIN`, `USER_LOGOUT`, `ORDER_CREATE`
* Sdílená data:

  * `auth.currentUser`
* Pravidlo:

  * objednávku může vytvořit pouze přihlášený uživatel

---

### Rozhraní: Dispatcher ↔ Business části

* Dispatcher přijímá všechny akce a deleguje je na příslušné business moduly
* Business logika nemění stav přímo, ale vrací nový stav

---

### Rozhraní: Selektory ↔ View

* Selektory poskytují data pro UI:

  * `selectCartItems`
  * `selectCartTotalPrice`
  * `selectCurrentUser`
* View nepřistupuje ke stavu přímo

---

### Rozhraní: Router ↔ Aplikace

* Router převádí URL na akce (např. otevření detailu produktu nebo košíku)
* Navigace je řízena změnami stavu

---

## 5. Způsob spolupráce a kontroly práce

### Řízení práce

* Tým používá Git (feature branche pro jednotlivé části)
* Úkoly jsou evidovány pomocí issues a checklistů
* Každý člen odpovídá za svou část systému

### Kontrola práce

* Pravidelné konzultace v týmu (min. 1× týdně)
* Code review mezi členy týmu
* Kontrola splnění odpovědností podle tohoto dokumentu

### Řešení nesplnění odpovědnosti

* Problém je nejprve řešen v rámci týmu
* Pokud nedojde k nápravě, bude eskalován vyučujícímu
* Každý člen odpovídá pouze za svou část

---

## 6. Závěr

Tento dokument definuje závazné rozdělení odpovědností v týmu a slouží jako podklad pro individuální hodnocení i obhajobu projektu. Každý člen týmu je odpovědný za svou část systému a její funkčnost.
