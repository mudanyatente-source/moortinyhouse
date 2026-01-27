import { SiteSettings } from '@/lib/site-settings-shared'

interface SeoSchemaProps {
  settings: SiteSettings
  type?: 'Organization' | 'WebSite' | 'LocalBusiness'
  pageType?: 'home' | 'models' | 'model' | 'portfolio' | 'contact' | 'blog' | 'faq'
  modelData?: {
    name: string
    description: string
    price?: number
    image?: string
    slug?: string
  }
  articleData?: {
    title: string
    description: string
    datePublished: string
    dateModified?: string
    image?: string
    author?: string
  }
  faqData?: Array<{
    question: string
    answer: string
  }>
}

export function SeoSchema({ settings, type = 'Organization', pageType = 'home', modelData, articleData, faqData }: SeoSchemaProps) {
  const companyInfo = settings.company_info || {}
  const siteUrl = 'https://moortinyhouse.com'
  const currentDate = new Date().toISOString()
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: companyInfo.name_tr || companyInfo.name_en || 'Moortinyhouse',
    alternateName: ['Moor Tiny House', 'Moortinyhouse Tiny House Türkiye'],
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/icon.svg`,
      width: 512,
      height: 512
    },
    image: `${siteUrl}/og-image.jpg`,
    description: 'Türkiye\'nin önde gelen tiny house üreticisi. Emekliler, minimalistler ve doğa severler için İstanbul ve Bursa\'da özel tasarım küçük evler.',
    foundingDate: '2025',
    slogan: 'Minimalist Yaşam, Maksimum Özgürlük',
    knowsAbout: [
      'Tiny House',
      'Mini Ev',
      'Küçük Ev',
      'Minimalist Yaşam',
      'Sürdürülebilir Konut',
      'Ekolojik Ev',
      'Off-grid Yaşam'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: companyInfo.phone || '',
        contactType: 'sales',
        areaServed: ['TR'],
        availableLanguage: ['Turkish', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      },
      {
        '@type': 'ContactPoint',
        telephone: companyInfo.phone || '',
        contactType: 'customer service',
        areaServed: ['TR'],
        availableLanguage: ['Turkish', 'English']
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yeni, ışıklı caddesi no;63/1',
      addressLocality: 'Mudanya',
      addressRegion: 'Bursa',
      postalCode: '16960',
      addressCountry: 'TR'
    },
    sameAs: [
      settings.social_media?.instagram,
      settings.social_media?.facebook,
      settings.social_media?.twitter,
      settings.social_media?.linkedin,
      settings.social_media?.youtube
    ].filter(Boolean)
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: companyInfo.name_tr || companyInfo.name_en || 'Moortinyhouse',
    alternateName: ['Moor Tiny House', 'Moor Tiny House Türkiye', 'Moortinyhouse Türkiye'],
    image: [
      `${siteUrl}/og-image.jpg`,
      `${siteUrl}/beautiful-modern-tiny-house-in-nature-forest-setti.webp`
    ],
    url: siteUrl,
    telephone: companyInfo.phone || '',
    email: companyInfo.email || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yeni, ışıklı caddesi no;63/1',
      addressLocality: 'Mudanya',
      addressRegion: 'Bursa',
      postalCode: '16960',
      addressCountry: 'TR'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'İstanbul',
        '@id': 'https://www.wikidata.org/wiki/Q406'
      },
      {
        '@type': 'City',
        name: 'Bursa',
        '@id': 'https://www.wikidata.org/wiki/Q407'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Marmara Bölgesi'
      },
      {
        '@type': 'Country',
        name: 'Türkiye',
        '@id': 'https://www.wikidata.org/wiki/Q43'
      }
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 40.7516,
        longitude: 28.8123
      },
      geoRadius: '300000'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00'
      }
    ],
    priceRange: '₺₺₺',
    currenciesAccepted: 'TRY',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    description: 'Türkiye\'nin önde gelen tiny house üreticisi. Emekliler, minimalistler ve doğa severler için özel tasarım küçük evler. Yazlık, hobi bahçesi evi, emeklilik konutu çözümleri. İstanbul ve Bursa\'da ücretsiz keşif.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tiny House Modelleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Temel Tiny House Modelleri',
            description: 'Emekliler ve çiftler için 20-30m² kompakt modeller',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '45',
              bestRating: '5',
              worstRating: '1'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Premium Tiny House Modelleri',
            description: 'Aileler için 40-60m² geniş modeller',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '82',
              bestRating: '5',
              worstRating: '1'
            }
          }
        }
      ]
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7516,
      longitude: 28.8123
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: companyInfo.name_tr || companyInfo.name_en || 'Moortinyhouse',
    alternateName: 'Moor Tiny House Türkiye',
    url: siteUrl,
    description: 'Türkiye\'nin önde gelen tiny house üreticisi. Emekliler, minimalistler ve doğa severler için küçük ev çözümleri.',
    publisher: {
      '@id': `${siteUrl}/#organization`
    },
    inLanguage: ['tr-TR', 'en-US'],
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/models?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'ReadAction',
        target: `${siteUrl}/blog`
      }
    ]
  }

  const productSchema = modelData ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}/models/${modelData.slug || ''}#product`,
    name: modelData.name,
    description: modelData.description,
    image: modelData.image ? `${siteUrl}${modelData.image}` : undefined,
    brand: {
      '@type': 'Brand',
      name: 'Moortinyhouse',
      logo: `${siteUrl}/icon.svg`
    },
    manufacturer: {
      '@id': `${siteUrl}/#organization`
    },
    offers: modelData.price ? {
      '@type': 'Offer',
      price: modelData.price,
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: `${siteUrl}/models/${modelData.slug || ''}`,
      seller: {
        '@id': `${siteUrl}/#organization`
      }
    } : undefined,
    category: 'Tiny House / Küçük Ev',
    material: 'Çelik Konstrüksiyon, Ahşap Kaplama',
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 25,
      audienceType: 'Emekliler, Minimalistler, Doğa Severler, Genç Çiftler'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '50',
      bestRating: '5'
    }
  } : null

  const breadcrumbSchema = pageType === 'model' && modelData ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tiny House Modelleri',
        item: `${siteUrl}/models`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: modelData.name,
        item: `${siteUrl}/models/${modelData.slug || modelData.name.toLowerCase().replace(/\s+/g, '-')}`
      }
    ]
  } : null

  const articleSchema = articleData ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteUrl}/blog/${articleData.title.toLowerCase().replace(/\s+/g, '-')}#article`,
    headline: articleData.title,
    description: articleData.description,
    image: articleData.image ? `${siteUrl}${articleData.image}` : `${siteUrl}/og-image.jpg`,
    datePublished: articleData.datePublished,
    dateModified: articleData.dateModified || articleData.datePublished,
    author: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Moortinyhouse'
    },
    publisher: {
      '@id': `${siteUrl}/#organization`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog`
    },
    articleSection: 'Tiny House Rehberleri',
    inLanguage: 'tr-TR'
  } : null

  const faqSchema = faqData && faqData.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  } : {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Tiny house fiyatlandırması ne kadar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tiny house fiyatlandırması model büyüklüğüne, malzemeye ve tasarıma göre değişmektedir. Temel modeller 150,000-250,000 TL arasında, premium modeller 400,000-600,000 TL arasında değişmektedir. Detaylı fiyatlandırma için lütfen bizimle iletişime geçiniz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Emekliler için tiny house uygun mu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, tiny house emekliler için mükemmel bir seçenektir. Düşük bakım maliyeti, kolay temizlik, doğaya yakınlık ve ekonomik faydalı olup, emeklilik döneminizi daha rahat ve özgür hale getirmektedir.'
        }
      },
      {
        '@type': 'Question',
        name: 'Yazlık ev olarak tiny house kurabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tabii ki yapabilirsiniz! Tiny house yazlık ev olarak ideal bir seçenektir. Hızlı kurulum, ekonomik maliyet ve bakımı kolay özellikleri sayesinde deniz, göl veya dağ manzarasında yazlık yaşam için mükemmeldir.'
        }
      },
      {
        '@type': 'Question',
        name: 'Hobi bahçesine mini ev koyabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, hobi bahçesine mini ev yerleştirmek mümkündür. Ancak belediye onayı ve fen plaka gerekmektedir. Bahçıvanlık yapanlar için bahçeye yakın yaşamak pratik ve verimli bir çözümdür.'
        }
      },
      {
        '@type': 'Question',
        name: 'Tiny house taşınabilir mi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, tiny house tasarlanış itibariyle taşınabilirdir. Özel bir araç ile başka lokasyona taşınabilir. Ancak teknik ve yasal bazı kurallar bulunmaktadır.'
        }
      },
      {
        '@type': 'Question',
        name: 'Tiny house ne kadar dayanıklı?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Moortinyhouse tiny house\'ları kaliteli malzeme ve profesyonel işçilikle, minimum 30-50 yıl dayanacak şekilde inşa edilmektedir. Çelik konstrüksiyon ve ahşap kaplama, UV koruma ve su yalıtımı sayesinde uzun ömürlüdür.'
        }
      },
      {
        '@type': 'Question',
        name: 'İstanbul veya Bursa\'da hizmet veriyor musunuz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, İstanbul ve Bursa\'da ana hizmet bölgelerimizdir. Ayrıca Türkiye\'nin diğer bölgelerine de nakliye ve kurulum hizmeti veriyoruz. Ücretsiz keşif ve danışmanlık için bizimle iletişim kurunuz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Tiny house finansmanı veya taksit imkanı var mı?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, çeşitli finansman seçenekleri sunmaktayız. Banka kredisi, doğrudan taksit ve nakit ödeme seçenekleri bulunmaktadır. Detaylı bilgi için lütfen iletişim sayfasından ulaşınız.'
        }
      }
    ]
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/#service`,
    name: 'Tiny House Üretim ve Kurulum Hizmeti',
    description: 'Emekliler, minimalistler ve doğa severler için özel tasarım tiny house üretimi, nakliye ve kurulum hizmeti. İstanbul ve Bursa bölgesinde ücretsiz keşif.',
    provider: {
      '@id': `${siteUrl}/#organization`
    },
    serviceType: 'Tiny House Manufacturing',
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tiny House Hizmetleri',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Tasarım & Üretim',
          description: 'Kişiye özel tiny house tasarımı ve üretimi'
        },
        {
          '@type': 'OfferCatalog',
          name: 'Nakliye & Kurulum',
          description: 'Türkiye geneli nakliye ve profesyonel kurulum'
        },
        {
          '@type': 'OfferCatalog',
          name: 'Danışmanlık',
          description: 'Arazi seçimi ve yasal süreçler için ücretsiz danışmanlık'
        }
      ]
    }
  }

  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/models?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    navigationElement: [
      {
        '@type': 'SiteNavigationElement',
        '@id': `${siteUrl}/#nav-models`,
        name: 'Modeller',
        url: `${siteUrl}/models`
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${siteUrl}/#nav-blog`,
        name: 'Blog',
        url: `${siteUrl}/blog`
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${siteUrl}/#nav-portfolio`,
        name: 'Portföy',
        url: `${siteUrl}/portfolio`
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${siteUrl}/#nav-faq`,
        name: 'SSS',
        url: `${siteUrl}/faq`
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${siteUrl}/#nav-philosophy`,
        name: 'Felsefe',
        url: `${siteUrl}/philosophy`
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${siteUrl}/#nav-testimonials`,
        name: 'Referanslar',
        url: `${siteUrl}/testimonials`
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${siteUrl}/#nav-contact`,
        name: 'İletişim',
        url: `${siteUrl}/contact`
      }
    ]
  }

  const schemas = []
  
  if (type === 'Organization' || pageType === 'home') {
    schemas.push(organizationSchema)
    schemas.push(localBusinessSchema)
    schemas.push(websiteSchema)
    schemas.push(serviceSchema)
    schemas.push(siteNavigationSchema)
  }
  
  if (pageType === 'model' && productSchema) {
    schemas.push(productSchema)
    if (breadcrumbSchema) schemas.push(breadcrumbSchema)
  }

  if (pageType === 'blog' && articleSchema) {
    schemas.push(articleSchema)
  }

  if (pageType === 'faq' && faqSchema) {
    schemas.push(faqSchema)
  }

  if (pageType === 'models') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Tiny House Modelleri 2026',
      description: 'Emekliler, minimalistler ve doğa severler için özel tasarım tiny house modelleri koleksiyonu',
      numberOfItems: 6,
      itemListOrder: 'https://schema.org/ItemListOrderDescending'
    })
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}
    </>
  )
}
