/* Yönetici girişi yapılandırması.
   Bu üç değeri doldurduğunuzda GitHub ile yönetici girişi çalışır.
   Kurulum adımları README.md > "Yönetici girişi" bölümünde. */
window.ADMIN_CONFIG = {
  // Supabase projenizin URL'si, örn. "https://abcdefgh.supabase.co"
  supabaseUrl: "",
  // Supabase > Project Settings > API > anon public key (gizli değildir, tarayıcıda kullanılır)
  supabaseAnonKey: "",
  // Yönetici izni verilecek GitHub kullanıcı adları (küçük harf). Sadece bunlar yönetici olur.
  allowedGithubLogins: ["ubixdubi"]
};
