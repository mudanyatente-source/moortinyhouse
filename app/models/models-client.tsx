"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Maximize2, Leaf, Plus, X, ArrowRight, Filter, Eye } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"
import Link from "next/link"
import Image from "next/image"

interface Hotspot {
  x: number
  y: number
  title: string
  desc: string
}

interface Model {
  id: string
  slug: string
  name_tr: string
  name_en: string
  tagline_tr: string
  tagline_en: string
  description_tr: string
  description_en: string
  image: string
  specs: {
    sqm: number
    capacity: string
    eco: string
    bedrooms: number
    bathrooms: number
  }
  features: string[]
  features_en: string[]
  is_popular: boolean
  hotspots: Hotspot[]
}

interface ModelsClientProps {
  initialModels: Model[]
}

function HotspotOverlay({
  hotspots,
  activeHotspot,
  setActiveHotspot,
}: {
  hotspots: Hotspot[]
  activeHotspot: number | null
  setActiveHotspot: (id: number | null) => void
}) {
  if (hotspots.length === 0) return null

  return (
    <>
      {hotspots.map((spot, i) => (
        <motion.button
          key={i}
          className="absolute z-20"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
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
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              activeHotspot === i ? "bg-accent text-accent-foreground" : "bg-background/80 text-foreground"
            }`}
            whileHover={{ scale: 1.2 }}
            animate={activeHotspot === i ? {} : { scale: [1, 1.2, 1] }}
            transition={activeHotspot === i ? {} : { duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {activeHotspot === i ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </motion.div>
        </motion.button>
      ))}
      <AnimatePresence>
        {activeHotspot !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-30 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border max-w-xs"
            style={{
              left: `${Math.min(hotspots[activeHotspot].x, 60)}%`,
              top: `${hotspots[activeHotspot].y + 8}%`,
            }}
          >
            <h4 className="font-semibold mb-1">{hotspots[activeHotspot].title}</h4>
            <p className="text-sm text-muted-foreground">{hotspots[activeHotspot].desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function ModelsClient({ initialModels }: ModelsClientProps) {
  const { t, language } = useLanguage()
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredModels =
    filter === "all"
      ? initialModels
      : initialModels.filter((m) => {
          if (filter === "small") return m.specs.sqm <= 26 // ~26 m² = ~280 sqft
          if (filter === "medium") return m.specs.sqm > 26 && m.specs.sqm <= 37 // ~37 m² = ~400 sqft
          if (filter === "large") return m.specs.sqm > 37
          return true
        })

  const getModelName = (model: Model) => {
    return language === 'tr' ? model.name_tr : model.name_en
  }

  const getModelTagline = (model: Model) => {
    return language === 'tr' ? model.tagline_tr : model.tagline_en
  }

  const getModelDescription = (model: Model) => {
    return language === 'tr' ? model.description_tr : model.description_en
  }

  const getModelFeatures = (model: Model) => {
    return language === 'tr' ? model.features : model.features_en
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
              {t("models.badge")}
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 text-balance">
              {t("models.title1")} <span className="text-accent">{t("models.title2")}</span>
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">{t("models.subtitle")}</p>
          </RevealAnimation>

          {/* Filters */}
          <RevealAnimation delay={0.3}>
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {[
                { key: "all", label: t("models.allModels") },
                { key: "small", label: t("models.small") },
                { key: "medium", label: t("models.medium") },
                { key: "large", label: t("models.large") },
              ].map((f) => (
                <Button
                  key={f.key}
                  variant={filter === f.key ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </RevealAnimation>
        </div>
      </section>

      {/* Models Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          {filteredModels.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{t("models.noModels") || "No models available"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredModels.map((model, i) => (
                  <motion.article
                    key={model.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group"
                    onMouseEnter={() => setSelectedModel(model.id)}
                    onMouseLeave={() => {
                      setSelectedModel(null)
                      setActiveHotspot(null)
                    }}
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-muted">
                      <motion.div
                        animate={{ scale: selectedModel === model.id ? 1.05 : 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full"
                      >
                        <Image
                          src={model.image || "/placeholder.svg"}
                          alt={getModelName(model)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={i < 3}
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                      {/* Interactive Hotspots */}
                      {selectedModel === model.id && model.hotspots.length > 0 && (
                        <HotspotOverlay
                          hotspots={model.hotspots}
                          activeHotspot={activeHotspot}
                          setActiveHotspot={setActiveHotspot}
                        />
                      )}

                      {/* Quick Specs */}
                      <div className="absolute bottom-4 left-4 right-4 flex gap-3 text-primary-foreground">
                        <div className="flex items-center gap-1.5 bg-foreground/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span className="text-xs">{model.specs.sqm} m²</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-foreground/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-xs">{model.specs.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-foreground/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Leaf className="w-3.5 h-3.5" />
                          <span className="text-xs">{model.specs.eco}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                        {getModelTagline(model)}
                      </span>
                      <h3 className="text-2xl font-serif font-medium mt-2 mb-3 group-hover:text-accent transition-colors">
                        {getModelName(model)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{getModelDescription(model)}</p>
                      {getModelFeatures(model).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {getModelFeatures(model).slice(0, 4).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground italic">
                          {language === 'tr' 
                            ? 'Beğendiğiniz model hakkında bilgi almak için bizimle iletişime geçin.'
                            : 'Contact us for more information about this model.'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <MagneticButton>
                          <Link href={`/models/${model.slug}/explore`} className="flex-1">
                            <Button variant="default" className="rounded-full w-full gap-2 group/btn">
                              <Eye className="w-4 h-4" />
                              {language === 'tr' ? 'Keşfet' : 'Explore'}
                            </Button>
                          </Link>
                        </MagneticButton>
                        <MagneticButton>
                          <Link href={`/models/${model.slug}`} className="flex-1">
                            <Button variant="outline" className="rounded-full w-full gap-2 group/btn bg-transparent">
                              {t("models.explore")} {getModelName(model)}
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>
                        </MagneticButton>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
