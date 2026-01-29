import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { path, referrer, userAgent, sessionId } = await request.json()
    const supabase = await createServerClient()

    // Insert analytics record
    const { error } = await supabase
      .from('site_analytics')
      .insert({
        page_path: path,
        referrer: referrer || null,
        user_agent: userAgent || null,
        session_id: sessionId || null,
      })

    if (error) {
      console.error('[v0] Error inserting analytics:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error tracking analytics:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')

    // Get analytics data from last N days
    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() - days)

    const { data, error } = await supabase
      .from('site_analytics')
      .select('*')
      .gte('created_at', dateFrom.toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Group by page path and count
    const summary = data.reduce(
      (acc, record) => {
        const path = record.page_path
        if (!acc[path]) {
          acc[path] = { views: 0, firstSeen: record.created_at }
        }
        acc[path].views += 1
        return acc
      },
      {} as Record<string, { views: number; firstSeen: string }>,
    )

    return NextResponse.json({
      total_records: data.length,
      summary,
      raw_data: data,
    })
  } catch (error) {
    console.error('[v0] Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 },
    )
  }
}
