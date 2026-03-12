-- Migration: Add boundary_geojson column to listings table
-- Run this in the Supabase SQL editor at:
-- https://supabase.com/dashboard/project/[your-project]/sql
--
-- This column stores the GPS-surveyed lot boundary polygon for a listing,
-- enabling CasaFinder to render the actual cadastral shape on the map.

ALTER TABLE listings
  ADD COLUMN IF NOT EXISTS boundary_geojson JSONB DEFAULT NULL;

COMMENT ON COLUMN listings.boundary_geojson IS
  'GeoJSON FeatureCollection containing the surveyed lot boundary polygon. Used to render actual property boundaries on Leaflet map.';
