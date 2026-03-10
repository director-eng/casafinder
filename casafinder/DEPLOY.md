# CasaFinder — Deploy Checklist

## Pre-Deploy Steps

### 1. Apply Database Migration
```bash
# Copy .env.local.example to .env.local and fill in credentials
cp .env.local.example .env.local

# Run migration against live Supabase (requires psql)
psql $DATABASE_URL -f supabase/migrations/001_initial_schema.sql

# Seed sample data (optional)
psql $DATABASE_URL -f supabase/seed.sql
```

### 2. Regenerate TypeScript Types
```bash
npx supabase gen types typescript --project-id wlusrkrnwwxaozqouqhn > lib/supabase/types.ts
```
Then remove the `as` casts throughout the codebase — they were placeholder pre-migration.

### 3. Get Remaining Credentials
- **Supabase Service Role Key**: Dashboard → Project Settings → API → `service_role key` → add to `.env.local`
- **Browser Maps API Key**: Create a separate Google Maps JS key with HTTP referrer restriction → add as `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
- **Webhook Secret**: Generate a random string → add as `WEBHOOK_SECRET`

### 4. Configure Supabase Webhooks
In Supabase Dashboard → Database → Webhooks:
- Table: `leads`, Event: `INSERT`, URL: `https://casafinder.cr/api/webhooks`
- Add header: `x-webhook-secret: <your WEBHOOK_SECRET>`

### 5. Build & Deploy (Vercel)
```bash
# Install and build locally first
npm install --legacy-peer-deps
npm run build

# Deploy via Vercel CLI
npx vercel --prod

# Or push to GitHub and connect to Vercel
```

### 6. Vercel Environment Variables
Set all variables from `.env.local` in Vercel Dashboard → Project → Settings → Environment Variables.
Do NOT commit `.env.local` to git.

### 7. Custom Domain
In Vercel → Domains: add `casafinder.cr` and update DNS to point to Vercel.

---

## Post-Deploy Verification
- [ ] Homepage loads with sample listings
- [ ] Search page with filters works
- [ ] Listing detail page with map overlay
- [ ] Lead form sends email via Resend
- [ ] Agent login + dashboard
- [ ] Vendor directory
- [ ] How-To articles
- [ ] SEO pages (`/ojochal-homes-for-sale`, etc.)
- [ ] Sitemap at `/sitemap.xml`
- [ ] Robots at `/robots.txt`
- [ ] Google Search Console: submit sitemap

---

## Scraping Pipeline (Next Phase)
- Configure Firecrawl scrape jobs for competitor listings
- Review queue: `/dashboard` → review `status = 'review'` listings
- SIRI WFS parcel enrichment: `GET /api/catastro?lat=9.09&lng=-83.65`
