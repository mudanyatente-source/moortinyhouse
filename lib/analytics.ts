'use server'

import { headers } from 'next/headers'

export async function trackPageView(pagePath: string) {
  try {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''
    const referer = headersList.get('referer') || ''
    const sessionId = headersList.get('x-session-id') || crypto.getRandomValues(new Uint8Array(16)).toString()

    // Send to analytics API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: pagePath,
        referrer: referer,
        userAgent,
        sessionId,
      }),
    })

    if (!response.ok) {
      console.error('[v0] Failed to track page view:', response.statusText)
    }
  } catch (error) {
    console.error('[v0] Error tracking page view:', error)
  }
}
