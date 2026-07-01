# Watchwise India

A premium, production-oriented Indian watch platform built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Lenis, Prisma and PostgreSQL.

## What Is Included

- Cinematic landing page with editorial luxury positioning.
- Interactive watch recommendation engine with INR pricing.
- Consultation intake workflow with upload, Calendly and Razorpay-ready surfaces.
- SEO guide library with article schema, reading progress and sticky table of contents.
- Comparison, encyclopedia, community and admin dashboard routes.
- API contracts for recommendations, consultation capture, newsletter capture and affiliate redirects.
- Prisma schema for users, watches, brands, articles, consultations, affiliate links, comparisons, comments and collections.
- Sitemap, robots, metadata, OpenGraph and architecture notes.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Database

Copy `.env.example` to `.env`, set `DATABASE_URL`, then run:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

The seed loads featured watches and affiliate link records for click tracking.

## Launch Checklist

1. **Database** — Neon or Supabase PostgreSQL, run migrations and seed.
2. **Clerk** — Add publishable/secret keys, webhook at `/api/webhooks/clerk`, set `ADMIN_EMAIL`.
3. **Razorpay** — Add test/live keys, webhook at `/api/webhooks/razorpay` for `payment.captured`.
4. **Resend** — Send consultation and newsletter emails from a verified domain.
5. **Affiliates** — Set `AMAZON_AFFILIATE_TAG` and replace retailer URLs in `src/lib/affiliate.ts` with signed links.
6. **Calendly** — Set `NEXT_PUBLIC_CALENDLY_URL` for post-payment scheduling.
7. **Deploy** — Vercel recommended; verify `/api/health` returns `status: ok`.

## Revenue Paths

- **Consultations** — Rs 999 / Rs 2,499 / Rs 4,999 via Razorpay on `/consultation`.
- **Affiliate clicks** — Tracked in admin dashboard through `/api/affiliate/[watchId]`.
- **Newsletter** — Lead capture on homepage with admin email alerts.

## Launch Integrations

- Clerk or Auth.js for authentication.
- Razorpay for consultation and membership payments.
- Sanity or Payload CMS for editorial workflows.
- Algolia for search across watches, guides, comparisons and encyclopedia.
- Cloudinary for editorial imagery and wrist-photo uploads.
- Amazon India, Ethos and Helios affiliate links through `/api/affiliate/[watchId]`.

See `ARCHITECTURE.md` for the module map, SEO strategy and production wiring checklist.

## Clerk Webhook

In Clerk, create a webhook endpoint:

```text
https://your-domain.com/api/webhooks/clerk
```

Subscribe it to:

- `user.created`
- `user.updated`
- `user.deleted`

Copy the signing secret into:

```env
CLERK_WEBHOOK_SECRET=
```
