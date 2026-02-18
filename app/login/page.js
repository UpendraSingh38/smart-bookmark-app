'use client'

import { createClient } from '@/lib/supabaseClient'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if a session exists on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard')
    })

    // Listen for auth state changes after redirect
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) router.push('/dashboard')
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
       redirectTo: `${location.origin}/auth/callback`

      }
    })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  )
}
