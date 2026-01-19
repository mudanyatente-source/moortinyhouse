import { SiteSettings } from '@/lib/site-settings-shared'

interface SeoSchemaProps {
  settings: SiteSettings
  type?: 'Organization' | 'WebSite' | 'LocalBusiness'
  pageType?: 'home' | 'models' | 'model' | 'portfolio' | 'contact'
  modelData?: {
    name: string
    description: string
    price?: number
    image?: string
  }
}

export function SeoSchema({ settings, type = 'Organization', pageType = 'home', modelData }: SeoSchemaProps) {
  const companyInfo = settings.company_info || {}
  const siteUrl = 'https://moortinyhouse.com'
  
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name_tr || companyInfo.name_en || 'Moortinyhouse',
    alternateName: companyInfo.name_en || companyInfo.name_tr,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyInfo.phone || '',
      contactType: 'customer service',
      areaServed: ['TR', 'Istanbul', 'Bursa'],
      availableLanguage: ['Turkish', 'English']
    },
    sameAs: [
      settings.social_media?.instagram,
      settings.social_media?.facebook,
      settings.social_media?.twitter,
      settings.social_media?.linkedin,
      settings.social_media?.youtube
    ].filter(Boolean)
  }

  // LocalBusiness Schema (for Istanbul and Bursa)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#organization`,
    name: companyInfo.name_tr || companyInfo.name_en || 'Moortinyhouse',
    image: `${siteUrl}/icon.svg`,
    url: siteUrl,
    telephone: companyInfo.phone || '',
    email: companyInfo.email || '',
    address: {
      '@type': 'PostalAddress',
      addressLocality: companyInfo.address?.includes('İstanbul') ? 'İstanbul' : 
                       companyInfo.address?.includes('Bursa') ? 'Bursa' : 'Türkiye',
      addressCountry: 'TR'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'İstanbul'
      },
      {
        '@type': 'City',
        name: 'Bursa'
      },
      {
        '@type': 'Country',
        name: 'Türkiye'
      }
    ],
    priceRange: '$$',
    description: 'Türkiye\'nin önde gelen tiny house üreticisi. İstanbul ve Bursa\'da modern, sürdürülebilir ve özelleştirilebilir tiny house modelleri.',
    keywords: 'tiny house, mini ev, küçük ev, mobil ev, prefabrik ev, istanbul tiny house, bursa tiny house, tiny house türkiye'
  }

  // WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyInfo.name_tr || companyInfo.name_en || 'Moortinyhouse',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/models?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  // Product Schema (for model pages)
  const productSchema = modelData ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: modelData.name,
    description: modelData.description,
    image: modelData.image ? `${siteUrl}${modelData.image}` : undefined,
    brand: {
      '@type': 'Brand',
      name: companyInfo.name_tr || companyInfo.name_en || 'Moortinyhouse'
    },
    offers: modelData.price ? {
      '@type': 'Offer',
      price: modelData.price,
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url: siteUrl
    } : undefined,
    category: 'Tiny House',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '50'
    }
  } : null

  // Breadcrumb Schema
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
        name: 'Modeller',
        item: `${siteUrl}/models`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: modelData.name,
        item: `${siteUrl}/models/${modelData.name.toLowerCase().replace(/\s+/g, '-')}`
      }
    ]
  } : null

  const schemas = []
  
  if (type === 'Organization' || pageType === 'home') {
    schemas.push(organizationSchema)
    schemas.push(localBusinessSchema)
    schemas.push(websiteSchema)
  }
  
  if (pageType === 'model' && productSchema) {
    schemas.push(productSchema)
    if (breadcrumbSchema) schemas.push(breadcrumbSchema)
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
