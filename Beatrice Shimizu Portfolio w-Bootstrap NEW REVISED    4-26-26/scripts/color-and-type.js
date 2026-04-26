(function () {
  "use strict";

  document.body.classList.add("enhanced");

  var progressBar = document.getElementById("reading-progress-bar");
  var sections = document.querySelectorAll(".font-types-page .type-section");

  function updateReadingProgress() {
    if (!progressBar) {
      return;
    }

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = Math.max(0, Math.min(100, progress)) + "%";
  }

  function revealSections() {
    if (!sections.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      sections.forEach(function (section) {
        section.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.15
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress);

  updateReadingProgress();
  revealSections();

  // Color wheel hover zoom
  var colorWheelImg = document.querySelector(".color-wheel-figure img");
  if (colorWheelImg) {
    colorWheelImg.addEventListener("mouseenter", function () {
      colorWheelImg.classList.add("is-hovered");
    });
    colorWheelImg.addEventListener("mouseleave", function () {
      colorWheelImg.classList.remove("is-hovered");
    });
  }

  // Font types article — image hover zoom
  var fontTypeImgs = document.querySelectorAll(".font-types-page .card img");
  fontTypeImgs.forEach(function (img) {
    img.addEventListener("mouseenter", function () {
      img.classList.add("is-hovered");
    });
    img.addEventListener("mouseleave", function () {
      img.classList.remove("is-hovered");
    });
  });
})();
