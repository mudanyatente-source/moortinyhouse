'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  TrendingUp,
  Calendar,
  Star,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  X,
  BookOpen,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'

type DashboardOverviewProps = {
  contactMessages: any[]
  models: any[]
  testimonials: any[]
  portfolioProjects: any[]
  analytics: any[]
  onNavigate?: (tab: string) => void
}

export default function DashboardOverview({
  contactMessages,
  models,
  testimonials,
  portfolioProjects,
  analytics,
  onNavigate
}: DashboardOverviewProps) {
  const router = useRouter()
  const [showHelp, setShowHelp] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('admin-help-dismissed')
    }
    return true
  })

  const dismissHelp = () => {
    setShowHelp(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-help-dismissed', 'true')
    }
  }

  // Calculate stats
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  
  const totalMessages = contactMessages.length
  const newThisWeek = contactMessages.filter(m => new Date(m.created_at) > oneWeekAgo).length
  const respondedMessages = contactMessages.filter(m => m.status === 'responded').length
  const pendingMessages = contactMessages.filter(m => m.status === 'pending').length
  
  const stats = [
    {
      label: 'Toplam Mesaj',
      value: totalMessages,
      icon: MessageSquare,
      change: `${newThisWeek} yeni`,
      color: 'text-blue-500'
    },
    {
      label: 'Bu Hafta Yeni',
      value: newThisWeek,
      icon: TrendingUp,
      change: `${Math.round((newThisWeek / (totalMessages || 1)) * 100)}% toplam`,
      color: 'text-green-500'
    },
    {
      label: 'Aktif Modeller',
      value: models.filter(m => m.is_visible).length,
      icon: Calendar,
      change: `${models.length} toplam`,
      color: 'text-purple-500'
    },
    {
      label: 'Referanslar',
      value: testimonials.filter(t => t.is_visible).length,
      icon: Star,
      change: `${testimonials.length} toplam`,
      color: 'text-yellow-500'
    },
  ]

  // Get model inquiries count
  const modelInquiries = contactMessages.reduce((acc: any, msg: any) => {
    if (msg.interested_model) {
      acc[msg.interested_model] = (acc[msg.interested_model] || 0) + 1
    }
    return acc
  }, {})

  const popularModels = Object.entries(modelInquiries)
    .map(([name, count]) => ({
      name,
      inquiries: count as number,
      percentage: Math.round(((count as number) / totalMessages) * 100)
    }))
    .sort((a, b) => b.inquiries - a.inquiries)
    .slice(0, 5)

  const recentMessages = contactMessages.slice(0, 5)

  const workload = useMemo(() => {
    const pendingTestimonials = testimonials.filter((t) => !t.is_visible).length
    const hiddenModels = models.filter((m) => !m.is_visible).length
    const archivedMessages = contactMessages.filter((m) => m.status === 'archived').length
    return [
      {
        title: 'Bekleyen mesaj',
        value: pendingMessages,
        hint: 'Yanıt bekleyenler için hızlı aksiyon',
        status: pendingMessages > 0 ? 'alert' : 'ok',
        action: () => onNavigate?.('messages') || router.push('/admin#messages')
      },
      {
        title: 'Onay bekleyen referans',
        value: pendingTestimonials,
        hint: 'Gizli referansları yayına al',
        status: pendingTestimonials > 0 ? 'alert' : 'ok',
        action: () => onNavigate?.('testimonials') || router.push('/admin#testimonials')
      },
      {
        title: 'Gizli model',
        value: hiddenModels,
        hint: 'Gizli modelleri kontrol et',
        status: hiddenModels > 0 ? 'warn' : 'ok',
        action: () => onNavigate?.('models') || router.push('/admin#models')
      },
      {
        title: 'Arşivlenmiş mesaj',
        value: archivedMessages,
        hint: 'Gereksizleri temizle',
        status: 'muted',
        action: () => onNavigate?.('messages') || router.push('/admin#messages')
      },
    ]
  }, [contactMessages, models, onNavigate, pendingMessages, router, testimonials])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-medium mb-2">Genel Bakış</h1>
        <p className="text-muted-foreground">Admin paneline hoş geldiniz</p>
      </div>

      {/* Help Card */}
      {showHelp && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 relative"
        >
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 h-8 w-8 p-0"
            onClick={dismissHelp}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-1">Admin Paneline Hoş Geldiniz! 👋</h3>
                <p className="text-sm text-muted-foreground">
                  Bu panelden web sitenizin tüm içeriğini kolayca yönetebilirsiniz. İşte hızlı bir rehber:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">İletişim Mesajları</p>
                    <p className="text-xs text-muted-foreground">Müşterilerden gelen mesajları görüntüleyin ve yanıtlayın</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Modeller</p>
                    <p className="text-xs text-muted-foreground">Tiny house modellerinizi ekleyin, düzenleyin veya gizleyin</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Referanslar</p>
                    <p className="text-xs text-muted-foreground">Müşteri yorumlarını yönetin ve onaylayın</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Portföy</p>
                    <p className="text-xs text-muted-foreground">Tamamlanan projelerinizi ekleyin ve sergileyin</p>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                <p className="text-xs text-muted-foreground">
                  <strong>İpucu:</strong> Her form alanının yanındaki <HelpCircle className="w-3 h-3 inline" /> simgesine tıklayarak o alan hakkında daha fazla bilgi alabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-muted-foreground">{stat.change}</span>
            </div>
            <div className="text-3xl font-semibold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Models */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold mb-6">En Çok İlgilenilen Modeller</h3>
          <div className="space-y-4">
            {popularModels.length > 0 ? (
              popularModels.map((model) => (
                <div key={model.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{model.name}</span>
                    <span className="text-muted-foreground">{model.inquiries} talep</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${model.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Henüz model talebi yok</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Son Mesajlar</h3>
            <Button variant="ghost" size="sm" className="text-accent">
              Tümünü Gör
            </Button>
          </div>
          <div className="space-y-4">
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                      {message.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{message.name || 'Anonymous'}</div>
                      <div className="text-xs text-muted-foreground">{message.inquiry_type || 'general'}</div>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      message.status === 'pending'
                        ? 'bg-yellow-500/10 text-yellow-600'
                        : 'bg-green-500/10 text-green-600'
                    }`}
                  >
                    {message.status || 'pending'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Henüz mesaj yok</p>
            )}
          </div>
        </div>
      </div>

      {/* Workload / to-dos */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Operasyon listesi</p>
            <h3 className="text-lg font-semibold">Öncelikler</h3>
          </div>
          <Card className="px-3 py-1 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Akıllı öneriler
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {workload.map((item) => (
            <button
              key={item.title}
              onClick={item.action}
              className="text-left border border-border rounded-xl p-4 hover:border-accent/60 hover:-translate-y-0.5 transition-all bg-secondary/20"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold">{item.title}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'alert'
                      ? 'bg-red-500/10 text-red-600'
                      : item.status === 'warn'
                        ? 'bg-amber-500/10 text-amber-600'
                        : 'bg-emerald-500/10 text-emerald-600'
                  }`}
                >
                  {item.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{item.hint}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-semibold mb-4">Hızlı İşlemler</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="justify-start gap-2 bg-transparent" 
            variant="outline"
            onClick={() => onNavigate ? onNavigate('messages') : router.push('/admin#messages')}
          >
            <MessageSquare className="w-4 h-4" />
            Bekleyen Mesajları Gör ({pendingMessages})
          </Button>
          <Button 
            className="justify-start gap-2 bg-transparent" 
            variant="outline"
            onClick={() => onNavigate ? onNavigate('testimonials') : router.push('/admin#testimonials')}
          >
            <Star className="w-4 h-4" />
            Referansları Onayla
          </Button>
          <Button 
            className="justify-start gap-2 bg-transparent" 
            variant="outline"
            onClick={() => window.open('/', '_blank')}
          >
            <Eye className="w-4 h-4" />
            Siteyi Önizle
          </Button>
        </div>
      </div>
    </div>
  )
}
