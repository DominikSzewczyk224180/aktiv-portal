# Aktiv, demo

Klikalny prototyp jeździeckiej mapy Polski. Statyczny (HTML, CSS, JS), bez backendu, dane zmyślone na sztywno. Mapa Leaflet plus OpenStreetMap, bez kluczy.

## Pliki
index.html, strona z mapą i wyszukiwarką.
stajnia.html, przykładowa osobna strona stajni (Stajnia Pod Dębami) z zapisem na trening.
styles.css, wspólne style obu stron.
script.js, logika mapy i listy.
stajnia.js, obsługa formularza zapisu.
images/, zdjęcia.

## Uruchomienie lokalnie
Otwórz index.html w przeglądarce. Nic nie trzeba instalować.

## Publikacja na GitHub Pages
1. Wrzuć wszystkie pliki i katalog images do repozytorium.
2. Settings, Pages, Source: Deploy from a branch, branch main, folder root.
3. Po chwili demo będzie pod adresem GitHub Pages.

## Zdjęcia
W script.js, w tablicy PLACES, każdy obiekt ma pole image. Puste pole pokazuje brandowy kafelek z podkową. Wklej link do zdjęcia (Unsplash, Pexels), a karta i panel go użyją.
Przykładowa stajnia używa zdjęcia images/stajnia-pod-debami.png. Jest ono w niskiej rozdzielczości, na spotkanie warto podmienić na ostre zdjęcie.

## Co można łatwo zmienić
Kategorie i kolory pinów: obiekt CATS na górze script.js.
Punkty na mapie: tablica PLACES.
Kolory marki: zieleń 173B2A, pomarańczowy akcent E2571E, tło FAF7F1.
