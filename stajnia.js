function scrollToZapis(e) {
  e.preventDefault();
  const target = document.getElementById("zapis");
  if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); }
}

Array.prototype.forEach.call(document.querySelectorAll('a[href="#zapis"]'), function (a) {
  a.addEventListener("click", scrollToZapis);
});

const submitBtn = document.getElementById("f-submit");
if (submitBtn) {
  submitBtn.addEventListener("click", function () {
    const name = document.getElementById("f-name");
    const phone = document.getElementById("f-phone");
    let ok = true;

    [name, phone].forEach(function (input) {
      if (!input.value.trim()) {
        input.style.borderColor = "#E5484D";
        ok = false;
      } else {
        input.style.borderColor = "";
      }
    });

    if (!ok) { return; }

    document.getElementById("form-fields").style.display = "none";
    document.getElementById("form-success").classList.add("show");
  });
}
