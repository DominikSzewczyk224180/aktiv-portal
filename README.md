# Aktiv, demo

Klikalny prototyp jeździeckiej mapy Polski. Statyczny (HTML, CSS, JS), bez backendu, dane zmyślone na sztywno. Mapa Leaflet plus OpenStreetMap, bez kluczy.

## Uruchomienie lokalnie
Otwórz index.html w przeglądarce. Nic nie trzeba instalować.

## Publikacja na GitHub Pages
1. Wrzuć trzy pliki (index.html, styles.css, script.js) do repozytorium.
2. Settings, Pages, Source: Deploy from a branch, branch main, folder root.
3. Po chwili demo będzie pod adresem GitHub Pages.

## Gdzie podmienić zdjęcia
W pliku script.js, w tablicy PLACES, każdy obiekt ma pole image. Domyślnie puste, wtedy karta pokazuje brandowy kafelek z podkową. Wklej tam link do zdjęcia (Unsplash, Pexels, Pixabay), a karta i panel od razu go użyją.

Przyklad:
image: "https://images.unsplash.com/photo-xxxxxxxx"

## Co można łatwo zmienić
Kategorie i kolory pinów: obiekt CATS na górze script.js.
Punkty na mapie: tablica PLACES.
Kolory marki: zieleń 1F3D2B, tan C8A06B, tło FAF7F1.
