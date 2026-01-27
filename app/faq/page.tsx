import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { SeoSchema } from '@/components/seo-schema'
import FAQClient from './faq-client'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Tiny House SSS 2026 | Fiyatlar, Ruhsat, Yasal Süreçler | Moortinyhouse',
    description: 'Tiny house hakkında en sık sorulan sorular. 2026 fiyatları, ruhsat süreçleri, yasal gereklilikler, teknik özellikler. Emekliler, yazlık ve hobi bahçesi için tiny house bilgileri.',
    keywords: [
      'tiny house sss',
      'tiny house fiyatları',
      'tiny house ruhsat',
      'tiny house yasal süreç',
      'tiny house izin',
      'tiny house faq',
      'mini ev fiyatları',
      'küçük ev ruhsat',
      'tiny house nedir',
      'tiny house kurulum',
      'emekli tiny house',
      'hobi bahçesi evi izin'
    ],
    openGraph: {
      title: 'Tiny House SSS 2026 | Fiyatlar, Ruhsat, Yasal Süreçler | Moortinyhouse',
      description: 'Tiny house hakkında en sık sorulan sorular ve cevapları. Fiyatlar, yasal süreçler ve teknik detaylar.',
      type: 'website'
    },
    alternates: {
      canonical: 'https://moortinyhouse.com/faq'
    }
  }
}

const faqDataForSchema = [
  {
    question: 'Tiny house nedir?',
    answer: 'Tiny house, genellikle 20-60 m² arasında olan, minimal ve sürdürülebilir yaşam için tasarlanmış küçük evlerdir. Emekliler, minimalistler ve doğa severler için ideal yaşam alanları sunar.'
  },
  {
    question: 'Tiny house fiyatları ne kadar?',
    answer: '2026 yılında tiny house fiyatları modele göre 500.000 TL ile 3.000.000 TL arasında değişmektedir. Emekliler ve çiftler için ekonomik modeller 500.000 TL\'den başlamaktadır.'
  },
  {
    question: 'Tiny house için ruhsat gerekli mi?',
    answer: 'Evet, sabit tiny house\'lar için imar izni ve ruhsat gereklidir. Tarım arazisinde O2 belgesi gerekebilir. Moortinyhouse olarak yasal süreçlerde danışmanlık desteği sunuyoruz.'
  },
  {
    question: 'Tiny house kimler için uygundur?',
    answer: 'Tiny house özellikle emekliler, minimalist yaşam isteyenler, doğa severler, genç çiftler, yazlık arayanlar ve hobi bahçesi için ev isteyenler için idealdir.'
  },
  {
    question: 'Tiny house nereye kurulabilir?',
    answer: 'Tiny house kendi arsanıza, hobi bahçesine, köy yerleşim alanına veya tiny house köylerine kurulabilir. İstanbul çevresi (Şile, Çatalca) ve Bursa bölgesi popüler lokasyonlardır.'
  },
  {
    question: 'Tiny house teslimat süresi ne kadar?',
    answer: 'Standart modeller için 2-3 ay, özelleştirilmiş modeller için 3-6 ay teslimat süresi bulunmaktadır. Türkiye genelinde teslimat yapılmaktadır.'
  }
]

export default async function FAQPage() {
  const settings = await getSiteSettings()
  
  return (
    <>
      <SeoSchema settings={settings} type="Organization" pageType="faq" faqData={faqDataForSchema} />
      <FAQClient />
    </>
  )
}
