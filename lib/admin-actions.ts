'use server'

import { createServerClient } from './supabase/server'

export async function addAdminUser(userId: string, email: string) {
  try {
    const supabase = await createServerClient()

    // Insert into admin_users table with service role
    const { error } = await supabase
      .from('admin_users')
      .insert({
        id: userId,
        email: email,
      })

    if (error) {
      console.error('[v0] Supabase insert error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    console.error('[v0] Error in addAdminUser:', err)
    return { success: false, error: err.message }
  }
}
