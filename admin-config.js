/* Yönetici girişi yapılandırması.
   Bu değerleri doldurduğunuzda Google ile yönetici girişi çalışır.
   Kurulum adımları README.md > "Yönetici girişi" bölümünde. */
window.ADMIN_CONFIG = {
  // Supabase projenizin URL'si
  supabaseUrl: "https://uwdwavstozljufbwgftr.supabase.co",
  // Supabase > Project Settings > API > anon public key (gizli değildir, tarayıcıda kullanılır)
  supabaseAnonKey: "sb_publishable_fLz1lc9XRv1DWN1H3Vrz7w_YwL5sjio",
  // Yönetici izni verilecek Google e-posta adresleri (küçük harf). Sadece bunlar yönetici olur.
  allowedEmails: ["ubixdubi@gmail.com"]
};
