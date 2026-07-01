# Aktiv, demo

Klikalny prototyp jeździeckiej mapy Polski. Statyczny (HTML, CSS, JS), bez backendu, dane zmyślone na sztywno. Mapa Leaflet plus CARTO Voyager, bez kluczy.

Styl granatowo szary (w klimacie Decathlon), logo pin ze strzałką, font Space Grotesk.

## Kategorie
Stajnie, Jazda konna, Weterynarze, Fizjoterapeuci, Dietetycy, Sklepy jeździeckie.

## Dodawanie miejsca
Przycisk Dodaj miejsce (w nagłówku i na mapie) otwiera formularz zgłoszenia. W demie zgłoszenie pojawia się od razu jako oczekujący, szary pin. W prawdziwej wersji trafia do moderacji i po akceptacji w panelu admina staje się widoczne dla wszystkich.

## Pliki
index.html, strona z mapą i wyszukiwarką.
stajnia.html, przykładowa osobna strona stajni z zapisem na trening.
styles.css, wszystkie style.
script.js, logika mapy, listy i dodawania miejsca.
stajnia.js, obsługa formularza zapisu.
images/, logo, favicon i zdjęcia.

## Uruchomienie lokalnie
Otwórz index.html w przeglądarce.

## Publikacja na GitHub Pages
1. Wrzuć wszystkie pliki i katalog images do repozytorium (pliki w root).
2. Settings, Pages, Source: Deploy from a branch, branch main, folder root.

## Co łatwo zmienić
Etykiety kategorii: CATS w script.js.
Kolory pinów: COLORS w script.js.
Kolory marki: granat 034AA4, grafit 1E2A40, tlo F4F6F9.
