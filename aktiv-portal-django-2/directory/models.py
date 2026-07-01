from django.conf import settings
from django.db import models
from django.utils.text import slugify


def unique_slug(model, base, instance_pk=None):
    base = slugify(base) or "wpis"
    candidate = base
    n = 2
    qs = model.objects.all()
    if instance_pk:
        qs = qs.exclude(pk=instance_pk)
    while qs.filter(slug=candidate).exists():
        candidate = base + "-" + str(n)
        n += 1
    return candidate


class Category(models.Model):
    name = models.CharField("nazwa", max_length=80)
    slug = models.SlugField("slug", max_length=90, unique=True, blank=True)
    color = models.CharField("kolor (hex)", max_length=7, default="#034AA4")
    order = models.PositiveIntegerField("kolejnosc", default=0)

    class Meta:
        verbose_name = "kategoria"
        verbose_name_plural = "kategorie"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(Category, self.name, self.pk)
        super().save(*args, **kwargs)


class Company(models.Model):
    STATUS_PENDING = "pending"
    STATUS_PUBLISHED = "published"
    STATUS_REJECTED = "rejected"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Oczekujace"),
        (STATUS_PUBLISHED, "Opublikowane"),
        (STATUS_REJECTED, "Odrzucone"),
    ]

    PLAN_FREE = "free"
    PLAN_PREMIUM = "premium"
    PLAN_CHOICES = [
        (PLAN_FREE, "Darmowy"),
        (PLAN_PREMIUM, "Premium"),
    ]

    SOURCE_ADMIN = "admin"
    SOURCE_USER = "user"
    SOURCE_CHOICES = [
        (SOURCE_ADMIN, "Dodane przez admina"),
        (SOURCE_USER, "Zgloszenie uzytkownika"),
    ]

    name = models.CharField("nazwa", max_length=160)
    slug = models.SlugField("slug", max_length=180, unique=True, blank=True)
    category = models.ForeignKey(Category, verbose_name="kategoria", on_delete=models.PROTECT, related_name="companies")

    city = models.CharField("miejscowosc", max_length=120)
    address = models.CharField("adres", max_length=220, blank=True)
    lat = models.FloatField("szerokosc", null=True, blank=True)
    lng = models.FloatField("dlugosc", null=True, blank=True)

    phone = models.CharField("telefon", max_length=40, blank=True)
    email = models.EmailField("email", blank=True)
    website = models.URLField("strona www", blank=True)
    facebook = models.URLField("facebook", blank=True)
    instagram = models.URLField("instagram", blank=True)

    description = models.TextField("opis", blank=True)
    hours = models.CharField("godziny", max_length=200, blank=True)
    services = models.CharField("uslugi (po przecinku)", max_length=300, blank=True)

    main_image = models.ImageField("zdjecie glowne", upload_to="companies/", blank=True, null=True)

    status = models.CharField("status", max_length=12, choices=STATUS_CHOICES, default=STATUS_PUBLISHED)
    plan = models.CharField("plan", max_length=10, choices=PLAN_CHOICES, default=PLAN_FREE)
    source = models.CharField("zrodlo", max_length=10, choices=SOURCE_CHOICES, default=SOURCE_ADMIN)

    # Pod przyszle konta uzytkownikow. Na razie puste.
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="wlasciciel", on_delete=models.SET_NULL, null=True, blank=True, related_name="companies")

    created = models.DateTimeField("utworzono", auto_now_add=True)
    updated = models.DateTimeField("zmieniono", auto_now=True)

    class Meta:
        verbose_name = "firma"
        verbose_name_plural = "firmy"
        ordering = ["-created"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(Company, self.name, self.pk)
        super().save(*args, **kwargs)

    @property
    def is_published(self):
        return self.status == self.STATUS_PUBLISHED

    def services_list(self):
        return [s.strip() for s in self.services.split(",") if s.strip()]


class CompanyImage(models.Model):
    company = models.ForeignKey(Company, verbose_name="firma", on_delete=models.CASCADE, related_name="images")
    image = models.ImageField("zdjecie", upload_to="companies/gallery/")
    order = models.PositiveIntegerField("kolejnosc", default=0)

    class Meta:
        verbose_name = "zdjecie firmy"
        verbose_name_plural = "zdjecia firmy"
        ordering = ["order", "id"]

    def __str__(self):
        return "Zdjecie " + str(self.pk)


class Page(models.Model):
    slug = models.SlugField("slug", max_length=90, unique=True)
    title = models.CharField("tytul", max_length=160)
    body = models.TextField("tresc (HTML)", blank=True)
    updated = models.DateTimeField("zmieniono", auto_now=True)

    class Meta:
        verbose_name = "strona"
        verbose_name_plural = "strony"
        ordering = ["slug"]

    def __str__(self):
        return self.title
