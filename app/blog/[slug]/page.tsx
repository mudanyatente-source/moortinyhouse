import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostClient from './blog-post-client'

// Helper function to convert Turkish date string to ISO date
function getTurkishDateAsISO(dateStr: string): string {
  const months: Record<string, string> = {
    'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04',
    'Mayıs': '05', 'Haziran': '06', 'Temmuz': '07', 'Ağustos': '08',
    'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
  }
  
  // Expected format: "25 Ocak 2026"
  const parts = dateStr.split(' ')
  if (parts.length !== 3) return new Date().toISOString().split('T')[0]
  
  const day = parts[0].padStart(2, '0')
  const monthName = parts[1]
  const year = parts[2]
  const month = months[monthName] || '01'
  
  return `${year}-${month}-${day}`
}

// Remove dynamic = 'force-dynamic' to allow static generation with generateStaticParams

const blogPosts = [
  {
    id: 1,
    title: "Tiny House Nedir? 2026 Kapsamlı Rehberi",
    excerpt: "Tiny house kavramını detaylı bir şekilde açıklıyoruz. Minimalist yaşam, sürdürülebilir konut, emekliler ve genç profesyoneller için ideal küçük ev yaşamının avantajlarını keşfedin.",
    date: "25 Ocak 2026",
    readTime: "5 dk",
    category: "Rehber",
    slug: "tiny-house-nedir-kapsamli-rehber",
    featuredImage: "/beautiful-modern-tiny-house-in-nature-forest-setti.webp",
    content: `
## Tiny House Nedir?

Tiny house, Türkçe'de "minik ev" veya "küçük ev" olarak da bilinen, genellikle 20-60 metrekare arasında değişen kompakt yaşam alanlarıdır. Bu evler, minimalist yaşam felsefesini benimseyen, sürdürülebilir bir yaşam tarzı arayan ve gereksiz tüketimden kaçınan kişiler için tasarlanmıştır.

## Tiny House Kimler İçin İdeal?

### Emekliler ve 50+ Yaş Grubu
Tiny house sahiplerinin %39'u 50 yaş üstü kişilerden oluşmaktadır. Düşük bakım maliyetleri, basit yaşam ve konforlu küçük alanlar emekliler için idealdir.

### Genç Profesyoneller (30 Yaş Altı)
Finansal özgürlük arayan, yüksek konut kredilerinden kaçınan genç nesil için ekonomik bir alternatif sunmaktadır.

### Doğa Severler ve Minimalistler
Doğa ile iç içe yaşam, çevre bilinci yüksek kişiler ve minimalist yaşam tarzını benimseyenler için perfect bir seçenektir.

## Tiny House'un Avantajları

### 1. Ekonomik Avantajlar
- **Düşük satın alma maliyeti:** Geleneksel evlere kıyasla çok daha uygun fiyatlar
- **Düşük işletme maliyetleri:** Enerji faturaları, vergiler ve bakım masrafları minimal
- **Finansal özgürlük:** Konut kredisi borcundan kurtulma imkanı

### 2. Çevresel Avantajlar
- **Düşük karbon ayak izi:** Daha az enerji tüketimi
- **Sürdürülebilir malzemeler:** Çevre dostu yapı malzemeleri kullanımı
- **Minimal atık:** Küçük alan, daha az tüketim anlamına gelir

### 3. Yaşam Tarzı Avantajları
- **Basit yaşam:** Gereksiz eşyalardan arınma
- **Taşınabilirlik:** Bazı modeller istediğiniz yere taşınabilir
- **Doğa ile iç içe:** Genellikle doğal alanlarda konumlanır

## Tiny House Kullanım Alanları

1. **Ana konut:** Tam zamanlı yaşam için
2. **Yazlık / Tatil evi:** Hafta sonu kaçamağı için
3. **Hobi bahçesi evi:** Tarımsal faaliyetler için
4. **Emeklilik evi:** Sakin ve bakımı kolay yaşam için
5. **Misafir evi:** Aileniz için ek konaklama
6. **Home office:** Evden çalışma alanı

## Türkiye'de Tiny House

Türkiye'de tiny house sektörü hızla büyümektedir. İstanbul ve Bursa başta olmak üzere birçok şehirde tiny house üreticileri ve yerleşim alanları bulunmaktadır. Moortinyhouse olarak İstanbul ve Bursa'da profesyonel tiny house çözümleri sunuyoruz.

## Sonuç

Tiny house, sadece bir ev tipi değil, aynı zamanda bir yaşam felsefesidir. Daha az eşya, daha az borç ve daha fazla özgürlük arayanlar için ideal bir seçenektir.

---

*Tiny house hakkında daha fazla bilgi almak ve modelleri incelemek için [Modeller](/models) sayfamızı ziyaret edebilirsiniz.*
    `
  },
  {
    id: 2,
    title: "Tiny House Fiyatları 2026: Detaylı Fiyat Listesi",
    excerpt: "2026 yılı tiny house fiyatları hakkında kapsamlı bilgi. Ekonomik mini ev modelleri, premium seçenekler, finansman ve yatırım avantajları.",
    date: "22 Ocak 2026",
    readTime: "7 dk",
    category: "Fiyatlandırma",
    slug: "tiny-house-fiyatlari-detayli-fiyat-listesi",
    featuredImage: "/luxury-premium-tiny-house-modern-architecture-high.webp",
    content: `
## Tiny House Fiyatları 2026

Tiny house fiyatları, boyut, malzeme kalitesi, özellikler ve marka gibi birçok faktöre göre değişiklik göstermektedir. Bu rehberde, 2026 yılı için güncel tiny house fiyatlarını ve nelerin fiyatı etkilediğini detaylı olarak inceleyeceğiz.

## Fiyat Aralıkları

### Temel Modeller (500.000 - 900.000 TL)
- 20-30 m² alan
- Standart malzemeler
- Temel mutfak ve banyo
- 1 yatak odası

### Orta Segment (900.000 - 1.500.000 TL)
- 30-45 m² alan
- Kaliteli malzemeler
- Tam donanımlı mutfak
- 1-2 yatak odası
- Enerji verimli sistemler

### Premium Modeller (1.500.000 - 3.000.000 TL)
- 45-60 m² alan
- Premium malzemeler
- Akıllı ev sistemleri
- 2-3 yatak odası
- Güneş paneli ve off-grid sistemler
- Özel tasarım seçenekleri

## Fiyatı Etkileyen Faktörler

### 1. Boyut
Metrekare başına fiyat genellikle 25.000-50.000 TL arasında değişmektedir.

### 2. Malzeme Kalitesi
- **Ekonomik malzemeler:** Daha uygun fiyat
- **Premium malzemeler:** Daha yüksek fiyat, uzun ömür

### 3. Özellikler ve Donanım
- Tam donanımlı mutfak
- Banyo kalitesi
- Isıtma sistemi
- Akıllı ev sistemleri

## Yatırım Değeri

Tiny house, artan konut fiyatları karşısında akıllı bir yatırım alternatifidir. Özellikle yazlık, tatil evi veya Airbnb için kiralamak isteyenler için cazip getiri potansiyeli sunar.

## Sonuç

Tiny house, geleneksel konut seçeneklerine göre çok daha ekonomik bir alternatiftir.

---

*Güncel fiyat bilgisi için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  },
  {
    id: 3,
    title: "İstanbul'da Tiny House Yaşamı: 2026 Rehberi",
    excerpt: "İstanbul'da tiny house yaşamak için en uygun bölgeler. Şile, Çatalca, Beykoz yerleşim alanları, yasal süreçler ve doğada yaşam fırsatları.",
    date: "20 Ocak 2026",
    readTime: "6 dk",
    category: "Lokal Rehber",
    slug: "istanbulda-tiny-house-yasami-rehber",
    featuredImage: "/sustainable-forest-trees-aerial-view-green-nature.webp",
    content: `
## İstanbul'da Tiny House Yaşamı

İstanbul, Türkiye'nin en kalabalık ve en pahalı şehri olarak bilinir. Bu durum, alternatif yaşam alanları arayan birçok kişiyi tiny house seçeneğine yönlendirmektedir.

## İstanbul'da Tiny House Yerleşim Alanları

### 1. Şile ve Ağva Bölgesi
- Doğa ile iç içe yaşam
- Deniz kenarı konumu
- Uygun arazi fiyatları
- Hafta sonu kaçamağı için ideal

### 2. Çatalca ve Silivri
- Geniş arazi seçenekleri
- Tarım alanları ve hobi bahçeleri
- Sakin yaşam ortamı
- İstanbul merkezine kolay ulaşım

### 3. Beykoz ve Polonezköy Civarı
- Orman içi konumlar
- Elit tiny house köyleri
- Doğa ve şehir dengesi

## Neden İstanbul Çevresi?

- Şehir hayatına yakınlık
- Doğada huzurlu yaşam
- Yatırım potansiyeli
- Emeklilik için ideal

## Sonuç

İstanbul'da tiny house yaşamak, doğru planlama ile mümkündür.

---

*Detaylı bilgi için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  },
  {
    id: 4,
    title: "Bursa'da Tiny House Yerleşim Alanları 2026",
    excerpt: "Bursa, Mudanya, Uludağ ve İznik çevresinde tiny house için en uygun yerleşim alanları. Hobi bahçesi, yazlık ve emeklilik için ideal lokasyonlar.",
    date: "18 Ocak 2026",
    readTime: "5 dk",
    category: "Lokal Rehber",
    slug: "bursada-tiny-house-yerlesim-alanlari",
    featuredImage: "/eco-tiny-house-earth-integrated-green-roof-natural.webp",
    content: `
## Bursa'da Tiny House Yerleşim Alanları

Bursa, doğal güzellikleri, ılıman iklimi ve İstanbul'a yakınlığı ile tiny house yaşamı için ideal bir şehirdir. Moortinyhouse ana üretim tesisimiz Mudanya'da bulunmaktadır.

## En Uygun Bölgeler

### 1. Uludağ Etekleri
- Dağ havası ve orman
- Yaz-kış farklı güzellikler
- Kayak sezonu avantajı

### 2. Mudanya ve Çevresi
- Deniz manzarası
- İstanbul feribotu ile kolay ulaşım
- Zeytinlik alanları
- Hobi bahçesi için ideal

### 3. İznik ve Göl Çevresi
- Göl manzarası
- Tarihi atmosfer
- Sakin yaşam

### 4. Gemlik ve Armutlu
- Termal turizm
- Zeytincilik bölgesi
- Yazlık tiny house için popüler

## Bursa'nın Avantajları

- İstanbul'a 2 saat mesafe
- Uygun arazi fiyatları
- Dört mevsim yaşanabilir iklim
- Zengin doğal güzellikler

## Sonuç

Bursa, tiny house yaşamı için Türkiye'nin en uygun şehirlerinden biridir.

---

*Detaylı bilgi için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  },
  {
    id: 5,
    title: "Tiny House vs Prefabrik Ev: 2026 Karşılaştırma",
    excerpt: "Tiny house ve prefabrik ev arasındaki farklar nelerdir? Minimalist yaşam, maliyet, sürdürülebilirlik ve taşınabilirlik açısından detaylı karşılaştırma.",
    date: "15 Ocak 2026",
    readTime: "8 dk",
    category: "Karşılaştırma",
    slug: "tiny-house-vs-prefabrik-ev-karsilastirma",
    featuredImage: "/modern-tiny-house-showroom-interior.webp",
    content: `
## Tiny House vs Prefabrik Ev

Alternatif konut seçenekleri arasında en popüler iki seçenek olan tiny house ve prefabrik evler, farklı ihtiyaç ve beklentilere hitap etmektedir.

## Temel Farklar

### Tiny House
- Genellikle 20-60 m²
- Minimalist yaşam felsefesi
- Taşınabilir seçenekler mevcut
- Özel tasarım ve el işçiliği
- Yüksek kalite malzemeler
- Sürdürülebilir ve ekolojik

### Prefabrik Ev
- Genellikle 50-200 m²
- Geleneksel ev konsepti
- Sabit yapı
- Seri üretim
- Standart malzemeler

## Hangi Durumda Hangisi?

**Tiny House Tercih Edilmeli:**
- Minimalist yaşam isteyenler
- Tek başına veya çift yaşayanlar
- Emekliler
- Yazlık/tatil evi arayanlar
- Çevre bilinci yüksek olanlar

**Prefabrik Ev Tercih Edilmeli:**
- Kalabalık aileler
- Daha fazla alan ihtiyacı
- Geleneksel ev konsepti isteyenler

## Sonuç

Seçim, kişisel ihtiyaçlarınıza ve bütçenize bağlıdır.

---

*Her iki seçenek hakkında bilgi için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  },
  {
    id: 6,
    title: "Tiny House Ruhsat ve Yasal Süreçler 2026",
    excerpt: "Tiny house için ruhsat alma süreci, imar izni, O2 belgesi ve yasal gereklilikler. Türkiye'deki güncel mevzuat ve pratik bilgiler.",
    date: "12 Ocak 2026",
    readTime: "6 dk",
    category: "Yasal",
    slug: "tiny-house-ruhsat-ve-yasal-surecler",
    featuredImage: "/craftsman-building-tiny-house-workshop.webp",
    content: `
## Tiny House Ruhsat ve Yasal Süreçler

Tiny house satın almadan önce yasal süreçleri anlamak çok önemlidir. Bu rehberde 2026 yılı itibarıyla güncel yasal durumu açıklıyoruz.

## Türkiye'de Tiny House Yasal Durumu

Türkiye'de tiny house'lar için özel bir yasal düzenleme henüz bulunmamaktadır. Genel imar ve yapı mevzuatı çerçevesinde değerlendirilmektedir.

### Önemli Belgeler

- **İmar Durumu Belgesi:** Arazinin kullanım amacını gösterir
- **O2 Belgesi:** Tarım arazileri için gerekli
- **Yapı Ruhsatı:** Belediyeden alınır
- **İskan Belgesi:** Oturma izni

## Ruhsat Alma Süreci

1. İmar Durumu Kontrolü
2. Proje Hazırlığı
3. Belediye Başvurusu
4. Ruhsat Alımı
5. İnşaat ve Denetim

## Arazi Tipleri

- **İmarlı arazi:** Yapı ruhsatı alınabilir
- **Tarım arazisi:** O2 belgesi gerekli
- **Orman arazisi:** Özel izinler gerekli

## Moortinyhouse Desteği

Moortinyhouse olarak müşterilerimize yasal süreçlerde danışmanlık desteği sunuyoruz. Arazi seçiminden ruhsat sürecine kadar yanınızdayız.

## Sonuç

Doğru planlama ve profesyonel destek ile yasal süreçler başarılı şekilde tamamlanabilir.

---

*Yasal süreçler hakkında danışmanlık için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  }
]

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı | Moortinyhouse',
    }
  }
  
  const publishedDate = getTurkishDateAsISO(post.date)

  const categoryKeywords: Record<string, string[]> = {
    'Rehber': ['tiny house rehberi', 'mini ev rehberi', 'küçük ev kılavuzu'],
    'Fiyatlandırma': ['tiny house fiyatları', 'mini ev fiyatları', 'tiny house maliyet'],
    'Lokal Rehber': ['istanbul tiny house', 'bursa tiny house', 'tiny house lokasyon'],
    'Karşılaştırma': ['tiny house vs prefabrik', 'mini ev karşılaştırma'],
    'Yasal': ['tiny house ruhsat', 'tiny house izin', 'mini ev yasal']
  }

  return {
    title: `${post.title} | Moortinyhouse Blog`,
    description: post.excerpt,
    keywords: [
      'tiny house',
      'mini ev',
      'küçük ev',
      post.category.toLowerCase(),
      ...(categoryKeywords[post.category] || []),
      'emekli tiny house',
      'yazlık tiny house',
      'moortinyhouse',
      'blog'
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: publishedDate,
      authors: ['Moortinyhouse'],
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : undefined
    },
    alternates: {
      canonical: `https://moortinyhouse.com/blog/${slug}`
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    notFound()
  }
  
  const publishedDate = getTurkishDateAsISO(post.date)
  
  // Article Schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://moortinyhouse.com/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? `https://moortinyhouse.com${post.featuredImage}` : 'https://moortinyhouse.com/og-image.jpg',
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Organization',
      name: 'Moortinyhouse',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moortinyhouse.com/icon.svg'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Moortinyhouse',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moortinyhouse.com/icon.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://moortinyhouse.com/blog/${post.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} allPosts={blogPosts} />
    </>
  )
}
