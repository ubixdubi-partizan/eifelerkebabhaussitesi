const SUPABASE_URL = "https://uwdwavstozljufbwgftr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_fLz1lc9XRv1DWN1H3Vrz7w_YwL5sjio";
const ADMIN_EMAIL = "ubixdubi@gmail.com";
let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

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
    image.alt = "Foto der ausstehenden Gästebewertung";
    const text = document.createElement("p");
    text.textContent = review.text;
    const author = document.createElement("small");
    author.textContent = `— ${review.name || "Gast"}`;
    const actions = document.createElement("div");
    actions.className = "pending-actions";
    const approve = document.createElement("button");
    approve.type = "button";
    approve.textContent = "Genehmigen";
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
    reject.textContent = "Löschen";
    reject.addEventListener("click", () => {
      savePending(pending().filter(item => item.id !== review.id));
      renderPending();
    });
    actions.append(approve, reject);
    article.append(image, text, author, actions);
    pendingList.append(article);
  });
  if (!pendingList.children.length) pendingList.textContent = "Keine ausstehenden Bewertungen.";
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
    image.alt = "Foto der Eifeler Kebaphaus Gästebewertung";
    const text = document.createElement("p");
    text.textContent = review.text;
    const author = document.createElement("small");
    author.textContent = `— ${review.name || "Gast"}`;
    article.append(image, text, author);
    approvedList.append(article);
  });
  if (!approved.length) approvedList.innerHTML = "<p class=\"review-admin-note\">Es wurden noch keine Bewertungen vom Administrator veröffentlicht.</p>";
}
form.addEventListener("submit", event => {
  event.preventDefault();
  const file = form.elements.photo.files[0];
  if (!file || !file.type.startsWith("image/") || !form.elements.foodPhotoConfirm.checked) {
    status.textContent = "Bitte laden Sie ein Foto hoch.";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    status.textContent = "Das Foto muss kleiner als 5 MB sein.";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const reviews = pending();
    reviews.push({id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), createdAt: Date.now(), name: form.elements.name.value.trim(), text: form.elements.text.value.trim(), photo: reader.result});
    savePending(reviews);
    form.reset();
    status.textContent = "Ihre Bewertung wurde zur Administrator-Freigabe gesendet.";
    renderPending();
    renderApproved();
  });
  reader.readAsDataURL(file);
});

// Check Supabase session before rendering admin panel
if (supabaseClient) {
  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    if (session && session.user && session.user.email && session.user.email.toLowerCase() === ADMIN_EMAIL) {
      sessionStorage.setItem("eifeler-admin", "true");
    } else {
      sessionStorage.removeItem("eifeler-admin");
    }
    renderPending();
  });

  // Listen for auth state changes
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    if (session && session.user && session.user.email && session.user.email.toLowerCase() === ADMIN_EMAIL) {
      sessionStorage.setItem("eifeler-admin", "true");
    } else {
      sessionStorage.removeItem("eifeler-admin");
    }
    renderPending();
  });
}

// Initial render (approved reviews are always visible)
renderApproved();
