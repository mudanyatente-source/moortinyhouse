'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  MessageSquare,
  Box,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  Eye,
  ImageIcon,
  FolderOpen,
  Star,
  Calendar,
  BarChart3,
  Plus,
  Sparkles,
  Search,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { Toaster } from '@/components/ui/toaster'
import DashboardOverview from './dashboard-overview'
import ContactMessagesPanel from './contact-messages-panel'
import ModelsPanel from './models-panel'
import TestimonialsPanel from './testimonials-panel'
import PortfolioPanel from './portfolio-panel'
import AnalyticsPanel from './analytics-panel'
import SettingsPanel from './settings-panel'
import SeoPanel from './seo-panel'
import ContentPanel from './content-panel'
import GalleryPanel from './gallery-panel'

type AdminDashboardProps = {
  user: any
  contactMessages: any[]
  models: any[]
  testimonials: any[]
  portfolioProjects: any[]
  analytics: any[]
}

export default function AdminDashboard({
  user,
  contactMessages: initialMessages,
  models: initialModels,
  testimonials: initialTestimonials,
  portfolioProjects: initialProjects,
  analytics: initialAnalytics
}: AdminDashboardProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const supabase = createBrowserClient()
  const [activeTab, setActiveTab] = useState('overview')
  const [command, setCommand] = useState('')

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Genel Bakış' },
    { id: 'messages', icon: MessageSquare, label: 'İletişim Mesajları' },
    { id: 'models', icon: Box, label: 'Modeller' },
    { id: 'testimonials', icon: Star, label: 'Referanslar' },
    { id: 'portfolio', icon: ImageIcon, label: 'Portföy' },
    { id: 'gallery', icon: ImageIcon, label: 'Galeri' },
    { id: 'analytics', icon: BarChart3, label: 'İstatistikler' },
    { id: 'content', icon: Users, label: 'İçerik' },
    { id: 'settings', icon: Settings, label: 'Ayarlar' },
    { id: 'seo', icon: Globe, label: 'SEO' }
  ]

  const filteredTabs = useMemo(() => {
    if (!command.trim()) return tabs
    return tabs.filter((tab) =>
      tab.label.toLowerCase().includes(command.trim().toLowerCase()) ||
      tab.id.toLowerCase().includes(command.trim().toLowerCase())
    )
  }, [command, tabs])

  const quickActions = [
    {
      id: 'messages',
      label: 'Bekleyen Mesajlar',
      description: 'Son mesajları incele ve durum güncelle',
      icon: MessageSquare,
      emphasis: 'primary'
    },
    {
      id: 'models',
      label: 'Yeni Model Ekle',
      description: 'Kütüphaneye yeni bir model ekle',
      icon: Plus
    },
    {
      id: 'portfolio',
      label: 'Portföy Güncelle',
      description: 'Tamamlanan projelere yeni iş ekle',
      icon: ImageIcon
    },
    {
      id: 'analytics',
      label: 'Performansı Gör',
      description: 'Sayfa görüntülenmelerini ve eğilimleri incele',
      icon: TrendingUp
    }
  ]

  const highlights = [
    { label: 'Mesaj', value: initialMessages.length, icon: MessageSquare },
    { label: 'Model', value: initialModels.length, icon: Box },
    { label: 'Referans', value: initialTestimonials.length, icon: Star },
    { label: 'Portföy', value: initialProjects.length, icon: ImageIcon }
  ]

  const handleCommandJump = (targetId?: string) => {
    const target = targetId || filteredTabs[0]?.id
    if (!target) return
    setActiveTab(target)
    setCommand('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-e border-border p-6 fixed z-20">
          <Link href="/" className="block mb-8">
            <span className="text-2xl font-serif font-semibold">Moortinyhouse</span>
            <p className="text-xs text-muted-foreground mt-1">Admin Paneli</p>
          </Link>

          <nav className="space-y-2">
            {filteredTabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
                {activeTab === item.id && <Sparkles className="w-4 h-4" />}
              </button>
            ))}
            {filteredTabs.length === 0 && (
              <p className="text-xs text-muted-foreground px-2">Sonuç bulunamadı</p>
            )}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <div className="text-sm text-muted-foreground px-2">{user.email}</div>
            <Button
              variant="outline"
              className="w-full rounded-xl gap-2 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 ms-64">
          {/* Top toolbar */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-8 py-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>Hızlı komutlar</span>
              </div>
              <h1 className="text-2xl font-serif font-semibold">Kontrol Merkezi</h1>
              <p className="text-sm text-muted-foreground">İçeriği tek ekrandan yönet</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Sekme ara / geçiş yap"
                  className="pl-9"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleCommandJump()
                    }
                  }}
                />
              </div>
              <Badge variant="outline" className="hidden md:inline-flex">
                {user.email}
              </Badge>
              <Button variant="outline" onClick={() => router.push('/')}>
                Siteyi Gör
              </Button>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="border border-border rounded-xl p-4 bg-card/50 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="bg-card border border-border rounded-2xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Kısayollar</p>
                  <h3 className="text-lg font-semibold">Hızlı işlem merkezi</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleCommandJump()}>
                  İlk sonuca git
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleCommandJump(action.id)}
                    className="text-left border border-border rounded-xl p-4 hover:border-accent/60 hover:-translate-y-0.5 transition-all bg-secondary/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <action.icon className="w-4 h-4 text-accent" />
                      <span className="font-semibold">{action.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <DashboardOverview
                  contactMessages={initialMessages}
                  models={initialModels}
                  testimonials={initialTestimonials}
                  portfolioProjects={initialProjects}
                  analytics={initialAnalytics}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}
              {activeTab === 'messages' && <ContactMessagesPanel messages={initialMessages} />}
              {activeTab === 'models' && <ModelsPanel models={initialModels} />}
              {activeTab === 'testimonials' && <TestimonialsPanel testimonials={initialTestimonials} />}
              {activeTab === 'portfolio' && <PortfolioPanel projects={initialProjects} />}
              {activeTab === 'gallery' && <GalleryPanel />}
              {activeTab === 'analytics' && <AnalyticsPanel analytics={initialAnalytics} />}
              {activeTab === 'content' && <ContentPanel />}
              {activeTab === 'settings' && <SettingsPanel />}
              {activeTab === 'seo' && <SeoPanel />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
