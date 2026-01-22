"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, ArrowRight, Star } from "lucide-react"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

const testimonials = [
  {
    id: 1,
    name: "Selin & Mert Yılmaz",
    location: "Kadıköy, İstanbul",
    model: "Safir",
    image: "/happy-couple-portrait-outdoor-natural-light-smilin.webp",
    quoteKey: "testimonial.1.quote",
    rating: 5,
  },
  {
    id: 2,
    name: "Zeynep Demir",
    location: "Nilüfer, Bursa",
    model: "Huzur",
    image: "/young-woman-portrait-outdoor-nature-happy-lifestyl.webp",
    quoteKey: "testimonial.2.quote",
    rating: 5,
  },
  {
    id: 3,
    name: "Öztürk Ailesi",
    location: "Çankaya, Ankara",
    model: "Yıldız",
    image: "/family-portrait-parents-children-outdoor-happy-war.webp",
    quoteKey: "testimonial.3.quote",
    rating: 5,
  },
]

// Hardcoded quotes since they're long
const quotes: Record<string, Record<string, string>> = {
  "testimonial.1.quote": {
    en: "Moving into our Moortinyhouse was the best decision we ever made. The quality of craftsmanship exceeded all our expectations. We've reduced our footprint and increased our quality of life.",
    tr: "Moortinyhouse'a taşınmak aldığımız en iyi karardı. İşçilik kalitesi tüm beklentilerimizi aştı. Ayak izimizi azalttık ve yaşam kalitemizi artırdık.",
    ar: "كان الانتقال إلى Moortinyhouse أفضل قرار اتخذناه على الإطلاق. تجاوزت جودة الحرفية جميع توقعاتنا. قللنا بصمتنا وزدنا جودة حياتنا.",
  },
  "testimonial.2.quote": {
    en: "As a digital nomad, the Zen model is perfect. It's my sanctuary that I can take anywhere. The design is brilliant - every inch is thoughtfully utilized.",
    tr: "Dijital göçebe olarak, Zen modeli mükemmel. Her yere götürebileceğim sığınağım. Tasarım harika - her santimetre düşünceli bir şekilde kullanılmış.",
    ar: "كرحالة رقمي، نموذج Zen مثالي. إنه ملاذي الذي يمكنني أخذه إلى أي مكان. التصميم رائع - كل بوصة مستخدمة بعناية.",
  },
  "testimonial.3.quote": {
    en: "We were skeptical about raising two kids in a tiny house, but the Nova model changed everything. Our family has never been closer, and the kids love their cozy spaces.",
    tr: "İki çocuk yetiştirmek konusunda şüpheliydik, ama Nova modeli her şeyi değiştirdi. Ailemiz hiç bu kadar yakın olmamıştı ve çocuklar rahat alanlarını seviyor.",
    ar: "كنا متشككين بشأن تربية طفلين في منزل صغير، لكن نموذج Nova غير كل شيء. لم تكن عائلتنا أقرب من أي وقت مضى، والأطفال يحبون مساحاتهم المريحة.",
  },
}

export function TestimonialsPreview() {
  const { t, language } = useLanguage()
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const getQuote = (key: string) => quotes[key]?.[language] || quotes[key]?.en || ""

  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <RevealAnimation>
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
              {t("stories.badge")}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-balance">
              {t("stories.title1")} <span className="text-accent">{t("stories.title2")}</span>
            </h2>
          </div>
        </RevealAnimation>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-3 rounded-full">
                  <span className="font-medium">
                    {testimonials[current].model} {t("testimonials.owner")}
                  </span>
                </div>
              </div>

              <div>
                <Quote className="w-12 h-12 text-accent/30 mb-6" />
                <p className="text-xl md:text-2xl leading-relaxed mb-8 font-serif">
                  {getQuote(testimonials[current].quoteKey)}
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-lg">{testimonials[current].name}</div>
                  <div className="text-muted-foreground">{testimonials[current].location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-accent" : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <MagneticButton>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent"
                  onClick={prev}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent"
                  onClick={next}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>

        <RevealAnimation delay={0.2}>
          <div className="text-center mt-16">
            <MagneticButton>
              <Link href="/testimonials">
                <Button variant="outline" className="rounded-full px-8 gap-2 group bg-transparent">
                  {t("testimonials.readMore")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  )
}
