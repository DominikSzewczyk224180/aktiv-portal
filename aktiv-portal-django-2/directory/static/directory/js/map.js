(function () {
  var CATS = {};
  try {
    var raw = JSON.parse(document.getElementById("cats-data").textContent);
    raw.forEach(function (c) { CATS[c.slug] = { name: c.name, color: c.color }; });
  } catch (e) { CATS = {}; }

  function catColor(slug) { return (CATS[slug] && CATS[slug].color) || "#8A94A3"; }
  function catName(slug) { return (CATS[slug] && CATS[slug].name) || slug; }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var MEDIA_MARK = '<svg class="mark" width="46" height="58" viewBox="0 0 24 30" aria-hidden="true"><path d="M12 29 C12 29 21 18 21 10 A9 9 0 1 0 3 10 C3 18 12 29 12 29 Z" fill="none" stroke="#FFFFFF" stroke-width="2"></path><circle cx="12" cy="10" r="3" fill="none" stroke="#FFFFFF" stroke-width="2"></circle></svg>';
  var CHEVRON = '<svg class="chev" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6 L15 12 L9 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  function pinHtml(color) {
    return '<svg width="30" height="40" viewBox="0 0 28 38" aria-hidden="true"><path d="M14 0 C6 0 0 6 0 14 C0 24 14 38 14 38 C14 38 28 24 28 14 C28 6 22 0 14 0 Z" fill="' + color + '" stroke="#FFFFFF" stroke-width="1.4"></path><circle cx="14" cy="14" r="4.6" fill="#FFFFFF"></circle></svg>';
  }

  function mediaHtml(item, big) {
    var hasPhoto = item.image && item.image.length > 0;
    var cls = "media" + (big ? " detail-media" : "") + (hasPhoto ? " has-photo" : "");
    var style = "background-color:" + catColor(item.category) + ";";
    if (hasPhoto) { style += "background-image:url('" + item.image + "');"; }
    return '<div class="' + cls + '" style="' + style + '"><span class="cat-badge">' + esc(catName(item.category)) + '</span>' + MEDIA_MARK + '</div>';
  }

  var map = L.map("map", { scrollWheelZoom: true, zoomControl: false }).setView([52.07, 19.48], 6);
  L.control.zoom({ position: "topright" }).addTo(map);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png", { maxZoom: 20, subdomains: "abcd", attribution: "© OpenStreetMap, © CARTO" }).addTo(map);

  var markersLayer = L.layerGroup().addTo(map);
  var markerById = {};
  var activeId = null;
  var ALL = [];
  var state = { cat: "all", q: "", place: "" };

  function applyFilters() {
    var q = state.q.trim().toLowerCase();
    var pl = state.place.trim().toLowerCase();
    return ALL.filter(function (p) {
      if (state.cat !== "all" && p.category !== state.cat) { return false; }
      if (pl && p.city.toLowerCase().indexOf(pl) === -1) { return false; }
      if (q && p.name.toLowerCase().indexOf(q) === -1) { return false; }
      return true;
    });
  }

  function setActiveMarker(id) {
    if (activeId !== null && markerById[activeId]) {
      var el = markerById[activeId]._icon;
      if (el) { el.classList.remove("active"); }
    }
    activeId = id;
    if (id !== null && markerById[id]) {
      var el2 = markerById[id]._icon;
      if (el2) { el2.classList.add("active"); }
    }
  }

  function renderMarkers(list) {
    markersLayer.clearLayers();
    markerById = {};
    list.forEach(function (p) {
      var icon = L.divIcon({ className: "pin-wrap", html: pinHtml(catColor(p.category)), iconSize: [30, 40], iconAnchor: [15, 40], popupAnchor: [0, -36] });
      var m = L.marker([p.lat, p.lng], { icon: icon }).addTo(markersLayer);
      m.on("click", function () { openDetail(p.id, false); });
      markerById[p.id] = m;
    });
  }

  function renderResults(list) {
    var wrap = document.getElementById("results");
    document.getElementById("count").textContent = list.length === 1 ? "1 miejsce" : list.length + " miejsc";
    if (list.length === 0) {
      wrap.innerHTML = '<p class="empty">Brak wynikow. Zmien filtry lub fraze.</p>';
      return;
    }
    wrap.innerHTML = list.map(function (p) {
      return '<article class="card" data-id="' + esc(p.id) + '">' +
        mediaHtml(p, false) +
        '<div class="card-body">' +
          '<h3 class="card-title">' + esc(p.name) + '</h3>' +
          '<p class="card-place">' + esc(p.city) + '</p>' +
          '<div class="card-foot"><span class="cat-tag" style="color:' + catColor(p.category) + '">' + esc(catName(p.category)) + '</span>' + CHEVRON + '</div>' +
        '</div>' +
      '</article>';
    }).join("");
    Array.prototype.forEach.call(wrap.querySelectorAll(".card"), function (el) {
      el.addEventListener("click", function () { openDetail(el.getAttribute("data-id"), true); });
    });
  }

  function metaHtml(c) {
    var rows = "";
    if (c.address) { rows += '<div class="meta-row"><span class="meta-label">Adres</span><span class="meta-value">' + esc(c.address) + '</span></div>'; }
    if (c.hours) { rows += '<div class="meta-row"><span class="meta-label">Godziny</span><span class="meta-value">' + esc(c.hours) + '</span></div>'; }
    if (c.phone) { rows += '<div class="meta-row"><span class="meta-label">Telefon</span><span class="meta-value">' + esc(c.phone) + '</span></div>'; }
    if (c.email) { rows += '<div class="meta-row"><span class="meta-label">Email</span><span class="meta-value">' + esc(c.email) + '</span></div>'; }
    if (c.website) { rows += '<div class="meta-row"><span class="meta-label">Strona</span><span class="meta-value"><a href="' + esc(c.website) + '" target="_blank" rel="noopener">' + esc(c.website) + '</a></span></div>'; }
    return rows ? '<div class="meta-grid">' + rows + '</div>' : "";
  }

  function actionsHtml(c) {
    var profile = '<a class="btn btn-solid" href="/firma/' + esc(c.slug) + '/">Zobacz profil</a>';
    var row = '<div class="row">';
    if (c.phone) { row += '<a class="btn btn-green" href="tel:' + esc(c.phone.replace(/\s/g, "")) + '">Zadzwon</a>'; }
    row += '<button class="btn btn-ghost" type="button" id="show-on-map">Pokaz na mapie</button></div>';
    return profile + row;
  }

  function renderDetail(c) {
    var servicesHtml = (c.services && c.services.length) ? '<div class="services">' + c.services.map(function (s) { return '<span class="tag">' + esc(s) + '</span>'; }).join("") + '</div>' : "";
    var blurbHtml = c.description ? '<p class="blurb">' + esc(c.description) + '</p>' : "";
    document.getElementById("detail-content").innerHTML =
      mediaHtml(c, true) +
      '<div class="detail-body">' +
        '<h2 class="detail-title">' + esc(c.name) + '</h2>' +
        '<div class="detail-sub"><span class="cat-tag" style="color:' + catColor(c.category) + '">' + esc(catName(c.category)) + '</span></div>' +
        metaHtml(c) +
        servicesHtml +
        blurbHtml +
        '<div class="detail-actions">' + actionsHtml(c) + '</div>' +
      '</div>';

    document.getElementById("panel").classList.add("detail-open");
    document.getElementById("detail").classList.add("open");
    document.getElementById("detail").setAttribute("aria-hidden", "false");
    setActiveMarker(c.id);

    var z = Math.max(map.getZoom(), 13);
    map.flyTo([c.lat, c.lng], z, { duration: 0.6 });

    var btn = document.getElementById("show-on-map");
    if (btn) { btn.addEventListener("click", function () { map.flyTo([c.lat, c.lng], Math.max(map.getZoom(), 14), { duration: 0.6 }); }); }
  }

  function openDetail(id, fly) {
    fetch("/api/companies/" + id + "/", { headers: { "Accept": "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (c) { renderDetail(c); })
      .catch(function () {});
  }

  function closeDetail() {
    document.getElementById("panel").classList.remove("detail-open");
    document.getElementById("detail").classList.remove("open");
    document.getElementById("detail").setAttribute("aria-hidden", "true");
    setActiveMarker(null);
  }

  function renderChips() {
    var wrap = document.getElementById("chips");
    var html = '<button class="chip active" data-cat="all"><span class="dot" style="background:#1E2A40"></span>Wszystko</button>';
    Object.keys(CATS).forEach(function (slug) {
      html += '<button class="chip" data-cat="' + slug + '"><span class="dot" style="background:' + CATS[slug].color + '"></span>' + esc(CATS[slug].name) + '</button>';
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
    var list = applyFilters();
    renderResults(list);
    renderMarkers(list);
  }

  function fitToAll() {
    var pts = ALL.filter(function (p) { return p.lat && p.lng; }).map(function (p) { return [p.lat, p.lng]; });
    if (pts.length) { map.fitBounds(pts, { padding: [50, 50], maxZoom: 12 }); }
  }

  document.getElementById("q").addEventListener("input", function (e) { state.q = e.target.value; refresh(); });
  document.getElementById("place").addEventListener("input", function (e) { state.place = e.target.value; refresh(); });
  document.getElementById("detail-back").addEventListener("click", closeDetail);
  window.addEventListener("resize", function () { map.invalidateSize(); });

  fetch("/api/companies/", { headers: { "Accept": "application/json" } })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      ALL = data.companies || [];
      renderChips();
      refresh();
      fitToAll();
      setTimeout(function () { map.invalidateSize(); }, 200);
    })
    .catch(function () {
      renderChips();
      document.getElementById("results").innerHTML = '<p class="empty">Nie udalo sie wczytac danych.</p>';
    });
})();
