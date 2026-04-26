(function () {
  "use strict";

  var themeCards = document.querySelectorAll(".color-themes-page .theme-card");

  if (!themeCards.length) {
    return;
  }

  themeCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("is-hovered");
    });

    card.addEventListener("focus", function () {
      card.classList.add("is-hovered");
    }, true);

    card.addEventListener("blur", function () {
      card.classList.remove("is-hovered");
    }, true);
  });
})();
