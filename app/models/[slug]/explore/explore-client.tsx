'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowLeft, Maximize2, Users, Leaf, ChevronDown } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

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
}

interface ExploreClientProps {
  model: Model
}

export default function ExploreClient({ model }: ExploreClientProps) {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const isDark = theme === 'dark'
  
  // Categorize images
  const exteriorImages = model.images.filter(img => {
    const imgPath = img.toLowerCase()
    
    // Beverly için klasör yapısına göre
    if (model.slug === 'beverly') {
      return imgPath.includes('/dış/') || imgPath.includes('/dis/') || imgPath.includes('exterior')
    }
    
    // Orion için - henüz alt klasör yok, ilk yarısını exterior sayalım
    if (model.slug === 'orion') {
      const index = model.images.indexOf(img)
      return index < Math.ceil(model.images.length / 2) || 
             imgPath.includes('orion.webp') || 
             imgPath.includes('gemini_generated')
    }
    
    // Genel durum
    return imgPath.includes('/dış/') || imgPath.includes('/dis/') || imgPath.includes('exterior')
  })
  
  const interiorImages = model.images.filter(img => {
    const imgPath = img.toLowerCase()
    
    // Beverly için klasör yapısına göre
    if (model.slug === 'beverly') {
      return imgPath.includes('/iç/') || imgPath.includes('/ic/') || imgPath.includes('interior')
    }
    
    // Orion için - ikinci yarısını interior sayalım
    if (model.slug === 'orion') {
      const index = model.images.indexOf(img)
      return index >= Math.ceil(model.images.length / 2) && 
             !imgPath.includes('orion.webp') && 
             !imgPath.includes('gemini_generated')
    }
    
    // Genel durum
    return imgPath.includes('/iç/') || imgPath.includes('/ic/') || imgPath.includes('interior') || 
           (!imgPath.includes('/dış/') && !imgPath.includes('/dis/') && !imgPath.includes('exterior'))
  })

  const getModelName = () => language === 'tr' ? model.name_tr : model.name_en
  const getModelDescription = () => language === 'tr' ? model.description_tr : model.description_en

  // Scroll sections
  const sections = [
    {
      id: 'hero',
      title: language === 'tr' ? 'Hoş Geldiniz' : 'Welcome',
      subtitle: getModelName(),
      description: getModelDescription(),
      images: exteriorImages.length > 0 ? exteriorImages.slice(0, 1) : (model.images.length > 0 ? [model.images[0]] : []),
      showSpecs: true
    },
    {
      id: 'exterior',
      title: language === 'tr' ? 'Dış Görünüm' : 'Exterior View',
      subtitle: language === 'tr' ? 'Mimari Detaylar' : 'Architectural Details',
      description: language === 'tr' ? 'Modern tasarım ve doğal malzemeler' : 'Modern design and natural materials',
      images: exteriorImages.length > 1 ? exteriorImages.slice(1, 4) : exteriorImages.slice(0, Math.min(3, exteriorImages.length))
    },
    {
      id: 'interior',
      title: language === 'tr' ? 'İç Mekan' : 'Interior',
      subtitle: language === 'tr' ? 'Yaşam Alanları' : 'Living Spaces',
      description: language === 'tr' ? 'Konforlu ve fonksiyonel iç tasarım' : 'Comfortable and functional interior design',
      images: interiorImages.slice(0, Math.min(3, interiorImages.length))
    },
    {
      id: 'details',
      title: language === 'tr' ? 'Detaylar' : 'Details',
      subtitle: language === 'tr' ? 'Kalite ve Zanaat' : 'Quality and Craftsmanship',
      description: language === 'tr' ? 'Her detayda mükemmellik' : 'Perfection in every detail',
      images: [
        ...exteriorImages.slice(-1),
        ...interiorImages.slice(-2)
      ].filter(Boolean).slice(0, 3) // En fazla 3 görsel, boş olanları filtrele
    }
  ].filter(section => section.images.length > 0) // Sadece görseli olan section'ları dahil et

  // Scroll to next section
  const scrollToNext = () => {
    if (containerRef.current && currentSection < sections.length - 1) {
      const nextSection = currentSection + 1
      const sectionHeight = window.innerHeight
      containerRef.current.scrollTo({
        top: sectionHeight * nextSection,
        behavior: 'smooth'
      })
    }
  }

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop
        const sectionHeight = window.innerHeight
        const newSection = Math.floor(scrollTop / sectionHeight)
        setCurrentSection(Math.min(newSection, sections.length - 1))
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [sections.length])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation />
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href={`/models/${model.slug}`}>
          <Button
            variant="outline"
            size="sm"
            className={`rounded-full ${isDark ? 'bg-black/80 border-white/20 text-white hover:bg-black/90' : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-white/90'} backdrop-blur-md`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'tr' ? 'Geri' : 'Back'}
          </Button>
        </Link>
      </div>

      {/* Progress Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 space-y-3">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-8 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? isDark ? 'bg-white' : 'bg-gray-900'
                : isDark ? 'bg-white/30' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {sections.map((section, index) => (
          <Section
            key={section.id}
            section={section}
            model={model}
            isActive={currentSection === index}
            isLast={index === sections.length - 1}
            onNext={scrollToNext}
            isDark={isDark}
            language={language}
          />
        ))}
      </div>
    </div>
  )
}

// Individual section component
function Section({ 
  section, 
  model, 
  isActive, 
  isLast, 
  onNext, 
  isDark, 
  language 
}: { 
  section: {
    id: string
    title: string
    subtitle: string
    description: string
    images: string[]
    showSpecs?: boolean
  }
  model: Model
  isActive: boolean
  isLast: boolean
  onNext: () => void
  isDark: boolean
  language: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.3 })
  const [imageIndex, setImageIndex] = useState(0)

  // Auto-change images
  useEffect(() => {
    if (isActive && section.images.length > 1) {
      const interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % section.images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isActive, section.images.length])

  // Reset image index when section changes
  useEffect(() => {
    if (section.images.length > 0) {
      setImageIndex(0)
    }
  }, [section.id, section.images.length])

  return (
    <div
      ref={ref}
      className="relative h-screen flex items-center justify-center snap-start overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {section.images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${section.id}-${imageIndex}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <Image
                src={section.images[imageIndex]}
                alt={`${section.title} - ${imageIndex + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={section.id === 'hero'}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
        )}
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black/60 via-black/40 to-black/60' : 'bg-gradient-to-b from-white/60 via-white/40 to-white/60'}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {section.title}
          </h1>

          <p className={`text-xl md:text-2xl mb-4 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
            {section.subtitle}
          </p>

          <p className={`text-lg mb-8 ${isDark ? 'text-white/70' : 'text-gray-600'} max-w-2xl mx-auto`}>
            {section.description}
          </p>

          {/* Hero Section Specs */}
          {section.showSpecs && (
            <div className="flex justify-center gap-6 flex-wrap mb-8">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-900/10'} backdrop-blur-sm`}>
                <Maximize2 className="w-5 h-5" />
                <span className="font-medium">{model.specs.sqm} m²</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-900/10'} backdrop-blur-sm`}>
                <Users className="w-5 h-5" />
                <span className="font-medium">{model.specs.capacity}</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-900/10'} backdrop-blur-sm`}>
                <Leaf className="w-5 h-5" />
                <span className="font-medium">{model.specs.eco}</span>
              </div>
            </div>
          )}

          {/* Image Indicators */}
          {section.images.length > 1 && (
            <div className="flex justify-center gap-2 mb-8">
              {section.images.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    imageIndex === index 
                      ? isDark ? 'bg-white' : 'bg-gray-900'
                      : isDark ? 'bg-white/30' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Next Section Button */}
          {!isLast && (
            <motion.button
              onClick={onNext}
              className={`flex flex-col items-center gap-2 mx-auto ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm">
                {language === 'tr' ? 'Devam Et' : 'Continue'}
              </span>
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          )}

          {/* Contact CTA on last section */}
          {isLast && (
            <div className="space-y-4">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                >
                  {language === 'tr' ? 'İletişime Geç' : 'Get in Touch'}
                </Button>
              </Link>
              <div>
                <Link href={`/models/${model.slug}`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    {language === 'tr' ? 'Detay Sayfasına Dön' : 'Back to Details'}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}