'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Save, HelpCircle, Building2, Share2, MapPin, Search, Lock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { defaultSiteSettings } from '@/lib/site-settings-shared'
import { contactInfo, mapInfo, socialMedia } from '@/lib/contact-info'
import { revalidateContent } from '@/lib/revalidate-content'

export default function SettingsPanel() {
  const [settings, setSettings] = useState<any>(defaultSiteSettings)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('company')
  const { toast } = useToast()
  const supabase = createBrowserClient()
  const router = useRouter()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')

      if (error) throw error

      const settingsObj = data.reduce((acc: any, item: any) => {
        acc[item.key] = item.value
        return acc
      }, {})

      setSettings({
        company_info: { ...defaultSiteSettings.company_info, ...(settingsObj.company_info || {}) },
        social_media: { ...defaultSiteSettings.social_media, ...(settingsObj.social_media || {}) },
        map: { ...defaultSiteSettings.map, ...(settingsObj.map || {}) },
        seo: { ...defaultSiteSettings.seo, ...(settingsObj.seo || {}) }
      })
    } catch (error) {
      console.error('[v0] Error loading settings:', error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Auto-generate English fields from Turkish
      const processedSettings = { ...settings }
      if (processedSettings.company_info?.name_tr && !processedSettings.company_info?.name_en) {
        processedSettings.company_info.name_en = processedSettings.company_info.name_tr
      }
      if (processedSettings.seo?.meta_title_tr && !processedSettings.seo?.meta_title_en) {
        processedSettings.seo.meta_title_en = processedSettings.seo.meta_title_tr
      }
      if (processedSettings.seo?.meta_description_tr && !processedSettings.seo?.meta_description_en) {
        processedSettings.seo.meta_description_en = processedSettings.seo.meta_description_tr
      }

      const updates = Object.entries(processedSettings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString()
      }))

      console.log('[Settings] Saving updates:', updates)

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'key' })

        if (error) {
          console.error('[Settings] Error upserting:', update.key, error)
          throw error
        }
      }

      toast({
        title: 'Başarılı!',
        description: 'Ayarlar başarıyla kaydedildi.',
      })
      
      // Reload settings after save
      await loadSettings()
      router.refresh()
      
      // Vercel cache'i temizle - güncellemeler sitede anında görünsün
      await revalidateContent(['/', '/contact', '/portfolio', '/models', '/philosophy', '/testimonials', '/faq', '/blog'])
    } catch (error: any) {
      console.error('[Settings] Error saving settings:', error)
      toast({
        title: 'Hata',
        description: error?.message || 'Ayarlar kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const updateSetting = (key: string, field: string, value: any) => {
    setSettings({
      ...settings,
      [key]: {
        ...(settings[key] || {}),
        [field]: value
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-4 pt-2 -mt-2 border-b border-border">
        <div>
          <h1 className="text-3xl font-serif font-medium">Site Ayarları</h1>
          <p className="text-muted-foreground mt-1">Web sitenizin genel ayarlarını kategorilere göre yönetin</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="gap-2" size="lg">
          <Save className="w-4 h-4" />
          {loading ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            Şirket Bilgileri
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Share2 className="w-4 h-4" />
            Sosyal Medya
          </TabsTrigger>
          <TabsTrigger value="map" className="gap-2">
            <MapPin className="w-4 h-4" />
            Harita
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Search className="w-4 h-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Şirket Bilgileri</CardTitle>
              <CardDescription>Web sitesinde görünecek şirket bilgileri (Contact bilgileri dosyadan yönetilir)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Şirket Adı (Türkçe)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Web sitesinde görünecek şirket adı</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  value={settings.company_info?.name_tr || ''}
                  onChange={(e) => updateSetting('company_info', 'name_tr', e.target.value)}
                  placeholder="Örn: Moortinyhouse"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-3 flex-1">
                    <p className="font-medium text-blue-900 dark:text-blue-100">Contact Bilgileri Sabit Olarak Yönetilir</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Email, telefon ve adres bilgileri <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">lib/contact-info.ts</code> dosyasından yönetilir. 
                      Güncellemek için bu dosyayı düzenleyin.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Email (Dosyadan Yönetilir)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="email"
                  value={contactInfo.email}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Telefon (Dosyadan Yönetilir)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  value={contactInfo.phone}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Adres (Dosyadan Yönetilir)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Textarea
                  value={contactInfo.address}
                  disabled
                  rows={3}
                  className="bg-muted cursor-not-allowed"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya</CardTitle>
              <CardDescription>Sosyal medya hesaplarınızın linklerini ekleyin (Dosyadan Yönetilir)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <p className="font-medium text-blue-900 dark:text-blue-100">Sosyal Medya Bağlantıları Sabit Olarak Yönetilir</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Sosyal medya linkleriniz <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">lib/contact-info.ts</code> dosyasından yönetilir. 
                      Güncellemek için bu dosyayı düzenleyin.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Instagram URL</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={socialMedia.instagram}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Facebook URL</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={socialMedia.facebook}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Twitter URL</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={socialMedia.twitter}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>LinkedIn URL</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={socialMedia.linkedin}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>YouTube URL</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={socialMedia.youtube}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>TikTok URL</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={socialMedia.tiktok}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Harita (Google Maps)</CardTitle>
              <CardDescription>Google Maps embed kodunu ekleyin. Sadece güvenilir kaynaklardan alınan iframe kodlarını kullanın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <p className="font-medium text-blue-900 dark:text-blue-100">Harita Kodu Sabit Olarak Yönetilir</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Google Maps embed kodu <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">lib/contact-info.ts</code> dosyasından yönetilir. 
                      Güncellemek için bu dosyayı düzenleyin.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Embed Kodu (Dosyadan Yönetilir)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lock className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">lib/contact-info.ts dosyasından yönetilir</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Textarea
                  value={mapInfo.embed_html || ''}
                  disabled
                  rows={6}
                  className="font-mono text-sm bg-muted cursor-not-allowed"
                />
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Harita Kodunu lib/contact-info.ts'e Nasıl Eklersiniz?</p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Google Maps'te konumunuzu açın</li>
                  <li>"Paylaş" butonuna tıklayın</li>
                  <li>"Haritayı yerleştir" sekmesini seçin</li>
                  <li>Oluşturulan iframe kodunu kopyalayın</li>
                  <li><code className="bg-background px-2 py-1 rounded">lib/contact-info.ts</code> dosyasını açın</li>
                  <li><code className="bg-background px-2 py-1 rounded">mapInfo.embed_html</code> alanına yapıştırın</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>SEO Ayarları</CardTitle>
              <CardDescription>Arama motoru optimizasyonu için meta bilgileri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Meta Başlık (Türkçe)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Arama motorlarında görünecek sayfa başlığı (50-60 karakter önerilir)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  value={settings.seo?.meta_title_tr || ''}
                  onChange={(e) => updateSetting('seo', 'meta_title_tr', e.target.value)}
                  placeholder="Moortinyhouse | Sustainable Tiny House Living"
                />
                <p className="text-xs text-muted-foreground">
                  {settings.seo?.meta_title_tr?.length || 0} / 60 karakter
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Meta Açıklama (Türkçe)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Arama motorlarında görünecek sayfa açıklaması (150-160 karakter önerilir)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Textarea
                  value={settings.seo?.meta_description_tr || ''}
                  onChange={(e) => updateSetting('seo', 'meta_description_tr', e.target.value)}
                  rows={3}
                  placeholder="Discover the art of sustainable tiny house living."
                />
                <p className="text-xs text-muted-foreground">
                  {settings.seo?.meta_description_tr?.length || 0} / 160 karakter
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
