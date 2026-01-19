"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { RevealAnimation } from "@/components/reveal-animation"
import { useLanguage } from "@/lib/i18n"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const handleWatchStory = () => {
    // Navigate to testimonials/stories page
    window.location.href = '/testimonials'
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <img
          src="/beautiful-modern-tiny-house-in-nature-forest-setti.jpg"
          alt="Beautiful tiny house in nature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10 dark:from-black/50 dark:via-black/40 dark:to-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div className="container mx-auto px-6 relative z-20 pt-32" style={{ opacity }}>
        <div className="max-w-4xl">
          <RevealAnimation>
            <motion.span
              className="inline-block text-sm font-medium tracking-widest uppercase text-accent/90 dark:text-accent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t("hero.badge")}
            </motion.span>
          </RevealAnimation>

          <RevealAnimation delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.95] mb-8 text-balance text-white drop-shadow-lg">
              {t("hero.title1")}
              <br />
              <span className="text-accent drop-shadow-md">{t("hero.title2")}</span>
            </h1>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <p className="text-lg md:text-xl text-white/90 dark:text-muted-foreground max-w-xl mb-10 leading-relaxed drop-shadow-md">
              {t("hero.subtitle")}
            </p>
          </RevealAnimation>

          <RevealAnimation delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link href="/models">
                  <Button size="lg" className="rounded-full px-8 gap-2 group">
                    {t("hero.explore")}
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Button size="lg" variant="outline" className="rounded-full px-8 gap-2 bg-transparent text-white" onClick={handleWatchStory}>
                  <Play className="w-4 h-4" />
                  {t("hero.watchStory")}
                </Button>
              </MagneticButton>
            </div>
          </RevealAnimation>
        </div>

        {/* Stats */}
        <RevealAnimation delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            {[
              { value: "150+", label: t("stats.homesDelivered") },
              { value: "12", label: t("stats.uniqueModels") },
              { value: "98%", label: t("stats.happyClients") },
              { value: "10+", label: t("stats.yearsExperience") },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center md:text-start"
              >
                <div className="text-3xl md:text-4xl font-serif font-semibold text-white drop-shadow-md dark:text-foreground">{stat.value}</div>
                <div className="text-sm text-white/80 dark:text-muted-foreground mt-1 drop-shadow-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </RevealAnimation>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-white/70 dark:text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">{t("hero.scroll")}</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
