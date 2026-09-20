# Eifeler Kebaphaus · Monschau

Yerel görsellerle hazırlanmış, bağımlılıksız ve responsive tek sayfalık restoran sitesi. `index.html` dosyası bir statik hosting'e yüklenerek çalışır; kullanıcı görselleri tarayıcıda yerel `public/images` yolundan sunulur ve üçüncü taraf servislere gönderilmez.

## Yerelde çalıştırma

Dosyayı doğrudan açabilir veya herhangi bir statik sunucu kullanabilirsiniz:

```bash
python -m http.server 8080
```

Sonra `http://localhost:8080` adresini açın. Menü ve galeri görselleri tıklanarak erişilebilir lightbox'ta açılır. Dil seçimi şu dillerde içerikleri değiştirir: Türkçe (`tr`), Almanca (`de`), İngilizce (`en`), Fransızca (`fr`), Hollandaca (`nl`), Lüksemburgca (`lb`), Lehçe (`pl`), Danca (`da`), Çekçe (`cs`), İtalyanca (`it`), İspanyolca (`es`), Arapça (`ar`) ve Rusça (`ru`). Arapça seçildiğinde sayfa RTL (sağdan sola) düzene geçer. Radyo otomatik başlamaz; yayın sağlayıcısı erişilemezse güvenilir harici Deutschlandfunk Kultur bağlantısı görünür.

## www.eifelerkebabhaus.site için GoDaddy notları

1. GoDaddy'de alan adının **DNS Yönetimi** ekranını açın. Hosting sağlayıcısının verdiği değerleri esas alın; doğrulanmamış bir IP'yi burada varsaymayın.
2. Hosting sağlayıcısının yönergelerine göre `www` için bir `CNAME` kaydı (çoğunlukla sağlayıcının verdiği hedefe) ve kök alan adı için sağlayıcının önerdiği `A`/`ALIAS` kaydını ekleyin. GoDaddy'nin varsayılan `www` kaydı çakışıyorsa kaldırıp sağlayıcı değerini kullanın.
3. Hosting panelinde `eifeler...site` alan adını ekleyin ve `index.html`, `styles.css`, `script.js` ile `public/images/` klasörünü yükleyin.
4. HTTPS/SSL'yi hosting panelinden etkinleştirin. DNS yayılımı birkaç saat sürebilir; `www.eifelerkebabhaus.site` ve kök alan adını ayrı ayrı kontrol edin.

Bu notlar yapılandırma yolunu açıklar; alan adının şu anda erişilebilir olduğu veya DNS/hosting'in doğrulandığı iddia edilmez.

## Google'da görünürlük ve Search Console

Site gerçek hosting'e yüklendikten ve HTTPS çalıştıktan sonra:

1. `https://search.google.com/search-console` adresinde Google hesabıyla oturum açın.
2. **Mülk ekle** seçeneğinden alan adı mülkü olarak `eifelerkebabhaus.site` ekleyin ve Google'ın verdiği DNS TXT kaydını GoDaddy DNS'e ekleyerek doğrulayın.
3. Doğrulama tamamlanınca **Sitem haritaları** bölümüne `https://www.eifelerkebabhaus.site/sitemap.xml` adresini gönderin.
4. **URL denetimi** bölümünde ana sayfanın HTTPS adresini test edip **Dizine eklenmesini iste** seçeneğini kullanın.
5. `robots.txt` dosyasının ve sitemap adresinin HTTPS üzerinden açıldığını kontrol edin.

Sitemap gönderilmezse Google siteyi yine keşfedebilir, ancak keşif ve güncellenme süreci gecikebilir; sitemap gönderimi indekslenmeyi garanti etmez. Alan adı ve hosting henüz doğrulanmadığı için bu işlem yerel dosyadan yapılamaz.

## Yönetici girişi ve backend

Güvenli olmayan sabit frontend kullanıcı adı/şifresi kaldırılmıştır. GitHub Pages yalnızca statik dosya sunduğu için gerçek yönetici girişi burada doğrulanamaz. Üretim için ayrı bir backend gerekir:

1. GitHub OAuth App oluşturulur; `client secret` yalnızca backend ortam değişkeninde tutulur.
2. Backend, GitHub hesabını doğrular ve yalnızca izin verilen GitHub kullanıcı adına yönetici rolü verir.
3. Backend güvenli, süreli bir oturum cookie'si üretir; yorum onaylama/silme işlemleri backend API üzerinden yapılır.
4. Yorumlar veritabanında tutulur; fotoğraf yüklemeleri boyut, tür ve yemek içeriği politikasıyla denetlenir.

Bu statik sürümde yönetici işlemleri bilerek etkin değildir; ziyaretçiler misafir olarak siteyi kullanır. GitHub Pages'e gizli anahtar veya şifre eklenmemelidir.

## Yayın öncesi içerik ve telif politikası

- Tripadvisor bağlantısı veya markası kullanılmaz; ziyaretçi puanları bu sitenin kendi yerel arayüzündedir.
- Radyo gömülü stream çalıştırmaz; yalnızca Deutschlandfunk Kultur'un resmi harici sayfasına bağlantı verir. Ticari işletmede yayın haklarını ayrıca doğrulayın.
- Manzara sayfası yalnızca Wikimedia Commons'tan lisans ve katkıcı bilgisi doğrulanabilen CC BY/CC BY-SA/CC0/public domain içerikleri göstermeyi dener; her kartta kaynak ve lisans yazılır. API veya lisans doğrulaması başarısızsa görsel gösterilmez.
- Yorum fotoğrafı zorunludur ve gönderici fotoğrafın yalnızca yemek içerdiğini, yayınlama hakkına sahip olduğunu ve tanımlanabilir kişi içermediğini onaylar. Yorumlar bu statik sürümde tarayıcı depolamasındadır; 180 günlük geçici saklama uygulanır. Gerçek kullanıcılar ve güvenli yönetim için backend gereklidir.
- Bu teknik önlemler hukuki danışmanlık değildir; yayın öncesi lisans, KVKK/GDPR, fotoğraf izni ve kamuya açık radyo kullanımı bir hukuk uzmanıyla doğrulanmalıdır.
