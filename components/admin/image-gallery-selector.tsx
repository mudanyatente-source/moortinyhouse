'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type GalleryImage = {
  path: string
  name: string
  category: string
  url: string
}

type ImageGallerySelectorProps = {
  selectedImage: string
  onSelect: (imageUrl: string) => void
  onClose: () => void
  isOpen: boolean
  defaultCategory?: string
}

export function ImageGallerySelector({
  selectedImage,
  onSelect,
  onClose,
  isOpen,
  defaultCategory
}: ImageGallerySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [category, setCategory] = useState<string>('all')

  useEffect(() => {
    if (!isOpen) return
    setCategory(defaultCategory ? defaultCategory : 'all')
    setSearchTerm('')
  }, [isOpen, defaultCategory])

  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()
        if (cancelled) return
        setImages((data?.images || []) as GalleryImage[])
        setCategories((data?.categories || []) as string[])
      } catch {
        if (cancelled) return
        setImages([])
        setCategories([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [isOpen])

  const filteredImages = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return images.filter((img) => {
      const okCat = category === 'all' || img.category === category
      const okSearch = !q || img.name.toLowerCase().includes(q) || img.url.toLowerCase().includes(q)
      return okCat && okSearch
    })
  }, [images, category, searchTerm])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Fotoğraf Galerisi - Seçim Yapın</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Fotoğraf ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
              <select
                className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">Tümü</option>
                {categories
                  .filter((c) => c && c !== 'all')
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
              {loading && (
                <div className="col-span-3 md:col-span-4 lg:col-span-5 text-center text-sm text-muted-foreground py-8">
                  Yükleniyor...
                </div>
              )}
              {filteredImages.map((imageUrl) => (
                <button
                  key={imageUrl.url}
                  onClick={() => {
                    onSelect(imageUrl.url)
                    onClose()
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === imageUrl.url
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <Image
                    src={imageUrl.url}
                    alt={imageUrl.name || 'Galeri fotoğrafı'}
                    fill
                    className="object-cover"
                  />
                  {selectedImage === imageUrl.url && (
                    <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-accent-foreground" />
                    </div>
                  )}
                </button>
              ))}
              {!loading && filteredImages.length === 0 && (
                <div className="col-span-3 md:col-span-4 lg:col-span-5 text-center text-sm text-muted-foreground py-8">
                  Görsel bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
