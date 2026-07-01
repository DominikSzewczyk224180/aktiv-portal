(function (global) {
  var KEY = "aktiv_submissions_v1";
  var SEED = "aktiv_seeded_v1";
  var mem = null;

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return mem ? mem.slice() : [];
    }
  }

  function write(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {
      mem = list.slice();
    }
  }

  function seedOnce() {
    var seeded = false;
    try { seeded = localStorage.getItem(SEED) === "1"; } catch (e) { seeded = (mem !== null); }
    if (seeded) { return; }
    var list = read();
    if (list.length === 0) {
      list.push({
        id: "seed1",
        cat: "stajnia",
        name: "Stajnia Nowa Przygoda",
        place: "Piaseczno",
        address: "ul. Konna 8, Piaseczno",
        phone: "+48 600 123 456",
        blurb: "Nowa stajnia z lekcjami dla dzieci i spokojnymi końmi.",
        lat: 52.052,
        lng: 21.02,
        status: "pending",
        ts: Date.now()
      });
      write(list);
    }
    try { localStorage.setItem(SEED, "1"); } catch (e) { mem = read(); }
  }

  global.AktivStore = {
    all: function () { return read(); },
    add: function (sub) { var l = read(); l.push(sub); write(l); return sub; },
    setStatus: function (id, status) { var l = read(); l.forEach(function (s) { if (s.id === id) { s.status = status; } }); write(l); },
    remove: function (id) { write(read().filter(function (s) { return s.id !== id; })); },
    clear: function () { write([]); },
    seedOnce: seedOnce
  };
})(window);
