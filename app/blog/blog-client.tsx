"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { useLanguage } from "@/lib/i18n"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "Tiny House Nedir? 2026 Kapsamlı Rehberi",
    excerpt: "Tiny house kavramını detaylı bir şekilde açıklıyoruz. Minimalist yaşam, sürdürülebilir konut, emekliler ve genç profesyoneller için ideal küçük ev yaşamının avantajlarını keşfedin.",
    date: "25 Ocak 2026",
    readTime: "5 dk",
    category: "Rehber",
    slug: "tiny-house-nedir-kapsamli-rehber",
    featuredImage: "/beautiful-modern-tiny-house-in-nature-forest-setti.webp"
  },
  {
    id: 2,
    title: "Tiny House Fiyatları 2026: Detaylı Fiyat Listesi",
    excerpt: "2026 yılı tiny house fiyatları hakkında kapsamlı bilgi. Ekonomik mini ev modelleri, premium seçenekler, finansman ve yatırım avantajları.",
    date: "22 Ocak 2026",
    readTime: "7 dk",
    category: "Fiyatlandırma",
    slug: "tiny-house-fiyatlari-detayli-fiyat-listesi",
    featuredImage: "/luxury-premium-tiny-house-modern-architecture-high.webp"
  },
  {
    id: 3,
    title: "İstanbul'da Tiny House Yaşamı: 2026 Rehberi",
    excerpt: "İstanbul'da tiny house yaşamak için en uygun bölgeler. Şile, Çatalca, Beykoz yerleşim alanları, yasal süreçler ve doğada yaşam fırsatları.",
    date: "20 Ocak 2026",
    readTime: "6 dk",
    category: "Lokal Rehber",
    slug: "istanbulda-tiny-house-yasami-rehber",
    featuredImage: "/sustainable-forest-trees-aerial-view-green-nature.webp"
  },
  {
    id: 4,
    title: "Bursa'da Tiny House Yerleşim Alanları 2026",
    excerpt: "Bursa, Mudanya, Uludağ ve İznik çevresinde tiny house için en uygun yerleşim alanları. Hobi bahçesi, yazlık ve emeklilik için ideal lokasyonlar.",
    date: "18 Ocak 2026",
    readTime: "5 dk",
    category: "Lokal Rehber",
    slug: "bursada-tiny-house-yerlesim-alanlari",
    featuredImage: "/eco-tiny-house-earth-integrated-green-roof-natural.webp"
  },
  {
    id: 5,
    title: "Tiny House vs Prefabrik Ev: 2026 Karşılaştırma",
    excerpt: "Tiny house ve prefabrik ev arasındaki farklar nelerdir? Minimalist yaşam, maliyet, sürdürülebilirlik ve taşınabilirlik açısından detaylı karşılaştırma.",
    date: "15 Ocak 2026",
    readTime: "8 dk",
    category: "Karşılaştırma",
    slug: "tiny-house-vs-prefabrik-ev-karsilastirma",
    featuredImage: "/modern-tiny-house-showroom-interior.webp"
  },
  {
    id: 6,
    title: "Tiny House Ruhsat ve Yasal Süreçler 2026",
    excerpt: "Tiny house için ruhsat alma süreci, imar izni, O2 belgesi ve yasal gereklilikler. Türkiye'deki güncel mevzuat ve pratik bilgiler.",
    date: "12 Ocak 2026",
    readTime: "6 dk",
    category: "Yasal",
    slug: "tiny-house-ruhsat-ve-yasal-surecler",
    featuredImage: "/craftsman-building-tiny-house-workshop.webp"
  }
]

export default function BlogClient() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
              Blog
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 text-balance">
              Tiny House <span className="text-accent">Rehberleri</span>
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Tiny house hakkında ipuçları, rehberler ve güncel haberler. İstanbul ve Bursa'da tiny house yaşamı hakkında bilgilendirici içerikler.
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <RevealAnimation key={post.id} delay={i * 0.1}>
                <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/50 transition-colors group">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <h2 className="text-xl font-serif font-medium mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" className="w-full group/btn" size="sm">
                        Devamını Oku
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </article>
              </RevealAnimation>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <RevealAnimation delay={0.7}>
            <div className="mt-16 text-center bg-card rounded-2xl border border-border p-12">
              <h3 className="text-2xl font-serif font-medium mb-4">Daha Fazla İçerik Yakında</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Tiny house hakkında daha fazla rehber, ipucu ve haber için bizi takip etmeye devam edin. 
                Yeni içeriklerimiz yakında yayınlanacak.
              </p>
              <Link href="/contact">
                <Button className="rounded-full gap-2">
                  İletişime Geç
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </section>

      <Footer />
    </main>
  )
}
