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
- `/cities` and `/cities/[city]` Location enquiry guides, including the Mumbai city page
- `/mumbai` and Mumbai service landing pages, including puja-specific guides
- `/guides` and `/guides/[slug]` Editorial guide index and data-driven articles
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

The draft Pandit directory data is not rendered as public profiles. No ratings, experience claims or live availability are published from those draft entries. The homepage consultation cards use only the existing names, designations and contact links; confirm those business details before changing their copy. Mantra bookmarks are saved only in the visitor's browser; audio controls stay disabled until recordings are supplied. City and puja entries are enquiry options and do not promise availability until the team confirms.

Replace the canonical site URL, social links and placeholder contact information before launch. Review the privacy and terms copy with qualified counsel. Configure persistent storage, backups, monitoring and access controls before handling real customer enquiries in production.

## Google Sheets submissions

`/api/enquiries` preserves the existing `type: "lead"` workflow and sends `type: "pandit"` registrations to the configured Google Apps Script Web App. Pandit registrations contain only the eight requested fields; they are not added to the local Leads enquiry store. The Web App URL is set in `lib/google-apps-script.ts`.

The Apps Script source is managed in Google, not in this repository. Add `apps-script/PanditRegistration.gs` to the Apps Script project attached to the existing spreadsheet. In the existing `doPost(e)`, parse the request as it does today, then add this branch before the existing Leads logic (replace `data` below with the existing parsed-payload variable name):

```js
if (data.type === "pandit") {
	try {
		const result = savePanditRegistration_(data);
		return ContentService.createTextOutput(JSON.stringify(result))
			.setMimeType(ContentService.MimeType.JSON);
	} catch (error) {
		return ContentService.createTextOutput(JSON.stringify({
			success: false,
			error: error instanceof Error ? error.message : String(error),
		})).setMimeType(ContentService.MimeType.JSON);
	}
}

if (data.type === "lead") {
	// Keep the existing Leads-save implementation here without changes.
}
```

Do not replace the existing `doPost(e)` or Leads branch. The helper checks for a `Pandits` tab, creates it if missing, writes/validates the eight-column header, and appends the registration row. If the Apps Script is standalone rather than bound to the spreadsheet, bind it to the existing spreadsheet or update the helper to open that spreadsheet by ID before deployment.

### Deploy and verify

1. Open the Apps Script project backing the existing Web App deployment and add the helper plus the Pandit branch above.
2. Save, then use **Deploy > Manage deployments > Edit** on the current Web App deployment. Select **New version**, keep the existing Web App URL, and deploy. Confirm access settings still allow the website to call it.
3. Check that the spreadsheet contains a `Pandits` tab with these columns in order: `Pandit Name`, `Mobile Number`, `WhatsApp Number`, `City`, `State`, `Language`, `Puja/Services`, `Experience`. The helper creates the tab and header on the first registration when absent.
4. Submit a Pandit registration with valid Indian mobile and WhatsApp numbers, at least one language, and at least one puja/service. Confirm a success message and one row with exactly eight cells in `Pandits`.
5. Try empty fields, invalid mobile numbers, and no language/service selections; each must be rejected without adding a row. Double-click submit and confirm only one request is sent while pending.
6. Submit a normal puja enquiry and confirm it still appears in the existing `Leads` sheet with its original columns and behavior.
7. Run `npm run lint` and `npm run build` before production deployment.
