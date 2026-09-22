const scenery = {
  turkey: { name: "Türkei", search: "landscape Turkey", titles: ["Ägäis-Küste","Kappadokien am Morgen","Schwarzes Meer Hochebenen","Mittelmeer-Sonnenuntergang","Pamukkale im Licht","Bosporus-Blick","Seen Ostanatoliens","Lykische Küste","Steingassen in Mardin","Uludağ Winterpanorama"] },
  germany: { name: "Deutschland", search: "landscape Germany", titles: ["Monschau und Eifel","Bayerische Seen","Rheintal","Schwarzwald","Hamburger Hafen","Alpenvorland","Mosel-Weinberge","Berlin bei Sonnenuntergang","Sächsische Schweiz","Nordseeküste"] },
  world: { name: "Welt", search: "landscape nature", titles: ["Alpengipfel","Islandische Wasserfälle","Japanischer Herbst","Patagonien-Horizont","Norwegische Fjorde","Sahara-Licht","Neuseeländische Täler","Tropische Insel","Kanadische Seen","Antarktische Stille"] }
};
const grid = document.querySelector("#landscape-grid");
const status = document.querySelector("#landscape-status");
const date = document.querySelector("#landscape-date");
const day = Math.floor(Date.now() / 86400000);
date.textContent = `Tagesauswahl · ${new Date().toLocaleDateString("de-DE")}`;

function renderUnavailable(group, reason) {
  const message = document.createElement("p");
  message.className = "landscape-empty";
  message.textContent = `${group.name} Bilder können derzeit nicht angezeigt werden. ${reason} Bilder ohne verifizierte Lizenz- und Quellenangabe werden nicht verwendet.`;
  grid.replaceChildren(message);
}

async function renderScenery(key) {
  const group = scenery[key];
  status.textContent = `Tagesauswahl für ${group.name} wird geladen…`;
  grid.replaceChildren();
  try {
    const offset = (day * 10) % 200;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(group.search)}&gsrnamespace=6&gsrlimit=10&gsroffset=${offset}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900&format=json&origin=*`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Landscape API request failed");
    const data = await response.json();
    const pages = Object.values(data.query?.pages || {}).filter(page => {
      const meta = page.imageinfo?.[0]?.extmetadata || {};
      const license = (meta.LicenseShortName?.value || "").toLowerCase();
      return /public domain|cc0|cc by|cc-by|cc by-sa|cc-by-sa/.test(license) && (meta.Artist?.value || meta.Credit?.value);
    });
    if (pages.length < 10) throw new Error("Lisansı doğrulanmış 10 görsel bulunamadı");
    pages.slice(0, 10).forEach((page, index) => {
      const info = page.imageinfo[0];
      const meta = info.extmetadata || {};
      const figure = document.createElement("figure");
      figure.className = "landscape-card";
      const image = document.createElement("img");
      image.loading = index < 3 ? "eager" : "lazy";
      image.src = info.thumburl || info.url;
      image.alt = `${group.name} Landschaft: ${group.titles[index]}`;
      const caption = document.createElement("figcaption");
      const link = document.createElement("a");
      link.href = `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replaceAll(" ", "_"))}`;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = group.titles[index];
      const small = document.createElement("small");
      const license = meta.LicenseShortName?.value || "Lizenzinformation";
      const artist = (meta.Artist?.value || meta.Credit?.value || "Unbekannter Mitwirkender").replace(/<[^>]+>/g, "");
      small.textContent = `${artist} · ${license} · Wikimedia Commons ↗`;
      link.append(small);
      caption.append(link);
      figure.append(image, caption);
      grid.append(figure);
    });
    status.textContent = `Heute werden 10 aktualisierte Bilder für ${group.name} angezeigt.`;
  } catch (error) {
    renderUnavailable(group, error.message);
  }
}

document.querySelectorAll(".landscape-tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".landscape-tab").forEach(item => {
    item.classList.toggle("active", item === tab);
    item.setAttribute("aria-selected", item === tab);
  });
  renderScenery(tab.dataset.scenery);
}));
renderScenery("turkey");
