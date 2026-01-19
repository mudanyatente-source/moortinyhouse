import { Metadata } from 'next'
import BlogClient from './blog-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog | Tiny House İpuçları ve Rehberler | Moortinyhouse',
    description: 'Tiny house hakkında ipuçları, rehberler ve güncel haberler. İstanbul ve Bursa\'da tiny house yaşamı hakkında bilgilendirici içerikler.',
    keywords: ['tiny house blog', 'mini ev rehberi', 'tiny house ipuçları', 'istanbul tiny house', 'bursa tiny house', 'moortinyhouse'],
    openGraph: {
      title: 'Blog | Tiny House İpuçları ve Rehberler | Moortinyhouse',
      description: 'Tiny house hakkında ipuçları, rehberler ve güncel haberler. İstanbul ve Bursa\'da tiny house yaşamı hakkında bilgilendirici içerikler.',
      type: 'website',
    },
  }
}

export default function BlogPage() {
  return <BlogClient />
}
