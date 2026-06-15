# Watchwise India Architecture

## Core Stack

- Next.js App Router with TypeScript, Tailwind CSS, Framer Motion, Lenis and GSAP-ready animation hooks.
- PostgreSQL with Prisma for users, watches, articles, comparisons, consultation workflow, affiliate links and community data.
- Auth can be wired to Clerk through `User.clerkId`; Auth.js can also map into the same user table.
- Razorpay is the primary India payment path for consultations and memberships.
- Sanity or Payload can own editorial content while Prisma owns commerce, users and workflow state.
- Algolia indexes watches, guides, comparisons and encyclopedia entries for fast discovery.

## Launch Modules

- Landing page: cinematic editorial positioning, featured watches, trust signals, newsletter capture.
- Finder: recommendation scoring based on budget, style, movement, strap, case size, occasion and buyer profile.
- Consultation: intake form, wrist-photo upload surface, Calendly link and Razorpay-ready payment step.
- Guides: SEO category architecture, article pages, reading progress, sticky table of contents and schema.
- Compare: dynamic comparison model prepared for programmatic pages such as `/compare/seiko-vs-citizen`.
- Encyclopedia: glossary database for movements, complications, sizing and materials.
- Community: profile, wrist-shot, comments, likes and collection models.
- Admin: analytics, CMS queues, affiliate operations and consultation approval surface.

## Production Integrations

1. Add `DATABASE_URL`, then run `npx prisma migrate dev --name init`.
2. Add Clerk keys and protect `/admin`, profile, collection and consultation dashboard routes.
3. Replace consultation form submit with `POST /api/consultations`, then create Razorpay orders server-side.
4. Send newsletter events to your ESP or CRM from `POST /api/newsletter`.
5. Replace affiliate redirect placeholders with signed Amazon India, Ethos and Helios URLs.
6. Index watch, article and comparison records into Algolia after writes.
7. Add Cloudinary upload presets for wrist photos and editorial imagery.
8. Connect Sanity/Payload webhooks to rebuild guide pages and refresh sitemap metadata.

## SEO System

- Static sitemap and robots are included.
- Article schema is included for guide pages.
- Add FAQ schema per guide and Product/Offer schema per watch detail page once live retailer inventory is connected.
- Programmatic pages should be generated from brand, budget, movement and comparison tuples:
  - `/best-watches-under-5000-india`
  - `/best-automatic-watches-india`
  - `/compare/seiko-vs-citizen`
  - `/brands/seiko/best-under-50000`

## Monetization

- Affiliate clicks flow through `/api/affiliate/[watchId]`.
- Consultation payments use Razorpay.
- Sponsored reviews can be marked in article metadata and managed by admin workflow.
- Premium memberships can reuse Razorpay subscriptions and the `Role` enum can be extended with `PREMIUM`.
- Marketplace resale can add `Listing`, `Offer`, `EscrowPayment` and `AuthenticityCheck` models without changing the watch database.
