# Aktiv, demo

Klikalny prototyp jeździeckiej mapy Polski. Statyczny (HTML, CSS, JS), bez backendu, dane zmyślone na sztywno. Mapa Leaflet plus CARTO Voyager, bez kluczy.

## Przełącznik stylów
U góry jest przełącznik 1 2 3, który zmienia cały wygląd portalu na żywo:
1 Natura, zieleń plus pomarańcz, logo z podkową.
2 Active, żywa zieleń, logo pin ze strzałką, font Space Grotesk.
3 Premium, granat plus złoto, logo pin z przeplotem, font Manrope.
Służy do pokazania klientowi trzech kierunków i wyboru jednego.

## Pliki
index.html, strona z mapą i wyszukiwarką.
stajnia.html, przykładowa osobna strona stajni z zapisem na trening.
styles.css, wspólne style i trzy motywy.
script.js, logika mapy i listy, palety pinów per motyw.
theme.js, obsługa przełącznika stylów.
stajnia.js, obsługa formularza zapisu.
images/, zdjęcia.

## Uruchomienie lokalnie
Otwórz index.html w przeglądarce.

## Publikacja na GitHub Pages
1. Wrzuć wszystkie pliki i katalog images do repozytorium (pliki w root).
2. Settings, Pages, Source: Deploy from a branch, branch main, folder root.

## Zdjęcia
W script.js, w tablicy PLACES, pole image. Puste pokazuje kafelek z podkową. Wklej link (Unsplash, Pexels), a karta i panel go użyją.
Przykładowa stajnia używa images/stajnia-pod-debami.png, jest małe, na spotkanie podmień na ostre.

## Co łatwo zmienić
Etykiety kategorii: CATS w script.js.
Kolory pinów per motyw: PALETTES w script.js.
Kolory i fonty motywów: sekcja data-theme na dole styles.css.
