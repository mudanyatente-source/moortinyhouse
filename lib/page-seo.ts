import type { SiteSettings } from './site-settings-shared'
import type { Metadata } from 'next'

const defaultTitles: Record<string, { tr: string; en: string }> = {
  home: {
    tr: 'Moortinyhouse | Tiny House Türkiye - Minimalist & Sürdürülebilir Yaşam',
    en: 'Moortinyhouse | Tiny House Turkey - Minimalist & Sustainable Living'
  },
  models: {
    tr: 'Tiny House Modelleri 2026 | Emekliler, Yazlık & Hobi Bahçesi İçin | Moortinyhouse',
    en: 'Tiny House Models 2026 | For Retirees, Summer & Hobby Garden | Moortinyhouse'
  },
  portfolio: {
    tr: 'Tamamlanan Tiny House Projeleri | İstanbul & Bursa | Moortinyhouse',
    en: 'Completed Tiny House Projects | Istanbul & Bursa | Moortinyhouse'
  },
  philosophy: {
    tr: 'Tiny House Felsefemiz | Minimalist & Sürdürülebilir Yaşam | Moortinyhouse',
    en: 'Our Tiny House Philosophy | Minimalist & Sustainable Living | Moortinyhouse'
  },
  testimonials: {
    tr: 'Müşteri Yorumları | Tiny House Sahiplerinden Gerçek Deneyimler | Moortinyhouse',
    en: 'Customer Testimonials | Real Experiences from Tiny House Owners | Moortinyhouse'
  },
  contact: {
    tr: 'İletişim | Ücretsiz Tiny House Danışmanlığı | Moortinyhouse',
    en: 'Contact | Free Tiny House Consultation | Moortinyhouse'
  }
}

const defaultDescriptions: Record<string, { tr: string; en: string }> = {
  home: {
    tr: 'Türkiye\'nin önde gelen tiny house üreticisi. Emekliler, minimalistler ve doğa severler için İstanbul ve Bursa\'da özel tasarım küçük evler. Yazlık, hobi bahçesi evi, emeklilik konutu çözümleri.',
    en: 'Turkey\'s leading tiny house manufacturer. Custom-designed small homes for retirees, minimalists, and nature lovers in Istanbul and Bursa. Summer house, hobby garden home, retirement home solutions.'
  },
  models: {
    tr: '2026 tiny house modelleri ve fiyatları. Emekliler için bakımı kolay evler, yazlık tiny house, hobi bahçesi evi, off-grid yaşam modelleri. 20m²\'den 60m²\'ye ekonomik seçenekler.',
    en: '2026 tiny house models and prices. Easy-maintenance homes for retirees, summer tiny houses, hobby garden homes, off-grid living models. Economic options from 20m² to 60m².'
  },
  portfolio: {
    tr: 'İstanbul ve Bursa\'da tamamlanan tiny house projelerimiz. Emekli evleri, yazlık konutlar, hobi bahçesi evleri. Gerçek müşteri örnekleri ve başarı hikayeleri.',
    en: 'Our completed tiny house projects in Istanbul and Bursa. Retirement homes, summer residences, hobby garden houses. Real customer examples and success stories.'
  },
  philosophy: {
    tr: 'Minimalist yaşam felsefesi ile tiny house üretimi. Emekliler ve doğa severler için sürdürülebilir, çevre dostu, ekonomik ve özgür yaşam alanları tasarlıyoruz.',
    en: 'Tiny house production with minimalist living philosophy. We design sustainable, eco-friendly, economical and free living spaces for retirees and nature lovers.'
  },
  testimonials: {
    tr: 'Tiny house sahiplerinin gerçek deneyimleri. Emekliler, genç çiftler ve doğa severlerden yorumlar. İstanbul ve Bursa\'da tiny house yaşamı hakkında değerlendirmeler.',
    en: 'Real experiences from tiny house owners. Reviews from retirees, young couples and nature lovers. Evaluations about tiny house living in Istanbul and Bursa.'
  },
  contact: {
    tr: 'Tiny house hakkında ücretsiz danışmanlık alın. İstanbul ve Bursa\'da keşif randevusu. Emekliler, yazlık ve hobi bahçesi için özel çözümler.',
    en: 'Get free consultation about tiny houses. Discovery appointment in Istanbul and Bursa. Special solutions for retirees, summer houses and hobby gardens.'
  }
}

export function getPageSeo(settings: SiteSettings | null | undefined, pageId: string, lang: 'tr' | 'en' = 'tr') {
  const page = settings?.page_seo?.[pageId] || {}
  
  const title = lang === 'tr' 
    ? (page.title_tr || settings?.seo?.meta_title_tr || defaultTitles[pageId]?.tr || 'Moortinyhouse | Tiny House Türkiye')
    : (page.title_en || settings?.seo?.meta_title_en || defaultTitles[pageId]?.en || 'Moortinyhouse | Tiny House Turkey')
    
  const description = lang === 'tr'
    ? (page.description_tr || settings?.seo?.meta_description_tr || defaultDescriptions[pageId]?.tr || 'Türkiye\'nin önde gelen tiny house üreticisi.')
    : (page.description_en || settings?.seo?.meta_description_en || defaultDescriptions[pageId]?.en || 'Turkey\'s leading tiny house manufacturer.')

  return { title, description }
}

export function getPageMetadata(settings: SiteSettings | null | undefined, pageId: string, lang: 'tr' | 'en' = 'tr'): Metadata {
  const { title, description } = getPageSeo(settings, pageId, lang)
  const siteUrl = 'https://moortinyhouse.com'
  const pageUrl = pageId === 'home' ? siteUrl : `${siteUrl}/${pageId}`
  
  const baseKeywords = [
    'tiny house',
    'tiny house türkiye',
    'mini ev',
    'küçük ev',
    'mobil ev',
    'prefabrik ev',
    'tiny house istanbul',
    'tiny house bursa',
    'tiny house fiyatları',
    'tiny house modelleri',
    'mini ev fiyatları',
    'küçük ev modelleri',
    'emekli evi',
    'yazlık ev',
    'hobi bahçesi evi',
    'doğada yaşam',
    'minimalist yaşam',
    'sürdürülebilir ev',
    'ekonomik ev',
    'off-grid ev'
  ]

  const pageSpecificKeywords: Record<string, string[]> = {
    models: [
      'tiny house çeşitleri',
      'mini ev çeşitleri',
      'orion tiny house',
      'beverly tiny house',
      'emekli için tiny house',
      'yazlık tiny house modelleri',
      'hobi bahçesi için ev',
      'küçük ev planları',
      'taşınabilir ev modelleri'
    ],
    portfolio: [
      'tamamlanan projeler',
      'tiny house portföy',
      'istanbul tiny house projeleri',
      'bursa tiny house projeleri',
      'tiny house örnekleri',
      'gerçek tiny house',
      'müşteri projeleri'
    ],
    contact: [
      'tiny house iletişim',
      'randevu',
      'tiny house keşif',
      'ücretsiz danışmanlık',
      'tiny house teklif',
      'fiyat sorgulama'
    ],
    philosophy: [
      'sürdürülebilir yaşam',
      'ekolojik ev',
      'çevre dostu ev',
      'minimalist felsefe',
      'basit yaşam',
      'doğa ile uyumlu ev'
    ],
    testimonials: [
      'müşteri yorumları',
      'tiny house referanslar',
      'müşteri memnuniyeti',
      'kullanıcı deneyimleri',
      'gerçek yorumlar'
    ],
    home: [
      'türkiye tiny house',
      'istanbul tiny house',
      'bursa tiny house',
      'moor tiny house',
      'emeklilik evi',
      'tatil evi',
      'bahçe evi',
      'ikinci ev',
      'hafta sonu evi'
    ]
  }

  const keywords = [...baseKeywords, ...(pageSpecificKeywords[pageId] || [])]

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Moortinyhouse',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'tr-TR': pageUrl,
        'en-US': `${siteUrl}/en/${pageId === 'home' ? '' : pageId}`,
      },
    },
  }
}
