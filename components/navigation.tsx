"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/models", label: t("nav.models") },
    { href: "/philosophy", label: t("nav.philosophy") },
    { href: "/portfolio", label: t("nav.portfolio") },
    { href: "/testimonials", label: t("nav.stories") },
    { href: "/contact", label: t("nav.contact") },
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
        }`}
        style={!scrolled ? { 
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        } : {}}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="relative z-10">
            <motion.span 
              className={`text-2xl font-serif font-semibold tracking-tight ${!scrolled ? 'text-white' : 'text-foreground'}`}
              whileHover={{ scale: 1.02 }}
              style={!scrolled ? { textShadow: '0 1px 2px rgba(0,0,0,0.3)' } : {}}
            >
              Moortinyhouse
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticButton key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    !scrolled ? 'text-white/90 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={!scrolled ? { textShadow: '0 1px 2px rgba(0,0,0,0.3)' } : {}}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    !scrolled ? 'bg-white' : 'bg-foreground'
                  }`} />
                </Link>
              </MagneticButton>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <MagneticButton>
              <LanguageSwitcher />
            </MagneticButton>

            {mounted && (
              <MagneticButton>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </MagneticButton>
            )}

            <MagneticButton className="hidden lg:block">
              <Link href="/contact">
                <Button className="rounded-full px-6">{t("nav.bookTour")}</Button>
              </Link>
            </MagneticButton>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-s border-border p-8 pt-24 rtl:right-auto rtl:left-0 rtl:border-s-0 rtl:border-e"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 p-2 hover:bg-accent/10 rounded-lg transition-colors z-10"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-serif font-medium hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length) * 0.1 }}
                  className="pt-6"
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full rounded-full" size="lg">
                      {t("nav.bookTour")}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
