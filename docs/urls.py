from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("api/companies/", views.api_companies, name="api_companies"),
    path("api/companies/<int:pk>/", views.api_company, name="api_company"),
    path("firma/<slug:slug>/", views.company_detail, name="company_detail"),
    path("strona/<slug:slug>/", views.page_view, name="page_view"),
    path("dodaj/", views.add_place, name="add_place"),
    path("dodaj/dziekujemy/", views.add_done, name="add_done"),
]
