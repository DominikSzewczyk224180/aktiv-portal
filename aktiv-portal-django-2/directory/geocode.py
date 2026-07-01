import requests
from django.conf import settings


def _query(text):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "format": "json",
        "limit": 1,
        "countrycodes": "pl",
        "accept-language": "pl",
        "q": text,
    }
    headers = {"User-Agent": settings.GEOCODER_USER_AGENT}
    try:
        res = requests.get(url, params=params, headers=headers, timeout=8)
        if res.status_code != 200:
            return None
        data = res.json()
        if data:
            return float(data[0]["lat"]), float(data[0]["lon"])
    except Exception:
        return None
    return None


def geocode(address, city):
    """Zwraca (lat, lng) dla adresu lub (None, None) gdy nie znaleziono."""
    address = (address or "").strip()
    city = (city or "").strip()
    result = None
    if address and city:
        result = _query(address + ", " + city + ", Polska")
    if not result and city:
        result = _query(city + ", Polska")
    if not result and address:
        result = _query(address + ", Polska")
    if result:
        return result
    return None, None
