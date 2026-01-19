"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Phone } from "lucide-react"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80 z-10" />
        <img
          src="/beautiful-tiny-house-sunset-mountains-scenic-view-.jpg"
          alt="Tiny house at sunset"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <RevealAnimation>
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
              {t("cta.badge")}
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 text-balance">
              {t("cta.title1")}
              <br />
              <span className="text-accent">{t("cta.title2")}</span>
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">{t("cta.subtitle")}</p>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-8 gap-2 group">
                    <Calendar className="w-5 h-5" />
                    {t("cta.schedule")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-8 gap-2 bg-transparent">
                    <Phone className="w-5 h-5" />
                    {t("cta.contactUs")}
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </RevealAnimation>

          {/* Trust Badges */}
          <RevealAnimation delay={0.4}>
            <div className="mt-16 flex flex-wrap items-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-semibold">✓</span>
                </div>
                <span className="text-sm">{t("cta.warranty")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-semibold">✓</span>
                </div>
                <span className="text-sm">{t("cta.certified")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-semibold">✓</span>
                </div>
                <span className="text-sm">{t("cta.custom")}</span>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute right-10 bottom-10 text-9xl font-serif font-bold text-accent/5 hidden lg:block"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      >
        M
      </motion.div>
    </section>
  )
}
