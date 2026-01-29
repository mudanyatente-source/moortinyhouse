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
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata() {
  const settings = await getSiteSettings()
  return getPageMetadata(settings, 'home', 'tr')
}

export default async function HomePage() {
  const settings = await getSiteSettings()
  const supabase = await createServerClient()
  
  // Fetch featured models from database (display_order: 0, 1, 2)
  const { data: models } = await supabase
    .from('models')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true })
    .limit(3)

  // Transform models and get exterior image as first image
  const featuredModels = (models || []).map((model) => {
    // Use main_image from database, fallback to placeholder if not set
    const image = model.main_image || '/placeholder.svg'
    
    return {
      id: model.id,
      slug: model.slug,
      name_tr: model.name_tr,
      name_en: model.name_en,
      tagline_tr: model.tagline_tr || '',
      tagline_en: model.tagline_en || '',
      description_tr: model.description_tr,
      description_en: model.description_en,
      image,
      specs: {
        sqm: model.size_sqm || 0,
        capacity: model.bedrooms ? `${model.bedrooms}-${model.bedrooms + 1}` : '1-2',
        eco: 'A+',
      },
    }
  })
  
  return (
    <main className="min-h-screen">
      <SeoSchema settings={settings} type="Organization" pageType="home" />
      <Navigation />
      <HeroSection />
      <FeaturedModels models={featuredModels} />
      <PhilosophyPreview />
      <TestimonialsPreview />
      <CTASection />
      <Footer />
    </main>
  )
}
