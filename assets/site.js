/* Builds the side menu on every page. To add a page, add it to NAV below. */
(function () {
  var NAV = [
    {
      group: "DC Circuit",
      items: [
        {
          id: "measuring-instruments",
          title: "Measuring Instruments",
          meta: "Revision quiz · 22 questions",
          href: "dc-circuit/measuring-instruments/"
        }
      ]
    }
  ];

  var script = document.currentScript;
  var root = (script && script.getAttribute("data-root")) || "";
  var current = document.body.getAttribute("data-page") || "";

  var ICONS = {
    close: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    home: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 9.5L10 4l6.5 5.5V16a1 1 0 0 1-1 1h-3.5v-4.5h-4V17H4.5a1 1 0 0 1-1-1V9.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    chev: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var homeHref = root || "./";
  var html =
    '<div class="drawer-head">' +
      '<a class="drawer-brand" href="' + homeHref + '">Dos Santos <em>Jesus</em></a>' +
      '<button class="close-btn" type="button" aria-label="Close menu">' + ICONS.close + "</button>" +
    "</div>" +
    '<nav class="nav" aria-label="Topics">' +
      '<a class="nav-home" href="' + homeHref + '"' + (current === "home" ? ' aria-current="page"' : "") + ">" + ICONS.home + "Home</a>";

  NAV.forEach(function (g, gi) {
    var listId = "nav-group-" + gi;
    html +=
      '<div class="nav-group">' +
        '<button class="group-btn" type="button" aria-expanded="true" aria-controls="' + listId + '">' +
          "<span>" + esc(g.group) + "</span>" + ICONS.chev +
        "</button>" +
        '<ul class="group-list" id="' + listId + '">';
    g.items.forEach(function (it) {
      html +=
        '<li><a class="nav-link" href="' + root + it.href + '"' + (current === it.id ? ' aria-current="page"' : "") + ">" +
          '<span class="t">' + esc(it.title) + "</span>" +
          '<span class="m">' + esc(it.meta) + "</span>" +
        "</a></li>";
    });
    html += "</ul></div>";
  });
  html += "</nav>";

  var scrim = document.createElement("div");
  scrim.className = "scrim";
  var drawer = document.createElement("aside");
  drawer.className = "drawer";
  drawer.id = "site-menu";
  drawer.setAttribute("aria-label", "Menu");
  drawer.innerHTML = html;
  document.body.append(scrim, drawer);

  var openers = Array.prototype.slice.call(document.querySelectorAll("[data-menu-open]"));
  var lastFocus = null;

  function isOpen() {
    return document.documentElement.classList.contains("menu-open");
  }
  function open() {
    lastFocus = document.activeElement;
    document.documentElement.classList.add("menu-open");
    openers.forEach(function (b) { b.setAttribute("aria-expanded", "true"); });
    var target = drawer.querySelector('[aria-current="page"]') || drawer.querySelector(".close-btn");
    setTimeout(function () { target.focus(); }, 30);
  }
  function close() {
    document.documentElement.classList.remove("menu-open");
    openers.forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  openers.forEach(function (b) { b.addEventListener("click", open); });
  scrim.addEventListener("click", close);
  drawer.querySelector(".close-btn").addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) close();
  });
  drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      document.documentElement.classList.remove("menu-open");
    });
  });
  drawer.querySelectorAll(".group-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var list = document.getElementById(btn.getAttribute("aria-controls"));
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      list.hidden = expanded;
    });
  });
})();
