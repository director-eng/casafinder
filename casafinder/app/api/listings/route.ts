import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { z } from 'zod'

const listingSchema = z.object({
  title: z.string().min(5).max(300),
  title_en: z.string().max(300).optional(),
  description: z.string().max(10000).optional(),
  listing_type: z.enum(['sale', 'rent', 'rent_vacation']),
  property_type: z.enum(['house', 'condo', 'lot', 'farm', 'commercial', 'other']),
  price_usd: z.number().positive().optional(),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  area_lot_m2: z.number().positive().optional(),
  area_construction_m2: z.number().positive().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  pool: z.boolean().optional(),
  garage: z.boolean().optional(),
  furnished: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  finca_number: z.string().optional(),
  year_built: z.number().int().optional(),
})

// GET /api/listings — server-side search (used by scraper pipeline)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const supabase = await createClient()

  let query = supabase
    .from('listings')
    .select('id, slug, title, price_usd, listing_type, property_type, status, lat, lng, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  const status = searchParams.get('status')
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/listings — create listing (agents only)
export async function POST(req: Request) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check agent profile exists
  const { data: agentRaw } = await supabase
    .from('agents')
    .select('id')
    .eq('user_id', user.id)
    .single()
  const agent = agentRaw as { id: string } | null

  if (!agent) {
    return NextResponse.json({ error: 'Agent profile required' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const data = listingSchema.parse(body)

    // Auto-generate slug
    const slug = `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)}-${Date.now().toString(36)}`

    const service = await createServiceClient()
    const { data: listing, error: insertError } = await service
      .from('listings')
      .insert({
        ...data,
        agent_id: agent.id,
        slug,
        status: 'active',
      })
      .select()
      .single()

    if (insertError) throw insertError

    return NextResponse.json(listing, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 })
    }
    console.error('[listings/POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
