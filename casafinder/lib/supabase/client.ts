import { createBrowserClient } from '@supabase/ssr'

// NOTE: Database generic omitted until `supabase gen types` runs post-migration.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
