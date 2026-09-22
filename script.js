// script.js - Eifeler Kebaphaus main script
// Handles: menu tabs, search, lightbox, rating form, admin modal, radio player, mobile nav

(function () {
  "use strict";

  // === MOBILE NAV TOGGLE ===
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open);
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // === MENU TABS ===
  const menuTabs = document.querySelectorAll(".menu-tab");
  const menuPanels = document.querySelectorAll(".menu-category-panel");
  const menuSearchInput = document.querySelector("#menu-search-input");
  const menuSearchClear = document.querySelector(".menu-search-clear");

  function filterMenu() {
    if (!menuSearchInput) return;
    const query = menuSearchInput.value.trim().toLocaleLowerCase();
    const activeTab = document.querySelector(".menu-tab.active");
    const activeCategory = activeTab ? activeTab.dataset.menuCategory : "pizza";
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

  menuTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.menuCategory;
      menuTabs.forEach(item => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", active);
      });
      filterMenu();
    });
  });

  if (menuSearchInput) {
    menuSearchInput.addEventListener("input", filterMenu);
  }
  if (menuSearchClear) {
    menuSearchClear.addEventListener("click", () => {
      menuSearchInput.value = "";
      filterMenu();
      menuSearchInput.focus();
    });
  }

  // === LIGHTBOX ===
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightboxImage");
  if (lightbox && lightboxImage) {
    const lightboxClose = document.querySelector(".lightbox-close");
    document.querySelectorAll("[data-lightbox]").forEach(item => {
      item.addEventListener("click", () => {
        lightboxImage.src = item.dataset.lightbox;
        lightboxImage.alt = item.dataset.alt || "";
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
        if (lightboxClose) lightboxClose.focus();
      });
    });
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }
    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  // === RATING FORM ===
  const ratingForm = document.querySelector("#rating-form");
  const ratingStatus = document.querySelector("#rating-status");
  if (ratingForm) {
    ratingForm.addEventListener("submit", e => {
      e.preventDefault();
      const rating = Number(ratingForm.elements.rating.value);
      const savedMsg = (typeof I18N !== "undefined" && I18N[document.documentElement.lang] && I18N[document.documentElement.lang].ratingSaved)
        ? I18N[document.documentElement.lang].ratingSaved
        : "Teşekkürler - puanınız kaydedildi.";
      try {
        if (rating) localStorage.setItem("eifeler-kebaphaus-rating", String(rating));
        if (ratingStatus) ratingStatus.textContent = savedMsg;
      } catch (err) {
        if (ratingStatus) ratingStatus.textContent = savedMsg;
      }
    });
  }

  // === ADMIN MODAL ===
  const adminLoginOpen = document.querySelector("#admin-login-open");
  const adminLoginClose = document.querySelector("#admin-login-close");
  const adminLoginModal = document.querySelector("#admin-login-modal");
  const adminLoginStatus = document.querySelector("#admin-login-status");

  if (adminLoginOpen && adminLoginModal) {
    adminLoginOpen.addEventListener("click", () => {
      adminLoginModal.hidden = false;
      if (adminLoginStatus) {
        const lang = document.documentElement.lang;
        const msg = (typeof I18N !== "undefined" && I18N[lang] && I18N[lang].adminDesc) || "Güvenli giriş için GitHub OAuth ve backend gerekir.";
        adminLoginStatus.textContent = msg;
      }
    });
  }
  if (adminLoginClose && adminLoginModal) {
    adminLoginClose.addEventListener("click", () => {
      adminLoginModal.hidden = true;
    });
    adminLoginModal.addEventListener("click", e => {
      if (e.target === adminLoginModal) adminLoginModal.hidden = true;
    });
  }

  // === RADIO PLAYER ===
  const radioAudio = document.getElementById("radio-audio");
  const radioPlayBtn = document.getElementById("radio-play-btn");
  const radioChannelBtn = document.getElementById("radio-channel-btn");
  const radioPrevBtn = document.getElementById("radio-prev-btn");
  const radioChannelLabel = document.getElementById("radio-channel-label");
  const radioStationName = document.getElementById("radio-station-name");
  const radioStationDesc = document.getElementById("radio-station-desc");
  const radioLiveDot = document.getElementById("radio-live-dot");

  if (radioAudio && radioPlayBtn && radioChannelBtn) {
    let currentChannel = -1;
    let isPlaying = false;

    function updateStationDisplay() {
      if (currentChannel < 0) {
        if (radioStationName) radioStationName.textContent = (typeof I18N !== "undefined" && I18N[document.documentElement.lang] && I18N[document.documentElement.lang].radioNoChannel) || "Kanal seçilmedi";
        if (radioStationDesc) radioStationDesc.textContent = (typeof I18N !== "undefined" && I18N[document.documentElement.lang] && I18N[document.documentElement.lang].radioPressPlay) || "Başlamak için Play'e basın";
        if (radioChannelLabel) radioChannelLabel.textContent = "Kanal 0";
      } else {
        const station = RADIO_STATIONS[currentChannel];
        if (radioStationName) radioStationName.textContent = station.name;
        if (radioStationDesc) radioStationDesc.textContent = station.desc;
        if (radioChannelLabel) {
          const channelLabel = (typeof I18N !== "undefined" && I18N[document.documentElement.lang] && I18N[document.documentElement.lang].channelZero) || "Kanal";
          radioChannelLabel.textContent = channelLabel.replace("0", String(currentChannel + 1));
        }
      }
    }

    function switchChannel(direction) {
      if (typeof direction === 'number') {
        currentChannel = direction;
      } else {
        currentChannel = (currentChannel + 1) % RADIO_STATIONS.length;
      }
      const station = RADIO_STATIONS[currentChannel];
      radioAudio.src = station.url;
      updateStationDisplay();
      if (isPlaying) {
        radioAudio.play().catch(() => {
          // Stream failed - try next station
          if (radioStationDesc) radioStationDesc.textContent = (typeof I18N !== "undefined" && I18N[document.documentElement.lang] && I18N[document.documentElement.lang].radioStreamError) || "Stream yüklenemedi, tekrar deneyin";
        });
      }
    }

    radioPlayBtn.addEventListener("click", () => {
      if (!isPlaying) {
        if (currentChannel < 0) {
          // Auto-select first station
          currentChannel = 0;
          const station = RADIO_STATIONS[0];
          radioAudio.src = station.url;
          updateStationDisplay();
        }
        radioAudio.play().then(() => {
          isPlaying = true;
          radioPlayBtn.textContent = "⏸";
          radioPlayBtn.classList.add("playing");
          if (radioLiveDot) radioLiveDot.style.background = "#72b043";
        }).catch(() => {
          if (radioStationDesc) radioStationDesc.textContent = (typeof I18N !== "undefined" && I18N[document.documentElement.lang] && I18N[document.documentElement.lang].radioStreamError2) || "Stream yüklenemedi, başka kanal deneyin";
        });
      } else {
        radioAudio.pause();
        isPlaying = false;
        radioPlayBtn.textContent = "▶";
        radioPlayBtn.classList.remove("playing");
        if (radioLiveDot) radioLiveDot.style.background = "#ef674a";
      }
    });

    radioChannelBtn.addEventListener("click", () => {
      switchChannel();
    });

    if (radioPrevBtn) {
      radioPrevBtn.addEventListener("click", () => {
        if (currentChannel <= 0) {
          currentChannel = RADIO_STATIONS.length - 1;
        } else {
          currentChannel = currentChannel - 1;
        }
        const station = RADIO_STATIONS[currentChannel];
        radioAudio.src = station.url;
        updateStationDisplay();
        if (isPlaying) {
          radioAudio.play().catch(() => {
            if (radioStationDesc) radioStationDesc.textContent = (typeof I18N !== "undefined" && I18N[document.documentElement.lang] && I18N[document.documentElement.lang].radioStreamError) || "Stream yüklenemedi, tekrar deneyin";
          });
        }
      });
    }

    radioAudio.addEventListener("error", () => {
      if (radioStationDesc) radioStationDesc.textContent = (typeof I18N !== "undefined" && I18N[document.documentElement.lang] && I18N[document.documentElement.lang].radioStreamError2) || "Stream yüklenemedi, başka kanal deneyin";
      isPlaying = false;
      radioPlayBtn.textContent = "▶";
      radioPlayBtn.classList.remove("playing");
    });

    updateStationDisplay();
  }

})();
