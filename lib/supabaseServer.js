import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/auth-helpers-nextjs'

export function createSupabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    { cookies }
  )
}
