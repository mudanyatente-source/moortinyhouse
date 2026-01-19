"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Leaf, Recycle, Sun, Wind, TreePine, Droplets, Heart, Award } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { useLanguage } from "@/lib/i18n"

export default function PhilosophyPage() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const values = [
    { icon: Leaf, titleKey: "philosophy.sustainable.title", descKey: "philosophy.sustainable.desc" },
    { icon: Sun, titleKey: "philosophy.energy.title", descKey: "philosophy.energy.desc" },
    { icon: Recycle, titleKey: "philosophy.zeroWaste.title", descKey: "philosophy.zeroWaste.desc" },
    { icon: Wind, titleKey: "philosophy.ventilation.title", descKey: "philosophy.ventilation.desc" },
    { icon: TreePine, titleKey: "philosophy.carbon.title", descKey: "philosophy.carbon.desc" },
    { icon: Droplets, titleKey: "philosophy.water.title", descKey: "philosophy.water.desc" },
  ]

  const timeline = [
    { year: "2014", titleKey: "timeline.2014.title", descKey: "timeline.2014.desc" },
    { year: "2016", titleKey: "timeline.2016.title", descKey: "timeline.2016.desc" },
    { year: "2018", titleKey: "timeline.2018.title", descKey: "timeline.2018.desc" },
    { year: "2020", titleKey: "timeline.2020.title", descKey: "timeline.2020.desc" },
    { year: "2022", titleKey: "timeline.2022.title", descKey: "timeline.2022.desc" },
    { year: "2024", titleKey: "timeline.2024.title", descKey: "timeline.2024.desc" },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute right-0 top-32 w-1/2 h-[600px] rounded-s-3xl overflow-hidden opacity-30 hidden lg:block"
        >
          <img src="/craftsman-building-tiny-house-workshop.jpg" alt="Craftsman at work" className="w-full h-full object-cover" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <RevealAnimation>
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
              {t("philosophy.badge")}
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 max-w-4xl text-balance">
              {t("philosophy.title1")} <span className="text-accent">{t("philosophy.title2")}</span>
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">{t("philosophy.subtitle")}</p>
          </RevealAnimation>
        </div>
      </section>

      {/* Values Grid */}
      <section ref={containerRef} className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-12 text-center">
              {t("philosophy.coreValues")}
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <RevealAnimation key={value.titleKey} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-background rounded-2xl p-8 border border-border h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{t(value.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(value.descKey)}</p>
                </motion.div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <blockquote className="text-center max-w-4xl mx-auto">
              <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight mb-8">
                &ldquo;{t("philosophy.quote")}&rdquo;
              </p>
              <footer className="text-muted-foreground">
                <cite className="not-italic">
                  <span className="font-semibold text-foreground">{t("philosophy.quoteAuthor")}</span>
                  <br />
                  {t("philosophy.quoteRole")}
                </cite>
              </footer>
            </blockquote>
          </RevealAnimation>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-16 text-center">
              {t("philosophy.ourJourney")}
            </h2>
          </RevealAnimation>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <RevealAnimation key={item.year} delay={i * 0.1}>
                <div className="flex gap-8 mb-12 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent font-serif font-semibold">
                      {item.year.slice(2)}
                    </div>
                    {i < timeline.length - 1 && <div className="w-px h-full bg-border mt-4" />}
                  </div>
                  <div className="flex-1 pb-12">
                    <span className="text-sm text-muted-foreground">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-1 mb-2">{t(item.titleKey)}</h3>
                    <p className="text-muted-foreground">{t(item.descKey)}</p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Heart, value: "150+", labelKey: "stats.happyFamilies" },
              { icon: TreePine, value: "10,000+", labelKey: "stats.treesPlanted" },
              { icon: Award, value: "15", labelKey: "stats.designAwards" },
              { icon: Recycle, value: "98%", labelKey: "stats.wasteRecycled" },
            ].map((stat, i) => (
              <RevealAnimation key={stat.labelKey} delay={i * 0.1}>
                <div className="text-center">
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                  <div className="text-4xl md:text-5xl font-serif font-semibold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{t(stat.labelKey)}</div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
