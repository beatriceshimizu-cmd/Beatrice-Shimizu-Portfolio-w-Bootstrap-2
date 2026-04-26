(function () {
  function setFooterIconsByTheme(mode) {
    var icons = document.querySelectorAll(".footer-links img");

    for (var i = 0; i < icons.length; i++) {
      var icon = icons[i];
      var src = (icon.getAttribute("src") || "").toLowerCase();

      if (mode === "dark") {
        if (src.indexOf("mail%20icon.svg") !== -1 || src.indexOf("mail icon.svg") !== -1) {
          icon.setAttribute("src", "images/red-email-icon_1.svg");
        } else if (src.indexOf("insta%20icon.svg") !== -1 || src.indexOf("insta icon.svg") !== -1) {
          icon.setAttribute("src", "images/red-instragram-icon.svg");
        } else if (src.indexOf("linked%20in%20icon.svg") !== -1 || src.indexOf("linked in icon.svg") !== -1) {
          icon.setAttribute("src", "images/red-indesign-icon.svg");
        }
      } else {
        if (src.indexOf("red-email-icon_1.svg") !== -1) {
          icon.setAttribute("src", "images/mail%20icon.svg");
        } else if (src.indexOf("red-instragram-icon.svg") !== -1) {
          icon.setAttribute("src", "images/insta%20icon.svg");
        } else if (src.indexOf("red-indesign-icon.svg") !== -1) {
          icon.setAttribute("src", "images/linked%20in%20icon.svg");
        }
      }
    }
  }

  function ensureThemeMenu() {
    // Remove any existing theme menu
    var oldMenu = document.querySelector('.theme-menu');
    if (oldMenu) oldMenu.remove();

    // Find the anchor for the theme menu (for correct placement)
    var anchor = document.getElementById('theme-menu-anchor');
    if (anchor && !anchor.parentElement.querySelector('.theme-menu')) {
      var themeMenu = document.createElement('div');
      themeMenu.className = 'theme-menu';
      themeMenu.innerHTML =
        '<a href="#" data-theme-menu-toggle="true" aria-label="Display settings" class="theme-menu-trigger">' +
        '  <span class="theme-trigger-icon" aria-hidden="true">\u25D0</span>' +
        '  <span class="chev" aria-hidden="true">\u25BE</span>' +
        '</a>' +
        '<ul class="dropdown theme-dropdown" aria-label="Theme settings">' +
        '  <li class="theme-controls">' +
        '    <p class="theme-row-title">Mode:</p>' +
        '    <div class="mode-switch-wrap" role="group" aria-label="Color mode">' +
        '      <span class="mode-label">Light</span>' +
        '      <button class="mode-switch" type="button" data-theme-mode-toggle="true" aria-label="Toggle dark mode" aria-pressed="false">' +
        '        <span class="mode-switch-track"><span class="mode-switch-thumb"></span></span>' +
        '      </button>' +
        '      <span class="mode-label">Dark</span>' +
        '    </div>' +
        '  </li>' +
        '  <li class="theme-controls">' +
        '    <p class="theme-row-title">Font Size:</p>' +
        '    <div class="theme-options" role="group" aria-label="Font size">' +
        '      <button class="theme-option" type="button" data-font-size="small" aria-pressed="false">Small</button>' +
        '      <button class="theme-option" type="button" data-font-size="medium" aria-pressed="false">Medium</button>' +
        '      <button class="theme-option" type="button" data-font-size="large" aria-pressed="false">Large</button>' +
        '    </div>' +
        '  </li>' +
        '</ul>';
      anchor.parentElement.replaceChild(themeMenu, anchor);

      // --- FORCE THEME BUTTONS TO RED (JS OVERRIDE) ---
      setTimeout(function() {
        var modeSwitch = themeMenu.querySelector('.mode-switch');
        var track = themeMenu.querySelector('.mode-switch-track');
        var thumb = themeMenu.querySelector('.mode-switch-thumb');
        if (modeSwitch) {
          modeSwitch.style.borderColor = '#e63329';
          modeSwitch.style.background = '#fff';
        }
        if (track) {
          track.style.background = '#e63329';
          track.style.borderColor = '#e63329';
        }
        if (thumb) {
          thumb.style.background = '#fff';
          thumb.style.borderColor = '#e63329';
        }
        // For dark mode
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
          if (modeSwitch) modeSwitch.style.background = '#232323';
          if (thumb) thumb.style.background = '#232323';
        }
      }, 0);
    }
  }

  function setSimpleNavState(isOpen) {
    var nav = document.querySelector(".site-nav:not(.navbar)");
    if (!nav) {
      return;
    }

    nav.classList.toggle("is-open", !!isOpen);

    var toggle = nav.querySelector("button[data-simple-nav-toggle]");
    if (toggle) {
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }

  function ensureSimpleMobileNavToggle() {
    var nav = document.querySelector(".site-nav:not(.navbar)");
    if (!nav) {
      return;
    }

    var navList = nav.querySelector(".nav-list");
    if (!navList) {
      return;
    }

    var existing = nav.querySelector("button[data-simple-nav-toggle]");
    if (!existing) {
      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "simple-nav-toggle";
      toggle.setAttribute("data-simple-nav-toggle", "true");
      toggle.setAttribute("aria-label", "Toggle navigation menu");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<span class="simple-nav-toggle-icon" aria-hidden="true">\u2630</span>';
      nav.insertBefore(toggle, nav.firstChild);
    }

    if (window.innerWidth > 991) {
      setSimpleNavState(false);
    }
  }

  function applyPreferences() {
    var mode = localStorage.getItem("siteMode") || "light";
    var size = localStorage.getItem("siteFontSize") || "medium";

    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-font-size", size);

    var modeToggle = document.querySelector("button[data-theme-mode-toggle]");
    if (modeToggle) {
      var isDark = mode === "dark";
      modeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      modeToggle.classList.toggle("is-dark", isDark);
    }

    var sizeButtons = document.querySelectorAll("button[data-font-size]");
    for (var i = 0; i < sizeButtons.length; i++) {
      var isActiveSize = sizeButtons[i].getAttribute("data-font-size") === size;
      sizeButtons[i].setAttribute("aria-pressed", isActiveSize ? "true" : "false");
      sizeButtons[i].classList.toggle("is-active", isActiveSize);
    }

    setFooterIconsByTheme(mode);
  }

  function initializeThemeMenu() {
    ensureThemeMenu();
    ensureSimpleMobileNavToggle();
    applyPreferences();
  }

  function closeBootstrapNavbar(collapse, onClosed) {
    if (!collapse) {
      if (typeof onClosed === "function") {
        onClosed();
      }
      return;
    }

    if (window.bootstrap && window.bootstrap.Collapse) {
      var instance = window.bootstrap.Collapse.getOrCreateInstance(collapse);

      if (!collapse.classList.contains("show")) {
        if (typeof onClosed === "function") {
          onClosed();
        }
        return;
      }

      if (typeof onClosed === "function") {
        var handleHidden = function () {
          collapse.removeEventListener("hidden.bs.collapse", handleHidden);
          onClosed();
        };
        collapse.addEventListener("hidden.bs.collapse", handleHidden);
      }

      instance.hide();
      return;
    }

    collapse.classList.remove("show");

    var togglerId = collapse.getAttribute("id");
    if (!togglerId) {
      return;
    }

    var toggler = document.querySelector('[data-bs-target="#' + togglerId + '"]');
    if (toggler) {
      toggler.setAttribute("aria-expanded", "false");
      toggler.classList.add("collapsed");
    }

    if (typeof onClosed === "function") {
      window.setTimeout(onClosed, 180);
    }
  }

  document.addEventListener("click", function (event) {
    var simpleNavToggle = event.target.closest("button[data-simple-nav-toggle]");
    if (simpleNavToggle) {
      event.preventDefault();
      var nav = simpleNavToggle.closest(".site-nav");
      var willOpen = !(nav && nav.classList.contains("is-open"));
      setSimpleNavState(willOpen);
      return;
    }


    var modeToggle = event.target.closest("button[data-theme-mode-toggle]");
    if (modeToggle) {
      event.preventDefault();
      var nextMode = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("siteMode", nextMode);
      applyPreferences();
      // Close the theme dropdown after change
      var themeMenu = modeToggle.closest('.theme-menu');
      if (themeMenu) {
        var dropdown = themeMenu.querySelector('.theme-dropdown');
        if (dropdown) dropdown.style.display = 'none';
      }
      return;
    }

    var modeButton = event.target.closest("button[data-theme-mode]");
    if (modeButton) {
      event.preventDefault();
      localStorage.setItem("siteMode", modeButton.getAttribute("data-theme-mode"));
      applyPreferences();
      // Close the theme dropdown after change
      var themeMenu = modeButton.closest('.theme-menu');
      if (themeMenu) {
        var dropdown = themeMenu.querySelector('.theme-dropdown');
        if (dropdown) dropdown.style.display = 'none';
      }
      return;
    }

    var sizeButton = event.target.closest("button[data-font-size]");
    if (sizeButton) {
      event.preventDefault();
      localStorage.setItem("siteFontSize", sizeButton.getAttribute("data-font-size"));
      applyPreferences();
      // Close the theme dropdown after change
      var themeMenu = sizeButton.closest('.theme-menu');
      if (themeMenu) {
        var dropdown = themeMenu.querySelector('.theme-dropdown');
        if (dropdown) dropdown.style.display = 'none';
      }
      return;
    }

    var themeTrigger = event.target.closest("[data-theme-menu-toggle]");
    if (themeTrigger) {
      event.preventDefault();
      var themeMenu = themeTrigger.closest('.theme-menu');
      if (themeMenu) {
        var dropdown = themeMenu.querySelector('.theme-dropdown');
        if (dropdown) {
          var isOpen = dropdown.style.display === 'block';
          // Close all other theme dropdowns
          document.querySelectorAll('.theme-dropdown').forEach(function(dd){ dd.style.display = 'none'; });
          dropdown.style.display = isOpen ? 'none' : 'block';
        }
      }
      return;
    }

    var bootstrapNavLink = event.target.closest(".site-nav.navbar .navbar-collapse a[href]");
    if (
      bootstrapNavLink &&
      window.innerWidth <= 991 &&
      !bootstrapNavLink.matches("[data-bs-toggle='dropdown']")
    ) {
      var bootstrapCollapse = bootstrapNavLink.closest(".navbar-collapse");
      if (bootstrapCollapse && bootstrapCollapse.classList.contains("show")) {
        event.preventDefault();
        var destination = bootstrapNavLink.href;
        closeBootstrapNavbar(bootstrapCollapse, function () {
          window.location.href = destination;
        });
        return;
      }
    }

    var simpleNav = document.querySelector(".site-nav:not(.navbar)");
    if (!simpleNav || !simpleNav.classList.contains("is-open") || window.innerWidth > 991) {
      return;
    }

    if (!event.target.closest(".site-nav:not(.navbar)")) {
      setSimpleNavState(false);
      return;
    }

    var clickedLink = event.target.closest(".site-nav:not(.navbar) .nav-item > a");
    if (clickedLink && !clickedLink.parentElement.classList.contains("has-dropdown")) {
      setSimpleNavState(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
      setSimpleNavState(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setSimpleNavState(false);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeThemeMenu);
  } else {
    initializeThemeMenu();
  }
})();
