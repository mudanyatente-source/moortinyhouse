'use client'

import { BarChart3, TrendingUp, Eye, Users } from 'lucide-react'
import { motion } from 'framer-motion'

type AnalyticsPanelProps = {
  analytics: any[]
}

export default function AnalyticsPanel({ analytics }: AnalyticsPanelProps) {
  // Group analytics by page path
  const pageStats = analytics.reduce(
    (acc, item) => {
      const path = item.page_path || '/'
      if (!acc[path]) {
        acc[path] = { path, count: 0, lastSeen: item.created_at }
      }
      acc[path].count += 1
      acc[path].lastSeen = new Date(item.created_at) > new Date(acc[path].lastSeen) 
        ? item.created_at 
        : acc[path].lastSeen
      return acc
    },
    {} as Record<string, { path: string; count: number; lastSeen: string }>,
  )

  const totalViews = analytics.length
  const uniquePages = Object.keys(pageStats).length
  const uniqueSessions = new Set(analytics.map((item) => item.session_id)).size

  const stats = [
    { label: 'Total Page Views', value: totalViews, icon: Eye, color: 'text-blue-500' },
    { label: 'Unique Pages', value: uniquePages, icon: Users, color: 'text-green-500' },
    { label: 'Unique Sessions', value: uniqueSessions, icon: TrendingUp, color: 'text-purple-500' },
    { label: 'Analytics Records', value: analytics.length, icon: BarChart3, color: 'text-orange-500' },
  ]

  const topPages = Object.values(pageStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-medium mb-2">Analytics</h1>
        <p className="text-muted-foreground">Website performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <div className={`w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-semibold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-semibold mb-4">Top Pages</h3>
        {topPages.length > 0 ? (
          <div className="space-y-2">
            {topPages.map((item) => (
              <div key={item.path} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm">{item.path || '/'}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.lastSeen).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.count} views
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">No analytics data available</p>
        )}
      </div>
    </div>
  )
}
