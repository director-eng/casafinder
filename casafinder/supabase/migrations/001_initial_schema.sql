-- =============================================================================
-- CasaFinder — Initial Schema Migration
-- Generated: 2026-03-09
-- Run via: psql $DATABASE_URL -f 001_initial_schema.sql
--          OR paste into Supabase Dashboard → SQL Editor
-- =============================================================================

-- ─── Extensions ───────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- fuzzy text search

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE listing_type_enum AS ENUM ('sale', 'rent', 'rent_vacation');
CREATE TYPE property_type_enum AS ENUM ('house', 'condo', 'lot', 'commercial', 'farm', 'hotel');
CREATE TYPE listing_status_enum AS ENUM ('active', 'pending', 'sold', 'rented', 'expired', 'draft', 'review');
CREATE TYPE currency_enum AS ENUM ('USD', 'CRC');
CREATE TYPE furnished_enum AS ENUM ('unfurnished', 'partially', 'fully');
CREATE TYPE listing_source_enum AS ENUM ('agent_portal', 'scrape', 'manual', 'feed');
CREATE TYPE user_role_enum AS ENUM ('buyer', 'agent', 'vendor', 'admin');
CREATE TYPE locale_enum AS ENUM ('en', 'es');
CREATE TYPE agent_tier_enum AS ENUM ('free', 'pro', 'premium');
CREATE TYPE lead_status_enum AS ENUM ('new', 'contacted', 'qualified', 'converted', 'dead');
CREATE TYPE vendor_category_enum AS ENUM (
  'contractor', 'architect', 'lawyer', 'property_manager',
  'inspector', 'solar', 'landscaping', 'pool', 'security',
  'internet', 'moving', 'cleaning', 'other'
);
CREATE TYPE room_type_enum AS ENUM ('exterior', 'kitchen', 'bathroom', 'living', 'bedroom', 'pool', 'garden', 'other');
CREATE TYPE article_category_enum AS ENUM ('how_to', 'guide', 'news', 'video');
CREATE TYPE seo_page_type_enum AS ENUM (
  'district_sale', 'district_rent', 'property_type_district', 'price_range', 'feature'
);

-- =============================================================================
-- CORE TABLES
-- =============================================================================

-- ─── users ────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           text UNIQUE NOT NULL,
  name            text,
  phone           text,
  role            user_role_enum NOT NULL DEFAULT 'buyer',
  avatar_url      text,
  locale          locale_enum NOT NULL DEFAULT 'en',
  auth_provider   text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── agents ───────────────────────────────────────────────────────────────────
CREATE TABLE agents (
  id                      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                 uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name            text,
  license_number          text,
  bio                     text,
  phone_whatsapp          text,
  website                 text,
  service_areas           text[],
  languages               text[] DEFAULT ARRAY['en'],
  subscription_tier       agent_tier_enum NOT NULL DEFAULT 'free',
  listing_count           int NOT NULL DEFAULT 0,
  lead_count              int NOT NULL DEFAULT 0,
  avg_response_time_hrs   numeric,
  verified                boolean NOT NULL DEFAULT false,
  created_at              timestamptz NOT NULL DEFAULT now()
);

-- ─── listings ─────────────────────────────────────────────────────────────────
CREATE TABLE listings (
  id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                text UNIQUE NOT NULL,
  title               text NOT NULL,
  title_en            text,
  title_es            text,
  description         text,
  description_en      text,
  description_es      text,
  listing_type        listing_type_enum NOT NULL,
  property_type       property_type_enum NOT NULL,
  status              listing_status_enum NOT NULL DEFAULT 'draft',
  price_usd           numeric,
  price_crc           numeric,
  currency_primary    currency_enum NOT NULL DEFAULT 'USD',
  bedrooms            int,
  bathrooms           numeric,
  area_built_m2       numeric,
  area_lot_m2         numeric,
  year_built          int,
  parking_spaces      int,
  furnished           furnished_enum,

  -- Geo
  latitude            numeric(10,7),
  longitude           numeric(10,7),
  geom                geometry(Point, 4326),  -- PostGIS point, auto-computed
  address_text        text,
  province            text,
  canton              text,
  district            text,

  -- Catastro enrichment
  finca_number        text,
  catastral_id        text,
  plano_catastral     text,
  area_catastral_m2   numeric,
  parcel_geom         geometry(MultiPolygon, 4326),  -- parcel boundary from SIRI WFS

  -- Features (pool, AC, solar, water tank, ocean view, etc.)
  features            jsonb DEFAULT '{}',

  -- SEO
  seo_title           text,
  seo_description     text,

  -- Stats
  view_count          int NOT NULL DEFAULT 0,
  lead_count          int NOT NULL DEFAULT 0,

  -- Source tracking
  source              listing_source_enum NOT NULL DEFAULT 'manual',
  source_url          text,
  source_hash         text,         -- hash of normalized title+price+coords for dedup
  merged_from         uuid[],       -- IDs of listings merged into this one

  -- Relations
  submitted_by        uuid REFERENCES users(id),
  agent_id            uuid REFERENCES agents(id),

  -- Flags
  verified            boolean NOT NULL DEFAULT false,
  featured            boolean NOT NULL DEFAULT false,

  -- Lifecycle
  expires_at          timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- ─── listing_images ───────────────────────────────────────────────────────────
CREATE TABLE listing_images (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id  uuid NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url         text NOT NULL,
  alt_text    text,
  sort_order  int NOT NULL DEFAULT 0,
  is_primary  boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── leads ────────────────────────────────────────────────────────────────────
CREATE TABLE leads (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id    uuid REFERENCES listings(id) ON DELETE SET NULL,
  agent_id      uuid REFERENCES agents(id) ON DELETE SET NULL,
  name          text NOT NULL,
  email         text NOT NULL,
  phone         text,
  message       text,
  source_page   text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  status        lead_status_enum NOT NULL DEFAULT 'new',
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── saved_searches ───────────────────────────────────────────────────────────
CREATE TABLE saved_searches (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name          text NOT NULL,
  filters       jsonb NOT NULL DEFAULT '{}',
  notify_email  boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── favorites ────────────────────────────────────────────────────────────────
CREATE TABLE favorites (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id  uuid NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

-- =============================================================================
-- VENDOR DIRECTORY
-- =============================================================================

CREATE TABLE vendors (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         uuid REFERENCES users(id) ON DELETE SET NULL,
  business_name   text NOT NULL,
  slug            text UNIQUE NOT NULL,
  category        vendor_category_enum NOT NULL,
  description     text,
  phone_whatsapp  text,
  email           text,
  website         text,
  service_areas   text[],
  languages       text[] DEFAULT ARRAY['en'],
  logo_url        text,
  featured        boolean NOT NULL DEFAULT false,
  verified        boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE vendor_reviews (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id   uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating      int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(vendor_id, user_id)
);

-- =============================================================================
-- CONTENT / ARTICLES
-- =============================================================================

CREATE TABLE articles (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  body            text,
  category        article_category_enum NOT NULL DEFAULT 'guide',
  tags            text[],
  video_url       text,
  thumbnail_url   text,
  author_id       uuid REFERENCES users(id) ON DELETE SET NULL,
  seo_title       text,
  seo_description text,
  published       boolean NOT NULL DEFAULT false,
  published_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- PROGRAMMATIC SEO
-- =============================================================================

CREATE TABLE seo_pages (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug             text UNIQUE NOT NULL,
  page_type        seo_page_type_enum NOT NULL,
  title            text NOT NULL,
  meta_description text,
  h1               text,
  body_template    text,
  district         text,
  canton           text,
  province         text,
  property_type    text,
  min_price        numeric,
  max_price        numeric,
  listing_count    int NOT NULL DEFAULT 0,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- listings — search + filter
CREATE INDEX idx_listings_status      ON listings(status);
CREATE INDEX idx_listings_type        ON listings(listing_type);
CREATE INDEX idx_listings_proptype    ON listings(property_type);
CREATE INDEX idx_listings_district    ON listings(district);
CREATE INDEX idx_listings_price_usd   ON listings(price_usd);
CREATE INDEX idx_listings_featured    ON listings(featured) WHERE featured = true;
CREATE INDEX idx_listings_agent       ON listings(agent_id);
CREATE INDEX idx_listings_created     ON listings(created_at DESC);

-- listings — dedup
CREATE INDEX idx_listings_source_url  ON listings(source_url) WHERE source_url IS NOT NULL;
CREATE INDEX idx_listings_finca       ON listings(finca_number) WHERE finca_number IS NOT NULL;
CREATE INDEX idx_listings_source_hash ON listings(source_hash) WHERE source_hash IS NOT NULL;

-- listings — PostGIS spatial
CREATE INDEX idx_listings_geom        ON listings USING GIST(geom);
CREATE INDEX idx_listings_parcel_geom ON listings USING GIST(parcel_geom);

-- listings — full-text search
CREATE INDEX idx_listings_fts ON listings
  USING GIN(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(district, '') || ' ' || coalesce(canton, '')));

-- listing_images
CREATE INDEX idx_listing_images_listing ON listing_images(listing_id);
CREATE INDEX idx_listing_images_primary ON listing_images(listing_id) WHERE is_primary = true;

-- leads
CREATE INDEX idx_leads_agent    ON leads(agent_id);
CREATE INDEX idx_leads_listing  ON leads(listing_id);
CREATE INDEX idx_leads_status   ON leads(status);
CREATE INDEX idx_leads_created  ON leads(created_at DESC);

-- seo_pages
CREATE INDEX idx_seo_pages_district ON seo_pages(district);
CREATE INDEX idx_seo_pages_type     ON seo_pages(page_type);

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_seo_pages_updated_at
  BEFORE UPDATE ON seo_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-compute PostGIS geom from lat/lng
CREATE OR REPLACE FUNCTION sync_listing_geom()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
    NEW.geom = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_listings_geom
  BEFORE INSERT OR UPDATE OF latitude, longitude ON listings
  FOR EACH ROW EXECUTE FUNCTION sync_listing_geom();

-- Auto-update agent listing_count
CREATE OR REPLACE FUNCTION sync_agent_listing_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.agent_id IS NOT NULL THEN
    UPDATE agents SET listing_count = listing_count + 1 WHERE id = NEW.agent_id;
  ELSIF TG_OP = 'DELETE' AND OLD.agent_id IS NOT NULL THEN
    UPDATE agents SET listing_count = GREATEST(0, listing_count - 1) WHERE id = OLD.agent_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_agent_listing_count
  AFTER INSERT OR DELETE ON listings
  FOR EACH ROW EXECUTE FUNCTION sync_agent_listing_count();

-- Auto-update listing lead_count
CREATE OR REPLACE FUNCTION sync_listing_lead_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.listing_id IS NOT NULL THEN
    UPDATE listings SET lead_count = lead_count + 1 WHERE id = NEW.listing_id;
    IF NEW.agent_id IS NOT NULL THEN
      UPDATE agents SET lead_count = lead_count + 1 WHERE id = NEW.agent_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_listing_lead_count
  AFTER INSERT ON leads
  FOR EACH ROW EXECUTE FUNCTION sync_listing_lead_count();

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents         ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads          ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites      ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors        ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages      ENABLE ROW LEVEL SECURITY;

-- Public read access for listings (active only)
CREATE POLICY "Public can view active listings"
  ON listings FOR SELECT
  USING (status = 'active');

-- Public read access for listing images
CREATE POLICY "Public can view listing images"
  ON listing_images FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND status = 'active')
  );

-- Public read access for vendors
CREATE POLICY "Public can view vendors"
  ON vendors FOR SELECT USING (true);

-- Public read access for articles
CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT USING (published = true);

-- Public read access for SEO pages
CREATE POLICY "Public can view seo pages"
  ON seo_pages FOR SELECT USING (true);

-- Agents can manage their own listings
CREATE POLICY "Agents can manage own listings"
  ON listings FOR ALL
  USING (agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid()));

-- Users can manage their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE USING (id = auth.uid());

-- Users can submit leads (insert only, no read)
CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT WITH CHECK (true);

-- Agents can view leads for their listings
CREATE POLICY "Agents can view own leads"
  ON leads FOR SELECT
  USING (agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid()));

-- Users can manage their favorites
CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL USING (user_id = auth.uid());

-- Users can manage their saved searches
CREATE POLICY "Users can manage own saved searches"
  ON saved_searches FOR ALL USING (user_id = auth.uid());

-- =============================================================================
-- FULL-TEXT SEARCH HELPER FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION search_listings(
  search_term    text DEFAULT NULL,
  p_listing_type listing_type_enum DEFAULT NULL,
  p_property_type property_type_enum DEFAULT NULL,
  p_district      text DEFAULT NULL,
  p_min_price     numeric DEFAULT NULL,
  p_max_price     numeric DEFAULT NULL,
  p_min_beds      int DEFAULT NULL,
  p_lat           numeric DEFAULT NULL,
  p_lng           numeric DEFAULT NULL,
  p_radius_km     numeric DEFAULT 25,
  p_limit         int DEFAULT 20,
  p_offset        int DEFAULT 0
)
RETURNS SETOF listings AS $$
BEGIN
  RETURN QUERY
  SELECT l.*
  FROM listings l
  WHERE l.status = 'active'
    AND (search_term IS NULL OR to_tsvector('english',
          coalesce(l.title,'') || ' ' || coalesce(l.description,'') || ' ' || coalesce(l.district,''))
          @@ plainto_tsquery('english', search_term))
    AND (p_listing_type IS NULL OR l.listing_type = p_listing_type)
    AND (p_property_type IS NULL OR l.property_type = p_property_type)
    AND (p_district IS NULL OR l.district ILIKE '%' || p_district || '%')
    AND (p_min_price IS NULL OR l.price_usd >= p_min_price)
    AND (p_max_price IS NULL OR l.price_usd <= p_max_price)
    AND (p_min_beds IS NULL OR l.bedrooms >= p_min_beds)
    AND (p_lat IS NULL OR p_lng IS NULL OR
         ST_DWithin(
           l.geom::geography,
           ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
           p_radius_km * 1000
         ))
  ORDER BY l.featured DESC, l.created_at DESC
  LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Grant to anon and authenticated
GRANT EXECUTE ON FUNCTION search_listings TO anon, authenticated;
