import { Breadcrumbs, SectionHeading } from "@/components/shared";
import { CityDirectory } from "@/components/city-directory";
import { cities } from "@/data/cities";
import { BreadcrumbSchema } from "@/app/schema";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Find a Pandit and Puja by City",
  description: `Explore puja and Pandit enquiry guides for ${cities.slice(0, 5).map((city) => city.name).join(", ")} and more. Search by city, locality or puja; availability is confirmed individually.`,
  path: "/cities",
});

export default function CitiesPage() {
  return <>
    <BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }]} />
    <section className="page-intro">
      <div className="content-wrap">
        <Breadcrumbs items={[{ label: "Cities" }]} />
        <span className="eyebrow">PujaPath city guides</span>
        <h1>Find a Pandit or Puja Near You</h1>
        <p>Search by city, locality, region or puja to explore a local guide and send an enquiry. These guides are not a live availability calendar; the team confirms options individually.</p>
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
