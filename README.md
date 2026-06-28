# Aktiv, demo

Klikalny prototyp jeździeckiej mapy Polski. Statyczny (HTML, CSS, JS), bez backendu, dane zmyślone na sztywno. Mapa Leaflet plus CARTO Voyager, bez kluczy.

Jeden, dopracowany styl Active: żywa zieleń, ciemny grafit, logo pin ze strzałką, font Space Grotesk.

## Pliki
index.html, strona z mapą i wyszukiwarką.
stajnia.html, przykładowa osobna strona stajni z zapisem na trening.
styles.css, wszystkie style.
script.js, logika mapy i listy.
stajnia.js, obsługa formularza zapisu.
images/, zdjęcia.

## Uruchomienie lokalnie
Otwórz index.html w przeglądarce.

## Publikacja na GitHub Pages
1. Wrzuć wszystkie pliki i katalog images do repozytorium (pliki w root).
2. Settings, Pages, Source: Deploy from a branch, branch main, folder root.

## Zdjęcia
W script.js, w tablicy PLACES, pole image. Puste pokazuje kafelek z ikoną pinezki. Wklej link (Unsplash, Pexels), a karta i panel go użyją.
Przykładowa stajnia używa images/stajnia-pod-debami.png, jest małe, na spotkanie podmień na ostre.

## Co łatwo zmienić
Etykiety kategorii: CATS w script.js.
Kolory pinów: COLORS w script.js.
Kolory marki: zielen 22C55E, akcent 18B85C, grafit 0F1A14, tlo F4F8F5.
