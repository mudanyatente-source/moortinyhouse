"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { useLanguage } from "@/lib/i18n"
import { ChevronDown, MessageCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqCategories = [
  {
    id: "genel",
    title: "Genel Sorular",
    questions: [
      {
        q: "Tiny house nedir?",
        a: "Tiny house, genellikle 20-60 m² arasında olan, minimal ve sürdürülebilir yaşam için tasarlanmış küçük evlerdir. Taşınabilir veya sabit olabilirler ve modern yaşam ihtiyaçlarını karşılayacak şekilde optimize edilmiş alan kullanımına sahiptirler."
      },
      {
        q: "Tiny house kimler için uygundur?",
        a: "Tiny house'lar minimal yaşam tarzını benimseyen, çevre bilinci yüksek, maliyet etkin bir yaşam arayan kişiler ve aileler için idealdir. Tek kişilik yaşamdan küçük ailelere kadar farklı ihtiyaçlara uygun modellerimiz bulunmaktadır."
      },
      {
        q: "Tiny house'lar taşınabilir mi?",
        a: "Evet, birçok modelimiz taşınabilir özelliktedir. Özel römork üzerine monte edilmiş modellerimiz sayesinde istediğiniz yere taşıyabilirsiniz. Sabit modellerimiz de mevcuttur."
      },
      {
        q: "Tiny house'da hangi özellikler bulunur?",
        a: "Modellerimize göre değişmekle birlikte, tam donanımlı mutfak, banyo, yatak odası, oturma alanı, depolama çözümleri ve enerji verimli sistemler standart olarak bulunmaktadır."
      }
    ]
  },
  {
    id: "fiyat",
    title: "Fiyat ve Ödeme",
    questions: [
      {
        q: "Tiny house fiyatları ne kadar?",
        a: "Fiyatlarımız model, boyut ve özelliklere göre değişmektedir. Temel modellerimiz 300.000 TL'den başlamakta, özelleştirilmiş lüks modellerimiz 1.000.000 TL'ye kadar çıkmaktadır. Detaylı fiyat bilgisi için bizimle iletişime geçebilirsiniz."
      },
      {
        q: "Ödeme seçenekleri nelerdir?",
        a: "Peşin ödeme, taksitli ödeme ve finansman seçenekleri sunmaktayız. Detaylı ödeme planları için satış ekibimizle görüşebilirsiniz."
      },
      {
        q: "Ek maliyetler var mı?",
        a: "Temel fiyata dahil olmayan ek maliyetler arasında taşıma, kurulum (sabit modeller için), ruhsat işlemleri ve özel özelleştirmeler bulunmaktadır. Tüm ek maliyetler önceden belirtilir."
      }
    ]
  },
  {
    id: "yasal",
    title: "Yasal Süreçler",
    questions: [
      {
        q: "Tiny house için ruhsat alınır mı?",
        a: "Evet, sabit tiny house'lar için ruhsat alınması gerekmektedir. Taşınabilir modeller için farklı yasal düzenlemeler geçerlidir. Yasal süreçler hakkında detaylı bilgi için danışmanlık hizmetimizden yararlanabilirsiniz."
      },
      {
        q: "Tiny house'u nereye koyabilirim?",
        a: "Tiny house'unuzu kendi arsanıza, kiralık araziye veya tiny house köylerine yerleştirebilirsiniz. Yerleşim için gerekli yasal izinler ve şartlar konusunda size yardımcı oluyoruz."
      },
      {
        q: "Belediye izinleri gerekli mi?",
        a: "Evet, sabit yerleşim için belediye izinleri gereklidir. Taşınabilir modeller için durum farklı olabilir. Her durumda yasal süreçlerde size rehberlik ediyoruz."
      }
    ]
  },
  {
    id: "teknik",
    title: "Teknik Özellikler",
    questions: [
      {
        q: "Tiny house'ların yalıtımı nasıl?",
        a: "Tüm modellerimiz A+ enerji sınıfı yalıtıma sahiptir. Yüksek kaliteli yalıtım malzemeleri kullanılarak yazın serin, kışın sıcak bir yaşam alanı sağlanmaktadır."
      },
      {
        q: "Elektrik ve su bağlantıları nasıl yapılır?",
        a: "Tiny house'lar şebeke elektriğine bağlanabilir veya güneş paneli sistemi ile off-grid çalışabilir. Su bağlantıları şebeke suyuna veya su deposu sistemine bağlanabilir. Her iki seçenek de mevcuttur."
      },
      {
        q: "Tiny house'lar dayanıklı mı?",
        a: "Evet, tüm modellerimiz yüksek kaliteli malzemeler ve sağlam yapı teknikleri kullanılarak üretilmektedir. Galvanizli çelik şasi ve dayanıklı yapı malzemeleri ile uzun yıllar kullanım garantisi sunuyoruz."
      },
      {
        q: "Bakım gerektirir mi?",
        a: "Normal bir ev kadar bakım gerektirir. Düzenli temizlik ve yıllık kontrol yeterlidir. Özel bakım gerektiren sistemler için kullanım kılavuzu ve destek hizmeti sunuyoruz."
      }
    ]
  },
  {
    id: "lokasyon",
    title: "Lokasyon ve Teslimat",
    questions: [
      {
        q: "Hangi şehirlerde hizmet veriyorsunuz?",
        a: "Öncelikli olarak İstanbul ve Bursa'da hizmet veriyoruz. Türkiye genelinde teslimat yapabiliyoruz. Taşıma maliyetleri mesafeye göre değişmektedir."
      },
      {
        q: "Teslimat süresi ne kadar?",
        a: "Standart modeller için 2-3 ay, özelleştirilmiş modeller için 3-6 ay arasında teslimat süresi bulunmaktadır. Detaylı zaman çizelgesi için bizimle iletişime geçebilirsiniz."
      },
      {
        q: "Kurulum hizmeti sunuyor musunuz?",
        a: "Evet, sabit modeller için profesyonel kurulum hizmeti sunuyoruz. Kurulum ekibimiz tiny house'unuzu hazırlayıp, gerekli bağlantıları yapmaktadır."
      }
    ]
  }
]

export default function FAQClient() {
  const { t } = useLanguage()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4 block">
              SSS
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 text-balance">
              Sık Sorulan <span className="text-accent">Sorular</span>
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Tiny house hakkında merak ettiğiniz her şey. Fiyatlar, modeller, yasal süreçler ve daha fazlası hakkında sorularınızın cevapları.
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <RevealAnimation key={category.id} delay={categoryIndex * 0.1}>
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                  <h2 className="text-2xl font-serif font-medium mb-6">{category.title}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`} className="border-b border-border last:border-b-0">
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium">{faq.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </RevealAnimation>
            ))}
          </div>

          {/* Contact CTA */}
          <RevealAnimation delay={0.6}>
            <div className="mt-16 text-center bg-card rounded-2xl border border-border p-12">
              <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-medium mb-4">Sorunuz mu var?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Aradığınız cevabı bulamadıysanız, bizimle iletişime geçmekten çekinmeyin. 
                Size yardımcı olmaktan mutluluk duyarız.
              </p>
              <Link href="/contact">
                <Button className="rounded-full gap-2" size="lg">
                  İletişime Geç
                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                </Button>
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </section>

      <Footer />
    </main>
  )
}
