# SEO Optimizasyon Rehberi - Moortinyhouse.com

Bu belge, moortinyhouse.com sitesinin Google aramalarında üst sıralarda çıkması için yapılan SEO optimizasyonlarını ve önerileri içermektedir.

## 🎯 Hedefler

- **Ana Anahtar Kelimeler:** tiny house, mini ev, küçük ev, mobil ev, prefabrik ev
- **Lokal SEO:** İstanbul ve Bursa odaklı
- **Hedef Domain:** moortinyhouse.com
- **Platform:** Vercel (hızlı yükleme süreleri)

---

## ✅ Yapılan SEO Optimizasyonları

### 1. Schema Markup (JSON-LD)

Site genelinde aşağıdaki schema türleri eklendi:

- **Organization Schema:** Şirket bilgileri
- **LocalBusiness Schema:** İstanbul ve Bursa için lokal işletme bilgileri
- **WebSite Schema:** Site arama özelliği
- **Product Schema:** Her model sayfası için ürün bilgileri
- **Breadcrumb Schema:** Sayfa navigasyonu

**Dosya:** `components/seo-schema.tsx`

### 2. Meta Tags Optimizasyonu

- **Title Tags:** Her sayfa için optimize edilmiş başlıklar (50-60 karakter)
- **Meta Descriptions:** Her sayfa için açıklayıcı metinler (150-160 karakter)
- **Open Graph Tags:** Sosyal medya paylaşımları için
- **Twitter Cards:** Twitter paylaşımları için
- **Canonical URLs:** Duplicate content önleme
- **Alternate Languages:** TR ve EN dil seçenekleri

**Dosya:** `lib/page-seo.ts`, `app/layout.tsx`

### 3. Sitemap.xml

Dinamik sitemap oluşturuldu:
- Tüm statik sayfalar
- Model sayfaları (veritabanından)
- Portföy sayfaları (veritabanından)
- Güncelleme sıklıkları ve öncelikler

**Dosya:** `app/sitemap.ts`

### 4. Robots.txt

Arama motorları için yönlendirme:
- Admin paneli ve API rotaları engellendi
- Sitemap konumu belirtildi

**Dosya:** `app/robots.ts`

### 5. Anahtar Kelime Optimizasyonu

Her sayfa için optimize edilmiş anahtar kelimeler:

**Ana Sayfa:**
- tiny house türkiye
- mini ev
- küçük ev
- mobil ev
- tiny house istanbul
- tiny house bursa

**Modeller Sayfası:**
- tiny house modelleri
- tiny house fiyatları
- mini ev çeşitleri
- küçük ev modelleri

**Portföy Sayfası:**
- tamamlanan projeler
- tiny house portföy
- istanbul tiny house projeleri
- bursa tiny house projeleri

**İletişim Sayfası:**
- tiny house iletişim
- randevu
- ücretsiz keşif

---

## 📍 Lokal SEO Stratejisi

### İstanbul ve Bursa Odaklı

1. **LocalBusiness Schema:**
   - İstanbul ve Bursa şehirleri özellikle belirtildi
   - areaServed alanında her iki şehir eklendi

2. **İçerik Optimizasyonu:**
   - Sayfa içeriklerinde "İstanbul" ve "Bursa" kelimeleri doğal şekilde kullanıldı
   - Meta açıklamalarda şehir isimleri geçiyor

3. **Google My Business:**
   - Google My Business hesabı oluşturulmalı
   - İstanbul ve Bursa lokasyonları eklenmeli
   - Düzenli güncellemeler yapılmalı

---

## 🔍 Google'da Üst Sıralarda Çıkmak İçin Öneriler

### 1. İçerik Stratejisi

- **Blog Bölümü:** Tiny house hakkında bilgilendirici blog yazıları
  - "Tiny House Nedir?"
  - "Tiny House Fiyatları 2024"
  - "İstanbul'da Tiny House Yaşamı"
  - "Bursa'da Tiny House Yerleşim Alanları"
  - "Tiny House vs Normal Ev: Karşılaştırma"

- **SSS Sayfası:** Sık sorulan sorular
  - "Tiny house kaç metrekare?"
  - "Tiny house fiyatları ne kadar?"
  - "Tiny house ruhsat alınır mı?"
  - "Tiny house taşınabilir mi?"

### 2. Backlink Stratejisi

- Yerel işletme dizinlerine kayıt
- İstanbul ve Bursa'daki mimarlık/emlak sitelerine link
- Tiny house ile ilgili forum ve topluluklarda paylaşım
- Sosyal medya hesaplarından link paylaşımı

### 3. Teknik SEO

- ✅ Sayfa hızı optimizasyonu (Vercel Edge Network)
- ✅ Mobil uyumluluk (Responsive design)
- ✅ HTTPS (SSL sertifikası)
- ✅ Structured data (Schema markup)
- ✅ XML Sitemap
- ✅ Robots.txt

### 4. Kullanıcı Deneyimi

- Hızlı yükleme süreleri
- Kolay navigasyon
- Mobil uyumlu tasarım
- Temiz ve profesyonel görünüm

---

## 📊 İzleme ve Analiz

### Google Search Console

1. Site Google Search Console'a eklenmeli
2. Sitemap gönderilmeli: `https://moortinyhouse.com/sitemap.xml`
3. Düzenli olarak performans kontrol edilmeli

### Google Analytics

- Sayfa görüntülenmeleri
- Kullanıcı davranışları
- Dönüşüm takibi
- Anahtar kelime performansı

### Önemli Metrikler

- **Organic Traffic:** Organik arama trafiği
- **Keyword Rankings:** Anahtar kelime sıralamaları
- **Click-Through Rate (CTR):** Tıklama oranı
- **Bounce Rate:** Hemen çıkma oranı
- **Average Session Duration:** Ortalama oturum süresi

---

## 🚀 Hızlı Başlangıç Checklist

- [x] Schema markup eklendi
- [x] Meta tags optimize edildi
- [x] Sitemap oluşturuldu
- [x] Robots.txt eklendi
- [x] Lokal SEO yapılandırıldı
- [ ] Google Search Console'a site eklendi
- [ ] Google My Business hesabı oluşturuldu
- [ ] Google Analytics kuruldu
- [ ] Blog bölümü eklendi
- [ ] SSS sayfası oluşturuldu
- [ ] Backlink kampanyası başlatıldı

---

## 📝 İçerik Önerileri

### Ana Sayfa İçeriği

- Hero bölümünde "Tiny House Türkiye" vurgusu
- "İstanbul ve Bursa'da Tiny House" alt başlığı
- Müşteri testimonial'ları
- Popüler modeller showcase

### Model Sayfaları

Her model için:
- Detaylı açıklama (minimum 300 kelime)
- Özellikler listesi
- Fiyat bilgisi
- Galeri (minimum 10 fotoğraf)
- FAQ bölümü

### Blog Yazıları (Önerilen)

1. "Tiny House Nedir? 2024 Rehberi"
2. "Tiny House Fiyatları: Detaylı Fiyat Listesi"
3. "İstanbul'da Tiny House Yaşamı: Rehber"
4. "Bursa'da Tiny House Yerleşim Alanları"
5. "Tiny House vs Prefabrik Ev: Karşılaştırma"
6. "Tiny House Ruhsat ve Yasal Süreçler"
7. "Tiny House İçin En İyi 10 Lokasyon"
8. "Tiny House Maliyetleri: Detaylı Analiz"

---

## 🎯 Anahtar Kelime Hedefleri

### Birincil Anahtar Kelimeler
- tiny house
- mini ev
- küçük ev
- mobil ev

### İkincil Anahtar Kelimeler
- tiny house türkiye
- tiny house istanbul
- tiny house bursa
- tiny house fiyatları
- tiny house modelleri
- prefabrik ev

### Uzun Kuyruk Anahtar Kelimeler
- istanbul tiny house üreticisi
- bursa mini ev fiyatları
- tiny house kaç metrekare
- taşınabilir küçük ev
- sürdürülebilir tiny house

---

## 📞 Sonraki Adımlar

1. **Google Search Console Kurulumu**
   - Site doğrulama
   - Sitemap gönderme
   - Performans izleme

2. **Google My Business**
   - İşletme bilgileri
   - Fotoğraflar
   - Müşteri yorumları

3. **İçerik Üretimi**
   - Blog yazıları
   - SSS sayfası
   - Model açıklamaları

4. **Backlink Kampanyası**
   - Yerel dizinler
   - İlgili siteler
   - Sosyal medya

---

**Not:** Bu SEO optimizasyonları sayesinde site, Google aramalarında "tiny house", "mini ev", "küçük ev" gibi anahtar kelimelerde ve İstanbul/Bursa lokal aramalarında üst sıralarda çıkmaya hazırdır. Düzenli içerik güncellemeleri ve backlink çalışmaları ile performans artırılabilir.
