# Modelleri Veritabanına Aktarma Rehberi

## Sorun
Sitede modeller hardcoded olarak `app/models/page.tsx` dosyasında tanımlanmıştı ve admin panelinde görünmüyordu.

## Çözüm
1. Models sayfası artık veritabanından modelleri çekiyor
2. Admin paneli tüm modelleri (gizli olanlar dahil) gösteriyor
3. Modelleri veritabanına aktarmak için SQL script hazırlandı

## Adımlar

### 1. SQL Script'i Çalıştırın
Supabase SQL Editor'da `scripts/003_seed_models.sql` dosyasını çalıştırın. Bu script 6 modeli veritabanına ekleyecek:
- Aura
- Nova
- Zen
- Horizon
- Terra
- Lux

### 2. Admin Panelini Kontrol Edin
- `/admin` sayfasına gidin
- "Modeller" sekmesine tıklayın
- Artık tüm modeller görünür olmalı
- Modelleri düzenleyebilir, silebilir veya yeni model ekleyebilirsiniz

### 3. Models Sayfasını Kontrol Edin
- `/models` sayfasına gidin
- Modeller veritabanından çekiliyor olmalı
- Sadece `is_visible = true` olan modeller görünür

## Önemli Notlar

- **Hotspots**: Hotspots özelliği şu an veritabanında yok. İsterseniz daha sonra `specifications` JSONB alanına eklenebilir.
- **Features**: Features artık veritabanından geliyor ve admin panelinden düzenlenebilir.
- **Görseller**: Model görselleri admin panelinden yüklenebilir veya URL ile eklenebilir.

## Yeni Model Ekleme

1. Admin paneline gidin (`/admin`)
2. "Modeller" sekmesine tıklayın
3. "Yeni Model Ekle" butonuna tıklayın
4. Formu doldurun:
   - Model adı (Türkçe ve İngilizce) - Zorunlu
   - Açıklama (Türkçe ve İngilizce) - Zorunlu
   - Fotoğraf yükleyin veya URL girin
   - Özellikleri ekleyin (her satıra bir özellik)
   - Fiyat, boyut, yatak odası, banyo sayısı gibi bilgileri girin
5. "Kaydet" butonuna tıklayın

Model otomatik olarak sitede görünür hale gelecektir (eğer `is_visible = true` ise).
