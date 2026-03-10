#!/usr/bin/env bash
# CasaFinder — Firecrawl CLI Initialization
# Run once on your local machine to set up the Firecrawl CLI with browser support
# Usage: chmod +x firecrawl-init.sh && ./firecrawl-init.sh

set -euo pipefail

export FIRECRAWL_API_KEY="fc-ac3818da52dd47bca7962330c19eca19"

echo "Installing and initializing Firecrawl CLI..."
npx -y firecrawl-cli@latest init --all --browser

echo ""
echo "Testing CLI scrape (httpbin)..."
npx firecrawl-cli@latest scrape --url "https://httpbin.org/json" --format markdown

echo ""
echo "Testing CLI extract (Osa Tropical listings)..."
npx firecrawl-cli@latest extract \
  --url "https://osatropicalproperties.com/properties/" \
  --prompt "Extract property listings with title, price, bedrooms, bathrooms, area, and URL"

echo ""
echo "Firecrawl CLI ready. Key commands:"
echo "  npx firecrawl-cli scrape --url <URL>                    # scrape single page"
echo "  npx firecrawl-cli crawl --url <URL> --limit 50          # crawl site"
echo "  npx firecrawl-cli map --url <URL>                       # discover URLs"
echo "  npx firecrawl-cli extract --url <URL> --prompt '<text>' # AI extract"
