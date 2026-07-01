from django.contrib import admin

from .geocode import geocode
from .models import Category, Company, CompanyImage, Page


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "color", "order")
    list_editable = ("color", "order")
    prepopulated_fields = {"slug": ("name",)}


class CompanyImageInline(admin.TabularInline):
    model = CompanyImage
    extra = 2


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "city", "status", "plan", "source", "created")
    list_filter = ("status", "category", "plan", "source")
    search_fields = ("name", "city", "address")
    prepopulated_fields = {"slug": ("name",)}
    list_per_page = 40
    inlines = [CompanyImageInline]
    actions = ["make_published", "make_rejected", "geocode_selected"]
    fieldsets = (
        ("Podstawowe", {"fields": ("name", "slug", "category", "status", "plan", "source", "owner")}),
        ("Lokalizacja", {"fields": ("city", "address", "lat", "lng")}),
        ("Kontakt i linki", {"fields": ("phone", "email", "website", "facebook", "instagram")}),
        ("Tresc", {"fields": ("description", "hours", "services", "main_image")}),
    )

    @admin.action(description="Zatwierdz i opublikuj")
    def make_published(self, request, queryset):
        updated = queryset.update(status=Company.STATUS_PUBLISHED)
        self.message_user(request, "Opublikowano firm: " + str(updated))

    @admin.action(description="Odrzuc zaznaczone")
    def make_rejected(self, request, queryset):
        updated = queryset.update(status=Company.STATUS_REJECTED)
        self.message_user(request, "Odrzucono firm: " + str(updated))

    @admin.action(description="Geokoduj adres (ustaw pin na mapie)")
    def geocode_selected(self, request, queryset):
        done = 0
        for company in queryset:
            lat, lng = geocode(company.address, company.city)
            if lat is not None:
                company.lat = lat
                company.lng = lng
                company.save(update_fields=["lat", "lng"])
                done += 1
        self.message_user(request, "Zageokodowano firm: " + str(done))


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "updated")
    prepopulated_fields = {"slug": ("title",)}


admin.site.site_header = "Aktiv portal, panel"
admin.site.site_title = "Aktiv portal"
admin.site.index_title = "Zarzadzanie tresciami"
