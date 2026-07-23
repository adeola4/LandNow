# LandNow — Website Content Manifest

> Extract all copy, CTAs, form fields, and structural content from `index.html`

---

## SEO / Meta

| Field | Content |
|-------|---------|
| Title | LandNow — Private Network for Land & Water Rights Professionals |
| Description | A private network for investors, operators, developers, and professionals focused on land acquisitions, water rights, due diligence, and strategic partnerships. |
| OG Title | LandNow — Where Serious Land & Water Rights Professionals Connect |
| OG Description | Private network. Proven frameworks. Expert insights. For people who execute. |

---

## Splash / Intro

- **Video**: `video.mp4` (15s, 1920x1080, H.264)
- **Text overlay**: "Tap to continue" (pulsing)
- **Loader**: "Loading" text
- **Behavior**: Plays once per session (sessionStorage flag). First visit shows splash, returning visitors skip to site.

---

## Navigation (Fixed Top Bar)

| Element | Link | Style |
|---------|------|-------|
| Brand | `index.html` | "LandNow" — uppercase, bold tracking |
| CTA | `#membership` | "See If You Qualify" — filled brown button, hidden on mobile |
| Mobile | — | Hamburger icon (SVG, no JS attached) |

---

## 1. Hero Section

**Background**: White

**Headline** (h1):
> The Most Defensible Physical Assets in the American West Aren't Listed on Any Exchange.

**Subcopy**:
> While capital chases digital derivatives, a separate market is quietly absorbing the assets every future depends on — water, land, and the rights to both.
>
> This network gives you the deal flow, legal frameworks, and operator connections to source and close these positions before the broader market catches on.

**CTAs**:
| Button | Link | Style |
|--------|------|-------|
| See If You Qualify (primary) | `#membership` | Filled brown, big (`px-12 py-5`), white text |
| Or explore what this network actually delivers → | `#agenda` | Small text link, 10px uppercase |

**Media**: `hero-bg.mp4` (land aerial drone) — right half, 50% width, 500px tall

---

## 2. Marquee Ticker Strip

**Background**: Dark brown (#3d372e)

**Scrolling text** (repeated twice, seamless loop):
> Water Rights Acquisitions • Due Diligence Frameworks • Off-Market Deal Flow • Prior Appropriation Analysis • Title Chain Verification • Leaseback Structuring • Basin Intelligence • Resource Unbundling • Senior Water Rights • Agricultural Corridors • Legal Frameworks • Operator Networks

---

## 3. Agenda Section

**Background**: Cream (#e5e0d4)

**Headline** (h2):
> What This Network Actually Delivers.

**Subcopy**:
> No masterminds. No courses. No newsletters. This is a transactional environment for buyers who acquire physical land and water rights — or are positioning capital to do so with proven operational infrastructure.
>
> The agenda is straightforward:

**4 Pillars**:

| # | Title | Description |
|---|-------|-------------|
| 01 | OFF-MARKET DEAL FLOW | Proprietary access before public listings. Sourced through operator networks, not brokerages. |
| 02 | BATTLE-TESTED LEGAL FRAMEWORKS | Navigate prior appropriation & adjudicated basins without the $100k+ learning curve. |
| 03 | OPERATOR ACCESS | Direct connections to hydrologists, basin water attorneys, and local operators. |
| 04 | RIGOROUS DUE DILIGENCE | Separate "paper water" from "wet water" before you commit capital. |

**Bottom line**:
> You acquire natural capital with the confidence and deal flow that takes a decade to build elsewhere.

**Media**: `building-construction.mp4` (timelapse construction) — right column, 40% width, 500px tall

---

## 4. What This Is Section

**Background**: Dark brown (#3d372e), cream text

**Headline** (h2):
> A Working Network for Resource Investors.

**Body**:
> We run a closed, vetted room of acquisition operators, water rights counsel, agricultural managers, and private family offices. We build the physical and legal infrastructure to transact, unbundle, and manage resource assets together.
>
> Every meeting reviews active deals. Every member is vetted. Every intelligence brief is focused on securing defensible, inflation-resistant natural capital.

**Two-column comparison**:

| NOT THIS | THIS IS |
|----------|---------|
| — A real estate forum | — A private, transactional room |
| — A course on land flipping | — Off-market deal sharing |
| — A passive newsletter | — Hands-on diligence support |
| — An advisory service | — A vetted buyer network |

**Media**: `farm-bg.mp4` (rural/farming) — left column, 50% width, 450px tall

---

## 5. Why Now Section

**Background**: Cream (#e5e0d4)

**Headline** (h2):
> The Structural Repricing of Physical Water Has Begun.

**Lead**:
> Three secular forces are creating an asymmetric window — and it won't stay open:

**3 Forces**:

| # | Title | Body |
|---|-------|------|
| 01 | Groundwater Depletion Is Structural | Colorado River cuts are permanent. The Ogallala Aquifer is in active decline. Water rights are transitioning from an agricultural input to a standalone institutional asset class. Smart capital got the memo. |
| 02 | Regulatory Complexity = Moat | The investor who can parse title records and hydrological reports owns the market. The buyer who guesses absorbs the cost of dry wells. |
| 03 | Institutional Money Is Arriving | PE and pension funds are quietly buying senior water rights. Private buyers have a narrow window before institutional aggregators drive valuations out of reach. |

**Bottom line callout**:
> **The bottom line on waiting:** Every year of delay costs you both the deal flow available now and the learning curve advantage you could have built inside this network.

**Media**: `river.mp4` (river) — left column (reversed layout), 40% width, 450px tall

---

## 6. In Practice — Case Study Carousel

**Background**: White

**Headline** (h2):
> Not Theory. Active Acquisitions.

**Subcopy**:
> These aren't stock photos. They're the asset classes our members are actively acquiring, unbundling, and placing.

**4 Slides** (horizontal carousel with dots + prev/next buttons):

| # | Title | Description | Video |
|---|-------|-------------|-------|
| Case Study 01 | Dam-Adjacent Water Rights | Members recently closed on a portfolio of senior water rights tied to a federal dam project in the Colorado Basin. The unbundling strategy separated storage rights from surface title, generating two revenue streams from a single acquisition. | `dam.mp4` |
| Case Study 02 | Agricultural Corridor Assembly | A family office member aggregated three contiguous irrigated parcels with appurtenant water rights in the Central Valley. Network counsel structured the leasebacks to maintain beneficial use while generating 8.5% cash-on-cash yield from day one. | `house-property.mp4` |
| Case Study 03 | Municipal Water Supply Lease | A member with pre-1914 appropriative rights leased annual water allocation to a growing Colorado municipality under a 20-year storage agreement. The lease yields 9.2% annually while preserving the seniority of the underlying right in perpetuity. | `water-pouring.mp4` |
| Case Study 04 | Timber & Resource Bundling | A multi-generational timber tract in the Pacific Northwest was acquired through the network and reorganized into three tranches: timber harvest rights, conservation easement, and recreational access. Total realized value was 3.2x the entry price. | `carpenter-wood.mp4` |

**Navigation**: Left/right arrow buttons (circular, white bg), 4 dots below

---

## 7. Proof / Metrics Strip

**Background**: White

| Metric | Value |
|--------|-------|
| Member Assets Under Management | $47M+ |
| Active Vetted Members | 127 |
| Basins Monitored | 18 |
| Member Retention Rate | 92% |

---

## 8. Benefits Grid

**Background**: Cream (#e5e0d4)

**Headline** (h2):
> What Membership Actually Gives You

**Subcopy**:
> Every framework is built to protect capital, prevent title failures, and secure arbitrage yield.

**7 Benefit Cards**:

| # | Title | Description | Translation |
|---|-------|-------------|-------------|
| 1 | DUE DILIGENCE FRAMEWORKS THAT SAVE YOU FROM $100K+ MISTAKES | Our checklists are built specifically for water rights — tracing priority dates, mapping diversion points, verifying historic beneficial use, and uncovering abandonment risks before you make an offer. | Avoid the title and flow errors that destroyed first-time investors. |
| 2 | A VETTED NETWORK — ZERO TOURISTS, ZERO TIME-WASTERS | Every member is screened for capital or operational experience. You're not joining a public forum. You're entering a closed room of active ranchers, water lawyers, agricultural managers, and family office directors who actually close transactions. | Your network determines your net worth. Ours is pre-filtered. |
| 3 | LIVE DEAL ANALYSIS — WATCH REAL TRANSACTIONS CLOSE | We unpack active acquisitions in real time: hydrological reports, title chains, easement agreements, exit multiples. You learn by watching deals happen, not studying hypotheticals. | You'll never hear about a post-close deal and wish you'd been in the room. |
| 4 | BENEFICIAL USE & LEASEBACK STRUCTURING | Avoid the "use-it-or-lose-it" trap. Learn how to structure water lease agreements, municipal storage contracts, and agricultural share-crop leases that keep your rights active. | The difference between a clean close and a 5-year legal liability is knowing which questions to ask before you sign. |
| 5 | CURATED BASIN INTELLIGENCE — BEFORE THE MARKET CATCHES ON | We monitor regulatory shifts, water district adjudications, and municipal acquisitions across key basins. Raw, actionable signal without the noise. | While others wait for the Forbes headline, you're already positioned. |
| 6 | RESOURCE UNBUNDLING & EXIT MECHANICS | Separate water rights from surface titles. Lease water to municipalities while selling dry land to agricultural operators. Maximize liquidity on both sides. | Getting in is half the equation. Getting out with profit is the one that matters. |
| 7 (wide) | PRIORITY ACCESS TO MEMBER-LED DEAL SYNDICATIONS | When a basin operator finds a tract too large to fund alone, they share it here first. | The best deals never hit the public market. Yours will be offered here first. |

---

## 9. Testimonials / Review Carousel

**Background**: Dark brown (#3d372e), cream text

**Headline** (h2):
> Trusted by Active Operators Across the Country.

**4 Testimonials** (carousel with full dots + prev/next buttons, 5s autoplay):

| Quote | Author | Location |
|-------|--------|----------|
| "The water title checklists saved us from an overallocated ditch in Colorado that would have cost us $140,000 on paper water with zero wet water capacity. That single catch paid for our participation for life." | Basin Operator | Colorado |
| "Unbundling senior water rights from a 640-acre parcel allowed us to lease the water to a municipal district at 9% yield, while selling the dry land to a dryland farmer. The legal templates made it possible." | Managing Partner | Resource Fund, Arizona |
| "I'd been studying water rights for 2 years before joining. What I learned in the first month would have saved me $80k in a bad deal I was about to close. The network paid for itself instantly." | Family Office Director | Texas |
| "The deal flow alone paid for my involvement 10x in the first quarter. But the operators I met through this network are what made the difference. It's not a content platform - it's a transaction network." | Private Investor | California |

---

## 10. Who This Is For (Profile Section)

**Background**: Cream (#e5e0d4)

**Headline** (h2):
> This Network Is Built for a Specific Profile.

**Right Fit** (✓ in tan):
- You're an accredited investor, family office manager, or active operator acquiring real assets
- You prioritize proprietary deal flow and information asymmetry over public listings
- You can analyze title deeds, water rights filings, and hydrological reports
- You're ready to actively commit capital or operating expertise

**Wrong Fit** (✗ in red):
- You want passive residential real estate or index funds
- You're chasing get-rich-quick agricultural flips
- You expect to consume research without sharing basin insights
- You lack the liquid capital to execute physical land or water acquisitions

---

## 11. Urgency / Limited Membership

**Background**: Dark brown (#3d372e), cream text

**Headline** (h2):
> Membership Is Limited. Intentionally.

**3 Reasons**:

| # | Title | Body |
|---|-------|------|
| 01 | Transaction Confidentiality | Off-market deals require strict discretion. Smaller rooms protect sensitive terms. |
| 02 | Capacity Limits | We support every member with direct underwriting and legal analysis. We limit cohort onboarding to ensure every deal gets reviewed. |
| 03 | Asymmetric Opportunity Is Scarce | If deal flow is shared with too many, the pricing edge disappears. |

**Stats callout**:
- Current capacity: **127** members
- Waitlist: **42**
- Next cohort opens: **July 15, 2026**
- Application deadline: **July 10, 2026**
- Price increases to **$5,000** on July 10 from current **$2,997/quarter**

---

## 12. Membership / Application Form

**Background**: Cream (#e5e0d4)

**Headline** (h2):
> The Question Isn't Whether These Assets Matter.
> It's Whether You Have the Infrastructure to Move on Them.

**Subcopy**:
> If you're ready to operate at this level, we want to hear from you.

**10 Form Fields**:

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| Full Name | text | Yes | "Your full name" |
| Email Address | email | Yes | "you@example.com" |
| Phone Number | tel | No | "+1 (555) 000-0000" |
| Location | text | No | "City, State / Country" |
| Company / Role | text | No | "Your company or professional role" |
| Investment Experience | select | No | Options: Accredited investor — active in real assets / Experienced investor — new to land/water / Some exposure — looking to scale / New to investing — building knowledge |
| Investment Range | select | No | Options: Under $100K / $100K – $500K / $500K – $1M / $1M – $5M / $5M+ |
| Social Media | select | No | Options: Instagram / X (Twitter) / Threads / Discord / Others |
| Social Media Handle | text | No | "e.g. @username" |
| Referred By | text | No | "Who referred you?" |
| Message (Optional) | textarea | No | "Tell us about your background and what you're looking to accomplish..." |

**Submit Button**:
> Apply for Membership — $297 Verification Fee

**Risk reversal** (below form):
> Credited toward your first quarter if accepted. Fully refunded if not.

**Submission**: POST to `/api/submit-entry` (JSON), sends Discord webhook embed titled "New Membership Application"

**Media**: `building-drone-shot.mp4` (high-rise drone) — right column, 50% width, 400px tall

---

## 13. Footer

**Background**: Dark brown (#3d372e), champagne text (#C7A37A)
**Height**: 85vh minimum

**Navigation** (Cormorant Garamond, large serif, 3-5rem):
- Start → `index.html`
- About → `#what-it-is`
- Benefits → `#benefits`
- How It Works → `#agenda`
- Membership → `#membership`
- Who This Is For → `#profile`
- Contact → `mailto:foreignaffairsllc2017@gmail.com`

**Right column** (18% width):
- Email icon (circular border, envelope SVG)
- Legal links: Privacy Policy, Terms & Conditions, Contact, Support
- Copyright: © 2026 LandNow. All rights reserved.

**Wordmark**: Giant "LANDNOW" spanning full width (14vw, 5% opacity)

---

## Technical Notes

- **Form destination**: `/api/submit-entry` — Vercel serverless function sends Discord embed
- **Discord webhook**: Set via `DISCORD_WEBHOOK_URL` env var in Vercel
- **Fonts**: Libre Baskerville (headings), Outfit (body/sans), Cormorant Garamond (footer nav)
- **Colors**: `ln-brown` #3d372e, `ln-tan` #b5925a, `ln-cream` #e5e0d4
- **Videos**: 9 videos with poster PNG images. Posters load first, videos stream in background.
- **Splash**: `video.mp4` intro, once per session (sessionStorage)
- **Carousels**: Review carousel (autoplay 5s) + Practice case study carousel (autoplay 6s)
- **Reveal animations**: IntersectionObserver-based fade-in on scroll
- **Cookie banner**: Fixed bottom center, dismissible
