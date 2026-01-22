'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Upload, X, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { ConfirmationDialog } from './confirmation-dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ImageGallerySelector } from './image-gallery-selector'

type PortfolioPanelProps = {
  projects: any[]
}

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


export default function PortfolioPanel({ projects: initialProjects }: PortfolioPanelProps) {
  const [projects, setProjects] = useState(initialProjects)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    slug: '',
    title_tr: '',
    description_tr: '',
    location: '',
    completion_date: '',
    main_image: '',
    is_visible: true,
    display_order: ''
  })
  const [slugEdited, setSlugEdited] = useState(false)
  
  const supabase = createBrowserClient()
  const router = useRouter()

  useEffect(() => {
    if (!formData.title_tr || slugEdited) return
    const slug = createSlug(formData.title_tr)
    setFormData(prev => ({
      ...prev,
      slug
    }))
  }, [formData.title_tr, slugEdited])

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
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `portfolio/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.warn('Storage upload failed:', uploadError)
        toast({
          title: 'Fotoğraf Yüklenemedi',
          description: 'Lütfen manuel URL girin veya Supabase Storage bucket\'ınızı kontrol edin.',
          variant: 'destructive',
        })
        setUploading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, main_image: publicUrl }))
      toast({
        title: 'Başarılı!',
        description: 'Fotoğraf başarıyla yüklendi.',
      })
    } catch (error) {
      console.error('Image upload error:', error)
      toast({
        title: 'Hata',
        description: 'Fotoğraf yüklenirken bir hata oluştu.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleOpenDialog = (project?: any) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        slug: project.slug || '',
        title_tr: project.title_tr || '',
        description_tr: project.description_tr || '',
        location: project.location || '',
        completion_date: project.completion_date ? project.completion_date.split('T')[0] : '',
        main_image: project.main_image || '',
        is_visible: project.is_visible ?? true,
        display_order: project.display_order || ''
      })
      setSlugEdited(true)
    } else {
      setEditingProject(null)
      setFormData({
        slug: '',
        title_tr: '',
        description_tr: '',
        location: '',
        completion_date: '',
        main_image: '',
        is_visible: true,
        display_order: ''
      })
      setSlugEdited(false)
    }
    setIsDialogOpen(true)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.title_tr.trim()) {
      errors.title_tr = 'Proje başlığı (Türkçe) zorunludur'
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
      const data: any = {
        slug: formData.slug || createSlug(formData.title_tr),
        title_tr: formData.title_tr,
        title_en: formData.title_tr, // Auto-use Turkish title for English
        description_tr: formData.description_tr,
        description_en: formData.description_tr, // Auto-use Turkish description for English
        location: formData.location || null,
        completion_date: formData.completion_date || null,
        main_image: formData.main_image || null,
        is_visible: formData.is_visible,
        display_order: formData.display_order ? parseInt(formData.display_order) : null,
        seo_title_tr: `${formData.title_tr} - Portföy Projesi | Moortinyhouse`,
        seo_title_en: `${formData.title_tr} - Portfolio Project | Moortinyhouse`,
        seo_description_tr: formData.description_tr.length > 150 ? formData.description_tr.substring(0, 147) + '...' : formData.description_tr,
        seo_description_en: formData.description_tr.length > 150 
          ? formData.description_tr.substring(0, 147) + '...' 
          : formData.description_tr
      }

      if (editingProject) {
        const { error } = await supabase
          .from('portfolio_projects')
          .update(data)
          .eq('id', editingProject.id)

        if (error) throw error

        setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...data } : p))
      } else {
        const { data: newProject, error } = await supabase
          .from('portfolio_projects')
          .insert(data)
          .select()
          .single()

        if (error) throw error

        setProjects([...projects, newProject])
      }

      setIsDialogOpen(false)
      setFormErrors({})
      toast({
        title: 'Başarılı!',
        description: editingProject ? 'Proje başarıyla güncellendi.' : 'Yeni proje başarıyla eklendi.',
      })
      router.refresh()
    } catch (error: any) {
      console.error('Error saving project:', error)
      toast({
        title: 'Hata',
        description: error.message || 'Proje kaydedilirken bir hata oluştu.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (!projectToDelete) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', projectToDelete)

      if (error) throw error

      setProjects(projects.filter(p => p.id !== projectToDelete))
      setDeleteConfirmOpen(false)
      setProjectToDelete(null)
      toast({
        title: 'Başarılı!',
        description: 'Proje başarıyla silindi.',
      })
      router.refresh()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: 'Hata',
        description: 'Proje silinirken bir hata oluştu.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium">Portföy Projeleri</h1>
          <p className="text-muted-foreground mt-1">{projects.length} proje</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Yeni Proje Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            {project.main_image && (
              <div className="relative h-48 w-full bg-secondary">
                <Image
                  src={project.main_image || "/placeholder.svg"}
                  alt={project.title_en || project.title_tr}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{project.title_tr || project.title_en}</h3>
                  {project.location && (
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  )}
                </div>
              </div>
              
              {project.description_tr && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description_tr}</p>
              )}

              {project.completion_date && (
                <p className="text-xs text-muted-foreground mb-4">
                  Tamamlanma: {new Date(project.completion_date).toLocaleDateString('tr-TR')}
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(project)}
                  className="gap-1 flex-1"
                >
                  <Edit className="w-4 h-4" />
                  Düzenle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(project.id)}
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
        title="Projeyi Sil"
        description="Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sil"
        cancelText="İptal"
        variant="destructive"
        loading={loading}
      />

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
          setFormErrors({})
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Proje Düzenle' : 'Yeni Proje Ekle'}</DialogTitle>
            <DialogDescription>
              {editingProject 
                ? 'Proje bilgilerini düzenleyin. Zorunlu alanlar işaretlenmiştir.' 
                : 'Yeni bir portföy projesi ekleyin. Zorunlu alanlar işaretlenmiştir.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Label>Proje Başlığı (Türkçe) *</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Projenin başlığı. Web sitesinde görünecektir.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                value={formData.title_tr}
                onChange={(e) => {
                  setFormData({ ...formData, title_tr: e.target.value })
                  if (formErrors.title_tr) {
                    setFormErrors({ ...formErrors, title_tr: '' })
                  }
                }}
                placeholder="İstanbul Küçük Ev Projesi"
                className={formErrors.title_tr ? 'border-destructive' : ''}
              />
              {formErrors.title_tr && (
                <p className="text-xs text-destructive mt-1">{formErrors.title_tr}</p>
              )}
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
                  placeholder="istanbul-kucuk-ev-projesi"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const nextSlug = createSlug(formData.title_tr || formData.slug)
                    setSlugEdited(false)
                    setFormData((prev) => ({ ...prev, slug: nextSlug }))
                  }}
                >
                  Slug Oluştur
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Başlık değişince otomatik güncellenir, manuel düzenlerseniz korunur.</p>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Label>Açıklama (Türkçe) *</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Proje hakkında detaylı açıklama. Müşteriler bu bilgiyi görecektir.</p>
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
                rows={4}
                className={formErrors.description_tr ? 'border-destructive' : ''}
              />
              {formErrors.description_tr && (
                <p className="text-xs text-destructive mt-1">{formErrors.description_tr}</p>
              )}
            </div>


            <div>
              <Label>Konum</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="İstanbul, Türkiye"
              />
            </div>

            <div>
              <Label>Tamamlanma Tarihi</Label>
              <Input
                type="date"
                value={formData.completion_date}
                onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
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
                    <p className="max-w-xs">Projenin ana görseli. Maksimum 10MB. PNG, JPG veya WEBP formatında olmalıdır.</p>
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
                    onClick={() => setShowGallery(true)}
                  >
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold">Galeriden Seç</span>
                  </Button>
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
              onSelect={(imageUrl) => setFormData({ ...formData, main_image: imageUrl })}
            />

            <div>
              <Label>Görüntülenme Sırası</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 flex gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                />
                <Label>Aktif</Label>
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
