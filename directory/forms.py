from django import forms

from .models import Company


class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = [
            "name", "category", "city", "address",
            "phone", "email", "website", "hours",
            "services", "description", "main_image",
        ]
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "np. Stajnia Pod Lasem"}),
            "city": forms.TextInput(attrs={"placeholder": "np. Piaseczno"}),
            "address": forms.TextInput(attrs={"placeholder": "ulica i numer"}),
            "phone": forms.TextInput(attrs={"placeholder": "+48 600 000 000"}),
            "email": forms.EmailInput(attrs={"placeholder": "kontakt@example.pl"}),
            "website": forms.URLInput(attrs={"placeholder": "https://"}),
            "hours": forms.TextInput(attrs={"placeholder": "np. Pn-Nd, 8:00-20:00"}),
            "services": forms.TextInput(attrs={"placeholder": "np. Pensjonat, Lekcje jazdy"}),
            "description": forms.Textarea(attrs={"rows": 4, "placeholder": "Czym sie zajmujecie."}),
        }
        labels = {
            "name": "Nazwa miejsca",
            "category": "Kategoria",
            "city": "Miejscowosc",
            "address": "Adres",
            "phone": "Telefon",
            "email": "Email",
            "website": "Strona www",
            "hours": "Godziny",
            "services": "Uslugi (po przecinku)",
            "description": "Krotki opis",
            "main_image": "Zdjecie (opcjonalnie)",
        }
