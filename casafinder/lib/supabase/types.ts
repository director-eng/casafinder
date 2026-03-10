// =============================================================================
// CasaFinder — Supabase Database Types
// Matches supabase/migrations/001_initial_schema.sql exactly.
// Regenerate from live DB with:
//   npx supabase gen types typescript --project-id wlusrkrnwwxaozqouqhn > lib/supabase/types.ts
// =============================================================================

// ─── Enum types ────────────────────────────────────────────────────────────────

export type ListingType = 'sale' | 'rent' | 'rent_vacation'
export type PropertyType = 'house' | 'condo' | 'lot' | 'farm' | 'commercial' | 'other'
export type ListingStatus = 'active' | 'pending' | 'sold' | 'rented' | 'expired' | 'draft' | 'review'
export type VendorCategory =
  | 'solar' | 'contractor' | 'architect' | 'lawyer' | 'property_management'
  | 'inspector' | 'landscaping' | 'pool_service' | 'security' | 'internet'
  | 'moving' | 'cleaning' | 'mechanic' | 'other'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'dead'
export type ArticleStatus = 'draft' | 'published' | 'archived'

// ─── Row types (match columns in migration SQL) ────────────────────────────────

export interface Agent {
  id: string
  user_id: string | null
  full_name: string
  email: string
  phone: string | null
  whatsapp: string | null
  photo_url: string | null
  bio: string | null
  agency_name: string | null
  agency_logo_url: string | null
  tier: 'free' | 'pro' | 'premium'
  active_listings_count: number
  verified: boolean
  created_at: string
  updated_at: string
}

export interface Listing {
  id: string
  slug: string
  agent_id: string | null
  title: string
  title_en: string | null
  description: string | null
  listing_type: ListingType
  property_type: PropertyType
  status: ListingStatus
  featured: boolean
  price_usd: number | null
  bedrooms: number | null
  bathrooms: number | null
  area_lot_m2: number | null
  area_construction_m2: number | null
  year_built: number | null
  pool: boolean
  garage: boolean
  furnished: boolean
  tags: string[]
  lat: number | null
  lng: number | null
  province: string | null
  district: string | null
  finca_number: string | null
  lead_count: number
  view_count: number
  source: string
  source_url: string | null
  source_hash: string | null
  merged_from: string[] | null
  fts: unknown
  created_at: string
  updated_at: string
}

export interface ListingImage {
  id: string
  listing_id: string
  url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
  created_at: string
}

export interface Lead {
  id: string
  listing_id: string
  agent_id: string | null
  name: string
  email: string
  phone: string | null
  message: string | null
  status: LeadStatus
  source: string
  created_at: string
}

export interface Vendor {
  id: string
  name: string
  category: VendorCategory
  description: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  website: string | null
  logo_url: string | null
  lat: number | null
  lng: number | null
  featured: boolean
  active: boolean
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string | null
  body: string | null
  body_html: string | null
  category: string | null
  cover_image_url: string | null
  reading_time_min: number | null
  status: ArticleStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface SeoPage {
  id: string
  slug: string
  title: string
  h1: string | null
  meta_description: string | null
  og_image: string | null
  intro: string | null
  body_html: string | null
  filter_listing_type: ListingType | null
  filter_property_type: PropertyType | null
  filter_district: string | null
  active: boolean
  created_at: string
  updated_at: string
}

// ─── Joined / extended types ───────────────────────────────────────────────────

export interface ListingWithImage extends Listing {
  listing_images: ListingImage[] | null
}

export interface ListingWithAgent extends Listing {
  listing_images: ListingImage[] | null
  agents: Agent | null
}

// ─── Search params ─────────────────────────────────────────────────────────────

export interface ListingSearchParams {
  q?: string
  type?: ListingType
  propertyType?: PropertyType
  priceMin?: number
  priceMax?: number
  bedroomsMin?: number
  bathroomsMin?: number
  features?: string[]
  lat?: number
  lng?: number
  radiusKm?: number
  sort?: 'newest' | 'price_asc' | 'price_desc'
  page?: number
  limit?: number
}

// ─── Database generic for Supabase client ─────────────────────────────────────
// This tells @supabase/supabase-js what shape the DB has for auto-complete and type safety.
// Once migrations are applied, replace with generated types from:
//   npx supabase gen types typescript --project-id wlusrkrnwwxaozqouqhn

export type Database = {
  public: {
    Tables: {
      agents: {
        Row: Agent
        Insert: Omit<Agent, 'id' | 'active_listings_count' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Agent, 'id' | 'created_at' | 'updated_at'>>
      }
      listings: {
        Row: Listing
        Insert: Omit<Listing, 'id' | 'lead_count' | 'view_count' | 'fts' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Listing, 'id' | 'created_at' | 'updated_at'>>
      }
      listing_images: {
        Row: ListingImage
        Insert: Omit<ListingImage, 'id' | 'created_at'>
        Update: Partial<Omit<ListingImage, 'id' | 'created_at'>>
      }
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at'>
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>
      }
      vendors: {
        Row: Vendor
        Insert: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Vendor, 'id' | 'created_at' | 'updated_at'>>
      }
      articles: {
        Row: Article
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Article, 'id' | 'created_at' | 'updated_at'>>
      }
      seo_pages: {
        Row: SeoPage
        Insert: Omit<SeoPage, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<SeoPage, 'id' | 'created_at' | 'updated_at'>>
      }
    }
    Views: Record<string, never>
    Functions: {
      search_listings: {
        Args: {
          p_query?: string
          p_listing_type?: string
          p_property_type?: string
          p_price_min?: number
          p_price_max?: number
          p_bedrooms_min?: number
          p_lat?: number
          p_lng?: number
          p_radius_km?: number
          p_limit?: number
          p_offset?: number
        }
        Returns: Listing[]
      }
    }
    Enums: {
      listing_type_enum: ListingType
      property_type_enum: PropertyType
      listing_status_enum: ListingStatus
      vendor_category_enum: VendorCategory
      lead_status_enum: LeadStatus
      article_status_enum: ArticleStatus
    }
  }
}
