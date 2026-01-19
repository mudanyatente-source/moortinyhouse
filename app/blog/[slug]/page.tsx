import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostClient from './blog-post-client'

// Remove dynamic = 'force-dynamic' to allow static generation with generateStaticParams

const blogPosts = [
  {
    id: 1,
    title: "Tiny House Nedir? 2024 Rehberi",
    excerpt: "Tiny house kavramını detaylı bir şekilde açıklıyoruz. Küçük ev yaşamının avantajları, dezavantajları ve kimler için uygun olduğunu keşfedin.",
    date: "15 Ocak 2024",
    readTime: "5 dk",
    category: "Rehber",
    slug: "tiny-house-nedir-2024-rehberi",
    featuredImage: "/beautiful-modern-tiny-house-in-nature-forest-setti.jpg",
    content: `
## Tiny House Nedir?

Tiny house, Türkçe'de "minik ev" veya "küçük ev" olarak da bilinen, genellikle 20-60 metrekare arasında değişen kompakt yaşam alanlarıdır. Bu evler, minimal yaşam felsefesini benimseyen, sürdürülebilir bir yaşam tarzı arayan ve gereksiz tüketimden kaçınan kişiler için tasarlanmıştır.

## Tiny House'un Tarihçesi

Tiny house hareketi, 1990'lı yılların sonlarında Amerika Birleşik Devletleri'nde başlamıştır. Özellikle 2008 ekonomik krizinden sonra, yüksek konut maliyetlerinden kaçınmak isteyen birçok kişi bu alternatif yaşam tarzını benimsemiştir. Türkiye'de ise son 5-6 yılda popülerlik kazanmaya başlamıştır.

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

## Tiny House'un Dezavantajları

### 1. Alan Sınırlaması
- Eşya depolama zorluğu
- Misafir ağırlama sınırlaması
- Çocuklu aileler için zorluklar

### 2. Yasal Süreçler
- Ruhsat alma süreçleri
- Yerleşim alanı bulma zorlukları
- Belediye izinleri

### 3. Sosyal Adaptasyon
- Toplumsal kabul
- Yaşam tarzı değişikliği
- Alışma süreci

## Kimler İçin Uygun?

Tiny house yaşamı özellikle şu kişiler için uygundur:

1. **Minimalist yaşam tarzını benimseyenler**
2. **Emekliler ve tek başına yaşayanlar**
3. **Dijital göçebeler ve uzaktan çalışanlar**
4. **Doğa severler ve çevre bilinci yüksek kişiler**
5. **Finansal bağımsızlık arayanlar**
6. **İkinci ev arayanlar (yazlık, dağ evi vb.)**

## Türkiye'de Tiny House

Türkiye'de tiny house sektörü hızla büyümektedir. İstanbul ve Bursa başta olmak üzere birçok şehirde tiny house üreticileri ve yerleşim alanları bulunmaktadır. Yasal düzenlemeler henüz tam olarak netleşmemiş olsa da, sektör her geçen gün gelişmektedir.

## Sonuç

Tiny house, sadece bir ev tipi değil, aynı zamanda bir yaşam felsefesidir. Daha az eşya, daha az borç ve daha fazla özgürlük arayanlar için ideal bir seçenektir. Eğer minimalist bir yaşam tarzını benimsemeyi düşünüyorsanız, tiny house sizin için doğru seçim olabilir.

---

*Tiny house hakkında daha fazla bilgi almak ve modelleri incelemek için [Modeller](/models) sayfamızı ziyaret edebilirsiniz.*
    `
  },
  {
    id: 2,
    title: "Tiny House Fiyatları: Detaylı Fiyat Listesi",
    excerpt: "2024 yılı tiny house fiyatları hakkında kapsamlı bilgi. Modellere göre fiyat aralıkları, ek maliyetler ve finansman seçenekleri.",
    date: "10 Ocak 2024",
    readTime: "7 dk",
    category: "Fiyatlandırma",
    slug: "tiny-house-fiyatlari-detayli-fiyat-listesi",
    featuredImage: "/luxury-premium-tiny-house-modern-architecture-high.jpg",
    content: `
## Tiny House Fiyatları 2024

Tiny house fiyatları, boyut, malzeme kalitesi, özellikler ve marka gibi birçok faktöre göre değişiklik göstermektedir. Bu rehberde, 2024 yılı için güncel tiny house fiyatlarını ve nelerin fiyatı etkilediğini detaylı olarak inceleyeceğiz.

## Fiyat Aralıkları

### Temel Modeller (300.000 - 500.000 TL)
- 20-30 m² alan
- Standart malzemeler
- Temel mutfak ve banyo
- 1 yatak odası

### Orta Segment (500.000 - 800.000 TL)
- 30-45 m² alan
- Kaliteli malzemeler
- Tam donanımlı mutfak
- 1-2 yatak odası
- Enerji verimli sistemler

### Premium Modeller (800.000 - 1.500.000 TL)
- 45-60 m² alan
- Premium malzemeler
- Akıllı ev sistemleri
- 2-3 yatak odası
- Güneş paneli ve off-grid sistemler
- Özel tasarım seçenekleri

## Fiyatı Etkileyen Faktörler

### 1. Boyut
Metrekare başına fiyat genellikle 15.000-30.000 TL arasında değişmektedir.

### 2. Malzeme Kalitesi
- **Ekonomik malzemeler:** Daha uygun fiyat
- **Premium malzemeler:** Daha yüksek fiyat, uzun ömür

### 3. Özellikler ve Donanım
- Tam donanımlı mutfak
- Banyo kalitesi
- Isıtma sistemi
- Akıllı ev sistemleri

## Sonuç

Tiny house, geleneksel konut seçeneklerine göre çok daha ekonomik bir alternatiftir.

---

*Güncel fiyat bilgisi için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  },
  {
    id: 3,
    title: "İstanbul'da Tiny House Yaşamı: Rehber",
    excerpt: "İstanbul'da tiny house yaşamak mümkün mü? Yerleşim alanları, yasal süreçler ve pratik ipuçları hakkında bilmeniz gerekenler.",
    date: "5 Ocak 2024",
    readTime: "6 dk",
    category: "Lokal Rehber",
    slug: "istanbulda-tiny-house-yasami-rehber",
    featuredImage: "/sustainable-forest-trees-aerial-view-green-nature.jpg",
    content: `
## İstanbul'da Tiny House Yaşamı

İstanbul, Türkiye'nin en kalabalık ve en pahalı şehri olarak bilinir. Bu durum, alternatif yaşam alanları arayan birçok kişiyi tiny house seçeneğine yönlendirmektedir.

## İstanbul'da Tiny House Yerleşim Alanları

### 1. Şile ve Ağva Bölgesi
- Doğa ile iç içe yaşam
- Deniz kenarı konumu
- Uygun arazi fiyatları

### 2. Çatalca ve Silivri
- Geniş arazi seçenekleri
- Tarım alanları
- Sakin yaşam ortamı

### 3. Beykoz ve Polonezköy Civarı
- Orman içi konumlar
- Elit tiny house köyleri

## Sonuç

İstanbul'da tiny house yaşamak, doğru planlama ile mümkündür.

---

*Detaylı bilgi için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  },
  {
    id: 4,
    title: "Bursa'da Tiny House Yerleşim Alanları",
    excerpt: "Bursa ve çevresinde tiny house için uygun yerleşim alanları. Doğa ile iç içe yaşam fırsatları ve bölge hakkında detaylı bilgi.",
    date: "28 Aralık 2023",
    readTime: "5 dk",
    category: "Lokal Rehber",
    slug: "bursada-tiny-house-yerlesim-alanlari",
    featuredImage: "/eco-tiny-house-earth-integrated-green-roof-natural.jpg",
    content: `
## Bursa'da Tiny House Yerleşim Alanları

Bursa, doğal güzellikleri, ılıman iklimi ve İstanbul'a yakınlığı ile tiny house yaşamı için ideal bir şehirdir.

## En Uygun Bölgeler

### 1. Uludağ Etekleri
- Dağ havası ve orman
- Yaz-kış farklı güzellikler

### 2. Mudanya ve Çevresi
- Deniz manzarası
- İstanbul feribotu

### 3. İznik ve Gölü Çevresi
- Göl manzarası
- Tarihi atmosfer

## Sonuç

Bursa, tiny house yaşamı için Türkiye'nin en uygun şehirlerinden biridir.

---

*Detaylı bilgi için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  },
  {
    id: 5,
    title: "Tiny House vs Prefabrik Ev: Karşılaştırma",
    excerpt: "Tiny house ve prefabrik ev arasındaki farklar nelerdir? Hangisi sizin için daha uygun? Detaylı karşılaştırma ve öneriler.",
    date: "20 Aralık 2023",
    readTime: "8 dk",
    category: "Karşılaştırma",
    slug: "tiny-house-vs-prefabrik-ev-karsilastirma",
    featuredImage: "/modern-tiny-house-showroom-interior.jpg",
    content: `
## Tiny House vs Prefabrik Ev

Alternatif konut seçenekleri arasında en popüler iki seçenek olan tiny house ve prefabrik evler, farklı ihtiyaç ve beklentilere hitap etmektedir.

## Temel Farklar

### Tiny House
- Genellikle 20-60 m²
- Minimal yaşam felsefesi
- Taşınabilir seçenekler mevcut

### Prefabrik Ev
- Genellikle 50-200 m²
- Geleneksel ev konsepti
- Sabit yapı

## Sonuç

Seçim, kişisel ihtiyaçlarınıza ve bütçenize bağlıdır.

---

*Her iki seçenek hakkında bilgi için [İletişim](/contact) sayfamızdan bize ulaşabilirsiniz.*
    `
  },
  {
    id: 6,
    title: "Tiny House Ruhsat ve Yasal Süreçler",
    excerpt: "Tiny house için ruhsat alma süreci, yasal gereklilikler ve dikkat edilmesi gerekenler. Türkiye'deki mevcut yasal durum.",
    date: "15 Aralık 2023",
    readTime: "6 dk",
    category: "Yasal",
    slug: "tiny-house-ruhsat-ve-yasal-surecler",
    featuredImage: "/craftsman-building-tiny-house-workshop.jpg",
    content: `
## Tiny House Ruhsat ve Yasal Süreçler

Tiny house satın almadan önce yasal süreçleri anlamak çok önemlidir.

## Türkiye'de Tiny House Yasal Durumu

Türkiye'de tiny house'lar için özel bir yasal düzenleme henüz bulunmamaktadır. Genel imar ve yapı mevzuatı çerçevesinde değerlendirilmektedir.

## Ruhsat Alma Süreci

1. İmar Durumu Kontrolü
2. Proje Hazırlığı
3. Belediye Başvurusu
4. Ruhsat Alımı
5. İnşaat ve Denetim

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

  return {
    title: `${post.title} | Moortinyhouse Blog`,
    description: post.excerpt,
    keywords: ['tiny house', 'mini ev', post.category.toLowerCase(), 'moortinyhouse', 'blog'],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    notFound()
  }
  
  return <BlogPostClient post={post} allPosts={blogPosts} />
}
