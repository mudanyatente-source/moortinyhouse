'use client'

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Maximize2, Users, Leaf, Bed, Plus, X, Check } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

interface Model {
  id: string
  slug: string
  name_tr: string
  name_en: string
  tagline_tr: string
  tagline_en: string
  description_tr: string
  description_en: string
  images: string[]
  specs: {
    sqm: number
    capacity: string
    eco: string
    bedrooms: number
    bathrooms: number
  }
  features: string[]
  features_en: string[]
  hotspots?: Array<{ x: number; y: number; title?: string; desc?: string }>
}

interface ModelDetailClientProps {
  model: Model
  prevModel?: { slug: string; name_tr: string; name_en: string }
  nextModel?: { slug: string; name_tr: string; name_en: string }
  allModels: Array<{ slug: string; name_tr: string; name_en: string }>
}

export default function ModelDetailClient({ model, prevModel, nextModel }: ModelDetailClientProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [activeImage, setActiveImage] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  const getModelName = () => language === 'tr' ? model.name_tr : model.name_en
  const getModelTagline = () => language === 'tr' ? model.tagline_tr : model.tagline_en
  const getModelDescription = () => language === 'tr' ? model.description_tr : model.description_en
  const getFeatures = () => language === 'tr' ? model.features : model.features_en

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <Link
              href="/models"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("models.backToModels")}
            </Link>
          </RevealAnimation>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <RevealAnimation>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <AnimatePresence mode="wait">
                    {model.images[activeImage] && (
                      <motion.div
                        key={activeImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={model.images[activeImage]}
                          alt={`${getModelName()} - Image ${activeImage + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={activeImage === 0}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hotspots on first image */}
                  {activeImage === 0 && model.hotspots && model.hotspots.length > 0 &&
                    model.hotspots.map((spot, i) => (
                      <motion.button
                        key={i}
                        className="absolute z-20 touch-none"
                        style={{ 
                          left: `clamp(5%, ${spot.x}%, 90%)`, 
                          top: `clamp(5%, ${spot.y}%, 85%)`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setActiveHotspot(activeHotspot === i ? null : i)
                        }}
                      >
                        <motion.div
                          className={`w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors shadow-lg ${
                            activeHotspot === i
                              ? "bg-accent text-accent-foreground"
                              : "bg-background/90 text-foreground border-2 border-accent/50"
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          animate={activeHotspot === i ? {} : { scale: [1, 1.2, 1] }}
                          transition={activeHotspot === i ? {} : { duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {activeHotspot === i ? <X className="w-5 h-5 md:w-4 md:h-4" /> : <Plus className="w-5 h-5 md:w-4 md:h-4" />}
                        </motion.div>
                      </motion.button>
                    ))}

                  {/* Hotspot info popup */}
                  <AnimatePresence>
                    {activeHotspot !== null && activeImage === 0 && model.hotspots && model.hotspots[activeHotspot] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-30 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border max-w-[280px] md:max-w-xs mx-2 md:mx-0"
                        style={{
                          left: `clamp(10px, ${Math.min(model.hotspots[activeHotspot].x || 50, 60)}%, calc(100% - 280px))`,
                          top: `clamp(10px, ${(model.hotspots[activeHotspot].y || 50) + 8}%, calc(100% - 150px))`,
                        }}
                      >
                        <h4 className="font-semibold mb-1 text-sm md:text-base">
                          {model.hotspots[activeHotspot]?.title || ''}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {model.hotspots[activeHotspot]?.desc || ''}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Thumbnails */}
                {model.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {model.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveImage(i)
                          setActiveHotspot(null)
                        }}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all ${
                          activeImage === i ? "ring-2 ring-accent" : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Thumbnail ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </RevealAnimation>

            {/* Details */}
            <RevealAnimation delay={0.2}>
              <div>
                <span className="text-sm font-medium tracking-widest uppercase text-accent mb-2 block">
                  {getModelTagline()}
                </span>
                <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6">{getModelName()}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{getModelDescription()}</p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <Maximize2 className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-semibold">{model.specs.sqm}</div>
                    <div className="text-xs text-muted-foreground">m²</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <Users className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-semibold">{model.specs.capacity}</div>
                    <div className="text-xs text-muted-foreground">{t("specs.capacity")}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <Bed className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-semibold">{model.specs.bedrooms}</div>
                    <div className="text-xs text-muted-foreground">{t("specs.bedrooms")}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <Leaf className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-semibold">{model.specs.eco}</div>
                    <div className="text-xs text-muted-foreground">{t("specs.ecoRating")}</div>
                  </div>
                </div>

                {/* Features */}
                {getFeatures().length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">{t("specs.features")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {getFeatures().map((feature, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-accent/10 text-accent"
                        >
                          <Check className="w-3.5 h-3.5" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Message */}
                <div className="mb-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("models.contactForInfo") || "Beğendiğiniz model hakkında detaylı bilgi almak için bizimle iletişime geçin. Size özel fiyat teklifi ve detaylı bilgi sunmaktan mutluluk duyarız."}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <MagneticButton>
                    <Link href="/contact">
                      <Button size="lg" className="rounded-full px-8 gap-2">
                        {t("models.requestQuote")}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
                        {t("nav.bookTour")}
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Navigation between models */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {prevModel ? (
              <Link
                href={`/models/${prevModel.slug}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("common.previous")}</div>
                  <div className="text-lg font-serif">{language === 'tr' ? prevModel.name_tr : prevModel.name_en}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextModel ? (
              <Link
                href={`/models/${nextModel.slug}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group text-end"
              >
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("common.next")}</div>
                  <div className="text-lg font-serif">{language === 'tr' ? nextModel.name_tr : nextModel.name_en}</div>
                </div>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
