const scenery = {
  turkey: { name: "Türkiye", search: "landscape Turkey", titles: ["Ege kıyıları","Kapadokya sabahı","Karadeniz yaylaları","Akdeniz gün batımı","Pamukkale ışığı","Boğaz manzarası","Doğu Anadolu gölleri","Likya sahilleri","Mardin taş sokakları","Uludağ kış panoraması"] },
  germany: { name: "Almanya", search: "landscape Germany", titles: ["Monschau ve Eifel","Bavyera gölleri","Ren vadisi","Kara Orman","Hamburg limanı","Alp etekleri","Mosel bağları","Berlin gün batımı","Saksonya kayalıkları","Kuzey Denizi kıyısı"] },
  world: { name: "Dünya", search: "landscape nature", titles: ["Alp zirveleri","İzlanda şelaleleri","Japonya sonbaharı","Patagonya ufku","Norveç fiyortları","Sahra ışığı","Yeni Zelanda vadileri","Tropik ada","Kanada gölleri","Antarktika sessizliği"] }
};
const grid = document.querySelector("#landscape-grid");
const status = document.querySelector("#landscape-status");
const date = document.querySelector("#landscape-date");
const day = Math.floor(Date.now() / 86400000);
date.textContent = `Günün seçkisi · ${new Date().toLocaleDateString("tr-TR")}`;

function renderUnavailable(group, reason) {
  const message = document.createElement("p");
  message.className = "landscape-empty";
  message.textContent = `${group.name} görselleri şu anda gösterilemiyor. ${reason} Lisans ve atıf bilgisi doğrulanamayan görseller kullanılmaz.`;
  grid.replaceChildren(message);
}

async function renderScenery(key) {
  const group = scenery[key];
  status.textContent = `${group.name} günlük seçkisi yükleniyor…`;
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
      image.alt = `${group.name} manzarası: ${group.titles[index]}`;
      const caption = document.createElement("figcaption");
      const link = document.createElement("a");
      link.href = `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replaceAll(" ", "_"))}`;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = group.titles[index];
      const small = document.createElement("small");
      const license = meta.LicenseShortName?.value || "Lisans bilgisi";
      const artist = (meta.Artist?.value || meta.Credit?.value || "Bilinmeyen katkıcı").replace(/<[^>]+>/g, "");
      small.textContent = `${artist} · ${license} · Wikimedia Commons ↗`;
      link.append(small);
      caption.append(link);
      figure.append(image, caption);
      grid.append(figure);
    });
    status.textContent = `${group.name} için bugün güncellenen 10 görsel gösteriliyor.`;
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
