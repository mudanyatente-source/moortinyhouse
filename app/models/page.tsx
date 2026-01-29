import { createServerClient } from '@/lib/supabase/server'
import { ModelsClient } from './models-client'
import { getSiteSettings } from '@/lib/settings'
import { getPageMetadata } from '@/lib/page-seo'
import { SeoSchema } from '@/components/seo-schema'

export async function generateMetadata() {
  const settings = await getSiteSettings()
  return getPageMetadata(settings, 'models', 'tr')
}

export default async function ModelsPage() {
  const supabase = await createServerClient()
  
  // Fetch models from database
  const { data: models, error } = await supabase
    .from('models')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching models:', error)
  }

  // Transform database models to match the expected format
  const transformedModels = (models || []).map((model) => {
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
        sqm: model.size_sqm || 0, // Use m² directly
        capacity: model.bedrooms ? `${model.bedrooms}-${model.bedrooms + 1}` : '1-2',
        eco: 'A+',
        bedrooms: model.bedrooms || 1,
        bathrooms: model.bathrooms || 1,
      },
      features: Array.isArray(model.features_tr) ? model.features_tr : [],
      features_en: Array.isArray(model.features_en) ? model.features_en : [],
      price: model.price,
      is_popular: model.is_popular || false,
      // Hotspots can be added later via admin panel or kept as optional
      hotspots: [],
    }
  })

  const settings = await getSiteSettings()
  
  return (
    <>
      <SeoSchema settings={settings} type="Organization" pageType="models" />
      <ModelsClient initialModels={transformedModels} />
    </>
  )
}
