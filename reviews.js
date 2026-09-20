const pendingKey = "eifeler-kebaphaus-pending-reviews";
const approvedKey = "eifeler-kebaphaus-approved-reviews";
const retentionMs = 180 * 24 * 60 * 60 * 1000;
function readFresh(key) {
  let value;
  try {
    value = JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    value = [];
  }
  const fresh = Array.isArray(value) ? value.filter(item => Number.isFinite(item.createdAt) && Date.now() - item.createdAt < retentionMs) : [];
  localStorage.setItem(key, JSON.stringify(fresh));
  return fresh;
}
const pending = () => readFresh(pendingKey);
const savePending = value => localStorage.setItem(pendingKey, JSON.stringify(value));
const form = document.querySelector("#public-review-form");
const status = document.querySelector("#public-review-status");
const adminCard = document.querySelector("#review-admin-card");
const pendingList = document.querySelector("#pending-reviews");
function renderPending() {
  const isAdmin = sessionStorage.getItem("eifeler-admin") === "true";
  adminCard.hidden = !isAdmin;
  if (!isAdmin) return;
  pendingList.replaceChildren();
  pending().forEach(review => {
    const article = document.createElement("article");
    article.className = "pending-review";
    const image = document.createElement("img");
    image.src = review.photo;
    image.alt = "Bekleyen misafir yorumu fotoğrafı";
    const text = document.createElement("p");
    text.textContent = review.text;
    const author = document.createElement("small");
    author.textContent = `— ${review.name || "Misafir"}`;
    const actions = document.createElement("div");
    actions.className = "pending-actions";
    const approve = document.createElement("button");
    approve.type = "button";
    approve.textContent = "Onayla";
    approve.addEventListener("click", () => {
      const remaining = pending().filter(item => item.id !== review.id);
      const approved = readFresh(approvedKey);
      approved.push(review);
      savePending(remaining);
      localStorage.setItem(approvedKey, JSON.stringify(approved));
      renderPending();
      renderApproved();
    });
    const reject = document.createElement("button");
    reject.type = "button";
    reject.textContent = "Sil";
    reject.addEventListener("click", () => {
      savePending(pending().filter(item => item.id !== review.id));
      renderPending();
    });
    actions.append(approve, reject);
    article.append(image, text, author, actions);
    pendingList.append(article);
  });
  if (!pendingList.children.length) pendingList.textContent = "Bekleyen yorum yok.";
}
function renderApproved() {
  const approvedList = document.querySelector("#approved-reviews");
  const approved = readFresh(approvedKey);
  approvedList.replaceChildren();
  approved.slice().reverse().forEach(review => {
    const article = document.createElement("article");
    article.className = "pending-review";
    const image = document.createElement("img");
    image.src = review.photo;
    image.alt = "Eifeler Kebaphaus misafir yorumu fotoğrafı";
    const text = document.createElement("p");
    text.textContent = review.text;
    const author = document.createElement("small");
    author.textContent = `— ${review.name || "Misafir"}`;
    article.append(image, text, author);
    approvedList.append(article);
  });
  if (!approved.length) approvedList.innerHTML = "<p class=\"review-admin-note\">Henüz yönetici tarafından yayınlanmış yorum yok.</p>";
}
form.addEventListener("submit", event => {
  event.preventDefault();
  const file = form.elements.photo.files[0];
  if (!file || !file.type.startsWith("image/") || !form.elements.foodPhotoConfirm.checked) {
    status.textContent = "Lütfen bir fotoğraf yükleyin.";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    status.textContent = "Fotoğraf 5 MB'dan küçük olmalıdır.";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const reviews = pending();
    reviews.push({id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), createdAt: Date.now(), name: form.elements.name.value.trim(), text: form.elements.text.value.trim(), photo: reader.result});
    savePending(reviews);
    form.reset();
    status.textContent = "Yorumunuz yönetici onayına gönderildi.";
    renderPending();
    renderApproved();
  });
  reader.readAsDataURL(file);
});
renderPending();
renderApproved();
