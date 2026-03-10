'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface LeadFormProps {
  listingId: string
  listingTitle: string
  agentId?: string
}

export function LeadForm({ listingId, listingTitle, agentId }: LeadFormProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing_id: listingId,
          agent_id: agentId,
          ...form,
        }),
      })

      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#EAF2FF] border border-[#E5E7EB] rounded-xl p-6 text-center">
        <div className="text-[#0F5AE5] text-2xl mb-2">✓</div>
        <p className="font-semibold text-[#0F5AE5]">Inquiry Sent!</p>
        <p className="text-[#0F5AE5] text-sm mt-1">An agent will be in touch shortly.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Contact Agent</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-1">Re: {listingTitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            rows={4}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5AE5] resize-none"
            placeholder="I'm interested in this property..."
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={status === 'sending'}
          className="w-full"
        >
          Send Inquiry
        </Button>

        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to be contacted about this property.
        </p>
      </form>
    </div>
  )
}
