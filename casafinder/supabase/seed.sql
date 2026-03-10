-- =============================================================================
-- CasaFinder — Seed Data (Ojochal, Costa Rica)
-- Run AFTER 001_initial_schema.sql
-- =============================================================================

-- ─── Test Agent User ──────────────────────────────────────────────────────────
INSERT INTO users (id, email, name, phone, role, locale) VALUES
  ('00000000-0000-0000-0000-000000000001', 'agent@casafinder.test', 'Maria Gonzalez', '+506 8888-1234', 'agent', 'es'),
  ('00000000-0000-0000-0000-000000000002', 'buyer@casafinder.test', 'John Smith', '+1 555-0100', 'buyer', 'en'),
  ('00000000-0000-0000-0000-000000000003', 'admin@casafinder.test', 'CasaFinder Admin', NULL, 'admin', 'en');

INSERT INTO agents (id, user_id, company_name, license_number, bio, phone_whatsapp, service_areas, languages, subscription_tier, verified) VALUES
  ('00000000-0000-0000-0000-000000000010',
   '00000000-0000-0000-0000-000000000001',
   'Osa Pacific Realty',
   'CCCBR-12345',
   'Specializing in the Southern Pacific zone of Costa Rica for over 15 years. Expert in Ojochal, Uvita, and Dominical.',
   '+506 8888-1234',
   ARRAY['Ojochal', 'Uvita', 'Dominical', 'Cortez'],
   ARRAY['en', 'es'],
   'pro',
   true);

-- ─── Sample Listings (Ojochal area) ───────────────────────────────────────────
INSERT INTO listings (
  id, slug, title, title_en, title_es,
  description, listing_type, property_type, status,
  price_usd, currency_primary,
  bedrooms, bathrooms, area_built_m2, area_lot_m2,
  year_built, furnished,
  latitude, longitude,
  address_text, province, canton, district,
  features, source, agent_id, verified, featured
) VALUES

-- Listing 1: Ocean view house for sale
(
  '10000000-0000-0000-0000-000000000001',
  'casa-vista-oceano-ojochal',
  'Ocean View Home in Ojochal',
  'Ocean View Home in Ojochal',
  'Casa con Vista al Océano en Ojochal',
  'Stunning 3-bedroom, 2-bathroom home with panoramic ocean views. Fully furnished, solar panels, rainwater collection system, infinity pool. Walking distance to restaurants and beach access.',
  'sale', 'house', 'active',
  385000, 'USD',
  3, 2.0, 180, 2500,
  2019, 'fully',
  9.0912, -83.6478,
  'Ojochal de Osa, Puntarenas, Costa Rica',
  'Puntarenas', 'Osa', 'Ojochal',
  '{"pool": true, "solar": true, "water_tank": true, "ocean_view": true, "air_conditioning": true, "furnished": true, "gated": false}',
  'manual',
  '00000000-0000-0000-0000-000000000010',
  true, true
),

-- Listing 2: Lot for sale
(
  '10000000-0000-0000-0000-000000000002',
  'lote-vista-mar-ojochal',
  'Ocean View Lot - Build Your Dream Home',
  'Ocean View Lot - Build Your Dream Home',
  'Lote con Vista al Mar - Construye Tu Hogar',
  'Prime development lot with ocean views in the heart of Ojochal. All utilities at the property line (electricity, water, fiber internet). Gentle slope, ideal for tropical home design. Title deed clear.',
  'sale', 'lot', 'active',
  95000, 'USD',
  NULL, NULL, NULL, 1200,
  NULL, NULL,
  9.0889, -83.6501,
  'Ojochal de Osa, Puntarenas, Costa Rica',
  'Puntarenas', 'Osa', 'Ojochal',
  '{"ocean_view": true, "utilities_connected": true, "road_access": true, "title_clear": true}',
  'manual',
  '00000000-0000-0000-0000-000000000010',
  true, false
),

-- Listing 3: Long-term rental
(
  '10000000-0000-0000-0000-000000000003',
  'alquiler-casa-ojochal-amueblada',
  'Furnished 2BR House for Rent - Ojochal',
  'Furnished 2BR House for Rent - Ojochal',
  'Casa Amueblada 2 Habitaciones en Alquiler - Ojochal',
  'Comfortable 2-bedroom furnished home perfect for expats or digital nomads. Fast fiber internet, large covered terrace, tropical garden, parking. Quiet neighborhood, 5 min drive to Ojochal center.',
  'rent', 'house', 'active',
  1200, 'USD',
  2, 1.5, 120, 600,
  2015, 'fully',
  9.0878, -83.6521,
  'Ojochal de Osa, Puntarenas, Costa Rica',
  'Puntarenas', 'Osa', 'Ojochal',
  '{"furnished": true, "fiber_internet": true, "parking": true, "air_conditioning": false, "water_tank": true}',
  'manual',
  '00000000-0000-0000-0000-000000000010',
  true, false
),

-- Listing 4: Vacation rental
(
  '10000000-0000-0000-0000-000000000004',
  'villa-tropical-vacation-rental-ojochal',
  'Luxury Tropical Villa - Vacation Rental',
  'Luxury Tropical Villa - Vacation Rental',
  'Villa Tropical de Lujo - Alquiler Vacacional',
  'Spectacular 4-bedroom villa with private infinity pool and jungle-to-ocean views. Fully equipped, A/C in all rooms, chef''s kitchen, outdoor shower. Available nightly and weekly.',
  'rent_vacation', 'house', 'active',
  350, 'USD',
  4, 3.5, 280, 3000,
  2021, 'fully',
  9.0935, -83.6445,
  'Ojochal de Osa, Puntarenas, Costa Rica',
  'Puntarenas', 'Osa', 'Ojochal',
  '{"pool": true, "solar": true, "ocean_view": true, "jungle_view": true, "air_conditioning": true, "furnished": true, "chef_kitchen": true}',
  'manual',
  '00000000-0000-0000-0000-000000000010',
  true, true
),

-- Listing 5: Small farm/finca
(
  '10000000-0000-0000-0000-000000000005',
  'finca-productiva-ojochal-uvita',
  'Productive Farm - Between Ojochal and Uvita',
  'Productive Farm 5 Hectares - Between Ojochal and Uvita',
  'Finca Productiva 5 Hectáreas - Entre Ojochal y Uvita',
  '5-hectare farm with existing fruit trees (mango, papaya, cacao), year-round stream, 1BR caretaker house, and approved building site with ocean view. Perfect for sustainable agriculture or eco-development.',
  'sale', 'farm', 'active',
  250000, 'USD',
  1, 1.0, 45, 50000,
  2005, 'unfurnished',
  9.0820, -83.6390,
  'Entre Ojochal y Uvita, Puntarenas, Costa Rica',
  'Puntarenas', 'Osa', 'Ojochal',
  '{"stream": true, "fruit_trees": true, "ocean_view": true, "road_access": true, "caretaker_house": true}',
  'manual',
  '00000000-0000-0000-0000-000000000010',
  true, false
);

-- ─── Sample Vendors ───────────────────────────────────────────────────────────
INSERT INTO vendors (
  id, business_name, slug, category,
  description, phone_whatsapp, email, website,
  service_areas, languages, verified, featured
) VALUES
(
  '20000000-0000-0000-0000-000000000001',
  'Ojochal Solar Solutions',
  'ojochal-solar-solutions',
  'solar',
  'Full solar installation and maintenance for residential and commercial properties in the Southern Pacific zone. 10-year warranty, licensed installers.',
  '+506 8777-2222',
  'info@ojochalsolar.com',
  'https://ojochalsolar.com',
  ARRAY['Ojochal', 'Uvita', 'Dominical'],
  ARRAY['en', 'es'],
  true, true
),
(
  '20000000-0000-0000-0000-000000000002',
  'Pacific Coast Construction',
  'pacific-coast-construction',
  'contractor',
  'General contractor specializing in tropical home construction. Custom builds, renovations, and pool installation. Over 200 projects in Osa and Ballena.',
  '+506 8666-3333',
  'builds@pacificcoastcr.com',
  NULL,
  ARRAY['Ojochal', 'Uvita', 'Cortez', 'Palmar'],
  ARRAY['en', 'es'],
  true, false
),
(
  '20000000-0000-0000-0000-000000000003',
  'Abogados del Sur',
  'abogados-del-sur',
  'lawyer',
  'Real estate law specialists. Title searches, purchase agreements, corporation setup, residency applications. English and Spanish services.',
  '+506 8555-4444',
  'legal@abogadosdelsur.cr',
  NULL,
  ARRAY['Ojochal', 'Ciudad Cortez', 'Palmar Norte'],
  ARRAY['en', 'es'],
  true, false
);

-- ─── Sample SEO Pages ─────────────────────────────────────────────────────────
INSERT INTO seo_pages (slug, page_type, title, meta_description, h1, district, canton, province, listing_count) VALUES
('ojochal-homes-for-sale',
 'district_sale',
 'Homes for Sale in Ojochal, Costa Rica | CasaFinder',
 'Browse homes for sale in Ojochal, Costa Rica. Find ocean view houses, jungle lots, and farms in the Southern Pacific zone.',
 'Homes for Sale in Ojochal, Costa Rica',
 'Ojochal', 'Osa', 'Puntarenas', 3),

('ojochal-homes-for-rent',
 'district_rent',
 'Homes for Rent in Ojochal, Costa Rica | CasaFinder',
 'Find furnished and unfurnished homes for rent in Ojochal, Costa Rica. Long-term and vacation rentals available.',
 'Homes for Rent in Ojochal, Costa Rica',
 'Ojochal', 'Osa', 'Puntarenas', 2),

('lots-for-sale-ojochal',
 'property_type_district',
 'Lots & Land for Sale in Ojochal | CasaFinder',
 'Discover ocean view lots and development land for sale in Ojochal, Costa Rica. Build your dream tropical home.',
 'Lots and Land for Sale in Ojochal',
 'Ojochal', 'Osa', 'Puntarenas', 1),

('ojochal-real-estate',
 'district_sale',
 'Ojochal Real Estate | CasaFinder',
 'Ojochal real estate listings — houses, lots, farms, and vacation rentals in Costa Rica''s Southern Pacific zone.',
 'Ojochal, Costa Rica Real Estate',
 'Ojochal', 'Osa', 'Puntarenas', 5);

-- ─── Sample How-To Article ────────────────────────────────────────────────────
INSERT INTO articles (slug, title, category, tags, seo_title, seo_description, published, published_at, author_id) VALUES
(
  'how-to-install-solar-panels-costa-rica',
  'How to Install Solar Panels in Costa Rica: A Complete Guide',
  'how_to',
  ARRAY['solar', 'diy', 'sustainability', 'energy'],
  'Solar Panel Installation in Costa Rica — Complete Guide | CasaFinder',
  'Step-by-step guide to installing solar panels in Costa Rica. Permits, costs, contractors, and tips for the Southern Pacific zone.',
  true,
  now(),
  '00000000-0000-0000-0000-000000000003'
),
(
  'buying-property-costa-rica-guide',
  'The Expat''s Guide to Buying Property in Costa Rica',
  'guide',
  ARRAY['buying', 'expat', 'legal', 'permits', 'title'],
  'How to Buy Property in Costa Rica — Expat Guide | CasaFinder',
  'Everything you need to know about buying property in Costa Rica as a foreigner. Title searches, closing costs, residency, and more.',
  true,
  now(),
  '00000000-0000-0000-0000-000000000003'
);
