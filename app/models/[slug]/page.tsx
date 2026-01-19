"use client"

import { useParams, useRouter } from "next/navigation"
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

const allModels = [
  {
    slug: "aura",
    nameKey: "model.aura.name",
    taglineKey: "model.aura.tagline",
    descriptionKey: "model.aura.description",
    images: [
      "/luxury-modern-tiny-house-exterior-wood-siding-larg.jpg",
      "/luxury-tiny-house-interior-living-room-modern-desi.jpg",
      "/luxury-tiny-house-bedroom-loft-cozy-lighting.jpg",
      "/luxury-tiny-house-kitchen-modern-appliances.jpg",
    ],
    specs: { sqm: 30, capacity: "2-3", eco: "A+", bedrooms: 1, bathrooms: 1 },
    features: ["feature.smartHome", "feature.premiumInsulation", "feature.heatedFloors", "feature.skyLounge"],
    hotspots: [
      { x: 30, y: 40, titleKey: "Triple-Pane Windows", descKey: "Energy-efficient glazing with UV protection" },
      {
        x: 70,
        y: 60,
        titleKey: "Sustainable Cedar",
        descKey: "FSC-certified cedar siding, naturally weather-resistant",
      },
      { x: 50, y: 80, titleKey: "Steel Frame", descKey: "Galvanized steel chassis, 50-year durability guarantee" },
    ],
  },
  {
    slug: "nova",
    nameKey: "model.nova.name",
    taglineKey: "model.nova.tagline",
    descriptionKey: "model.nova.description",
    images: [
      "/modern-tiny-house-family-home-exterior-porch-garde.jpg",
      "/tiny-house-family-living-space-open-plan-kids-area.jpg",
      "/tiny-house-master-bedroom-compact-design-storage.jpg",
      "/tiny-house-kitchen-dining-family-friendly.jpg",
    ],
    specs: { sqm: 42, capacity: "4-5", eco: "A+", bedrooms: 2, bathrooms: 1 },
    features: ["feature.loftBedroom", "feature.fullKitchen", "feature.storageSolutions", "feature.outdoorDeck"],
    hotspots: [
      { x: 25, y: 35, titleKey: "Expandable Deck", descKey: "Hydraulic deck system doubles outdoor living space" },
      { x: 65, y: 50, titleKey: "Solar Ready", descKey: "Pre-wired for 4kW solar panel system" },
      { x: 45, y: 75, titleKey: "Foundation Options", descKey: "Trailer, permanent, or floating foundation" },
    ],
  },
  {
    slug: "zen",
    nameKey: "model.zen.name",
    taglineKey: "model.zen.tagline",
    descriptionKey: "model.zen.description",
    images: [
      "/minimalist-tiny-house-japanese-inspired-exterior-p.jpg",
      "/zen-tiny-house-interior-meditation-space-bamboo.jpg",
      "/minimalist-tiny-house-bedroom-natural-light-simple.jpg",
      "/placeholder.svg?height=800&width=1200",
    ],
    specs: { sqm: 20, capacity: "1-2", eco: "A++", bedrooms: 1, bathrooms: 1 },
    features: ["feature.meditationSpace", "feature.naturalMaterials", "feature.skylights", "feature.compactKitchen"],
    hotspots: [
      { x: 40, y: 30, titleKey: "Living Roof", descKey: "Optional green roof with native plants" },
      { x: 60, y: 55, titleKey: "Bamboo Interior", descKey: "Sustainable bamboo flooring and accents" },
      { x: 35, y: 70, titleKey: "Rainwater System", descKey: "Integrated rainwater collection ready" },
    ],
  },
  {
    slug: "horizon",
    nameKey: "model.horizon.name",
    taglineKey: "model.horizon.tagline",
    descriptionKey: "model.horizon.description",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    specs: { sqm: 26, capacity: "2", eco: "A+", bedrooms: 1, bathrooms: 1 },
    features: ["feature.roadLegal", "feature.offGridReady", "feature.compactDesign", "feature.durableBuild"],
    hotspots: [
      { x: 30, y: 45, titleKey: "Aerodynamic Design", descKey: "Wind-tunnel tested for fuel efficiency" },
      { x: 70, y: 35, titleKey: "All-Terrain Tires", descKey: "Premium off-road capable wheel package" },
      { x: 50, y: 70, titleKey: "Lithium Battery", descKey: "400Ah lithium battery bank included" },
    ],
  },
  {
    slug: "terra",
    nameKey: "model.terra.name",
    taglineKey: "model.terra.tagline",
    descriptionKey: "model.terra.description",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    specs: { sqm: 35, capacity: "3-4", eco: "A++", bedrooms: 2, bathrooms: 1 },
    features: ["feature.greenRoof", "feature.earthWalls", "feature.passiveSolar", "feature.waterRecycling"],
    hotspots: [
      { x: 45, y: 25, titleKey: "Living Roof", descKey: "1200 native plants, 40% energy savings" },
      { x: 25, y: 60, titleKey: "Rammed Earth", descKey: "Thermal mass walls maintain 68°F year-round" },
      { x: 75, y: 50, titleKey: "Greywater System", descKey: "Full water recycling reduces usage 60%" },
    ],
  },
  {
    slug: "lux",
    nameKey: "model.lux.name",
    taglineKey: "model.lux.tagline",
    descriptionKey: "model.lux.description",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    specs: { sqm: 46, capacity: "2-4", eco: "A+", bedrooms: 2, bathrooms: 2 },
    features: ["feature.doubleBathroom", "feature.homeOffice", "feature.wineStorage", "feature.smartEverything"],
    hotspots: [
      { x: 35, y: 40, titleKey: "Italian Marble", descKey: "Carrara marble countertops and bathroom" },
      { x: 65, y: 30, titleKey: "Smart Glass", descKey: "Electrochromic windows, app controlled" },
      { x: 50, y: 65, titleKey: "Underfloor Heating", descKey: "Hydronic heating throughout" },
    ],
  },
]

export default function ModelDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [activeImage, setActiveImage] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  const slug = params.slug as string
  const model = allModels.find((m) => m.slug === slug)

  if (!model) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <section className="pt-32 pb-16 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif mb-4">Model not found</h1>
          <p className="text-muted-foreground mb-8">The model you're looking for doesn't exist.</p>
          <MagneticButton>
            <Link href="/models">
              <Button className="rounded-full">{t("models.backToModels")}</Button>
            </Link>
          </MagneticButton>
        </section>
        <Footer />
      </main>
    )
  }

  const currentIndex = allModels.findIndex((m) => m.slug === slug)
  const prevModel = allModels[currentIndex - 1]
  const nextModel = allModels[currentIndex + 1]

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
                    <motion.img
                      key={activeImage}
                      src={model.images[activeImage]}
                      alt={`${t(model.nameKey)} - Image ${activeImage + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Hotspots on first image */}
                  {activeImage === 0 &&
                    model.hotspots.map((spot, i) => (
                      <motion.button
                        key={i}
                        className="absolute z-20"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                      >
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            activeHotspot === i
                              ? "bg-accent text-accent-foreground"
                              : "bg-background/80 text-foreground"
                          }`}
                          whileHover={{ scale: 1.2 }}
                          animate={activeHotspot === i ? {} : { scale: [1, 1.2, 1] }}
                          transition={activeHotspot === i ? {} : { duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {activeHotspot === i ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </motion.div>
                      </motion.button>
                    ))}

                  {/* Hotspot info popup */}
                  <AnimatePresence>
                    {activeHotspot !== null && activeImage === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-30 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border max-w-xs"
                        style={{
                          left: `${Math.min(model.hotspots[activeHotspot].x, 60)}%`,
                          top: `${model.hotspots[activeHotspot].y + 8}%`,
                        }}
                      >
                        <h4 className="font-semibold mb-1">{t(`hotspot.${model.slug}.${activeHotspot}.title`) || model.hotspots[activeHotspot]?.titleKey || ''}</h4>
                        <p className="text-sm text-muted-foreground">{t(`hotspot.${model.slug}.${activeHotspot}.desc`) || model.hotspots[activeHotspot]?.descKey || ''}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Thumbnails */}
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
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </RevealAnimation>

            {/* Details */}
            <RevealAnimation delay={0.2}>
              <div>
                <span className="text-sm font-medium tracking-widest uppercase text-accent mb-2 block">
                  {t(model.taglineKey)}
                </span>
                <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6">{t(model.nameKey)}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t(model.descriptionKey)}</p>

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
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">{t("specs.features")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {model.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-accent/10 text-accent"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {t(feature)}
                      </span>
                    ))}
                  </div>
                </div>

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
                  <div className="text-lg font-serif">{t(prevModel.nameKey)}</div>
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
                  <div className="text-lg font-serif">{t(nextModel.nameKey)}</div>
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
