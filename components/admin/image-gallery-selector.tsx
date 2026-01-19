'use client'

import { useState } from 'react'
import { X, Check, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Public klasöründeki mevcut fotoğraflar
const availableImages = [
  '/luxury-modern-tiny-house-exterior-wood-siding-larg.webp',
  '/luxury-modern-tiny-house-interior-bedroom-with-lar.webp',
  '/luxury-tiny-house-interior-living-room-modern-desi.webp',
  '/luxury-tiny-house-bedroom-loft-cozy-lighting.webp',
  '/luxury-tiny-house-kitchen-modern-appliances.webp',
  '/modern-tiny-house-family-home-exterior-porch-garde.webp',
  '/minimalist-tiny-house-japanese-inspired-exterior-p.webp',
  '/minimalist-tiny-house-zen-interior-meditation-spac.webp',
  '/minimalist-tiny-house-bedroom-natural-light-simple.webp',
  '/beautiful-modern-tiny-house-in-nature-forest-setti.webp',
  '/cozy-tiny-house-family-space-open-plan-living-room.webp',
  '/horizon-tiny-house-on-wheels-travel.webp',
  '/lux-tiny-house-luxury-interior-premium.webp',
  '/nova-tiny-house-family-home-exterior.webp',
  '/terra-tiny-house-green-roof-eco.webp',
  '/zen-tiny-house-interior-meditation-space-bamboo.webp',
]

type ImageGallerySelectorProps = {
  selectedImage: string
  onSelect: (imageUrl: string) => void
  onClose: () => void
  isOpen: boolean
}

export function ImageGallerySelector({ selectedImage, onSelect, onClose, isOpen }: ImageGallerySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredImages = availableImages.filter(img => 
    img.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Fotoğraf Galerisi - Seçim Yapın</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Fotoğraf ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
              {filteredImages.map((imageUrl) => (
                <button
                  key={imageUrl}
                  onClick={() => {
                    onSelect(imageUrl)
                    onClose()
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === imageUrl
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <Image
                    src={imageUrl}
                    alt="Galeri fotoğrafı"
                    fill
                    className="object-cover"
                  />
                  {selectedImage === imageUrl && (
                    <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-accent-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
