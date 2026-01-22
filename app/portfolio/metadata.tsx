import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'
import { getPageMetadata } from '@/lib/page-seo'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return getPageMetadata(settings, 'portfolio', 'tr')
}
