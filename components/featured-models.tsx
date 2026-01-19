"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Users, Maximize2, Leaf } from "lucide-react"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

const models = [
  {
    id: 1,
    slug: "aura",
    nameKey: "model.aura.name",
    taglineKey: "model.aura.tagline",
    descriptionKey: "model.aura.description",
    image: "/luxury-modern-tiny-house-interior-bedroom-with-lar.jpg",
    specs: { sqft: "320", capacity: "2-3", eco: "A+" },
  },
  {
    id: 2,
    slug: "nova",
    nameKey: "model.nova.name",
    taglineKey: "model.nova.tagline",
    descriptionKey: "model.nova.description",
    image: "/cozy-tiny-house-family-space-open-plan-living-room.jpg",
    specs: { sqft: "450", capacity: "4-5", eco: "A+" },
  },
  {
    id: 3,
    slug: "zen",
    nameKey: "model.zen.name",
    taglineKey: "model.zen.tagline",
    descriptionKey: "model.zen.description",
    image: "/minimalist-tiny-house-zen-interior-meditation-spac.jpg",
    specs: { sqft: "220", capacity: "1-2", eco: "A++" },
  },
]

export function FeaturedModels() {
  const { t } = useLanguage()
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"])

  return (
    <section ref={containerRef} className="py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <RevealAnimation>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
                {t("featured.badge")}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-balance">
                {t("featured.title1")}
                <br />
                <span className="text-accent">{t("featured.title2")}</span>
              </h2>
            </div>
            <MagneticButton>
              <Link href="/models">
                <Button variant="outline" className="rounded-full px-6 gap-2 group bg-transparent">
                  {t("featured.viewAll")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </RevealAnimation>

        <motion.div style={{ x }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, i) => (
            <RevealAnimation key={model.id} delay={i * 0.15}>
              <motion.article
                onMouseEnter={() => setHoveredId(model.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
              >
                <Link href={`/models/${model.slug}`}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                    <motion.img
                      src={model.image}
                      alt={t(model.nameKey)}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredId === model.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                    {/* Specs Overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredId === model.id ? 1 : 0,
                        y: hoveredId === model.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-4 text-primary-foreground">
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-4 h-4" />
                          <span className="text-sm">
                            {model.specs.sqft} {t("featured.sqft")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{model.specs.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Leaf className="w-4 h-4" />
                          <span className="text-sm">{model.specs.eco}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div>
                    <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      {t(model.taglineKey)}
                    </span>
                    <h3 className="text-2xl font-serif font-medium mt-2 mb-3 group-hover:text-accent transition-colors">
                      {t(model.nameKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t(model.descriptionKey)}</p>
                  </div>
                </Link>
              </motion.article>
            </RevealAnimation>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
