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
  return <>
    <BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }]} />
    <section className="page-intro">
      <div className="content-wrap">
        <Breadcrumbs items={[{ label: "Cities" }]} />
        <span className="eyebrow">PujaPath city guides</span>
        <h1>Find Puja Services and a Pandit Near You</h1>
        <p>Browse city guides for puja services, Pandit enquiries and locality examples. Choose your city and share a ceremony and preferred date; these guides are not a live availability calendar, and arrangements are confirmed individually.</p>
      </div>
    </section>
    <section className="section">
      <div className="content-wrap">
        <SectionHeading title="Explore puja enquiries by city" text="Each city guide includes popular rituals, locality examples and a way to share your request." />
        <CityDirectory cities={cities} />
      </div>
    </section>
  </>;
}
