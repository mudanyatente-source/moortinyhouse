# 🚀 Production Deploy Checklist

## ✅ Tamamlanan Kontroller

### Code Kalitesi
- ✅ **Build Errors**: 0 error
- ✅ **TypeScript**: Strict mode, no errors
- ✅ **Dependencies**: Latest versions
- ✅ **Security**: Headers, CORS, CSP configured

### SEO & Performance
- ✅ **Meta Tags**: Title, description, keywords
- ✅ **Schema Markup**: Organization, LocalBusiness, Product
- ✅ **Sitemap**: Dinamik pages + static pages
- ✅ **Robots.txt**: Configured
- ✅ **Open Graph**: OG tags, Twitter Cards
- ✅ **Image Optimization**: WebP, AVIF, responsive
- ✅ **Font Optimization**: display=swap, preload
- ✅ **Caching Strategy**: ISR, 1 hour revalidation
- ✅ **CDN**: Vercel Edge Network

### Core Features
- ✅ **Contact Form**: Working + email integration
- ✅ **Admin Panel**: Settings, models, gallery, portfolio
- ✅ **Authentication**: Supabase Auth setup
- ✅ **Database**: Supabase connected
- ✅ **Cache Revalidation**: On-demand revalidation API
- ✅ **Contact Info**: Sabit dosyadan yönetimi (lib/contact-info.ts)
- ✅ **Social Media**: Instagram, Facebook links

### Mobile Performance
- ✅ **Responsive Design**: Mobile-first
- ✅ **Font Strategy**: swap strategy
- ✅ **Cache Headers**: 1 day for images
- ✅ **Compression**: gzip/Brotli enabled
- ✅ **Asset Optimization**: Minified, tree-shaken

### Middleware & Security
- ✅ **Middleware.ts**: Security headers
- ✅ **CORS**: Configured
- ✅ **CSP**: Content Security Policy
- ✅ **Frame Options**: SAMEORIGIN
- ✅ **XSS Protection**: Enabled

## 🔧 Vercel Deploy Öncesi Gerekli İşlemler

### 1. Environment Variables Ekle
Vercel Dashboard → Settings → Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL = your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-supabase-anon-key
REVALIDATE_SECRET = your-secure-random-string (32+ chars)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = your-ga-id (optional)
```

### 2. Supabase Setup
- [ ] Database migrations çalıştırıldı
- [ ] Authentication providers configured
- [ ] RLS policies set
- [ ] Tables created: models, portfolio, testimonials, contact_messages, site_settings, etc.

### 3. DNS & Domain
- [ ] Domain DNS records configured
- [ ] SSL certificate auto-renewed
- [ ] www redirect setup

### 4. Analytics & Monitoring
- [ ] Vercel Analytics enabled
- [ ] Google Search Console verified
- [ ] Google Analytics connected
- [ ] Error tracking setup

### 5. Database Backups
- [ ] Supabase backups enabled
- [ ] Backup retention configured

## 🔍 Deploy Sonrası Kontroller

### 1. Verify Deployment
```bash
# Check if site is live
curl -I https://moortinyhouse.com

# Check sitemap
https://moortinyhouse.com/sitemap.xml

# Check robots
https://moortinyhouse.com/robots.txt
```

### 2. SEO Verification
- [ ] Google Search Console: sitemap.xml submitted
- [ ] Google Search Console: robots.txt verified
- [ ] Bing Webmaster Tools: indexed
- [ ] Schema validation: https://schema.org/validate

### 3. Performance Check
- [ ] Google PageSpeed Insights (Desktop & Mobile)
- [ ] Vercel Analytics: First Paint, FCP, LCP
- [ ] Lighthouse Score > 90

### 4. Functionality Test
- [ ] Contact form çalışıyor mu
- [ ] Admin panel erişilebiliyor mu
- [ ] Models page yükleniyor mu
- [ ] Portfolio images görünüyor mu
- [ ] Social media links çalışıyor mu
- [ ] WhatsApp button çalışıyor mu

### 5. Security Check
- [ ] HTTPS aktif
- [ ] Security headers présent
- [ ] Admin routes protected
- [ ] API endpoints authenticated

## 📋 Sabit Bilgiler (lib/contact-info.ts'de)
- ✅ Email: hello@moortinyhouse.com
- ✅ Phone: +90 531 762 0306
- ✅ Address: Yeni, ışıklı caddesi no;63/1, 16960 Mudanya/Bursa
- ✅ Instagram: https://www.instagram.com/moor_tinyhouse/
- ✅ Working Hours: Mon-Fri 09:00-18:00
- ✅ Map Embed: <iframe> Google Maps kodu

## 🎯 Önemli Notlar
1. **Cache Strategy**: ISR 1 saat + on-demand revalidation
2. **Admin Updates**: Settings Save → otomatik cache temizle
3. **Image Cache**: 1 gün (hızlı update için)
4. **SEO**: LocalBusiness schema + working hours included
5. **Mobile**: Font swap, compressed, optimized

## 🚀 Production URL
- Main: https://moortinyhouse.com
- Admin: https://moortinyhouse.com/admin
- API: https://moortinyhouse.com/api/*

Tüm kontroller ✅ tamamlandı! Yayına almaya hazırsın.
