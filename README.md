# Aktiv, demo

Klikalny prototyp jeździeckiej mapy Polski. Statyczny (HTML, CSS, JS), bez serwera. Mapa Leaflet plus CARTO Voyager, bez kluczy.

Styl granatowo szary (w klimacie Decathlon), logo pin ze strzałką, font Space Grotesk.

## Kategorie
Stajnie, Jazda konna, Weterynarze, Fizjoterapeuci, Dietetycy, Sklepy jeździeckie.

## Dodawanie miejsca i moderacja (działa)
1. Na mapie klikasz Dodaj miejsce i wysyłasz zgłoszenie. Zapisuje się lokalnie w przeglądarce ze statusem oczekujące.
2. Panel moderacji: strona admin.html. Login: admin1, haslo: aktive2026@.
3. Moderator akceptuje lub odrzuca zgłoszenie.
4. Po akceptacji miejsce pojawia się na mapie dla wszystkich (z oznaczeniem Nowe).

Dane trzymane są w localStorage przeglądarki, więc mapa i panel widzą te same zgłoszenia na tym samym urządzeniu. To wersja demo. W produkcji tę rolę pełni backend Django plus panel admina, a logowanie jest po stronie serwera.

## Pliki
index.html, mapa i wyszukiwarka.
admin.html, panel moderacji.
stajnia.html, przykładowa strona stajni z zapisem na trening.
styles.css, wszystkie style.
store.js, wspolny magazyn zgloszen.
script.js, logika mapy i dodawania.
admin.js, logika panelu moderacji.
stajnia.js, obsluga formularza zapisu.
images/, logo, favicon i zdjecia.

## Wazne przy aktualizacji
Odnosniki do plikow maja wersje (na przyklad styles.css?v=4), zeby przegladarka i GitHub Pages nie pokazywaly starej wersji z cache. Przy kolejnej zmianie podbij numer v.

## Uruchomienie i publikacja
Lokalnie: otworz index.html. GitHub Pages: wrzuc wszystkie pliki i katalog images do repo (pliki w root), potem Settings, Pages, branch main, folder root.

## Co latwo zmienic
Etykiety kategorii: CATS w script.js i admin.js.
Kolory pinow: COLORS w script.js.
Login i haslo admina: gora pliku admin.js.
Kolory marki: granat 034AA4, grafit 1E2A40, tlo F4F6F9.
