const CATS = {
  stajnia:    { label: "Stajnie" },
  pensjonat:  { label: "Pensjonaty" },
  weterynarz: { label: "Weterynarze" },
  fizjo:      { label: "Fizjoterapeuci" },
  dietetyk:   { label: "Dietetycy" },
  sklep:      { label: "Sklepy z paszą" }
};

const PALETTES = {
  t1: { stajnia: "#173B2A", pensjonat: "#8A6A3B", weterynarz: "#B5562E", fizjo: "#4A5A6A", dietetyk: "#6B7B3A", sklep: "#6E4A5A" },
  t2: { stajnia: "#16A34A", pensjonat: "#0D9488", weterynarz: "#0EA5E9", fizjo: "#6366F1", dietetyk: "#84CC16", sklep: "#F59E0B" },
  t3: { stajnia: "#15294A", pensjonat: "#3E5C82", weterynarz: "#2F6FB0", fizjo: "#5B6B82", dietetyk: "#4A7C6F", sklep: "#8C6B4A" }
};

let palette = PALETTES.t1;
function catColor(cat) { return palette[cat]; }

const PLACES = [
  { id: 1,  cat: "stajnia",    name: "Stajnia Pod Dębami",            place: "Konstancin-Jeziorna", lat: 52.0894, lng: 21.1186, rating: 4.8, reviews: 126, hours: "Pn-Nd, 8:00-20:00", phone: "+48 22 712 04 18", address: "ul. Wierzbowa 4, Konstancin-Jeziorna", services: ["Pensjonat", "Lekcje jazdy", "Lonżowanie"], blurb: "Kameralna stajnia z krytą ujeżdżalnią i dostępem do leśnych tras.", image: "images/stajnia-pod-debami.png", profileUrl: "stajnia.html" },
  { id: 2,  cat: "stajnia",    name: "Ośrodek Jeździecki Lewada",     place: "Nadarzyn",            lat: 52.0840, lng: 20.8030, rating: 4.6, reviews: 89,  hours: "Pn-Nd, 7:00-21:00", phone: "+48 22 739 11 50", address: "ul. Polna 22, Nadarzyn", services: ["Skoki", "Ujeżdżenie", "Hipoterapia"], blurb: "Sportowy ośrodek z parkurem i lonżownikiem, lekcje na każdym poziomie.", image: "" },
  { id: 3,  cat: "stajnia",    name: "Stajnia Biała Grzywa",          place: "Piaseczno",           lat: 52.0700, lng: 21.0240, rating: 4.9, reviews: 203, hours: "Pn-Nd, 8:00-20:00", phone: "+48 22 756 33 02", address: "ul. Sportowa 9, Piaseczno", services: ["Lekcje", "Obozy", "Pensjonat"], blurb: "Rodzinna stajnia z obozami jeździeckimi i nauką od podstaw.", image: "" },
  { id: 4,  cat: "stajnia",    name: "Ranczo Mazovia",                place: "Grodzisk Mazowiecki", lat: 52.1100, lng: 20.6300, rating: 4.5, reviews: 54,  hours: "Wt-Nd, 9:00-19:00", phone: "+48 22 724 88 41", address: "ul. Leśna 3, Grodzisk Mazowiecki", services: ["Rajdy konne", "Jazdy w terenie"], blurb: "Rajdy konne i jazdy w terenie po malowniczych okolicach.", image: "" },
  { id: 5,  cat: "pensjonat",  name: "Pensjonat dla Koni Zacisze",    place: "Izabelin",            lat: 52.3000, lng: 20.7900, rating: 4.7, reviews: 61,  hours: "Całodobowo", phone: "+48 22 722 50 19", address: "ul. Kampinoska 14, Izabelin", services: ["Boksy", "Padoki", "Pasza premium"], blurb: "Przestronne boksy, duże padoki i całodobowa opieka nad końmi.", image: "" },
  { id: 6,  cat: "pensjonat",  name: "Koński Hotel Stara Stajnia",    place: "Józefów",             lat: 52.1380, lng: 21.2330, rating: 4.4, reviews: 37,  hours: "Całodobowo", phone: "+48 22 789 62 07", address: "ul. Nadwiślańska 8, Józefów", services: ["Boksy", "Wybiegi", "Monitoring"], blurb: "Bezpieczny pensjonat z monitoringiem i indywidualnym żywieniem.", image: "" },
  { id: 7,  cat: "pensjonat",  name: "Pensjonat Equi Spokój",         place: "Brwinów",             lat: 52.1450, lng: 20.7150, rating: 4.8, reviews: 45,  hours: "Całodobowo", phone: "+48 22 729 14 33", address: "ul. Grodziska 27, Brwinów", services: ["Boksy", "Hala", "Rehabilitacja"], blurb: "Spokojne miejsce z halą i zapleczem rehabilitacyjnym.", image: "" },
  { id: 8,  cat: "weterynarz", name: "Gabinet Weterynaryjny HorseVet", place: "Pruszków",           lat: 52.1700, lng: 20.8100, rating: 4.9, reviews: 178, hours: "Pn-Nd, dyżur 24h", phone: "+48 22 758 90 12", address: "ul. Kościuszki 41, Pruszków", services: ["Wyjazdy 24h", "USG", "Dentystyka"], blurb: "Wyjazdy w 24h, USG, gastroskopia i dentystyka koni.", image: "" },
  { id: 9,  cat: "weterynarz", name: "Klinika Koni Vetilia",          place: "Łomianki",            lat: 52.3300, lng: 20.8800, rating: 4.7, reviews: 92,  hours: "Pn-Pt, 8:00-18:00", phone: "+48 22 751 27 60", address: "ul. Brukowa 6, Łomianki", services: ["Chirurgia", "Diagnostyka", "Szczepienia"], blurb: "Pełna diagnostyka, chirurgia i opieka szpitalna dla koni.", image: "" },
  { id: 10, cat: "weterynarz", name: "Weterynarz Koński dr Kowalczyk", place: "Raszyn",             lat: 52.1500, lng: 20.9300, rating: 4.6, reviews: 40,  hours: "Pn-Sb, dyżur wyjazdowy", phone: "+48 22 715 48 90", address: "ul. Mszczonowska 12, Raszyn", services: ["Wyjazdy", "Profilaktyka", "Szczepienia"], blurb: "Wizyty wyjazdowe, profilaktyka i szczepienia w Twojej stajni.", image: "" },
  { id: 11, cat: "fizjo",      name: "EquiFizjo Mazovia",             place: "Konstancin-Jeziorna", lat: 52.0950, lng: 21.1100, rating: 4.9, reviews: 66,  hours: "Pn-Sb, na umówienie", phone: "+48 22 717 05 88", address: "ul. Zdrojowa 2, Konstancin-Jeziorna", services: ["Masaż", "Taping", "Rehabilitacja"], blurb: "Fizjoterapia, masaż i taping dla koni sportowych i rekreacyjnych.", image: "" },
  { id: 12, cat: "fizjo",      name: "Fizjoterapia Koni MoveHorse",   place: "Milanówek",           lat: 52.1200, lng: 20.6700, rating: 4.8, reviews: 51,  hours: "Pn-Pt, na umówienie", phone: "+48 22 724 31 09", address: "ul. Krakowska 18, Milanówek", services: ["Terapia manualna", "Laseroterapia"], blurb: "Terapia manualna i laseroterapia po kontuzjach.", image: "" },
  { id: 13, cat: "dietetyk",   name: "NutriHorse Dietetyka Końska",   place: "Warszawa Wilanów",    lat: 52.1650, lng: 21.0900, rating: 4.7, reviews: 33,  hours: "Pn-Pt, 9:00-17:00", phone: "+48 22 885 14 20", address: "ul. Klimczaka 5, Warszawa", services: ["Plany żywieniowe", "Analiza pasz"], blurb: "Indywidualne plany żywieniowe i analiza pasz.", image: "" },
  { id: 14, cat: "dietetyk",   name: "EquiDieta Anna Nowak",          place: "Zalesie Górne",       lat: 52.0300, lng: 21.0200, rating: 4.6, reviews: 28,  hours: "Pn-Pt, na umówienie", phone: "+48 22 756 71 44", address: "ul. Słoneczna 11, Zalesie Górne", services: ["Konsultacje", "Suplementacja"], blurb: "Konsultacje żywieniowe i dobór suplementacji.", image: "" },
  { id: 15, cat: "sklep",      name: "Pasze i Akcesoria EquiShop",    place: "Piaseczno",           lat: 52.0760, lng: 21.0300, rating: 4.8, reviews: 140, hours: "Pn-Sb, 9:00-19:00", phone: "+48 22 750 60 31", address: "ul. Geodetów 76, Piaseczno", services: ["Pasze", "Siano", "Akcesoria"], blurb: "Pasze, siano i akcesoria z dostawą do stajni.", image: "" },
  { id: 16, cat: "sklep",      name: "Sklep Jeździecki Galop",        place: "Pruszków",            lat: 52.1660, lng: 20.8000, rating: 4.5, reviews: 77,  hours: "Pn-Sb, 10:00-18:00", phone: "+48 22 758 22 14", address: "ul. Plantowa 5, Pruszków", services: ["Sprzęt", "Odzież", "Pasze"], blurb: "Sprzęt, odzież i pasze w jednym miejscu.", image: "" }
];

const HORSESHOE = '<svg class="horseshoe" width="56" height="56" viewBox="0 0 28 38" aria-hidden="true"><path d="M8 28 C8 13 14 9 14 9 C14 9 20 13 20 28" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"></path><circle cx="9.4" cy="24" r="1" fill="#FFFFFF"></circle><circle cx="11.4" cy="16" r="1" fill="#FFFFFF"></circle><circle cx="16.6" cy="16" r="1" fill="#FFFFFF"></circle><circle cx="18.6" cy="24" r="1" fill="#FFFFFF"></circle></svg>';

function pinHtml(color) {
  return '<svg width="30" height="40" viewBox="0 0 28 38" aria-hidden="true"><path d="M14 0 C6 0 0 6 0 14 C0 24 14 38 14 38 C14 38 28 24 28 14 C28 6 22 0 14 0 Z" fill="' + color + '"></path><circle cx="14" cy="14" r="5" fill="#FAF7F1"></circle></svg>';
}

function stars(rating) {
  const full = Math.round(rating);
  let out = "";
  for (let i = 0; i < 5; i += 1) { out += (i < full) ? "★" : "☆"; }
  return out;
}

function mediaHtml(p, big) {
  const cat = CATS[p.cat];
  const hasPhoto = p.image && p.image.length > 0;
  const cls = "media" + (big ? " detail-media" : "") + (hasPhoto ? " has-photo" : "");
  let style = "background-color:" + catColor(p.cat) + ";";
  if (hasPhoto) { style += "background-image:url('" + p.image + "');"; }
  return '<div class="' + cls + '" style="' + style + '"><span class="cat-badge">' + cat.label + '</span>' + HORSESHOE + '</div>';
}

const state = { cat: "all", q: "", place: "" };

const map = L.map("map", { scrollWheelZoom: true, zoomControl: false }).setView([52.18, 20.98], 10);
L.control.zoom({ position: "topright" }).addTo(map);
L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png", { maxZoom: 20, subdomains: "abcd", attribution: "© OpenStreetMap, © CARTO" }).addTo(map);

const markersLayer = L.layerGroup().addTo(map);
let markerById = {};
let activeId = null;

function applyFilters() {
  const q = state.q.trim().toLowerCase();
  const pl = state.place.trim().toLowerCase();
  return PLACES.filter(function (p) {
    if (state.cat !== "all" && p.cat !== state.cat) { return false; }
    if (pl && p.place.toLowerCase().indexOf(pl) === -1) { return false; }
    if (q) {
      const hay = (p.name + " " + CATS[p.cat].label + " " + p.services.join(" ")).toLowerCase();
      if (hay.indexOf(q) === -1) { return false; }
    }
    return true;
  });
}

function setActiveMarker(id) {
  if (activeId !== null && markerById[activeId]) {
    const el = markerById[activeId]._icon;
    if (el) { el.classList.remove("active"); }
  }
  activeId = id;
  if (id !== null && markerById[id]) {
    const el2 = markerById[id]._icon;
    if (el2) { el2.classList.add("active"); }
  }
}

function renderMarkers(list) {
  markersLayer.clearLayers();
  markerById = {};
  list.forEach(function (p) {
    const icon = L.divIcon({ className: "pin-wrap", html: pinHtml(catColor(p.cat)), iconSize: [30, 40], iconAnchor: [15, 40], popupAnchor: [0, -36] });
    const m = L.marker([p.lat, p.lng], { icon: icon }).addTo(markersLayer);
    m.on("click", function () { openDetail(p, false); });
    markerById[p.id] = m;
  });
}

function renderResults(list) {
  const wrap = document.getElementById("results");
  const count = document.getElementById("count");
  count.textContent = list.length === 1 ? "1 miejsce" : list.length + " miejsc";
  if (list.length === 0) {
    wrap.innerHTML = '<p class="empty">Brak wyników. Zmień filtry lub frazę.</p>';
    return;
  }
  wrap.innerHTML = list.map(function (p) {
    return '<article class="card" data-id="' + p.id + '">' +
      mediaHtml(p, false) +
      '<div class="card-body">' +
        '<h3 class="card-title">' + p.name + '</h3>' +
        '<p class="card-place">' + p.place + '</p>' +
        '<div class="rating"><span class="stars">' + stars(p.rating) + '</span><b>' + p.rating.toFixed(1) + '</b><span>(' + p.reviews + ')</span></div>' +
      '</div>' +
    '</article>';
  }).join("");
  Array.prototype.forEach.call(wrap.querySelectorAll(".card"), function (el) {
    el.addEventListener("click", function () {
      const id = parseInt(el.getAttribute("data-id"), 10);
      const p = PLACES.find(function (x) { return x.id === id; });
      openDetail(p, true);
    });
  });
}

function actionsHtml(p) {
  const tel = '<a class="btn btn-green" href="tel:' + p.phone.replace(/\s/g, "") + '">Zadzwoń</a>';
  const onmap = '<button class="btn btn-ghost" type="button" id="show-on-map">Pokaż na mapie</button>';
  if (p.profileUrl) {
    return '<a class="btn btn-solid" href="' + p.profileUrl + '">Zobacz profil stajni</a>' +
           '<div class="row">' + tel + onmap + '</div>';
  }
  return '<div class="row">' + tel + onmap + '</div>';
}

function openDetail(p, fly) {
  const c = document.getElementById("detail-content");
  c.innerHTML =
    mediaHtml(p, true) +
    '<div class="detail-body">' +
      '<h2 class="detail-title">' + p.name + '</h2>' +
      '<div class="rating detail-rating"><span class="stars">' + stars(p.rating) + '</span><b>' + p.rating.toFixed(1) + '</b><span>(' + p.reviews + ' opinii)</span></div>' +
      '<div class="meta-grid">' +
        '<div class="meta-row"><span class="meta-label">Adres</span><span class="meta-value">' + p.address + '</span></div>' +
        '<div class="meta-row"><span class="meta-label">Godziny</span><span class="meta-value">' + p.hours + '</span></div>' +
        '<div class="meta-row"><span class="meta-label">Telefon</span><span class="meta-value">' + p.phone + '</span></div>' +
      '</div>' +
      '<div class="services">' + p.services.map(function (s) { return '<span class="tag">' + s + '</span>'; }).join("") + '</div>' +
      '<p class="blurb">' + p.blurb + '</p>' +
      '<div class="detail-actions">' + actionsHtml(p) + '</div>' +
    '</div>';

  const panel = document.getElementById("panel");
  panel.classList.add("detail-open");
  document.getElementById("detail").classList.add("open");
  document.getElementById("detail").setAttribute("aria-hidden", "false");
  setActiveMarker(p.id);

  const z = Math.max(map.getZoom(), 13);
  if (fly) { map.flyTo([p.lat, p.lng], z, { duration: 0.6 }); }
  else { map.setView([p.lat, p.lng], z, { animate: true }); }

  const btn = document.getElementById("show-on-map");
  if (btn) {
    btn.addEventListener("click", function () { map.flyTo([p.lat, p.lng], Math.max(map.getZoom(), 14), { duration: 0.6 }); });
  }
}

function closeDetail() {
  document.getElementById("panel").classList.remove("detail-open");
  document.getElementById("detail").classList.remove("open");
  document.getElementById("detail").setAttribute("aria-hidden", "true");
  setActiveMarker(null);
}

function renderChips() {
  const wrap = document.getElementById("chips");
  let html = '<button class="chip active" data-cat="all">Wszystko</button>';
  Object.keys(CATS).forEach(function (key) {
    html += '<button class="chip" data-cat="' + key + '">' + CATS[key].label + '</button>';
  });
  wrap.innerHTML = html;
  Array.prototype.forEach.call(wrap.querySelectorAll(".chip"), function (el) {
    el.addEventListener("click", function () {
      Array.prototype.forEach.call(wrap.querySelectorAll(".chip"), function (c) { c.classList.remove("active"); });
      el.classList.add("active");
      state.cat = el.getAttribute("data-cat");
      refresh();
    });
  });
}

function refresh() {
  const list = applyFilters();
  renderResults(list);
  renderMarkers(list);
}

function fitToAll() {
  const pts = PLACES.map(function (p) { return [p.lat, p.lng]; });
  map.fitBounds(pts, { padding: [50, 50] });
}

document.getElementById("q").addEventListener("input", function (e) { state.q = e.target.value; refresh(); });
document.getElementById("place").addEventListener("input", function (e) { state.place = e.target.value; refresh(); });
document.getElementById("detail-back").addEventListener("click", closeDetail);
document.addEventListener("themechange", function (e) {
  palette = PALETTES[e.detail.theme] || PALETTES.t1;
  closeDetail();
  refresh();
});
window.addEventListener("resize", function () { map.invalidateSize(); });

renderChips();
refresh();
fitToAll();
setTimeout(function () { map.invalidateSize(); }, 200);
