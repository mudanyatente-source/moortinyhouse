'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { SiteSettings } from '@/lib/site-settings-shared'
import { defaultSiteSettings } from '@/lib/site-settings-shared'

const SiteSettingsContext = createContext<SiteSettings>(defaultSiteSettings)

type ProviderProps = {
  settings: SiteSettings
  children: ReactNode
}

export function SiteSettingsProvider({ settings, children }: ProviderProps) {
  return (
    <SiteSettingsContext.Provider value={settings ?? defaultSiteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
