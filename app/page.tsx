import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedModels } from "@/components/featured-models"
import { PhilosophyPreview } from "@/components/philosophy-preview"
import { TestimonialsPreview } from "@/components/testimonials-preview"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { getSiteSettings } from "@/lib/settings"
import { getPageMetadata } from "@/lib/page-seo"
import { SeoSchema } from "@/components/seo-schema"

export async function generateMetadata() {
  const settings = await getSiteSettings()
  return getPageMetadata(settings, 'home', 'tr')
}

export default async function HomePage() {
  const settings = await getSiteSettings()
  
  return (
    <main className="min-h-screen">
      <SeoSchema settings={settings} type="Organization" pageType="home" />
      <Navigation />
      <HeroSection />
      <FeaturedModels />
      <PhilosophyPreview />
      <TestimonialsPreview />
      <CTASection />
      <Footer />
    </main>
  )
}
