# CasaFinder — Brand Guidelines
**Version 2.0 | March 2026**

> Implementation-ready brand system for CasaFinder, Costa Rica's trusted real estate marketplace. Built for product, design, and engineering teams.

> **v2.0 update:** Sections 21–23 integrate the Jobs/Ive Design Philosophy as the governing framework for all design decisions. All prior sections remain in effect; read Section 21 first to understand the lens through which every rule should be applied.

---

## Table of Contents

1. [Brand Positioning](#1-brand-positioning)
2. [Design Principles](#2-design-principles)
3. [Color Palette](#3-color-palette)
4. [Typography System](#4-typography-system)
5. [Spacing and Layout System](#5-spacing-and-layout-system)
6. [Radius, Borders, and Shadows](#6-radius-borders-and-shadows)
7. [Navigation Design](#7-navigation-design)
8. [Homepage Design](#8-homepage-design)
9. [Search Results / Map View Design](#9-search-results--map-view-design)
10. [Listing Card System](#10-listing-card-system)
11. [Buttons, Pills, Inputs, and Filters](#11-buttons-pills-inputs-and-filters)
12. [Imagery and Illustration Guidance](#12-imagery-and-illustration-guidance)
13. [Motion and Interaction Principles](#13-motion-and-interaction-principles)
14. [Responsive Behavior](#14-responsive-behavior)
15. [Voice and UX Copy Guidance](#15-voice-and-ux-copy-guidance)
16. [Costa Rica Localization Rules](#16-costa-rica-localization-rules)
17. [Do / Don't Guardrails](#17-do--dont-guardrails)
18. [Implementation Notes for Frontend Teams](#18-implementation-notes-for-frontend-teams)
19. [Design Token Block](#19-design-token-block)
20. [Creative Summary](#20-creative-summary)
21. [The Jobs/Ive Design Philosophy](#21-the-jobsive-design-philosophy)
22. [Design Audit Protocol](#22-design-audit-protocol)
23. [Scope Discipline](#23-scope-discipline)

---

## 1. Brand Positioning

**Product name:** CasaFinder

**Tagline:** Find your place in Costa Rica.

**Mission:** Make searching for real estate in Costa Rica feel as easy, trustworthy, and familiar as browsing homes anywhere else in the world — while being genuinely local.

**Audience:**
- Local Costa Rican families and buyers
- Expats relocating from North America and Europe
- Investors seeking Pacific coast or Central Valley opportunities
- Renters searching monthly or long-term
- Lifestyle buyers comparing regions (beach, mountain, jungle, city)

**Positioning statement:** CasaFinder is the mass-market real estate search platform for Costa Rica — practical, trustworthy, map-first, and built for the way people actually search for homes. It bridges the gap between the professionalism of global marketplaces and the specificity of the local Costa Rican market.

**Competitive contrast:**
- Not a luxury villa boutique — open to all property tiers
- Not a tourism site — focused on residential decisions, not vacations
- Not a foreign portal bolted onto Costa Rica — native to its geography and culture
- Not a startup product — calm, reliable, consumer-grade

---

## 2. Design Principles

> These six principles govern all product and visual decisions. They are grounded in the Jobs/Ive philosophy described in full in [Section 21](#21-the-jobsive-design-philosophy). When any specific rule in Sections 3–20 conflicts with the spirit of these principles, the principles win.

**1. Clarity first.**
Every element on screen should help users find and evaluate property faster. Decorative choices that do not serve the search experience should be cut.

**2. Familiar on purpose.**
The layout patterns, interaction models, and card hierarchies should feel recognizable to anyone who has used a mainstream real estate site. Familiarity = trust. Novelty should be reserved for Costa Rica-specific features only.

**3. Calm confidence.**
No urgency theater. No exclamation points. No countdown timers. The interface should communicate quiet reliability, like a trusted local agent.

**4. Image-forward, data-supported.**
Property photos lead. Facts follow immediately. Users scan images first, then verify with specs. Design should reinforce this natural behavior.

**5. Local specificity without provincialism.**
Costa Rica has real differences in property search behavior — ocean views, jungle access, road conditions, water sources, residency rules. The interface should surface these meaningfully without feeling like a niche tool.

**6. Mobile-first performance.**
Many users in Costa Rica access the web on mobile with variable connection quality. All critical interactions must work fast on 4G. Images should be lazy-loaded and optimized.

---

## 3. Color Palette

### Primary Blue

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0F5AE5` | Primary buttons, links, selected states, active filters |
| `primary-hover` | `#0B4CC4` | Hover state for primary actions |
| `primary-soft` | `#EAF2FF` | Pill backgrounds when selected, highlighted areas, badge fills |

### Neutrals

| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#1F2937` | Headlines, primary labels, prices |
| `text-secondary` | `#5B6472` | Supporting text, metadata, secondary labels |
| `text-muted` | `#7A8494` | Placeholders, timestamps, tertiary info |
| `border-light` | `#E5E7EB` | Card borders, input borders, dividers |
| `bg-subtle` | `#F5F7FA` | Page backgrounds, filter bars, subtle sections |
| `panel-gray` | `#F8F9FB` | Card hover states, table rows, light panels |
| `white` | `#FFFFFF` | Card backgrounds, nav, modals, inputs |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#1F8F5F` | Verified badge, active status indicators |
| `warning` | `#B7791F` | Price-reduced badge, warning alerts |
| `error` | `#C73E3A` | Validation errors, destructive actions |

### Optional Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `palm-green` | `#2F7D57` | Eco-friendly badge, occasional secondary accents only |

### Color Usage Rules

**Blue is the primary action color.** All interactive elements — buttons, active filters, selected map markers, links — should use Primary Blue or its variants.

**White and near-white dominate the interface.** The background of the application should feel like paper, not a design canvas. Avoid colored backgrounds except for subtle section differentiators.

**Neutrals carry most of the visual weight.** Typography hierarchy relies on weight and color progression from `text-primary` through `text-muted`. Do not use blue for body text.

**Green is used sparingly.** Reserve Palm Green for specific eco or environmental metadata badges. It should not appear in navigation, primary buttons, or general UI.

**Gradients are banned except in full-bleed hero images.** If a gradient overlay is used on the homepage hero, keep it very subtle (0→30% black opacity maximum).

**No competing accent colors.** Do not introduce orange, purple, coral, or any other color that competes with the blue/gray/white system.

---

## 4. Typography System

### Font Family

**Primary:** `Inter`
**Full stack:** `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Inter is chosen for its exceptional screen legibility at all sizes, neutral authority, and match in spirit to the consumer real estate marketplace aesthetic. Its tabular numerals variant works well for prices and data-heavy cards.

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|-------------|----------------|-------|
| Display | 56px / 3.5rem | 800 | 1.1 | -0.02em | Hero headline |
| H1 | 40px / 2.5rem | 700 | 1.2 | -0.01em | Page title |
| H2 | 32px / 2rem | 700 | 1.25 | -0.01em | Section heading |
| H3 | 24px / 1.5rem | 600 | 1.3 | 0 | Card section title |
| H4 | 20px / 1.25rem | 600 | 1.35 | 0 | Sub-section heading |
| Body Large | 18px / 1.125rem | 400 | 1.6 | 0 | Lead paragraphs |
| Body | 16px / 1rem | 400 | 1.6 | 0 | Default prose |
| Body Small | 14px / 0.875rem | 400 | 1.5 | 0 | Secondary content, card metadata |
| UI Label | 13px / 0.8125rem | 500 | 1.4 | 0.005em | Filter labels, nav links |
| Microcopy | 11px / 0.6875rem | 400 | 1.4 | 0.01em | Attribution, legal, timestamps |

### Price Typography

Property prices should use `font-variant-numeric: tabular-nums` and be displayed in **H3 weight or bolder** on listing cards. Prices are the second most scanned element after images.

**Format:** `$285,000` (USD) or `₡148,500,000` (CRC) — always include currency symbol.

### Typography Rules

- Headlines must always be bold (700+). Never use light or regular weight for headings.
- Body text must be 16px minimum on desktop, 15px minimum on mobile.
- Avoid thin weights (300 or below) anywhere in the interface.
- Sentence case is preferred over ALLCAPS for labels and CTAs. Exceptions: badge abbreviations like "NEW", "HOA".
- Exaggerated letter-spacing is forbidden. Stay within -0.02em to +0.015em.
- Line lengths for body text should stay between 60–80 characters for readability.

---

## 5. Spacing and Layout System

### Base Grid: 8px

All spacing should be multiples of 8px (or 4px for very tight micro-adjustments).

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro gaps: icon-to-label, badge padding |
| `space-2` | 8px | Tight: tag padding, list item gaps |
| `space-3` | 12px | Compact: inner card padding |
| `space-4` | 16px | Standard: element spacing, form field gap |
| `space-6` | 24px | Medium: card padding, section element spacing |
| `space-8` | 32px | Large: section dividers, card grid gaps |
| `space-10` | 40px | XL: section top/bottom padding |
| `space-12` | 48px | Section padding (desktop) |
| `space-16` | 64px | Large section gaps |
| `space-20` | 80px | Major homepage section spacing |

### Layout Containers

| Context | Max Width | Gutter |
|---------|-----------|--------|
| Full bleed (hero, map) | none | — |
| Page content | 1280px | 24px |
| Narrow (auth, modals) | 560px | 24px |
| Reading (articles, how-to) | 720px | 24px |

### Layout Grid (Desktop)

- 12-column grid, 24px gutters
- Sidebar layouts: 3/9 or 4/8 split
- Map+list split: ~56% map / 44% listings

### Section Rhythm

- Homepage sections separated by 64–80px
- Consistent section padding: 48px top/bottom on desktop, 32px on mobile
- No section should feel cramped; default to more space over less

---

## 6. Radius, Borders, and Shadows

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | `6px` | Small controls, compact badges |
| `radius-md` | `8px` | Badges, tags, some buttons |
| `radius-lg` | `12px` | Listing cards, image thumbnails |
| `radius-xl` | `16px` | Large panels, modals, drawers |
| `radius-pill` | `9999px` | Search input, filter pills, rounded buttons, tags |

### Border Style

Borders use `1px solid #E5E7EB` (`border-light`) for dividers, card outlines, and input fields. Borders should do the primary separation work. Shadows are an enhancement, not a substitute.

### Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-xs` | `0 1px 2px rgba(16,24,40,0.06)` | Subtle lift on inputs at rest |
| `shadow-sm` | `0 2px 4px rgba(16,24,40,0.07)` | Cards at rest |
| `shadow-md` | `0 4px 10px rgba(16,24,40,0.08)` | Cards on hover, dropdowns |
| `shadow-lg` | `0 12px 24px rgba(16,24,40,0.10)` | Modals, floating panels |
| `shadow-map` | `0 2px 8px rgba(16,24,40,0.12)` | Map controls, price pills |

### Shadow Rules

- At rest, cards should have only a border or a very subtle shadow (`shadow-sm`), not both prominently.
- On hover, cards should lift slightly by adding/intensifying shadow to `shadow-md`.
- Modals and drawers use `shadow-lg`.
- Map price pill markers use `shadow-map` to remain readable against map tiles.
- Neumorphism and glassmorphism are explicitly banned.
- Never use colored shadows.

---

## 7. Navigation Design

### Anatomy

The top navigation bar contains three zones:
1. **Left zone** — Browse category links (Buy, Rent, New Developments, Vendors, How-To)
2. **Center zone** — CasaFinder logo (wordmark)
3. **Right zone** — Sign In / Account CTA, language toggle (ES / EN), optional notification icon

### Desktop Navigation

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Buy  Rent  New Dev  Vendors  How-To   [CASAFINDER]   ES/EN  Sign In   │
└─────────────────────────────────────────────────────────────────────────┘
```

- Height: `72px`
- Background: `#FFFFFF`
- Bottom border: `1px solid #E5E7EB`
- Logo: centered wordmark, medium weight, `#1F2937` text with blue dot or accent mark
- Nav links: `13px`, `500` weight, `#5B6472`, hover color `#0F5AE5`
- Sign In: primary blue filled pill button, `36px` height, `13px` text
- Language toggle: text links, `13px`, subtle separator

**Sticky behavior:** Nav sticks to top of viewport on scroll. On scroll past hero, background transitions from transparent to white with shadow (`shadow-sm`) added.

**Active state:** Currently active nav link uses `#0F5AE5` text color, no underline.

**Mega menu / dropdowns:** Category links may have simple flat dropdowns with region links (e.g., under "Buy": Escazú, Tamarindo, Manuel Antonio, Dominical, La Fortuna...). Dropdown background: white. Dropdown shadow: `shadow-md`. Border radius: `12px`. Max dropdown width: `280px`.

### Tablet Navigation (768–1023px)

- Logo moves to left side
- Browse categories collapse to "Browse ▾" dropdown
- Right zone retains Sign In and language toggle

### Mobile Navigation (<768px)

- Logo left
- Hamburger icon right (`24px` icon, `#1F2937`)
- Full-screen slide-in menu from right (drawer)
- Drawer width: 80% of viewport, max 320px
- Drawer contains: full category list, language toggle, Sign In CTA
- Bottom of drawer: social links (optional)

---

## 8. Homepage Design

### Above-the-Fold Hero Section

**Background:** Full-width property photograph — bright, clean, natural light. Subtle dark overlay gradient from bottom (0% → 30% opacity black) to ensure search bar legibility.

**Headline:** Large Display type, white, centered.
> "Find your place in Costa Rica."

**Subheadline:** Body Large, white at 85% opacity, centered.
> "Homes for sale and rent across the Pacific Coast, Central Valley, and beyond."

**Search Bar:** Centered, max-width 680px, pill-shaped, white background with subtle shadow.
- Left: Location/region text input with search icon
- Middle: Property type selector (dropdown pill)
- Right: Blue search button ("Search" or magnifier icon)
- Height: `56px` for the bar, `44px` for inner buttons

**Background Image Selection:** Prioritize wide-angle shots of properties with ocean view or lush jungle setting. Never use stock family photos. Never use aerial-only shots without a building focal point.

### Featured Listings Carousel

Section title: "Recently listed near Ojochal"
Card carousel (scrollable on mobile, 3-up on desktop, 2-up on tablet).

Each card follows the Listing Card System (Section 10). Carousel has prev/next arrows on desktop, swipe on mobile.

### Browse by Region

Horizontal card row: 5–6 region tiles with representative property photo, region name, and listing count.

```
[Ojochal / Uvita]  [Escazú / Santa Ana]  [Tamarindo]  [Manuel Antonio]  [La Fortuna]  [Jacó]
  42 listings           89 listings       124 listings    67 listings      38 listings  55 listings
```

Cards: `180px × 140px`, `12px` radius, full-bleed photo with dark gradient overlay + white text. Very subtle hover lift.

### Trust / How It Works Module

3-column icon layout:

1. **Search verified listings** — Listings are sourced from licensed agents and verified platforms.
2. **Browse map first** — Our map-first search helps you understand location and context before you visit.
3. **Connect with local agents** — Every listing links directly to a licensed local agent.

Icons: simple geometric line icons, `32px`, `#0F5AE5`. No mascots.

### Service Category Grid

2×3 grid of service tiles:
- Homes for Sale
- Homes for Rent
- Vacation Rentals
- Land & Lots
- Commercial Properties
- Vendors & Contractors

Tiles: white background, border, `12px` radius, centered icon + label. Hover: border color becomes `#0F5AE5`, background becomes `#EAF2FF`.

### Footer

Four-column footer on desktop, stacked on mobile:
1. CasaFinder logo + brief tagline + social icons
2. Browse links (Buy, Rent, Land, Commercial, New Dev)
3. Regions (Ojochal, Escazú, Tamarindo, Manuel Antonio, La Fortuna...)
4. Company (About, Agents, Contact, Terms, Privacy, Español)

Footer background: `#F5F7FA`. Top border: `1px solid #E5E7EB`. Font: `13px`, `#5B6472`.

---

## 9. Search Results / Map View Design

### Layout Structure

The search results page is the most critical screen in the product.

**Desktop (≥1024px):** Two-panel split layout:
- **Left panel:** Interactive map — approximately 56% of viewport width
- **Right panel:** Listings grid/list — approximately 44% of viewport width

The split point should be fixed (not draggable in MVP) and both panels should scroll independently.

```
┌────────────────────────────────────────────────────────────────┐
│ NAV                                                            │
├────────────────────────────────────────────────────────────────┤
│ FILTER BAR (sticky)                                            │
├──────────────────────────────┬─────────────────────────────────┤
│                              │ 248 homes for sale              │
│                              │ ┌──────────┐ ┌──────────┐      │
│         MAP                  │ │ Card     │ │ Card     │      │
│                              │ └──────────┘ └──────────┘      │
│    [price] [price] [price]   │ ┌──────────┐ ┌──────────┐      │
│                              │ │ Card     │ │ Card     │      │
│                              │ └──────────┘ └──────────┘      │
└──────────────────────────────┴─────────────────────────────────┘
```

### Filter Bar

Height: `52px`. Background: `#FFFFFF`. Bottom border: `1px solid #E5E7EB`. Sticky below nav.

Contains (left to right):
1. **Type toggle:** Sale / Rent pills
2. **Price:** "Price ▾" pill (opens min/max dropdown)
3. **Beds:** "Beds ▾" pill (1+, 2+, 3+, 4+ options)
4. **Baths:** "Baths ▾" pill
5. **Size (m²):** "Size ▾" pill
6. **More filters:** "Filters ▾" pill (opens modal with all Costa Rica–specific fields)
7. **Save Search:** text link or secondary button (right-aligned)

Pill style: `height: 34px`, `padding: 0 14px`, `border: 1px solid #E5E7EB`, `border-radius: 9999px`, `font-size: 13px`, `font-weight: 500`.

Selected pill state: `background: #EAF2FF`, `border-color: #0F5AE5`, `color: #0F5AE5`.

### Map Panel

- Base tile: OpenStreetMap or similar clean tile (light, minimal, preferably English + Spanish hybrid)
- SIRI WMS overlay: cadastral parcel layer (Costa Rica Registro Nacional), toggleable
- Price pills as map markers (see below)
- Floating controls (bottom-right): zoom in/out, locate me, toggle satellite, toggle parcels

**Map Marker — Default:**
```
┌──────────────┐
│  $285,000    │  ← white bg, #1F2937 text, shadow-map, 9999px radius
└──────────────┘
```
- Font: `12px`, `600` weight
- Padding: `4px 10px`
- Shadow: `shadow-map`
- On hover: scale 1.05, z-index elevation

**Map Marker — Selected (linked to hovered card):**
- Background: `#0F5AE5`
- Text: white
- Scale: 1.1, brought to top z-index

**Map Marker — Visited:**
- Background: `#7A8494`
- Text: white
- Slightly smaller scale

### Listings Panel

**Result count line:** `"248 homes for sale in Ojochal"` — `14px`, `#5B6472`, updated on filter change.

**List/Grid toggle:** Small icon buttons (list view / grid view), right-aligned above results. Default: 2-column grid on desktop.

**Card grid:** 2 columns, `gap: 16px`, scroll within panel (panel height: viewport − nav height − filter bar height).

**Pagination:** Load more button at bottom of list (not numeric pagination). "Load 24 more results" — secondary pill button.

### Selected Listing State

When user hovers a listing card, the corresponding map marker should enter "selected" state (blue background). When user clicks a marker on the map, the listing card scrolls into view and gets a `2px solid #0F5AE5` highlight border.

### Save Search Interaction

"Save this search" link appears in filter bar (right side). On click: opens small modal or inline confirmation: "We'll notify you when new listings match these filters. Enter your email:" followed by an email input and blue submit button.

---

## 10. Listing Card System

### Card Dimensions

- **Grid card (search results):** width fills column (typically 280–360px), height auto (~360px total)
- **Carousel card (homepage):** fixed `320px × 360px`
- **List-view row (optional):** full width, `96px` image, details inline

### Card Structure (Grid Card)

```
┌────────────────────────────────────┐
│  [PHOTO 16:10 ratio]               │  ← full-width, radius-lg at top only
│  [Badge top-left]  [♡ top-right]  │
├────────────────────────────────────┤
│  $285,000                         │  ← H3 size, font-weight 700, text-primary
│  3 bd · 2 ba · 185 m²             │  ← Body Small, text-secondary
│  Ojochal, Puntarenas              │  ← Body Small, text-secondary
│  ───────────────────────────────  │  ← 1px divider, border-light
│  CasaFinder · Exp. 2 days ago     │  ← Microcopy, text-muted
└────────────────────────────────────┘
```

### Information Hierarchy

1. **Photo** — dominant, full-width, 16:10 aspect ratio
2. **Price** — largest text after photo; bold, `#1F2937`
3. **Home facts** — beds, baths, size in m² — compact line, medium weight
4. **Location** — canton + province or neighborhood name
5. **Attribution** — source/platform and recency

### Card Behavior

- **At rest:** white background, `border: 1px solid #E5E7EB`, `border-radius: 12px`, `shadow-sm`
- **On hover:** `shadow-md`, border color shifts to `#CBD5E1`, slight scale `1.01`
- **Selected (from map marker click):** `border: 2px solid #0F5AE5`
- Transition: all `180ms ease`

### Favorite / Save Icon

- Position: top-right of photo, `8px` inset
- Icon: outline heart (`♡`) at rest, filled red heart when saved
- Size: `32px × 32px` touch target, `20px` icon
- Background: white at 80% opacity, `border-radius: 50%`
- Hover: background becomes fully white, icon color deepens

### Badges

Badges appear in the top-left of the photo. Maximum 2 badges visible at once.

| Badge | Background | Text | Usage |
|-------|-----------|------|-------|
| New | `#0F5AE5` | white | Listed within 7 days |
| Price Cut | `#B7791F` | white | Price reduced from original |
| Open House | `#1F8F5F` | white | Scheduled open house |
| Ocean View | `#2F7D57` | white | Ocean view confirmed |
| Gated | `#5B6472` | white | Gated community |
| Furnished | `#5B6472` | white | Furnished property |
| Investment | `#1F2937` | white | Income-generating property |
| Eco | `#2F7D57` | white | Eco-certified or solar |
| Walk to Beach | `#0F5AE5` | white | <10 min walk to beach |

Badge style: `height: 22px`, `padding: 0 8px`, `border-radius: 8px`, `font-size: 11px`, `font-weight: 600`, `letter-spacing: 0.01em`.

### Image Ratios

- Card photo: `16:10` (preferred) or `4:3` (acceptable fallback)
- Hero/feature images: `16:9`
- Region tile photos: `4:3`
- Gallery lightbox: native aspect ratio, letterboxed in container

---

## 11. Buttons, Pills, Inputs, and Filters

### Buttons

**Primary Button**
- Background: `#0F5AE5`
- Text: white, `14px`, `600` weight
- Height: `40px` (standard), `36px` (compact), `48px` (large/hero CTA)
- Padding: `0 20px`
- Border radius: `9999px` (pill) for most contexts; `8px` (rounded) acceptable in form contexts
- Hover: background `#0B4CC4`
- Active: background `#0A44B0`
- Disabled: background `#CBD5E1`, text `#9CA3AF`, cursor not-allowed

**Secondary Button**
- Background: `#FFFFFF`
- Border: `1.5px solid #E5E7EB`
- Text: `#1F2937`, `14px`, `500` weight
- Height: `40px`
- Hover: border-color `#0F5AE5`, text `#0F5AE5`, background `#EAF2FF`

**Tertiary / Text Button**
- Background: transparent
- Text: `#0F5AE5`, `14px`, `500` weight
- No border
- Hover: text `#0B4CC4`, underline
- Used for: "View all listings →", "Save search", "See more"

### Search Input (Homepage / Nav)

- Height: `56px` (homepage hero), `44px` (embedded/nav contexts)
- Border radius: `9999px`
- Background: white
- Border: `1.5px solid #E5E7EB`
- Shadow: `shadow-xs` at rest, `shadow-sm` on focus
- Focus ring: `2px solid #0F5AE5` offset `2px`
- Placeholder text: `#7A8494`, `14px`
- Icon: `20px` magnifier, `#5B6472`, left-aligned inside padding
- Contains: location input left, type dropdown middle, blue Search button right
- Inner button: pill-shaped, `#0F5AE5`, white text

### Filter Pills (Search Results Bar)

- Height: `34px`
- Border radius: `9999px`
- Background: white
- Border: `1px solid #E5E7EB`
- Font: `13px`, `500` weight, `#5B6472`
- Hover: border-color `#9CA3AF`
- Selected: background `#EAF2FF`, border `#0F5AE5`, text `#0F5AE5`
- Active/open dropdown: same as selected + slight shadow
- Chevron: `10px`, right-aligned in padding, rotates 180° when open

### Form Inputs (Lead / Listing Forms)

- Height: `44px`
- Border radius: `8px`
- Background: white
- Border: `1.5px solid #E5E7EB`
- Font: `15px`, `#1F2937`
- Placeholder: `#7A8494`
- Focus: border-color `#0F5AE5`, `shadow-xs`
- Error state: border `#C73E3A`, micro-error message below in `12px`, `#C73E3A`
- Label: `13px`, `500`, `#5B6472`, margin-bottom `6px`

### Tabs / Toggles

Use a simple button group style:
- Container: `border: 1px solid #E5E7EB`, `border-radius: 9999px`
- Active segment: `background: #0F5AE5`, white text
- Inactive segment: transparent background, `#5B6472` text
- Height: `34px`, equal-width segments

### Modals

- Overlay: `rgba(0,0,0,0.45)`
- Panel: white background, `border-radius: 16px`, `shadow-lg`
- Max-width: `560px` (standard), `480px` (narrow), `720px` (wide)
- Padding: `32px`
- Header: H3 headline + close button (×) top-right
- Footer: action buttons, right-aligned

### Drawers (Mobile)

- Slide in from bottom or right
- Max-height: 90vh
- Background: white
- Border-radius: `16px 16px 0 0` (bottom drawer) or `16px 0 0 16px` (right drawer)
- Handle bar at top: `4px × 40px`, `#E5E7EB`, centered
- Shadow: `shadow-lg`

---

## 12. Imagery and Illustration Guidance

### Photography Style

CasaFinder's photography should communicate livability, not luxury theater. Every image should help a user honestly evaluate whether a property fits their life.

**Preferred subjects:**
- Ocean-view homes with clear horizon line visible
- Indoor-outdoor spaces (open living areas, terraces, courtyards)
- Jungle-edge properties with natural context
- Mountain/volcano backdrop homes (Central Valley, La Fortuna region)
- Surf-town properties with proximity to daily life visible
- Pools and gardens that look maintained, not staged

**Shooting style:**
- Natural light preferred; avoid obvious HDR processing
- Slightly warm tones acceptable; no cool blue-shifted filters
- Wide angle for rooms and exteriors; normal lens for detail shots
- Show the real view — if the ocean is visible, it must be clearly visible in the hero image
- Include contextual shots (street, neighborhood, beach proximity) in galleries

**What to avoid:**
- Oversaturated HDR interiors
- Luxury-only presentations (every property deserves quality photos, not just high-end ones)
- Staged family photos with stock models
- Tourism cliché shots (monkeys, sloths, toucans as property photography context)
- Resort brochure aesthetics
- Fish-eye distortion that exaggerates room size

**Image dimensions and optimization:**
- Hero card image: `720px × 450px` minimum upload, WebP format, lazy-loaded
- Gallery full size: `1200px × 900px` maximum display
- Region tile: `480px × 360px`
- Agent profile photo: `200px × 200px`, `border-radius: 50%`

### Illustration Style (Secondary Modules)

For How It Works sections, service icons, empty states, and educational content:

- Style: clean geometric line icons or minimal filled shapes
- Color: primary `#0F5AE5` with `#EAF2FF` fill backgrounds, or `#5B6472` mono
- No gradients in illustrations
- No shadows in illustrations
- No mascots or illustrated characters
- Icon set should be internally consistent (same stroke weight, corner style, visual language throughout)
- Recommended icon library: Lucide React (already used in the codebase) or Heroicons

**Empty State Illustrations:**
- Simple, geometric, low-detail
- Neutral tone, not sad or comedic
- Copy-forward: the message carries the weight, the illustration is supporting

---

## 13. Motion and Interaction Principles

### Core Philosophy

Motion should confirm, guide, and respond — never entertain. Every animation should have a functional purpose. If you can't explain why something moves, remove the animation.

### Timing Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| `duration-fast` | `120ms` | Hover state color changes, icon fills |
| `duration-normal` | `180ms` | Card hover lift, button state transitions |
| `duration-medium` | `240ms` | Filter pill dropdowns, tooltip appear |
| `duration-slow` | `300ms` | Modal open/close, drawer slide, page transitions |
| `duration-xslow` | `400ms` | Full-page route changes (if animated) |

### Easing

- Standard: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out — snappy, natural deceleration)
- Enter: `ease-out` for elements entering the screen
- Exit: `ease-in` for elements leaving

### Hover States

- Card hover: `box-shadow` increases + `transform: scale(1.01)` — `180ms ease`
- Button hover: background color shift — `120ms ease`
- Map marker hover: `transform: scale(1.08)` — `150ms ease`
- Nav link hover: color shift — `120ms ease`
- Image hover (carousel): slight zoom `scale(1.03)` on image only — `300ms ease`

### Transitions

- Filter pill dropdown: fade in + translate-y 4px → 0 — `240ms ease-out`
- Modal open: fade in (overlay) + scale 0.96 → 1 (panel) — `260ms ease-out`
- Drawer open: slide from right or bottom — `280ms cubic-bezier(0.16, 1, 0.3, 1)`
- Page transitions: fade in — `240ms ease-out`

### Map Interactions

- Marker cluster expand: `200ms ease-out`
- Zoom in/out: native Leaflet behavior, no custom override
- Map tile load: opacity fade in per tile — native browser behavior acceptable
- Marker selection: color/scale change — `150ms ease`

### Anti-patterns

The following should never appear in the interface:
- Bounce or elastic keyframes
- Spin loaders longer than 500ms
- Confetti, particle, or fireworks effects
- Staggered cascading animations longer than 400ms total
- Scroll-triggered animations (acceptable for content sites, wrong for a utility marketplace)
- Floating/pulsing hero elements

---

## 14. Responsive Behavior

### Breakpoints

| Name | Min Width | Behavior |
|------|-----------|----------|
| Mobile | 0px | Full-width, stacked, simplified |
| Tablet | 768px | 2-column grids, collapsed nav |
| Desktop | 1024px | Full split-panel layout, 3-column grids |
| Wide | 1280px | Maximum content width enforced |

### Homepage

- **Mobile:** Hero search bar stacks vertically (location input → type select → Search button). Featured listings become 1-column. Region tiles become horizontal scroll strip.
- **Tablet:** Search bar remains horizontal. Featured listings 2-column. Region tiles 3-column.
- **Desktop:** Full layout as described in Section 8.

### Search Results

- **Mobile:** Vertical stack. Filter bar becomes horizontally scrollable pills strip. Map hidden by default — toggle button ("Map view / List view") fixed at bottom of screen. List view shows full-width cards. Map view overlays full screen with floating list toggle button.
- **Tablet:** Narrow split — 50/50 map/list or map-over layout. Filter pills horizontally scrollable. Cards 1-column in list panel.
- **Desktop:** Full 56/44 split as described in Section 9.

### Listing Cards

- **Mobile:** Full-width cards, 16:10 image, all info visible
- **Tablet:** 2-column grid
- **Desktop:** 2–3 column grid depending on context

### Navigation

- **Mobile:** Logo left, hamburger right, full-screen drawer menu
- **Tablet:** Logo left, "Browse ▾" dropdown, Sign In right
- **Desktop:** Full nav as described in Section 7

### Filter Controls

- **Mobile:** Bottom sheet drawer — "Filters" button opens full-screen filter panel from bottom. Applied filters shown as pills above results.
- **Tablet:** Horizontal scroll pill bar (same as desktop but compressed)
- **Desktop:** Full pill row in sticky filter bar

### Typography Responsive Adjustments

| Role | Desktop | Mobile |
|------|---------|--------|
| Display | 56px | 36px |
| H1 | 40px | 28px |
| H2 | 32px | 24px |
| H3 | 24px | 20px |
| Body | 16px | 15px |
| Body Small | 14px | 13px |

---

## 15. Voice and UX Copy Guidance

### Brand Voice

CasaFinder speaks like a knowledgeable, local friend — someone who knows the market, doesn't oversell, and respects the user's intelligence. The tone is practical, calm, and direct.

**Voice attributes:**
- Direct — short sentences, no meandering
- Practical — every line of copy should be useful
- Trustworthy — no hype, no urgency tactics
- Local — uses Costa Rica place names naturally
- Bilingual-ready — all copy should translate cleanly to Spanish

**Never:**
- Use startup clichés ("game-changer", "seamless", "delightful", "world-class")
- Use luxury fluff ("exclusive", "prestigious", "bespoke", "curated")
- Use tourism language ("paradise", "pura vida lifestyle", "dream home awaits")
- Overpromise ("the best listings in Costa Rica", "guaranteed to love")
- Be cute or whimsical ("We're searching the jungle for your perfect treehouse 🌴")

### UX Microcopy Examples

**Search placeholder:**
> "Search by city, beach, neighborhood, or address"

**Results count:**
> "248 homes for sale in Ojochal"
> "12 rentals available in Tamarindo this month"

**No results found:**
> "No listings match these filters right now."
> "Try expanding your search area or adjusting price range."

**Save search:**
> "Save this search"
> "Get notified when new listings match."
> "We'll email you when new homes match these filters."

**Request tour:**
> "Request a showing"
> "Schedule a visit"

**View details:**
> "View listing"
> "See full details"

**Contact agent:**
> "Contact agent"
> "Send a message"
> "Chat on WhatsApp"

**Empty favorites:**
> "No saved listings yet."
> "Heart any listing to save it here."

**Filter labels:**
> "Price", "Beds", "Baths", "Size", "More filters"
> Active: "Price: $100K–$400K", "3+ Beds"

**Loading:**
> "Loading listings…"

**Error / connection issue:**
> "Something went wrong loading listings. Try refreshing."

**New listing badge:**
> "New" (not "Just listed!" or "Hot!")

**Price cut badge:**
> "Price cut" (not "Deal!" or "Reduced — act fast!")

---

## 16. Costa Rica Localization Rules

### Geographic Search Hierarchy

CasaFinder's search should allow users to find properties by Costa Rica's actual administrative geography:

1. **Province** (Puntarenas, San José, Guanacaste, etc.)
2. **Canton** (Osa, Pérez Zeledón, Nicoya, etc.)
3. **District** (Ojochal, Platanillo, Bahía Ballena, etc.)
4. **Named community / beach town** (Uvita, Dominical, Tamarindo, Nosara, etc.)
5. **Gated community or development** (e.g., Villas del Mar, Altamira)
6. **Neighborhood or landmark** (e.g., near the Ojochal village center, above the highway)

**Important:** Costa Rica addresses are informal. Zip codes are rarely used. Search must accept place names, not assume street address structures.

### Key Regions to Support at Launch

| Region | Province | Type of Listings |
|--------|----------|-----------------|
| Ojochal | Puntarenas | Jungle, ocean view homes |
| Uvita | Puntarenas | Whale Tail beach area, family homes |
| Dominical | Puntarenas | Surf town, mixed budget |
| Escazú | San José | Urban, expat hub, condos |
| Santa Ana | San José | Suburban, family homes |
| Tamarindo | Guanacaste | Beach, tourism, rentals |
| Nosara | Guanacaste | Wellness community, eco-focus |
| Jacó | Puntarenas | Beach, investment, surf |
| Manuel Antonio | Puntarenas | Tourism, ocean view |
| La Fortuna | Alajuela | Volcano, eco, tourism |
| Grecia | Alajuela | Retiree-friendly, temperate |
| San Ramón | Alajuela | Agricultural, affordable |
| Playas del Coco | Guanacaste | Bay, expat, boats |

### Costa Rica–Specific Listing Fields

These metadata fields are uniquely important in Costa Rica and must be surfaced in the product. They should appear in:
- The "More filters" panel
- Listing detail page
- Listing card badges (when applicable)

| Field | Type | Notes |
|-------|------|-------|
| Ocean view | Boolean | Often the most searched filter in Pacific zones |
| Jungle setting | Boolean | Common in southern Pacific |
| Mountain / volcano view | Boolean | Central Valley + La Fortuna |
| Paved road access | Boolean | Critical for rural properties |
| Airport drive time | Integer (minutes) | SJO = San José, LIR = Liberia |
| Water source | Enum | Municipal, well, river, ASADA |
| Internet quality | Enum | Fiber, cable, 4G, limited, none |
| Furnished | Boolean | High importance for expats/rentals |
| Gated community | Boolean | Common filter for security preference |
| Investment property | Boolean | Short-term rental income potential |
| HOA / community fee | Decimal (USD/month) | Common in gated developments |
| Residency-friendly | Boolean | Properties that support residency petitions |
| Walk to beach | Boolean | <10 min walk to beach access |
| Rental income potential | Estimated range or boolean | For investment buyers |
| Solar / off-grid | Boolean | Growing segment |

### Currency

Display prices in **USD by default** for most international audiences. CRC (colones) toggle should be available. Never show both on the same line. Format:

- USD: `$285,000`
- CRC: `₡148,500,000`

### Language

- Interface defaults to English for the initial build
- Full Spanish translation required from day one (dual-language market)
- Language toggle in nav: `EN / ES`
- URL structure: `/es/` prefix or `lang` query param
- Place names: always use the correct Spanish spelling (Ojochal, Puntarenas, not anglicized versions)
- Do not translate place names: "Escazú" stays "Escazú", not "Escazu"

### Area Units

- Use **m²** (square meters) as the primary area unit — this is Costa Rica standard
- Optionally show sq ft as secondary for North American users
- Format: `185 m²` (not `185sqm` or `185 m2`)

### Measurement Conversions (optional in UI)

A small toggle on listing detail pages to switch between metric and imperial is acceptable but not required for MVP.

---

## 17. Do / Don't Guardrails

### Do

- Use the blue primary color system consistently for all interactive elements
- Keep most of the interface white, light gray, and blue
- Use bold sans-serif typography for all headlines
- Prioritize search usability above all decorative choices
- Surface Costa Rica-specific metadata fields prominently
- Use real property photography — never stock lifestyle photos
- Make the product feel reliable and familiar, like a trusted marketplace
- Test every search interaction on mobile before shipping
- Use Inter as the sole typeface
- Keep card layouts clean and scannable

### Don't

- Add tropical colors (coral, yellow, teal gradients) to UI chrome
- Use the Palm Green accent color in navigation or primary UI
- Use serif fonts anywhere in the interface
- Use thin font weights (300 or below)
- Add excessive box shadows or visual effects
- Over-animate any interaction
- Make hero sections look like a resort or airline landing page
- Use "pura vida" as a UI tagline (too cliché for a serious marketplace)
- Confuse USD and CRC or display them simultaneously
- Use U.S.-style zip codes or street addresses as primary search input
- Copy Zillow's exact logo, brand name, illustrations, or proprietary copy
- Use the word "Zillow" anywhere in the product or marketing materials
- Build filters that don't reflect actual Costa Rica property norms
- Show irrelevant fields (HOA rules that apply only to U.S. markets, school ratings, etc.) without CR-specific equivalents

---

## 18. Implementation Notes for Frontend Teams

### Technology Stack (Current)

- **Framework:** Next.js 15 (App Router, React Server Components)
- **Styling:** Tailwind CSS v4
- **Maps:** React-Leaflet 4 with OpenStreetMap tiles + SIRI WMS overlay
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React
- **i18n:** next-intl
- **Font:** Inter via local hosting or `next/font/local` (not `next/font/google` — Google Fonts is blocked in some deployment environments)

### Brand Color Integration

Replace all green-based Tailwind utility classes with blue-based equivalents:

| Old (green-era) | New (brand blue) |
|----------------|-----------------|
| `bg-green-700` | `bg-[#0F5AE5]` or `bg-brand-blue` |
| `text-green-700` | `text-[#0F5AE5]` or `text-brand-blue` |
| `border-green-700` | `border-[#0F5AE5]` or `border-brand-blue` |
| `hover:bg-green-800` | `hover:bg-[#0B4CC4]` or `hover:bg-brand-blue-hover` |

### Design Token Mapping to Tailwind

See Section 19 for the full design token block. These should be registered in `tailwind.config.ts` under `theme.extend.colors`.

### Component Priorities for V1

1. Nav (sticky, mobile drawer)
2. Search bar (homepage + results page)
3. Listing card (grid + list variants)
4. Filter pills (search results bar)
5. Map view (Leaflet + price markers)
6. Lead contact form
7. Listing detail page layout
8. Homepage hero + sections

### Server Components vs Client Components

- Map components: must be `'use client'` with `dynamic(() => ..., { ssr: false })`
- Filter components with state: `'use client'`
- Listing card (display only): Server Component
- Homepage hero: Server Component
- Lead form: `'use client'`

### Image Optimization

Use Next.js `<Image>` component for all property photos:
- `priority={true}` for hero and above-fold images
- `loading="lazy"` for below-fold cards
- `sizes` attribute configured per breakpoint
- WebP format via Next.js automatic optimization

### Accessibility

- All interactive elements must have visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#0F5AE5]`)
- Contrast ratio: text on white must be WCAG AA compliant (all brand neutrals pass)
- Alt text on all property images
- ARIA labels on icon-only buttons (save/heart, close, hamburger)
- Skip-to-content link at top of page

---

## 19. Design Token Block

Complete Tailwind-compatible token block for `tailwind.config.ts`:

```typescript
// tailwind.config.ts — CasaFinder brand tokens
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary blues
          blue:       '#0F5AE5',
          'blue-hover': '#0B4CC4',
          'blue-soft':  '#EAF2FF',

          // Text
          'text-primary':   '#1F2937',
          'text-secondary': '#5B6472',
          'text-muted':     '#7A8494',

          // Backgrounds
          'bg-subtle':  '#F5F7FA',
          'panel-gray': '#F8F9FB',

          // Borders
          'border-light': '#E5E7EB',

          // Semantic
          success: '#1F8F5F',
          warning: '#B7791F',
          error:   '#C73E3A',

          // Optional accent
          'palm-green': '#2F7D57',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      fontSize: {
        'display': ['3.5rem',   { lineHeight: '1.1',  fontWeight: '800', letterSpacing: '-0.02em' }],
        'h1':      ['2.5rem',   { lineHeight: '1.2',  fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2':      ['2rem',     { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h3':      ['1.5rem',   { lineHeight: '1.3',  fontWeight: '600' }],
        'h4':      ['1.25rem',  { lineHeight: '1.35', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body':    ['1rem',     { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'ui':      ['0.8125rem',{ lineHeight: '1.4',  fontWeight: '500', letterSpacing: '0.005em' }],
        'micro':   ['0.6875rem',{ lineHeight: '1.4',  letterSpacing: '0.01em' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
      borderRadius: {
        'sm':   '6px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'xs':  '0 1px 2px rgba(16,24,40,0.06)',
        'sm':  '0 2px 4px rgba(16,24,40,0.07)',
        'md':  '0 4px 10px rgba(16,24,40,0.08)',
        'lg':  '0 12px 24px rgba(16,24,40,0.10)',
        'map': '0 2px 8px rgba(16,24,40,0.12)',
      },
      transitionDuration: {
        'fast':   '120ms',
        'normal': '180ms',
        'medium': '240ms',
        'slow':   '300ms',
        'xslow':  '400ms',
      },
    },
  },
  plugins: [],
}

export default config
```

### CSS Custom Properties (globals.css)

```css
/* globals.css — CasaFinder design tokens as CSS variables */
:root {
  /* Primary brand colors */
  --color-primary:         #0F5AE5;
  --color-primary-hover:   #0B4CC4;
  --color-primary-soft:    #EAF2FF;

  /* Typography */
  --color-text-primary:    #1F2937;
  --color-text-secondary:  #5B6472;
  --color-text-muted:      #7A8494;

  /* Borders */
  --color-border:          #E5E7EB;

  /* Backgrounds */
  --color-bg-subtle:       #F5F7FA;
  --color-bg-panel:        #F8F9FB;
  --color-bg-white:        #FFFFFF;

  /* Semantic */
  --color-success:         #1F8F5F;
  --color-warning:         #B7791F;
  --color-error:           #C73E3A;

  /* Optional accent */
  --color-palm-green:      #2F7D57;

  /* Shadows */
  --shadow-xs:  0 1px 2px rgba(16,24,40,0.06);
  --shadow-sm:  0 2px 4px rgba(16,24,40,0.07);
  --shadow-md:  0 4px 10px rgba(16,24,40,0.08);
  --shadow-lg:  0 12px 24px rgba(16,24,40,0.10);
  --shadow-map: 0 2px 8px rgba(16,24,40,0.12);

  /* Border radius */
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-pill: 9999px;

  /* Transitions */
  --duration-fast:   120ms;
  --duration-normal: 180ms;
  --duration-medium: 240ms;
  --duration-slow:   300ms;
}
```

---

## 20. Creative Summary

CasaFinder is built on a single insight: the most powerful thing a Costa Rica real estate platform can do is feel exactly like the real estate sites people already trust — because trust is the rarest commodity in cross-border property search.

The visual language is deliberately restrained. Blue and white carry the entire color system. Inter does the typographic work with no ornament. Cards are clean rectangles with softened corners. The map is front and center. Filters are compact pills. Prices are bold. Everything else is quiet.

The differentiation is in the content, not the chrome. Costa Rica-specific metadata — ocean views, jungle settings, road access, ASADA water rights, residency eligibility — surfaces at the right moments without cluttering the interface. The search understands Ojochal, Uvita, and Dominical just as naturally as Escazú and Santa Ana.

The result should feel like someone built Zillow's interaction model from scratch, hired a cartographer who knows the Osa Peninsula, and didn't try to make it look tropical.

That's the standard. Consumer-grade clarity. Local depth. Earned trust.

---

## How to Make This Feel Familiar Without Making It a Clone

The following table defines what CasaFinder intentionally borrows from mainstream marketplace UX patterns — and what it must change to be original and Costa Rica-native.

### Borrow (Pattern)

| Pattern | Rationale |
|---------|-----------|
| Map + listings split panel | The most efficient property search UX ever designed; users expect it |
| Pill-shaped filter bar | Horizontal filter pills are the clearest affordance for multi-criteria search |
| Image-first listing cards with price hierarchy | Photo → price → facts is the universal real estate scan pattern |
| Sticky nav + search bar prominence | Search is the product; it must never scroll away |
| White/gray/blue color system | Neutral platforms feel trustworthy; loud colors feel risky |
| Large bold headlines | Confidence and hierarchy without visual noise |
| Heart/save icon on card hover | Universal convention; users don't need to learn it |
| Result count + filter persistence | Users need to understand their search context at all times |

### Change (Brand + Local)

| Element | What Changes |
|---------|-------------|
| Logo and name | CasaFinder wordmark, original design |
| Illustration style | Custom simple icon set; no third-party style borrowed |
| Copy and microcopy | CasaFinder voice — practical, bilingual, CR-specific |
| Filter fields | Costa Rica metadata: ocean view, paved road, water source, airport time |
| Geographic search model | Province → canton → district + beach town + gated community |
| Currency display | USD primary + CRC secondary; no zip codes |
| Photography treatment | Real CR properties; no stock families; no tourism clichés |
| Map tiles and overlays | SIRI/Registro Nacional cadastral overlay for parcel clarity |
| Listing attribution | Local CR agencies + national portals, not MLS systems |
| Agent profiles | WhatsApp-first contact; local license numbers |

The margin between "familiar" and "clone" is exactly the space where CasaFinder lives. Use the UX conventions aggressively. Make the brand completely original.

---

---

## 21. The Jobs/Ive Design Philosophy

> This section is the north star. Every rule in this document exists to serve it. Before shipping any screen or component, return here and verify the work passes this test.

### The Role Statement

A CasaFinder designer is not a decorator. They are an architect of clarity. They do not add features. They do not invent novelty for its own sake. They make every screen feel **inevitable** — as if no other design was ever possible.

The product should feel calm, confident, and quiet. If the user ever notices the interface, the design has failed. The interface should be so clear that the user only thinks about Costa Rica.

### Core Principles

**Simplicity is architecture.**
Every element must justify its existence. If it doesn't serve the user's immediate goal, it is clutter. The best interface is the one the user never notices. Complexity is a design failure, not a feature.

**Remove until it breaks. Then add back the last thing.**
Before adding anything, ask what can be removed. The discipline is subtractive. Every screen should have only what is essential and nothing more. When in doubt, cut it.

**Hierarchy drives everything.**
Every screen has one primary action. Make it unmissable. Secondary actions support — they never compete. If everything is bold, nothing is bold. Visual weight must match functional importance.

**Whitespace is a feature.**
Space is not empty. It is structure. Crowded interfaces feel cheap. Breathing room feels premium. When in doubt, add more space, not more elements.

**Design the feeling.**
Premium apps feel calm, confident, and quiet. Every interaction should feel responsive and intentional. Transitions should feel like physics, not decoration. The product should feel like it respects the user's time and attention.

**Consistency is non-negotiable.**
The same component must look and behave identically everywhere it appears. All values must reference the design system tokens — no hardcoded colors, spacing, or sizes.

**Responsive is the real design.**
Mobile is the starting point. Tablet and desktop are enhancements. Design for thumbs first, then cursors. Every screen must feel intentional at every viewport — not just resized.

**Every pixel references the system.**
No rogue values. No exceptions. If a token doesn't exist, propose it. Never invent values in isolation.

### The Jobs Filter

For every element on every screen, apply this test before shipping:

| Question | If the answer is "yes" | If the answer is "no" |
|----------|----------------------|----------------------|
| Would a user need to be told this exists? | Redesign it until it's obvious | Ship it |
| Can this be removed without losing meaning? | Remove it | Keep it |
| Does this feel inevitable, like no other design was possible? | Ship it | It's not done |
| Is this detail as refined as details users will never see? | Ship it | Refine it |

**"Say no to 1,000 things."** Cut good ideas to keep great ones. Less but better.

### Applied to CasaFinder

| Element | Jobs/Ive Application |
|---------|----------------------|
| Search bar | Pill-shaped, white, centered. One goal. No decoration. |
| Navigation | 72px, white, shadow only on scroll. Never competes with content. |
| Listing cards | Photo → price → facts. Nothing else. |
| Hero | Full-bleed photo. One headline. One search bar. Silence. |
| Filter pills | Compact, horizontal, pill-shaped. Active state is blue only. |
| Whitespace | Default to more. Sections need to breathe. Cramped = cheap. |
| Animations | Confirm, guide, respond. Never entertain. If you can't explain why it moves, remove it. |
| Color | Blue does work. White holds space. Neutrals carry the rest. Nothing else. |
| Copy | Direct. Practical. Useful. Every word earns its place. |
| Map markers | Price only. No icons. No labels. The number is the whole message. |

### The Standard

The product should feel like someone built Zillow's interaction model from scratch, hired a cartographer who knows the Osa Peninsula, and didn't try to make it look tropical. Consumer-grade clarity. Local depth. Earned trust.

---

## 22. Design Audit Protocol

Use this protocol before any significant release, when reviewing a component for the first time, or whenever a screen "doesn't feel right" but you can't articulate why.

### Step 1: Full Audit Dimensions

Review every screen against these dimensions. Miss nothing.

**Visual Hierarchy:** Does the eye land where it should? Is the most important element the most prominent? Can a user understand the screen in 2 seconds?

**Spacing & Rhythm:** Is whitespace consistent and intentional? Do elements breathe or are they cramped? Is the vertical rhythm harmonious?

**Typography:** Are type sizes establishing clear hierarchy? Are there too many font weights or sizes competing? Does the type feel calm or chaotic?

**Color:** Is color used with restraint and purpose? Do colors guide attention or scatter it? Is contrast WCAG AA compliant?

**Alignment & Grid:** Do elements sit on the 8px grid? Is anything off by 1–2px? Does every element feel locked into the layout with precision?

**Components:** Are similar elements styled identically across screens? Are interactive elements obviously interactive? Are disabled, hover, and focus states all accounted for?

**Iconography:** Are icons consistent in style, weight, and size? From one cohesive set (Lucide React)? Do they support meaning or just decorate?

**Motion & Transitions:** Do transitions feel natural and purposeful? Is there motion that exists for no reason? Does the app feel responsive to tap/click?

**Empty States:** What does every screen look like with no data? Does it feel intentional or broken? Is the user guided toward their first action?

**Loading States:** Are skeleton screens, spinners, or placeholders consistent? Does the app feel alive while waiting?

**Error States:** Are error messages styled consistently? Do they feel helpful and clear?

**Density:** Can anything be removed without losing meaning? Are there redundant elements saying the same thing twice?

**Responsiveness:** Does every screen work at mobile, tablet, and desktop? Are touch targets ≥44px on mobile? Does the layout adapt fluidly — not just snap at three breakpoints?

**Accessibility:** Keyboard navigation, visible focus rings, ARIA labels, color contrast ratios, screen reader flow.

### Step 2: Apply the Jobs Filter

After the full audit, apply the four Jobs Filter questions from Section 21 to every flagged element.

### Step 3: Compile a Design Plan

Structure all findings into three phases:

**PHASE 1 — Critical**
Visual hierarchy, usability, responsiveness, or consistency issues that actively hurt the experience. Fix these before anything else.

**PHASE 2 — Refinement**
Spacing, typography, color, alignment, iconography adjustments that elevate the experience.

**PHASE 3 — Polish**
Micro-interactions, transitions, empty states, loading states, error states, and subtle details that make it feel premium.

### Step 4: Implementation Notes Format

Audit findings must be written as exact, actionable instructions — no ambiguity:

> ✓ `ListingCard` `border-radius: 8px → 12px` per `--radius-lg` token
> ✗ "Make the cards feel softer" — not an instruction

Every change must reference the relevant token or section from this document. Every change must have a design reason, not just a preference.

---

## 23. Scope Discipline

### What the Design System Governs

- Visual design, layout, spacing, typography, color, interaction design, motion, accessibility
- Design token proposals when new values are needed
- Component styling and visual architecture

### What the Design System Does Not Touch

- Application logic, state management, API calls, data models
- Feature additions, removals, or modifications
- Backend structure of any kind

If a design improvement requires a functionality change, flag it explicitly:
> *"This design improvement would require [functional change]. That is outside the design system's scope. Flagging for the engineering team."*

### Functionality Protection

Every design change must preserve existing functionality exactly. The app must remain fully functional and intact after every change. "Make it beautiful" never means "make it different." The app works. The design system's job is to make it feel premium while it keeps working.

### New Token Protocol

If a value is needed that doesn't exist in Section 19, follow this process:
1. Confirm it cannot be achieved with an existing token
2. Propose the token with a name, value, and usage rule
3. Add it to Section 19 before using it
4. Update `globals.css` `:root` block and `tailwind.config.ts` simultaneously

No rogue values. Ever.

### Assumption Escalation

If the intended user behavior for a screen isn't documented, ask before designing for an assumed flow. If a component doesn't exist in the system and you think it should, propose it — don't invent it silently.

> *"I notice there's no [component/token] in the design system for this. I'd recommend adding [proposal]. This should be approved before implementation."*

---

*CasaFinder Brand Guidelines v2.0 — March 2026*
*For questions, contact the product team at contact@lighthouse.house*
