import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/admin/admin-dashboard'

export default async function AdminPage() {
  const supabase = await createServerClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/auth/login')
  }

  // Check if user is an admin
  const { data: adminData, error: adminError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (adminError || !adminData) {
    redirect('/auth/login')
  }

  // Fetch dashboard data
  const [
    { data: contactMessages, error: messagesError },
    { data: models, error: modelsError },
    { data: testimonials, error: testimonialsError },
    { data: portfolioProjects, error: portfolioError },
    { data: analytics, error: analyticsError }
  ] = await Promise.all([
    supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('models')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('portfolio_projects')
      .select('*')
      .order('completion_date', { ascending: false }),
    supabase
      .from('site_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30)
  ])

  const normalizedMessages = (contactMessages || []).map((msg) => ({
    ...msg,
    status: msg.status || 'pending',
    inquiry_type: msg.inquiry_type || msg.source || 'general',
    preferred_date: msg.preferred_date || msg.preferredDate || null
  }))

  return (
    <AdminDashboard
      user={user}
      contactMessages={normalizedMessages}
      models={models || []}
      testimonials={testimonials || []}
      portfolioProjects={portfolioProjects || []}
      analytics={analytics || []}
    />
  )
}
