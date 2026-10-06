# Mumbai SEO and Search Console checklist

See [mumbai-keyword-map.md](./mumbai-keyword-map.md) for the one-primary-page-per-intent map and the queries to compare in Search Console.

## Sitemap and indexing

1. Confirm `NEXT_PUBLIC_SITE_URL` is set to the production canonical origin in the deployment environment. The current configured origin is `https://www.pujapathin.in`; use the live canonical host consistently.
2. Deploy the site and open `https://www.pujapathin.in/robots.txt`. Confirm it points to `/sitemap.xml`.
3. Open `https://www.pujapathin.in/sitemap.xml` and confirm the homepage, `/mumbai`, Mumbai service guides and puja/city routes appear.
4. In Google Search Console, add and verify the matching Domain or URL-prefix property. Set `GOOGLE_SITE_VERIFICATION` only when using its HTML-tag verification method.
5. In **Indexing → Sitemaps**, submit `https://www.pujapathin.in/sitemap.xml`. Resolve any fetch or URL errors shown by Search Console.

## Request indexing and check coverage

- Use **URL Inspection** for `/mumbai` and each priority service guide after deployment. Check Google's indexed version and rendered canonical; request indexing after reviewing the live page.
- Review **Indexing → Pages** for excluded URLs and reasons such as duplicate canonical, blocked by robots, soft 404 or crawled but not indexed. A submitted URL is not a guarantee of indexing.
- Inspect the live mobile rendering and confirm the page's H1, FAQ copy, internal links and booking CTA appear without client-side interaction.

## Track Mumbai search performance

- In **Performance → Search results**, set a date range and filter queries for `Mumbai`, `Pandit booking`, `puja at home`, `online puja`, and each puja name.
- Compare page and query clicks, impressions, average position and CTR. Review `/mumbai` and the service guides separately from the general homepage.
- Find pages with meaningful impressions but below-site CTR. Compare their title and description with the actual query intent, then make focused edits and annotate the change date.
- Review query groups and page performance monthly. Avoid creating area pages unless PujaPath can substantiate the service area and provide genuinely distinct, useful information.

## Future editorial structure

Use a small `/blog` index and individual `/blog/[slug]` articles when there is useful material to publish. Start with booking guidance, Griha Pravesh preparation, Satyanarayan Puja at home, and how online participation works. Each article should answer its own user question and link to the relevant Mumbai guide and booking form; publish only after the facts and ritual guidance are reviewed by a knowledgeable person.
