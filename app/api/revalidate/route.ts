import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Admin panelinden görsel güncellemesi yapıldıktan sonra çağrılacak
// Vercel'de cache'i temizler
export async function POST(request: NextRequest) {
  try {
    const { path = '/' } = await request.json()

    // Admin paneli doğrulama (basit kontrol)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verilen path'ı revalidate et
    revalidatePath(path)
    revalidatePath('/', 'layout')

    return NextResponse.json(
      {
        message: 'Revalidation başarılı',
        path: path,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Revalidate Error]:', error)
    return NextResponse.json(
      { message: 'Revalidation başarısız' },
      { status: 500 }
    )
  }
}
