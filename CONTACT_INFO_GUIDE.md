# Contact Bilgileri Yönetimi

## Genel Bilgi

Contact bilgileri (email, telefon, adres) artık **sabit olarak** `lib/contact-info.ts` dosyasında tutulmaktadır.

Admin paneldeki Settings kısmında bu bilgileri **sadece görüntüleyebilir** ama **düzenleyemezsiniz**. İçin aynı zamanda database'de de sabit tutulur ve güncellenebilir olacak şekilde ayarlanmış.

## Contact Bilgilerini Güncelleme

Contact bilgilerini güncellemek için `lib/contact-info.ts` dosyasını açıp, gerekli değişiklikleri yapın:

```typescript
// lib/contact-info.ts
export const contactInfo = {
  email: 'hello@moortinyhouse.com',      // ← Email adresini buradan değiştirin
  phone: '+1 (555) 123-4567',           // ← Telefon numarasını buradan değiştirin
  address: 'Portland, Oregon',          // ← Adresi buradan değiştirin
  phone_display: '+1 (555) 123-4567',
}

export const companyInfo = {
  name_tr: 'Moortinyhouse',
  name_en: 'Moortinyhouse',
}
```

## Dosya Yapısı

- **lib/contact-info.ts** - Contact bilgilerinin sabit tutulduğu dosya
- **lib/site-settings-shared.ts** - contact-info.ts'ten verileri okuyan default settings

## Admin Panel

Admin panelinde Settings → Şirket Bilgileri bölümüne gidince:

- **Email** - 🔒 Dosyadan yönetilir (salt okunur)
- **Telefon** - 🔒 Dosyadan yönetilir (salt okunur) 
- **Adres** - 🔒 Dosyadan yönetilir (salt okunur)

Bu alanlar grayed out (gri) olarak gösterilir ve tıklanamaz.

## Nerede Kullanılıyor?

Contact bilgileri aşağıdaki yerlerde kullanılmaktadır:

1. **Contact Sayfası** (`app/contact/contact-client.tsx`)
   - Email, telefon, adres bilgileri gösterilir
   - WhatsApp button'unda telefon numarası kullanılır

2. **Footer** (`components/footer.tsx`)
   - Sosyal medya linklerini gösterir

3. **Admin Settings Panel** (`components/admin/settings-panel.tsx`)
   - Contact bilgilerini salt okunur olarak gösterir

4. **SEO Schema** (`components/seo-schema.tsx`)
   - Arama motorları için company info'yu kullanır

## Veritabanı

Contact bilgileri hem `contact-info.ts` dosyasında hem de Supabase database'de tutulur. 
Default değerler `lib/site-settings-shared.ts`'ten gelir.

Database'de override etmek istersen: `site_settings` tablosunda `company_info` key'ine yeni değer yazabilirsin, 
ancak **dosyada sabit tut** proje için en iyi çalışmadır.
