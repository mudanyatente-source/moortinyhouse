'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createBrowserClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { Save, Search, Palette, FileText } from 'lucide-react'
import { translations } from '@/lib/i18n'
import { defaultSiteSettings } from '@/lib/site-settings-shared'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

type Lang = 'tr' | 'en' | 'ar'

const categories: Array<{ id: string; label: string; keys: string[] }> = [
  {
    id: 'hero',
    label: 'Ana Sayfa / Hero',
    keys: ['hero.badge', 'hero.title1', 'hero.title2', 'hero.subtitle', 'hero.explore', 'hero.watchStory', 'hero.scroll']
  },
  {
    id: 'cta',
    label: 'Ana Sayfa / CTA',
    keys: ['cta.badge', 'cta.title1', 'cta.title2', 'cta.subtitle', 'cta.schedule', 'cta.contactUs', 'cta.warranty', 'cta.certified', 'cta.custom']
  },
  {
    id: 'footer',
    label: 'Footer',
    keys: ['footer.tagline', 'footer.explore', 'footer.company', 'footer.followUs', 'footer.newsletter', 'footer.emailPlaceholder', 'footer.join', 'footer.rights']
  },
  {
    id: 'contact',
    label: 'İletişim',
    keys: [
      'contact.badge',
      'contact.title1',
      'contact.title2',
      'contact.subtitle',
      'contact.email.title',
      'contact.email.desc',
      'contact.phone.title',
      'contact.phone.desc',
      'contact.visit.title',
      'contact.visit.desc',
      'contact.form.help',
      'contact.form.tour',
      'contact.form.general',
      'contact.form.custom',
      'contact.form.firstName',
      'contact.form.lastName',
      'contact.form.email',
      'contact.form.phone',
      'contact.form.preferredDate',
      'contact.form.message',
      'contact.form.messagePlaceholder',
      'contact.form.send',
      'contact.form.sending',
      'contact.form.success',
      'contact.form.successDesc',
      'contact.form.sendAnother'
    ]
  }
]

export default function ContentPanel() {
  const supabase = createBrowserClient()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'theme'>('content')

  const [overrides, setOverrides] = useState<Record<string, Record<string, string>>>(
    defaultSiteSettings.content_overrides || { tr: {}, en: {}, ar: {} }
  )

  const [theme, setTheme] = useState<{ accent?: string; accent_foreground?: string }>(
    defaultSiteSettings.theme || {}
  )

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('key,value')
      if (error) throw error
      const obj = (data || []).reduce<Record<string, any>>((acc, item) => {
        acc[item.key] = item.value
        return acc
      }, {})
      setOverrides({ ...(defaultSiteSettings.content_overrides || {}), ...(obj.content_overrides || {}) })
      setTheme({ ...(defaultSiteSettings.theme || {}), ...(obj.theme || {}) })
    } catch (e) {
      console.error('[content] load failed', e)
    }
  }

  const keys = useMemo(() => {
    const categoryKeys = categories.find((c) => c.id === activeCategory)?.keys || []
    if (!searchQuery.trim()) return categoryKeys
    const query = searchQuery.toLowerCase()
    return categoryKeys.filter((k) => 
      k.toLowerCase().includes(query) ||
      (['tr', 'en', 'ar'] as Lang[]).some(lang => 
        (translations[k]?.[lang] || '').toLowerCase().includes(query) ||
        (overrides[lang]?.[k] || '').toLowerCase().includes(query)
      )
    )
  }, [activeCategory, searchQuery, overrides])

  const getBase = (key: string, lang: Lang) => translations[key]?.[lang] || ''
  const getValue = (key: string, lang: Lang) => overrides?.[lang]?.[key] ?? ''

  const setValue = (key: string, lang: Lang, val: string) => {
    setOverrides((prev) => ({
      ...(prev || {}),
      [lang]: {
        ...((prev || {})[lang] || {}),
        [key]: val
      }
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const now = new Date().toISOString()
      const { error: e1 } = await supabase
        .from('site_settings')
        .upsert({ key: 'content_overrides', value: overrides, updated_at: now }, { onConflict: 'key' })
      if (e1) throw e1

      const { error: e2 } = await supabase
        .from('site_settings')
        .upsert({ key: 'theme', value: theme, updated_at: now }, { onConflict: 'key' })
      if (e2) throw e2

      toast({ title: 'Başarılı!', description: 'İçerik ve tema kaydedildi.' })
    } catch (error: any) {
      console.error('[content] save failed', error)
      toast({ title: 'Hata', description: error?.message || 'Kaydederken hata oluştu', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-4 pt-2 -mt-2 border-b border-border">
        <div>
          <h1 className="text-3xl font-serif font-medium">İçerik Yönetimi</h1>
          <p className="text-muted-foreground mt-1">Metinleri ve renkleri organize bir şekilde düzenleyin</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="gap-2" size="lg">
          <Save className="w-4 h-4" />
          {loading ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'content' | 'theme')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="content" className="gap-2">
            <FileText className="w-4 h-4" />
            İçerik Metinleri
          </TabsTrigger>
          <TabsTrigger value="theme" className="gap-2">
            <Palette className="w-4 h-4" />
            Tema / Renkler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Tema Ayarları</CardTitle>
              <CardDescription>Site renklerini özelleştirin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Accent Rengi (CSS değeri)</Label>
                  <Input
                    value={theme.accent || ''}
                    onChange={(e) => setTheme((p) => ({ ...p, accent: e.target.value }))}
                    placeholder="ör: oklch(0.97 0 0) veya #ff0000"
                    className="font-mono"
                  />
                  {theme.accent && (
                    <div className="flex items-center gap-2 mt-2">
                      <div 
                        className="w-8 h-8 rounded border border-border"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <span className="text-sm text-muted-foreground">Önizleme</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Accent Foreground (CSS değeri)</Label>
                  <Input
                    value={theme.accent_foreground || ''}
                    onChange={(e) => setTheme((p) => ({ ...p, accent_foreground: e.target.value }))}
                    placeholder="ör: oklch(0.205 0 0) veya #ffffff"
                    className="font-mono"
                  />
                  {theme.accent_foreground && (
                    <div className="flex items-center gap-2 mt-2">
                      <div 
                        className="w-8 h-8 rounded border border-border"
                        style={{ backgroundColor: theme.accent_foreground }}
                      />
                      <span className="text-sm text-muted-foreground">Önizleme</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Not:</strong> Tema değerleri CSS variable olarak uygulanır (örn. <code className="bg-background px-1 py-0.5 rounded">--accent</code>). 
                  Varsayılanlar boşsa mevcut tema korunur.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kategori Seçimi</CardTitle>
              <CardDescription>Düzenlemek istediğiniz içerik kategorisini seçin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Button
                    key={c.id}
                    type="button"
                    variant={c.id === activeCategory ? 'default' : 'outline'}
                    onClick={() => {
                      setActiveCategory(c.id)
                      setSearchQuery('')
                    }}
                    className="gap-2"
                  >
                    {c.label}
                    <span className="text-xs opacity-70">({c.keys.length})</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İçerik Düzenleme</CardTitle>
              <CardDescription>
                {categories.find(c => c.id === activeCategory)?.label} kategorisindeki metinleri düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Metin ara..."
                  className="pl-9"
                />
              </div>

              {keys.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? 'Arama sonucu bulunamadı' : 'Bu kategoride içerik bulunmuyor'}
                </div>
              ) : (
                <Accordion type="multiple" className="w-full">
                  {keys.map((k) => {
                    const baseTr = getBase(k, 'tr')
                    const baseEn = getBase(k, 'en')
                    const baseAr = getBase(k, 'ar')
                    const hasOverrides = (['tr', 'en', 'ar'] as Lang[]).some(lang => getValue(k, lang))
                    
                    return (
                      <AccordionItem key={k} value={k} className="border-border">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <code className="text-xs text-muted-foreground font-mono">{k}</code>
                            {hasOverrides && (
                              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">Özelleştirilmiş</span>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            {(['tr', 'en', 'ar'] as Lang[]).map((lang) => (
                              <div key={lang} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="font-medium">{lang.toUpperCase()}</Label>
                                  {getValue(k, lang) && (
                                    <span className="text-xs text-muted-foreground">Özelleştirilmiş</span>
                                  )}
                                </div>
                                <Input
                                  value={getValue(k, lang)}
                                  onChange={(e) => setValue(k, lang, e.target.value)}
                                  placeholder={getBase(k, lang) || '—'}
                                />
                                {getBase(k, lang) && (
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    Varsayılan: {getBase(k, lang)}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

