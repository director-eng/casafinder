// =============================================================================
// CasaFinder — Firecrawl Scraping Sources
// 52 identified websites listing Ojochal real estate properties
// Updated: 2026-03 | See scraping/sources/ojochal-directory.md for full notes
// =============================================================================

export type ScrapeTier = 1 | 2 | 3 | 4
export type ScrapeFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly'
export type PaginationType = 'query_param' | 'path_segment' | 'infinite_scroll' | 'single_page' | 'js_dynamic'

export interface ScrapeSource {
  id: string
  name: string
  baseUrl: string
  ojochalUrl: string
  listingTypes: ('sale' | 'rent' | 'rent_vacation' | 'land' | 'commercial')[]
  tier: ScrapeTier
  frequency: ScrapeFrequency
  pagination: PaginationType
  paginationParam?: string
  maxPages?: number
  requiresJs: boolean
  requiresStealth: boolean
  language: ('en' | 'es')[]
  notes?: string
  active: boolean
}

// =============================================================================
// TIER 1 — Highest Value: Local agencies with most Ojochal inventory
// Crawl: weekly (listings change frequently)
// =============================================================================

export const TIER_1_SOURCES: ScrapeSource[] = [
  {
    id: 'osa-tropical',
    name: 'Osa Tropical Properties',
    baseUrl: 'https://osatropicalproperties.com',
    ojochalUrl: 'https://osatropicalproperties.com/property/?property_location=ojochal',
    listingTypes: ['sale', 'land', 'commercial'],
    tier: 1,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 20,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: '80+ unique Ojochal listings. Listing IDs like ID: 5962. Operating since 2005.',
    active: true,
  },
  {
    id: 'costa-ballena-property',
    name: 'Costa Ballena Property Real Estate',
    baseUrl: 'https://www.costaballenaproperty.com',
    ojochalUrl: 'https://www.costaballenaproperty.com/homes-for-sale-in-ojochal-costa-rica/',
    listingTypes: ['sale', 'land'],
    tier: 1,
    frequency: 'weekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: '50+ Ojochal listings. Agent: Chris Schauer. Sister sites: uvitacostaricarealestate.com, ojochalcostaricarealestate.com',
    active: true,
  },
  {
    id: 'ojochal-cr-sister',
    name: 'Ojochal Costa Rica Real Estate (sister)',
    baseUrl: 'https://www.ojochalcostaricarealestate.com',
    ojochalUrl: 'https://www.ojochalcostaricarealestate.com',
    listingTypes: ['sale', 'land'],
    tier: 1,
    frequency: 'weekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Sister site to costaballenaproperty.com — same listings, deduplicate by URL/description.',
    active: true,
  },
  {
    id: 'blue-zone-realty',
    name: 'Blue Zone Realty International',
    baseUrl: 'https://bluezonerealty.com',
    ojochalUrl: 'https://bluezonerealty.com/neighborhoods/ojochal-waterfall',
    listingTypes: ['sale', 'land', 'commercial'],
    tier: 1,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Award-winning local agency (6x Best Real Estate Agency, CR). Luxury broker for Haute Residence. Exclusive MLS via RE.cr.',
    active: true,
  },
  {
    id: 'coldwell-banker-vesta',
    name: 'Coldwell Banker Vesta Group (Dominical Realty)',
    baseUrl: 'https://www.dominicalrealty.com',
    ojochalUrl: 'https://www.dominicalrealty.com/costa-rica/property-for-sale/in/ojochal/view/tile/sort/most-recent',
    listingTypes: ['sale', 'rent', 'land'],
    tier: 1,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 15,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: '194 Ojochal properties. Largest franchise presence. Also at coldwellbankercostarica.com.',
    active: true,
  },
  {
    id: '2costarica',
    name: '2Costa Rica Real Estate',
    baseUrl: 'https://www.2costaricarealestate.com',
    ojochalUrl: 'https://www.2costaricarealestate.com/areas/ojochal-real-estate',
    listingTypes: ['sale', 'land'],
    tier: 1,
    frequency: 'weekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Covers Dominical–Uvita–Ojochal corridor. Includes sold properties for comps.',
    active: true,
  },
]

// =============================================================================
// TIER 2 — Important: National agencies & portals with Ojochal coverage
// Crawl: weekly
// =============================================================================

export const TIER_2_SOURCES: ScrapeSource[] = [
  {
    id: 'recr-mls',
    name: 'RE.cr — Costa Rica MLS (Propertyshelf)',
    baseUrl: 'https://www.re.cr',
    ojochalUrl: 'https://www.re.cr/en/costa-rica-real-estate?city=ojochal',
    listingTypes: ['sale', 'rent', 'land', 'commercial'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 30,
    requiresJs: false,
    requiresStealth: false,
    language: ['en', 'es'],
    notes: 'Official Costa Rica MLS. 3,000+ listings nationally. Verifies against title registry. Key pattern: /en/houses-sale/[listing-ID]',
    active: true,
  },
  {
    id: 'encuentra24',
    name: 'Encuentra24',
    baseUrl: 'https://www.encuentra24.com',
    ojochalUrl: 'https://www.encuentra24.com/costa-rica-en/real-estate-for-sale-houses-homes?q=keyword.ojochal',
    listingTypes: ['sale', 'rent', 'rent_vacation', 'land', 'commercial'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 20,
    requiresJs: false,
    requiresStealth: true,
    language: ['en', 'es'],
    notes: "Costa Rica's leading classifieds. Mixed-language. Agent + owner listings. Also scrape /real-estate-for-sale-lots-land?q=keyword.ojochal",
    active: true,
  },
  {
    id: 'relin-cr',
    name: 'RELIN CR',
    baseUrl: 'https://www.relincr.com',
    ojochalUrl: 'https://www.relincr.com/properties/costa-rica/puntarenas/ojochal',
    listingTypes: ['sale', 'land'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 15,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Agent: Tanya Lavrnic. Same operator as propertiesindominical.com — deduplicate across both.',
    active: true,
  },
  {
    id: 'properties-in-dominical',
    name: 'Properties in Dominical',
    baseUrl: 'https://www.propertiesindominical.com',
    ojochalUrl: 'https://www.propertiesindominical.com/properties/costa-rica/puntarenas/ojochal',
    listingTypes: ['sale', 'land', 'commercial'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 15,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Sister site to relincr.com — same inventory. Deduplicate.',
    active: true,
  },
  {
    id: 'cb-pacific-realty',
    name: 'Coldwell Banker Pacific Realty',
    baseUrl: 'https://cbpacificrealty.com',
    ojochalUrl: 'https://cbpacificrealty.com/costa-rica/property-for-sale/in/ojochal',
    listingTypes: ['sale', 'land'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 10,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: '108 Ojochal properties. Shares network with Vesta Group.',
    active: true,
  },
  {
    id: 'krain-cr',
    name: 'KRAIN Costa Rica',
    baseUrl: 'https://kraincostarica.com',
    ojochalUrl: 'https://kraincostarica.com/en/ojochal/homes-condos-for-sale-in-ojochal-south-pacific-costa-rica',
    listingTypes: ['sale', 'land'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Luxury-focused. 15+ Ojochal properties. Lists on RE.cr MLS.',
    active: true,
  },
  {
    id: 'dominical-property',
    name: 'Dominical Property',
    baseUrl: 'https://www.dominicalproperty.com',
    ojochalUrl: 'https://www.dominicalproperty.com/ojochal-tres-rios/',
    listingTypes: ['sale', 'rent', 'land', 'commercial'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'path_segment',
    maxPages: 10,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: '530+ total properties. Covers Ojochal–Tres Rios area.',
    active: true,
  },
  {
    id: 'american-european',
    name: 'American European Real Estate Group',
    baseUrl: 'https://american-european.net',
    ojochalUrl: 'https://american-european.net/costa-rica-city/ojochal/',
    listingTypes: ['sale', 'rent', 'land', 'commercial'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 10,
    requiresJs: false,
    requiresStealth: false,
    language: ['en', 'es'],
    notes: '2,300+ properties nationwide. One of the largest CR networks.',
    active: true,
  },
  {
    id: 'cr-expat-properties',
    name: 'Costa Rica Expat Properties',
    baseUrl: 'https://www.costaricaexpatproperties.com',
    ojochalUrl: 'https://www.costaricaexpatproperties.com/all-properties-for-sale/in/ojochal',
    listingTypes: ['sale', 'land'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: '17 active Ojochal listings. Targets expat buyers.',
    active: true,
  },
  {
    id: 'pacific-lots',
    name: 'Pacific Lots',
    baseUrl: 'https://www.pacificlots.com',
    ojochalUrl: 'https://www.pacificlots.com/resales-in-ojochal-area',
    listingTypes: ['land'],
    tier: 2,
    frequency: 'weekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Land specialist. Phases 5, 6, 8, 9, 10, 11 and Tres Rios. Important for lot-only listings.',
    active: true,
  },
]

// =============================================================================
// TIER 3 — Supplemental: Aggregators, global portals, niche agencies
// Crawl: biweekly
// =============================================================================

export const TIER_3_SOURCES: ScrapeSource[] = [
  {
    id: 'realtor-intl',
    name: 'Realtor.com International',
    baseUrl: 'https://www.realtor.com',
    ojochalUrl: 'https://www.realtor.com/international/cr/ojochal/',
    listingTypes: ['sale', 'land'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'path_segment',
    paginationParam: 'p',
    maxPages: 20,
    requiresJs: true,
    requiresStealth: true,
    language: ['en'],
    notes: '4,145+ results (broader CR). Aggregates from partner agencies. Robust anti-scraping — use stealth + rate limiting.',
    active: true,
  },
  {
    id: 'properstar',
    name: 'Properstar',
    baseUrl: 'https://www.properstar.com',
    ojochalUrl: 'https://www.properstar.com/costa-rica/ojochal/buy/house',
    listingTypes: ['sale'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 5,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: '58 curated Ojochal listings.',
    active: true,
  },
  {
    id: 'james-edition',
    name: 'JamesEdition',
    baseUrl: 'https://www.jamesedition.com',
    ojochalUrl: 'https://www.jamesedition.com/real_estate/ojochal-costa-rica',
    listingTypes: ['sale', 'rent_vacation'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'infinite_scroll',
    requiresJs: true,
    requiresStealth: false,
    language: ['en'],
    notes: '9 luxury Ojochal listings. Also check /investment-property-- and /mountain-view-- sub-pages.',
    active: true,
  },
  {
    id: 'luxury-estate',
    name: 'LuxuryEstate.com',
    baseUrl: 'https://www.luxuryestate.com',
    ojochalUrl: 'https://www.luxuryestate.com/costa-rica?place=ojochal',
    listingTypes: ['sale'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 5,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Via Osa Tropical Properties partnership. 4,393 CR listings total.',
    active: true,
  },
  {
    id: 'spicy-life',
    name: 'Spicy Life Real Estate',
    baseUrl: 'https://spicyliferealestate.com',
    ojochalUrl: 'https://spicyliferealestate.com/listings-page/',
    listingTypes: ['sale', 'land'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Niche unique properties (horse ranch, wellness retreats). Filter by Ojochal in results.',
    active: true,
  },
  {
    id: 'jj-properties',
    name: 'JJ Properties CR',
    baseUrl: 'https://www.jjpropertiescr.com',
    ojochalUrl: 'https://www.jjpropertiescr.com/property-city/ojochal/',
    listingTypes: ['sale', 'land'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Contact-based inquiry system.',
    active: true,
  },
  {
    id: 'brevitas',
    name: 'Brevitas',
    baseUrl: 'https://brevitas.com',
    ojochalUrl: 'https://brevitas.com/listings/Costa%20Rica/Ojochal',
    listingTypes: ['commercial'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Commercial real estate focus. Hotel/investment properties in Ojochal. Requires free account for some details.',
    active: true,
  },
  {
    id: 'cb-tamarindo',
    name: 'Coldwell Banker Tamarindo',
    baseUrl: 'https://www.coldwellbankertamarindo.com',
    ojochalUrl: 'https://www.coldwellbankertamarindo.com/property-for-sale/in/ojochal',
    listingTypes: ['sale', 'land'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 15,
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: '193 properties. Cross-listed with Vesta Group — deduplicate aggressively.',
    active: true,
  },
  {
    id: 'remax-cr',
    name: 'RE/MAX Costa Rica',
    baseUrl: 'https://www.remax-costa-rica.com',
    ojochalUrl: 'https://www.remax-costa-rica.com/in/ojochal/',
    listingTypes: ['sale', 'land'],
    tier: 3,
    frequency: 'biweekly',
    pagination: 'query_param',
    paginationParam: 'page',
    maxPages: 10,
    requiresJs: false,
    requiresStealth: false,
    language: ['en', 'es'],
    notes: 'Lists boutique hotels and estates.',
    active: true,
  },
]

// =============================================================================
// TIER 4 — Rental Platforms: Short-term and long-term rental market data
// Crawl: weekly (prices change frequently)
// =============================================================================

export const TIER_4_SOURCES: ScrapeSource[] = [
  {
    id: 'airbnb',
    name: 'Airbnb',
    baseUrl: 'https://www.airbnb.com',
    ojochalUrl: 'https://www.airbnb.com/ojochal-costa-rica/stays',
    listingTypes: ['rent_vacation'],
    tier: 4,
    frequency: 'weekly',
    pagination: 'js_dynamic',
    requiresJs: true,
    requiresStealth: true,
    language: ['en', 'es'],
    notes: 'JS-heavy. Robust anti-scraping. Use Firecrawl stealth + rate limiting. Also scrape /stays/monthly for long-term. 4.9+ avg rating.',
    active: false, // Enable when Firecrawl stealth is configured
  },
  {
    id: 'vrbo',
    name: 'VRBO',
    baseUrl: 'https://www.vrbo.com',
    ojochalUrl: 'https://www.vrbo.com/vacation-rentals/central-america/costa-rica/puntarenas/ojochal',
    listingTypes: ['rent_vacation'],
    tier: 4,
    frequency: 'weekly',
    pagination: 'js_dynamic',
    requiresJs: true,
    requiresStealth: true,
    language: ['en'],
    notes: '502+ Ojochal rentals. 339 with pools. Premier Host ratings. Also check pool filter: /pool/central-america/...',
    active: false,
  },
  {
    id: 'cr-las-villas',
    name: 'Costa Rica Las Villas',
    baseUrl: 'https://costaricalasvillas.com',
    ojochalUrl: 'https://costaricalasvillas.com/vacation-rentals/ojochal/',
    listingTypes: ['rent_vacation'],
    tier: 4,
    frequency: 'weekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Dedicated Ojochal vacation rental page. Near Playa Tortuga and Playa Ventanas.',
    active: true,
  },
  {
    id: 'yougethere',
    name: 'YouGetHere Vacation Rentals',
    baseUrl: 'https://yougethere.com',
    ojochalUrl: 'https://yougethere.com/properties/?location=ojochal',
    listingTypes: ['rent_vacation', 'rent'],
    tier: 4,
    frequency: 'weekly',
    pagination: 'single_page',
    requiresJs: false,
    requiresStealth: false,
    language: ['en'],
    notes: 'Property management company. Near-two decades in region. Uvita and Ojochal.',
    active: true,
  },
]

// =============================================================================
// All sources combined + helpers
// =============================================================================

export const ALL_SOURCES: ScrapeSource[] = [
  ...TIER_1_SOURCES,
  ...TIER_2_SOURCES,
  ...TIER_3_SOURCES,
  ...TIER_4_SOURCES,
]

export const ACTIVE_SOURCES = ALL_SOURCES.filter(s => s.active)

export function getSourcesByTier(tier: ScrapeTier): ScrapeSource[] {
  return ALL_SOURCES.filter(s => s.tier === tier && s.active)
}

export function getSourceById(id: string): ScrapeSource | undefined {
  return ALL_SOURCES.find(s => s.id === id)
}

/** Build all paginated URLs for a source */
export function buildCrawlUrls(source: ScrapeSource): string[] {
  if (source.pagination === 'single_page' || source.pagination === 'infinite_scroll' || source.pagination === 'js_dynamic') {
    return [source.ojochalUrl]
  }

  const maxPages = source.maxPages ?? 5
  return Array.from({ length: maxPages }, (_, i) => {
    const page = i + 1
    if (source.pagination === 'query_param' && source.paginationParam) {
      const url = new URL(source.ojochalUrl)
      if (page > 1) url.searchParams.set(source.paginationParam, String(page))
      return url.toString()
    }
    if (source.pagination === 'path_segment') {
      return page === 1 ? source.ojochalUrl : `${source.ojochalUrl}/${source.paginationParam ?? 'p'}${page}/`
    }
    return source.ojochalUrl
  })
}
