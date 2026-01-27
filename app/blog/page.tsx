import { Metadata } from 'next'
import BlogClient from './blog-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Tiny House Blog 2026 | Rehberler, Fiyatlar & İpuçları | Moortinyhouse',
    description: 'Tiny house hakkında güncel rehberler, 2026 fiyat bilgileri ve uzman ipuçları. Emekliler, minimalistler için küçük ev yaşamı, hobi bahçesi evi ve yazlık tiny house bilgileri.',
    keywords: [
      'tiny house blog',
      'mini ev rehberi',
      'tiny house ipuçları',
      'tiny house fiyatları 2026',
      'istanbul tiny house',
      'bursa tiny house',
      'emekli için tiny house',
      'yazlık tiny house',
      'hobi bahçesi evi',
      'minimalist yaşam',
      'küçük ev yaşamı',
      'tiny house ruhsat',
      'moortinyhouse blog'
    ],
    openGraph: {
      title: 'Tiny House Blog 2026 | Rehberler, Fiyatlar & İpuçları | Moortinyhouse',
      description: 'Tiny house hakkında güncel rehberler ve uzman ipuçları. Emekliler, minimalistler için küçük ev yaşamı bilgileri.',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Moortinyhouse Blog - Tiny House Rehberleri'
        }
      ]
    },
    alternates: {
      canonical: 'https://moortinyhouse.com/blog'
    }
  }
}

export default function BlogPage() {
  return <BlogClient />
}
