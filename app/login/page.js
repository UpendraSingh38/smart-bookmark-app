'use client'

import { createClient } from '@/lib/supabaseClient'

export default function Login() {
  const login = async () => {
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={login}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  )
}
