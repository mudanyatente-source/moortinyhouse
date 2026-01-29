import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { RevealAnimation } from '@/components/reveal-animation'
import { getPageMetadata } from '@/lib/page-seo'
import { getSiteSettings } from '@/lib/settings'
import { SeoSchema } from '@/components/seo-schema'
import TermsClient from './terms-client'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: 'Hizmet Şartları | Moortinyhouse',
    description: 'Moortinyhouse hizmet şartları. Web sitesi kullanım koşulları ve yasal bilgiler.',
    keywords: ['hizmet şartları', 'terms of service', 'kullanım koşulları', 'moortinyhouse'],
    openGraph: {
      title: 'Hizmet Şartları | Moortinyhouse',
      description: 'Moortinyhouse hizmet şartları. Web sitesi kullanım koşulları ve yasal bilgiler.',
      type: 'website',
    },
  }
}

export default async function TermsPage() {
  const settings = await getSiteSettings()
  
  return (
    <>
      <SeoSchema settings={settings} type="Organization" pageType="home" />
      <TermsClient />
    </>
  )
}
