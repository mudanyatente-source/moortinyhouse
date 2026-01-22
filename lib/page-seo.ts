import type { SiteSettings } from './site-settings-shared'
import type { Metadata } from 'next'

const defaultTitles: Record<string, { tr: string; en: string }> = {
  home: {
    tr: 'Moortinyhouse | Tiny House Türkiye - İstanbul & Bursa | Mini Ev Çözümleri',
    en: 'Moortinyhouse | Tiny House Turkey - Istanbul & Bursa | Small Home Solutions'
  },
  models: {
    tr: 'Tiny House Modelleri | Mini Ev Çeşitleri | Moortinyhouse',
    en: 'Tiny House Models | Small Home Varieties | Moortinyhouse'
  },
  portfolio: {
    tr: 'Tamamlanan Tiny House Projeleri | Portföy | Moortinyhouse',
    en: 'Completed Tiny House Projects | Portfolio | Moortinyhouse'
  },
  philosophy: {
    tr: 'Tiny House Felsefemiz | Sürdürülebilir Yaşam | Moortinyhouse',
    en: 'Our Tiny House Philosophy | Sustainable Living | Moortinyhouse'
  },
  testimonials: {
    tr: 'Müşteri Yorumları | Tiny House Referanslar | Moortinyhouse',
    en: 'Customer Testimonials | Tiny House Reviews | Moortinyhouse'
  },
  contact: {
    tr: 'İletişim | Tiny House İletişim Formu | Moortinyhouse',
    en: 'Contact | Tiny House Contact Form | Moortinyhouse'
  }
}

const defaultDescriptions: Record<string, { tr: string; en: string }> = {
  home: {
    tr: 'Türkiye\'nin önde gelen tiny house üreticisi. İstanbul ve Bursa\'da modern, sürdürülebilir ve özelleştirilebilir tiny house modelleri. Mini ev, küçük ev, mobil ev çözümleri.',
    en: 'Turkey\'s leading tiny house manufacturer. Modern, sustainable and customizable tiny house models in Istanbul and Bursa. Small home, mobile home solutions.'
  },
  models: {
    tr: 'Geniş tiny house model yelpazesi. 20m²\'den 60m²\'ye kadar farklı boyutlarda mini ev modelleri. İstanbul ve Bursa\'da tiny house fiyatları ve özellikleri.',
    en: 'Wide range of tiny house models. Mini home models from 20m² to 60m² in different sizes. Tiny house prices and features in Istanbul and Bursa.'
  },
  portfolio: {
    tr: 'Tamamlanan tiny house projelerimizi keşfedin. İstanbul ve Bursa\'da gerçekleştirdiğimiz başarılı mini ev projeleri ve müşteri memnuniyeti.',
    en: 'Discover our completed tiny house projects. Successful mini home projects we completed in Istanbul and Bursa and customer satisfaction.'
  },
  philosophy: {
    tr: 'Sürdürülebilir yaşam felsefesi ile tiny house üretimi. Çevre dostu, enerji verimli ve modern tasarım prensipleri.',
    en: 'Tiny house production with sustainable living philosophy. Eco-friendly, energy efficient and modern design principles.'
  },
  testimonials: {
    tr: 'Tiny house müşterilerimizin deneyimleri ve yorumları. İstanbul ve Bursa\'da tiny house sahibi olan müşterilerimizin gerçek hikayeleri.',
    en: 'Experiences and reviews of our tiny house customers. Real stories of our customers who own tiny houses in Istanbul and Bursa.'
  },
  contact: {
    tr: 'Tiny house hakkında sorularınız için bizimle iletişime geçin. İstanbul ve Bursa\'da ücretsiz keşif ve danışmanlık hizmeti.',
    en: 'Contact us for questions about tiny houses. Free exploration and consultancy service in Istanbul and Bursa.'
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
  
  const keywords = [
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
    ...(pageId === 'models' ? ['tiny house çeşitleri', 'mini ev çeşitleri', 'orion tiny house', 'beverly tiny house'] : []),
    ...(pageId === 'portfolio' ? ['tamamlanan projeler', 'tiny house portföy', 'istanbul tiny house projeleri', 'bursa tiny house projeleri'] : []),
    ...(pageId === 'contact' ? ['tiny house iletişim', 'randevu', 'tiny house keşif', 'ücretsiz danışmanlık'] : []),
    ...(pageId === 'philosophy' ? ['sürdürülebilir yaşam', 'ekolojik ev', 'çevre dostu ev'] : []),
    ...(pageId === 'testimonials' ? ['müşteri yorumları', 'tiny house referanslar', 'müşteri memnuniyeti'] : []),
  ]

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
