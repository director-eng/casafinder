import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ListingSubmitForm } from '@/components/forms/ListingSubmitForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Submit a Listing | CasaFinder',
}

export default async function NewListingPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: agentRaw } = await supabase
    .from('agents')
    .select('id, full_name')
    .eq('user_id', user.id)
    .single()
  const agent = agentRaw as { id: string; full_name: string } | null

  if (!agent) redirect('/dashboard/setup')

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">← Back to Dashboard</a>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Submit a New Listing</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below. You can edit or update the listing after submission.</p>
        </div>
        <ListingSubmitForm agentId={agent.id} />
      </div>
    </main>
  )
}
