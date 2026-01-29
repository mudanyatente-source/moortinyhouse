'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Check, X, Upload, HelpCircle } from 'lucide-react'
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

type TestimonialsPanelProps = {
  testimonials: any[]
}

export default function TestimonialsPanel({ testimonials: initialTestimonials }: TestimonialsPanelProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name_tr: '',
    role_tr: '',
    content_tr: '',
    image: '',
    rating: '5',
    is_visible: true,
    display_order: ''
  })
  
  const supabase = createBrowserClient()
  const router = useRouter()

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
      const filePath = `testimonials/${fileName}`

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

      setFormData(prev => ({ ...prev, image: publicUrl }))
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

  const handleOpenDialog = (testimonial?: any) => {
    if (testimonial) {
      setEditingTestimonial(testimonial)
      setFormData({
        name_tr: testimonial.name_tr || '',
        role_tr: testimonial.role_tr || '',
        content_tr: testimonial.content_tr || '',
        image: testimonial.image || '',
        rating: testimonial.rating?.toString() || '5',
        is_visible: testimonial.is_visible ?? true,
        display_order: testimonial.display_order || ''
      })
    } else {
      setEditingTestimonial(null)
      setFormData({
        name_tr: '',
        role_tr: '',
        content_tr: '',
        image: '',
        rating: '5',
        is_visible: true,
        display_order: ''
      })
    }
    setIsDialogOpen(true)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name_tr.trim()) {
      errors.name_tr = 'İsim (Türkçe) zorunludur'
    }
    if (!formData.content_tr.trim()) {
      errors.content_tr = 'Yorum (Türkçe) zorunludur'
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
        name_tr: formData.name_tr,
        name_en: formData.name_tr, // Auto-use Turkish name for English
        role_tr: formData.role_tr || null,
        role_en: formData.role_tr || null, // Auto-use Turkish role for English
        content_tr: formData.content_tr,
        content_en: formData.content_tr, // Auto-use Turkish content for English
        image: formData.image || null,
        rating: parseInt(formData.rating),
        is_visible: formData.is_visible,
        display_order: formData.display_order ? parseInt(formData.display_order) : null
      }

      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(data)
          .eq('id', editingTestimonial.id)

        if (error) throw error

        setTestimonials(testimonials.map(t => 
          t.id === editingTestimonial.id ? { ...t, ...data } : t
        ))
      } else {
        const { data: newTestimonial, error } = await supabase
          .from('testimonials')
          .insert(data)
          .select()
          .single()

        if (error) throw error

        setTestimonials([...testimonials, newTestimonial])
      }

      setIsDialogOpen(false)
      setFormErrors({})
      toast({
        title: 'Başarılı!',
        description: editingTestimonial ? 'Referans başarıyla güncellendi.' : 'Yeni referans başarıyla eklendi.',
      })
      router.refresh()
    } catch (error: any) {
      console.error('Error saving testimonial:', error)
      toast({
        title: 'Hata',
        description: error.message || 'Referans kaydedilirken bir hata oluştu.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setTestimonialToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (!testimonialToDelete) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', testimonialToDelete)

      if (error) throw error

      setTestimonials(testimonials.filter(t => t.id !== testimonialToDelete))
      setDeleteConfirmOpen(false)
      setTestimonialToDelete(null)
      toast({
        title: 'Başarılı!',
        description: 'Referans başarıyla silindi.',
      })
      router.refresh()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      toast({
        title: 'Hata',
        description: 'Referans silinirken bir hata oluştu.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleVisible = async (id: string, isVisible: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_visible: !isVisible })
        .eq('id', id)

      if (error) throw error

      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, is_visible: !isVisible } : t
      ))
      toast({
        title: 'Başarılı!',
        description: isVisible ? 'Referans gizlendi.' : 'Referans görünür hale getirildi.',
      })
      router.refresh()
    } catch (error) {
      console.error('Error toggling testimonial:', error)
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
          <h1 className="text-3xl font-serif font-medium">Müşteri Referansları</h1>
          <p className="text-muted-foreground mt-1">{testimonials.length} referans</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Yeni Referans Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {testimonial.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name_tr || testimonial.name_en}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{testimonial.name_tr || testimonial.name_en}</h3>
                  {testimonial.role_tr && (
                    <p className="text-sm text-muted-foreground">{testimonial.role_tr}</p>
                  )}
                </div>
              </div>
              <Badge variant={testimonial.is_visible ? "default" : "secondary"}>
                {testimonial.is_visible ? 'Aktif' : 'Gizli'}
              </Badge>
            </div>

            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < (testimonial.rating || 5) ? 'text-yellow-500' : 'text-gray-300'}>★</span>
              ))}
            </div>

            <p className="text-sm mb-4">"{testimonial.content_tr || testimonial.content_en}"</p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleVisible(testimonial.id, testimonial.is_visible)}
                disabled={loading}
                className="gap-1 flex-1"
              >
                {testimonial.is_visible ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                {testimonial.is_visible ? 'Gizle' : 'Göster'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenDialog(testimonial)}
                className="gap-1"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteClick(testimonial.id)}
                disabled={loading}
                className="gap-1"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDelete}
        title="Referansı Sil"
        description="Bu referansı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? 'Referans Düzenle' : 'Yeni Referans Ekle'}</DialogTitle>
            <DialogDescription>
              {editingTestimonial 
                ? 'Referans bilgilerini düzenleyin. Zorunlu alanlar işaretlenmiştir.' 
                : 'Yeni bir müşteri referansı ekleyin. Zorunlu alanlar işaretlenmiştir.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Label>İsim (Türkçe) *</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Müşterinin adı. Web sitesinde görünecektir.</p>
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
                className={formErrors.name_tr ? 'border-destructive' : ''}
              />
              {formErrors.name_tr && (
                <p className="text-xs text-destructive mt-1">{formErrors.name_tr}</p>
              )}
            </div>

            <div>
              <Label>Unvan/Rol (Türkçe)</Label>
              <Input
                value={formData.role_tr}
                onChange={(e) => setFormData({ ...formData, role_tr: e.target.value })}
                placeholder="Tiny House Sahibi"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Label>Yorum (Türkçe) *</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Müşterinin yorumu. Web sitesinde görünecektir.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea
                value={formData.content_tr}
                onChange={(e) => {
                  setFormData({ ...formData, content_tr: e.target.value })
                  if (formErrors.content_tr) {
                    setFormErrors({ ...formErrors, content_tr: '' })
                  }
                }}
                rows={4}
                className={formErrors.content_tr ? 'border-destructive' : ''}
              />
              {formErrors.content_tr && (
                <p className="text-xs text-destructive mt-1">{formErrors.content_tr}</p>
              )}
            </div>


            <div>
              <Label>Puan (1-5)</Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
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
                <Label>Fotoğraf</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Müşteri fotoğrafı. Maksimum 10MB. PNG, JPG veya WEBP formatında olmalıdır.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="space-y-2">
                {formData.image && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border border-border">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
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
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="veya fotoğraf URL'si girin"
                />
              </div>
            </div>
            
            <ImageGallerySelector
              isOpen={showGallery}
              onClose={() => setShowGallery(false)}
              selectedImage={formData.image}
              onSelect={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
            />

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
