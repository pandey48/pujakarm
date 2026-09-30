# PujaPath

A responsive puja discovery and Pandit enquiry platform built with Next.js App Router, TypeScript and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Create a production build with `npm run build`, and serve it with `npm run start`.

## Routes

- `/` Home, puja search, categories, Pandit directory, mantras and FAQs
- `/pujas` Searchable puja directory
- `/pujas/[slug]` Puja details and booking enquiry
- `/cities` and `/cities/[city]` Location enquiry guides
- `/booking` Booking enquiry form
- `/admin` Private admin sign-in
- `/admin/enquiries` Private enquiry dashboard
- `/pandit/join` Pandit registration enquiry
- `/about`, `/contact`, `/faq`, `/privacy`, `/terms`
- `/sitemap.xml`, `/robots.txt`

## Enquiry storage and admin

Puja booking enquiries are submitted to `/api/enquiries` and stored in a JSON file at `.data/enquiries.json`. Each record keeps `createdAt`, `pujaDate` and `preferredTime` separate. The admin API uses a signed, HTTP-only session.

To enable the dashboard, copy `.env.example` to `.env.local`, set a strong `PUJAPATH_ADMIN_PASSWORD`, replace `PUJAPATH_SESSION_SECRET` with a random value of at least 32 characters, and restart the server. Then open `/admin`. Admin access stays disabled when these values are missing.

The JSON store is a starter persistence adapter for a single long-running Node server. It is not shared across serverless instances and is not a substitute for managed database storage or backups. Set `PUJAPATH_DATA_DIR` to a persistent private directory or replace `lib/enquiry-store.ts` with a database adapter before deploying to an ephemeral/serverless host.

Pandit directory cards are labeled sample profiles, not real Pandits or live availability. Mantra bookmarks are saved only in the visitor's browser; audio controls stay disabled until recordings are supplied. City and puja entries are enquiry options and do not promise availability until the team confirms.

Replace the canonical site URL, social links and placeholder contact information before launch. Review the privacy and terms copy with qualified counsel. Configure persistent storage, backups, monitoring and access controls before handling real customer enquiries in production.
