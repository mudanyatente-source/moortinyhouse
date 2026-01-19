"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

const deliveredHomes = [
  {
    id: 1,
    city: "Portland",
    state: "Oregon",
    model: "Aura",
    year: 2024,
    images: ["/aura-tiny-house-portland-forest.jpg", "/aura-tiny-house-interior-living-room.jpg", "/aura-tiny-house-kitchen-modern.jpg"],
    descEn:
      "Nestled in the Pacific Northwest forests, this Aura model features custom cedar finishes and a meditation deck overlooking the trees.",
    descTr:
      "Pasifik Kuzeybatı ormanlarında konumlanan bu Aura modeli, özel sedir kaplamaları ve ağaçları gören bir meditasyon terası içerir.",
    descAr:
      "يقع هذا النموذج Aura في غابات شمال غرب المحيط الهادئ، ويتميز بتشطيبات خشب الأرز المخصصة وسطح تأمل يطل على الأشجار.",
  },
  {
    id: 2,
    city: "Austin",
    state: "Texas",
    model: "Zen",
    year: 2024,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    descEn: "A minimalist retreat in Texas Hill Country, featuring passive cooling systems and a native plant garden.",
    descTr: "Texas Hill Country'de minimalist bir inziva, pasif soğutma sistemleri ve yerli bitki bahçesi içerir.",
    descAr: "ملاذ بسيط في تلال تكساس، يتميز بأنظمة تبريد سلبية وحديقة نباتات محلية.",
  },
  {
    id: 3,
    city: "Denver",
    state: "Colorado",
    model: "Nova",
    year: 2023,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    descEn: "A family Nova with enhanced insulation for mountain winters and a sunny south-facing great room.",
    descTr: "Dağ kışları için geliştirilmiş yalıtıma ve güneşli güneye bakan büyük bir odaya sahip aile Nova'sı.",
    descAr: "نموذج Nova عائلي مع عزل محسّن لفصول الشتاء الجبلية وغرفة معيشة كبيرة مشمسة تواجه الجنوب.",
  },
  {
    id: 4,
    city: "Seattle",
    state: "Washington",
    model: "Horizon",
    year: 2023,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    descEn:
      "A road-ready Horizon that has traveled to 15 states, featuring enhanced aerodynamics and off-grid capabilities.",
    descTr: "15 eyaleti gezen yola hazır Horizon, gelişmiş aerodinamik ve şebekeden bağımsız özellikler içerir.",
    descAr: "نموذج Horizon جاهز للطريق سافر إلى 15 ولاية، يتميز بديناميكية هوائية محسنة وقدرات العمل خارج الشبكة.",
  },
  {
    id: 5,
    city: "Asheville",
    state: "North Carolina",
    model: "Terra",
    year: 2023,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    descEn:
      "An earth-integrated Terra with a living roof supporting 200+ native plant species and full water recycling.",
    descTr:
      "200'den fazla yerli bitki türünü destekleyen yaşayan çatı ve tam su geri dönüşümü olan toprakla bütünleşik Terra.",
    descAr:
      "نموذج Terra متكامل مع الأرض مع سقف حي يدعم أكثر من 200 نوع من النباتات المحلية وإعادة تدوير المياه بالكامل.",
  },
  {
    id: 6,
    city: "San Diego",
    state: "California",
    model: "Lux",
    year: 2024,
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    descEn: "A premium Lux with ocean views, smart glass windows, and a rooftop entertaining space.",
    descTr: "Okyanus manzaralı, akıllı cam pencereli ve çatı eğlence alanına sahip premium Lux.",
    descAr: "نموذج Lux فاخر مع إطلالات على المحيط ونوافذ زجاجية ذكية ومساحة ترفيه على السطح.",
  },
]

export default function PortfolioPage() {
  const { t, language } = useLanguage()
  const [selectedHome, setSelectedHome] = useState<(typeof deliveredHomes)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getDescription = (home: (typeof deliveredHomes)[0]) => {
    if (language === "tr") return home.descTr
    if (language === "ar") return home.descAr
    return home.descEn
  }

  const nextImage = () => {
    if (selectedHome) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedHome.images.length)
    }
  }

  const prevImage = () => {
    if (selectedHome) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedHome.images.length) % selectedHome.images.length)
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
              {t("portfolio.badge")}
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 text-balance">
              {t("portfolio.title1")} <span className="text-accent">{t("portfolio.title2")}</span>
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t("portfolio.subtitle")}</p>
          </RevealAnimation>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliveredHomes.map((home, i) => (
              <RevealAnimation key={home.id} delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedHome(home)
                    setCurrentImageIndex(0)
                  }}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                    <motion.img
                      src={home.images[0]}
                      alt={`${home.model} in ${home.city}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <div className="text-primary-foreground font-serif text-xl">{home.model}</div>
                        <div className="text-primary-foreground/80 text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {home.city}, {home.state}
                        </div>
                      </div>
                      <div className="text-primary-foreground/60 text-sm">{home.year}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">{getDescription(home)}</p>
                </motion.article>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedHome(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedHome.images[currentImageIndex]}
                    alt={`${selectedHome.model} image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Navigation */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
                  <Button variant="secondary" size="icon" className="rounded-full" onClick={prevImage}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button variant="secondary" size="icon" className="rounded-full" onClick={nextImage}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Close Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full"
                  onClick={() => setSelectedHome(null)}
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedHome.images.length}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif font-medium mb-1">{selectedHome.model}</h2>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedHome.city}, {selectedHome.state} • {selectedHome.year}
                  </div>
                </div>
                <p className="text-muted-foreground max-w-md">{getDescription(selectedHome)}</p>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-6">
                {selectedHome.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === currentImageIndex ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
