'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { RevealAnimation } from '@/components/reveal-animation'
import { useLanguage } from '@/lib/i18n'

export default function TermsClient() {
  const { t, language } = useLanguage()

  const content = {
    tr: {
      title: 'Hizmet Şartları',
      lastUpdated: 'Son Güncelleme: 15 Ocak 2026',
      sections: [
        {
          title: '1. Genel Koşullar',
          content: `Bu hizmet şartları, Moortinyhouse web sitesinin kullanımına ilişkin koşulları belirlemektedir. Web sitemizi kullanarak, bu şartları kabul etmiş sayılırsınız.`
        },
        {
          title: '2. Hizmetler',
          content: `Moortinyhouse, tiny house üretimi, satışı ve danışmanlık hizmetleri sunmaktadır. Web sitemiz, ürün ve hizmetlerimiz hakkında bilgi sağlamak amacıyla kullanılmaktadır.`
        },
        {
          title: '3. Kullanıcı Yükümlülükleri',
          content: `Web sitemizi kullanırken:
- Yasalara uygun davranmalısınız
- Başkalarının haklarına saygı göstermelisiniz
- Zararlı içerik paylaşmamalısınız
- Telif haklarına saygı göstermelisiniz`
        },
        {
          title: '4. Fikri Mülkiyet',
          content: `Web sitemizdeki tüm içerikler (metinler, görseller, logolar) Moortinyhouse'a aittir ve telif hakkı koruması altındadır. İzinsiz kullanım yasaktır.`
        },
        {
          title: '5. Sorumluluk Reddi',
          content: `Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır. Ürün özellikleri ve fiyatlar önceden haber verilmeksizin değiştirilebilir. Kesin bilgi için bizimle iletişime geçin.`
        },
        {
          title: '6. İletişim ve Siparişler',
          content: `Web sitemiz üzerinden yapılan iletişim talepleri ve siparişler, ayrı bir sözleşme ile tamamlanır. Bu şartlar, web sitesi kullanımına ilişkindir.`
        },
        {
          title: '7. Değişiklikler',
          content: `Bu hizmet şartlarını istediğimiz zaman değiştirme hakkını saklı tutarız. Değişiklikler web sitemizde yayınlandığında yürürlüğe girer.`
        },
        {
          title: '8. Uygulanacak Hukuk',
          content: `Bu hizmet şartları Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir uyuşmazlık durumunda Türkiye mahkemeleri yetkilidir.`
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: January 15, 2026',
      sections: [
        {
          title: '1. General Terms',
          content: `These terms of service establish the conditions for using the Moortinyhouse website. By using our website, you agree to these terms.`
        },
        {
          title: '2. Services',
          content: `Moortinyhouse provides tiny house manufacturing, sales, and consulting services. Our website is used to provide information about our products and services.`
        },
        {
          title: '3. User Obligations',
          content: `When using our website, you must:
- Act in accordance with laws
- Respect others' rights
- Not share harmful content
- Respect copyrights`
        },
        {
          title: '4. Intellectual Property',
          content: `All content on our website (texts, images, logos) belongs to Moortinyhouse and is protected by copyright. Unauthorized use is prohibited.`
        },
        {
          title: '5. Disclaimer',
          content: `Information on our website is for general information purposes. Product features and prices may change without prior notice. Contact us for accurate information.`
        },
        {
          title: '6. Contact and Orders',
          content: `Contact requests and orders made through our website are completed with a separate contract. These terms relate to website use.`
        },
        {
          title: '7. Changes',
          content: `We reserve the right to change these terms of service at any time. Changes take effect when published on our website.`
        },
        {
          title: '8. Applicable Law',
          content: `These terms of service are subject to the laws of the Republic of Turkey. Turkish courts are authorized in case of any dispute.`
        }
      ]
    }
  }

  const currentContent = content[language as 'tr' | 'en'] || content.tr

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-4">
              {currentContent.title}
            </h1>
            <p className="text-muted-foreground mb-12">{currentContent.lastUpdated}</p>
          </RevealAnimation>

          <div className="max-w-4xl space-y-8">
            {currentContent.sections.map((section, index) => (
              <RevealAnimation key={index} delay={0.1 * (index + 1)}>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-serif font-medium mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
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
