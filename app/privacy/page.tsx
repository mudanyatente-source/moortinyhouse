import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { RevealAnimation } from '@/components/reveal-animation'
import { getPageMetadata } from '@/lib/page-seo'
import { getSiteSettings } from '@/lib/settings'
import { SeoSchema } from '@/components/seo-schema'
import PrivacyClient from './privacy-client'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: 'Gizlilik Politikası | Moortinyhouse',
    description: 'Moortinyhouse gizlilik politikası. Kişisel verilerinizin korunması ve kullanımı hakkında bilgiler.',
    keywords: ['gizlilik politikası', 'privacy policy', 'kişisel veri', 'moortinyhouse'],
    openGraph: {
      title: 'Gizlilik Politikası | Moortinyhouse',
      description: 'Moortinyhouse gizlilik politikası. Kişisel verilerinizin korunması ve kullanımı hakkında bilgiler.',
      type: 'website',
    },
  }
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings()
  
  return (
    <>
      <SeoSchema settings={settings} type="Organization" pageType="home" />
      <PrivacyClient />
    </>
  )
}
