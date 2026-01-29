'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ImageIcon,
  FolderOpen,
  Search,
  X,
  Trash2,
  Loader2,
  Plus,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageFile {
  path: string
  name: string
  category: string
  url: string
}

interface Album {
  id: string
  name: string
  images: string[]
  category?: string
}

const ALBUMS_KEY = 'gallery_albums'

export default function GalleryPanel() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [categories, setCategories] = useState<string[]>(['Genel'])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [newAlbumName, setNewAlbumName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [albums, setAlbums] = useState<Album[]>([])
  const [expandedAlbumId, setExpandedAlbumId] = useState<string | null>(null)
  const [draggedPath, setDraggedPath] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(ALBUMS_KEY) : null
      if (raw) setAlbums(JSON.parse(raw))
    } catch {}
  }, [])

  const loadImages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setImages(data.images || [])
      const cats = data.categories || ['Genel']
      setCategories(cats.includes('Genel') ? cats : ['Genel', ...cats])
    } catch {
      toast.error('Galeri yüklenemedi')
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const saveAlbums = (next: Album[]) => {
    setAlbums(next)
    if (typeof window !== 'undefined') localStorage.setItem(ALBUMS_KEY, JSON.stringify(next))
  }

  const addToAlbum = (albumId: string, path: string) => {
    const a = albums.find((x) => x.id === albumId)
    if (!a) return
    if (a.images.includes(path)) {
      toast.info('Zaten bu albümde')
      return
    }
    saveAlbums(albums.map((x) => (x.id === albumId ? { ...x, images: [...x.images, path] } : x)))
    toast.success(`"${a.name}" albümüne eklendi`)
  }

  const removeFromAlbum = (albumId: string, path: string) => {
    saveAlbums(albums.map((a) => (a.id === albumId ? { ...a, images: a.images.filter((p) => p !== path) } : a)))
    toast.success('Albümden çıkarıldı')
  }

  const createAlbum = () => {
    const name = newAlbumName.trim()
    if (!name) {
      toast.error('Albüm adı yazın')
      return
    }
    const newA: Album = { id: Date.now().toString(), name, images: [] }
    saveAlbums([...albums, newA])
    setNewAlbumName('')
    setExpandedAlbumId(newA.id)
    toast.success('Albüm oluşturuldu')
  }

  const deleteAlbum = (id: string) => {
    saveAlbums(albums.filter((a) => a.id !== id))
    if (expandedAlbumId === id) setExpandedAlbumId(null)
    toast.success('Albüm silindi')
  }

  const onDragStart = (e: React.DragEvent, path: string) => {
    e.dataTransfer.setData('text/plain', path)
    e.dataTransfer.effectAllowed = 'copy'
    setDraggedPath(path)
  }

  const onDragEnd = () => {
    setDraggedPath(null)
    setDropTargetId(null)
  }

  const onDrop = (e: React.DragEvent, albumId: string) => {
    e.preventDefault()
    const path = e.dataTransfer.getData('text/plain')
    if (path) addToAlbum(albumId, path)
    setDropTargetId(null)
    setDraggedPath(null)
  }

  const onDragOver = (e: React.DragEvent, albumId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setDropTargetId(albumId)
  }

  const onDragLeave = () => setDropTargetId(null)

  const filteredImages = images.filter((img) => {
    const okCat = selectedCategory === 'all' || img.category === selectedCategory
    const okSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase())
    return okCat && okSearch
  })

  const getImg = (path: string): ImageFile =>
    images.find((x) => x.path === path) || { path, name: path.split('/').pop() || '', category: '', url: path }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium">Galeri</h1>
          <p className="text-sm text-muted-foreground">Klasöre göre filtrele, görsele tıklayıp albüme ekle veya sürükleyip bırak.</p>
        </div>
        <Button variant="outline" size="sm" onClick={loadImages} disabled={loading} className="gap-2 shrink-0">
          <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
          Yenile
        </Button>
      </div>

      {/* Filtreler */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          Tümü
        </Button>
        {categories.filter((c) => c !== 'all').map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="gap-1"
          >
            {cat}
            <Badge variant="secondary" className="text-[10px]">
              {images.filter((i) => i.category === cat).length}
            </Badge>
          </Button>
        ))}
        <div className="flex-1 min-w-[140px] max-w-xs">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredImages.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Görsel yok.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <code className="bg-muted px-1 rounded">public</code> veya{' '}
                  <code className="bg-muted px-1 rounded">public/gallery/...</code> klasörüne .jpg, .png ekleyin.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <AnimatePresence>
                {filteredImages.map((img) => (
                  <motion.div
                    key={img.path}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      'group relative aspect-square rounded-lg overflow-hidden border bg-muted',
                      draggedPath === img.path ? 'ring-2 ring-accent' : 'border-border hover:border-accent/50'
                    )}
                    draggable
                    onDragStart={(e: any) => {
                      if (e.dataTransfer) {
                        onDragStart(e as React.DragEvent, img.path)
                      }
                    }}
                    onDragEnd={onDragEnd}
                  >
                    <Image src={img.url} alt={img.name} fill className="object-cover" sizes="200px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between gap-1">
                      <span className="text-[10px] text-white truncate">{img.name}</span>
                      <Badge variant="secondary" className="text-[9px] shrink-0">
                        {img.category}
                      </Badge>
                    </div>
                    <div className="absolute top-1.5 right-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 shadow"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {albums.length === 0 ? (
                            <DropdownMenuItem disabled>Önce sağdan albüm oluşturun</DropdownMenuItem>
                          ) : (
                            albums.map((a) => (
                              <DropdownMenuItem
                                key={a.id}
                                onClick={() => addToAlbum(a.id, img.path)}
                              >
                                <FolderOpen className="w-4 h-4 mr-2" />
                                {a.name}
                              </DropdownMenuItem>
                            ))
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Albümler paneli */}
        <aside className="w-full lg:w-72 shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Albümler</CardTitle>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Yeni albüm adı"
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && createAlbum()}
                  className="h-9"
                />
                <Button size="sm" onClick={createAlbum} className="shrink-0">
                  Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {albums.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">Henüz albüm yok. Yukarıdan oluşturun.</p>
              ) : (
                <div className="space-y-2 max-h-[420px] overflow-y-auto">
                  {albums.map((a) => (
                    <div
                      key={a.id}
                      onDragOver={(e) => onDragOver(e, a.id)}
                      onDragLeave={onDragLeave}
                      onDrop={(e) => onDrop(e, a.id)}
                      className={cn(
                        'rounded-lg border transition-colors',
                        dropTargetId === a.id
                          ? 'border-accent bg-accent/10 ring-2 ring-accent/50'
                          : 'border-border bg-card'
                      )}
                    >
                      <div
                        className="flex items-center gap-2 p-2.5 cursor-pointer hover:bg-muted/50 rounded-lg"
                        onClick={() => setExpandedAlbumId((id) => (id === a.id ? null : a.id))}
                      >
                        <FolderOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-sm font-medium truncate flex-1">{a.name}</span>
                        <Badge variant="secondary" className="text-[10px]">
                          {a.images.length}
                        </Badge>
                        {expandedAlbumId === a.id ? (
                          <ChevronUp className="w-4 h-4 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 shrink-0" />
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteAlbum(a.id)
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <AnimatePresence>
                        {expandedAlbumId === a.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-3 gap-1.5 p-2 pt-0 border-t border-border mt-1">
                              {a.images.length === 0 ? (
                                <p className="col-span-3 text-xs text-muted-foreground py-4 text-center">
                                  Boş. Görsele tıkla → + → albüm seç veya sürükleyip bırak.
                                </p>
                              ) : (
                                a.images.map((p) => {
                                  const i = getImg(p)
                                  return (
                                    <div
                                      key={p}
                                      className="group/thumb relative aspect-square rounded overflow-hidden bg-muted"
                                    >
                                      <Image src={i.url} alt={i.name} fill className="object-cover" sizes="80px" />
                                      <button
                                        type="button"
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          removeFromAlbum(a.id, p)
                                        }}
                                      >
                                        <X className="w-4 h-4 text-white" />
                                      </button>
                                    </div>
                                  )
                                })
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
