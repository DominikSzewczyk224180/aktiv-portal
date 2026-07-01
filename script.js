const CATS = {
  stajnia:    { label: "Stajnie" },
  jazda:      { label: "Jazda konna" },
  weterynarz: { label: "Weterynarze" },
  fizjo:      { label: "Fizjoterapeuci" },
  dietetyk:   { label: "Dietetycy" },
  sklep:      { label: "Sklepy jeździeckie" }
};

const COLORS = {
  stajnia: "#034AA4",
  jazda: "#0E8F9C",
  weterynarz: "#D6564B",
  fizjo: "#6B5BD0",
  dietetyk: "#2E9E5B",
  sklep: "#E1922E"
};
function catColor(cat) { return COLORS[cat] || "#8A94A3"; }

function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const PLACES = [
  { id: 1,  cat: "stajnia",    name: "Stajnia Pod Dębami",             place: "Konstancin-Jeziorna", lat: 52.0894, lng: 21.1186, rating: 4.8, reviews: 126, hours: "Pn-Nd, 8:00-20:00", phone: "+48 22 712 04 18", address: "ul. Wierzbowa 4, Konstancin-Jeziorna", services: ["Pensjonat", "Lekcje jazdy", "Lonżowanie"], blurb: "Kameralna stajnia z krytą ujeżdżalnią i dostępem do leśnych tras.", image: "images/stajnia-pod-debami.png", profileUrl: "stajnia.html" },
  { id: 2,  cat: "stajnia",    name: "Ośrodek Jeździecki Lewada",      place: "Nadarzyn",            lat: 52.0840, lng: 20.8030, rating: 4.6, reviews: 89,  hours: "Pn-Nd, 7:00-21:00", phone: "+48 22 739 11 50", address: "ul. Polna 22, Nadarzyn", services: ["Pensjonat", "Padoki", "Kryta hala"], blurb: "Ośrodek z krytą halą, padokami i pełnym zapleczem dla koni.", image: "" },
  { id: 3,  cat: "stajnia",    name: "Stajnia Biała Grzywa",           place: "Piaseczno",           lat: 52.0700, lng: 21.0240, rating: 4.9, reviews: 203, hours: "Pn-Nd, 8:00-20:00", phone: "+48 22 756 33 02", address: "ul. Sportowa 9, Piaseczno", services: ["Pensjonat", "Boksy", "Padoki"], blurb: "Rodzinna stajnia z przestronnymi boksami i dużymi padokami.", image: "" },
  { id: 4,  cat: "stajnia",    name: "Ranczo Mazovia",                 place: "Grodzisk Mazowiecki", lat: 52.1100, lng: 20.6300, rating: 4.5, reviews: 54,  hours: "Wt-Nd, 9:00-19:00", phone: "+48 22 724 88 41", address: "ul. Leśna 3, Grodzisk Mazowiecki", services: ["Pensjonat", "Wybiegi", "Siano"], blurb: "Spokojne ranczo z dużymi wybiegami wśród łąk i lasów.", image: "" },
  { id: 5,  cat: "jazda",      name: "Szkoła Jazdy Konnej Kłus",       place: "Izabelin",            lat: 52.3000, lng: 20.7900, rating: 4.7, reviews: 61,  hours: "Pn-Nd, 9:00-20:00", phone: "+48 22 722 50 19", address: "ul. Kampinoska 14, Izabelin", services: ["Lekcje indywidualne", "Lekcje grupowe", "Lonżowanie"], blurb: "Szkoła jazdy dla dzieci i dorosłych, od podstaw po sport.", image: "" },
  { id: 6,  cat: "jazda",      name: "Klub Jeździecki Kopyto",         place: "Józefów",             lat: 52.1380, lng: 21.2330, rating: 4.4, reviews: 37,  hours: "Wt-Nd, 9:00-19:00", phone: "+48 22 789 62 07", address: "ul. Nadwiślańska 8, Józefów", services: ["Jazda w terenie", "Obozy", "Hipoterapia"], blurb: "Klub z jazdą w terenie i wakacyjnymi obozami jeździeckimi.", image: "" },
  { id: 7,  cat: "jazda",      name: "Ośrodek Jazdy Konnej Kaskada",   place: "Brwinów",             lat: 52.1450, lng: 20.7150, rating: 4.8, reviews: 45,  hours: "Pn-Sb, 8:00-20:00", phone: "+48 22 729 14 33", address: "ul. Grodziska 27, Brwinów", services: ["Lekcje", "Ujeżdżenie", "Skoki"], blurb: "Nauka jazdy oraz treningi ujeżdżenia i skoków przez przeszkody.", image: "" },
  { id: 8,  cat: "weterynarz", name: "Gabinet Weterynaryjny HorseVet", place: "Pruszków",            lat: 52.1700, lng: 20.8100, rating: 4.9, reviews: 178, hours: "Pn-Nd, dyżur 24h", phone: "+48 22 758 90 12", address: "ul. Kościuszki 41, Pruszków", services: ["Wyjazdy 24h", "USG", "Dentystyka"], blurb: "Wyjazdy w 24h, USG, gastroskopia i dentystyka koni.", image: "" },
  { id: 9,  cat: "weterynarz", name: "Klinika Koni Vetilia",           place: "Łomianki",            lat: 52.3300, lng: 20.8800, rating: 4.7, reviews: 92,  hours: "Pn-Pt, 8:00-18:00", phone: "+48 22 751 27 60", address: "ul. Brukowa 6, Łomianki", services: ["Chirurgia", "Diagnostyka", "Szczepienia"], blurb: "Pełna diagnostyka, chirurgia i opieka szpitalna dla koni.", image: "" },
  { id: 10, cat: "weterynarz", name: "Weterynarz Koński dr Kowalczyk",  place: "Raszyn",             lat: 52.1500, lng: 20.9300, rating: 4.6, reviews: 40,  hours: "Pn-Sb, dyżur wyjazdowy", phone: "+48 22 715 48 90", address: "ul. Mszczonowska 12, Raszyn", services: ["Wyjazdy", "Profilaktyka", "Szczepienia"], blurb: "Wizyty wyjazdowe, profilaktyka i szczepienia w Twojej stajni.", image: "" },
  { id: 11, cat: "fizjo",      name: "EquiFizjo Mazovia",              place: "Konstancin-Jeziorna", lat: 52.0950, lng: 21.1100, rating: 4.9, reviews: 66,  hours: "Pn-Sb, na umówienie", phone: "+48 22 717 05 88", address: "ul. Zdrojowa 2, Konstancin-Jeziorna", services: ["Masaż", "Taping", "Rehabilitacja"], blurb: "Fizjoterapia, masaż i taping dla koni sportowych i rekreacyjnych.", image: "" },
  { id: 12, cat: "fizjo",      name: "Fizjoterapia Koni MoveHorse",    place: "Milanówek",           lat: 52.1200, lng: 20.6700, rating: 4.8, reviews: 51,  hours: "Pn-Pt, na umówienie", phone: "+48 22 724 31 09", address: "ul. Krakowska 18, Milanówek", services: ["Terapia manualna", "Laseroterapia"], blurb: "Terapia manualna i laseroterapia po kontuzjach.", image: "" },
  { id: 13, cat: "dietetyk",   name: "NutriHorse Dietetyka Końska",    place: "Warszawa Wilanów",    lat: 52.1650, lng: 21.0900, rating: 4.7, reviews: 33,  hours: "Pn-Pt, 9:00-17:00", phone: "+48 22 885 14 20", address: "ul. Klimczaka 5, Warszawa", services: ["Plany żywieniowe", "Analiza pasz"], blurb: "Indywidualne plany żywieniowe i analiza pasz.", image: "" },
  { id: 14, cat: "dietetyk",   name: "EquiDieta Anna Nowak",           place: "Zalesie Górne",       lat: 52.0300, lng: 21.0200, rating: 4.6, reviews: 28,  hours: "Pn-Pt, na umówienie", phone: "+48 22 756 71 44", address: "ul. Słoneczna 11, Zalesie Górne", services: ["Konsultacje", "Suplementacja"], blurb: "Konsultacje żywieniowe i dobór suplementacji.", image: "" },
  { id: 15, cat: "sklep",      name: "Sklep Jeździecki EquiShop",      place: "Piaseczno",           lat: 52.0760, lng: 21.0300, rating: 4.8, reviews: 140, hours: "Pn-Sb, 9:00-19:00", phone: "+48 22 750 60 31", address: "ul. Geodetów 76, Piaseczno", services: ["Sprzęt", "Odzież", "Pasze"], blurb: "Sprzęt jeździecki, odzież i pasze w jednym miejscu.", image: "" },
  { id: 16, cat: "sklep",      name: "Sklep Jeździecki Galop",         place: "Pruszków",            lat: 52.1660, lng: 20.8000, rating: 4.5, reviews: 77,  hours: "Pn-Sb, 10:00-18:00", phone: "+48 22 758 22 14", address: "ul. Plantowa 5, Pruszków", services: ["Siodła", "Ogłowia", "Akcesoria"], blurb: "Siodła, ogłowia i akcesoria dla jeźdźca i konia.", image: "" }
];

const MEDIA_MARK = '<svg class="mark" width="46" height="58" viewBox="0 0 24 30" aria-hidden="true"><path d="M12 29 C12 29 21 18 21 10 A9 9 0 1 0 3 10 C3 18 12 29 12 29 Z" fill="none" stroke="#FFFFFF" stroke-width="2"></path><circle cx="12" cy="10" r="3" fill="none" stroke="#FFFFFF" stroke-width="2"></circle></svg>';
const CHEVRON = '<svg class="chev" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6 L15 12 L9 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

function pinHtml(color) {
  return '<svg width="30" height="40" viewBox="0 0 28 38" aria-hidden="true"><path d="M14 0 C6 0 0 6 0 14 C0 24 14 38 14 38 C14 38 28 24 28 14 C28 6 22 0 14 0 Z" fill="' + color + '" stroke="#FFFFFF" stroke-width="1.4"></path><circle cx="14" cy="14" r="4.6" fill="#FFFFFF"></circle></svg>';
}

function stars(rating) {
  const full = Math.round(rating);
  let out = "";
  for (let i = 0; i < 5; i += 1) { out += (i < full) ? "★" : "☆"; }
  return out;
}

function mediaHtml(p, big) {
  const hasPhoto = p.image && p.image.length > 0;
  const cls = "media" + (big ? " detail-media" : "") + (hasPhoto ? " has-photo" : "");
  let style = "background-color:" + catColor(p.cat) + ";";
  if (hasPhoto) { style += "background-image:url('" + p.image + "');"; }
  return '<div class="' + cls + '" style="' + style + '"><span class="cat-badge">' + esc(CATS[p.cat].label) + '</span>' + MEDIA_MARK + '</div>';
}

function communityPlaces() {
  let subs = [];
  try { subs = AktivStore.all(); } catch (e) { subs = []; }
  return subs.filter(function (s) { return s.status === "approved"; }).map(function (s) {
    return { id: s.id, cat: s.cat, name: s.name, place: s.place, address: s.address || s.place, phone: s.phone || "", services: [], blurb: s.blurb || "", rating: 0, reviews: 0, image: "", lat: s.lat, lng: s.lng, community: true };
  });
}
function allPlaces() { return PLACES.concat(communityPlaces()); }
function findPlace(id) { return allPlaces().filter(function (p) { return String(p.id) === String(id); })[0]; }

const map = L.map("map", { scrollWheelZoom: true, zoomControl: false }).setView([52.18, 20.98], 10);
L.control.zoom({ position: "topright" }).addTo(map);
L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png", { maxZoom: 20, subdomains: "abcd", attribution: "© OpenStreetMap, © CARTO" }).addTo(map);

const markersLayer = L.layerGroup().addTo(map);
let markerById = {};
let activeId = null;
const state = { cat: "all", q: "", place: "" };

function applyFilters() {
  const q = state.q.trim().toLowerCase();
  const pl = state.place.trim().toLowerCase();
  return allPlaces().filter(function (p) {
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

function footHtml(p) {
  if (p.community) { return '<span class="new-tag">Nowe</span>' + CHEVRON; }
  return '<div class="rating"><span class="stars">' + stars(p.rating) + '</span><b>' + p.rating.toFixed(1) + '</b><span>(' + p.reviews + ')</span></div>' + CHEVRON;
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
    return '<article class="card" data-id="' + esc(p.id) + '">' +
      mediaHtml(p, false) +
      '<div class="card-body">' +
        '<h3 class="card-title">' + esc(p.name) + '</h3>' +
        '<p class="card-place">' + esc(p.place) + '</p>' +
        '<div class="card-foot">' + footHtml(p) + '</div>' +
      '</div>' +
    '</article>';
  }).join("");
  Array.prototype.forEach.call(wrap.querySelectorAll(".card"), function (el) {
    el.addEventListener("click", function () {
      const p = findPlace(el.getAttribute("data-id"));
      if (p) { openDetail(p, true); }
    });
  });
}

function actionsHtml(p) {
  const onmap = '<button class="btn btn-ghost" type="button" id="show-on-map">Pokaż na mapie</button>';
  if (p.community) { return onmap; }
  const tel = '<a class="btn btn-green" href="tel:' + esc(p.phone.replace(/\s/g, "")) + '">Zadzwoń</a>';
  if (p.profileUrl) {
    return '<a class="btn btn-solid" href="' + p.profileUrl + '">Zobacz profil stajni</a>' +
           '<div class="row">' + tel + onmap + '</div>';
  }
  return '<div class="row">' + tel + onmap + '</div>';
}

function detailTopHtml(p) {
  if (p.community) { return '<div style="margin-bottom:16px"><span class="new-tag">Nowe miejsce</span></div>'; }
  return '<div class="rating detail-rating"><span class="stars">' + stars(p.rating) + '</span><b>' + p.rating.toFixed(1) + '</b><span>(' + p.reviews + ' opinii)</span></div>';
}

function metaHtml(p) {
  let rows = '<div class="meta-row"><span class="meta-label">Adres</span><span class="meta-value">' + esc(p.address) + '</span></div>';
  if (p.hours) { rows += '<div class="meta-row"><span class="meta-label">Godziny</span><span class="meta-value">' + esc(p.hours) + '</span></div>'; }
  if (p.phone) { rows += '<div class="meta-row"><span class="meta-label">Telefon</span><span class="meta-value">' + esc(p.phone) + '</span></div>'; }
  return '<div class="meta-grid">' + rows + '</div>';
}

function openDetail(p, fly) {
  const servicesHtml = p.services.length ? '<div class="services">' + p.services.map(function (s) { return '<span class="tag">' + esc(s) + '</span>'; }).join("") + '</div>' : "";
  const blurbHtml = p.blurb ? '<p class="blurb">' + esc(p.blurb) + '</p>' : "";
  const c = document.getElementById("detail-content");
  c.innerHTML =
    mediaHtml(p, true) +
    '<div class="detail-body">' +
      '<h2 class="detail-title">' + esc(p.name) + '</h2>' +
      detailTopHtml(p) +
      metaHtml(p) +
      servicesHtml +
      blurbHtml +
      '<div class="detail-actions">' + actionsHtml(p) + '</div>' +
    '</div>';

  document.getElementById("panel").classList.add("detail-open");
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
  let html = '<button class="chip active" data-cat="all"><span class="dot" style="background:#1E2A40"></span>Wszystko</button>';
  Object.keys(CATS).forEach(function (key) {
    html += '<button class="chip" data-cat="' + key + '"><span class="dot" style="background:' + COLORS[key] + '"></span>' + CATS[key].label + '</button>';
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

const overlay = document.getElementById("add-overlay");
function openAdd() {
  document.getElementById("add-form").style.display = "block";
  document.getElementById("add-success").classList.remove("show");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}
function closeAdd() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
}
function buildAddCategories() {
  document.getElementById("a-cat").innerHTML = Object.keys(CATS).map(function (key) {
    return '<option value="' + key + '">' + CATS[key].label + '</option>';
  }).join("");
}

function submitAdd() {
  const name = document.getElementById("a-name");
  const place = document.getElementById("a-place");
  let ok = true;
  [name, place].forEach(function (input) {
    if (!input.value.trim()) { input.style.borderColor = "#D6564B"; ok = false; }
    else { input.style.borderColor = ""; }
  });
  if (!ok) { return; }

  const center = map.getCenter();
  const sub = {
    id: "u" + Date.now(),
    cat: document.getElementById("a-cat").value,
    name: name.value.trim(),
    place: place.value.trim(),
    address: document.getElementById("a-address").value.trim() || place.value.trim(),
    phone: document.getElementById("a-phone").value.trim(),
    blurb: document.getElementById("a-desc").value.trim(),
    lat: center.lat,
    lng: center.lng,
    status: "pending",
    ts: Date.now()
  };
  try { AktivStore.add(sub); } catch (e) {}

  ["a-name", "a-place", "a-address", "a-phone", "a-desc"].forEach(function (id) { document.getElementById(id).value = ""; });
  document.getElementById("add-form").style.display = "none";
  document.getElementById("add-success").classList.add("show");
}

document.getElementById("q").addEventListener("input", function (e) { state.q = e.target.value; refresh(); });
document.getElementById("place").addEventListener("input", function (e) { state.place = e.target.value; refresh(); });
document.getElementById("detail-back").addEventListener("click", closeDetail);
document.getElementById("open-add").addEventListener("click", openAdd);
document.getElementById("open-add-map").addEventListener("click", openAdd);
document.getElementById("add-close").addEventListener("click", closeAdd);
document.getElementById("add-done").addEventListener("click", closeAdd);
overlay.addEventListener("click", function (e) { if (e.target === overlay) { closeAdd(); } });
document.getElementById("a-submit").addEventListener("click", submitAdd);
window.addEventListener("resize", function () { map.invalidateSize(); });

try { AktivStore.seedOnce(); } catch (e) {}
buildAddCategories();
renderChips();
refresh();
fitToAll();
setTimeout(function () { map.invalidateSize(); }, 200);
