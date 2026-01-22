import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { getPageMetadata } from '@/lib/page-seo'
import { SeoSchema } from '@/components/seo-schema'
import FAQClient from './faq-client'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    ...getPageMetadata(settings, 'home', 'tr'),
    title: 'Sık Sorulan Sorular (SSS) | Tiny House Hakkında | Moortinyhouse',
    description: 'Tiny house hakkında sık sorulan sorular ve cevapları. Fiyatlar, modeller, ruhsat, yerleşim ve daha fazlası hakkında bilgi.',
  }
}

export default async function FAQPage() {
  const settings = await getSiteSettings()
  
  return (
    <>
      <SeoSchema settings={settings} type="Organization" pageType="home" />
      <FAQClient />
    </>
  )
}
