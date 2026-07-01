# Aktiv portal, Etap 1 (Django)

Mapa jezdzieckiej Polski. Backend Django, mapa Leaflet plus OpenStreetMap (kafle CARTO Voyager, bez kluczy). Panel admina to wbudowany panel Django, w ktorym Justyna dodaje, edytuje i zatwierdza firmy.

## Co jest w srodku

Czesc publiczna:
- Mapa Polski z pinami firm, piny pokolorowane wedlug kategorii.
- Filtry po kategorii (Stajnie, Jazda konna, Weterynarze, Fizjoterapeuci, Dietetycy, Sklepy jezdzieckie) i po miejscowosci.
- Wyszukiwarka po nazwie i miescie.
- Profile firm: nazwa, kategoria, adres, kontakt, opis, zdjecia, godziny, linki.
- Strony statyczne: o nas, kontakt, regulamin, polityka prywatnosci (edytowalne w panelu).
- Formularz Dodaj miejsce dla kazdego. Zgloszenia trafiaja do zatwierdzenia przez admina.

Panel admina (dla Justyny), adres /admin/:
- Dodawanie, edycja i usuwanie firm.
- Zatwierdzanie zgloszen: akcja Zatwierdz i opublikuj oraz Odrzuc.
- Akcja Geokoduj adres, ktora ustawia pin na mapie na podstawie adresu.
- Galeria zdjec przy kazdej firmie.
- Kategorie z kolorami pinow.
- Edycja tresci stron statycznych.

## Wymagania

Python 3.10 lub nowszy i pip.

## Uruchomienie lokalne

1. Utworz i aktywuj srodowisko wirtualne:
   - python -m venv venv
   - Linux, Mac: source venv/bin/activate
   - Windows: venv\Scripts\activate
2. Zainstaluj zaleznosci: pip install -r requirements.txt
3. Zaloz baze: python manage.py migrate
4. Wgraj przykladowe firmy i strony: python manage.py seed_demo
5. Utworz konto admina: python manage.py createsuperuser
6. Uruchom: python manage.py runserver
7. Strona: http://127.0.0.1:8000, panel: http://127.0.0.1:8000/admin/

Domyslnie uzywana jest baza SQLite (plik db.sqlite3), wiec lokalnie nic wiecej nie trzeba konfigurowac.

## Jak dziala geokodowanie

Po wyslaniu formularza adres i miejscowosc sa zamieniane na wspolrzedne przez Nominatim (OpenStreetMap). Dziala, gdy serwer ma dostep do internetu (na seohost tak jest). Jesli adresu nie uda sie znalezc, admin moze ustawic pin recznie polem szerokosc i dlugosc albo akcja Geokoduj adres w panelu.

## Struktura

- config, ustawienia projektu (settings, urls, wsgi).
- directory, glowna aplikacja (modele, panel admina, widoki, api, szablony, pliki statyczne).
- directory/management/commands/seed_demo.py, wgrywa dane startowe.
- passenger_wsgi.py, plik startowy dla serwera na seohost.
- requirements.txt, zaleznosci. .env.example, wzor zmiennych srodowiskowych.

## Wdrozenie na seohost (aplikacja Python, Passenger)

1. W DirectAdmin otworz Setup Python App i utworz nowa aplikacje: wybierz wersje Pythona, katalog aplikacji i domene. Panel utworzy srodowisko wirtualne i plik startowy.
2. Wgraj pliki projektu do katalogu aplikacji (File Manager lub FTP). Jako plik startowy ustaw passenger_wsgi.py.
3. Skopiuj .env.example jako .env i uzupelnij: SECRET_KEY (dlugi losowy ciag), DEBUG=0, ALLOWED_HOSTS (twoja domena), CSRF_TRUSTED_ORIGINS (adres https domeny). Zmienne mozna tez wpisac w panelu aplikacji Python.
4. W terminalu aplikacji (SSH albo opcje w panelu) wykonaj po kolei:
   - pip install -r requirements.txt
   - python manage.py migrate
   - python manage.py seed_demo (opcjonalnie, wgrywa przykladowe firmy)
   - python manage.py collectstatic (potwierdz pytanie)
   - python manage.py createsuperuser
5. Zrestartuj aplikacje w panelu i wejdz na domene.

Pliki CSS i JS serwuje WhiteNoise po komendzie collectstatic, wiec nie trzeba nic konfigurowac w serwerze www. Zdjecia firm (katalog media) serwuje aplikacja pod adresem /media/.

MySQL zamiast SQLite: odkomentuj mysqlclient w requirements.txt, a w .env ustaw DB_ENGINE=mysql oraz dane bazy (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT). Potem uruchom migrate.

## Pod przyszle etapy

Modele sa juz przygotowane pod konta uzytkownikow (pole wlasciciel przy firmie) oraz pod platnosci (pole plan: darmowy albo premium). Dzieki temu Etap 2 (rejestracja, logowanie, platne wyroznienia) nie wymaga przebudowy bazy.
