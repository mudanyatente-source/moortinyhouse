import { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://moortinyhouse.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/models`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/philosophy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic model pages
  let modelPages: MetadataRoute.Sitemap = []
  try {
    const supabase = await createServerClient()
    const { data: models } = await supabase
      .from('models')
      .select('slug, updated_at')
      .eq('is_visible', true)

    if (models) {
      modelPages = models.map((model) => ({
        url: `${baseUrl}/models/${model.slug}`,
        lastModified: model.updated_at ? new Date(model.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Error fetching models for sitemap:', error)
  }

  // Dynamic portfolio pages
  let portfolioPages: MetadataRoute.Sitemap = []
  try {
    const supabase = await createServerClient()
    const { data: projects } = await supabase
      .from('portfolio_projects')
      .select('slug, updated_at')
      .eq('is_visible', true)

    if (projects) {
      portfolioPages = projects.map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Error fetching portfolio for sitemap:', error)
  }

  return [...staticPages, ...modelPages, ...portfolioPages]
}
