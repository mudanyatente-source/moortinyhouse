'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {
              // ignore
            }
          },
        },
      },
    );

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@moortinyhouse.com',
      password: 'admin123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User',
      },
    });

    if (authError) {
      return Response.json({ error: authError.message }, { status: 400 });
    }

    // Create admin_users entry
    const { error: dbError } = await supabase
      .from('admin_users')
      .insert({
        id: authData.user.id,
        email: 'admin@moortinyhouse.com',
      });

    if (dbError) {
      return Response.json({ error: dbError.message }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: 'Admin user created successfully',
      email: 'admin@moortinyhouse.com',
      password: 'admin123456',
    });
  } catch (error) {
    console.error('[v0] Error creating admin user:', error);
    return Response.json(
      { error: 'Failed to create admin user' },
      { status: 500 },
    );
  }
}
