import type { Metadata } from "next"
import { getSiteSettings } from "@/lib/settings"
import { getPageMetadata } from "@/lib/page-seo"
import ContactClient from "./contact-client"
import { SeoSchema } from "@/components/seo-schema"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return getPageMetadata(settings, 'contact', 'tr')
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  
  return (
    <>
      <SeoSchema settings={settings} type="LocalBusiness" pageType="contact" />
      <ContactClient />
    </>
  )
}
