"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Calendar, MessageSquare, Users } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/i18n"
import { useSiteSettings } from "@/components/site-settings-provider"

export default function ContactClient() {
  const { t } = useLanguage()
  const { company_info, map } = useSiteSettings()
  const [inquiryType, setInquiryType] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mapHtml, setMapHtml] = useState<string>("")
  const [isMounted, setIsMounted] = useState(false)

  const email = company_info?.email || "hello@moortinyhouse.com"
  const phone = company_info?.phone || "+1 (555) 123-4567"
  const address = company_info?.address || "Portland, Oregon"

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Process map HTML only on client-side after mount
  useEffect(() => {
    if (!isMounted) return

    const html = (map?.embed_html || "").trim()
    if (!html) {
      setMapHtml("")
      return
    }

    let processed = html
    if (html.includes("<iframe")) {
      if (!/style\s*=/.test(html)) {
        processed = html.replace(/<iframe\b/i, '<iframe style="border:0;width:100%;height:100%;"')
      } else {
        processed = html.replace(/style\s*=\s*(['"])(.*?)\1/i, (_m, q, styles) => `style=${q}${styles};border:0;width:100%;height:100%;${q}`)
      }
    }
    setMapHtml(processed)
  }, [map?.embed_html, isMounted])

  // Debug: Log settings in development
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[Contact] Settings:', { company_info, map, mapHtml, isMounted })
    }
  }, [company_info, map, mapHtml, isMounted])

  const contactMethods = [
    {
      icon: Mail,
      titleKey: "contact.email.title",
      descKey: "contact.email.desc",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Phone,
      titleKey: "contact.phone.title",
      descKey: "contact.phone.desc",
      value: phone,
      href: `tel:${phone.replace(/\s+/g, "")}`,
    },
    {
      icon: MapPin,
      titleKey: "contact.visit.title",
      descKey: "contact.visit.desc",
      value: address,
      href: (isMounted && mapHtml) ? "#map" : "#",
    },
  ]

  const inquiryTypes = [
    { icon: Calendar, labelKey: "contact.form.tour", value: "tour" },
    { icon: MessageSquare, labelKey: "contact.form.general", value: "general" },
    { icon: Users, labelKey: "contact.form.custom", value: "custom" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = {
        name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || null,
        message: formData.get("message") as string,
        inquiry_type: inquiryType,
        preferred_date: (formData.get("preferredDate") as string) || null,
        status: "pending",
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">{t("contact.badge")}</span>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 text-balance">
              {t("contact.title1")} <span className="text-accent">{t("contact.title2")}</span>
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t("contact.subtitle")}</p>
          </RevealAnimation>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, i) => (
              <RevealAnimation key={method.titleKey} delay={i * 0.1}>
                <motion.a
                  href={method.href}
                  whileHover={{ y: -5 }}
                  className="block bg-card rounded-2xl p-6 border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <method.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-1">{t(method.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t(method.descKey)}</p>
                  <p className="font-medium text-accent">{method.value}</p>
                </motion.a>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <RevealAnimation>
              <div className="bg-card rounded-2xl p-8 border border-border">
                {isSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium mb-4">{t("contact.form.success")}</h3>
                    <p className="text-muted-foreground mb-6">{t("contact.form.successDesc")}</p>
                    <Button variant="outline" className="rounded-full bg-transparent" onClick={() => setIsSubmitted(false)}>
                      {t("contact.form.sendAnother")}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label className="mb-3 block">{t("contact.form.help")}</Label>
                      <div className="flex flex-wrap gap-3">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setInquiryType(type.value)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                              inquiryType === type.value ? "bg-accent text-accent-foreground border-accent" : "border-border hover:border-accent/50"
                            }`}
                          >
                            <type.icon className="w-4 h-4" />
                            {t(type.labelKey)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{t("contact.form.firstName")}</Label>
                        <Input id="firstName" name="firstName" placeholder="John" className="mt-2 rounded-xl" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t("contact.form.lastName")}</Label>
                        <Input id="lastName" name="lastName" placeholder="Doe" className="mt-2 rounded-xl" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">{t("contact.form.email")}</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" className="mt-2 rounded-xl" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                      <Input id="phone" name="phone" type="tel" placeholder={phone} defaultValue={phone} className="mt-2 rounded-xl" />
                    </div>

                    {inquiryType === "tour" && (
                      <div>
                        <Label htmlFor="preferredDate">{t("contact.form.preferredDate")}</Label>
                        <Input id="preferredDate" name="preferredDate" type="date" className="mt-2 rounded-xl" />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="message">{t("contact.form.message")}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t("contact.form.messagePlaceholder")}
                        className="mt-2 rounded-xl min-h-32"
                        required
                      />
                    </div>

                    <MagneticButton className="w-full">
                      <Button type="submit" className="w-full rounded-full gap-2" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                            />
                            {t("contact.form.sending")}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t("contact.form.send")}
                          </>
                        )}
                      </Button>
                    </MagneticButton>
                  </form>
                )}
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="/modern-tiny-house-showroom-interior.webp" alt="Our showroom" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="font-semibold mb-2">{t("contact.showroom.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact.showroom.desc")}</p>
                  <div className="text-sm">
                    <div className="font-medium">{t("contact.showroom.hours")}</div>
                    <div className="text-muted-foreground">
                      {t("contact.showroom.schedule")}
                      <br />
                      {t("contact.showroom.sunday")}
                    </div>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-32" id="map">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            {isMounted && mapHtml && mapHtml.trim().length > 0 ? (
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-muted">
                <div 
                  key={mapHtml.substring(0, 100)} 
                  className="absolute inset-0" 
                  dangerouslySetInnerHTML={{ __html: mapHtml }}
                />
              </div>
            ) : (
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-muted">
                <img src="/map-location-portland-oregon.webp" alt="Location map" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg"
                  >
                    <MapPin className="w-6 h-6 text-accent-foreground" />
                  </motion.div>
                </div>
              </div>
            )}
          </RevealAnimation>
        </div>
      </section>

      <Footer />
    </main>
  )
}

