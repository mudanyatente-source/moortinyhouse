import { createServerClient, createServerClientWithoutCookies } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ModelDetailClient from './model-detail-client'
import { getPageMetadata } from '@/lib/page-seo'
import { getSiteSettings } from '@/lib/settings'
import { SeoSchema } from '@/components/seo-schema'

export async function generateStaticParams() {
  try {
    // Use client without cookies for static generation
    const supabase = createServerClientWithoutCookies()
    const { data: models } = await supabase
      .from('models')
      .select('slug')
      .eq('is_visible', true)

    return (models || []).map((model) => ({ slug: model.slug }))
  } catch (error) {
    console.error('[generateStaticParams] Error fetching models:', error)
    // Return empty array if there's an error (e.g., during build)
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
  const title = model.seo_title_tr || `${model.name_tr} - Tiny House Modelleri | Moortinyhouse`
  const description = model.seo_description_tr || model.description_tr

  return {
    title,
    description,
    keywords: model.seo_keywords_tr || ['tiny house', 'mini ev', model.slug, 'moortinyhouse'],
    openGraph: {
      title,
      description,
      images: model.main_image ? [{ url: model.main_image }] : [],
      type: 'website',
    },
    alternates: {
      canonical: `https://moortinyhouse.com/models/${slug}`,
      languages: {
        'tr-TR': `https://moortinyhouse.com/models/${slug}`,
        'en-US': `https://moortinyhouse.com/models/${slug}`,
      },
    },
  }
}

export default async function ModelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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

  // Fetch all models for navigation
  const { data: allModels } = await supabase
    .from('models')
    .select('slug, name_tr, name_en')
    .eq('is_visible', true)
    .order('display_order', { ascending: true })

  const currentIndex = (allModels || []).findIndex((m) => m.slug === slug)
  const prevModel = currentIndex > 0 ? allModels?.[currentIndex - 1] : null
  const nextModel = currentIndex < (allModels?.length || 0) - 1 ? allModels?.[currentIndex + 1] : null

  // Fetch images from folder
  let images: string[] = []
  try {
    const { readdirSync, statSync } = await import('fs')
    const path = await import('path')
    // Handle slug to folder name mapping (beverly -> baverly)
    const folderName = slug.toLowerCase() === 'beverly' ? 'baverly' : slug.toLowerCase()
    const modelDir = path.join(process.cwd(), 'public', folderName)
    
    try {
      // Check if the model directory exists
      const stats = statSync(modelDir)
      if (stats.isDirectory()) {
        const items = readdirSync(modelDir)
        
        // Check for subfolder structure (dış/iç for baverly)
        const hasSubfolders = items.some(item => {
          try {
            const itemPath = path.join(modelDir, item)
            return statSync(itemPath).isDirectory()
          } catch {
            return false
          }
        })
        
        if (hasSubfolders) {
          // Scan subfolders for images
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
          // Original logic for flat folder structure
          const files = items
            .filter((f) => /\.(webp|jpg|jpeg|png|gif)$/i.test(f))
            .sort()
            .map((f) => `/${folderName}/${f}`)
          images = files
        }
      }
    } catch {
      // Directory doesn't exist, use main_image
    }
  } catch (e) {
    console.error(`[model/${slug}] Error reading images:`, e)
  }

  // Fallback to main_image if no images found
  if (images.length === 0 && model.main_image) {
    images = [model.main_image]
  }

  const settings = await getSiteSettings()

  return (
    <>
      <SeoSchema 
        settings={settings} 
        type="Organization" 
        pageType="model" 
        modelData={{
          name: model.name_tr,
          description: model.description_tr,
          image: model.main_image || images[0],
          slug: model.slug,
        }} 
      />
      <ModelDetailClient
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
        prevModel={prevModel || undefined}
        nextModel={nextModel || undefined}
        allModels={allModels || []}
      />
    </>
  )
}
