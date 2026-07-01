(function () {
  var LOGIN = "admin1";
  var PASS = "aktive2026@";
  var AUTH_KEY = "aktiv_admin_auth_v1";
  var authedMem = false;

  var COLORS = { stajnia: "#034AA4", jazda: "#0E8F9C", weterynarz: "#D6564B", fizjo: "#6B5BD0", dietetyk: "#2E9E5B", sklep: "#E1922E" };
  var LABELS = { stajnia: "Stajnie", jazda: "Jazda konna", weterynarz: "Weterynarze", fizjo: "Fizjoterapeuci", dietetyk: "Dietetycy", sklep: "Sklepy jeździeckie" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function isAuthed() { try { return sessionStorage.getItem(AUTH_KEY) === "1"; } catch (e) { return authedMem; } }
  function setAuthed(v) { authedMem = v; try { if (v) { sessionStorage.setItem(AUTH_KEY, "1"); } else { sessionStorage.removeItem(AUTH_KEY); } } catch (e) {} }

  function catOptions(selected) {
    return Object.keys(LABELS).map(function (key) {
      var sel = key === selected ? " selected" : "";
      return '<option value="' + key + '"' + sel + '>' + LABELS[key] + '</option>';
    }).join("");
  }

  function subCard(s, actions) {
    var color = COLORS[s.cat] || "#8A94A3";
    var lines = "";
    if (s.address) { lines += '<div class="sub-line">' + esc(s.address) + '</div>'; }
    if (s.phone) { lines += '<div class="sub-line">tel. ' + esc(s.phone) + '</div>'; }
    var loc = s.located ? "" : '<div class="sub-line">Lokalizacja przybliżona, popraw adres w edycji.</div>';
    var desc = s.blurb ? '<div class="sub-desc">' + esc(s.blurb) + '</div>' : "";
    return '<div class="sub-card">' +
      '<div class="sub-main">' +
        '<div class="sub-name"><span class="dot" style="background:' + color + '"></span>' + esc(s.name) + '</div>' +
        '<div class="sub-cat">' + esc(LABELS[s.cat] || s.cat) + '</div>' +
        '<div class="sub-place">' + esc(s.place) + '</div>' +
        lines + loc + desc +
      '</div>' +
      '<div class="sub-actions">' + actions + '</div>' +
    '</div>';
  }

  function editBtn(id) { return '<button class="btn btn-ghost btn-sm" data-act="edit" data-id="' + esc(id) + '">Edytuj</button>'; }

  function render() {
    var all = AktivStore.all();
    var pending = all.filter(function (s) { return s.status === "pending"; });
    var approved = all.filter(function (s) { return s.status === "approved"; });
    var rejected = all.filter(function (s) { return s.status === "rejected"; });

    document.getElementById("c-pending").textContent = pending.length;
    document.getElementById("c-approved").textContent = approved.length;
    document.getElementById("c-rejected").textContent = rejected.length;

    document.getElementById("list-pending").innerHTML = pending.length ? pending.map(function (s) {
      return subCard(s, '<button class="btn btn-solid btn-sm" data-act="approve" data-id="' + esc(s.id) + '">Akceptuj</button>' + editBtn(s.id) + '<button class="btn btn-danger btn-sm" data-act="reject" data-id="' + esc(s.id) + '">Odrzuć</button>');
    }).join("") : '<p class="admin-empty">Brak oczekujących zgłoszeń.</p>';

    document.getElementById("list-approved").innerHTML = approved.length ? approved.map(function (s) {
      return subCard(s, '<span class="badge badge-ok">Zaakceptowane</span>' + editBtn(s.id) + '<button class="btn btn-ghost btn-sm" data-act="pending" data-id="' + esc(s.id) + '">Cofnij</button>');
    }).join("") : '<p class="admin-empty">Brak zaakceptowanych miejsc.</p>';

    document.getElementById("list-rejected").innerHTML = rejected.length ? rejected.map(function (s) {
      return subCard(s, '<span class="badge badge-rej">Odrzucone</span>' + editBtn(s.id) + '<button class="btn btn-ghost btn-sm" data-act="pending" data-id="' + esc(s.id) + '">Przywróć</button><button class="btn btn-ghost btn-sm" data-act="remove" data-id="' + esc(s.id) + '">Usuń</button>');
    }).join("") : '<p class="admin-empty">Brak odrzuconych zgłoszeń.</p>';

    Array.prototype.forEach.call(document.querySelectorAll("[data-act]"), function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var act = btn.getAttribute("data-act");
        if (act === "edit") { openEdit(id); return; }
        if (act === "approve") { AktivStore.setStatus(id, "approved"); }
        else if (act === "reject") { AktivStore.setStatus(id, "rejected"); }
        else if (act === "pending") { AktivStore.setStatus(id, "pending"); }
        else if (act === "remove") { AktivStore.remove(id); }
        render();
      });
    });
  }

  var editId = null;
  var editOverlay = document.getElementById("edit-overlay");

  function openEdit(id) {
    var s = AktivStore.get(id);
    if (!s) { return; }
    editId = id;
    document.getElementById("e-name").value = s.name || "";
    document.getElementById("e-cat").innerHTML = catOptions(s.cat);
    document.getElementById("e-place").value = s.place || "";
    document.getElementById("e-address").value = s.address || "";
    document.getElementById("e-phone").value = s.phone || "";
    document.getElementById("e-desc").value = s.blurb || "";
    document.getElementById("e-error").classList.remove("show");
    editOverlay.classList.add("open");
    editOverlay.setAttribute("aria-hidden", "false");
  }
  function closeEdit() {
    editOverlay.classList.remove("open");
    editOverlay.setAttribute("aria-hidden", "true");
    editId = null;
  }

  async function saveEdit() {
    if (!editId) { return; }
    var name = document.getElementById("e-name").value.trim();
    var place = document.getElementById("e-place").value.trim();
    if (!name || !place) { document.getElementById("e-error").classList.add("show"); return; }
    document.getElementById("e-error").classList.remove("show");

    var address = document.getElementById("e-address").value.trim();
    var save = document.getElementById("e-save");
    var label = save.textContent;
    save.disabled = true;
    save.textContent = "Zapisywanie...";

    var patch = {
      name: name,
      cat: document.getElementById("e-cat").value,
      place: place,
      address: address || place,
      phone: document.getElementById("e-phone").value.trim(),
      blurb: document.getElementById("e-desc").value.trim()
    };
    var coords = null;
    try { coords = await AktivGeo.geocodePlace(address, place); } catch (e) { coords = null; }
    if (coords) { patch.lat = coords.lat; patch.lng = coords.lng; patch.located = true; }

    AktivStore.update(editId, patch);
    save.disabled = false;
    save.textContent = label;
    closeEdit();
    render();
  }

  function showPanel() {
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    document.getElementById("logout").style.display = "inline-flex";
    render();
  }
  function showLogin() {
    document.getElementById("admin-login").style.display = "block";
    document.getElementById("admin-panel").style.display = "none";
    document.getElementById("logout").style.display = "none";
  }

  function tryLogin() {
    var l = document.getElementById("l-login").value.trim();
    var p = document.getElementById("l-pass").value;
    if (l === LOGIN && p === PASS) {
      setAuthed(true);
      document.getElementById("l-error").classList.remove("show");
      document.getElementById("l-pass").value = "";
      showPanel();
    } else {
      document.getElementById("l-error").classList.add("show");
    }
  }

  try { AktivStore.seedOnce(); } catch (e) {}
  document.getElementById("l-submit").addEventListener("click", tryLogin);
  document.getElementById("l-pass").addEventListener("keydown", function (e) { if (e.key === "Enter") { tryLogin(); } });
  document.getElementById("logout").addEventListener("click", function () { setAuthed(false); showLogin(); });
  document.getElementById("clear-demo").addEventListener("click", function () { AktivStore.clear(); render(); });
  document.getElementById("edit-close").addEventListener("click", closeEdit);
  document.getElementById("e-save").addEventListener("click", saveEdit);
  editOverlay.addEventListener("click", function (e) { if (e.target === editOverlay) { closeEdit(); } });

  if (isAuthed()) { showPanel(); } else { showLogin(); }
})();
