from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render

from .forms import CompanyForm
from .geocode import geocode
from .models import Category, Company, Page


def _categories_payload():
    return [
        {"slug": c.slug, "name": c.name, "color": c.color}
        for c in Category.objects.all()
    ]


def home(request):
    context = {
        "categories": _categories_payload(),
    }
    return render(request, "home.html", context)


def api_companies(request):
    qs = Company.objects.filter(status=Company.STATUS_PUBLISHED).select_related("category")
    qs = qs.exclude(lat__isnull=True).exclude(lng__isnull=True)

    category = request.GET.get("category", "").strip()
    if category and category != "all":
        qs = qs.filter(category__slug=category)

    city = request.GET.get("city", "").strip()
    if city:
        qs = qs.filter(city__icontains=city)

    q = request.GET.get("q", "").strip()
    if q:
        qs = qs.filter(name__icontains=q)

    data = []
    for c in qs:
        data.append({
            "id": c.pk,
            "name": c.name,
            "slug": c.slug,
            "city": c.city,
            "category": c.category.slug,
            "category_name": c.category.name,
            "color": c.category.color,
            "lat": c.lat,
            "lng": c.lng,
            "image": c.main_image.url if c.main_image else "",
            "premium": c.plan == Company.PLAN_PREMIUM,
        })
    return JsonResponse({"companies": data})


def api_company(request, pk):
    c = get_object_or_404(Company, pk=pk, status=Company.STATUS_PUBLISHED)
    photos = [img.image.url for img in c.images.all()]
    data = {
        "id": c.pk,
        "name": c.name,
        "slug": c.slug,
        "category": c.category.slug,
        "category_name": c.category.name,
        "color": c.category.color,
        "city": c.city,
        "address": c.address,
        "phone": c.phone,
        "email": c.email,
        "website": c.website,
        "facebook": c.facebook,
        "instagram": c.instagram,
        "description": c.description,
        "hours": c.hours,
        "services": c.services_list(),
        "image": c.main_image.url if c.main_image else "",
        "photos": photos,
        "lat": c.lat,
        "lng": c.lng,
        "premium": c.plan == Company.PLAN_PREMIUM,
    }
    return JsonResponse(data)


def company_detail(request, slug):
    company = get_object_or_404(Company, slug=slug, status=Company.STATUS_PUBLISHED)
    return render(request, "company_detail.html", {"company": company})


def page_view(request, slug):
    page = get_object_or_404(Page, slug=slug)
    return render(request, "page.html", {"page": page})


def add_place(request):
    if request.method == "POST":
        form = CompanyForm(request.POST, request.FILES)
        if form.is_valid():
            company = form.save(commit=False)
            company.status = Company.STATUS_PENDING
            company.source = Company.SOURCE_USER
            lat, lng = geocode(company.address, company.city)
            if lat is not None:
                company.lat = lat
                company.lng = lng
            company.save()
            return redirect("add_done")
    else:
        form = CompanyForm()
    return render(request, "add.html", {"form": form})


def add_done(request):
    return render(request, "add_done.html")
