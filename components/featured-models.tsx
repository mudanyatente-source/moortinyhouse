"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Users, Maximize2, Leaf } from "lucide-react"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

interface FeaturedModel {
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
  }
}

interface FeaturedModelsProps {
  models?: FeaturedModel[]
}

export function FeaturedModels({ models: featuredModels = [] }: FeaturedModelsProps) {
  const { t, language } = useLanguage()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"])

  // If no models from database, show empty state
  if (featuredModels.length === 0) {
    return null
  }

  const getModelName = (model: FeaturedModel) => language === 'tr' ? model.name_tr : model.name_en
  const getModelTagline = (model: FeaturedModel) => language === 'tr' ? model.tagline_tr : model.tagline_en
  const getModelDescription = (model: FeaturedModel) => language === 'tr' ? model.description_tr : model.description_en

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
          {featuredModels.map((model, i) => (
            <RevealAnimation key={model.id} delay={i * 0.15}>
              <motion.article
                onMouseEnter={() => setHoveredId(model.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
              >
                <Link href={`/models/${model.slug}`}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                    <motion.div
                      animate={{
                        scale: hoveredId === model.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={model.image}
                        alt={getModelName(model)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={i < 2}
                      />
                    </motion.div>
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
                            {model.specs.sqm}m²
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
                      {getModelTagline(model)}
                    </span>
                    <h3 className="text-2xl font-serif font-medium mt-2 mb-3 group-hover:text-accent transition-colors">
                      {getModelName(model)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{getModelDescription(model)}</p>
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
