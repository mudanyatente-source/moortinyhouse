import { createServerClient, createServerClientWithoutCookies } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ExploreClient from './explore-client'
import { getPageMetadata } from '@/lib/page-seo'
import { getSiteSettings } from '@/lib/settings'

export async function generateStaticParams() {
  try {
    const supabase = createServerClientWithoutCookies()
    const { data: models } = await supabase
      .from('models')
      .select('slug')
      .eq('is_visible', true)

    return (models || []).map((model) => ({ slug: model.slug }))
  } catch (error) {
    console.error('[generateStaticParams] Error fetching models:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServerClient()
  const { data: model } = await supabase
    .from('models')
    .select('*')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single()

  if (!model) {
    return getPageMetadata(await getSiteSettings(), 'models', 'tr')
  }

  const settings = await getSiteSettings()
  const title = `${model.name_tr} - İmmersive Keşif | Moortinyhouse`
  const description = `${model.name_tr} modelini 360° keşfedin. Her detayını inceleyin, içinde gezinin.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: model.main_image ? [{ url: model.main_image }] : [],
      type: 'website',
    },
    alternates: {
      canonical: `https://moortinyhouse.com/models/${slug}/explore`,
    },
  }
}

export default async function ExplorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServerClient()

  const { data: model, error } = await supabase
    .from('models')
    .select('*')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single()

  if (error || !model) {
    notFound()
  }

  // Fetch images from folder with subfolder support
  let images: string[] = []
  try {
    const { readdirSync, statSync } = await import('fs')
    const path = await import('path')
    const folderName = slug.toLowerCase() === 'beverly' ? 'baverly' : slug.toLowerCase()
    const modelDir = path.join(process.cwd(), 'public', folderName)
    
    try {
      const stats = statSync(modelDir)
      if (stats.isDirectory()) {
        const items = readdirSync(modelDir)
        
        const hasSubfolders = items.some(item => {
          try {
            const itemPath = path.join(modelDir, item)
            return statSync(itemPath).isDirectory()
          } catch {
            return false
          }
        })
        
        if (hasSubfolders) {
          for (const item of items) {
            try {
              const itemPath = path.join(modelDir, item)
              if (statSync(itemPath).isDirectory()) {
                const subFiles = readdirSync(itemPath)
                  .filter((f) => /\.(webp|jpg|jpeg|png|gif)$/i.test(f))
                  .sort()
                  .map((f) => `/${folderName}/${item}/${f}`)
                images.push(...subFiles)
              }
            } catch {
              // Skip if subfolder can't be read
            }
          }
        } else {
          const files = items
            .filter((f) => /\.(webp|jpg|jpeg|png|gif)$/i.test(f))
            .sort()
            .map((f) => `/${folderName}/${f}`)
          images = files
        }
      }
    } catch {
      // Directory doesn't exist
    }
  } catch (e) {
    console.error(`[explore/${slug}] Error reading images:`, e)
  }

  if (images.length === 0 && model.main_image) {
    images = [model.main_image]
  }

  const settings = await getSiteSettings()

  return (
    <ExploreClient
      model={{
        ...model,
        images,
        specs: {
          sqm: model.size_sqm || 0,
          capacity: model.bedrooms ? `${model.bedrooms}-${model.bedrooms + 1}` : '1-2',
          eco: 'A+',
          bedrooms: model.bedrooms || 1,
          bathrooms: model.bathrooms || 1,
        },
        features: Array.isArray(model.features_tr) ? model.features_tr : [],
        features_en: Array.isArray(model.features_en) ? model.features_en : [],
      }}
    />
  )
}