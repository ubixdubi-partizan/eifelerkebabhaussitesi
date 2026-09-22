# Eifeler Kebaphaus · Monschau

Bağımlılıksız, tek sayfalık restoran sitesi. Sadece statik dosyalar: herhangi bir statik hosting (GitHub Pages, Netlify, Cloudflare Pages) üzerinde çalışır, derleme adımı yoktur.

## Dosyalar

| Dosya | Görev |
| --- | --- |
| `index.html` | Ana sayfa: hero, hikâye, menü widget'ı, galeri, konum, radyo bağlantısı, puanlama |
| `i18n.js` | 13 dilin arayüz ve menü çevirileri (tam UTF-8) |
| `script.js` | Menü filtresi/arama, dil değiştirme, lightbox, puanlama, yönetici modalı |
| `admin-config.js` | Yönetici girişi ayarları (Supabase bilgileri ve izinli GitHub hesapları) |
| `admin-auth.js` | GitHub OAuth ile yönetici oturumu ve yetki kontrolü |
| `storage.js` | Güvenli depolama katmanı; tarayıcı depolaması kapalıysa bellek içinde çalışır |
| `styles.css` | Tüm görsel stiller, kıvılcım animasyonları, responsive düzen |
| `reviews.html` / `reviews.js` | Fotoğraflı misafir yorumu gönderimi ve onay listesi |
| `landscapes.html` / `landscapes.js` / `landscapes.css` | Wikimedia Commons lisanslı manzara galerisi |
| `public/images/` | Restoran ve menü fotoğrafları |
| `CNAME`, `robots.txt`, `sitemap.xml`, `.nojekyll` | Alan adı ve SEO yapılandırması |

## Diller

Türkçe, Almanca, İngilizce, Fransızca, Hollandaca, Lüksemburgca, Lehçe, Danca, Çekçe, İtalyanca, İspanyolca, Arapça (RTL) ve Rusça. Metinler `i18n.js` içinde tutulur; yeni metin eklerken HTML tarafında `data-i18n` / `data-menu-i18n` anahtarını kullanın ve aynı anahtarı 13 dile de ekleyin.

## Yerelde çalıştırma

```bash
python -m http.server 8080
```

Ardından `http://localhost:8080` adresini açın.

## GitHub Pages ile yayınlama

1. Depoyu GitHub'a gönderin (varsayılan dal: `main`).
2. Depo → **Settings → Pages**: Source = "Deploy from a branch", Branch = `main`, klasör = `/ (root)`.
3. `CNAME` dosyası `www.eifelerkebabhaus.site` alan adını taşır. Alan adı sağlayıcısında (GoDaddy) `www` için `CNAME` kaydını `<kullanıcı-adı>.github.io` hedefine, kök alan adı için GitHub Pages'in A kayıtlarını girin.
4. Pages ekranında **Enforce HTTPS** kutusunu işaretleyin. DNS yayılımı birkaç saat sürebilir.
5. Kendi alan adını kullanmak istemezseniz `CNAME` dosyasını silin; site `<kullanıcı-adı>.github.io/<depo>` adresinden yayınlanır.

## Search Console

Site HTTPS üzerinden açıldıktan sonra: Search Console'a alan adı mülkü ekleyin, DNS TXT ile doğrulayın, `sitemap.xml` adresini gönderin ve ana sayfa için dizine ekleme isteyin. Doğrulama dosyası `google3edc7c6992745d3e.html` depoda hazırdır.

## Yönetici girişi (GitHub ile) — kurulum

Giriş, Supabase Auth'un ücretsiz katmanı üzerinden GitHub OAuth ile yapılır. Statik GitHub Pages ile uyumludur; kendi sunucunuzu kurmanız gerekmez. Şifre hiçbir zaman siteye girilmez, doğrulama GitHub tarafında olur. Yönetici izni yalnızca `admin-config.js` içindeki listede yazan GitHub kullanıcı adlarına verilir.

**1. GitHub OAuth uygulaması oluşturun**
GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
- Application name: `Eifeler Kebaphaus Admin`
- Homepage URL: `https://www.eifelerkebabhaus.site`
- Authorization callback URL: Supabase panelinde 2. adımda göreceğiniz `https://<proje>.supabase.co/auth/v1/callback`
Client ID ve "Generate a new client secret" ile oluşturduğunuz secret'ı kopyalayın. Bu secret yalnızca Supabase paneline girilir, depoya konmaz.

**2. Supabase projesi açın (ücretsiz)**
[supabase.com](https://supabase.com) → New project. Ardından Authentication → Providers → GitHub: Enable, Client ID ve Client Secret'ı yapıştırın, kaydedin. Aynı ekranda gösterilen callback URL'yi 1. adımdaki OAuth uygulamasına yazın.

Authentication → URL Configuration → Site URL: `https://www.eifelerkebabhaus.site`. Redirect URLs listesine şunları ekleyin:
`https://www.eifelerkebabhaus.site/**` ve test için `http://localhost:8080/**`.

**3. `admin-config.js` dosyasını doldurun**
```js
window.ADMIN_CONFIG = {
  supabaseUrl: "https://<proje>.supabase.co",
  supabaseAnonKey: "<anon public key>",
  allowedGithubLogins: ["ubixdubi"]
};
```
`anon public key` Project Settings → API ekranındadır; tarayıcıda kullanılmak üzere tasarlanmıştır, gizli anahtar değildir. Gizli olan `service_role` anahtarını asla depoya koymayın.

**4. Test edin**
Siteyi açın → başlıktaki yönetici düğmesi → "GitHub ile giriş yap". GitHub izin ekranından sonra siteye dönersiniz; listede olan hesapla girdiyseniz "Yönetici olarak giriş yapıldı: @kullanıcı" yazar ve `reviews.html` sayfasındaki onay paneli görünür. Listede olmayan bir hesapla girilirse yönetici paneli açılmaz.

Yapılandırma boş bırakılırsa giriş düğmesi devre dışı kalır ve modal "yapılandırılmadı" uyarısı gösterir; site geri kalan her yönüyle normal çalışır.

## İçerik ve telif notları

- Tripadvisor markası veya bağlantısı kullanılmaz; puanlar sitenin kendi arayüzündedir.
- Radyo bölümü stream gömmez, yalnızca Deutschlandfunk Kultur'un resmi sayfasına bağlantı verir.
- Manzara sayfası yalnızca lisansı doğrulanabilen CC BY / CC BY-SA / CC0 / kamu malı içerikleri gösterir; her kartta kaynak ve lisans yazar.
- Yorum fotoğrafları bu statik sürümde tarayıcı depolamasında tutulur ve 180 gün sonra silinir. Gerçek kullanıcılar için backend şarttır.
- Bu notlar hukuki danışmanlık değildir; yayın öncesi lisans, KVKK/GDPR ve fotoğraf izinlerini uzmanla doğrulayın.
