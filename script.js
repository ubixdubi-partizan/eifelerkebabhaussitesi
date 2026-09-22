/* Ceviriler i18n.js dosyasindan gelir (13 dil, tam UTF-8). */
const translations = SITE_I18N;
const menuTranslations = MENU_I18N;

const languageButton = document.querySelector(".language-button");
const languageMenu = document.querySelector(".language-menu");
const languageNames = {tr:"TR",de:"DE",en:"EN",fr:"FR",nl:"NL",lb:"LB",pl:"PL",da:"DA",cs:"CS",it:"IT",es:"ES",ar:"AR",ru:"RU"};
languageButton.addEventListener("click", () => { const open = languageMenu.classList.toggle("open"); languageButton.setAttribute("aria-expanded", open); });
document.addEventListener("click", event => { if (!event.target.closest(".language-switcher")) { languageMenu.classList.remove("open"); languageButton.setAttribute("aria-expanded", "false"); } });
document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => {
  const lang = button.dataset.lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  languageButton.firstChild.textContent = `${languageNames[lang]} `;
  document.querySelectorAll("[data-i18n]").forEach(element => { element.innerHTML = translations[lang][element.dataset.i18n]; });
  document.querySelectorAll("[data-menu-i18n]").forEach(element => { element.innerHTML = menuTranslations[lang][element.dataset.menuI18n]; });
  languageMenu.classList.remove("open"); languageButton.setAttribute("aria-expanded", "false");
}));
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
    ratingStatus.textContent = "Lütfen 1 ile 5 arasında bir yıldız seçin.";
    return;
  }
  siteStore.set("eifeler-kebaphaus-rating", String(rating));
  ratingStatus.textContent = "Teşekkürler — " + rating + " yıldızlık puanınız kaydedildi.";
});
const adminLoginOpen = document.querySelector("#admin-login-open");
const adminLoginClose = document.querySelector("#admin-login-close");
const adminLoginModal = document.querySelector("#admin-login-modal");
const adminLoginStatus = document.querySelector("#admin-login-status");
const adminSignInButton = document.querySelector("#admin-github-signin");
const adminSignOutButton = document.querySelector("#admin-signout");
const adminNotification = document.querySelector("#admin-notification");
const adminNotificationCount = document.querySelector("#admin-notification-count");

function setAdminVisibility(isAdmin) {
  if (adminNotification) adminNotification.hidden = !isAdmin;
  if (adminNotificationCount && isAdmin) {
    let pending = 0;
    try { pending = JSON.parse(siteStore.get("eifeler-reviews-pending") || "[]").length; } catch { pending = 0; }
    adminNotificationCount.textContent = String(pending);
  }
}

function renderAdminState(status) {
  if (!adminLoginStatus) return;
  if (!status.configured) {
    adminLoginStatus.textContent = status.error
      ? "Yönetici girişi başlatılamadı: " + status.error
      : "Yönetici girişi henüz yapılandırılmadı. admin-config.js dosyasındaki Supabase bilgilerini doldurun.";
    if (adminSignInButton) adminSignInButton.disabled = true;
    if (adminSignOutButton) adminSignOutButton.hidden = true;
  } else if (status.isAdmin) {
    adminLoginStatus.textContent = "Yönetici olarak giriş yapıldı: @" + status.login;
    if (adminSignInButton) adminSignInButton.hidden = true;
    if (adminSignOutButton) adminSignOutButton.hidden = false;
  } else if (status.login) {
    adminLoginStatus.textContent = "@" + status.login + " hesabı yönetici listesinde değil.";
    if (adminSignInButton) { adminSignInButton.hidden = true; adminSignInButton.disabled = true; }
    if (adminSignOutButton) adminSignOutButton.hidden = false;
  } else {
    adminLoginStatus.textContent = "";
    if (adminSignInButton) { adminSignInButton.hidden = false; adminSignInButton.disabled = false; }
    if (adminSignOutButton) adminSignOutButton.hidden = true;
  }
  setAdminVisibility(status.isAdmin);
}

adminLoginOpen.addEventListener("click", () => {
  adminLoginModal.hidden = false;
  if (window.adminAuth) renderAdminState(window.adminAuth.state());
});
adminLoginClose.addEventListener("click", () => { adminLoginModal.hidden = true; });
adminLoginModal.addEventListener("click", event => {
  if (event.target === adminLoginModal) adminLoginModal.hidden = true;
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !adminLoginModal.hidden) adminLoginModal.hidden = true;
});
if (adminSignInButton) {
  adminSignInButton.addEventListener("click", async () => {
    adminLoginStatus.textContent = "GitHub'a yönlendiriliyorsunuz...";
    try { await window.adminAuth.signIn(); }
    catch (err) { adminLoginStatus.textContent = "Giriş başlatılamadı: " + (err && err.message ? err.message : err); }
  });
}
if (adminSignOutButton) {
  adminSignOutButton.addEventListener("click", async () => {
    await window.adminAuth.signOut();
    adminLoginStatus.textContent = "Çıkış yapıldı.";
    if (adminSignInButton) { adminSignInButton.hidden = false; adminSignInButton.disabled = false; }
    adminSignOutButton.hidden = true;
  });
}
if (window.adminAuth) window.adminAuth.onChange(renderAdminState);
setAdminVisibility(false);
document.querySelectorAll("[data-i18n]").forEach(element => {
  if (translations.tr[element.dataset.i18n]) element.innerHTML = translations.tr[element.dataset.i18n];
});
document.querySelectorAll("[data-menu-i18n]").forEach(element => {
  const menuText = menuTranslations.tr?.[element.dataset.menuI18n];
  if (menuText) element.innerHTML = menuText;
});

/* Statik metinler kaynak dosyada UTF-8 olarak onarildi; runtime yamasi kaldirildi. */

