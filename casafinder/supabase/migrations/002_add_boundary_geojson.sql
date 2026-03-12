-- =============================================================================
-- Add boundary_geojson column to listings
-- Stores GeoJSON FeatureCollection for lot/parcel boundaries
-- Run via: psql $DATABASE_URL -f 002_add_boundary_geojson.sql
--          OR paste into Supabase Dashboard → SQL Editor
-- =============================================================================

ALTER TABLE listings
  ADD COLUMN IF NOT EXISTS boundary_geojson jsonb;
