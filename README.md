# tnpw2-eshop-semestralka


Seznam členů týmu: Radim Janeček 2400572, Jaroslav Němec



Téma: Jednoduchý e-shop (bez plateb)

Jaroslav Němec
Business entita: Objednávka
Stavový automat: created -> confirmed -> shipped ->cancelled
Popis odpovědnosti za chování: 

Infrastrukturní odpovědnost:
IR01 - Správa stavu aplikace 
IR02 - Dispatcher
IR03 - Asynchronní operace
IR05 - Selektory



Radim Janeček 2400572
Business entita: Košík
Stavový automat: empty -> active -> checking_out -> completed
Popis odpovědnosti za chování:

Infrastrukturní odpovědnost:
IR04 - Router/Navigační logika
IR06 - Renderovací logika
IR07 - Handlery a vazba UI
IR08 - Autentizace a technická autorizace


Další business entity: Uživatel, produkt, položka v košíku



Způsob spolupráce a kontroly práce:
Tým používá Github Issues pro trackování progressu
Jestliže člen nesplní část, která mu byla přidělena, nemá to vliv na práci ostatních. Ostatní si stejně musí napsat mock systému a testy, aby předveli funkčnost
jejich části, takže to není potřeba řešit.
