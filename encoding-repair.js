(function () {
  "use strict";

  var de = {
    navMenu: "Speisekarte",
    navGallery: "Galerie",
    navVisit: "Anfahrt",
    navContact: "Kontakt",
    call: "Anrufen",
    eyebrow: "Monschau, Deutschland \u00b7 Vom Feuer auf Ihren Tisch",
    heroTitle: "Echter D\u00f6ner.<br><em>Warme Gastlichkeit.</em>",
    heroCopy: "Im Herzen der Eifel: frische Zutaten und erfahrene H\u00e4nde am Feuer f\u00fcr eine unvergessliche Kebab-Pause.",
    viewMenu: "Speisekarte entdecken \u2197",
    parking: "Parkpl\u00e4tze",
    team: "Erfahrenes Team",
    fresh: "T\u00e4glich frisch \u00b7 Vom Feuer zubereitet",
    storyKicker: "Unsere Geschichte",
    storyTitle: "Eifel-Landschaft,<br><em>Anatolisches Feuer.</em>",
    storyCopy: "Eifeler Kebaphaus \u2013 in Monschau die Adresse f\u00fcr gutes Essen und herzliche Bewirtung.",
    feature1Title: "Glutfeuer",
    feature1Copy: "Das echte Aroma des Feuers bei D\u00f6ner und Grill.",
    feature2Title: "Erfahrene H\u00e4nde",
    feature2Copy: "Bei jeder Bestellung dieselbe Sorgfalt, bei jedem Besuch dasselbe L\u00e4cheln.",
    feature3Title: "Bequeme Anreise",
    feature3Copy: "Mit 25 Parkpl\u00e4tzen bleibt der Genuss Ihrer Reise ungeteilt.",
    menuKicker: "Unsere Speisekarte",
    menuTitle: "Auf einen Blick <em>Geschmack.</em>",
    menuCopy: "D\u00f6ner, Kebab, Grill, Pizza, Lahmacun, Pide, Schnitzel, Falafel, Salate und Getr\u00e4nke in Monschau.",
    galleryKicker: "Einblicke",
    galleryTitle: "Willkommen am <em>Tisch.</em>",
    galleryCopy: "Die W\u00e4rme des Feuers, ein vertrauter Tisch und eine kurze Genusspause in Monschau.",
    visitKicker: "So finden Sie uns",
    visitTitle: "In Monschau <em>brennt das Feuer.</em>",
    visitCopy: "Wir freuen uns auf Sie am leckersten Halt Ihrer Eifel-Reise.",
    directions: "Route in Google Maps \u2197",
    radioKicker: "Ruhige Begleitung",
    radioTitle: "Deutsches Radio,<br><em>leise.</em>",
    radioCopy: "Ausgew\u00e4hlte Kultur- und Klassikstreams \u00f6ffentlich-rechtlicher Sender. Offizielle Streams; keine Speicherung oder Weiterverbreitung.",
    footerNote: "D\u00f6ner, Grill und ein herzliches Willkommen.",
    contactTitle: "Kontakt",
    hoursTitle: "Bewerten Sie uns",
    sceneryKicker: "EIFEL LANDSCHAFT \u00b7 ANATOLISCHES FEUER",
    sceneryTitle: "Monschaus <em>atemberaubende Seite.</em>",
    sceneryCopy: "W\u00f6chentliche Auswahl der Eifelt\u00e4ler und historischen Gassen Monschaus. Lizenzierte Bilder von Wikimedia Commons.",
    scenerySource: "Bilder werden w\u00f6chentlich von Wikimedia Commons ausgew\u00e4hlt. Lizenz- und Quellenangaben werden auf den Bildern angezeigt.",
    radioPlay: "\u25b6 Radio starten",
    radioBack: "\u2190 Zur\u00fcck",
    mobileCall: "Anrufen",
    mobileDirections: "Route"
  };

  Object.keys(de).forEach(function (key) {
    document.querySelectorAll('[data-i18n="' + key + '"]').forEach(function (element) {
      element.innerHTML = de[key];
    });
  });

  var fixed = {
    ".skip-link": "Zum Inhalt",
    ".menu-search label": "In der Karte suchen",
    ".admin-entry span": "Administrator-Anmeldung",
    "#admin-login-open": "Anmelden",
    ".menu-widget-label": "EIFELER KEBAPHAUS \u00b7 SPEISEKARTE",
    ".menu-search-clear": "\u00d7",
    ".menu-disclaimer": "Ausz\u00fcge aus der Speisekarte. Alle Preise in Euro. Allergene und Zusatzstoffe erfragen Sie bitte bei unserem Team.",
    ".radio-safety": "Offizielle Senderstreams \u00f6ffentlich-rechtlicher Rundfunkanstalten. Es werden keine Streams gespeichert oder weiterverbreitet. Bei St\u00f6rungen besuchen Sie die offizielle Senderseite.",
    ".reviews-intro h2": "Teilen Sie Ihre <em>Bewertung.</em>",
    ".reviews-intro p": "F\u00fcr die Sternebewertung ist keine Administrator-Freigabe erforderlich. Schriftliche Bewertungen mit Foto werden auf einer separaten Bewertungsseite gesendet und vor der Ver\u00f6ffentlichung vom Administrator gepr\u00fcft.",
    ".reviews-note": "Die Bewertung wird sofort gespeichert; die Ver\u00f6ffentlichung von Bewertungen obliegt der Administrator-Kontrolle.",
    ".reviews-intro .button": "Bewertungsseite \u00f6ffnen \u2197",
    ".review-form-heading strong": "Geschmacksbewertung",
    ".review-form-heading span": "PREMIUM-G\u00c4STEECKE",
    ".rating-field legend": "Ihre Bewertung",
    ".review-form > .button": "Bewertung speichern \u2197",
    "#rating-status": "F\u00fcr die Bewertung ist keine Administrator-Freigabe erforderlich.",
    ".scenic-link": "Landschaftsecke \u2197",
    ".footer-bottom span": "\u00a9 2026 Eifeler Kebaphaus"
  };
  Object.keys(fixed).forEach(function (selector) {
    var element = document.querySelector(selector);
    if (element) element.textContent = fixed[selector];
  });
  var reviewsHeading = document.querySelector(".reviews-intro h2");
  if (reviewsHeading) reviewsHeading.innerHTML = "Teilen Sie Ihre <em>Bewertung.</em>";
  var footerHeadings = document.querySelectorAll("footer .footer-grid > div > h3");
  if (footerHeadings[1]) footerHeadings[1].textContent = "\u00d6ffnungszeiten";
  if (footerHeadings[3]) footerHeadings[3].textContent = "Bewerten Sie uns";
  var searchInput = document.querySelector("#menu-search-input");
  if (searchInput) searchInput.placeholder = "Pizza, D\u00f6ner, Falafel...";
  document.querySelectorAll(".menu-tab").forEach(function (tab) {
    if (tab.firstChild && tab.firstChild.nodeType === 3) tab.firstChild.nodeValue = "";
  });
  document.querySelectorAll(".menu-category-title > span").forEach(function (icon) {
    icon.textContent = "";
  });
  document.querySelectorAll(".phone-icon").forEach(function (icon) {
    icon.textContent = "\u260e";
  });
  document.querySelectorAll(".menu-item b").forEach(function (price) {
    price.textContent = price.textContent.replace(/\s*a\s*$/, " \u20ac");
  });
  document.querySelectorAll(".star-rating label").forEach(function (star) {
    star.textContent = "\u2605";
  });
  var teamIcon = document.querySelector(".hero-stats div:nth-child(2) strong");
  if (teamIcon) teamIcon.textContent = "\u2605";

  var menuLocales = {
    de: {
      tabPizza: "Pizza", tabDoner: "Drehspie\u00df", tabSchnitzel: "Schnitzel", tabTurkish: "T\u00fcrkische Pizza", tabMore: "Mehr",
      pizzaTitle: "Italienische Pizza", pizzaSub: "Alle Pizzen 29 cm mit Tomatensauce, K\u00e4se und Oregano",
      donerTitle: "Spezialit\u00e4ten des Hauses \u00b7 Drehspie\u00df", donerSub: "Kalb- oder H\u00e4hnchenfleisch",
      schnitzelTitle: "Schnitzelgerichte", schnitzelSub: "Mit Salat und Pommes",
      turkishTitle: "T\u00fcrkische Pizza und Pide", turkishSub: "Frisch aus dem Ofen",
      moreTitle: "Mehr aus unserer Karte", moreSub: "Vegetarisches, Salate und Getr\u00e4nke",
      disclaimer: "Ausz\u00fcge aus der Speisekarte. Alle Preise in Euro."
    }
  };
  var menuCopy = menuLocales.de;
  document.querySelectorAll("[data-menu-i18n]").forEach(function (element) {
    if (menuCopy[element.dataset.menuI18n]) element.innerHTML = menuCopy[element.dataset.menuI18n];
  });
  var menuTitle = document.querySelector(".menu-widget h3");
  if (menuTitle) menuTitle.innerHTML = "Feuer &amp; <em>Geschmack</em>";
  var menuLabel = document.querySelector(".menu-widget-label");
  if (menuLabel) menuLabel.textContent = "EIFELER KEBAPHAUS \u00b7 SPEISEKARTE";
  var menuSearchLabel = document.querySelector(".menu-search label");
  if (menuSearchLabel) menuSearchLabel.textContent = "In der Karte suchen";
  var pizzaDescriptions = [
    "Mit K\u00e4se und Tomatensauce",
    "Mit t\u00fcrkischer Knoblauchwurst",
    "Mit Gefl\u00fcgelschinken",
    "Mit Ananas und Gefl\u00fcgelschinken",
    "Champignons, Brokkoli, Tomaten, Mais und Peperoni",
    "Zwiebeln, Paprika, Drehspie\u00df und Rahmsauce"
  ];
  document.querySelectorAll(".menu-category-panel[data-menu-panel=\"pizza\"] .menu-item").forEach(function (item) {
    var name = item.querySelector("strong");
    var paragraph = item.querySelector("p");
    if (!name || !paragraph) return;
    var number = name.textContent.trim().split(".")[0].toUpperCase();
    var indexes = { "18": 0, "18A": 1, "19A": 2, "25": 4, "26": 3, "27": 5 };
    if (indexes[number] !== undefined && pizzaDescriptions[indexes[number]]) paragraph.textContent = pizzaDescriptions[indexes[number]];
  });

  var hours = document.querySelector("footer .hours-card");
  if (hours) {
    hours.innerHTML = "<strong>Dienstag - Sonntag \u00b7 12:00 - 21:00</strong><span>Samstag - Sonntag \u00b7 12:00 - 21:00</span><em>Montag geschlossen</em>";
  }

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  var replacements = [
    [/\bGer ek\b/g, "Ger\u00e7ek"],
    [/\bS cak\b/g, "S\u0131cak"],
    [/\bMen y\b/g, "Men\u00fc"],
    [/\bMen de\b/g, "Men\u00fcde"],
    [/\bke fet\b/g, "ke\u015ffet"],
    [/\bK z\b/g, "K\u00f6z"],
    [/\bHik yemiz\b/g, "Hik\u00e2yemiz"],
    [/\bmanzaras \b/g, "manzaras\u0131 "],
    [/\bate i\b/g, "ate\u015fi"],
    [/\bate in\b/g, "ate\u015fin"],
    [/\bba ndaki\b/g, "ba\u015f\u0131ndaki"],
    [/\bg nl k\b/g, "g\u00fcnl\u00fck"],
    [/\bhaz r\b/g, "haz\u0131r"],
    [/\bK se\b/g, "K\u00e4se"],
    [/\bGefl g\b/g, "Gefl\u00fcg"],
    [/\bWeichk se\b/g, "Weichk\u00e4se"],
    [/\bGem se\b/g, "Gem\u00fcse"],
    [/\bJ ger\b/g, "J\u00e4ger"],
    [/\b  ber\b/g, " \u00fcber"],
    [/\bPuan  n  z\b/g, "Puan\u0131n\u0131z"],
    [/\by netici\b/g, "y\u00f6netici"],
    [/\bY netici\b/g, "Y\u00f6netici"],
    [/\bgiri i\b/g, "giri\u015fi"],
    [/\b leti im\b/g, "\u0130leti\u015fim"],
    [/\b  eriden\b/g, "\u0130\u00e7eriden"],
  ];
  nodes.forEach(function (node) {
    var value = node.nodeValue;
    replacements.forEach(function (entry) { value = value.replace(entry[0], entry[1]); });
    node.nodeValue = value;
  });

  document.title = "Eifeler Kebaphaus | D\u00f6ner & Izgara in Monschau";
  var description = document.querySelector('meta[name="description"]');
  if (description) description.content = "Eifeler Kebaphaus in Monschau \u2013 warmer D\u00f6ner, Grill und ein erfahrenes Team erwarten Sie. 25 Parkpl\u00e4tze, bequeme Anreise und herzlicher Service.";
})();
