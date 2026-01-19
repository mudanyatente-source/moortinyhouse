"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Leaf, Recycle, Sun, Wind, ArrowRight } from "lucide-react"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

export function PhilosophyPreview() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const principles = [
    {
      icon: Leaf,
      titleKey: "philosophy.sustainable.title",
      descKey: "philosophy.sustainable.desc",
    },
    {
      icon: Sun,
      titleKey: "philosophy.solar.title",
      descKey: "philosophy.solar.desc",
    },
    {
      icon: Recycle,
      titleKey: "philosophy.zeroWaste.title",
      descKey: "philosophy.zeroWaste.desc",
    },
    {
      icon: Wind,
      titleKey: "philosophy.ventilation.title",
      descKey: "philosophy.ventilation.desc",
    },
  ]

  return (
    <section ref={containerRef} className="py-32 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <RevealAnimation>
              <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
                {t("philosophy.badge")}
              </span>
            </RevealAnimation>
            <RevealAnimation delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 text-balance">
                {t("philosophy.buildingFor")}
                <br />
                <span className="text-accent">{t("philosophy.tomorrow")}</span>
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t("philosophy.buildingDesc")}</p>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <MagneticButton>
                <Link href="/philosophy">
                  <Button className="rounded-full px-8 gap-2 group">
                    {t("philosophy.learnStory")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </MagneticButton>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((principle, i) => (
              <RevealAnimation key={principle.titleKey} delay={0.1 * i} direction="right">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-background rounded-2xl p-6 border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <principle.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{t(principle.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(principle.descKey)}</p>
                </motion.div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Image */}
      <motion.div
        style={{ y }}
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full overflow-hidden opacity-20 hidden xl:block"
      >
        <img
          src="/sustainable-forest-trees-aerial-view-green-nature.jpg"
          alt="Sustainable forest"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  )
}
