import { Breadcrumbs, SectionHeading } from "@/components/shared";
import { CityDirectory } from "@/components/city-directory";
import { cities } from "@/data/cities";
import { BreadcrumbSchema } from "@/app/schema";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Puja Services and Pandit Enquiries by City",
  description: "Browse puja guides for Hyderabad, Mumbai and other cities. Explore rituals and locality examples, then send a booking enquiry; availability is confirmed individually.",
  path: "/cities",
});

export default function CitiesPage() {
  const guideCount = cities.filter((city) => city.cityGuideIndexable !== false).length;
  const localityCount = cities.reduce((total, city) => total + city.areas.length, 0);

  return <>
    <BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }]} />
    <div className="cities-index-page">
      <section className="page-intro cities-index-intro">
        <div className="content-wrap">
          <Breadcrumbs items={[{ label: "Cities" }]} />
          <div className="cities-index-hero">
            <div className="cities-index-copy">
              <span className="eyebrow">PujaPath city guides</span>
              <h1>Find Puja Services and a Pandit Near You</h1>
              <p>Explore city guides, example localities and rituals to enquire about. Choose the place that fits your plans and share your preferred date; the team confirms availability individually.</p>
            </div>
            <aside className="cities-index-summary" aria-label="City guide information">
              <span className="cities-index-summary-title">Plan your enquiry with confidence</span>
              <div className="cities-index-stats">
                <div><strong>{guideCount}</strong><span>city guides</span></div>
                <div><strong>{localityCount}+</strong><span>locality examples</span></div>
              </div>
              <p>Localities are examples to help describe your request, not confirmed service zones.</p>
            </aside>
          </div>
        </div>
      </section>
      <section className="section cities-index-section">
        <div className="content-wrap">
          <SectionHeading eyebrow="Explore by location" title="Choose a city or search a nearby area" text="Filter by region or search for a city, locality, alternate name or puja. Open a guide to see local planning notes and enquiry options." />
          <CityDirectory cities={cities} />
        </div>
      </section>
    </div>
  </>;
}
