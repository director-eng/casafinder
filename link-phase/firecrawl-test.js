/**
 * CasaFinder — Firecrawl Extraction Test
 *
 * Tests the Firecrawl /extract endpoint against Encuentra24 (priority target)
 * and a simple regional site (Osa Tropical) to validate extraction quality.
 *
 * Run: node firecrawl-test.js
 * Requires: FIRECRAWL_API_KEY env var (or hardcoded below)
 */

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-ac3818da52dd47bca7962330c19eca19';
const BASE_URL = 'https://api.firecrawl.dev/v1';

// ─── Schema for structured listing extraction ────────────────────────────────
const LISTING_SCHEMA = {
  type: 'object',
  properties: {
    listings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title:       { type: 'string', description: 'Property listing title' },
          price:       { type: 'number', description: 'Price as a number, no symbols' },
          currency:    { type: 'string', enum: ['USD', 'CRC'], description: 'USD or CRC' },
          bedrooms:    { type: 'integer', description: 'Number of bedrooms' },
          bathrooms:   { type: 'number',  description: 'Number of bathrooms (can be 1.5)' },
          area_m2:     { type: 'number',  description: 'Property area in square meters' },
          area_lot_m2: { type: 'number',  description: 'Lot area in square meters if available' },
          address:     { type: 'string',  description: 'Full address or location description' },
          district:    { type: 'string',  description: 'District/neighborhood name' },
          description: { type: 'string',  description: 'First 300 chars of listing description' },
          property_type: {
            type: 'string',
            enum: ['house', 'condo', 'lot', 'commercial', 'farm', 'apartment', 'other'],
          },
          listing_type: {
            type: 'string',
            enum: ['sale', 'rent', 'rent_vacation'],
          },
          image_urls:  { type: 'array', items: { type: 'string' }, description: 'Main image URLs' },
          source_url:  { type: 'string', description: 'Direct URL to the full listing page' },
          agent_name:  { type: 'string', description: 'Agent or agency name if shown' },
          agent_phone: { type: 'string', description: 'Contact phone if shown' },
        },
        required: ['title', 'price', 'source_url'],
      },
    },
  },
  required: ['listings'],
};

// ─── API helper ──────────────────────────────────────────────────────────────
async function firecrawlRequest(endpoint, payload) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err.slice(0, 200)}`);
  }
  return res.json();
}

// ─── Test 1: Scrape a single listing page (markdown) ─────────────────────────
async function testScrape(url, label) {
  console.log(`\n🔍 ${label} — /scrape`);
  console.log(`   URL: ${url}`);
  try {
    const result = await firecrawlRequest('/scrape', {
      url,
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 2000, // Wait 2s for JS to render
    });
    if (result.success) {
      const preview = (result.data?.markdown || '').slice(0, 400);
      console.log(`   ✅ Success — markdown preview:\n${preview.split('\n').map(l => '      ' + l).join('\n')}`);
      return true;
    } else {
      console.log(`   ❌ Failed: ${result.error}`);
      return false;
    }
  } catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
    return false;
  }
}

// ─── Test 2: Extract structured listings (AI extraction) ─────────────────────
async function testExtract(url, label) {
  console.log(`\n🤖 ${label} — /extract (AI structured)`);
  console.log(`   URL: ${url}`);
  try {
    const result = await firecrawlRequest('/extract', {
      urls: [url],
      prompt: `Extract all real estate property listings from this page.
        For each listing, capture: title, price (number only), currency (USD or CRC),
        bedrooms, bathrooms, area in m², address/location, property type,
        whether it is for sale or rent, up to 3 image URLs,
        and the direct URL to the full listing page (source_url).
        Focus on Ojochal, Dominical, Uvita, or Osa Peninsula area properties.
        Do not include listings without a price.`,
      schema: LISTING_SCHEMA,
    });

    if (result.success) {
      const listings = result.data?.listings || [];
      console.log(`   ✅ Success — extracted ${listings.length} listing(s)`);
      if (listings.length > 0) {
        const first = listings[0];
        console.log(`   📋 First listing sample:`);
        console.log(`      Title:    ${first.title || 'N/A'}`);
        console.log(`      Price:    ${first.currency || '?'} ${first.price || 'N/A'}`);
        console.log(`      Type:     ${first.property_type || 'N/A'} | ${first.listing_type || 'N/A'}`);
        console.log(`      Beds/Bath:${first.bedrooms || '?'} bed / ${first.bathrooms || '?'} bath`);
        console.log(`      Area:     ${first.area_m2 || '?'} m²`);
        console.log(`      Location: ${first.address || first.district || 'N/A'}`);
        console.log(`      URL:      ${(first.source_url || 'N/A').slice(0, 80)}`);
        console.log(`      Images:   ${(first.image_urls || []).length} found`);
      }
      return listings;
    } else {
      console.log(`   ❌ Extract failed: ${result.error}`);
      return [];
    }
  } catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
    return [];
  }
}

// ─── Test 3: Crawl a site map ─────────────────────────────────────────────────
async function testMapUrl(url, label) {
  console.log(`\n🗺  ${label} — /map (discover listing URLs)`);
  console.log(`   URL: ${url}`);
  try {
    const result = await firecrawlRequest('/map', {
      url,
      search: 'ojochal real estate',
      limit: 20,
    });
    if (result.success) {
      const urls = result.links || [];
      console.log(`   ✅ Success — found ${urls.length} URLs`);
      // Filter to likely listing pages
      const listingUrls = urls.filter(u =>
        u.match(/propert|listing|casa|house|lot|terreno|venta|alquiler/i)
      );
      console.log(`   📋 Likely listing URLs: ${listingUrls.length}`);
      listingUrls.slice(0, 5).forEach(u => console.log(`      ${u}`));
      return listingUrls;
    } else {
      console.log(`   ❌ Map failed: ${result.error}`);
      return [];
    }
  } catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
    return [];
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('============================================================');
  console.log('  CasaFinder — Firecrawl Connection & Extraction Tests');
  console.log(`  API Key: ${FIRECRAWL_API_KEY.slice(0, 8)}...${FIRECRAWL_API_KEY.slice(-4)}`);
  console.log('============================================================');

  const results = { passed: 0, failed: 0 };

  // --- Test Firecrawl API health ---
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' TEST 1: Osa Tropical Properties (simple HTML site)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const osaScrapeOk = await testScrape(
    'https://osatropicalproperties.com/properties/',
    'Osa Tropical — listings page'
  );
  osaScrapeOk ? results.passed++ : results.failed++;

  const osaListings = await testExtract(
    'https://osatropicalproperties.com/properties/',
    'Osa Tropical — AI extraction'
  );
  osaListings.length > 0 ? results.passed++ : results.failed++;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' TEST 2: Encuentra24 (largest CR classifieds — JS heavy)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const e24ScrapeOk = await testScrape(
    'https://www.encuentra24.com/costa-rica-en/real-estate-for-sale-property?q=ojochal',
    'Encuentra24 — Ojochal for-sale search'
  );
  e24ScrapeOk ? results.passed++ : results.failed++;

  const e24Listings = await testExtract(
    'https://www.encuentra24.com/costa-rica-en/real-estate-for-sale-property?q=ojochal',
    'Encuentra24 — AI extraction'
  );
  e24Listings.length > 0 ? results.passed++ : results.failed++;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' TEST 3: URL Discovery (map)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const osaUrls = await testMapUrl(
    'https://osatropicalproperties.com',
    'Osa Tropical — site map'
  );
  osaUrls.length > 0 ? results.passed++ : results.failed++;

  // ─── Summary ─────────────────────────────────────────────────────────────
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(` RESULTS: ✅ ${results.passed} passed | ❌ ${results.failed} failed`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (results.failed === 0) {
    console.log('\n🟢 All Firecrawl tests passed — scraping pipeline validated');
  } else if (results.passed > results.failed) {
    console.log('\n🟡 Partial pass — review failed tests above');
    console.log('   If Encuentra24 fails: try adding Bright Data proxy in production');
    console.log('   If extract returns 0 listings: adjust the prompt or schema');
  } else {
    console.log('\n🔴 Most tests failed — check API key and network access');
  }

  // ─── Save results ─────────────────────────────────────────────────────────
  const fs = await import('fs');
  const output = {
    timestamp: new Date().toISOString(),
    api_key_prefix: FIRECRAWL_API_KEY.slice(0, 8),
    results,
    osa_tropical: { scraped: osaScrapeOk, listings_extracted: osaListings.length, sample: osaListings[0] || null },
    encuentra24: { scraped: e24ScrapeOk, listings_extracted: e24Listings.length, sample: e24Listings[0] || null },
    osa_urls_found: osaUrls.length,
  };
  fs.writeFileSync('firecrawl-results.json', JSON.stringify(output, null, 2));
  console.log('\n📄 Full results saved to: firecrawl-results.json');
}

main().catch(console.error);
