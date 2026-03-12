/**
 * Seed script — inserts the "Relocation Guide to Costa Rica" article
 * by Ryan Logan into the articles table.
 *
 * Run from the casafinder directory:
 *   node scripts/seed-relocation-article.mjs
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wlusrkrnwwxaozqouqhn.supabase.co'
const SERVICE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdXNya3Jud3d4YW96cW91cWhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzA3MTQ3MywiZXhwIjoyMDg4NjQ3NDczfQ.k_SP5EByIilbirUa_ngY3LkUJFRkCwPMDF1gzpHJIzI'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const bodyHtml = `
<p class="article-byline" style="color:#6B7280;font-size:0.9em;margin-bottom:2em;">By <strong>Ryan Logan</strong> · Ojochal resident since 2019</p>
<p>I moved to Ojochal in 2019 after years of dreaming about it. The coffee is better, the commute is a dirt road through the jungle, and I haven't worn a suit since. But the move itself? That took planning. Here is everything I wish someone had told me before I shipped my life south.</p>

<h2>Why the Southern Pacific — and Why Now</h2>
<p>Costa Rica has no shortage of expat enclaves. Tamarindo is louder. Escazú is more urban. Manuel Antonio is world-famous. But the Southern Pacific — the corridor from Dominical through Uvita and Ojochal down to the Osa Peninsula — is different. It remains genuinely wild: primary rainforest, Ballena Marine National Park, humpback whales visible from shore. The community is bilingual, internationally diverse, and small enough that you know your neighbors.</p>
<p>Property prices have risen, but the value for what you get — ocean views, acreage, privacy, a functioning international dining scene — still puts it well ahead of comparable Caribbean or Mediterranean options. The window is still open, but it won't stay open forever.</p>

<h2>Choosing Your Residency Path</h2>
<p>Costa Rica makes it relatively straightforward for foreigners to establish legal residency. There are four main routes worth knowing about:</p>

<p><strong>Pensionado (Retiree) Visa</strong> — Requires proof of at least $1,000/month in pension income from a government or private source. This is the most popular route for retirees from the U.S., Canada, and Europe. It grants temporary residency for two years, renewable, with a path to permanent residency after three years.</p>

<p><strong>Rentista (Passive Income) Visa</strong> — Requires $2,500/month in verified passive income (investments, rental income, dividends), or a $60,000 deposit in a Costa Rican bank. Valid for two years and renewable. Unlike the Pensionado, the income does not need to be from a pension.</p>

<p><strong>Digital Nomad Visa</strong> — Launched in 2023, this is a one-to-two year visa for remote workers earning at least $3,000/month from sources outside Costa Rica. It does not count toward permanent residency, but it is the fastest and simplest entry point for location-independent professionals who are not yet ready to commit to full residency.</p>

<p><strong>Inversionista (Investor) Visa</strong> — Requires a minimum investment of $200,000 in Costa Rican real estate, a registered business, or other approved assets. Purchasing property in the Southern Pacific easily meets this threshold and simultaneously builds equity in one of the region's most promising real estate markets.</p>

<p>Most expats start on a tourist visa (90 days, renewable with a border run), get the lay of the land, then apply for the residency category that fits. Budget 6–12 months for the residency process and hire a reputable local immigration attorney — expect to spend $1,500–$3,000 in legal and administrative fees.</p>

<h2>What Things Actually Cost</h2>
<p>The honest answer is: less than most Western cities, more than you might expect from a "developing country." The Southern Pacific sits slightly above the San José average because of its desirability and relative remoteness. Here is a realistic monthly budget for a couple:</p>

<ul>
  <li><strong>Housing (rent):</strong> $800–$2,000 depending on size and ocean views. Buying a home typically starts around $250,000 for something livable; $400,000–$800,000 for the kind of property that made you move here in the first place.</li>
  <li><strong>Groceries:</strong> $400–$600 for a couple cooking most meals. Local produce (mangoes, plantains, yuca, fresh fish from local fishermen) is cheap. Imported goods — wine, good cheese, specialty items — carry steep import taxes.</li>
  <li><strong>Utilities:</strong> $100–$180 for electricity, water, and internet. Air conditioning drives bills up significantly; most Southern Pacific homes are designed for cross-ventilation instead.</li>
  <li><strong>Internet:</strong> Kolbi (government provider) and Fibra en Casa are the main options in Ojochal. Fibra en Casa offers up to 300 Mbps in more remote areas. Budget $60–$200/month depending on speed and location.</li>
  <li><strong>Transportation:</strong> $200–$350 if you own a vehicle (fuel, insurance, maintenance). A reliable 4×4 is not optional — it is essential. Roads in the hills require clearance.</li>
  <li><strong>Dining out:</strong> $150–$400. Ojochal alone has 26 restaurants for a village of its size, with French, Thai, Italian, and Japanese cuisine all within a few kilometers. A nice dinner for two with wine runs $50–$80.</li>
  <li><strong>Total comfortable monthly budget:</strong> $2,500–$4,000 for a couple. You can do it for less; you can also spend considerably more.</li>
</ul>

<h2>Healthcare: Better Than Most People Expect</h2>
<p>Costa Rica's public healthcare system — the Caja Costarricense de Seguro Social (CAJA) — covers legal residents for a monthly contribution based on income (typically $70–$200/month for expats). It covers doctor visits, specialist referrals, prescriptions, surgeries, and hospitalization at no additional cost. Wait times at public facilities can be long for non-urgent care.</p>
<p>Most expats supplement with private insurance ($100–$400/month depending on age and coverage) or simply pay out of pocket for private consultations, which typically cost $40–$80. The nearest major private hospital is in Quepos (about 1.5 hours north) or San José (4 hours). For routine and urgent care, there are clinics in Uvita and Cortés.</p>

<h2>Banking and Moving Money</h2>
<p>Opening a bank account in Costa Rica as a non-resident is difficult — most banks require residency documents. Banco Nacional and BAC Credomatic are the most expat-friendly options once you have residency. In the meantime, Charles Schwab's international debit card (no foreign transaction fees, ATM fees reimbursed) is the go-to solution for many expats managing money across borders.</p>
<p>Transferwise (now Wise) and Remitly are the most cost-effective ways to move larger sums from the U.S. to Costa Rica. Avoid exchanging cash at the airport — rates are punitive. The colón is stable; most property transactions and higher-end rentals are priced in U.S. dollars.</p>

<h2>Learning the Language</h2>
<p>You can get by in Ojochal without Spanish — the expat community is large enough and the service economy is accustomed to English speakers. But learning Spanish transforms the experience. You will negotiate more effectively, build genuine friendships with locals, navigate bureaucracy without a translator, and feel less like a tourist. Even basic conversational Spanish earns disproportionate goodwill. CRIE (Costa Rica Spanish Institute) offers immersive programs throughout the country, and there are local tutors in Uvita and Ojochal for ongoing lessons.</p>

<h2>The Practical Checklist</h2>
<ul>
  <li>Spend at least 3–6 months renting before buying. The Southern Pacific is not uniform — the microclimate, road access, and community feel vary dramatically over just a few kilometers.</li>
  <li>Hire a reputable local attorney for any real estate transaction. Title searches (estudio de registro) and due diligence on concession land near the coast are non-negotiable steps.</li>
  <li>Get a 4×4. Seriously.</li>
  <li>Join the local Facebook groups early: "Costa Ballena Bulletin Board" and "Ojochal Lifestyle" are where information actually travels.</li>
  <li>Budget for the unexpected: import tariffs on household goods are high (up to 100% on electronics and appliances). Bring what you can; buy local or used where you can't.</li>
  <li>Understand the rainy season (May–November). It is not unpleasant — the jungle turns electric green, crowds thin, and prices drop — but it is genuinely wet, and some roads become impassable without 4WD.</li>
</ul>

<h2>Why This Place, Why Now</h2>
<p>The Southern Pacific is one of the last stretches of the Central American Pacific coast where you can buy a home on a ridge overlooking primary rainforest and ocean for under $1 million, walk to a world-class restaurant, and watch humpback whales from your terrace during migration season. The infrastructure is improving — broadband has arrived, the road south is better than it was, and a small but serious international medical community has taken root.</p>
<p>The expats who moved here five years ago will tell you to stop waiting. The expats who moved here ten years ago will agree. The ones who haven't moved yet are still reading articles like this one.</p>
<p>If you are serious about making the move, CasaFinder can help you find the right property. Browse verified listings in Ojochal, Uvita, and the wider Southern Pacific — or reach out to one of our local agents directly.</p>
`

const excerpt = `Everything I wish someone had told me before relocating to Costa Rica's Southern Pacific coast — visa options, realistic costs, healthcare, banking, and why Ojochal might be exactly what you're looking for.`

const article = {
  slug: 'relocation-guide-costa-rica-southern-pacific',
  title: "Your Complete Relocation Guide to Costa Rica's Southern Pacific",
  category: 'guide',
  body_html: bodyHtml.trim(),
  excerpt,
  status: 'published',
  published_at: new Date().toISOString(),
  cover_image_url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&h=630&q=80',
  reading_time_min: 9,
}

console.log('Inserting article:', article.title)

const { data, error } = await supabase
  .from('articles')
  .upsert(article, { onConflict: 'slug' })
  .select('id, slug, title, status')
  .single()

if (error) {
  console.error('Error:', error)
  process.exit(1)
}

console.log('✅ Article published! Status:', data?.status, '| URL: https://casafinder.co/how-to/' + data?.slug)
