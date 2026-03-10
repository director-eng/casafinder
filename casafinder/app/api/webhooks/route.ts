import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Supabase Database Webhooks → POST /api/webhooks
// Configure in: Supabase Dashboard → Database → Webhooks
// Events to handle: INSERT on leads table (notify agent)

export async function POST(req: Request) {
  // Validate webhook secret
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { type, table, record, old_record } = await req.json()

    const supabase = await createServiceClient()

    // Handle new scraped listings awaiting review
    if (table === 'listings' && type === 'INSERT' && record.status === 'review') {
      // In production: notify admin via email
      console.log('[webhook] New listing for review:', record.id, record.title)
    }

    // Handle new leads
    if (table === 'leads' && type === 'INSERT') {
      // Mark lead as unread / trigger other side effects
      await supabase
        .from('leads')
        .update({ status: 'new' })
        .eq('id', record.id)

      console.log('[webhook] New lead:', record.id, 'for listing:', record.listing_id)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[webhooks/POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
