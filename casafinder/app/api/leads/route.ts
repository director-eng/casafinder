import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const leadSchema = z.object({
  listing_id: z.string().uuid(),
  agent_id: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = leadSchema.parse(body)

    const supabase = await createServiceClient()

    // Fetch listing for context
    const { data: listingRaw } = await supabase
      .from('listings')
      .select('title, title_en, slug, agent_id, agents(full_name, email)')
      .eq('id', data.listing_id)
      .single()
    const listing = listingRaw as { title: string; title_en: string | null; slug: string; agent_id: string | null; agents: { full_name: string; email: string } | null } | null

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // Insert lead
    const { data: lead, error: insertError } = await (supabase as any)
      .from('leads')
      .insert({
        listing_id: data.listing_id,
        agent_id: data.agent_id ?? listing.agent_id,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        message: data.message ?? null,
        source: 'website',
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Send email notification to agent
    const agentEmail = (listing as any).agents?.email
    const listingTitle = listing.title_en ?? listing.title

    if (agentEmail) {
      await resend.emails.send({
        from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
        to: agentEmail,
        subject: `New Lead: ${listingTitle}`,
        html: `
          <h2>New Lead from CasaFinder</h2>
          <p><strong>Property:</strong> <a href="${process.env.NEXT_PUBLIC_SITE_URL}/listing/${listing.slug}">${listingTitle}</a></p>
          <hr />
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.message ? `<p><strong>Message:</strong><br>${data.message}</p>` : ''}
          <hr />
          <p style="color:#999;font-size:12px">Sent via CasaFinder lead form</p>
        `,
      })
    }

    // Also send confirmation to the buyer
    await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: data.email,
      subject: `Your inquiry about: ${listingTitle}`,
      html: `
        <h2>Thanks for your inquiry!</h2>
        <p>Hi ${data.name},</p>
        <p>We've received your inquiry about <strong>${listingTitle}</strong> and the listing agent will be in touch shortly.</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/listing/${listing.slug}">View the listing</a></p>
        <hr />
        <p style="color:#999;font-size:12px">CasaFinder — Costa Rica Real Estate</p>
      `,
    })

    return NextResponse.json({ success: true, id: lead.id })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 })
    }
    console.error('[leads/POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
