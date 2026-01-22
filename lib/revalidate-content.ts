/**
 * Admin panelinden görsel/içerik güncellemesi yapıldığında 
 * Vercel cache'ini temizler ve sayfaları revalidate eder
 */

export async function revalidateContent(paths: string[] = ['/', '/portfolio', '/gallery', '/models', '/admin']) {
  try {
    const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET || process.env.REVALIDATE_SECRET
    if (!secret) {
      console.warn('[Revalidate] REVALIDATE_SECRET env not set')
      return false
    }

    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secret}`
      },
      body: JSON.stringify({ path: '/' })
    })

    if (!response.ok) {
      console.error('[Revalidate] Error:', response.status, response.statusText)
      return false
    }

    console.log('[Revalidate] Success:', await response.json())
    return true
  } catch (error) {
    console.error('[Revalidate] Exception:', error)
    // Hata olsa bile, işlem devam etsin
    return false
  }
}

/**
 * Admin paneldeki save işlemlerini sarmalayan helper
 * Database işleminden sonra otomatik revalidation yapar
 */
export async function withRevalidation<T>(
  operation: () => Promise<T>,
  paths?: string[]
): Promise<T> {
  const result = await operation()
  // Background'da revalidation başlat (await etme)
  revalidateContent(paths).catch(err => console.error('[Revalidation Background Error]:', err))
  return result
}
