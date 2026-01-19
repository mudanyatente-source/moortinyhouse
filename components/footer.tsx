"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react"
import { RevealAnimation } from "@/components/reveal-animation"
import { useLanguage } from "@/lib/i18n"
import { useSiteSettings } from "@/components/site-settings-provider"

export function Footer() {
  const { t } = useLanguage()
  const { social_media } = useSiteSettings()

  const footerLinks = {
    explore: [
      { labelKey: "footer.models", href: "/models" },
      { labelKey: "footer.gallery", href: "/portfolio" },
      { labelKey: "footer.philosophy", href: "/philosophy" },
      { labelKey: "footer.stories", href: "/testimonials" },
    ],
    company: [
      { labelKey: "footer.aboutUs", href: "/philosophy" },
      { labelKey: "footer.contact", href: "/contact" },
      { labelKey: "footer.faq", href: "/faq" },
      { labelKey: "footer.blog", href: "/blog" },
    ],
    social: [
      { label: "Instagram", href: social_media.instagram || "#", icon: Instagram },
      { label: "Facebook", href: social_media.facebook || "#", icon: Facebook },
      { label: "YouTube", href: social_media.youtube || "#", icon: Youtube },
    ],
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <RevealAnimation className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif font-semibold">Moortinyhouse</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">{t("footer.tagline")}</p>
          </RevealAnimation>

          <RevealAnimation delay={0.1}>
            <h4 className="font-semibold mb-6">{t("footer.explore")}</h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {t(link.labelKey)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <h4 className="font-semibold mb-6">{t("footer.company")}</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {t(link.labelKey)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </RevealAnimation>

          <RevealAnimation delay={0.3}>
            <h4 className="font-semibold mb-6">{t("footer.followUs")}</h4>
            <div className="flex gap-4">
              {footerLinks.social.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="mt-8">
              <h5 className="font-medium mb-3">{t("footer.newsletter")}</h5>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="flex-1 px-4 py-2 rounded-full bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                >
                  {t("footer.join")}
                </motion.button>
              </form>
            </div>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.4}>
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Moortinyhouse. {t("footer.rights")}
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </RevealAnimation>
      </div>

      {/* Large decorative text */}
      <div className="overflow-hidden py-8">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="whitespace-nowrap"
        >
          <span className="text-[12vw] font-serif font-semibold text-muted/30">
            Moortinyhouse • {t("footer.liveSimply")} • {t("footer.dreamBig")} • Moortinyhouse • {t("footer.liveSimply")}{" "}
            • {t("footer.dreamBig")} •{" "}
          </span>
        </motion.div>
      </div>
    </footer>
  )
}
