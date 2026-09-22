/* Eifel Manzara Widget — Monschau & Eifel bölgesi telifsiz manzara görselleri.
   Telif güvenliği kuralları (landscapes.js ile aynı):
   - Yalnızca CC0 / kamu malı / CC BY / CC BY-SA lisanslı dosyalar gösterilir.
   - Eser sahibi (Artist/Credit) bilgisi olmayan dosyalar atlanır.
   - Görseller indirilmez, Wikimedia Commons sunucusundan gösterilir.
   - Her kart kaynak dosya sayfasına bağlanır; lisans ve eser sahibi kartta yazılıdır.
   - Haftalık döner: ISO hafta numarasına göre seçim yapılır. */

const EIFEL_SCENERY_QUERIES = [
  "Monschau", "Eifel landscape", "Eifel National Park",
  "Rur river Monschau", "Monschau old town", "Eifel mountains",
  "Rursee lake Eifel", "Vogelsang Eifel", "Eifel forest autumn",
  "Monschau valley", "Eifel sunset landscape", "Rur valley Eifel"
];

const EIFEL_ALLOWED_LICENSE = /public domain|cc0|cc[ -]by/i;
const EIFEL_BLOCKED_WORDS = /sketch|drawing|engrav|lithograph|etching|map |karte|plan of|coat of arms|stamp|banknote|logo|diagram|painting|woodcut|manuscript|book|page \d|portrait|poster|chart|butterfly|moth |beetle|insect|spider|bird|flower|blossom|fungus|mushroom|doorway|interior|detail of|close wing|action at|hms |uss |ship|aircraft|statue|monument sign|garden in/i;

(function () {
  const widget = document.querySelector("#eifel-scenery");
  if (!widget) return;

  const track = widget.querySelector("#eifel-scenery-track");
  const status = widget.querySelector("#eifel-scenery-status");
  const weekLabel = widget.querySelector("#eifel-scenery-week");
  const lightbox = widget.querySelector("#eifel-scenery-lightbox");
  const lightboxImage = lightbox ? lightbox.querySelector("#eifel-scenery-lightbox-image") : null;
  const lightboxTitle = lightbox ? lightbox.querySelector("#eifel-scenery-lightbox-title") : null;
  const lightboxMeta = lightbox ? lightbox.querySelector("#eifel-scenery-lightbox-meta") : null;
  const lightboxLink = lightbox ? lightbox.querySelector("#eifel-scenery-lightbox-link") : null;
  const lightboxClose = lightbox ? lightbox.querySelector("#eifel-scenery-lightbox-close") : null;

  /* ISO hafta numarası — haftalık döner, böylece görseller her hafta yenilenir. */
  function isoWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  const now = new Date();
  const weekNum = isoWeek(now);
  const weekOffset = weekNum % 6;

  if (weekLabel) {
    weekLabel.textContent = "Hafta " + weekNum + " · " + now.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  }

  const stripTags = value => String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  function prettyTitle(fileTitle, meta) {
    const described = stripTags(meta.ObjectName && meta.ObjectName.value) || stripTags(meta.ImageDescription && meta.ImageDescription.value);
    const base = described || String(fileTitle).replace(/^File:/, "").replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " ");
    const clean = base.replace(/\s+/g, " ").trim();
    const short = clean.length > 60 ? clean.slice(0, 57).trimEnd() + "…" : clean;
    return short.charAt(0).toUpperCase() + short.slice(1);
  }

  function skeletons(count) {
    if (!track) return;
    track.replaceChildren();
    for (let i = 0; i < count; i++) {
      const box = document.createElement("div");
      box.className = "eifel-scenery-skeleton";
      box.style.gridRow = i === 0 ? "span 2" : "auto";
      track.append(box);
    }
  }

  async function fetchOne(query, offset) {
    const search = "filetype:bitmap " + query + ' incategory:"Quality_images"';
    const url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
      "&gsrsearch=" + encodeURIComponent(search) +
      "&gsrnamespace=6&gsrlimit=12&gsroffset=" + offset +
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
        if (!license || !EIFEL_ALLOWED_LICENSE.test(license)) return null;
        if (!artist) return null;
        if (info.width && info.height && info.width / info.height < 1.15) return null;
        if (info.width && info.width < 1200) return null;
        if (EIFEL_BLOCKED_WORDS.test(String(page.title))) return null;
        return {
          title: prettyTitle(page.title, meta),
          src: info.thumburl || info.url,
          artist: artist.length > 55 ? artist.slice(0, 52) + "…" : artist,
          license,
          page: "https://commons.wikimedia.org/wiki/" + encodeURIComponent(String(page.title).replace(/ /g, "_")),
          query
        };
      })
      .filter(Boolean);
    if (!usable.length) {
      /* Quality_images kategorisi boş dönerse normal aramaya düş. */
      const fallbackSearch = "filetype:bitmap -sketch -map " + query;
      const fallbackUrl = "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
        "&gsrsearch=" + encodeURIComponent(fallbackSearch) +
        "&gsrnamespace=6&gsrlimit=12&gsroffset=" + offset +
        "&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1200&format=json&origin=*";
      const fbResponse = await fetch(fallbackUrl, { cache: "no-store" });
      if (!fbResponse.ok) return null;
      const fbData = await fbResponse.json();
      const fbPages = Object.values((fbData.query && fbData.query.pages) || {});
      const fbUsable = fbPages
        .map(page => {
          const info = page.imageinfo && page.imageinfo[0];
          if (!info) return null;
          const meta = info.extmetadata || {};
          const license = stripTags(meta.LicenseShortName && meta.LicenseShortName.value);
          const artist = stripTags((meta.Artist && meta.Artist.value) || (meta.Credit && meta.Credit.value));
          if (!license || !EIFEL_ALLOWED_LICENSE.test(license)) return null;
          if (!artist) return null;
          if (info.width && info.height && info.width / info.height < 1.15) return null;
          if (info.width && info.width < 1200) return null;
          if (EIFEL_BLOCKED_WORDS.test(String(page.title))) return null;
          return {
            title: prettyTitle(page.title, meta),
            src: info.thumburl || info.url,
            artist: artist.length > 55 ? artist.slice(0, 52) + "…" : artist,
            license,
            page: "https://commons.wikimedia.org/wiki/" + encodeURIComponent(String(page.title).replace(/ /g, "_")),
            query
          };
        })
        .filter(Boolean);
      return fbUsable.length ? fbUsable[offset % fbUsable.length] : null;
    }
    return usable[offset % usable.length];
  }

  function openLightbox(item) {
    if (!lightbox) return;
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
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = "";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });
  }

  function card(item, index) {
    const figure = document.createElement("figure");
    figure.className = "eifel-scenery-card";
    if (index === 0) figure.classList.add("span-2");
    figure.style.setProperty("--delay", (index % 6) * 80 + "ms");
    figure.tabIndex = 0;
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", item.title + " — büyük görseli aç");

    const image = document.createElement("img");
    image.loading = index < 2 ? "eager" : "lazy";
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
    caption.append(heading, credit);

    const badge = document.createElement("span");
    badge.className = "eifel-scenery-badge";
    badge.textContent = item.license;

    figure.append(image, badge, caption);
    const open = () => openLightbox(item);
    figure.addEventListener("click", open);
    figure.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
    });
    return figure;
  }

  async function renderScenery() {
    if (status) status.textContent = "Eifel & Monschau manzaraları yükleniyor…";
    skeletons(5);
    const results = await Promise.all(
      EIFEL_SCENERY_QUERIES.slice(weekOffset, weekOffset + 5).concat(EIFEL_SCENERY_QUERIES.slice(0, Math.max(0, 5 - (12 - weekOffset)))).slice(0, 5).map(query =>
        fetchOne(query, weekOffset).catch(() => null)
      )
    );
    const items = results.filter(Boolean);
    if (!track) return;
    track.replaceChildren();
    if (!items.length) {
      const message = document.createElement("p");
      message.style.cssText = "grid-column:1/-1;padding:2rem;text-align:center;color:var(--muted);font-size:.85rem;";
      message.textContent = "Manzara servisine şu anda ulaşılamıyor. Birazdan tekrar deneyin.";
      track.append(message);
      if (status) status.textContent = "Eifel'in doğusundan manzaralar.";
      return;
    }
    items.forEach((item, index) => track.append(card(item, index)));
    if (status) status.textContent = "Bu haftanın Eifel & Monschau seçkisi · " + items.length + " görsel.";
  }

  renderScenery();
})();
