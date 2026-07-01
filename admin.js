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

  function subCard(s, actions) {
    var color = COLORS[s.cat] || "#8A94A3";
    var lines = "";
    if (s.address) { lines += '<div class="sub-line">' + esc(s.address) + '</div>'; }
    if (s.phone) { lines += '<div class="sub-line">tel. ' + esc(s.phone) + '</div>'; }
    var desc = s.blurb ? '<div class="sub-desc">' + esc(s.blurb) + '</div>' : "";
    return '<div class="sub-card">' +
      '<div class="sub-main">' +
        '<div class="sub-name"><span class="dot" style="background:' + color + '"></span>' + esc(s.name) + '</div>' +
        '<div class="sub-cat">' + esc(LABELS[s.cat] || s.cat) + '</div>' +
        '<div class="sub-place">' + esc(s.place) + '</div>' +
        lines + desc +
      '</div>' +
      '<div class="sub-actions">' + actions + '</div>' +
    '</div>';
  }

  function render() {
    var all = AktivStore.all();
    var pending = all.filter(function (s) { return s.status === "pending"; });
    var approved = all.filter(function (s) { return s.status === "approved"; });
    var rejected = all.filter(function (s) { return s.status === "rejected"; });

    document.getElementById("c-pending").textContent = pending.length;
    document.getElementById("c-approved").textContent = approved.length;
    document.getElementById("c-rejected").textContent = rejected.length;

    document.getElementById("list-pending").innerHTML = pending.length ? pending.map(function (s) {
      return subCard(s, '<button class="btn btn-solid btn-sm" data-act="approve" data-id="' + esc(s.id) + '">Akceptuj</button><button class="btn btn-danger btn-sm" data-act="reject" data-id="' + esc(s.id) + '">Odrzuć</button>');
    }).join("") : '<p class="admin-empty">Brak oczekujących zgłoszeń.</p>';

    document.getElementById("list-approved").innerHTML = approved.length ? approved.map(function (s) {
      return subCard(s, '<span class="badge badge-ok">Zaakceptowane</span><button class="btn btn-ghost btn-sm" data-act="pending" data-id="' + esc(s.id) + '">Cofnij</button>');
    }).join("") : '<p class="admin-empty">Brak zaakceptowanych miejsc.</p>';

    document.getElementById("list-rejected").innerHTML = rejected.length ? rejected.map(function (s) {
      return subCard(s, '<span class="badge badge-rej">Odrzucone</span><button class="btn btn-ghost btn-sm" data-act="pending" data-id="' + esc(s.id) + '">Przywróć</button><button class="btn btn-ghost btn-sm" data-act="remove" data-id="' + esc(s.id) + '">Usuń</button>');
    }).join("") : '<p class="admin-empty">Brak odrzuconych zgłoszeń.</p>';

    Array.prototype.forEach.call(document.querySelectorAll("[data-act]"), function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var act = btn.getAttribute("data-act");
        if (act === "approve") { AktivStore.setStatus(id, "approved"); }
        else if (act === "reject") { AktivStore.setStatus(id, "rejected"); }
        else if (act === "pending") { AktivStore.setStatus(id, "pending"); }
        else if (act === "remove") { AktivStore.remove(id); }
        render();
      });
    });
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

  if (isAuthed()) { showPanel(); } else { showLogin(); }
})();
