'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

function SignupForm() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState<'account' | 'profile' | 'done'>('account')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Step 1 fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  // Step 2 fields
  const [fullName, setFullName] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [bio, setBio] = useState('')

  // --- Step 1: create auth user ---
  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (password !== confirm) {
      setErrorMsg('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters')
      return
    }
    setStatus('loading')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('idle')
      setStep('profile')
    }
  }

  // --- Step 2: save agent profile row ---
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setStatus('loading')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setErrorMsg('Session expired — please sign in again.')
      setStatus('error')
      return
    }

    const { error } = await supabase.from('agents').upsert({
      id: user.id,
      email: user.email,
      full_name: fullName,
      agency_name: agencyName || null,
      phone: phone || null,
      whatsapp: whatsapp || null,
      license_number: licenseNumber || null,
      bio_en: bio || null,
    })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('idle')
      setStep('done')
    }
  }

  // --- Done ---
  if (step === 'done') {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 bg-[#EAF2FF] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#0F5AE5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#1F2937] mb-2">You're in!</h2>
        <p className="text-[#5B6472] text-sm mb-6">
          Your agent account is ready. Start by adding your first listing.
        </p>
        <Link
          href="/listings/new"
          className="inline-block px-6 py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-[9999px] text-sm transition-colors"
        >
          Add your first listing →
        </Link>
        <div className="mt-3">
          <Link href="/dashboard" className="text-sm text-[#5B6472] hover:text-[#0F5AE5]">
            Go to dashboard
          </Link>
        </div>
      </div>
    )
  }

  // --- Step 1: Account ---
  if (step === 'account') {
    return (
      <form onSubmit={handleAccountSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">Email address</label>
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5]"
            placeholder="you@youragency.com"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">Password</label>
          <input
            type="password" required value={password} onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5]"
            placeholder="At least 8 characters"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">Confirm password</label>
          <input
            type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5]"
            placeholder="Repeat password"
          />
        </div>

        {status === 'error' && (
          <p className="text-[#C73E3A] text-sm">{errorMsg}</p>
        )}

        <button
          type="submit" disabled={status === 'loading'}
          className="w-full py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-[9999px] text-sm transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Creating account…' : 'Continue →'}
        </button>

        <p className="text-[11px] text-[#7A8494] text-center leading-relaxed">
          By creating an account you agree to our{' '}
          <Link href="/terms" className="underline hover:text-[#0F5AE5]">Terms</Link> and{' '}
          <Link href="/privacy" className="underline hover:text-[#0F5AE5]">Privacy Policy</Link>.
        </p>
      </form>
    )
  }

  // --- Step 2: Profile ---
  return (
    <form onSubmit={handleProfileSubmit} className="space-y-4">
      <p className="text-[13px] text-[#5B6472] -mt-1 mb-2">
        This info appears on your listings so buyers know who to contact.
      </p>
      <div>
        <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">Full name <span className="text-[#C73E3A]">*</span></label>
        <input
          type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
          className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5]"
          placeholder="María González"
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">Agency / brokerage</label>
        <input
          type="text" value={agencyName} onChange={e => setAgencyName(e.target.value)}
          className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5]"
          placeholder="Osa Tropical Realty"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">Phone</label>
          <input
            type="tel" value={phone} onChange={e => setPhone(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5]"
            placeholder="+506 8888-0000"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">WhatsApp</label>
          <input
            type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5]"
            placeholder="+506 8888-0000"
          />
        </div>
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">
          License number
          <span className="font-normal text-[#7A8494] ml-1">(CCCBR / SUGEF)</span>
        </label>
        <input
          type="text" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)}
          className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5]"
          placeholder="Optional but builds buyer trust"
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#5B6472] mb-1.5">Short bio</label>
        <textarea
          value={bio} onChange={e => setBio(e.target.value)} rows={3}
          className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:border-[#0F5AE5] resize-none"
          placeholder="Local agent with 10 years in the Southern Pacific zone…"
        />
      </div>

      {status === 'error' && (
        <p className="text-[#C73E3A] text-sm">{errorMsg}</p>
      )}

      <button
        type="submit" disabled={status === 'loading'}
        className="w-full py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-[9999px] text-sm transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Saving…' : 'Complete setup →'}
      </button>
      <button
        type="button" onClick={() => setStep('done')}
        className="w-full py-2 text-[13px] text-[#7A8494] hover:text-[#1F2937]"
      >
        Skip for now
      </button>
    </form>
  )
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-extrabold text-[#1F2937]">
            Casa<span className="text-[#0F5AE5]">Finder</span>
          </Link>
          <h1 className="text-xl font-bold text-[#1F2937] mt-5">Create your agent account</h1>
          <p className="text-[#5B6472] text-sm mt-1.5">
            Free during beta. List properties, receive leads, track inquiries.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
          <Suspense fallback={<div className="text-center text-[#7A8494]">Loading…</div>}>
            <SignupForm />
          </Suspense>
        </div>

        {/* Already have account */}
        <p className="text-center text-[13px] text-[#7A8494] mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0F5AE5] font-medium hover:underline">Sign in</Link>
        </p>

      </div>
    </main>
  )
}
