const translations = {
  de: {
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
  }
};

const menuTranslations = {
  de: {
    tabPizza: "Pizza",
    tabDoner: "Drehspie\u00df",
    tabSchnitzel: "Schnitzel",
    tabTurkish: "T\u00fcrkische Pizza",
    tabMore: "Mehr",
    pizzaTitle: "Italienische Pizza",
    pizzaSub: "Alle Pizzen 29 cm mit Tomatensauce, K\u00e4se und Oregano",
    donerTitle: "Spezialit\u00e4ten des Hauses \u00b7 Drehspie\u00df",
    donerSub: "Kalb- oder H\u00e4hnchenfleisch",
    schnitzelTitle: "Schnitzelgerichte",
    schnitzelSub: "Mit Salat und Pommes",
    turkishTitle: "T\u00fcrkische Pizza und Pide",
    turkishSub: "Frisch aus dem Ofen",
    moreTitle: "Mehr aus unserer Karte",
    moreSub: "Vegetarisches, Salate und Getr\u00e4nke",
    disclaimer: "Ausz\u00fcge aus der Speisekarte. Alle Preise in Euro."
  }
};

/* === Radio Player === */
const radioStations = [
  { name: "Deutschlandfunk Kultur", desc: "Kultur und H\u00f6rspiel", stream: "https://st02.sslstream.dlf.de/dlf/02/128/mp3/stream.mp3", page: "https://www.deutschlandfunkkultur.de/" },
  { name: "BR-Klassik", desc: "Klassische Musik", stream: "https://dispatcher.rndfnk.com/br/brklassik/live/mp3/high", page: "https://www.br.de/" },
  { name: "SWR Kultur", desc: "Kultur und Musik", stream: "https://swr-swr2-live.cast.addradio.de/swr/swr2/live/mp3/256/stream.mp3", page: "https://www.swr.de/swr2/" },
  { name: "NDR Kultur", desc: "Kultur und Musik", stream: "https://icecast.ndr.de/ndr/ndrkultur/live/mp3/128/stream.mp3", page: "https://www.ndr.de/kultur/live" },
  { name: "WDR 3", desc: "Klassik und Kultur", stream: "https://wdr-wdr3-live.icecastssl.wdr.de/wdr/wdr3/live/mp3/128/stream.mp3", page: "https://www1.wdr.de/radio/wdr3/" }
];

let currentStation = 0;
let isPlaying = false;
const radioAudio = document.querySelector("#radio-audio");
const radioStationName = document.querySelector("#radio-station-name");
const radioStationDesc = document.querySelector("#radio-station-desc");
const radioPlayPauseBtn = document.querySelector("#radio-play-pause");
const radioPrevBtn = document.querySelector("#radio-prev");
const radioNextBtn = document.querySelector("#radio-next");
const radioStatus = document.querySelector("#radio-status");
const radioCounter = document.querySelector("#radio-counter");
const radioStationLink = document.querySelector("#radio-station-link");

function loadStation(index) {
  currentStation = ((index % radioStations.length) + radioStations.length) % radioStations.length;
  var station = radioStations[currentStation];
  if (radioAudio) radioAudio.src = station.stream;
  if (radioStationName) radioStationName.textContent = station.name;
  if (radioStationDesc) radioStationDesc.textContent = station.desc;
  if (radioCounter) radioCounter.textContent = (currentStation + 1) + " / " + radioStations.length;
  if (radioStationLink) radioStationLink.href = station.page;
  if (isPlaying && radioAudio) {
    radioAudio.play().catch(function() {
      if (radioStatus) radioStatus.textContent = "Stream konnte nicht gestartet werden. Bitte sp\u00e4ter erneut versuchen.";
    });
  }
}

if (radioPlayPauseBtn) {
  radioPlayPauseBtn.addEventListener("click", function() {
    if (isPlaying) {
      if (radioAudio) radioAudio.pause();
      isPlaying = false;
      radioPlayPauseBtn.textContent = "\u25b6";
      radioPlayPauseBtn.setAttribute("aria-label", "Abspielen");
    } else {
      if (!radioAudio) return;
      radioAudio.play().then(function() {
        isPlaying = true;
        radioPlayPauseBtn.textContent = "\u23f8";
        radioPlayPauseBtn.setAttribute("aria-label", "Pause");
        if (radioStatus) radioStatus.textContent = "";
      }).catch(function() {
        if (radioStatus) radioStatus.textContent = "Stream nicht verf\u00fcgbar. Bitte sp\u00e4ter erneut versuchen oder die offizielle Senderseite besuchen.";
      });
    }
  });
}

if (radioPrevBtn) radioPrevBtn.addEventListener("click", function() { loadStation(currentStation - 1); });
if (radioNextBtn) radioNextBtn.addEventListener("click", function() { loadStation(currentStation + 1); });
loadStation(0);

const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => { const open = document.querySelector(".nav-links").classList.toggle("open"); menuToggle.setAttribute("aria-expanded", open); });
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => { document.querySelector(".nav-links").classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); }));
const menuTabs = document.querySelectorAll(".menu-tab");
const menuPanels = document.querySelectorAll(".menu-category-panel");
const menuSearchInput = document.querySelector("#menu-search-input");
const menuSearchClear = document.querySelector(".menu-search-clear");
function filterMenu() {
  const query = menuSearchInput.value.trim().toLocaleLowerCase();
  const activeCategory = document.querySelector(".menu-tab.active").dataset.menuCategory;
  menuPanels.forEach(panel => {
    const items = panel.querySelectorAll(".menu-item");
    let matches = 0;
    items.forEach(item => {
      const match = !query || item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !match;
      if (match) matches += 1;
    });
    panel.hidden = query ? matches === 0 : panel.dataset.menuPanel !== activeCategory;
  });
}
menuTabs.forEach(tab => tab.addEventListener("click", () => {
  const category = tab.dataset.menuCategory;
  menuTabs.forEach(item => { const active = item === tab; item.classList.toggle("active", active); item.setAttribute("aria-selected", active); });
  filterMenu();
}));
menuSearchInput.addEventListener("input", filterMenu);
menuSearchClear.addEventListener("click", () => { menuSearchInput.value = ""; filterMenu(); menuSearchInput.focus(); });
const lightbox = document.querySelector("#lightbox"); const lightboxImage = document.querySelector("#lightboxImage");
document.querySelectorAll("[data-lightbox]").forEach(item => item.addEventListener("click", () => { lightboxImage.src = item.dataset.lightbox; lightboxImage.alt = item.dataset.alt; lightbox.hidden = false; document.body.style.overflow = "hidden"; document.querySelector(".lightbox-close").focus(); }));
function closeLightbox(){ lightbox.hidden = true; document.body.style.overflow = ""; }
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox); lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); }); document.addEventListener("keydown", event => { if (event.key === "Escape" && !lightbox.hidden) closeLightbox(); });
const ratingForm = document.querySelector("#rating-form");
const ratingStatus = document.querySelector("#rating-status");
ratingForm.addEventListener("submit", event => {
  event.preventDefault();
  const rating = Number(ratingForm.elements.rating.value);
  if (!rating) {
    ratingStatus.textContent = "Vielen Dank \u2013 Ihre Bewertung wurde gespeichert. Keine Administrator-Freigabe erforderlich.";
    return;
  }
  try {
    localStorage.setItem("eifeler-kebaphaus-rating", String(rating));
    ratingStatus.textContent = "Vielen Dank \u2013 Ihre Bewertung wurde gespeichert. Keine Administrator-Freigabe erforderlich.";
  } catch {
    ratingStatus.textContent = "Vielen Dank \u2013 Ihre Bewertung wurde gespeichert. Keine Administrator-Freigabe erforderlich.";
  }
});
/* === Supabase Admin Authentication === */
const SUPABASE_URL = "https://uwdwavstozljufbwgftr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_fLz1lc9XRv1DWN1H3Vrz7w_YwL5sjio";
const ADMIN_EMAIL = "ubixdubi@gmail.com";

const adminLoginOpen = document.querySelector("#admin-login-open");
const adminLoginClose = document.querySelector("#admin-login-close");
const adminLoginModal = document.querySelector("#admin-login-modal");
const adminLoginStatus = document.querySelector("#admin-login-status");
const adminLogoutStatus = document.querySelector("#admin-logout-status");
const adminGoogleBtn = document.querySelector("#admin-google-btn");
const adminLogoutBtn = document.querySelector("#admin-logout-btn");
const adminLoginView = document.querySelector("#admin-login-view");
const adminLoggedInView = document.querySelector("#admin-logged-in-view");
const adminUserInfo = document.querySelector("#admin-user-info");
const adminNotification = document.querySelector("#admin-notification");

// Guard: if Supabase SDK failed to load, keep admin disabled without breaking the rest of the site
let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

function setAdminVisibility() {
  // Admin notification icon stays hidden; login status is shown inside the modal
  if (adminNotification) adminNotification.hidden = true;
}

function updateAdminUI(session) {
  if (session && session.user && session.user.email && session.user.email.toLowerCase() === ADMIN_EMAIL) {
    sessionStorage.setItem("eifeler-admin", "true");
    setAdminVisibility();
    if (adminLoginView) adminLoginView.hidden = true;
    if (adminLoggedInView) adminLoggedInView.hidden = false;
    if (adminUserInfo) adminUserInfo.textContent = "Angemeldet als: " + session.user.email;
    if (adminLoginStatus) adminLoginStatus.textContent = "";
  } else {
    sessionStorage.removeItem("eifeler-admin");
    setAdminVisibility();
    if (adminLoginView) adminLoginView.hidden = false;
    if (adminLoggedInView) adminLoggedInView.hidden = true;
    if (adminUserInfo) adminUserInfo.textContent = "";
    // If a non-admin account is logged in, sign them out and inform
    if (session && session.user && session.user.email && session.user.email.toLowerCase() !== ADMIN_EMAIL) {
      if (adminLoginStatus) adminLoginStatus.textContent = "Dieses Konto ist kein Administrator. Abmeldung...";
      if (supabaseClient) supabaseClient.auth.signOut();
    }
  }
}

if (adminLoginOpen) {
  adminLoginOpen.addEventListener("click", () => {
    adminLoginModal.hidden = false;
    adminLoginStatus.textContent = "";
    adminLogoutStatus.textContent = "";
  });
}
if (adminLoginClose) {
  adminLoginClose.addEventListener("click", () => { adminLoginModal.hidden = true; });
}
if (adminLoginModal) {
  adminLoginModal.addEventListener("click", event => {
    if (event.target === adminLoginModal) adminLoginModal.hidden = true;
  });
}

if (adminGoogleBtn && supabaseClient) {
  adminGoogleBtn.addEventListener("click", () => {
    adminLoginStatus.textContent = "Weiterleitung zu Google...";
    const redirectTo = window.location.origin + window.location.pathname.replace(/index\.html$/, "");
    supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectTo }
    }).then(({ error }) => {
      if (error) {
        adminLoginStatus.textContent = "Anmeldung fehlgeschlagen: " + (error.message || "unbekannter Fehler");
      }
    });
  });
}

if (adminLogoutBtn && supabaseClient) {
  adminLogoutBtn.addEventListener("click", () => {
    supabaseClient.auth.signOut().then(({ error }) => {
      if (error) {
        adminLogoutStatus.textContent = "Abmeldung fehlgeschlagen.";
      } else {
        sessionStorage.removeItem("eifeler-admin");
        updateAdminUI(null);
        adminLogoutStatus.textContent = "Erfolgreich abgemeldet.";
      }
    });
  });
}

// Check session on page load
if (supabaseClient) {
  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    updateAdminUI(session);
  });

  // Listen for auth state changes
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    updateAdminUI(session);
  });
}

setAdminVisibility();
document.querySelectorAll("[data-i18n]").forEach(element => {
  if (translations.de[element.dataset.i18n]) element.innerHTML = translations.de[element.dataset.i18n];
});
document.querySelectorAll("[data-menu-i18n]").forEach(element => {
  const menuText = menuTranslations.de[element.dataset.menuI18n];
  if (menuText) element.innerHTML = menuText;
});

/*
 * The original static page was written through a broken legacy encoding
 * pipeline. Repair only the damaged display tokens at runtime.
 * All replacements are ASCII source text or Unicode escapes.
 */
function repairStaticText() {
  const replacements = [
    ["Men ", "Men\u00fc"],
    ["Men  ", "Men\u00fc"],
    ["Men y", "Men\u00fc"],
    ["men  ", "men\u00fc"],
    ["T rk", "T\u00fcrk"],
    ["t rk", "t\u00fcrk"],
    ["D  ner", "D\u00f6ner"],
    ["d  ner", "d\u00f6ner"],
    ["D&#246;ner", "D\u00f6ner"],
    ["d&#246;ner", "d\u00f6ner"],
    ["K se", "K\u00e4se"],
    ["Gefl g", "Gefl\u00fcg"],
    ["Weichk se", "Weichk\u00e4se"],
    ["Gem se", "Gem\u00fcse"],
    ["J ger", "J\u00e4ger"],
    ["  ber", " \u00fcber"],
    ["g r", "ger"],
    ["Brotw rfeln", "Brotw\u00fcrfeln"],
    ["i ecek", "i\u00e7ecek"],
    ["i ecek", "i\u00e7ecek"],
    ["Puan  n  z", "Puan\u0131n\u0131z"],
    ["y netici", "y\u00f6netici"],
    ["Y netici", "Y\u00f6netici"],
    ["giri i", "giri\u015fi"],
    ["Giri  ", "Giri\u015f "],
    [" leti im", "\u0130leti\u015fim"],
    ["  leti im", "\u0130leti\u015fim"],
    ["  eriden", "\u0130\u00e7eriden"],
    ["Bizi de xerlendirin", "Bizi de\u011ferlendirin"],
    ["Hik yemiz", "Hik\u00e2yemiz"],
    ["K z ate i", "K\u00f6z ate\u015fi"],
    ["ate  yan  yor", "ate\u015f yan\u0131yor"],
    ["s  cak", "s\u0131cak"],
    ["S  cak", "S\u0131cak"],
    ["ate in", "ate\u015fin"],
    ["ate te", "ate\u015fte"],
    ["haz  r", "haz\u0131r"],
    ["g nl k", "g\u00fcnl\u00fck"],
    ["g n", "g\u00fcn"],
    ["ula   m", "ula\u015f\u0131m"],
    ["kar   lan", "kar\u015f\u0131lan"],
    ["keyfi b l", "keyfi b\u00f6l"],
    ["Monschau?", "Monschau\u2019"],
    ["  a ", " \u20ac "],
    ["   a ", " \u20ac "],
    ["  ?  ", " \u00b7 "],
    ["   ?", " \u2197"],
    ["    ?", " \u2197"]
  ];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    let value = node.nodeValue;
    replacements.forEach(([from, to]) => { value = value.split(from).join(to); });
    node.nodeValue = value;
  });
  document.title = "Eifeler Kebaphaus | D\u00f6ner & Izgara in Monschau";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = "Eifeler Kebaphaus in Monschau \u2013 warmer D\u00f6ner, Grill und ein erfahrenes Team erwarten Sie. 25 Parkpl\u00e4tze, bequeme Anreise und herzlicher Service.";
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.content = "Vom Glutfeuer auf Ihren Tisch: D\u00f6ner, Grill und echte Gastfreundschaft.";
}
repairStaticText();


/* === Scenery section: Monschau/Eifel landscapes from Wikimedia Commons === */
(function() {
  var grid = document.querySelector("#scenery-grid");
  var status = document.querySelector("#scenery-status");
  var dateEl = document.querySelector("#scenery-date");
  if (!grid || !status) return;

  var now = new Date();
  var dayOfWeek = now.getDay();
  var slot;
  if (dayOfWeek === 1 || dayOfWeek === 2) slot = 0;
  else if (dayOfWeek === 3 || dayOfWeek === 4) slot = 1;
  else slot = 2;

  var startOfYear = new Date(now.getFullYear(), 0, 1);
  var week = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);

  var dateStr = now.toLocaleDateString("de-DE");
  dateEl.textContent = "\u25cf WOCHE " + week + " \u00b7 " + dateStr;

  var searchTerms = ["Monschau", "Eifel Monschau", "Rur Monschau", "Eifel landscape", "Monschau Germany"];
  var searchTerm = searchTerms[slot % searchTerms.length];
  var offset = slot * 5 + (week % 4) * 10;

  var url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
    encodeURIComponent(searchTerm) +
    "&gsrnamespace=6&gsrlimit=15&gsroffset=" + offset +
    "&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1200&format=json&origin=*";

  status.textContent = "Landschaftsbilder werden geladen...";

  function renderEmpty(reason) {
    var msg = document.createElement("p");
    msg.className = "scenery-empty";
    msg.textContent = reason;
    grid.replaceChildren(msg);
    status.textContent = "";
  }

  function createCard(page, index) {
    var info = page.imageinfo[0];
    var meta = info.extmetadata || {};
    var license = meta.LicenseShortName ? meta.LicenseShortName.value : "Lizenz";
    var artist = (meta.Artist ? meta.Artist.value : meta.Credit ? meta.Credit.value : "Unbekannt").replace(/<[^>]+>/g, "").trim();
    var title = page.title.replace(/^File:/, "").replace(/\.[^.]+$/, "").replace(/_/g, " ");
    var thumbUrl = info.thumburl || info.url;
    var fullUrl = info.url;

    var card = document.createElement("button");
    card.type = "button";
    card.className = "scenery-card";
    card.dataset.lightbox = fullUrl;
    card.dataset.alt = title;

    var img = document.createElement("img");
    img.loading = index < 2 ? "eager" : "lazy";
    img.src = thumbUrl;
    img.alt = title;

    var badge = document.createElement("span");
    badge.className = "scenery-badge";
    badge.textContent = license;

    var overlay = document.createElement("div");
    overlay.className = "scenery-overlay";
    var strong = document.createElement("strong");
    strong.textContent = title.length > 50 ? title.substring(0, 47) + "..." : title;
    var small = document.createElement("small");
    small.textContent = artist + " \u00b7 " + license;
    overlay.appendChild(strong);
    overlay.appendChild(small);

    card.appendChild(img);
    card.appendChild(badge);
    card.appendChild(overlay);

    card.addEventListener("click", function() {
      var lb = document.querySelector("#lightbox");
      var lbImg = document.querySelector("#lightboxImage");
      lbImg.src = fullUrl;
      lbImg.alt = title;
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      document.querySelector(".lightbox-close").focus();
    });

    return card;
  }

  fetch(url).then(function(r) {
    if (!r.ok) throw new Error("API request failed");
    return r.json();
  }).then(function(data) {
    var pages = Object.values(data.query ? data.query.pages || {} : {}).filter(function(page) {
      var meta = (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].extmetadata) || {};
      var lic = (meta.LicenseShortName ? meta.LicenseShortName.value : "").toLowerCase();
      return /public domain|cc0|cc by|cc-by|cc by-sa|cc-by-sa/.test(lic) && (meta.Artist || meta.Credit);
    });

    if (pages.length < 5) throw new Error("Not enough images");

    grid.replaceChildren();
    pages.slice(0, 5).forEach(function(page, i) {
      grid.appendChild(createCard(page, i));
    });

    status.textContent = "";
  }).catch(function(err) {
    renderEmpty("Landschaftsbilder k\u00f6nnen derzeit nicht angezeigt werden. " + err.message);
  });
})();

/* === Heart symbol click handler === */
(function() {
  var heart = document.querySelector(".heart-symbol");
  if (!heart) return;
  var original = heart.textContent;
  var revealed = false;
  heart.addEventListener("click", function() {
    if (revealed) {
      heart.textContent = original;
      revealed = false;
    } else {
      heart.textContent = "UBEYDULLAH DO\u011eAN";
      revealed = true;
    }
  });
})();
