'use client'

import { useMemo, useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, X, HelpCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { ImageGallerySelector } from './image-gallery-selector'
import { useToast } from '@/hooks/use-toast'
import { ConfirmationDialog } from './confirmation-dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { revalidateContent } from '@/lib/revalidate-content'

type ModelsPanelProps = {
  models: any[]
}

type GalleryImage = {
  path: string
  name: string
  category: string
  url: string
}

// Slug oluşturma fonksiyonu
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Basit Türkçe-İngilizce çeviri yardımcısı (temel kelimeler)
function translateToEnglish(trText: string): string {
  if (!trText) return ''
  
  // Basit bir çeviri tablosu - gerçek projede bir API kullanılabilir
  const translations: { [key: string]: string } = {
    'luxury': 'Luxury',
    'modern': 'Modern',
    'minimalist': 'Minimalist',
    'klasik': 'Classic',
    'şık': 'Elegant',
    'konforlu': 'Comfortable',
    'ekonomik': 'Economic',
    'kompakt': 'Compact',
    'geniş': 'Spacious',
    'tiny house': 'Tiny House',
    'mobil ev': 'Mobile Home',
    'karavan': 'Caravan',
  }
  
  // Eğer direkt eşleşme varsa onu kullan
  for (const [tr, en] of Object.entries(translations)) {
    if (trText.toLowerCase().includes(tr.toLowerCase())) {
      return trText.replace(new RegExp(tr, 'gi'), en)
    }
  }
  
  // Eşleşme yoksa slug'dan İngilizce yapı kurmaya çalış
  const slug = createSlug(trText)
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Meta title ve description oluşturma
function generateMetaTitle(nameTr: string, nameEn: string): { tr: string, en: string } {
  return {
    tr: `${nameTr} - Tiny House Modelleri | Moortinyhouse`,
    en: `${nameEn} - Tiny House Models | Moortinyhouse`
  }
}

function generateMetaDescription(nameTr: string, nameEn: string, descriptionTr: string, descriptionEn: string): { tr: string, en: string } {
  const descTr = descriptionTr.length > 150 ? descriptionTr.substring(0, 147) + '...' : descriptionTr
  const descEn = descriptionEn.length > 150 ? descriptionEn.substring(0, 147) + '...' : descriptionEn
  return {
    tr: `${nameTr} hakkında detaylı bilgi. ${descTr}`,
    en: `Learn more about ${nameEn}. ${descEn}`
  }
}

export default function ModelsPanel({ models: initialModels }: ModelsPanelProps) {
  const [models, setModels] = useState(initialModels)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingModel, setEditingModel] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [galleryDefaultCategory, setGalleryDefaultCategory] = useState<string | undefined>(undefined)
  const [folderImages, setFolderImages] = useState<GalleryImage[]>([])
  const [folderImagesLoading, setFolderImagesLoading] = useState(false)
  const [allGalleryImages, setAllGalleryImages] = useState<GalleryImage[]>([])
  const [allGalleryLoading, setAllGalleryLoading] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [modelToDelete, setModelToDelete] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    slug: '',
    name_tr: '',
    tagline_tr: '',
    description_tr: '',
    size_sqm: '',
    bedrooms: '',
    bathrooms: '',
    features_tr: '',
    main_image: '',
    is_visible: true,
    is_popular: false,
    display_order: ''
  })
  const [featureInput, setFeatureInput] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)

  const features = useMemo(
    () => formData.features_tr.split('\n').map((f) => f.trim()).filter(Boolean),
    [formData.features_tr]
  )

  const setFeatures = (next: string[]) => {
    setFormData((prev) => ({ ...prev, features_tr: next.join('\n') }))
  }
  
  const supabase = createBrowserClient()
  const router = useRouter()

  const folderNameForSlug = (slug: string) => {
    const s = (slug || '').toLowerCase().trim()
    if (!s) return ''
    return s === 'beverly' ? 'baverly' : s
  }

  const loadAllGalleryImages = async () => {
    setAllGalleryLoading(true)
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      const imgs = (data?.images || []) as GalleryImage[]
      setAllGalleryImages(imgs)
    } catch {
      setAllGalleryImages([])
    } finally {
      setAllGalleryLoading(false)
    }
  }

  useEffect(() => {
    loadAllGalleryImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadFolderImages = async (slug: string) => {
    const folder = folderNameForSlug(slug)
    if (!folder) {
      setFolderImages([])
      return
    }
    setFolderImagesLoading(true)
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      const imgs = ((data?.images || []) as GalleryImage[]).filter((img) => img.category === folder)
      // Stable ordering
      imgs.sort((a, b) => (a.name || a.url).localeCompare(b.name || b.url))
      setFolderImages(imgs)
    } catch {
      setFolderImages([])
    } finally {
      setFolderImagesLoading(false)
    }
  }

  // Sadece slug'ı otomatik oluştur (İngilizce çeviri yok)
  useEffect(() => {
    if (!formData.name_tr || slugEdited) return
    const slug = createSlug(formData.name_tr)
    setFormData(prev => ({
      ...prev,
      slug
    }))
  }, [formData.name_tr, slugEdited])

  // Dialog açıkken slug'a göre klasör fotoğraflarını getir
  useEffect(() => {
    if (!isDialogOpen) return
    if (!formData.slug) {
      setFolderImages([])
      return
    }
    loadFolderImages(formData.slug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen, formData.slug])

  const updateCoverImage = async (modelId: string, imageUrl: string) => {
    if (!modelId || !imageUrl) return
    try {
      const { error } = await supabase
        .from('models')
        .update({ main_image: imageUrl })
        .eq('id', modelId)

      if (error) throw error

      setModels((prev) => prev.map((m) => (m.id === modelId ? { ...m, main_image: imageUrl } : m)))
      toast({
        title: 'Kapak güncellendi',
        description: 'Kapak fotoğrafı kaydedildi.',
      })
      router.refresh()
    } catch (e: any) {
      toast({
        title: 'Kapak güncellenemedi',
        description: e?.message || 'Bir hata oluştu.',
        variant: 'destructive',
      })
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Dosya boyutu kontrolü
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'Dosya Çok Büyük',
        description: 'Fotoğraf boyutu 10MB\'dan küçük olmalıdır. Lütfen daha küçük bir fotoğraf seçin.',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)
    try {
      // Dosya adını oluştur
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `models/${fileName}`

      // Supabase Storage'a yükle
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.warn('Storage upload failed:', uploadError)
        
        // Kullanıcıya daha açıklayıcı mesaj
        const errorMessage = uploadError.message || 'Bilinmeyen hata'
        
        if (errorMessage.includes('Bucket') || errorMessage.includes('bucket')) {
          toast({
            title: 'Fotoğraf Yükleme Hatası',
            description: 'Supabase Storage yapılandırması eksik. Lütfen "Galeriden Seç" butonunu kullanarak mevcut fotoğraflardan seçim yapabilir veya manuel URL girebilirsiniz.',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Fotoğraf Yüklenemedi',
            description: `Hata: ${errorMessage}. Lütfen "Galeriden Seç" butonunu kullanın veya manuel URL girin.`,
            variant: 'destructive',
          })
        }
        
        setUploading(false)
        return
      }

      // Public URL'yi al
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, main_image: publicUrl }))
      // If editing an existing model, persist immediately
      if (editingModel?.id) await updateCoverImage(editingModel.id, publicUrl)
      toast({
        title: 'Başarılı!',
        description: 'Fotoğraf başarıyla yüklendi.',
      })
    } catch (error: any) {
      console.error('Image upload error:', error)
      toast({
        title: 'Fotoğraf Yüklenemedi',
        description: `Bir hata oluştu: ${error.message || 'Bilinmeyen hata'}. Lütfen "Galeriden Seç" butonunu kullanın veya manuel URL girin.`,
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleOpenDialog = (model?: any) => {
    if (model) {
      setEditingModel(model)
      setFormData({
        slug: model.slug || '',
        name_tr: model.name_tr || '',
        tagline_tr: model.tagline_tr || '',
        description_tr: model.description_tr || '',
        size_sqm: model.size_sqm || '',
        bedrooms: model.bedrooms || '',
        bathrooms: model.bathrooms || '',
        features_tr: Array.isArray(model.features_tr) ? model.features_tr.join('\n') : '',
        main_image: model.main_image || '',
        is_visible: model.is_visible ?? true,
        is_popular: model.is_popular ?? false,
        display_order: model.display_order || ''
      })
      setFeatureInput('')
      setSlugEdited(true)
      const folder = folderNameForSlug(model.slug || '')
      setGalleryDefaultCategory(folder || undefined)
    } else {
      setEditingModel(null)
      setFormData({
        slug: '',
        name_tr: '',
        tagline_tr: '',
        description_tr: '',
        size_sqm: '',
        bedrooms: '',
        bathrooms: '',
        features_tr: '',
        main_image: '',
        is_visible: true,
        is_popular: false,
        display_order: ''
      })
      setFeatureInput('')
      setSlugEdited(false)
      setGalleryDefaultCategory(undefined)
    }
    setIsDialogOpen(true)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name_tr.trim()) {
      errors.name_tr = 'Model adı (Türkçe) zorunludur'
    }
    if (!formData.description_tr.trim()) {
      errors.description_tr = 'Açıklama (Türkçe) zorunludur'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Lütfen tüm zorunlu alanları doldurun.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const metaTitles = generateMetaTitle(formData.name_tr, formData.name_tr)
      const metaDescriptions = generateMetaDescription(
        formData.name_tr, 
        formData.name_tr, 
        formData.description_tr, 
        formData.description_tr
      )

      const data: any = {
        slug: formData.slug || createSlug(formData.name_tr),
        name_tr: formData.name_tr,
        name_en: formData.name_tr, // Auto-use Turkish name for English
        tagline_tr: formData.tagline_tr || null,
        tagline_en: formData.tagline_tr || null, // Auto-use Turkish tagline for English
        description_tr: formData.description_tr,
        description_en: formData.description_tr, // Auto-use Turkish description for English
        features_tr: formData.features_tr.split('\n').filter(f => f.trim()),
        features_en: formData.features_tr.split('\n').filter(f => f.trim()), // Auto-use Turkish features for English
        size_sqm: formData.size_sqm ? parseFloat(formData.size_sqm) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        display_order: formData.display_order ? parseInt(formData.display_order) : null,
        main_image: formData.main_image || null,
        is_visible: formData.is_visible,
        is_popular: formData.is_popular,
        seo_title_tr: metaTitles.tr,
        seo_title_en: metaTitles.en,
        seo_description_tr: metaDescriptions.tr,
        seo_description_en: metaDescriptions.en,
      }

      if (editingModel) {
        const { error } = await supabase
          .from('models')
          .update(data)
          .eq('id', editingModel.id)

        if (error) throw error

        setModels(models.map(m => m.id === editingModel.id ? { ...m, ...data } : m))
      } else {
        const { data: newModel, error } = await supabase
          .from('models')
          .insert(data)
          .select()
          .single()

        if (error) throw error

        setModels([...models, newModel])
      }

      setIsDialogOpen(false)
      setFormErrors({})
      toast({
        title: 'Başarılı!',
        description: editingModel ? 'Model başarıyla güncellendi.' : 'Yeni model başarıyla eklendi.',
      })
      router.refresh()
    } catch (error: any) {
      console.error('Error saving model:', error)
      toast({
        title: 'Hata',
        description: error.message || 'Model kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setModelToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (!modelToDelete) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('models')
        .delete()
        .eq('id', modelToDelete)

      if (error) throw error

      setModels(models.filter(m => m.id !== modelToDelete))
      setDeleteConfirmOpen(false)
      setModelToDelete(null)
      toast({
        title: 'Başarılı!',
        description: 'Model başarıyla silindi.',
      })
      router.refresh()
    } catch (error) {
      console.error('Error deleting model:', error)
      toast({
        title: 'Hata',
        description: 'Model silinirken bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleVisible = async (id: string, isVisible: boolean) => {
    try {
      const { error } = await supabase
        .from('models')
        .update({ is_visible: !isVisible })
        .eq('id', id)

      if (error) throw error

      setModels(models.map(m => m.id === id ? { ...m, is_visible: !isVisible } : m))
      toast({
        title: 'Başarılı!',
        description: isVisible ? 'Model gizlendi.' : 'Model görünür hale getirildi.',
      })
      router.refresh()
    } catch (error) {
      console.error('Error toggling model:', error)
      toast({
        title: 'Hata',
        description: 'Durum güncellenirken bir hata oluştu.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium">Tiny House Modelleri</h1>
          <p className="text-muted-foreground mt-1">{models.length} model</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Yeni Model Ekle
        </Button>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            {model.main_image && (
              <div className="relative h-48 w-full bg-secondary">
                <Image
                  src={model.main_image || "/placeholder.svg"}
                  alt={model.name_en || model.name_tr}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{model.name_tr || model.name_en}</h3>
                  <p className="text-sm text-muted-foreground">{model.slug}</p>
                </div>
                <div className="flex gap-1">
                  {model.is_popular && <Badge variant="secondary">Popüler</Badge>}
                  {!model.is_visible && <Badge variant="outline">Gizli</Badge>}
                </div>
              </div>
              
              {model.tagline_tr && (
                <p className="text-sm text-muted-foreground mb-3">{model.tagline_tr}</p>
              )}

              <div className="flex items-center gap-4 text-sm mb-4">
                {model.size_sqm && <span>{model.size_sqm}m²</span>}
                {model.bedrooms && <span>{model.bedrooms} yatak</span>}
                {model.bathrooms && <span>{model.bathrooms} banyo</span>}
              </div>

              {/* Klasördeki çoklu fotoğraflar + tek tıkla kapak değiştirme */}
              <div className="mb-4">
                {allGalleryLoading ? (
                  <p className="text-xs text-muted-foreground">Fotoğraflar yükleniyor...</p>
                ) : (
                  (() => {
                    const folder = folderNameForSlug(model.slug || '')
                    const imgs = allGalleryImages
                      .filter((img) => img.category === folder)
                      .sort((a, b) => (a.name || a.url).localeCompare(b.name || b.url))
                      .slice(0, 8)

                    if (!folder || imgs.length === 0) return null

                    return (
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">
                          Fotoğraflar ({folder}) — kapak yapmak için tıkla
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {imgs.map((img) => (
                            <button
                              key={img.url}
                              type="button"
                              className={`relative h-12 w-12 rounded-md overflow-hidden border transition-colors ${
                                model.main_image === img.url ? 'border-accent ring-2 ring-accent/20' : 'border-border hover:border-accent/50'
                              }`}
                              onClick={() => updateCoverImage(model.id, img.url)}
                              title="Kapak yap"
                            >
                              <Image src={img.url} alt={img.name} fill className="object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })()
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleVisible(model.id, model.is_visible)}
                  className="gap-1 flex-1"
                >
                  {model.is_visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {model.is_visible ? 'Gizle' : 'Göster'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(model)}
                  className="gap-1"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(model.id)}
                  disabled={loading}
                  className="gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDelete}
        title="Modeli Sil"
        description="Bu modeli silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sil"
        cancelText="İptal"
        variant="destructive"
        loading={loading}
      />

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
          setFormErrors({})
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingModel ? 'Model Düzenle' : 'Yeni Model Ekle'}</DialogTitle>
            <DialogDescription>
              {editingModel 
                ? 'Model bilgilerini düzenleyin. Zorunlu alanlar işaretlenmiştir.' 
                : 'Yeni bir tiny house modeli ekleyin. Zorunlu alanlar işaretlenmiştir.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Label>Model Adı (Türkçe) *</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Türkçe model adı. Bu ad web sitesinde görünecektir.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                value={formData.name_tr}
                onChange={(e) => {
                  setFormData({ ...formData, name_tr: e.target.value })
                  if (formErrors.name_tr) {
                    setFormErrors({ ...formErrors, name_tr: '' })
                  }
                }}
                placeholder="Aura Lüks Tiny House"
                className={formErrors.name_tr ? 'border-destructive' : ''}
              />
              {formErrors.name_tr && (
                <p className="text-xs text-destructive mt-1">{formErrors.name_tr}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Türkçe ad girerken otomatik olarak slug oluşturulacak
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label>Slug (URL) - Otomatik</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">URL'de kullanılacak kısa ad. Otomatik oluşturulur, gerekirse manuel düzenleyebilirsiniz.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Input
                  value={formData.slug}
                  onChange={(e) => {
                    setSlugEdited(true)
                    setFormData({ ...formData, slug: createSlug(e.target.value) })
                  }}
                  placeholder="aura-luxury-tiny-house"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const nextSlug = createSlug(formData.name_tr || formData.slug)
                    setSlugEdited(false)
                    setFormData((prev) => ({ ...prev, slug: nextSlug }))
                  }}
                >
                  Slug Oluştur
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ad değişince otomatik güncellenir, manuel düzenlerseniz korunur.</p>
            </div>

            <div>
              <Label>Slogan (Türkçe)</Label>
              <Input
                value={formData.tagline_tr}
                onChange={(e) => setFormData({ ...formData, tagline_tr: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Label>Açıklama (Türkçe) *</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Model hakkında detaylı açıklama. Müşteriler bu bilgiyi görecektir.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea
                value={formData.description_tr}
                onChange={(e) => {
                  setFormData({ ...formData, description_tr: e.target.value })
                  if (formErrors.description_tr) {
                    setFormErrors({ ...formErrors, description_tr: '' })
                  }
                }}
                rows={3}
                className={formErrors.description_tr ? 'border-destructive' : ''}
              />
              {formErrors.description_tr && (
                <p className="text-xs text-destructive mt-1">{formErrors.description_tr}</p>
              )}
            </div>

            <div>
              <Label>Büyüklük (m²)</Label>
              <Input
                type="number"
                value={formData.size_sqm}
                onChange={(e) => setFormData({ ...formData, size_sqm: e.target.value })}
              />
            </div>

            <div>
              <Label>Yatak Odası</Label>
              <Input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
              />
            </div>

            <div>
              <Label>Banyo</Label>
              <Input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
              />
            </div>

            <div>
              <Label>Görüntülenme Sırası</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Label>Ana Fotoğraf</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Modelin ana görseli. Maksimum 10MB. PNG, JPG veya WEBP formatında olmalıdır.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="space-y-2">
                {formData.main_image && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={formData.main_image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, main_image: '' })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors relative">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground text-center px-2">
                        <span className="font-semibold">{uploading ? 'Yükleniyor...' : 'Cihazdan Yükle'}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="h-32 flex flex-col items-center justify-center gap-2"
                    onClick={() => {
                      setGalleryDefaultCategory(folderNameForSlug(formData.slug) || undefined)
                      setShowGallery(true)
                    }}
                  >
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold">Galeriden Seç</span>
                  </Button>
                </div>

                {/* Model klasörü fotoğrafları (çoklu fotoğraf görünümü + kapak seçimi) */}
                <div className="mt-3 rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Label className="m-0">Model Fotoğrafları</Label>
                      {formData.slug ? (
                        <span className="text-xs text-muted-foreground">
                          ({folderNameForSlug(formData.slug)} / {folderImages.length})
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">(slug oluşturunca görünür)</span>
                      )}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={!formData.slug}
                      onClick={() => {
                        setGalleryDefaultCategory(folderNameForSlug(formData.slug) || undefined)
                        setShowGallery(true)
                      }}
                    >
                      Klasörden Seç
                    </Button>
                  </div>

                  {folderImagesLoading ? (
                    <p className="text-xs text-muted-foreground">Klasör fotoğrafları yükleniyor...</p>
                  ) : folderImages.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Bu model için <code className="px-1 rounded bg-muted">public/{folderNameForSlug(formData.slug || 'slug')}</code> altında
                      fotoğraf bulunamadı.
                    </p>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      {folderImages.slice(0, 16).map((img) => (
                        <button
                          key={img.url}
                          type="button"
                          className={`relative aspect-square rounded-md overflow-hidden border transition-colors ${
                            formData.main_image === img.url ? 'border-accent ring-2 ring-accent/20' : 'border-border hover:border-accent/50'
                          }`}
                          onClick={async () => {
                            setFormData((prev) => ({ ...prev, main_image: img.url }))
                            if (editingModel?.id) await updateCoverImage(editingModel.id, img.url)
                          }}
                          title="Kapak yapmak için tıkla"
                        >
                          <Image src={img.url} alt={img.name} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <Input
                  value={formData.main_image}
                  onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
                  placeholder="veya fotoğraf URL'si girin"
                />
              </div>
            </div>
            
            <ImageGallerySelector
              isOpen={showGallery}
              onClose={() => setShowGallery(false)}
              selectedImage={formData.main_image}
              onSelect={async (imageUrl) => {
                setFormData({ ...formData, main_image: imageUrl })
                if (editingModel?.id) await updateCoverImage(editingModel.id, imageUrl)
              }}
              defaultCategory={galleryDefaultCategory}
            />

            <div className="md:col-span-2">
              <Label>Özellikler (Türkçe)</Label>
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Özellik yaz ve Enter’a bas"
                    onKeyDown={(e) => {
                      if (e.key !== 'Enter') return
                      e.preventDefault()
                      const val = featureInput.trim()
                      if (!val) return
                      if (features.some((f) => f.toLowerCase() === val.toLowerCase())) {
                        setFeatureInput('')
                        return
                      }
                      setFeatures([...features, val])
                      setFeatureInput('')
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const val = featureInput.trim()
                      if (!val) return
                      if (features.some((f) => f.toLowerCase() === val.toLowerCase())) {
                        setFeatureInput('')
                        return
                      }
                      setFeatures([...features, val])
                      setFeatureInput('')
                    }}
                  >
                    Ekle
                  </Button>
                </div>

                {features.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/30 px-3 py-1 text-sm"
                      >
                        {f}
                        <button
                          type="button"
                          onClick={() => setFeatures(features.filter((x) => x !== f))}
                          className="ms-1 inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-secondary"
                          aria-label="Özelliği sil"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Henüz özellik eklenmedi.</p>
                )}
              </div>
            </div>

            <div className="md:col-span-2 flex gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                />
                <Label>Aktif</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_popular}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_popular: checked })}
                />
                <Label>Popüler</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
            <Button onClick={handleSave} disabled={loading || uploading}>
              {loading || uploading ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
