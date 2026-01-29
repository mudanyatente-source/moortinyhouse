'use client'

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Maximize2, Users, Leaf, Bed, Plus, X, Check, Eye, Image as ImageIcon } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { useEffect } from "react"
import { useTheme } from "next-themes"

interface Model {
  id: string
  slug: string
  name_tr: string
  name_en: string
  tagline_tr: string
  tagline_en: string
  description_tr: string
  description_en: string
  images: string[]
  specs: {
    sqm: number
    capacity: string
    eco: string
    bedrooms: number
    bathrooms: number
  }
  features: string[]
  features_en: string[]
  hotspots?: Array<{ 
    x: number
    y: number
    title_tr?: string
    title_en?: string
    desc_tr?: string
    desc_en?: string
  }>
}

interface ModelDetailClientProps {
  model: Model
  prevModel?: { slug: string; name_tr: string; name_en: string }
  nextModel?: { slug: string; name_tr: string; name_en: string }
  allModels: Array<{ slug: string; name_tr: string; name_en: string }>
}

export default function ModelDetailClient({ model, prevModel, nextModel }: ModelDetailClientProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { theme } = useTheme()
  const [activeImage, setActiveImage] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [galleryCategory, setGalleryCategory] = useState<'all' | 'exterior' | 'interior'>('all')
  const [galleryActiveImage, setGalleryActiveImage] = useState(0)
  const [returnToGallery, setReturnToGallery] = useState(false)
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)

  // Theme-aware colors
  const isDark = theme === 'dark'
  const bgColor = isDark ? 'bg-black/95' : 'bg-white/95'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const textMutedColor = isDark ? 'text-white/80' : 'text-gray-600'
  const textMutedLightColor = isDark ? 'text-white/60' : 'text-gray-500'
  const borderColor = isDark ? 'border-white/10' : 'border-gray-200'
  const hoverBgColor = isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
  const activeBgColor = isDark ? 'bg-white/20' : 'bg-gray-200'
  const panelBgColor = isDark ? 'bg-black/80' : 'bg-white/90'
  const overlayBgColor = isDark ? 'bg-black/50' : 'bg-white/80'

  const getModelName = () => language === 'tr' ? model.name_tr : model.name_en
  const getModelTagline = () => language === 'tr' ? model.tagline_tr : model.tagline_en
  const getModelDescription = () => language === 'tr' ? model.description_tr : model.description_en
  const getFeatures = () => language === 'tr' ? model.features : model.features_en
  
  const getHotspotTitle = (hotspot: any) => {
    return language === 'tr' ? (hotspot.title_tr || hotspot.title) : (hotspot.title_en || hotspot.title)
  }
  
  const getHotspotDesc = (hotspot: any) => {
    return language === 'tr' ? (hotspot.desc_tr || hotspot.desc) : (hotspot.desc_en || hotspot.desc)
  }

  // Fotoğrafları kategorilere ayır - yeni klasör yapısına göre
  const categorizeImages = () => {
    const exterior: string[] = []
    const interior: string[] = []
    
    model.images.forEach((img, index) => {
      const imgPath = img.toLowerCase()
      
      // Orion için - henüz alt klasör yok, eski sistem
      if (model.slug === 'orion') {
        // Şimdilik yarı yarıya bölelim, sonra Orion'u da organize edersiniz
        if (index === 0 || 
            imgPath.includes('orion.webp') ||
            imgPath.includes('gemini_generated') ||
            index >= model.images.length - 10) {
          exterior.push(img)
        } else {
          interior.push(img)
        }
      }
      // Beverly için - yeni klasör yapısına göre
      else if (model.slug === 'beverly') {
        if (imgPath.includes('/baverly/dış/') || imgPath.includes('/baverly/dis/')) {
          exterior.push(img)
        } else if (imgPath.includes('/baverly/iç/') || imgPath.includes('/baverly/ic/')) {
          interior.push(img)
        } else {
          // Eski yapıdaki fotoğraflar varsa, ana klasördekiler
          if (index === 0) {
            exterior.push(img)
          } else {
            interior.push(img)
          }
        }
      }
      // Genel kategorizasyon
      else {
        if (index === 0 || index % 3 === 0) {
          exterior.push(img)
        } else {
          interior.push(img)
        }
      }
    })
    
    return { exterior, interior, all: model.images }
  }

  const { exterior, interior, all } = categorizeImages()
  
  const getCurrentGalleryImages = () => {
    switch (galleryCategory) {
      case 'exterior': return exterior
      case 'interior': return interior
      default: return all
    }
  }

  const currentGalleryImages = getCurrentGalleryImages()

  // Galeri açıldığında kategori değiştiğinde aktif resmi sıfırla
  const handleCategoryChange = (category: 'all' | 'exterior' | 'interior') => {
    setGalleryCategory(category)
    setGalleryActiveImage(0)
  }

  // Orion ve Beverly için özel hotspot'lar
  const getModelHotspots = () => {
    if (model.slug === 'orion') {
      return [
        {
          x: 25, y: 40,
          title_tr: 'Loft Yatak Odası',
          title_en: 'Loft Bedroom',
          desc_tr: 'Tek loft tasarımı ile maksimum alan kullanımı. Rahat ve ferah yatak alanı.',
          desc_en: 'Maximum space utilization with single loft design. Comfortable and spacious bedroom area.'
        },
        {
          x: 60, y: 65,
          title_tr: 'Modern Mutfak',
          title_en: 'Modern Kitchen',
          desc_tr: 'Kompakt ama tam donanımlı mutfak. Tüm ihtiyaçlarınız için yeterli alan.',
          desc_en: 'Compact but fully equipped kitchen. Sufficient space for all your needs.'
        },
        {
          x: 80, y: 45,
          title_tr: 'Oturma Alanı',
          title_en: 'Living Area',
          desc_tr: 'Geniş ve konforlu oturma alanı. Misafirlerinizi ağırlamak için ideal.',
          desc_en: 'Spacious and comfortable living area. Ideal for entertaining guests.'
        }
      ]
    }
    
    if (model.slug === 'beverly') {
      return [
        {
          x: 20, y: 30,
          title_tr: 'Ana Yatak Odası',
          title_en: 'Master Bedroom',
          desc_tr: 'Geniş ana yatak odası. Aileler için rahat ve özel alan.',
          desc_en: 'Spacious master bedroom. Comfortable and private space for families.'
        },
        {
          x: 50, y: 60,
          title_tr: 'Aile Oturma Alanı',
          title_en: 'Family Living Area',
          desc_tr: 'Geniş oturma alanı. Tüm aile için rahat bir yaşam alanı.',
          desc_en: 'Spacious living area. Comfortable living space for the whole family.'
        },
        {
          x: 75, y: 40,
          title_tr: 'Çocuk Odası',
          title_en: 'Children\'s Room',
          desc_tr: 'Çocuklar için özel tasarlanmış alan. Güvenli ve eğlenceli.',
          desc_en: 'Specially designed space for children. Safe and fun.'
        },
        {
          x: 85, y: 70,
          title_tr: 'Tam Mutfak',
          title_en: 'Full Kitchen',
          desc_tr: 'Tam donanımlı mutfak. Aile yemekleri için geniş çalışma alanı.',
          desc_en: 'Fully equipped kitchen. Spacious workspace for family meals.'
        }
      ]
    }
    
    return model.hotspots || []
  }

  const modelHotspots = getModelHotspots()

  // Keyboard navigation ve body scroll kontrolü
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') {
          setIsLightboxOpen(false)
          if (returnToGallery) {
            setIsGalleryOpen(true)
            setReturnToGallery(false)
          }
        } else if (e.key === 'ArrowLeft' && currentGalleryImages.length > 1) {
          setGalleryActiveImage(galleryActiveImage > 0 ? galleryActiveImage - 1 : currentGalleryImages.length - 1)
        } else if (e.key === 'ArrowRight' && currentGalleryImages.length > 1) {
          setGalleryActiveImage(galleryActiveImage < currentGalleryImages.length - 1 ? galleryActiveImage + 1 : 0)
        }
      } else if (isGalleryOpen) {
        if (e.key === 'Escape') {
          setIsGalleryOpen(false)
          setCategoryMenuOpen(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLightboxOpen, isGalleryOpen, galleryActiveImage, currentGalleryImages.length, returnToGallery])

  // Body scroll kontrolü - daha etkili yöntem
  useEffect(() => {
    if (isGalleryOpen || isLightboxOpen) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY
      
      // Body'yi sabitle
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      
      // Cleanup function
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        
        // Scroll pozisyonunu geri yükle
        window.scrollTo(0, scrollY)
      }
    }
  }, [isGalleryOpen, isLightboxOpen])

  // Dropdown menü dışına tıklama kontrolü
  useEffect(() => {
    const handleClickOutside = () => {
      if (categoryMenuOpen) {
        setCategoryMenuOpen(false)
      }
    }

    if (categoryMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [categoryMenuOpen])

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <Link
              href="/models"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("models.backToModels")}
            </Link>
          </RevealAnimation>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <RevealAnimation>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <AnimatePresence mode="wait">
                    {model.images[activeImage] && (
                      <motion.div
                        key={activeImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={model.images[activeImage]}
                          alt={`${getModelName()} - Image ${activeImage + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={activeImage === 0}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hotspots on first image */}
                  {activeImage === 0 && modelHotspots && modelHotspots.length > 0 &&
                    modelHotspots.map((spot, i) => (
                      <motion.button
                        key={i}
                        className="absolute z-20 touch-none"
                        style={{ 
                          left: `clamp(5%, ${spot.x}%, 90%)`, 
                          top: `clamp(5%, ${spot.y}%, 85%)`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setActiveHotspot(activeHotspot === i ? null : i)
                        }}
                      >
                        <motion.div
                          className={`w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors shadow-lg ${
                            activeHotspot === i
                              ? "bg-accent text-accent-foreground"
                              : "bg-background/90 text-foreground border-2 border-accent/50"
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          animate={activeHotspot === i ? {} : { scale: [1, 1.2, 1] }}
                          transition={activeHotspot === i ? {} : { duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {activeHotspot === i ? <X className="w-5 h-5 md:w-4 md:h-4" /> : <Plus className="w-5 h-5 md:w-4 md:h-4" />}
                        </motion.div>
                      </motion.button>
                    ))}

                  {/* Hotspot info popup */}
                  <AnimatePresence>
                    {activeHotspot !== null && activeImage === 0 && modelHotspots && modelHotspots[activeHotspot] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-30 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border max-w-[280px] md:max-w-xs mx-2 md:mx-0"
                        style={{
                          left: `clamp(10px, ${Math.min(modelHotspots[activeHotspot].x || 50, 60)}%, calc(100% - 280px))`,
                          top: `clamp(10px, ${(modelHotspots[activeHotspot].y || 50) + 8}%, calc(100% - 150px))`,
                        }}
                      >
                        <h4 className="font-semibold mb-1 text-sm md:text-base">
                          {getHotspotTitle(modelHotspots[activeHotspot])}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {getHotspotDesc(modelHotspots[activeHotspot])}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Thumbnails - Modern Grid */}
                {model.images.length > 1 && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-3">
                      {model.images.slice(0, 7).map((img, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveImage(i)
                            setActiveHotspot(null)
                          }}
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 ${
                            activeImage === i 
                              ? "ring-2 ring-accent shadow-lg shadow-accent/25" 
                              : "opacity-80 hover:opacity-100 hover:shadow-lg"
                          }`}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.button>
                      ))}
                      
                      {/* Show More Button */}
                      {model.images.length > 7 && (
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setIsGalleryOpen(true)
                            setGalleryCategory('all')
                            setGalleryActiveImage(7)
                          }}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/40 backdrop-blur-sm border border-accent/30 flex flex-col items-center justify-center text-accent hover:from-accent/30 hover:to-accent/50 transition-all duration-300"
                        >
                          <Plus className="w-6 h-6 mb-1" />
                          <span className="text-xs font-medium">+{model.images.length - 7}</span>
                        </motion.button>
                      )}
                    </div>
                    
                    {/* Second Row - if we have exactly 8 images */}
                    {model.images.length === 8 && (
                      <div className="grid grid-cols-4 gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveImage(7)
                            setActiveHotspot(null)
                          }}
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 ${
                            activeImage === 7 
                              ? "ring-2 ring-accent shadow-lg shadow-accent/25" 
                              : "opacity-80 hover:opacity-100 hover:shadow-lg"
                          }`}
                        >
                          <Image
                            src={model.images[7] || "/placeholder.svg"}
                            alt="Thumbnail 8"
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Gallery Button */}
                {model.images.length > 1 && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsGalleryOpen(true)
                        setGalleryCategory('all')
                        setGalleryActiveImage(activeImage)
                      }}
                      className="w-full mt-6 gap-3 h-12 rounded-xl bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20 hover:from-accent/10 hover:to-accent/20 hover:border-accent/30 transition-all duration-300"
                    >
                      <Maximize2 className="w-5 h-5" />
                      <span className="font-medium">
                        {t("models.viewAllPhotos") || `Galeriyi Aç (${model.images.length} Fotoğraf)`}
                      </span>
                    </Button>
                  </motion.div>
                )}
              </div>
            </RevealAnimation>

            {/* Details */}
            <RevealAnimation delay={0.2}>
              <div>
                <span className="text-sm font-medium tracking-widest uppercase text-accent mb-2 block">
                  {getModelTagline()}
                </span>
                <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6">{getModelName()}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{getModelDescription()}</p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <Maximize2 className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-semibold">{model.specs.sqm}</div>
                    <div className="text-xs text-muted-foreground">m²</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <Users className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-semibold">{model.specs.capacity}</div>
                    <div className="text-xs text-muted-foreground">{t("specs.capacity")}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <Bed className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-semibold">{model.specs.bedrooms}</div>
                    <div className="text-xs text-muted-foreground">{t("specs.bedrooms")}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <Leaf className="w-5 h-5 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-semibold">{model.specs.eco}</div>
                    <div className="text-xs text-muted-foreground">{t("specs.ecoRating")}</div>
                  </div>
                </div>

                {/* Features */}
                {getFeatures().length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">{t("specs.features")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {getFeatures().map((feature, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-accent/10 text-accent"
                        >
                          <Check className="w-3.5 h-3.5" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Message */}
                <div className="mb-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("models.contactForInfo") || "Beğendiğiniz model hakkında detaylı bilgi almak için bizimle iletişime geçin. Size özel fiyat teklifi ve detaylı bilgi sunmaktan mutluluk duyarız."}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <MagneticButton>
                    <Link href={`/models/${model.slug}/explore`}>
                      <Button size="lg" className="rounded-full px-8 gap-2 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70">
                        <Eye className="w-4 h-4" />
                        {language === 'tr' ? 'İmmersive Keşif' : 'Immersive Explore'}
                      </Button>
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="rounded-full px-8 gap-2 bg-transparent">
                        {t("models.requestQuote")}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
                        {t("nav.bookTour")}
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Full Screen Gallery Modal - Masaüstü ve Mobil için farklı tasarım */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 ${bgColor} backdrop-blur-sm overflow-hidden`}
            onClick={(e) => {
              if (!categoryMenuOpen) {
                setIsGalleryOpen(false)
              }
            }}
          >
            {/* Masaüstü Layout */}
            <div className="hidden md:flex h-full">
              {/* Sol Panel - Kategori Menüsü */}
              <div className={`w-80 ${panelBgColor} backdrop-blur-md ${borderColor} border-r flex flex-col overflow-hidden`}>
                {/* Header */}
                <div className={`p-6 ${borderColor} border-b`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`${textColor} font-semibold text-xl`}>
                      {getModelName()}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsGalleryOpen(false)}
                      className={`p-2 rounded-full ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} transition-colors`}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  {/* Kategori Butonları */}
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCategoryChange('all')
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        galleryCategory === 'all' 
                          ? `${activeBgColor} ${textColor} border ${isDark ? 'border-white/30' : 'border-gray-300'}` 
                          : `${isDark ? 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border-white/10' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200'} border ${hoverBgColor}`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Tüm Fotoğraflar</span>
                        <span className={`text-sm ${overlayBgColor} px-2 py-1 rounded-full ${textColor}`}>{all.length}</span>
                      </div>
                    </motion.button>
                    
                    {exterior.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCategoryChange('exterior')
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          galleryCategory === 'exterior' 
                            ? `${activeBgColor} ${textColor} border ${isDark ? 'border-white/30' : 'border-gray-300'}` 
                            : `${isDark ? 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border-white/10' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200'} border ${hoverBgColor}`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Dış Mekan</span>
                          <span className={`text-sm ${overlayBgColor} px-2 py-1 rounded-full ${textColor}`}>{exterior.length}</span>
                        </div>
                      </motion.button>
                    )}
                    
                    {interior.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCategoryChange('interior')
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          galleryCategory === 'interior' 
                            ? `${activeBgColor} ${textColor} border ${isDark ? 'border-white/30' : 'border-gray-300'}` 
                            : `${isDark ? 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border-white/10' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200'} border ${hoverBgColor}`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">İç Mekan</span>
                          <span className={`text-sm ${overlayBgColor} px-2 py-1 rounded-full ${textColor}`}>{interior.length}</span>
                        </div>
                      </motion.button>
                    )}
                  </div>
                </div>
                
                {/* Kategori Bilgisi */}
                <div className="p-6">
                  <div className={`${textMutedLightColor} text-sm`}>
                    <p className="mb-2">Seçili Kategori:</p>
                    <p className={`${textColor} font-medium`}>
                      {galleryCategory === 'all' ? 'Tüm Fotoğraflar' : 
                       galleryCategory === 'exterior' ? 'Dış Mekan Fotoğrafları' : 
                       'İç Mekan Fotoğrafları'}
                    </p>
                    <p className={`${textMutedLightColor} text-xs mt-1`}>
                      {currentGalleryImages.length} fotoğraf
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Sağ Panel - Fotoğraf Grid */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{ maxHeight: '100vh' }}>
                <motion.div 
                  layout
                  className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {currentGalleryImages.map((img, i) => (
                      <motion.div
                        key={`${galleryCategory}-${i}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: i * 0.01 }}
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setGalleryActiveImage(i)
                          setReturnToGallery(true)
                          setIsGalleryOpen(false)
                          setIsLightboxOpen(true)
                        }}
                      >
                        <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm aspect-[4/3] border border-white/10 hover:border-white/30 transition-all duration-300">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`${getModelName()} - ${i + 1}`}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-105"
                            sizes="(max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                              >
                                <Maximize2 className="w-5 h-5 text-white" />
                              </motion.div>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="flex items-center justify-center">
                                <span className="text-xs font-medium bg-black/50 px-2 py-1 rounded-full text-white">
                                  {i + 1} / {currentGalleryImages.length}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                
                {/* Empty State - Masaüstü */}
                {currentGalleryImages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col items-center justify-center h-64 ${textMutedLightColor}`}
                  >
                    <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <p className={`text-lg font-medium mb-2 ${textColor}`}>Bu kategoride fotoğraf bulunamadı</p>
                    <p className="text-sm">Başka bir kategori seçmeyi deneyin</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Mobil Layout */}
            <div className="md:hidden h-full flex flex-col">
              {/* Kompakt Header */}
              <div className={`${panelBgColor} backdrop-blur-md ${borderColor} border-b relative z-[55]`}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <h3 className={`${textColor} font-semibold text-lg`}>
                      {getModelName()}
                    </h3>
                    
                    {/* Kategori Dropdown Menüsü */}
                    <div className="relative z-[60]">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCategoryMenuOpen(!categoryMenuOpen)
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/10 text-white hover:bg-white/20 border-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-200'} backdrop-blur-sm transition-all border`}
                      >
                        <span className="text-sm font-medium">
                          {galleryCategory === 'all' ? `Tümü (${all.length})` : 
                           galleryCategory === 'exterior' ? `Dış Mekan (${exterior.length})` : 
                           `İç Mekan (${interior.length})`}
                        </span>
                        <motion.div
                          animate={{ rotate: categoryMenuOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </motion.button>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {categoryMenuOpen && (
                          <>
                            {/* Backdrop */}
                            <div 
                              className="fixed inset-0 z-[58]" 
                              onClick={() => setCategoryMenuOpen(false)}
                            />
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className={`absolute top-full left-0 mt-2 min-w-[200px] ${panelBgColor} backdrop-blur-md rounded-xl ${borderColor} border shadow-2xl overflow-hidden z-[60]`}
                            >
                            <motion.button
                              whileHover={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCategoryChange('all')
                                setCategoryMenuOpen(false)
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                                galleryCategory === 'all' ? `${textColor} ${activeBgColor}` : `${textMutedColor} ${hoverBgColor}`
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>Tüm Fotoğraflar</span>
                                <span className={`text-xs ${overlayBgColor} px-2 py-1 rounded-full ${textColor}`}>{all.length}</span>
                              </div>
                            </motion.button>
                            
                            {exterior.length > 0 && (
                              <motion.button
                                whileHover={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCategoryChange('exterior')
                                  setCategoryMenuOpen(false)
                                }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors ${borderColor} border-t ${
                                  galleryCategory === 'exterior' ? `${textColor} ${activeBgColor}` : `${textMutedColor} ${hoverBgColor}`
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>Dış Mekan</span>
                                  <span className={`text-xs ${overlayBgColor} px-2 py-1 rounded-full ${textColor}`}>{exterior.length}</span>
                                </div>
                              </motion.button>
                            )}
                            
                            {interior.length > 0 && (
                              <motion.button
                                whileHover={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCategoryChange('interior')
                                  setCategoryMenuOpen(false)
                                }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors ${borderColor} border-t ${
                                  galleryCategory === 'interior' ? `${textColor} ${activeBgColor}` : `${textMutedColor} ${hoverBgColor}`
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>İç Mekan</span>
                                  <span className={`text-xs ${overlayBgColor} px-2 py-1 rounded-full ${textColor}`}>{interior.length}</span>
                                </div>
                              </motion.button>
                            )}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsGalleryOpen(false)
                      setCategoryMenuOpen(false)
                    }}
                    className={`p-3 rounded-full ${isDark ? 'bg-white/10 text-white hover:bg-white/20 border-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-200'} backdrop-blur-sm transition-colors border`}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
              
              {/* Mobil Gallery Grid */}
              <div className={`flex-1 overflow-y-auto p-4 ${categoryMenuOpen ? 'relative z-10' : 'relative z-20'}`}>
                <motion.div 
                  layout
                  className="grid grid-cols-2 gap-3"
                >
                  <AnimatePresence mode="popLayout">
                    {currentGalleryImages.map((img, i) => (
                      <motion.div
                        key={`${galleryCategory}-${i}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: i * 0.02 }}
                        className="group cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setGalleryActiveImage(i)
                          setReturnToGallery(true)
                          setIsGalleryOpen(false)
                          setIsLightboxOpen(true)
                        }}
                      >
                        <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm aspect-[4/3] border border-white/10 hover:border-white/30 transition-all duration-300">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`${getModelName()} - ${i + 1}`}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-105"
                            sizes="50vw"
                          />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                              >
                                <Maximize2 className="w-5 h-5 text-white" />
                              </motion.div>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="flex items-center justify-center">
                                <span className="text-xs font-medium bg-black/50 px-2 py-1 rounded-full text-white">
                                  {i + 1} / {currentGalleryImages.length}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                
                {/* Empty State - Mobil */}
                {currentGalleryImages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col items-center justify-center h-64 ${textMutedLightColor}`}
                  >
                    <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <p className={`text-lg font-medium mb-2 ${textColor}`}>Bu kategoride fotoğraf bulunamadı</p>
                    <p className="text-sm">Başka bir kategori seçmeyi deneyin</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Single Image */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/98 flex items-center justify-center overflow-hidden"
            onClick={() => {
              setIsLightboxOpen(false)
              if (returnToGallery) {
                setIsGalleryOpen(true)
                setReturnToGallery(false)
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="relative max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentGalleryImages[galleryActiveImage] || "/placeholder.svg"}
                alt={`${getModelName()} - Büyük Görünüm`}
                width={1200}
                height={800}
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                sizes="95vw"
              />
              
              {/* Navigation */}
              {currentGalleryImages.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGalleryActiveImage(galleryActiveImage > 0 ? galleryActiveImage - 1 : currentGalleryImages.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGalleryActiveImage(galleryActiveImage < currentGalleryImages.length - 1 ? galleryActiveImage + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}
              
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsLightboxOpen(false)
                  if (returnToGallery) {
                    setIsGalleryOpen(true)
                    setReturnToGallery(false)
                  }
                }}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </motion.button>
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white">
                  <span className="text-sm font-medium">
                    {galleryActiveImage + 1} / {currentGalleryImages.length}
                  </span>
                  <span className="text-white/60">•</span>
                  <span className="text-sm">
                    {galleryCategory === 'exterior' ? 'Dış Mekan' : galleryCategory === 'interior' ? 'İç Mekan' : 'Tüm Fotoğraflar'}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation between models */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {prevModel ? (
              <Link
                href={`/models/${prevModel.slug}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("common.previous")}</div>
                  <div className="text-lg font-serif">{language === 'tr' ? prevModel.name_tr : prevModel.name_en}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextModel ? (
              <Link
                href={`/models/${nextModel.slug}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group text-end"
              >
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("common.next")}</div>
                  <div className="text-lg font-serif">{language === 'tr' ? nextModel.name_tr : nextModel.name_en}</div>
                </div>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
