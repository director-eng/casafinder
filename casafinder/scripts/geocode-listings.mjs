/**
 * geocode-listings.mjs
 *
 * Populates lat/lng on all listings that currently have null coordinates.
 * Uses the Google Maps Geocoding API to resolve each listing's location.
 *
 * Run from the casafinder directory:
 *   node scripts/geocode-listings.mjs
 *
 * Environment variables required (already in .env / Vercel):
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY  — Google Maps API key
 *   NEXT_PUBLIC_SUPABASE_URL         — Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY        — Supabase service-role key
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Load .env.local manually (no dotenv dependency needed) ──────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
let envVars = {}
try {
  const raw = readFileSync(envPath, 'utf8')
  raw.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const eq = trimmed.indexOf('=')
    if (eq === -1) return
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    envVars[key] = val
  })
} catch {
  // Fall back to process.env if .env.local not found
}

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const MAPS_KEY = envVars.GOOGLE_MAPS_API_KEY || envVars.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

if (!SUPABASE_URL || !SERVICE_KEY || !MAPS_KEY) {
  console.error('Missing required environment variables.')
  console.error('Need: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// ── Geocode a single address string ─────────────────────────────────────────
async function geocode(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${MAPS_KEY}`
  const res = await fetch(url)
  const data = await res.json()

  if (data.status !== 'OK' || !data.results?.length) {
    return null
  }

  const loc = data.results[0].geometry.location
  return { lat: loc.lat, lng: loc.lng }
}

// ── Build address string from listing fields ─────────────────────────────────
function buildAddress(listing) {
  const parts = []
  if (listing.district) parts.push(listing.district)
  if (listing.province) parts.push(listing.province)
  parts.push('Costa Rica')
  return parts.join(', ')
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Fetching listings with missing coordinates...')

  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title_en, title, district, province, lat, lng')
    .is('lat', null)
    .eq('status', 'active')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching listings:', error)
    process.exit(1)
  }

  console.log(`Found ${listings.length} listings to geocode.\n`)

  let success = 0
  let failed = 0

  for (const listing of listings) {
    const address = buildAddress(listing)
    const name = listing.title_en ?? listing.title ?? listing.id

    process.stdout.write(`  Geocoding "${name}" (${address})... `)

    const coords = await geocode(address)

    if (!coords) {
      console.log('❌ not found')
      failed++
    } else {
      const { error: updateError } = await supabase
        .from('listings')
        .update({ lat: coords.lat, lng: coords.lng })
        .eq('id', listing.id)

      if (updateError) {
        console.log(`❌ DB error: ${updateError.message}`)
        failed++
      } else {
        console.log(`✅ ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`)
        success++
      }
    }

    // Rate limit: Google Maps free tier allows 50 req/s — 100ms delay is plenty
    await new Promise(r => setTimeout(r, 100))
  }

  console.log(`\nDone! ✅ ${success} geocoded, ❌ ${failed} failed.`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
