document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll(".collapse-toggle");

    function closeSection(toggle) {
        var panelId = toggle.getAttribute("aria-controls");
        var panel = panelId ? document.getElementById(panelId) : null;

        toggle.setAttribute("aria-expanded", "false");

        if (panel) {
            panel.hidden = true;
        }
    }

    toggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            var isExpanded = toggle.getAttribute("aria-expanded") === "true";
            var panelId = toggle.getAttribute("aria-controls");
            var panel = panelId ? document.getElementById(panelId) : null;

            // Opening one section closes the others (accordion behavior).
            if (!isExpanded) {
                toggles.forEach(function (otherToggle) {
                    if (otherToggle !== toggle) {
                        closeSection(otherToggle);
                    }
                });
            }

            toggle.setAttribute("aria-expanded", String(!isExpanded));

            if (!panel) {
                return;
            }

            panel.hidden = isExpanded;
        });
    });
});
