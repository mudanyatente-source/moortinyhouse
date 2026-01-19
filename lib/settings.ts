import { createServerClient } from './supabase/server'
import { defaultSiteSettings, type SiteSettings } from './site-settings-shared'

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase.from('site_settings').select('key, value')

    if (error || !data) {
      console.warn('[settings] Falling back to defaults because fetch failed:', error?.message)
      return defaultSiteSettings
    }

    const settingsObj = data.reduce<Record<string, any>>((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {})

    return {
      company_info: { ...defaultSiteSettings.company_info, ...(settingsObj.company_info || {}) },
      social_media: { ...defaultSiteSettings.social_media, ...(settingsObj.social_media || {}) },
      map: { ...defaultSiteSettings.map, ...(settingsObj.map || {}) },
      seo: { ...defaultSiteSettings.seo, ...(settingsObj.seo || {}) },
      page_seo: { ...(defaultSiteSettings.page_seo || {}), ...(settingsObj.page_seo || {}) },
      content_overrides: { ...(defaultSiteSettings.content_overrides || {}), ...(settingsObj.content_overrides || {}) },
      theme: { ...(defaultSiteSettings.theme || {}), ...(settingsObj.theme || {}) }
    }
  } catch (error) {
    console.error('[settings] Unexpected error while fetching site settings:', error)
    return defaultSiteSettings
  }
}
