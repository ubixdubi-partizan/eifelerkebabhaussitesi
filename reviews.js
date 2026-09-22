/* Misafir yorumları.
   Supabase yapılandırılmışsa yorumlar sunucuda saklanır: herkes onaylanmış
   yorumları görür, onay bekleyenleri yalnızca yönetici görür.
   Yapılandırma yoksa eski davranış korunur: yorumlar yalnızca ziyaretçinin
   kendi tarayıcısında kalır (kimse göremez) ve arayüz bunu açıkça yazar. */

const PHOTO_BUCKET = "review-photos";
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const RETENTION_DAYS = 180;

const form = document.querySelector("#public-review-form");
const statusLine = document.querySelector("#public-review-status");
const adminCard = document.querySelector("#review-admin-card");
const pendingList = document.querySelector("#pending-reviews");
const approvedList = document.querySelector("#approved-reviews");
const headNote = document.querySelector(".reviews-page-head p");

const pendingKey = "eifeler-reviews-pending";
const approvedKey = "eifeler-reviews-approved";

const supa = () => (window.adminAuth && window.adminAuth.client ? window.adminAuth.client() : null);
const isAdmin = () => Boolean(window.adminAuth && window.adminAuth.state().isAdmin);

function readLocal(key) {
  try {
    const value = JSON.parse(siteStore.get(key) || "[]");
    const limit = Date.now() - RETENTION_DAYS * 86400000;
    const fresh = value.filter(item => !item.createdAt || item.createdAt > limit);
    if (fresh.length !== value.length) siteStore.set(key, JSON.stringify(fresh));
    return fresh;
  } catch { return []; }
}
const writeLocal = (key, value) => siteStore.set(key, JSON.stringify(value));

function photoUrl(path) {
  const client = supa();
  if (!client || !path) return path;
  return client.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
}

function note(text, tone) {
  statusLine.textContent = text;
  statusLine.style.color = tone === "error" ? "#ff9a7a" : "#ffc247";
}

function reviewCard(review, options) {
  const article = document.createElement("article");
  article.className = "pending-review";
  if (review.photo) {
    const image = document.createElement("img");
    image.loading = "lazy";
    image.src = review.photo;
    image.alt = "Eifeler Kebaphaus misafir yorumu fotoğrafı";
    article.append(image);
  }
  const text = document.createElement("p");
  text.textContent = review.message;
  const meta = document.createElement("small");
  const when = review.createdAt ? new Date(review.createdAt).toLocaleDateString("tr-TR") : "";
  meta.textContent = (review.name || "Misafir") + (when ? " · " + when : "") + (review.rating ? " · " + review.rating + "/5" : "");
  article.append(text, meta);

  if (options && options.actions) {
    const actions = document.createElement("div");
    actions.className = "pending-actions";
    const approve = document.createElement("button");
    approve.type = "button";
    approve.textContent = "Onayla";
    approve.addEventListener("click", () => options.onApprove(review));
    const reject = document.createElement("button");
    reject.type = "button";
    reject.textContent = "Sil";
    reject.addEventListener("click", () => options.onReject(review));
    actions.append(approve, reject);
    article.append(actions);
  }
  return article;
}

const mapRow = row => ({
  id: row.id,
  name: row.guest_name,
  message: row.message,
  rating: row.rating,
  photo: photoUrl(row.photo_path),
  createdAt: row.created_at ? Date.parse(row.created_at) : null
});

async function loadApproved() {
  const client = supa();
  approvedList.replaceChildren();
  let items = [];
  if (client) {
    const { data, error } = await client
      .from("reviews").select("*").eq("status", "approved")
      .order("created_at", { ascending: false }).limit(50);
    if (error) {
      approvedList.innerHTML = '<p class="review-admin-note">Yorumlar yüklenemedi: ' + error.message + "</p>";
      return;
    }
    items = (data || []).map(mapRow);
  } else {
    items = readLocal(approvedKey);
  }
  if (!items.length) {
    approvedList.innerHTML = '<p class="review-admin-note">Henüz yönetici tarafından yayınlanmış yorum yok.</p>';
    return;
  }
  items.forEach(review => approvedList.append(reviewCard(review)));
}

async function loadPending() {
  const client = supa();
  const admin = isAdmin();
  adminCard.hidden = !admin;
  if (!admin) return;
  pendingList.replaceChildren();
  let items = [];
  if (client) {
    const { data, error } = await client
      .from("reviews").select("*").eq("status", "pending")
      .order("created_at", { ascending: false }).limit(100);
    if (error) {
      pendingList.innerHTML = '<p class="review-admin-note">Bekleyen yorumlar yüklenemedi: ' + error.message + "</p>";
      return;
    }
    items = (data || []).map(row => Object.assign(mapRow(row), { photoPath: row.photo_path }));
  } else {
    items = readLocal(pendingKey);
  }
  if (!items.length) {
    pendingList.innerHTML = '<p class="review-admin-note">Bekleyen yorum yok.</p>';
    return;
  }
  items.forEach(review => pendingList.append(reviewCard(review, {
    actions: true,
    onApprove: async item => {
      if (client) {
        const { error } = await client.from("reviews").update({ status: "approved" }).eq("id", item.id);
        if (error) { note("Onaylanamadı: " + error.message, "error"); return; }
      } else {
        const approved = readLocal(approvedKey);
        approved.unshift(item);
        writeLocal(approvedKey, approved);
        writeLocal(pendingKey, readLocal(pendingKey).filter(entry => entry.id !== item.id));
      }
      await Promise.all([loadPending(), loadApproved()]);
    },
    onReject: async item => {
      if (client) {
        if (item.photoPath) await client.storage.from(PHOTO_BUCKET).remove([item.photoPath]);
        const { error } = await client.from("reviews").delete().eq("id", item.id);
        if (error) { note("Silinemedi: " + error.message, "error"); return; }
      } else {
        writeLocal(pendingKey, readLocal(pendingKey).filter(entry => entry.id !== item.id));
      }
      await loadPending();
    }
  })));
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const name = (form.elements.name.value || "").trim().slice(0, 40);
  const message = (form.elements.text.value || "").trim();
  const file = form.elements.photo.files[0];
  if (message.length < 5) { note("Lütfen birkaç kelimelik bir yorum yazın.", "error"); return; }
  if (!file) { note("Lütfen bir fotoğraf yükleyin.", "error"); return; }
  if (file.size > MAX_PHOTO_BYTES) { note("Fotoğraf 5 MB'dan küçük olmalıdır.", "error"); return; }
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) { note("Yalnızca JPEG, PNG veya WebP kabul edilir.", "error"); return; }

  const client = supa();
  const submit = form.querySelector("button[type=submit]");
  submit.disabled = true;
  note("Gönderiliyor…");

  try {
    if (client) {
      const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const path = "pending/" + Date.now() + "-" + Math.random().toString(36).slice(2, 10) + "." + extension;
      const upload = await client.storage.from(PHOTO_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
      if (upload.error) throw upload.error;
      const insert = await client.from("reviews").insert({
        guest_name: name || "Misafir",
        message,
        photo_path: path,
        status: "pending"
      });
      if (insert.error) {
        await client.storage.from(PHOTO_BUCKET).remove([path]);
        throw insert.error;
      }
      note("Yorumunuz yönetici onayına gönderildi. Teşekkürler.");
    } else {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Fotoğraf okunamadı."));
        reader.readAsDataURL(file);
      });
      const pending = readLocal(pendingKey);
      pending.unshift({ id: "local-" + Date.now(), name: name || "Misafir", message, photo: dataUrl, createdAt: Date.now() });
      writeLocal(pendingKey, pending);
      note("Yorumunuz kaydedildi. Sunucu bağlantısı kurulmadığı için şimdilik yalnızca bu tarayıcıda görünür.");
    }
    form.reset();
    await loadPending();
  } catch (error) {
    note("Gönderilemedi: " + (error && error.message ? error.message : error), "error");
  } finally {
    submit.disabled = false;
  }
});

function describeMode() {
  if (!headNote) return;
  if (supa()) return;
  headNote.textContent = "Yazılı yorumların yayınlanması için bir fotoğraf yüklemek zorunludur. Sunucu bağlantısı henüz kurulmadığı için gönderdiğiniz yorum şimdilik yalnızca kendi tarayıcınızda saklanır ve başka ziyaretçilere görünmez.";
}

function refreshAll() {
  describeMode();
  loadApproved();
  loadPending();
}

refreshAll();
if (window.adminAuth) window.adminAuth.onChange(refreshAll);
