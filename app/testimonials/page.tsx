"use client"

import { motion } from "framer-motion"
import { Quote, Star, MapPin } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { useLanguage } from "@/lib/i18n"

const testimonials = [
  {
    id: 1,
    name: "Ayşe & Mehmet Yılmaz",
    location: "İstanbul, Türkiye",
    model: "Aura",
    image: "/happy-couple-portrait-outdoor-natural-light-smilin.webp",
    homeImage: "/modern-tiny-house-aura-model-exterior.webp",
    quoteEn:
      "Moving into our Moortinyhouse was the best decision we ever made. The quality of craftsmanship exceeded all our expectations. We've reduced our carbon footprint by 60% and increased our quality of life exponentially.",
    quoteTr:
      "Moortinyhouse'a taşınmak aldığımız en iyi karardı. İşçilik kalitesi tüm beklentilerimizi aştı. Karbon ayak izimizi %60 azalttık ve yaşam kalitemizi katlanarak artırdık.",
    quoteAr:
      "كان الانتقال إلى Moortinyhouse أفضل قرار اتخذناه على الإطلاق. تجاوزت جودة الحرفية جميع توقعاتنا. قللنا بصمتنا الكربونية بنسبة 60% وزدنا جودة حياتنا بشكل كبير.",
    rating: 5,
    date: "January 2026",
  },
  {
    id: 2,
    name: "Zeynep Kaya",
    location: "Bursa, Türkiye",
    model: "Zen",
    image: "/young-woman-portrait-outdoor-nature-happy-lifestyl.webp",
    homeImage: "/zen-tiny-house-minimalist-interior.webp",
    quoteEn:
      "As a digital nomad, the Zen model is perfect. It's my sanctuary that I can take anywhere. The design is brilliant - every inch is thoughtfully utilized. I've never felt more at home.",
    quoteTr:
      "Dijital göçebe olarak Zen modeli mükemmel. Her yere götürebileceğim sığınağım. Tasarım harika - her santimetre düşünceli bir şekilde kullanılmış. Kendimi hiç bu kadar evimde hissetmemiştim.",
    quoteAr:
      "كرحالة رقمي، نموذج Zen مثالي. إنه ملاذي الذي يمكنني أخذه إلى أي مكان. التصميم رائع - كل بوصة مستخدمة بعناية. لم أشعر أبدًا بأنني في بيتي بهذا الشكل.",
    rating: 5,
    date: "December 2025",
  },
  {
    id: 3,
    name: "Demir Ailesi",
    location: "İstanbul, Türkiye",
    model: "Nova",
    image: "/family-portrait-parents-children-outdoor-happy-war.webp",
    homeImage: "/nova-tiny-house-family-home-exterior.webp",
    quoteEn:
      "We were skeptical about raising two kids in a tiny house, but the Nova model changed everything. Our family has never been closer, and the kids absolutely love their cozy loft spaces. Best investment we've ever made.",
    quoteTr:
      "İki çocuk yetiştirmek konusunda şüpheliydik ama Nova modeli her şeyi değiştirdi. Ailemiz hiç bu kadar yakın olmamıştı ve çocuklar rahat çatı katı alanlarını çok seviyor. Yaptığımız en iyi yatırım.",
    quoteAr:
      "كنا متشككين بشأن تربية طفلين في منزل صغير، لكن نموذج Nova غير كل شيء. لم تكن عائلتنا أقرب من أي وقت مضى، والأطفال يحبون تمامًا مساحاتهم العلوية المريحة. أفضل استثمار قمنا به.",
    rating: 5,
    date: "October 2025",
  },
  {
    id: 4,
    name: "Can Özkan",
    location: "Bursa, Türkiye",
    model: "Horizon",
    image: "/man-portrait-outdoor-adventure-traveler.webp",
    homeImage: "/horizon-tiny-house-on-wheels-travel.webp",
    quoteEn:
      "The Horizon model has allowed me to live my dream of traveling while working remotely. The build quality is exceptional - it handles every road condition perfectly. I've visited 23 states so far!",
    quoteTr:
      "Horizon modeli, uzaktan çalışırken seyahat etme hayalimi gerçekleştirmemi sağladı. Yapı kalitesi olağanüstü - her yol koşulunu mükemmel şekilde karşılıyor. Şimdiye kadar 23 eyalet ziyaret ettim!",
    quoteAr:
      "سمح لي نموذج Horizon بتحقيق حلمي في السفر أثناء العمل عن بُعد. جودة البناء استثنائية - يتعامل مع كل ظروف الطريق بشكل مثالي. زرت 23 ولاية حتى الآن!",
    rating: 5,
    date: "September 2025",
  },
  {
    id: 5,
    name: "Fatma & Ali Şahin",
    location: "İstanbul, Türkiye",
    model: "Terra",
    image: "/mature-couple-portrait-nature-outdoor.webp",
    homeImage: "/terra-tiny-house-green-roof-eco.webp",
    quoteEn:
      "After 30 years in a traditional home, downsizing to the Terra was liberating. The earth-integrated design keeps us cool in summer and warm in winter naturally. Our energy bills are practically zero.",
    quoteTr:
      "Geleneksel bir evde 30 yıl sonra Terra'ya küçülmek özgürleştirici oldu. Toprakla bütünleşik tasarım, bizi yazın serin ve kışın doğal olarak sıcak tutuyor. Enerji faturalarımız neredeyse sıfır.",
    quoteAr:
      "بعد 30 عامًا في منزل تقليدي، كان الانتقال إلى Terra محررًا. يحافظ التصميم المتكامل مع الأرض على برودتنا في الصيف ودفئنا في الشتاء بشكل طبيعي. فواتير الطاقة لدينا تقريبًا صفر.",
    rating: 5,
    date: "August 2025",
  },
  {
    id: 6,
    name: "Emre Doğan",
    location: "Bursa, Türkiye",
    model: "Lux",
    image: "/young-professional-portrait-modern-style.webp",
    homeImage: "/lux-tiny-house-luxury-interior-premium.webp",
    quoteEn:
      "I didn't want to compromise on luxury, and with the Lux model, I didn't have to. Smart home integration, premium materials, dual bathrooms - it's a boutique hotel I get to call home.",
    quoteTr:
      "Lüksten ödün vermek istemedim ve Lux modeli ile buna gerek kalmadı. Akıllı ev entegrasyonu, premium malzemeler, çift banyo - ev diyebileceğim bir butik otel.",
    quoteAr:
      "لم أكن أريد التنازل عن الفخامة، ومع نموذج Lux، لم أضطر لذلك. تكامل المنزل الذكي، المواد الفاخرة، حمامان - إنه فندق بوتيكي أستطيع أن أسميه منزلي.",
    rating: 5,
    date: "November 2025",
  },
]

export default function TestimonialsPage() {
  const { t, language } = useLanguage()

  const getQuote = (testimonial: (typeof testimonials)[0]) => {
    if (language === "tr") return testimonial.quoteTr
    if (language === "ar") return testimonial.quoteAr
    return testimonial.quoteEn
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
              {t("testimonials.badge")}
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 text-balance">
              {t("testimonials.title1")} <span className="text-accent">{t("testimonials.title2")}</span>
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t("testimonials.subtitle")}</p>
          </RevealAnimation>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {testimonials.map((testimonial, i) => (
              <RevealAnimation key={testimonial.id} delay={0.1}>
                <motion.article
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative">
                      <div className="aspect-video rounded-2xl overflow-hidden">
                        <img
                          src={testimonial.homeImage || "/placeholder.svg"}
                          alt={`${testimonial.name}'s ${testimonial.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-xl"
                      >
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                        {testimonial.model} {t("testimonials.owner")}
                      </div>
                      <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                    </div>

                    <Quote className="w-10 h-10 text-accent/30 mb-4" />

                    <p className="text-xl md:text-2xl leading-relaxed mb-6 font-serif">{getQuote(testimonial)}</p>

                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>

                    <div>
                      <div className="font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
