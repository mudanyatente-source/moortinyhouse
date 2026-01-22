'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createBrowserClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { defaultSiteSettings } from '@/lib/site-settings-shared'
import { Save, Home, Box, ImageIcon, Sparkles, MessageSquare, Phone } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const seoPages: Array<{ id: string; label: string; icon: any }> = [
  { id: 'home', label: 'Ana Sayfa', icon: Home },
  { id: 'models', label: 'Modeller', icon: Box },
  { id: 'portfolio', label: 'Portföy', icon: ImageIcon },
  { id: 'philosophy', label: 'Felsefe', icon: Sparkles },
  { id: 'testimonials', label: 'Yorumlar', icon: MessageSquare },
  { id: 'contact', label: 'İletişim', icon: Phone }
]

export default function SeoPanel() {
  const [settings, setSettings] = useState<any>(defaultSiteSettings)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const { toast } = useToast()
  const supabase = createBrowserClient()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('*')
      if (error) throw error
      const settingsObj = data.reduce((acc: any, item: any) => {
        acc[item.key] = item.value
        return acc
      }, {})
      setSettings({
        ...defaultSiteSettings,
        ...settingsObj,
        page_seo: { ...(defaultSiteSettings.page_seo || {}), ...(settingsObj.page_seo || {}) }
      })
    } catch (error) {
      console.error('[seo] Error loading settings:', error)
    }
  }

  const updateSettingDeep = (section: string, field: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      page_seo: {
        ...(prev.page_seo || {}),
        [section]: {
          ...(prev.page_seo?.[section] || {}),
          [field]: value
        }
      }
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const update = {
        key: 'page_seo',
        value: settings.page_seo || {},
        updated_at: new Date().toISOString()
      }
      const { error } = await supabase.from('site_settings').upsert(update, { onConflict: 'key' })
      if (error) throw error

      toast({ title: 'Başarılı!', description: 'Sayfa SEO ayarları kaydedildi.' })
    } catch (error: any) {
      console.error('[seo] Error saving page_seo:', error)
      toast({
        title: 'Hata',
        description: error?.message || 'Kaydederken bir hata oluştu.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const currentPage = seoPages.find(p => p.id === activeTab)
  const currentSeo = settings.page_seo?.[activeTab] || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-4 pt-2 -mt-2 border-b border-border">
        <div>
          <h1 className="text-3xl font-serif font-medium">Sayfa SEO Ayarları</h1>
          <p className="text-muted-foreground mt-1">Her sayfa için SEO başlık ve açıklamalarını düzenleyin</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="gap-2" size="lg">
          <Save className="w-4 h-4" />
          {loading ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6">
          {seoPages.map((page) => {
            const Icon = page.icon
            return (
              <TabsTrigger key={page.id} value={page.id} className="gap-2 flex-col md:flex-row h-auto py-3">
                <Icon className="w-4 h-4" />
                <span className="text-xs md:text-sm">{page.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {seoPages.map((page) => {
          const Icon = page.icon
          const pageSeo = settings.page_seo?.[page.id] || {}
          
          return (
            <TabsContent key={page.id} value={page.id} className="mt-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle>{page.label} SEO</CardTitle>
                      <CardDescription>
                        {page.label} sayfası için arama motoru optimizasyonu ayarları
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Başlıklar (Title)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Türkçe</Label>
                          <Input
                            value={pageSeo.title_tr || ''}
                            onChange={(e) => updateSettingDeep(page.id, 'title_tr', e.target.value)}
                            placeholder={`${page.label} | Moortinyhouse`}
                          />
                          <p className="text-xs text-muted-foreground">
                            {pageSeo.title_tr?.length || 0} / 60 karakter
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>İngilizce</Label>
                          <Input
                            value={pageSeo.title_en || ''}
                            onChange={(e) => updateSettingDeep(page.id, 'title_en', e.target.value)}
                            placeholder={`${page.label} | Moortinyhouse`}
                          />
                          <p className="text-xs text-muted-foreground">
                            {pageSeo.title_en?.length || 0} / 60 karakter
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Açıklamalar (Description)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Türkçe</Label>
                          <Textarea
                            value={pageSeo.description_tr || ''}
                            onChange={(e) => updateSettingDeep(page.id, 'description_tr', e.target.value)}
                            rows={3}
                            placeholder={`${page.label} sayfası için açıklama...`}
                          />
                          <p className="text-xs text-muted-foreground">
                            {pageSeo.description_tr?.length || 0} / 160 karakter
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>İngilizce</Label>
                          <Textarea
                            value={pageSeo.description_en || ''}
                            onChange={(e) => updateSettingDeep(page.id, 'description_en', e.target.value)}
                            rows={3}
                            placeholder={`${page.label} page description...`}
                          />
                          <p className="text-xs text-muted-foreground">
                            {pageSeo.description_en?.length || 0} / 160 karakter
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium">SEO İpuçları</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Başlıklar 50-60 karakter arasında olmalıdır</li>
                      <li>Açıklamalar 150-160 karakter arasında olmalıdır</li>
                      <li>Anahtar kelimeleri doğal bir şekilde kullanın</li>
                      <li>Her sayfa için benzersiz içerik oluşturun</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

