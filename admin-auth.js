/* Google ile yönetici girişi — Supabase Auth (ücretsiz katman) üzerinden.
   Statik hosting (GitHub Pages) ile uyumludur: sunucu kodu gerektirmez.
   Kimlik doğrulaması Supabase'te yapılır; burada yalnızca oturumun Google
   e-posta adresi ADMIN_CONFIG.allowedEmails listesiyle karşılaştırılır. */
(function () {
  const CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
  const cfg = window.ADMIN_CONFIG || {};
  const listeners = [];
  const state = { ready: false, configured: false, client: null, isAdmin: false, login: null, error: null };

  const memoryStore = {
    getItem: key => window.siteStore ? window.siteStore.get(key) : null,
    setItem: (key, value) => { if (window.siteStore) window.siteStore.set(key, value); },
    removeItem: key => { if (window.siteStore) window.siteStore.set(key, ""); }
  };

  function emit() {
    listeners.forEach(fn => { try { fn(publicApi.state()); } catch (err) { /* dinleyici hatasi yoksayilir */ } });
  }

  function loadSdk() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const tag = document.createElement("script");
      tag.src = CDN;
      tag.onload = resolve;
      tag.onerror = () => reject(new Error("Supabase kütüphanesi yüklenemedi."));
      document.head.appendChild(tag);
    });
  }

  function googleEmailOf(session) {
    if (!session || !session.user) return null;
    const email = session.user.email || (session.user.user_metadata || {}).email || null;
    return email ? String(email).toLowerCase() : null;
  }

  function applySession(session) {
    const email = googleEmailOf(session);
    const allowed = (cfg.allowedEmails || []).map(item => String(item).toLowerCase());
    state.login = email;
    state.isAdmin = Boolean(email && allowed.includes(email));
    if (window.siteStore) window.siteStore.setSession("eifeler-admin", state.isAdmin ? "true" : "false");
    emit();
  }

  const publicApi = {
    state: () => ({
      ready: state.ready,
      configured: state.configured,
      isAdmin: state.isAdmin,
      login: state.login,
      error: state.error
    }),
    client: () => state.client,
    onChange(fn) { listeners.push(fn); if (state.ready) fn(publicApi.state()); },
    async signIn() {
      if (!state.client) throw new Error("Yönetici girişi henüz yapılandırılmadı.");
      const { error } = await state.client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + window.location.pathname }
      });
      if (error) throw error;
    },
    async signOut() {
      if (state.client) await state.client.auth.signOut();
      applySession(null);
    }
  };

  window.adminAuth = publicApi;

  (async function init() {
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      state.ready = true;
      state.configured = false;
      if (window.siteStore) window.siteStore.setSession("eifeler-admin", "false");
      emit();
      return;
    }
    try {
      await loadSdk();
      state.client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage: memoryStore }
      });
      state.configured = true;
      const { data } = await state.client.auth.getSession();
      state.ready = true;
      applySession(data ? data.session : null);
      state.client.auth.onAuthStateChange((_event, session) => applySession(session));
    } catch (err) {
      state.ready = true;
      state.configured = false;
      state.error = err && err.message ? err.message : String(err);
      emit();
    }
  })();
})();
