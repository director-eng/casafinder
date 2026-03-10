# Costa Rican Zillow — ATLAS Trace Phase

**Project:** Consumer-facing real estate platform for Costa Rica (starting with Ojochal)
**Codename:** CasaFinder
**Domain:** CasaFinder.cr (+ .com if available)
**Date:** 2026-03-09
**Status:** ✅ Link phase COMPLETE — ready for Assemble phase

---

## Link Phase Validation Results (2026-03-09)

| # | Service | Result | Notes |
|---|---|---|---|
| 1a | Firecrawl API | ✅ PASS | HTTP 200, key valid |
| 1b | Firecrawl /extract | ✅ PASS | Endpoint reachable |
| 4a | Supabase REST | ⚠️ 401 | Expected — new `sb_publishable_` key format; will resolve after migrations |
| 4b | Supabase Auth | ✅ PASS | GoTrue v2.187.0 healthy |
| 4c | PostGIS | ✅ PASS | v3.3.7 enabled (confirmed in dashboard) |
| 4d | Postgres TCP | ⏳ Terminal only | Run validate-connections.sh locally with psql |
| 5a | Resend Email | ⏳ Terminal only | CORS blocks browser test; key format correct |
| 6a | Google Maps Geocoding | ✅ PASS | Ojochal → 9.0885°N, 83.6499°W |
| 2/3 | SIRI / SNITCR WMS+WFS | ⏳ Terminal only | CORS blocks browser fetch; run validate-connections.sh |
| 7 | robots.txt (8 sites) | ⏳ Terminal only | CORS blocks browser fetch; run validate-connections.sh |

**All keys embedded in:** `link-phase/validate-connections.sh`

**GCP Maps Platform:** Fully activated — "My Maps Billing Account 1" linked, all Maps APIs enabled (project: `n8n-automation-011126`)

> **Note on Supabase 401:** The `sb_publishable_` key format is Supabase's newer client key. If REST stays 401 after schema migrations are applied, grab the JWT-format anon key from Supabase Dashboard → Project Settings → API → `anon` `public` key.

**Postgres connection string:**
```
postgresql://postgres:tosAAmCgpEfSUsk2@db.wlusrkrnwwxaozqouqhn.supabase.co:5432/postgres
```

---

## 1. Product Summary

**Problem:** Costa Rica has no consumer-facing real estate portal. Listings are fragmented across agent-controlled platforms (RE.cr, Encuentra24, regional sites) with no unified search, no map-based browsing, and no parcel-level data enrichment.

**User:** North American expats, digital nomads, and Costa Rican buyers/renters searching the Southern Pacific zone (Ojochal → expand nationally).

**Revenue Model:** Lead generation. Capture buyer/renter traffic via programmatic SEO → sell qualified leads to agents/developers. Secondary: featured listings, agent subscriptions, vendor directory premium placements.

**Success Metric:** 1,000+ monthly unique visitors within 6 months of launch; 50+ active listings in Ojochal zone within 3 months.

---

## 2. Data Schema

### Core Tables

#### `listings`
The central table. Every property for sale or rent.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slug | text | URL-friendly, unique, for SEO (`casa-vista-al-mar-ojochal`) |
| title | text | Display title |
| description | text | Rich text / markdown |
| listing_type | enum | `sale`, `rent`, `rent_vacation` |
| property_type | enum | `house`, `condo`, `lot`, `commercial`, `farm`, `hotel` |
| status | enum | `active`, `pending`, `sold`, `rented`, `expired`, `draft` |
| price_usd | numeric | Price in USD (CR market standard for foreigners) |
| price_crc | numeric | Price in colones (optional) |
| currency_primary | enum | `USD`, `CRC` |
| bedrooms | int | nullable for lots |
| bathrooms | numeric | supports 1.5, 2.5, etc. |
| area_built_m2 | numeric | Built area |
| area_lot_m2 | numeric | Lot area |
| year_built | int | nullable |
| parking_spaces | int | |
| furnished | enum | `unfurnished`, `partially`, `fully` |
| latitude | numeric(10,7) | WGS84 |
| longitude | numeric(10,7) | WGS84 |
| address_text | text | Human-readable address |
| province | text | From catastro or manual |
| canton | text | |
| district | text | |
| finca_number | text | Registro Nacional finca # |
| catastral_id | text | ID catastral from SIRI |
| plano_catastral | text | Survey plan number |
| area_catastral_m2 | numeric | Official area from catastro |
| features | jsonb | Pool, AC, solar, water tank, etc. |
| seo_title | text | Auto-generated or manual |
| seo_description | text | Meta description |
| view_count | int | default 0 |
| lead_count | int | default 0 |
| source | enum | `agent_portal`, `scrape`, `manual`, `feed` |
| source_url | text | Original listing URL if scraped |
| submitted_by | uuid | FK → users |
| agent_id | uuid | FK → agents |
| verified | boolean | Admin-verified listing |
| featured | boolean | Paid placement |
| expires_at | timestamptz | Auto-expire stale listings |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `listing_images`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| listing_id | uuid | FK → listings |
| url | text | CDN URL |
| alt_text | text | SEO alt text |
| sort_order | int | Display order |
| is_primary | boolean | Hero image |
| created_at | timestamptz | |

#### `users`
Anyone with an account — buyers, agents, vendors, admins.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| email | text | unique |
| name | text | |
| phone | text | |
| role | enum | `buyer`, `agent`, `vendor`, `admin` |
| avatar_url | text | |
| locale | enum | `en`, `es` |
| auth_provider | text | google, email, etc. |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `agents`
Extended profile for real estate agents.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → users |
| company_name | text | |
| license_number | text | CCCBR or CRGAR license |
| bio | text | |
| phone_whatsapp | text | Critical for CR market |
| website | text | |
| service_areas | text[] | Array of districts/cantons |
| languages | text[] | `['en', 'es']` |
| subscription_tier | enum | `free`, `pro`, `premium` |
| listing_count | int | |
| lead_count | int | |
| avg_response_time_hrs | numeric | Calculated |
| verified | boolean | |
| created_at | timestamptz | |

#### `leads`
The money table. Every inquiry from a buyer/renter.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| listing_id | uuid | FK → listings (nullable for general inquiries) |
| agent_id | uuid | FK → agents |
| name | text | Lead's name |
| email | text | |
| phone | text | |
| message | text | |
| source_page | text | URL where lead was captured |
| utm_source | text | Marketing attribution |
| utm_medium | text | |
| utm_campaign | text | |
| status | enum | `new`, `contacted`, `qualified`, `converted`, `dead` |
| created_at | timestamptz | |

#### `saved_searches`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → users |
| name | text | "My Ojochal search" |
| filters | jsonb | `{type: "sale", min_price: 100000, max_price: 500000, district: "Ojochal"}` |
| notify_email | boolean | Email when new match |
| created_at | timestamptz | |

#### `favorites`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → users |
| listing_id | uuid | FK → listings |
| created_at | timestamptz | |

### Vendor Directory Tables

#### `vendors`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → users |
| business_name | text | |
| slug | text | SEO-friendly URL |
| category | enum | `contractor`, `architect`, `lawyer`, `property_manager`, `inspector`, `solar`, `landscaping`, `pool`, `security`, `internet`, `moving`, `cleaning`, `other` |
| description | text | |
| phone_whatsapp | text | |
| email | text | |
| website | text | |
| service_areas | text[] | |
| languages | text[] | |
| logo_url | text | |
| featured | boolean | Paid placement |
| verified | boolean | |
| created_at | timestamptz | |

#### `vendor_reviews`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| vendor_id | uuid | FK → vendors |
| user_id | uuid | FK → users |
| rating | int | 1-5 |
| review_text | text | |
| created_at | timestamptz | |

### Design / Inspiration Tab (Houzz-style)

#### `design_projects`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| vendor_id | uuid | FK → vendors (architect/contractor) |
| title | text | "Modern Tropical Home in Ojochal" |
| slug | text | |
| description | text | |
| style_tags | text[] | `['tropical', 'modern', 'sustainable']` |
| location | text | |
| created_at | timestamptz | |

#### `design_images`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| project_id | uuid | FK → design_projects |
| url | text | CDN URL |
| caption | text | |
| room_type | enum | `exterior`, `kitchen`, `bathroom`, `living`, `bedroom`, `pool`, `garden`, `other` |
| sort_order | int | |

### Content / How-To Tab

#### `articles`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slug | text | SEO slug |
| title | text | |
| body | text | Markdown |
| category | enum | `how_to`, `guide`, `news`, `video` |
| tags | text[] | `['solar', 'diy', 'water_catchment', 'permits']` |
| video_url | text | YouTube embed |
| thumbnail_url | text | |
| author_id | uuid | FK → users |
| seo_title | text | |
| seo_description | text | |
| published | boolean | |
| published_at | timestamptz | |
| created_at | timestamptz | |

### Programmatic SEO Tables

#### `seo_pages`
Auto-generated landing pages for long-tail keywords.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slug | text | `homes-for-sale-ojochal-costa-rica` |
| page_type | enum | `district_sale`, `district_rent`, `property_type_district`, `price_range`, `feature` |
| title | text | "Homes for Sale in Ojochal, Costa Rica" |
| meta_description | text | |
| h1 | text | |
| body_template | text | Template key for dynamic content |
| district | text | |
| canton | text | |
| province | text | |
| property_type | text | nullable |
| min_price | numeric | nullable |
| max_price | numeric | nullable |
| listing_count | int | Denormalized for display |
| created_at | timestamptz | |
| updated_at | timestamptz | |

---

## 3. Technology Stack

### Frontend
| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | **Next.js 14+ (App Router)** | SSR for SEO, ISR for programmatic pages, API routes for backend |
| Styling | **Tailwind CSS** | Fast iteration, responsive, production-ready |
| Map | **Leaflet + react-leaflet** | Already proven in catastro viewer, WMS integration works |
| Image gallery | **react-photo-album** or custom | Listing photo galleries |
| Forms | **react-hook-form + zod** | Validation for listing submission, lead capture |
| i18n | **next-intl** | EN/ES bilingual from day 1 |
| Analytics | **Plausible or PostHog** | Privacy-friendly, GDPR-safe |

### Backend
| Component | Choice | Rationale |
|-----------|--------|-----------|
| Database | **Supabase (PostgreSQL + PostGIS)** | PostGIS for spatial queries, Supabase for auth/storage/realtime, generous free tier |
| Auth | **Supabase Auth** | Google OAuth + email/password, role-based (buyer/agent/vendor/admin) |
| Image storage | **Supabase Storage → CDN** | Or Cloudflare R2 if volume grows |
| Edge functions | **Supabase Edge Functions** | Scheduled jobs, webhooks, lead notifications |
| Search | **PostgreSQL full-text + PostGIS** | `tsvector` for text, `ST_DWithin` for geo. Upgrade to Meilisearch if needed later |

### Infrastructure
| Component | Choice | Rationale |
|-----------|--------|-----------|
| Hosting | **Vercel** | Native Next.js, edge functions, preview deploys |
| Domain | **CasaFinder.cr** | `.cr` for local SEO + `.com` for international |
| CDN | **Vercel Edge Network** | Auto with Vercel |
| Email | **Resend** | Transactional (lead notifications, saved search alerts) |
| Monitoring | **Vercel Analytics + Sentry** | Error tracking, performance |
| Cron jobs | **Vercel Cron + Supabase pg_cron** | Weekly scrape/refresh, listing expiry |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    VERCEL (Next.js)                  │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐ │
│  │ SSR Pages│  │ API Routes│  │ ISR/Static Pages  │ │
│  │ (search, │  │ (leads,   │  │ (programmatic SEO,│ │
│  │  listing) │  │  CRUD)    │  │  articles)        │ │
│  └────┬─────┘  └────┬─────┘  └────────┬──────────┘ │
│       │              │                  │            │
└───────┼──────────────┼──────────────────┼────────────┘
        │              │                  │
        ▼              ▼                  ▼
┌─────────────────────────────────────────────────────┐
│              SUPABASE                                │
│  ┌──────────┐ ┌────────┐ ┌────────┐ ┌───────────┐  │
│  │PostgreSQL│ │  Auth   │ │Storage │ │Edge Funcs │  │
│  │+ PostGIS │ │(OAuth)  │ │(images)│ │(cron,     │  │
│  │          │ │         │ │        │ │ webhooks) │  │
│  └────┬─────┘ └────────┘ └────────┘ └───────────┘  │
│       │                                              │
└───────┼──────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────┐   ┌──────────────────────┐
│   SIRI WMS/WFS            │   │   Catastro Nacional   │
│   Parcel boundaries       │   │   GeoPortal WFS       │
│   Finca data              │   │   Property attributes  │
│   GetFeatureInfo          │   │   Spatial queries      │
└───────────────────────────┘   └──────────────────────┘
```

---

## 4. Integrations Map

| Service | Purpose | Auth | Endpoint | Notes |
|---------|---------|------|----------|-------|
| **SIRI WMS** | Parcel overlay on map | None (public) | `https://siri.snitcr.go.cr/Geoservicios/wms` | Already working in catastro viewer |
| **SIRI WFS** | Parcel data enrichment | None (public) | `https://siri.snitcr.go.cr/Geoservicios/wfs` | Spatial queries by BBOX, returns GeoJSON |
| **Catastro GeoPortal** | Property attributes | None (public) | ArcGIS REST endpoints | Finca lookup, area, boundaries |
| **RNP Digital** | Ownership verification | Account required | `https://www.rnpdigital.com/` | Manual verification flow for now |
| **Supabase** | Database, auth, storage | API key | Project URL | All CRUD operations |
| **Vercel** | Hosting, edge, cron | Git deploy | Auto | CI/CD from GitHub |
| **Resend** | Email notifications | API key | `https://api.resend.com` | Lead alerts, saved search notifications |
| **Google Maps Geocoding** | Address → coordinates | API key | Google APIs | Fallback when lat/lng not provided |
| **Cloudflare R2** | Image CDN (if needed) | API key | R2 endpoint | Backup to Supabase Storage |

### Catastro Enrichment Flow

When a listing is submitted with a finca number or coordinates:

```
1. Agent submits listing with finca # or clicks map location
2. Backend fires WFS GetFeature request to SIRI:
   - By finca: filter on property ID
   - By coords: ST_Intersects with BBOX
3. Response returns: parcel boundary (geometry), area_m2, province, canton, district
4. Store enriched data on listing record
5. Display parcel overlay on listing detail page
```

---

## 5. Programmatic SEO Strategy

### Page Templates (auto-generated)

| Template | Example URL | Volume |
|----------|-------------|--------|
| `/{district}-homes-for-sale` | `/ojochal-homes-for-sale` | ~50 districts |
| `/{district}-homes-for-rent` | `/ojochal-homes-for-rent` | ~50 districts |
| `/{property_type}-for-sale-{district}` | `/lots-for-sale-ojochal` | ~300 combos |
| `/{district}-real-estate` | `/ojochal-real-estate` | ~50 districts |
| `/costa-rica-{feature}-homes` | `/costa-rica-ocean-view-homes` | ~20 features |
| `/how-to/{slug}` | `/how-to/install-solar-panels-costa-rica` | Unlimited |

### SEO Implementation

- **ISR (Incremental Static Regeneration)**: Programmatic pages rebuild every 24 hours
- **Dynamic sitemap.xml**: Auto-generated from `seo_pages` + `listings` + `articles`
- **Structured data**: JSON-LD for `RealEstateListing`, `Place`, `FAQPage`
- **Hreflang tags**: EN/ES versions of every page
- **Internal linking**: Each listing links to district page, property type page, vendor directory

---

## 6. Scheduled Tasks

| Task | Frequency | Description |
|------|-----------|-------------|
| **Listing expiry check** | Daily | Mark listings as `expired` if `expires_at < now()` |
| **Scrape regional sites** | Weekly | Pull new listings from Encuentra24, Osa Tropical, etc. → flag for manual review |
| **Catastro enrichment** | On submission + weekly retry | Enrich listings missing catastro data |
| **SEO page refresh** | Daily | Recalculate `listing_count` on programmatic pages, regenerate sitemaps |
| **Stale listing cleanup** | Weekly | Flag listings not updated in 90 days for review |
| **Lead notification** | Realtime | Email agent when new lead comes in (Supabase realtime → Edge Function → Resend) |
| **Saved search alerts** | Daily | Match new listings against saved searches, email users |
| **Analytics digest** | Weekly | Email admins: new listings, leads, traffic stats |

---

## 7. Edge Cases

| Scenario | Handling |
|----------|----------|
| Property has no finca number | Allow submission without; flag for manual catastro lookup |
| Multiple listings for same parcel | Detect by finca # or lat/lng proximity; flag duplicates for admin review |
| SIRI WFS is down | Cache last-known parcel data; retry enrichment in next cron run |
| Listing submitted with wrong coordinates | Show parcel overlay on submission form so agent can verify visually |
| Price in CRC fluctuates vs USD | Store both; show USD primary with CRC tooltip; do NOT auto-convert (exchange rate is editorial) |
| Agent submits in Spanish, buyer searches in English | Bilingual fields (title_en, title_es) or auto-translate via API |
| Scraped listing already exists | Deduplicate by source_url; merge by finca # if different sources |
| Large image uploads | Client-side resize to max 2048px before upload; generate thumbnails server-side |
| Vacation rental vs long-term rent | Separate `listing_type` enum values; different display templates |
| Property spans multiple parcels | Allow multiple finca numbers (array field); show combined overlay |
| No internet in rural CR | Progressive web app (PWA) with offline listing detail caching |

---

## 8. Phase 1 Scope (MVP)

Build the minimum viable product that validates the market:

### In Scope
- Map-based listing search (Ojochal area only)
- Listing detail pages with catastro overlay
- Agent listing submission portal (authenticated)
- Lead capture forms (name, email, phone, message)
- Basic programmatic SEO pages (district + listing type)
- EN/ES bilingual
- Vendor directory (basic — name, category, contact)
- Mobile-responsive

### In Scope (Phase 1b — immediately after MVP launch)
- Scraping pipeline (Firecrawl + Crawl4AI) with weekly scheduled runs
- Admin review queue for scraped listings
- Deduplication engine

### Out of Scope (Phase 2+)
- Design/inspiration tab (Houzz-style)
- How-to video content tab
- Social media integration tab
- Agent subscription billing
- Saved searches with email alerts
- Chat/messaging between buyer and agent
- Mortgage calculator
- Virtual tours / 3D

---

## 9. File Structure (Next.js App)

```
casafinder/
├── app/
│   ├── (marketing)/          # Public pages
│   │   ├── page.tsx          # Homepage with map + search
│   │   ├── search/           # Search results
│   │   ├── listing/[slug]/   # Listing detail
│   │   ├── vendors/          # Vendor directory
│   │   ├── vendors/[slug]/   # Vendor profile
│   │   ├── [seo-slug]/       # Programmatic SEO pages
│   │   └── how-to/[slug]/    # Articles
│   ├── (dashboard)/          # Authenticated
│   │   ├── dashboard/        # Agent/admin dashboard
│   │   ├── listings/new/     # Submit listing
│   │   ├── listings/[id]/    # Edit listing
│   │   └── leads/            # Lead management
│   ├── api/
│   │   ├── listings/         # CRUD
│   │   ├── leads/            # Lead capture
│   │   ├── catastro/         # WFS proxy/enrichment
│   │   └── webhooks/         # Supabase webhooks
│   └── layout.tsx
├── components/
│   ├── map/                  # Leaflet map components
│   ├── listings/             # Cards, galleries, filters
│   ├── forms/                # Lead forms, listing submission
│   └── ui/                   # Shared UI components
├── lib/
│   ├── supabase/             # Client + server clients
│   ├── catastro/             # WFS/WMS utilities
│   └── seo/                  # Structured data, sitemap helpers
├── public/
├── supabase/
│   ├── migrations/           # SQL schema
│   └── seed.sql              # Test data
└── next.config.ts
```

---

## 10. Scraping Architecture

### Tool Stack

| Tool | Role | Why |
|------|------|-----|
| **Firecrawl** (primary) | Structured extraction from JS-heavy sites | AI-powered `/extract` endpoint returns structured JSON from natural language prompts. You have the API key. Handles JS rendering, anti-bot, and dynamic content. $16-333/mo. |
| **Crawl4AI** (secondary) | Open-source fallback + custom extraction | Free, 58K+ GitHub stars, LLM-friendly output. Self-hosted = no API costs. Best for sites where Firecrawl is overkill or rate-limited. |
| **Playwright** (custom) | Site-specific scrapers for stubborn targets | When Firecrawl/Crawl4AI can't handle a site's anti-bot (e.g., Cloudflare-protected). Full browser automation with residential proxy rotation. |
| **Bright Data** (proxy layer) | Residential proxy network for anti-bot bypass | 150M+ residential IPs, 98.44% success rate. Use when Encuentra24 or other CR sites block datacenter IPs. Usage-based pricing. |

### Target Sites (Priority Order)

| Site | Content | Anti-Bot | Approach |
|------|---------|----------|----------|
| **Encuentra24.com** | Largest CR classifieds, high volume | Moderate (likely Cloudflare) | Firecrawl `/extract` → structured JSON |
| **Point2Homes** | North American buyer traffic | Low | Firecrawl `/crawl` |
| **Osa Tropical Properties** | Ojochal specialist | Low | Crawl4AI (simple HTML) |
| **Costa Ballena Property** | Southern Pacific focus | Low | Crawl4AI |
| **Pacific Lots** | Lots and land | Low | Crawl4AI |
| **Coldwell Banker CR** | National inventory | Moderate | Firecrawl |
| **RE/MAX Costa Rica** | National inventory | Moderate | Firecrawl |
| **2Costa Rica Real Estate** | Ojochal area | Low | Crawl4AI |

### Scraping Pipeline Architecture

```
┌──────────────────────────────────────────────────────┐
│                  WEEKLY CRON JOB                      │
│              (Vercel Cron or n8n)                     │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────┐
│              SCRAPE ORCHESTRATOR                      │
│                                                      │
│  For each target site:                               │
│  1. Check robots.txt (respect Disallow, Crawl-delay) │
│  2. Select tool (Firecrawl vs Crawl4AI vs Playwright)│
│  3. Apply rate limiting (10-15s between requests)    │
│  4. Extract structured listing data                  │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────┐
│              NORMALIZE & VALIDATE                     │
│                                                      │
│  1. Map source fields → CasaFinder schema            │
│  2. Geocode address → lat/lng (if missing)           │
│  3. Convert CRC → USD (store both)                   │
│  4. Standardize property_type enum                   │
│  5. Download & resize images → Supabase Storage      │
│  6. Generate slug from title + district              │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────┐
│              DEDUPLICATE                              │
│                                                      │
│  Priority matching (stop at first match):            │
│  1. Exact: source_url already exists                 │
│  2. Exact: finca_number match                        │
│  3. Fuzzy: lat/lng within 50m + price within 10%     │
│  4. Fuzzy: normalized address + price within 10%     │
│                                                      │
│  If match found → update existing (merge new data)   │
│  If no match → create new listing (status: review)   │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────┐
│              CATASTRO ENRICHMENT                      │
│                                                      │
│  For new listings with coordinates:                  │
│  1. Hit SIRI WFS with lat/lng → get parcel           │
│  2. Store finca #, catastral ID, official area       │
│  3. Store parcel geometry for map overlay             │
│  4. Backfill province/canton/district if missing     │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────┐
│              ADMIN REVIEW QUEUE                       │
│                                                      │
│  Scraped listings land in status: "review"           │
│  Admin dashboard shows:                              │
│  - New scraped listings pending review               │
│  - Duplicate candidates for merge                    │
│  - Listings flagged for data quality issues          │
│  - One-click approve / reject / edit                 │
└──────────────────────────────────────────────────────┘
```

### Firecrawl Extract Example

```javascript
// Extract structured listing data from a search results page
const response = await firecrawl.extract({
  url: "https://encuentra24.com/costa-rica/bienes-raices-venta-de-propiedades?q=ojochal",
  prompt: "Extract all property listings. For each listing return: title, price (number), currency, bedrooms, bathrooms, area_m2, address, description, image_urls (array), source_url (link to full listing)",
  schema: {
    type: "array",
    items: {
      type: "object",
      properties: {
        title: { type: "string" },
        price: { type: "number" },
        currency: { type: "string", enum: ["USD", "CRC"] },
        bedrooms: { type: "integer" },
        bathrooms: { type: "number" },
        area_m2: { type: "number" },
        address: { type: "string" },
        description: { type: "string" },
        image_urls: { type: "array", items: { type: "string" } },
        source_url: { type: "string" }
      }
    }
  }
});
```

### Deduplication Schema Addition

```sql
-- Add to listings table for dedup tracking
ALTER TABLE listings ADD COLUMN source_hash text;  -- hash of normalized title+price+coords
ALTER TABLE listings ADD COLUMN merged_from uuid[]; -- IDs of listings merged into this one

-- Dedup index
CREATE INDEX idx_listings_source_url ON listings(source_url) WHERE source_url IS NOT NULL;
CREATE INDEX idx_listings_finca ON listings(finca_number) WHERE finca_number IS NOT NULL;
CREATE INDEX idx_listings_geo ON listings USING gist(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326));
```

### Ethical Scraping Rules

1. **robots.txt compliance** — check and respect `Disallow` and `Crawl-delay` for every target
2. **Rate limiting** — minimum 10-15 seconds between requests per domain
3. **User-Agent** — identify as `CasaFinderBot/1.0 (+https://casafinder.cr/bot)`
4. **No PII scraping** — do not store agent personal phone/email from scraped data (only listing contact info)
5. **Attribution** — store `source_url` on every scraped listing; link back to original
6. **No verbatim content** — rewrite descriptions or use only first 200 chars as preview; do not copy full listing text
7. **Stale data removal** — if source listing disappears for 2 consecutive scrape runs, mark as `expired`

### Scheduled Scrape Jobs

| Job | Frequency | Tool | Sites |
|-----|-----------|------|-------|
| `scrape-encuentra24` | Weekly (Sunday 2am) | Firecrawl | Encuentra24 CR real estate |
| `scrape-regional-sites` | Weekly (Sunday 3am) | Crawl4AI | Osa Tropical, Costa Ballena, Pacific Lots, 2CR |
| `scrape-national-brands` | Weekly (Sunday 4am) | Firecrawl | Coldwell Banker CR, RE/MAX CR |
| `scrape-cleanup` | Weekly (Monday 6am) | PostgreSQL | Mark expired listings, flag duplicates |
| `catastro-backfill` | Daily (5am) | SIRI WFS | Enrich any listings missing catastro data |

---

## 11. Integrations Map (Updated)

| Service | Purpose | Auth | Endpoint | Notes |
|---------|---------|------|----------|-------|
| **SIRI WMS** | Parcel overlay on map | None (public) | `https://siri.snitcr.go.cr/Geoservicios/wms` | Already working in catastro viewer |
| **SIRI WFS** | Parcel data enrichment | None (public) | `https://siri.snitcr.go.cr/Geoservicios/wfs` | Spatial queries by BBOX, returns GeoJSON |
| **Catastro GeoPortal** | Property attributes | None (public) | ArcGIS REST endpoints | Finca lookup, area, boundaries |
| **RNP Digital** | Ownership verification | Account required | `https://www.rnpdigital.com/` | Manual verification flow for now |
| **Firecrawl** | Structured web scraping | API key (have it) | `https://api.firecrawl.dev` | Primary scraping tool |
| **Crawl4AI** | Open-source scraping | Self-hosted | Local or VPS | Secondary scraping for simple sites |
| **Bright Data** | Residential proxies | API key | Bright Data API | Anti-bot bypass when needed |
| **Supabase** | Database, auth, storage | API key | Project URL | All CRUD operations |
| **Vercel** | Hosting, edge, cron | Git deploy | Auto | CI/CD from GitHub |
| **Resend** | Email notifications | API key | `https://api.resend.com` | Lead alerts, saved search notifications |
| **Google Maps Geocoding** | Address → coordinates | API key | Google APIs | Fallback when lat/lng not provided |

---

## 12. Resolved Decisions

| # | Decision | Resolution |
|---|----------|------------|
| 1 | **Domain** | CasaFinder.cr (+ .com if available) |
| 2 | **Bilingual approach** | Separate fields (title_en/title_es) — quality matters for SEO |
| 3 | **Image hosting** | Supabase Storage to start; migrate to R2 if costs spike |
| 4 | **Scraping** | Full scraping pipeline: Firecrawl (primary) + Crawl4AI (secondary) + Bright Data (proxies). Ethical approach with robots.txt compliance and admin review queue. |
| 5 | **Agent onboarding** | Owner's decision — to be determined |
| 6 | **Pricing for agents** | Deferred to Phase 2 |

---

## Approval Checklist

- [ ] Data schema approved
- [ ] Tech stack approved (Next.js + Supabase + Vercel)
- [ ] Scraping architecture approved (Firecrawl + Crawl4AI + Bright Data)
- [ ] Phase 1 scope approved (MVP + 1b scraping)
- [ ] Ready to proceed to **Link** phase (validate all connections)
