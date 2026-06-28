(function () {
  var DEFAULT = "t1";

  function apply(theme) {
    document.body.setAttribute("data-theme", theme);
    var btns = document.querySelectorAll("[data-theme-btn]");
    Array.prototype.forEach.call(btns, function (b) {
      if (b.getAttribute("data-theme-btn") === theme) { b.classList.add("active"); }
      else { b.classList.remove("active"); }
    });
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: theme } }));
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-theme-btn]"), function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-theme-btn")); });
  });

  apply(document.body.getAttribute("data-theme") || DEFAULT);
})();
