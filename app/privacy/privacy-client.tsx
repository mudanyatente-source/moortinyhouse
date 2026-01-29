'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { RevealAnimation } from '@/components/reveal-animation'
import { useLanguage } from '@/lib/i18n'

export default function PrivacyClient() {
  const { t, language } = useLanguage()

  const content = {
    tr: {
      title: 'Gizlilik Politikası',
      lastUpdated: 'Son Güncelleme: 15 Ocak 2026',
      sections: [
        {
          title: '1. Genel Bilgiler',
          content: `Moortinyhouse olarak, ziyaretçilerimizin ve müşterilerimizin kişisel verilerinin korunmasına büyük önem veriyoruz. Bu gizlilik politikası, web sitemizi kullanırken topladığımız bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.`
        },
        {
          title: '2. Toplanan Bilgiler',
          content: `Web sitemizde şu bilgileri toplayabiliriz:
- İletişim formu aracılığıyla gönderilen ad, e-posta, telefon numarası
- Web sitesi kullanım verileri (çerezler, IP adresi)
- İletişim talepleri ve mesajlar`
        },
        {
          title: '3. Bilgilerin Kullanımı',
          content: `Toplanan bilgiler şu amaçlarla kullanılır:
- İletişim taleplerinize yanıt vermek
- Hizmetlerimiz hakkında bilgilendirme yapmak
- Web sitesi deneyimini iyileştirmek
- Yasal yükümlülüklerimizi yerine getirmek`
        },
        {
          title: '4. Bilgilerin Paylaşımı',
          content: `Kişisel bilgileriniz, yasal yükümlülükler dışında üçüncü taraflarla paylaşılmaz. Hizmet sağlayıcılarımız (hosting, e-posta servisleri) sadece hizmet sunumu için gerekli bilgilere erişebilir.`
        },
        {
          title: '5. Çerezler',
          content: `Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.`
        },
        {
          title: '6. Veri Güvenliği',
          content: `Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve idari önlemler alınmaktadır. Ancak, internet üzerinden veri aktarımının %100 güvenli olmadığını unutmayın.`
        },
        {
          title: '7. Haklarınız',
          content: `KVKK kapsamında, kişisel verilerinizle ilgili olarak:
- Erişim hakkı
- Düzeltme hakkı
- Silme hakkı
- İtiraz hakkı
- Veri taşınabilirliği hakkı

gibi haklarınız bulunmaktadır.`
        },
        {
          title: '8. İletişim',
          content: `Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.`
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: January 15, 2026',
      sections: [
        {
          title: '1. General Information',
          content: `At Moortinyhouse, we place great importance on protecting the personal data of our visitors and customers. This privacy policy explains how we use and protect the information we collect when you use our website.`
        },
        {
          title: '2. Information Collected',
          content: `We may collect the following information on our website:
- Name, email, phone number submitted through contact forms
- Website usage data (cookies, IP address)
- Contact requests and messages`
        },
        {
          title: '3. Use of Information',
          content: `The collected information is used for:
- Responding to your contact requests
- Providing information about our services
- Improving website experience
- Fulfilling our legal obligations`
        },
        {
          title: '4. Information Sharing',
          content: `Your personal information is not shared with third parties except for legal obligations. Our service providers (hosting, email services) can only access information necessary for service delivery.`
        },
        {
          title: '5. Cookies',
          content: `Our website uses cookies to improve user experience. You can manage cookies through your browser settings.`
        },
        {
          title: '6. Data Security',
          content: `Appropriate technical and administrative measures are taken to ensure the security of your personal data. However, please note that data transmission over the internet is not 100% secure.`
        },
        {
          title: '7. Your Rights',
          content: `Under data protection laws, you have rights regarding your personal data including:
- Right of access
- Right to rectification
- Right to erasure
- Right to object
- Right to data portability`
        },
        {
          title: '8. Contact',
          content: `You can contact us with questions about our privacy policy.`
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
