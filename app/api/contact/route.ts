import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createServerClient()

    const payload = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      inquiry_type: body.inquiry_type || 'general',
      preferred_date: body.preferred_date || null,
      status: 'pending'
    }

    const attemptInsert = async () => supabase
      .from('contact_messages')
      .insert(payload)
      .select()
      .single()

    let { data, error } = await attemptInsert()

    // Fallback for legacy schema that might not have new columns
    // Examples:
    // - "column <x> does not exist"
    // - PostgREST schema cache errors like PGRST204:
    //   "Could not find the '<x>' column of '<table>' in the schema cache"
    if (
      error &&
      (
        error.code === 'PGRST204' ||
        /column .* does not exist/i.test(error.message) ||
        /could not find the '.*' column of 'contact_messages' in the schema cache/i.test(error.message)
      )
    ) {
      const legacyPayload = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message
      }
      const legacyResult = await supabase
        .from('contact_messages')
        .insert(legacyPayload)
        .select()
        .single()

      data = legacyResult.data
      error = legacyResult.error

      if (data) {
        data = {
          ...data,
          status: payload.status,
          inquiry_type: payload.inquiry_type,
          preferred_date: payload.preferred_date
        }
      }
    }

    if (error) {
      console.error('[v0] Error saving contact message:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('[v0] Error in contact API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
