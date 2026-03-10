#!/usr/bin/env bash
# =============================================================================
# CasaFinder — Link Phase Connection Validator
# Run this from your LOCAL machine (not VM sandbox)
# Usage: chmod +x validate-connections.sh && ./validate-connections.sh
# =============================================================================

set -euo pipefail

# ─── Colors ───────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS="${GREEN}✅ PASS${NC}"
FAIL="${RED}❌ FAIL${NC}"
SKIP="${YELLOW}⏭  SKIP${NC}"

RESULTS=()

log_pass() { echo -e "${GREEN}✅ $1${NC}"; RESULTS+=("PASS: $1"); }
log_fail() { echo -e "${RED}❌ $1${NC}"; RESULTS+=("FAIL: $1"); }
log_skip() { echo -e "${YELLOW}⏭  $1${NC}"; RESULTS+=("SKIP: $1"); }
log_info() { echo -e "${BLUE}   $1${NC}"; }

# ─── Config ───────────────────────────────────────────────────────────────────
FIRECRAWL_API_KEY="${FIRECRAWL_API_KEY:-fc-ac3818da52dd47bca7962330c19eca19}"
SUPABASE_URL="${SUPABASE_URL:-https://wlusrkrnwwxaozqouqhn.supabase.co}"
SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY:-sb_publishable_awuIZRgFxqhyQ9K3-9bqTg_RDSCkhcl}"
SUPABASE_DB_HOST="${SUPABASE_DB_HOST:-db.wlusrkrnwwxaozqouqhn.supabase.co}"
SUPABASE_DB_PASSWORD="${SUPABASE_DB_PASSWORD:-tosAAmCgpEfSUsk2}"
RESEND_API_KEY="${RESEND_API_KEY:-re_EMe6RaMG_3ZfZRK5CpBGpoHF3ZRUaYDJj}"
GOOGLE_MAPS_API_KEY="${GOOGLE_MAPS_API_KEY:-AIzaSyAOUuPTO4VJcyK0FFzqDp0x2Ivu8e3rCEo}"

echo ""
echo "============================================================"
echo "  CasaFinder — Link Phase Validation"
echo "  $(date)"
echo "============================================================"

# ─── 1. FIRECRAWL ─────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 1. FIRECRAWL API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1a. API key validity
echo -n "1a. API key valid... "
FC_RESPONSE=$(curl -s -w "\n%{http_code}" \
  -H "Authorization: Bearer ${FIRECRAWL_API_KEY}" \
  -H "Content-Type: application/json" \
  "https://api.firecrawl.dev/v1/scrape" \
  -d '{"url":"https://httpbin.org/json","formats":["markdown"]}' 2>/dev/null)
FC_HTTP_CODE=$(echo "$FC_RESPONSE" | tail -1)
FC_BODY=$(echo "$FC_RESPONSE" | head -1)

if [[ "$FC_HTTP_CODE" == "200" ]]; then
  SUCCESS=$(echo "$FC_BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('success','false'))" 2>/dev/null || echo "false")
  if [[ "$SUCCESS" == "True" ]] || [[ "$SUCCESS" == "true" ]]; then
    log_pass "Firecrawl API key valid (HTTP 200, success=true)"
  else
    log_fail "Firecrawl API returned 200 but success=false: $FC_BODY"
  fi
elif [[ "$FC_HTTP_CODE" == "401" ]]; then
  log_fail "Firecrawl API key invalid (HTTP 401)"
else
  log_fail "Firecrawl API unexpected response (HTTP $FC_HTTP_CODE)"
fi

# 1b. Firecrawl extract endpoint (AI extraction)
echo -n "1b. Firecrawl /extract endpoint... "
FC_EXTRACT=$(curl -s -w "\n%{http_code}" \
  -H "Authorization: Bearer ${FIRECRAWL_API_KEY}" \
  -H "Content-Type: application/json" \
  "https://api.firecrawl.dev/v1/extract" \
  -d '{
    "urls": ["https://httpbin.org/json"],
    "prompt": "Extract any key-value pairs you see",
    "schema": {"type":"object","properties":{"slideshow":{"type":"object"}}}
  }' 2>/dev/null)
FC_EXTRACT_CODE=$(echo "$FC_EXTRACT" | tail -1)
if [[ "$FC_EXTRACT_CODE" == "200" ]] || [[ "$FC_EXTRACT_CODE" == "202" ]]; then
  log_pass "Firecrawl /extract endpoint reachable (HTTP $FC_EXTRACT_CODE)"
else
  log_fail "Firecrawl /extract failed (HTTP $FC_EXTRACT_CODE)"
fi

# 1c. Firecrawl CLI installed
echo -n "1c. Firecrawl CLI installed... "
if command -v firecrawl &>/dev/null; then
  FC_VER=$(firecrawl --version 2>/dev/null || echo "unknown")
  log_pass "Firecrawl CLI found: $FC_VER"
elif npx firecrawl-cli --version &>/dev/null 2>&1; then
  log_pass "Firecrawl CLI available via npx"
else
  log_skip "Firecrawl CLI not installed — run: npx -y firecrawl-cli@latest init --all --browser"
fi

# ─── 2. SIRI WMS/WFS ──────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 2. SIRI WMS / WFS (Costa Rica Catastro)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

SIRI_BASE="https://geos.siri.go.cr/Geoservicios"

# 2a. WMS GetCapabilities
echo -n "2a. SIRI WMS GetCapabilities... "
WMS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 \
  "${SIRI_BASE}/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0")
if [[ "$WMS_CODE" == "200" ]]; then
  log_pass "SIRI WMS responding (HTTP 200)"
else
  log_fail "SIRI WMS failed (HTTP $WMS_CODE) — endpoint: ${SIRI_BASE}/wms"
fi

# 2b. WFS GetCapabilities
echo -n "2b. SIRI WFS GetCapabilities... "
WFS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 \
  "${SIRI_BASE}/wfs?SERVICE=WFS&REQUEST=GetCapabilities&VERSION=2.0.0")
if [[ "$WFS_CODE" == "200" ]]; then
  log_pass "SIRI WFS responding (HTTP 200)"
else
  log_fail "SIRI WFS failed (HTTP $WFS_CODE) — endpoint: ${SIRI_BASE}/wfs"
fi

# 2c. WFS GetFeature — actual parcel query for Ojochal
echo -n "2c. SIRI WFS GetFeature (Ojochal parcel query)... "
WFS_FEATURE=$(curl -s --max-time 20 \
  "${SIRI_BASE}/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=SIRI:catastro&BBOX=-83.70,-9.08,-83.65,-9.05,EPSG:4326&OUTPUTFORMAT=application/json&COUNT=2")
if echo "$WFS_FEATURE" | python3 -c "import sys,json; d=json.load(sys.stdin); assert len(d.get('features',[])) > 0" 2>/dev/null; then
  FEAT_COUNT=$(echo "$WFS_FEATURE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('features',[])))" 2>/dev/null)
  FEAT_KEYS=$(echo "$WFS_FEATURE" | python3 -c "import sys,json; d=json.load(sys.stdin); f=d['features'][0]; print(list(f.get('properties',{}).keys())[:6])" 2>/dev/null)
  log_pass "SIRI WFS returned $FEAT_COUNT parcel(s) — properties: $FEAT_KEYS"
else
  log_fail "SIRI WFS GetFeature returned no features or invalid JSON"
  log_info "Response preview: $(echo "$WFS_FEATURE" | head -c 200)"
fi

# 2d. WMS GetFeatureInfo (click popup data)
echo -n "2d. SIRI WMS GetFeatureInfo... "
GFINFO_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 \
  "${SIRI_BASE}/wms?SERVICE=WMS&REQUEST=GetFeatureInfo&VERSION=1.3.0&LAYERS=catastro&QUERY_LAYERS=catastro&INFO_FORMAT=application/json&I=50&J=50&WIDTH=101&HEIGHT=101&CRS=EPSG:4326&BBOX=-83.680,-9.070,-83.670,-9.060")
if [[ "$GFINFO_CODE" == "200" ]]; then
  log_pass "SIRI WMS GetFeatureInfo responding (HTTP 200)"
else
  log_fail "SIRI WMS GetFeatureInfo failed (HTTP $GFINFO_CODE)"
fi

# ─── 3. CATASTRO NACIONAL GEOPORTAL ───────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 3. CATASTRO NACIONAL GEOPORTAL (SNITCR / ArcGIS)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 3a. IGN WMS (used in catastro viewer)
echo -n "3a. IGN 5k WMS (SNITCR)... "
IGN_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 \
  "https://geos.snitcr.go.cr/be/IGN_5mil/wms?SERVICE=WMS&REQUEST=GetCapabilities")
if [[ "$IGN_CODE" == "200" ]]; then
  log_pass "IGN 5k WMS responding (HTTP 200)"
else
  log_fail "IGN 5k WMS failed (HTTP $IGN_CODE)"
fi

# 3b. IGN WFS
echo -n "3b. IGN 5k WFS (SNITCR)... "
IGN_WFS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 \
  "https://geos.snitcr.go.cr/be/IGN_5mil/wfs?SERVICE=WFS&REQUEST=GetCapabilities")
if [[ "$IGN_WFS_CODE" == "200" ]]; then
  log_pass "IGN 5k WFS responding (HTTP 200)"
else
  log_fail "IGN 5k WFS failed (HTTP $IGN_WFS_CODE)"
fi

# 3c. ArcGIS REST (Catastro Hub)
echo -n "3c. ArcGIS REST (Catastro Hub)... "
ARCGIS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 \
  "https://geoportal-catastronacional.hub.arcgis.com/api/v2/datasets?q=catastro&f=json")
if [[ "$ARCGIS_CODE" == "200" ]]; then
  log_pass "Catastro Hub ArcGIS REST responding (HTTP 200)"
else
  log_fail "Catastro Hub ArcGIS REST failed (HTTP $ARCGIS_CODE)"
fi

# ─── 4. SUPABASE ──────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 4. SUPABASE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ -z "$SUPABASE_URL" ]]; then
  log_skip "Supabase URL not set — create project at supabase.com first, then set SUPABASE_URL and SUPABASE_ANON_KEY"
else
  echo -n "4a. Supabase REST API health... "
  SB_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/")
  if [[ "$SB_CODE" == "200" ]]; then
    log_pass "Supabase REST responding (HTTP 200)"
  else
    log_fail "Supabase REST failed (HTTP $SB_CODE)"
  fi

  echo -n "4b. Supabase Auth endpoint... "
  SB_AUTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 \
    "${SUPABASE_URL}/auth/v1/health")
  if [[ "$SB_AUTH_CODE" == "200" ]]; then
    log_pass "Supabase Auth responding (HTTP 200)"
  else
    log_fail "Supabase Auth failed (HTTP $SB_AUTH_CODE)"
  fi

  echo -n "4c. PostGIS extension available... "
  SB_POSTGIS=$(curl -s --max-time 10 \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/rpc/postgis_version" \
    -d '{}')
  if echo "$SB_POSTGIS" | grep -q "POSTGIS"; then
    VERSION=$(echo "$SB_POSTGIS" | tr -d '"')
    log_pass "PostGIS available: $VERSION"
  else
    log_fail "PostGIS not available — enable in Supabase dashboard → Database → Extensions"
  fi

  echo -n "4d. Postgres direct TCP reachable... "
  if command -v psql &>/dev/null && [[ -n "$SUPABASE_DB_PASSWORD" ]]; then
    PSQL_RESULT=$(PGPASSWORD="$SUPABASE_DB_PASSWORD" psql \
      "postgresql://postgres@${SUPABASE_DB_HOST}:5432/postgres" \
      -c "SELECT version();" -t --no-password 2>&1)
    if echo "$PSQL_RESULT" | grep -qi "postgresql"; then
      log_pass "Postgres direct connection OK — $(echo "$PSQL_RESULT" | head -1 | xargs)"
    else
      log_fail "Postgres direct connection failed: $PSQL_RESULT"
    fi
  elif [[ -z "$SUPABASE_DB_PASSWORD" ]]; then
    log_skip "Postgres direct test skipped — set SUPABASE_DB_PASSWORD env var to enable"
  else
    log_skip "psql not installed — install with: brew install postgresql"
  fi
fi

# ─── 5. RESEND ────────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 5. RESEND (Email)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ -z "$RESEND_API_KEY" ]]; then
  log_skip "Resend API key not set — sign up at resend.com, then set RESEND_API_KEY"
else
  echo -n "5a. Resend API key valid... "
  RS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 \
    -H "Authorization: Bearer ${RESEND_API_KEY}" \
    "https://api.resend.com/domains")
  if [[ "$RS_CODE" == "200" ]]; then
    log_pass "Resend API key valid (HTTP 200)"
  else
    log_fail "Resend API key invalid (HTTP $RS_CODE)"
  fi
fi

# ─── 6. GOOGLE MAPS GEOCODING ─────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 6. GOOGLE MAPS GEOCODING API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ -z "$GOOGLE_MAPS_API_KEY" ]]; then
  log_skip "Google Maps API key not set — create at console.cloud.google.com, enable Geocoding API"
else
  echo -n "6a. Google Geocoding API (test: Ojochal, CR)... "
  GEO_RESPONSE=$(curl -s --max-time 10 \
    "https://maps.googleapis.com/maps/api/geocode/json?address=Ojochal,Costa+Rica&key=${GOOGLE_MAPS_API_KEY}")
  GEO_STATUS=$(echo "$GEO_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status','ERROR'))" 2>/dev/null || echo "ERROR")
  if [[ "$GEO_STATUS" == "OK" ]]; then
    GEO_LAT=$(echo "$GEO_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['results'][0]['geometry']['location']['lat'])" 2>/dev/null)
    GEO_LNG=$(echo "$GEO_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['results'][0]['geometry']['location']['lng'])" 2>/dev/null)
    log_pass "Google Geocoding API valid — Ojochal coords: $GEO_LAT, $GEO_LNG"
  else
    log_fail "Google Geocoding API failed — status: $GEO_STATUS"
  fi
fi

# ─── 7. TARGET SITE SCRAPEABILITY ─────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 7. TARGET SITES — robots.txt Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_robots() {
  local site="$1"
  local domain="$2"
  echo -n "robots.txt: $site... "
  ROBOTS=$(curl -s --max-time 10 -A "CasaFinderBot/1.0 (+https://casafinder.cr/bot)" \
    "https://${domain}/robots.txt" 2>/dev/null)
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://${domain}/robots.txt")

  if [[ "$HTTP_CODE" == "200" ]]; then
    if echo "$ROBOTS" | grep -qi "disallow: /"; then
      # Check if it's blanket disallow all
      if echo "$ROBOTS" | grep -Pqi "^User-agent: \*\s*\nDisallow: /$" 2>/dev/null || \
         echo "$ROBOTS" | grep -A1 "User-agent: \*" | grep -qi "Disallow: /$"; then
        log_fail "$site — robots.txt blocks all (Disallow: /)"
      else
        log_pass "$site — robots.txt exists, partial restrictions (review manually)"
      fi
    elif echo "$ROBOTS" | grep -qi "crawl-delay"; then
      DELAY=$(echo "$ROBOTS" | grep -i "crawl-delay" | head -1 | awk '{print $2}')
      log_pass "$site — crawl-delay: ${DELAY}s (respect this)"
    else
      log_pass "$site — robots.txt exists, no blanket block"
    fi
  elif [[ "$HTTP_CODE" == "404" ]]; then
    log_pass "$site — no robots.txt (no restrictions declared)"
  else
    log_skip "$site — couldn't fetch robots.txt (HTTP $HTTP_CODE)"
  fi
}

check_robots "Encuentra24"        "encuentra24.com"
check_robots "Point2Homes"        "www.point2homes.com"
check_robots "Osa Tropical Prop"  "osatropicalproperties.com"
check_robots "Costa Ballena"      "costaballenaproperty.com"
check_robots "Pacific Lots"       "www.pacificlots.com"
check_robots "Coldwell Banker CR" "www.coldwellbankercostarica.com"
check_robots "RE/MAX Costa Rica"  "www.remax.cr"
check_robots "2Costa Rica"        "www.2costaricarealestate.com"

# ─── 8. SUMMARY ───────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

PASS_COUNT=0; FAIL_COUNT=0; SKIP_COUNT=0
for r in "${RESULTS[@]}"; do
  case $r in PASS:*) ((PASS_COUNT++));; FAIL:*) ((FAIL_COUNT++));; SKIP:*) ((SKIP_COUNT++));; esac
done

echo ""
echo -e "${GREEN}PASS: $PASS_COUNT${NC}  |  ${RED}FAIL: $FAIL_COUNT${NC}  |  ${YELLOW}SKIP: $SKIP_COUNT${NC}"
echo ""

if [[ $FAIL_COUNT -gt 0 ]]; then
  echo -e "${RED}Failed checks:${NC}"
  for r in "${RESULTS[@]}"; do
    if [[ "$r" == FAIL:* ]]; then echo "  - ${r#FAIL: }"; fi
  done
fi

if [[ $SKIP_COUNT -gt 0 ]]; then
  echo -e "${YELLOW}Skipped (need credentials):${NC}"
  for r in "${RESULTS[@]}"; do
    if [[ "$r" == SKIP:* ]]; then echo "  - ${r#SKIP: }"; fi
  done
fi

echo ""
if [[ $FAIL_COUNT -eq 0 ]] && [[ $SKIP_COUNT -eq 0 ]]; then
  echo -e "${GREEN}🟢 All connections validated — ready for Assemble phase${NC}"
elif [[ $FAIL_COUNT -eq 0 ]]; then
  echo -e "${YELLOW}🟡 No failures — resolve skipped items (needs credentials) before full build${NC}"
else
  echo -e "${RED}🔴 Fix failures before proceeding to Assemble phase${NC}"
fi
echo ""
