'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'magic'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const supabase = createClient()

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      router.push(redirect)
      router.refresh()
    }
  }

  const handleMagicLink = async () => {
    if (!email) { setStatus('error'); setErrorMsg('Enter your email first'); return }
    setStatus('loading')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('magic')
    }
  }

  if (status === 'magic') {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✉️</div>
        <h2 className="font-semibold text-gray-900 mb-2">Check your email</h2>
        <p className="text-gray-500 text-sm">We sent a magic link to <strong>{email}</strong></p>
      </div>
    )
  }

  return (
    <form onSubmit={handleEmailPassword} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]"
          placeholder="agent@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]"
          placeholder="Your password"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Signing in…' : 'Sign In'}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
        <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">or</div>
      </div>

      <button
        type="button"
        onClick={handleMagicLink}
        disabled={status === 'loading'}
        className="w-full py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors text-sm disabled:opacity-50"
      >
        Send Magic Link
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/" className="inline-block text-2xl font-bold text-[#0F5AE5]">CasaFinder</a>
          <h1 className="text-xl font-semibold text-gray-900 mt-4">Agent Login</h1>
          <p className="text-gray-500 text-sm mt-1">Access your dashboard to manage listings and leads.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <Suspense fallback={<div className="text-center text-gray-400">Loading…</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-[13px] text-[#7A8494] mt-5">
          New to CasaFinder?{' '}
          <Link href="/signup" className="text-[#0F5AE5] font-medium hover:underline">
            Create a free agent account
          </Link>
        </p>
      </div>
    </main>
  )
}
