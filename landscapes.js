/* Manzara köşesi — Wikimedia Commons üzerinden lisansı doğrulanmış görseller.
   Telif güvenliği kuralları:
   - Yalnızca CC0 / kamu malı / CC BY / CC BY-SA lisanslı dosyalar gösterilir.
   - Eser sahibi (Artist/Credit) bilgisi olmayan dosyalar atlanır.
   - Görseller indirilmez, Commons sunucusundan gösterilir ve her kart kaynak
     dosya sayfasına bağlanır; lisans adı ve eser sahibi kartta yazılıdır.
   - Başlık olarak dosyanın kendi adı/açıklaması kullanılır; görsele ait olmayan
     hayali yer adları yazılmaz. */

const SCENERY = {
  turkey: {
    name: "Türkiye",
    tagline: "Ege'den Doğu Anadolu'ya, memleket ışığı.",
    queries: [
      "Cappadocia landscape", "Aegean coast Turkey landscape", "Pamukkale travertine",
      "Lycian coast Turkey", "Mardin old city", "Black Sea highlands Turkey",
      "Lake Van landscape", "Bosphorus Istanbul view", "Mount Ararat", "Antalya coast landscape"
    ]
  },
  germany: {
    name: "Almanya",
    tagline: "Monschau'dan Alp eteklerine, komşu coğrafya.",
    queries: [
      "Monschau", "Eifel landscape", "Moselle valley vineyards", "Black Forest landscape",
      "Rhine valley landscape", "Bavarian Alps lake", "Saxon Switzerland rocks",
      "North Sea coast Germany", "Berlin skyline sunset", "Hamburg harbour"
    ]
  },
  world: {
    name: "Dünya",
    tagline: "Masadan kalkmadan uzak ufuklar.",
    queries: [
      "Iceland waterfall landscape", "Patagonia landscape", "Norway fjord landscape",
      "Japan autumn landscape", "Dolomites landscape", "New Zealand landscape",
      "Sahara desert landscape", "Canadian Rockies lake", "Tropical island lagoon",
      "Antarctica landscape"
    ]
  }
};

const ALLOWED_LICENSE = /public domain|cc0|cc[ -]by/i;
/* Fotoğraf olmayan (çizim, harita, gravür, kitap sayfası) dosyaları ayıkla. */
const BLOCKED_WORDS = /sketch|drawing|engrav|lithograph|etching|map |karte|plan of|coat of arms|stamp|banknote|logo|diagram|painting|woodcut|manuscript|book|page \d|portrait|poster|chart|butterfly|moth |beetle|insect|spider|bird|flower|blossom|fungus|mushroom|doorway|interior|detail of|close wing|action at|hms |uss |ship|aircraft|statue|monument sign|garden in/i;
const grid = document.querySelector("#landscape-grid");
const statusLine = document.querySelector("#landscape-status");
const dateLine = document.querySelector("#landscape-date");
const tabs = [...document.querySelectorAll("[data-scenery]")];
const lightbox = document.querySelector("#scenery-lightbox");
const lightboxImage = document.querySelector("#scenery-lightbox-image");
const lightboxTitle = document.querySelector("#scenery-lightbox-title");
const lightboxMeta = document.querySelector("#scenery-lightbox-meta");
const lightboxLink = document.querySelector("#scenery-lightbox-link");
const lightboxClose = document.querySelector("#scenery-lightbox-close");

/* Görseller haftalık döner: ISO hafta numarasına göre seçim yapılır,
   böylece her hafta farklı bir seçki gösterilir. */
function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

const today = new Date();
const weekIndex = isoWeek(today);
const dayIndex = weekIndex;
dateLine.textContent = "Haftanın seçkisi · " + today.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) + " (Hafta " + weekIndex + ")";

const stripTags = value => String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

function prettyTitle(fileTitle, meta) {
  const described = stripTags(meta.ObjectName && meta.ObjectName.value) || stripTags(meta.ImageDescription && meta.ImageDescription.value);
  const base = described || String(fileTitle).replace(/^File:/, "").replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " ");
  const clean = base.replace(/\s+/g, " ").trim();
  const short = clean.length > 78 ? clean.slice(0, 75).trimEnd() + "…" : clean;
  return short.charAt(0).toUpperCase() + short.slice(1);
}

function skeletons(count) {
  grid.replaceChildren();
  for (let i = 0; i < count; i += 1) {
    const box = document.createElement("div");
    box.className = "scenery-skeleton";
    box.style.setProperty("--h", 220 + ((i * 67) % 160) + "px");
    grid.append(box);
  }
}

/* Commons'un topluluk tarafından seçilmiş "Quality images" havuzu, yüksek
   kaliteli fotoğrafları getirir; boş dönerse normal aramaya düşer. */
async function fetchOne(query, offset, curatedOnly) {
  const search = curatedOnly
    ? "filetype:bitmap " + query + " incategory:\"Quality_images\""
    : "filetype:bitmap -sketch -map " + query;
  const url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    "&gsrsearch=" + encodeURIComponent(search) +
    "&gsrnamespace=6&gsrlimit=10&gsroffset=" + offset +
    "&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1200&format=json&origin=*";
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Wikimedia isteği başarısız (" + response.status + ")");
  const data = await response.json();
  const pages = Object.values((data.query && data.query.pages) || {});
  const usable = pages
    .map(page => {
      const info = page.imageinfo && page.imageinfo[0];
      if (!info) return null;
      const meta = info.extmetadata || {};
      const license = stripTags(meta.LicenseShortName && meta.LicenseShortName.value);
      const artist = stripTags((meta.Artist && meta.Artist.value) || (meta.Credit && meta.Credit.value));
      if (!license || !ALLOWED_LICENSE.test(license)) return null;
      if (!artist) return null;
      if (info.width && info.height && info.width / info.height < 1.15) return null;
      if (info.width && info.width < 1400) return null;
      if (BLOCKED_WORDS.test(String(page.title))) return null;
      return {
        title: prettyTitle(page.title, meta),
        src: info.thumburl || info.url,
        artist: artist.length > 60 ? artist.slice(0, 57) + "…" : artist,
        license,
        page: "https://commons.wikimedia.org/wiki/" + encodeURIComponent(String(page.title).replace(/ /g, "_")),
        query
      };
    })
    .filter(Boolean);
  return usable.length ? usable[offset % usable.length] : null;
}

function openLightbox(item) {
  lightboxImage.src = item.src;
  lightboxImage.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxMeta.textContent = item.artist + " · " + item.license;
  lightboxLink.href = item.page;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  document.body.style.overflow = "";
}

function card(item, index) {
  const figure = document.createElement("figure");
  figure.className = "scenery-card";
  figure.style.setProperty("--delay", (index % 10) * 60 + "ms");
  figure.tabIndex = 0;
  figure.setAttribute("role", "button");
  figure.setAttribute("aria-label", item.title + " — büyük görseli aç");

  const image = document.createElement("img");
  image.loading = index < 3 ? "eager" : "lazy";
  image.decoding = "async";
  image.src = item.src;
  image.alt = item.title;
  image.addEventListener("load", () => figure.classList.add("is-loaded"));
  image.addEventListener("error", () => figure.remove());

  const caption = document.createElement("figcaption");
  const heading = document.createElement("strong");
  heading.textContent = item.title;
  const credit = document.createElement("small");
  credit.textContent = item.artist + " · " + item.license;
  const badge = document.createElement("span");
  badge.className = "scenery-badge";
  badge.textContent = item.license;
  caption.append(heading, credit);

  figure.append(image, badge, caption);
  const open = () => openLightbox(item);
  figure.addEventListener("click", open);
  figure.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
  });
  return figure;
}

async function renderScenery(key) {
  const group = SCENERY[key];
  statusLine.textContent = group.name + " seçkisi hazırlanıyor…";
  skeletons(8);
  const offset = dayIndex % 6;
  const results = await Promise.all(
    group.queries.map(query =>
      fetchOne(query, offset, true)
        .then(hit => hit || fetchOne(query, offset, false))
        .catch(() => null))
  );
  const items = results.filter(Boolean);
  grid.replaceChildren();
  if (!items.length) {
    const message = document.createElement("p");
    message.className = "landscape-empty";
    message.textContent = "Manzara servisine şu anda ulaşılamıyor. Lisansı ve eser sahibi doğrulanamayan görseller gösterilmediği için seçki boş kaldı; birazdan tekrar deneyin.";
    grid.append(message);
    statusLine.textContent = group.tagline;
    return;
  }
  items.forEach((item, index) => grid.append(card(item, index)));
  statusLine.textContent = group.tagline + " Bu hafta için " + items.length + " görsel.";
}

tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  renderScenery(tab.dataset.scenery);
}));

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !lightbox.hidden) closeLightbox(); });

renderScenery("turkey");
