from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

from directory.models import Category, Company, Page

CATEGORIES = [
    ("Stajnie", "stajnia", "#034AA4", 1),
    ("Jazda konna", "jazda", "#0E8F9C", 2),
    ("Weterynarze", "weterynarz", "#D6564B", 3),
    ("Fizjoterapeuci", "fizjo", "#6B5BD0", 4),
    ("Dietetycy", "dietetyk", "#2E9E5B", 5),
    ("Sklepy jezdzieckie", "sklep", "#E1922E", 6),
]

COMPANIES = [
    ("Stajnia Pod Debami", "stajnia", "Konstancin-Jeziorna", "ul. Wierzbowa 4, Konstancin-Jeziorna", 52.0894, 21.1186, "+48 22 712 04 18", "Pn-Nd, 8:00-20:00", "Pensjonat, Lekcje jazdy, Lonzowanie", "Kameralna stajnia z kryta ujezdzalnia i dostepem do lesnych tras."),
    ("Osrodek Jezdziecki Lewada", "stajnia", "Nadarzyn", "ul. Polna 22, Nadarzyn", 52.0840, 20.8030, "+48 22 739 11 50", "Pn-Nd, 7:00-21:00", "Pensjonat, Padoki, Kryta hala", "Osrodek z kryta hala, padokami i pelnym zapleczem dla koni."),
    ("Stajnia Biala Grzywa", "stajnia", "Piaseczno", "ul. Sportowa 9, Piaseczno", 52.0700, 21.0240, "+48 22 756 33 02", "Pn-Nd, 8:00-20:00", "Pensjonat, Boksy, Padoki", "Rodzinna stajnia z przestronnymi boksami i duzymi padokami."),
    ("Ranczo Mazovia", "stajnia", "Grodzisk Mazowiecki", "ul. Lesna 3, Grodzisk Mazowiecki", 52.1100, 20.6300, "+48 22 724 88 41", "Wt-Nd, 9:00-19:00", "Pensjonat, Wybiegi, Siano", "Spokojne ranczo z duzymi wybiegami wsrod lak i lasow."),
    ("Szkola Jazdy Konnej Klus", "jazda", "Izabelin", "ul. Kampinoska 14, Izabelin", 52.3000, 20.7900, "+48 22 722 50 19", "Pn-Nd, 9:00-20:00", "Lekcje indywidualne, Lekcje grupowe, Lonzowanie", "Szkola jazdy dla dzieci i doroslych, od podstaw po sport."),
    ("Klub Jezdziecki Kopyto", "jazda", "Jozefow", "ul. Nadwislanska 8, Jozefow", 52.1380, 21.2330, "+48 22 789 62 07", "Wt-Nd, 9:00-19:00", "Jazda w terenie, Obozy, Hipoterapia", "Klub z jazda w terenie i wakacyjnymi obozami jezdzieckimi."),
    ("Osrodek Jazdy Konnej Kaskada", "jazda", "Brwinow", "ul. Grodziska 27, Brwinow", 52.1450, 20.7150, "+48 22 729 14 33", "Pn-Sb, 8:00-20:00", "Lekcje, Ujezdzenie, Skoki", "Nauka jazdy oraz treningi ujezdzenia i skokow przez przeszkody."),
    ("Gabinet Weterynaryjny HorseVet", "weterynarz", "Pruszkow", "ul. Kosciuszki 41, Pruszkow", 52.1700, 20.8100, "+48 22 758 90 12", "Pn-Nd, dyzur 24h", "Wyjazdy 24h, USG, Dentystyka", "Wyjazdy w 24h, USG, gastroskopia i dentystyka koni."),
    ("Klinika Koni Vetilia", "weterynarz", "Lomianki", "ul. Brukowa 6, Lomianki", 52.3300, 20.8800, "+48 22 751 27 60", "Pn-Pt, 8:00-18:00", "Chirurgia, Diagnostyka, Szczepienia", "Pelna diagnostyka, chirurgia i opieka szpitalna dla koni."),
    ("Weterynarz Konski dr Kowalczyk", "weterynarz", "Raszyn", "ul. Mszczonowska 12, Raszyn", 52.1500, 20.9300, "+48 22 715 48 90", "Pn-Sb, dyzur wyjazdowy", "Wyjazdy, Profilaktyka, Szczepienia", "Wizyty wyjazdowe, profilaktyka i szczepienia w Twojej stajni."),
    ("EquiFizjo Mazovia", "fizjo", "Konstancin-Jeziorna", "ul. Zdrojowa 2, Konstancin-Jeziorna", 52.0950, 21.1100, "+48 22 717 05 88", "Pn-Sb, na umowienie", "Masaz, Taping, Rehabilitacja", "Fizjoterapia, masaz i taping dla koni sportowych i rekreacyjnych."),
    ("Fizjoterapia Koni MoveHorse", "fizjo", "Milanowek", "ul. Krakowska 18, Milanowek", 52.1200, 20.6700, "+48 22 724 31 09", "Pn-Pt, na umowienie", "Terapia manualna, Laseroterapia", "Terapia manualna i laseroterapia po kontuzjach."),
    ("NutriHorse Dietetyka Konska", "dietetyk", "Warszawa Wilanow", "ul. Klimczaka 5, Warszawa", 52.1650, 21.0900, "+48 22 885 14 20", "Pn-Pt, 9:00-17:00", "Plany zywieniowe, Analiza pasz", "Indywidualne plany zywieniowe i analiza pasz."),
    ("EquiDieta Anna Nowak", "dietetyk", "Zalesie Gorne", "ul. Sloneczna 11, Zalesie Gorne", 52.0300, 21.0200, "+48 22 756 71 44", "Pn-Pt, na umowienie", "Konsultacje, Suplementacja", "Konsultacje zywieniowe i dobor suplementacji."),
    ("Sklep Jezdziecki EquiShop", "sklep", "Piaseczno", "ul. Geodetow 76, Piaseczno", 52.0760, 21.0300, "+48 22 750 60 31", "Pn-Sb, 9:00-19:00", "Sprzet, Odziez, Pasze", "Sprzet jezdziecki, odziez i pasze w jednym miejscu."),
    ("Sklep Jezdziecki Galop", "sklep", "Pruszkow", "ul. Plantowa 5, Pruszkow", 52.1660, 20.8000, "+48 22 758 22 14", "Pn-Sb, 10:00-18:00", "Siodla, Oglowia, Akcesoria", "Siodla, oglowia i akcesoria dla jezdzca i konia."),
]

PAGES = [
    ("o-nas", "O nas", "<p>Aktiv portal to mapa jezdzieckiej Polski. W jednym miejscu zbieramy stajnie, szkoly jazdy, weterynarzy, fizjoterapeutow, dietetykow i sklepy jezdzieckie.</p><p>Chcemy, aby kazdy jezdziec i wlasciciel konia szybko znalazl to, czego potrzebuje, blisko siebie.</p>"),
    ("kontakt", "Kontakt", "<p>Masz pytanie lub chcesz dodac swoja firme?</p><p>Napisz do nas: <a href='mailto:kontakt@aktiv-portal.pl'>kontakt@aktiv-portal.pl</a></p><p>Miejsce mozesz tez zglosic samodzielnie przez formularz Dodaj miejsce.</p>"),
    ("regulamin", "Regulamin", "<p>Niniejszy regulamin okresla zasady korzystania z portalu Aktiv portal.</p><h2>1. Postanowienia ogolne</h2><p>Portal udostepnia mape firm zwiazanych z jezdziectwem. Korzystanie z portalu jest bezplatne.</p><h2>2. Zgloszenia firm</h2><p>Zgloszone miejsca sa weryfikowane przez administratora przed publikacja.</p><p>To jest tresc startowa do uzupelnienia przez wlasciciela portalu.</p>"),
    ("polityka-prywatnosci", "Polityka prywatnosci", "<p>Szanujemy Twoja prywatnosc. Ponizej opisujemy, jak przetwarzamy dane.</p><h2>Administrator danych</h2><p>Administratorem danych jest wlasciciel portalu Aktiv portal.</p><h2>Zakres danych</h2><p>Przetwarzamy dane podane w formularzu zgloszenia firmy oraz dane techniczne niezbedne do dzialania serwisu.</p><p>To jest tresc startowa do uzupelnienia przez wlasciciela portalu.</p>"),
]


class Command(BaseCommand):
    help = "Zasiewa kategorie, przykladowe firmy i strony statyczne."

    def handle(self, *args, **options):
        cats = {}
        for name, slug, color, order in CATEGORIES:
            cat, _ = Category.objects.get_or_create(slug=slug, defaults={"name": name, "color": color, "order": order})
            changed = False
            if cat.name != name:
                cat.name = name
                changed = True
            if cat.color != color:
                cat.color = color
                changed = True
            if cat.order != order:
                cat.order = order
                changed = True
            if changed:
                cat.save()
            cats[slug] = cat

        created = 0
        for row in COMPANIES:
            name, cat_slug, city, address, lat, lng, phone, hours, services, desc = row
            obj, was_created = Company.objects.get_or_create(
                name=name,
                defaults={
                    "category": cats[cat_slug],
                    "city": city,
                    "address": address,
                    "lat": lat,
                    "lng": lng,
                    "phone": phone,
                    "hours": hours,
                    "services": services,
                    "description": desc,
                    "status": Company.STATUS_PUBLISHED,
                    "source": Company.SOURCE_ADMIN,
                },
            )
            if was_created:
                created += 1

        # Zdjecie glowne dla pierwszej stajni, jesli plik jest dostepny.
        sample = Path(settings.BASE_DIR) / "directory" / "static" / "directory" / "img" / "sample-stajnia.png"
        try:
            first = Company.objects.get(name="Stajnia Pod Debami")
            if not first.main_image and sample.exists():
                with open(sample, "rb") as f:
                    first.main_image.save("stajnia-pod-debami.png", File(f), save=True)
        except Company.DoesNotExist:
            pass

        for slug, title, body in PAGES:
            Page.objects.get_or_create(slug=slug, defaults={"title": title, "body": body})

        self.stdout.write(self.style.SUCCESS("Zasiano. Nowe firmy: " + str(created) + ", kategorie: " + str(len(cats)) + ", strony: " + str(len(PAGES))))
