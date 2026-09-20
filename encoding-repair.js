(function () {
  "use strict";

  var tr = {
    navMenu: "Men\u00fc",
    navGallery: "Galeri",
    navVisit: "Bizi bulun",
    navContact: "\u0130leti\u015fim",
    call: "Ara",
    eyebrow: "Monschau, Almanya \u00b7 K\u00f6z ate\u015finden sofran\u0131za",
    heroTitle: "Ger\u00e7ek d\u00f6ner.<br><em>S\u0131cak misafirperverlik.</em>",
    heroCopy: "Eifel'in kalbinde, g\u00fcnl\u00fck haz\u0131rlanan malzemeler ve ate\u015fin ba\u015f\u0131ndaki deneyimli ekiple unutulmaz bir kebap molas\u0131.",
    viewMenu: "Men\u00fcy\u00fc ke\u015ffet \u2197",
    parking: "Park yeri",
    team: "Deneyimli ekip",
    fresh: "Her g\u00fcn taze \u00b7 Ate\u015fte haz\u0131rlan\u0131r",
    storyKicker: "Hik\u00e2yemiz",
    storyTitle: "Eifel manzaras\u0131,<br><em>Anadolu ate\u015fi.</em>",
    storyCopy: "Eifeler Kebaphaus, Monschau'da iyi yeme\u011fin ve iyi kar\u015f\u0131lanman\u0131n adresi.",
    discover: "Monschau'yu ke\u015ffet \u2197",
    feature1Title: "K\u00f6z ate\u015fi",
    feature1Copy: "D\u00f6ner ve \u0131zgarada ate\u015fin ger\u00e7ek aromas\u0131.",
    feature2Title: "Deneyimli eller",
    feature2Copy: "Her sipari\u015fte ayn\u0131 \u00f6zen, her ziyarette ayn\u0131 g\u00fcl\u00fcmseme.",
    feature3Title: "Kolay ula\u015f\u0131m",
    feature3Copy: "25 park yeri ile yolculu\u011funuzun keyfi b\u00f6l\u00fcnmesin.",
    menuKicker: "Men\u00fcm\u00fcz",
    menuTitle: "Bir bak\u0131\u015fta <em>lezzet.</em>",
    menuCopy: "Monschau'da d\u00f6ner, kebap, \u0131zgara, pizza, lahmacun, pide, schnitzel, falafel, salata ve i\u00e7ecek se\u00e7enekleri.",
    galleryKicker: "\u0130\u00e7eriden",
    galleryTitle: "Masaya <em>buyurun.</em>",
    galleryCopy: "Ate\u015fin s\u0131cakl\u0131\u011f\u0131, samimi bir masa ve Monschau'da k\u0131sa bir lezzet molas\u0131.",
    visitKicker: "Bizi bulun",
    visitTitle: "Monschau'da <em>ate\u015f yan\u0131yor.</em>",
    visitCopy: "Eifel gezinizin en lezzetli dura\u011f\u0131na bekliyoruz.",
    directions: "Google Maps'te yol tarifi \u2197",
    radioKicker: "Sakin bir e\u015flik",
    radioTitle: "Alman radyosu,<br><em>yava\u015f\u00e7a.</em>",
    radioCopy: "Ses otomatik ba\u015flamaz. Resmi oynat\u0131c\u0131 ba\u011flant\u0131s\u0131n\u0131 a\u00e7\u0131n.",
    footerNote: "D\u00f6ner, \u0131zgara ve s\u0131cak bir ho\u015f geldiniz.",
    contactTitle: "\u0130leti\u015fim",
    hoursTitle: "Bizi de\u011ferlendirin"
  };

  Object.keys(tr).forEach(function (key) {
    document.querySelectorAll('[data-i18n="' + key + '"]').forEach(function (element) {
      element.innerHTML = tr[key];
    });
  });

  var contentLocales = {
    nl: {
      navMenu: "Menu", navGallery: "Galerij", navVisit: "Vind ons", navContact: "Contact", call: "Bellen",
      eyebrow: "Monschau, Duitsland \u00b7 Van het vuur op uw bord", heroTitle: "Echte d\u00f6ner.<br><em>Warme gastvrijheid.</em>",
      heroCopy: "In het hart van de Eifel: verse ingredi\u00ebnten en ervaren handen bij het vuur.",
      viewMenu: "Bekijk het menu \u2197", parking: "Parkeerplaatsen", team: "Ervaren team", fresh: "Elke dag vers \u00b7 Van het vuur",
      storyKicker: "Ons verhaal", menuKicker: "Ons menu", visitKicker: "Vind ons", radioKicker: "Rustige begeleiding", contactTitle: "Contact"
    },
    lb: {
      navMenu: "Menu", navGallery: "Galerie", navVisit: "Fannt eis", navContact: "Kontakt", call: "Uruff",
      eyebrow: "Monschau, D\u00e4itschland \u00b7 Vum Feier op den Teller", heroTitle: "Echte D\u00f6ner.<br><em>W\u00e4rm Gaaschtfr\u00ebndlechkeet.</em>",
      heroCopy: "Am H\u00e4erz vun der Eifel: fr\u00ebsch Zutaten an en erfuerene Service beim Feier.",
      viewMenu: "Menu entdecken \u2197", parking: "Parkplazen", team: "Erfueren Ekipp", fresh: "All Dag fr\u00ebsch \u00b7 Vum Feier",
      storyKicker: "Eis Geschicht", menuKicker: "Eise Menu", visitKicker: "Fannt eis", radioKicker: "Roueg Begleedung", contactTitle: "Kontakt"
    },
    pl: {
      navMenu: "Menu", navGallery: "Galeria", navVisit: "Znajd\u017a nas", navContact: "Kontakt", call: "Zadzwo\u0144",
      eyebrow: "Monschau, Niemcy \u00b7 Z ognia na talerz", heroTitle: "Prawdziwy d\u00f6ner.<br><em>Ciep\u0142a go\u015bcinno\u015b\u0107.</em>",
      heroCopy: "W sercu Eifel: \u015bwie\u017ce sk\u0142adniki i do\u015bwiadczony zesp\u00f3\u0142 przy ogniu.",
      viewMenu: "Zobacz menu \u2197", parking: "Miejsca parkingowe", team: "Do\u015bwiadczony zesp\u00f3\u0142", fresh: "\u015awie\u017ce ka\u017cdego dnia \u00b7 Z ognia",
      storyKicker: "Nasza historia", menuKicker: "Nasze menu", visitKicker: "Znajd\u017a nas", radioKicker: "Spokojna muzyka", contactTitle: "Kontakt"
    },
    da: {
      navMenu: "Menu", navGallery: "Galleri", navVisit: "Find os", navContact: "Kontakt", call: "Ring",
      eyebrow: "Monschau, Tyskland \u00b7 Fra ild til bord", heroTitle: "\u00c6gte d\u00f6ner.<br><em>Varm g\u00e6stfrihed.</em>",
      heroCopy: "I hjertet af Eifel: friske r\u00e5varer og et erfarent hold ved grillen.",
      viewMenu: "Se menuen \u2197", parking: "Parkeringspladser", team: "Erfarent hold", fresh: "Frisk hver dag \u00b7 Fra ilden",
      storyKicker: "Vores historie", menuKicker: "Vores menu", visitKicker: "Find os", radioKicker: "Rolig ledsagelse", contactTitle: "Kontakt"
    },
    cs: {
      navMenu: "Menu", navGallery: "Galerie", navVisit: "Najdete n\u00e1s", navContact: "Kontakt", call: "Zavolat",
      eyebrow: "Monschau, N\u011bmecko \u00b7 Z ohn\u011b na tal\u00ed\u0159", heroTitle: "Prav\u00fd d\u00f6ner.<br><em>V\u0159el\u00e1 pohostinnost.</em>",
      heroCopy: "V srdci Eifelu: \u010derstv\u00e9 suroviny a zku\u0161en\u00fd t\u00fdm u ohn\u011b.",
      viewMenu: "Prohl\u00e9dnout menu \u2197", parking: "Parkovac\u00ed m\u00edsta", team: "Zku\u0161en\u00fd t\u00fdm", fresh: "\u010cerstv\u00e9 ka\u017ed\u00fd den \u00b7 Z ohn\u011b",
      storyKicker: "N\u00e1\u0161 p\u0159\u00edb\u011bh", menuKicker: "Na\u0161e menu", visitKicker: "Najdete n\u00e1s", radioKicker: "Klidn\u00fd doprovod", contactTitle: "Kontakt"
    },
    it: {
      navMenu: "Menu", navGallery: "Galleria", navVisit: "Dove siamo", navContact: "Contatti", call: "Chiama",
      eyebrow: "Monschau, Germania \u00b7 Dal fuoco alla tavola", heroTitle: "D\u00f6ner autentico.<br><em>Calda ospitalit\u00e0.</em>",
      heroCopy: "Nel cuore dell'Eifel: ingredienti freschi e mani esperte accanto al fuoco.",
      viewMenu: "Scopri il menu \u2197", parking: "Posti auto", team: "Staff esperto", fresh: "Fresco ogni giorno \u00b7 Dal fuoco",
      storyKicker: "La nostra storia", menuKicker: "Il nostro menu", visitKicker: "Dove siamo", radioKicker: "Compagnia tranquilla", contactTitle: "Contatti"
    },
    es: {
      navMenu: "Men\u00fa", navGallery: "Galer\u00eda", navVisit: "Encu\u00e9ntranos", navContact: "Contacto", call: "Llamar",
      eyebrow: "Monschau, Alemania \u00b7 Del fuego a la mesa", heroTitle: "D\u00f6ner aut\u00e9ntico.<br><em>Hospitalidad c\u00e1lida.</em>",
      heroCopy: "En el coraz\u00f3n de Eifel: ingredientes frescos y un equipo experto junto al fuego.",
      viewMenu: "Descubre el men\u00fa \u2197", parking: "Plazas de aparcamiento", team: "Equipo experto", fresh: "Fresco cada d\u00eda \u00b7 Del fuego",
      storyKicker: "Nuestra historia", menuKicker: "Nuestro men\u00fa", visitKicker: "Encu\u00e9ntranos", radioKicker: "Compa\u00f1\u00eda tranquila", contactTitle: "Contacto"
    }
  };
  function applyContentLanguage(lang) {
    var copy = contentLocales[lang];
    if (!copy) return;
    Object.keys(copy).forEach(function (key) {
      document.querySelectorAll('[data-i18n="' + key + '"]').forEach(function (element) {
        element.innerHTML = copy[key];
      });
    });
  }

  var labels = {
    tr: "T\u00fcrk\u00e7e",
    de: "Deutsch",
    en: "English",
    fr: "Fran\u00e7ais",
    nl: "Nederlands",
    lb: "L\u00ebtzebuergesch",
    pl: "Polski",
    da: "Dansk",
    cs: "\u010ce\u0161tina",
    it: "Italiano",
    es: "Espa\u00f1ol",
    ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
    ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439"
  };
  Object.keys(labels).forEach(function (lang) {
    var button = document.querySelector('[data-lang="' + lang + '"]');
    if (button) button.textContent = labels[lang];
  });

  var fixed = {
    ".skip-link": "\u0130\u00e7eri\u011fe atla / Zum Inhalt",
    ".language-switcher": null,
    ".menu-search label": "Men\u00fcde ara",
    ".menu-search-input": null,
    ".section-kicker": null,
    ".admin-entry span": "Y\u00f6netici giri\u015fi",
    "#admin-login-open": "Giri\u015f yap",
    ".mobile-cta a:first-child": "Yol tarifi al",
    ".mobile-cta a:last-child": "Hemen ara",
    ".menu-widget-label": "EIFELER KEBAPHAUS \u00b7 MEN\u00dc",
    ".menu-search-clear": "\u00d7",
    ".menu-disclaimer": "Men\u00fc se\u00e7imleri ve fiyatlar Euro cinsindendir. Alerjenleri ve katk\u0131 maddelerini ekibimize sorabilirsiniz.",
    ".radio-player small": "Resmi harici oynat\u0131c\u0131 \u00b7 otomatik ba\u015flamaz",
    ".radio-safety": "Telif ve yay\u0131n haklar\u0131 i\u00e7in g\u00f6m\u00fcl\u00fc stream kullan\u0131lmaz. Dinlemek i\u00e7in yay\u0131nc\u0131n\u0131n resmi sitesini a\u00e7\u0131n.",
    ".radio-player .button": "Resmi radyoyu a\u00e7 \u2197",
    ".reviews-intro h2": "Puan\u0131n\u0131z\u0131 <em>payla\u015f\u0131n.</em>",
    ".reviews-intro p": "Y\u0131ld\u0131z puan\u0131n\u0131z i\u00e7in y\u00f6netici onay\u0131 gerekmez. Yaz\u0131l\u0131 yorumlar foto\u011frafla birlikte ayr\u0131 yorum sayfas\u0131nda g\u00f6nderilir ve yay\u0131nlanmadan \u00f6nce y\u00f6netici taraf\u0131ndan incelenir.",
    ".reviews-note": "Puanlama an\u0131nda kaydedilir; yorum yay\u0131nlama yetkisi y\u00f6netici kontrol\u00fcndedir.",
    ".reviews-intro .button": "Yorum sayfas\u0131n\u0131 a\u00e7 \u2197",
    ".review-form-heading strong": "Lezzet puan\u0131",
    ".review-form-heading span": "PREM\u0130UM M\u0130SAF\u0130R K\u00d6\u015eES\u0130",
    ".rating-field legend": "Puan\u0131n\u0131z",
    ".review-form > .button": "Puan\u0131 kaydet \u2197",
    "#rating-status": "Puanlama i\u00e7in y\u00f6netici izni gerekmez.",
    ".scenic-link": "Manzara k\u00f6\u015fesi \u2197",
    ".footer-bottom span": "\u00a9 2026 Eifeler Kebaphaus",
    ".footer-bottom a": "Monschau turizmi \u2197"
  };
  Object.keys(fixed).forEach(function (selector) {
    if (fixed[selector] === null) return;
    var element = document.querySelector(selector);
    if (element) element.textContent = fixed[selector];
  });
  var reviewsHeading = document.querySelector(".reviews-intro h2");
  if (reviewsHeading) reviewsHeading.innerHTML = "Puan\u0131n\u0131z\u0131 <em>payla\u015f\u0131n.</em>";
  var footerHeadings = document.querySelectorAll("footer .footer-grid > div > h3");
  if (footerHeadings[1]) footerHeadings[1].textContent = "\u00c7al\u0131\u015fma saatleri";
  var searchInput = document.querySelector("#menu-search-input");
  if (searchInput) searchInput.placeholder = "Pizza, d\u00f6ner, falafel...";
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
    tr: {
      tabPizza: "Pizza", tabDoner: "D\u00f6ner", tabSchnitzel: "Schnitzel", tabTurkish: "T\u00fcrk pizzalar\u0131", tabMore: "Di\u011fer",
      pizzaTitle: "\u0130talyan pizzalar\u0131", pizzaSub: "29 cm pizzalar: domates sosu, peynir ve kekik",
      donerTitle: "Evin spesiyalleri \u00b7 D\u00f6ner", donerSub: "Dana veya tavuk eti",
      schnitzelTitle: "Schnitzel yemekleri", schnitzelSub: "Salata ve patates k\u0131zartmas\u0131 ile",
      turkishTitle: "T\u00fcrk pizzalar\u0131 ve pide", turkishSub: "F\u0131r\u0131ndan taze",
      moreTitle: "Men\u00fcm\u00fczden daha fazlas\u0131", moreSub: "Vejetaryen, salata ve i\u00e7ecekler",
      disclaimer: "Men\u00fc se\u00e7imleri ve fiyatlar Euro cinsindendir."
    },
    de: {
      tabPizza: "Pizza", tabDoner: "Drehspie\u00df", tabSchnitzel: "Schnitzel", tabTurkish: "T\u00fcrkische Pizza", tabMore: "Mehr",
      pizzaTitle: "Italienische Pizza", pizzaSub: "Alle Pizzen 29 cm mit Tomatensauce, K\u00e4se und Oregano",
      donerTitle: "Spezialit\u00e4ten des Hauses \u00b7 Drehspie\u00df", donerSub: "Kalb- oder H\u00e4hnchenfleisch",
      schnitzelTitle: "Schnitzelgerichte", schnitzelSub: "Mit Salat und Pommes",
      turkishTitle: "T\u00fcrkische Pizza und Pide", turkishSub: "Frisch aus dem Ofen",
      moreTitle: "Mehr aus unserer Karte", moreSub: "Vegetarisches, Salate und Getr\u00e4nke",
      disclaimer: "Ausz\u00fcge aus der Speisekarte. Alle Preise in Euro."
    },
    en: {
      tabPizza: "Pizza", tabDoner: "Doner", tabSchnitzel: "Schnitzel", tabTurkish: "Turkish pizza", tabMore: "More",
      pizzaTitle: "Italian pizza", pizzaSub: "All pizzas 29 cm with tomato sauce, cheese and oregano",
      donerTitle: "House specialties \u00b7 doner", donerSub: "Veal or chicken",
      schnitzelTitle: "Schnitzel dishes", schnitzelSub: "Served with salad and fries",
      turkishTitle: "Turkish pizza and pide", turkishSub: "Fresh from the oven",
      moreTitle: "More from our menu", moreSub: "Vegetarian dishes, salads and drinks",
      disclaimer: "Menu selections and prices are in euros."
    },
    fr: {
      tabPizza: "Pizza", tabDoner: "Doner", tabSchnitzel: "Schnitzel", tabTurkish: "Pizza turque", tabMore: "Plus",
      pizzaTitle: "Pizza italienne", pizzaSub: "Pizzas de 29 cm avec sauce tomate, fromage et origan",
      donerTitle: "Sp\u00e9cialit\u00e9s de la maison \u00b7 doner", donerSub: "Veau ou poulet",
      schnitzelTitle: "Plats de schnitzel", schnitzelSub: "Avec salade et frites",
      turkishTitle: "Pizza turque et pide", turkishSub: "Frais du four",
      moreTitle: "Plus de notre carte", moreSub: "V\u00e9g\u00e9tarien, salades et boissons",
      disclaimer: "Les choix et les prix sont indiqu\u00e9s en euros."
    },
    nl: {
      tabPizza: "Pizza", tabDoner: "D\u00f6ner", tabSchnitzel: "Schnitzel", tabTurkish: "Turkse pizza", tabMore: "Meer",
      pizzaTitle: "Italiaanse pizza", pizzaSub: "Pizza van 29 cm met tomatensaus, kaas en oregano",
      donerTitle: "Specialiteiten van het huis \u00b7 d\u00f6ner", donerSub: "Kalf of kip",
      schnitzelTitle: "Schnitzelgerechten", schnitzelSub: "Met salade en friet",
      turkishTitle: "Turkse pizza en pide", turkishSub: "Vers uit de oven",
      moreTitle: "Meer van onze kaart", moreSub: "Vegetarisch, salades en drankjes",
      disclaimer: "Menu en prijzen zijn in euro."
    },
    lb: {
      tabPizza: "Pizza", tabDoner: "D\u00f6ner", tabSchnitzel: "Schnitzel", tabTurkish: "Tierkesch Pizza", tabMore: "M\u00e9i",
      pizzaTitle: "Italienesch Pizza", pizzaSub: "Pizza mat Tomatenzooss, K\u00e9is an Oregano",
      donerTitle: "Spezialit\u00e9ite vum Haus \u00b7 D\u00f6ner", donerSub: "Kallef oder Poulet",
      schnitzelTitle: "Schnitzel-Platen", schnitzelSub: "Mat Zalot a Fritten",
      turkishTitle: "Tierkesch Pizza a Pide", turkishSub: "Fr\u00ebsch aus dem Uewen",
      moreTitle: "M\u00e9i aus eiser Kaart", moreSub: "Vegetaresch, Zaloten a Gedr\u00e9nks",
      disclaimer: "Auswiel a Pr\u00e4isser sinn an Euro."
    },
    pl: {
      tabPizza: "Pizza", tabDoner: "D\u00f6ner", tabSchnitzel: "Schnitzel", tabTurkish: "Pizza turecka", tabMore: "Wi\u0119cej",
      pizzaTitle: "Pizza w\u0142oska", pizzaSub: "Pizza 29 cm z sosem pomidorowym, serem i oregano",
      donerTitle: "Specjalno\u015bci domu \u00b7 d\u00f6ner", donerSub: "Ciel\u0119cina lub kurczak",
      schnitzelTitle: "Dania ze sznyclem", schnitzelSub: "Z sa\u0142atk\u0105 i frytkami",
      turkishTitle: "Pizza turecka i pide", turkishSub: "\u015awie\u017co z pieca",
      moreTitle: "Wi\u0119cej z naszego menu", moreSub: "Dania wegetaria\u0144skie, sa\u0142atki i napoje",
      disclaimer: "Wyb\u00f3r da\u0144 i ceny podano w euro."
    },
    da: {
      tabPizza: "Pizza", tabDoner: "D\u00f6ner", tabSchnitzel: "Schnitzel", tabTurkish: "Tyrkisk pizza", tabMore: "Mere",
      pizzaTitle: "Italiensk pizza", pizzaSub: "Alle pizzaer 29 cm med tomatsauce, ost og oregano",
      donerTitle: "Husets specialiteter \u00b7 d\u00f6ner", donerSub: "Kalv eller kylling",
      schnitzelTitle: "Schnitzelretter", schnitzelSub: "Med salat og pommes frites",
      turkishTitle: "Tyrkisk pizza og pide", turkishSub: "Frisk fra ovnen",
      moreTitle: "Mere fra vores menu", moreSub: "Vegetarisk, salater og drikkevarer",
      disclaimer: "Menuvalg og priser er i euro."
    },
    cs: {
      tabPizza: "Pizza", tabDoner: "D\u00f6ner", tabSchnitzel: "Schnitzel", tabTurkish: "Tureck\u00e1 pizza", tabMore: "Dal\u0161\u00ed",
      pizzaTitle: "Italsk\u00e1 pizza", pizzaSub: "Pizza 29 cm s raj\u010datovou om\u00e1\u010dkou, s\u00fdrem a oreganem",
      donerTitle: "Speciality podniku \u00b7 d\u00f6ner", donerSub: "Telec\u00ed nebo ku\u0159ec\u00ed",
      schnitzelTitle: "Schnitzel pokrmy", schnitzelSub: "Se sal\u00e1tem a hranolky",
      turkishTitle: "Tureck\u00e1 pizza a pide", turkishSub: "\u010cerstv\u00e9 z trouby",
      moreTitle: "Dal\u0161\u00ed z na\u0161eho menu", moreSub: "Vegetari\u00e1nsk\u00e9, sal\u00e1ty a n\u00e1poje",
      disclaimer: "V\u00fdb\u011br j\u00eddel a ceny jsou v eurech."
    },
    it: {
      tabPizza: "Pizza", tabDoner: "D\u00f6ner", tabSchnitzel: "Schnitzel", tabTurkish: "Pizza turca", tabMore: "Altro",
      pizzaTitle: "Pizza italiana", pizzaSub: "Pizze da 29 cm con salsa di pomodoro, formaggio e origano",
      donerTitle: "Specialit\u00e0 della casa \u00b7 d\u00f6ner", donerSub: "Vitello o pollo",
      schnitzelTitle: "Piatti di schnitzel", schnitzelSub: "Con insalata e patatine",
      turkishTitle: "Pizza turca e pide", turkishSub: "Appena sfornato",
      moreTitle: "Altro dal nostro menu", moreSub: "Vegetariano, insalate e bevande",
      disclaimer: "Selezioni e prezzi del menu sono in euro."
    },
    es: {
      tabPizza: "Pizza", tabDoner: "D\u00f6ner", tabSchnitzel: "Schnitzel", tabTurkish: "Pizza turca", tabMore: "M\u00e1s",
      pizzaTitle: "Pizza italiana", pizzaSub: "Pizzas de 29 cm con salsa de tomate, queso y or\u00e9gano",
      donerTitle: "Especialidades de la casa \u00b7 d\u00f6ner", donerSub: "Ternera o pollo",
      schnitzelTitle: "Platos de schnitzel", schnitzelSub: "Con ensalada y patatas",
      turkishTitle: "Pizza turca y pide", turkishSub: "Reci\u00e9n salido del horno",
      moreTitle: "M\u00e1s de nuestra carta", moreSub: "Vegetariano, ensaladas y bebidas",
      disclaimer: "La selecci\u00f3n y los precios est\u00e1n en euros."
    },
    ar: {
      tabPizza: "\u0628\u064a\u062a\u0632\u0627", tabDoner: "\u062f\u0648\u0646\u0631", tabSchnitzel: "\u0634\u0646\u064a\u062a\u0632\u0644", tabTurkish: "\u0628\u064a\u062a\u0632\u0627 \u062a\u0631\u0643\u064a\u0629", tabMore: "\u0627\u0644\u0645\u0632\u064a\u062f",
      pizzaTitle: "\u0628\u064a\u062a\u0632\u0627 \u0625\u064a\u0637\u0627\u0644\u064a\u0629", pizzaSub: "\u0628\u064a\u062a\u0632\u0627 29 \u0633\u0645 \u0645\u0639 \u0635\u0644\u0635\u0629 \u0627\u0644\u0637\u0645\u0627\u0637\u0645 \u0648\u0627\u0644\u062c\u0628\u0646 \u0648\u0627\u0644\u0623\u0648\u0631\u064a\u063a\u0627\u0646\u0648",
      donerTitle: "\u062e\u0635\u0648\u0635\u064a\u0627\u062a \u0627\u0644\u0645\u0637\u0639\u0645 \u00b7 \u062f\u0648\u0646\u0631", donerSub: "\u0644\u062d\u0645 \u0639\u062c\u0644 \u0623\u0648 \u062f\u062c\u0627\u062c",
      schnitzelTitle: "\u0623\u0637\u0628\u0627\u0642 \u0634\u0646\u064a\u062a\u0632\u0644", schnitzelSub: "\u0645\u0639 \u0633\u0644\u0637\u0629 \u0648\u0628\u0637\u0627\u0637\u0633",
      turkishTitle: "\u0628\u064a\u062a\u0632\u0627 \u062a\u0631\u0643\u064a\u0629 \u0648\u0628\u064a\u062f\u064a", turkishSub: "\u0637\u0627\u0632\u062c\u0629 \u0645\u0646 \u0627\u0644\u0641\u0631\u0646",
      moreTitle: "\u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0642\u0627\u0626\u0645\u062a\u0646\u0627", moreSub: "\u0646\u0628\u0627\u062a\u064a\u060c \u0633\u0644\u0637\u0627\u062a \u0648\u0645\u0634\u0631\u0648\u0628\u0627\u062a",
      disclaimer: "\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u064a\u0648\u0631\u0648."
    },
    ru: {
      tabPizza: "\u041f\u0438\u0446\u0446\u0430", tabDoner: "\u0414\u043e\u043d\u0435\u0440", tabSchnitzel: "\u0428\u043d\u0438\u0446\u0435\u043b\u044c", tabTurkish: "\u0422\u0443\u0440\u0435\u0446\u043a\u0430\u044f \u043f\u0438\u0446\u0446\u0430", tabMore: "\u0415\u0449\u0451",
      pizzaTitle: "\u0418\u0442\u0430\u043b\u044c\u044f\u043d\u0441\u043a\u0430\u044f \u043f\u0438\u0446\u0446\u0430", pizzaSub: "\u041f\u0438\u0446\u0446\u0430 29 \u0441\u043c \u0441 \u0442\u043e\u043c\u0430\u0442\u043d\u044b\u043c \u0441\u043e\u0443\u0441\u043e\u043c, \u0441\u044b\u0440\u043e\u043c \u0438 \u043e\u0440\u0435\u0433\u0430\u043d\u043e",
      donerTitle: "\u0424\u0438\u0440\u043c\u0435\u043d\u043d\u044b\u0435 \u0431\u043b\u044e\u0434\u0430 \u00b7 \u0434\u043e\u043d\u0435\u0440", donerSub: "\u0422\u0435\u043b\u044f\u0442\u0438\u043d\u0430 \u0438\u043b\u0438 \u043a\u0443\u0440\u0438\u0446\u0430",
      schnitzelTitle: "\u0411\u043b\u044e\u0434\u0430 \u0441 \u0448\u043d\u0438\u0446\u0435\u043b\u0435\u043c", schnitzelSub: "\u0421 \u0441\u0430\u043b\u0430\u0442\u043e\u043c \u0438 \u043a\u0430\u0440\u0442\u043e\u0444\u0435\u043b\u0435\u043c",
      turkishTitle: "\u0422\u0443\u0440\u0435\u0446\u043a\u0430\u044f \u043f\u0438\u0446\u0446\u0430 \u0438 \u043f\u0438\u0434\u0435", turkishSub: "\u0421\u0432\u0435\u0436\u0435\u0435 \u0438\u0437 \u043f\u0435\u0447\u0438",
      moreTitle: "\u0411\u043e\u043b\u044c\u0448\u0435 \u0431\u043b\u044e\u0434 \u0432 \u043c\u0435\u043d\u044e", moreSub: "\u0412\u0435\u0433\u0435\u0442\u0430\u0440\u0438\u0430\u043d\u0441\u043a\u043e\u0435, \u0441\u0430\u043b\u0430\u0442\u044b \u0438 \u043d\u0430\u043f\u0438\u0442\u043a\u0438",
      disclaimer: "\u0412\u044b\u0431\u043e\u0440 \u0431\u043b\u044e\u0434 \u0438 \u0446\u0435\u043d\u044b \u0443\u043a\u0430\u0437\u0430\u043d\u044b \u0432 \u0435\u0432\u0440\u043e."
    }
  };
  var menuDefault = menuLocales.tr;
  Object.keys(menuLocales).forEach(function (lang) {
    if (!menuLocales[lang]) menuLocales[lang] = menuDefault;
  });
  function applyMenuLanguage(lang) {
    var copy = menuLocales[lang] || menuDefault;
    document.querySelectorAll("[data-menu-i18n]").forEach(function (element) {
      if (copy[element.dataset.menuI18n]) element.innerHTML = copy[element.dataset.menuI18n];
    });
    var title = document.querySelector(".menu-widget h3");
    if (title) title.innerHTML = lang === "tr" ? "Ate\u015f &amp; <em>lezzet</em>" : lang === "de" ? "Feuer &amp; <em>Geschmack</em>" : lang === "fr" ? "Feu &amp; <em>saveur</em>" : lang === "ar" ? "\u0646\u0627\u0631 &amp; <em>\u0646\u0643\u0647\u0629</em>" : lang === "ru" ? "\u041e\u0433\u043e\u043d\u044c &amp; <em>\u0432\u043a\u0443\u0441</em>" : "Fire &amp; <em>flavour</em>";
    var label = document.querySelector(".menu-widget-label");
    if (label) label.textContent = "EIFELER KEBAPHAUS \u00b7 " + (lang === "tr" ? "MEN\u00dc" : lang === "de" ? "SPEISEKARTE" : lang === "ar" ? "\u0627\u0644\u0642\u0627\u0626\u0645\u0629" : lang === "ru" ? "\u041c\u0415\u041d\u042e" : "MENU");
    var searchLabel = document.querySelector(".menu-search label");
    if (searchLabel) searchLabel.textContent = lang === "tr" ? "Men\u00fcde ara" : lang === "de" ? "In der Karte suchen" : lang === "fr" ? "Rechercher dans la carte" : lang === "ar" ? "\u0627\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0642\u0627\u0626\u0645\u0629" : lang === "ru" ? "\u041f\u043e\u0438\u0441\u043a \u0432 \u043c\u0435\u043d\u044e" : "Search the menu";
    var descriptionMap = {
      tr: ["Peynir ve domates sosu", "T\u00fcrk sar\u0131msak sucu\u011fu ile", "Tavuk jambonu ile", "Ananas ve tavuk jambonu ile", "Sebzeler, m\u0131s\u0131r ve biber ile", "So\u011fan, biber, d\u00f6ner ve krema sosu ile"],
      de: ["Mit K\u00e4se und Tomatensauce", "Mit t\u00fcrkischer Knoblauchwurst", "Mit Gefl\u00fcgelschinken", "Mit Ananas und Gefl\u00fcgelschinken", "Champignons, Brokkoli, Tomaten, Mais und Peperoni", "Zwiebeln, Paprika, Drehspie\u00df und Rahmsauce"],
      en: ["With cheese and tomato sauce", "With Turkish garlic sausage", "With chicken ham", "With pineapple and chicken ham", "Mushrooms, broccoli, tomatoes, corn and peppers", "Onions, peppers, doner and cream sauce"],
      fr: ["Avec fromage et sauce tomate", "Avec saucisse \u00e0 l'ail turque", "Avec jambon de volaille", "Avec ananas et jambon de volaille", "Champignons, brocoli, tomates, ma\u00efs et poivrons", "Oignons, poivrons, doner et sauce cr\u00e8me"],
      ar: ["مع الجبن وصلصة الطماطم", "مع نقانق الثوم التركية", "مع لحم الدجاج", "مع الأناناس ولحم الدجاج", "فطر وبروكلي وطماطم وذرة وفلفل", "بصل وفلفل ودونر وصلصة كريمية"]
    };
    var descriptions = descriptionMap[lang] || descriptionMap.en;
    document.querySelectorAll(".menu-category-panel[data-menu-panel=\"pizza\"] .menu-item").forEach(function (item) {
      var name = item.querySelector("strong");
      var paragraph = item.querySelector("p");
      if (!name || !paragraph) return;
      var number = name.textContent.trim().split(".")[0].toUpperCase();
      var indexes = { "18": 0, "18A": 1, "19A": 2, "25": 4, "26": 3, "27": 5 };
      if (indexes[number] !== undefined && descriptions[indexes[number]]) paragraph.textContent = descriptions[indexes[number]];
    });
  }
  applyMenuLanguage(document.documentElement.lang || "tr");
  applyContentLanguage(document.documentElement.lang || "tr");
  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyMenuLanguage(button.dataset.lang);
      applyContentLanguage(button.dataset.lang);
    });
  });
  var hours = document.querySelector("footer .hours-card");
  if (hours) {
    hours.innerHTML = "<strong>Sal\u0131 - Pazar \u00b7 12:00 - 21:00</strong><span>Cumartesi - Pazar \u00b7 12:00 - 21:00</span><em>Pazartesi kapal\u0131</em>";
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
  if (description) description.content = "Eifeler Kebaphaus, Monschau\u2019da s\u0131cak d\u00f6ner, \u0131zgara ve deneyimli ekibiyle sizi bekliyor. 25 park yeri, kolay ula\u015f\u0131m ve samimi servis.";
})();
