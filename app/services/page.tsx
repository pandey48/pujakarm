import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { BreadcrumbSchema } from "@/app/schema";
import { BookingForm } from "@/components/booking-form";
import { Breadcrumbs, CityCard, FAQList, PujaGrid, SectionHeading } from "@/components/shared";
import { PujaExplorer } from "@/components/interactions";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Pandit and Puja Services",
  description: "Explore PujaPath's puja services, browse ceremonies by category and send an enquiry with your city, locality and language preference.",
  path: "/services",
});

const serviceFaqs = [
  {
    question: "How do I enquire about a puja service?",
    answer: "Choose a service and submit the enquiry form with your contact details, city and locality. The PujaPath team will follow up to discuss the ritual and arrangements.",
  },
  {
    question: "Can I share a preferred city, area and language?",
    answer: "Yes. Include your city, area or locality and preferred language in the enquiry. These are recorded as preferences; the team confirms whether arrangements can be made.",
  },
  {
    question: "Does submitting an enquiry confirm a booking?",
    answer: "No. Sending an enquiry or opening WhatsApp does not confirm a booking. The team will discuss your request and confirm availability and details with you.",
  },
];

const cityGuides = cities.filter((city) => city.cityGuideIndexable !== false);
const popularPujas = pujas.filter((puja) => puja.isPopular).slice(0, 4);

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} />
      <section className="page-intro">
        <div className="content-wrap">
          <Breadcrumbs items={[{ label: "Services" }]} />
          <span className="eyebrow">Rituals, with care</span>
          <h1>Pandit and Puja Services</h1>
          <p>Explore ceremonies for your family, home and important occasions. Choose a service to learn more, then send an enquiry so the team can discuss your preferences and availability.</p>
          <Link className="button" href="#service-enquiry">Send a service enquiry <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Popular services"
            title="Pujas families often explore"
            text="Read about a ceremony and ask the team about arrangements for your occasion."
            link={{ label: "Browse all pujas", href: "/pujas" }}
          />
          <PujaGrid items={popularPujas} />
        </div>
      </section>

      <section className="section section-tint" id="all-services">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Browse the catalogue"
            title="Find a puja or service"
            text="Search by name or browse the categories. Service details, format and availability are confirmed individually."
          />
          <PujaExplorer />
        </div>
      </section>

      <section className="section" id="service-enquiry">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Tell us what you need"
            title="Request a puja or Pandit"
            text="Choose a service and share your city, locality and preferred language. Location suggestions are for enquiries only, not a promise of coverage."
          />
          <div className="form-shell">
            <BookingForm />
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="content-wrap">
          <SectionHeading
            eyebrow="Location guides"
            title="Explore city enquiry guides"
            text="These guides explain how to request a puja in a city. They do not represent live Pandit availability."
            link={{ label: "View all cities", href: "/cities" }}
          />
          <div className="city-grid">
            {cityGuides.map((city) => <CityCard key={city.id} city={city} />)}
          </div>
          <p><MapPin size={16} aria-hidden="true" />Other locations available as enquiry preferences:</p>
          <div className="city-grid">
            {cities.filter((city) => !cityGuides.some((guide) => guide.slug === city.slug)).map((city) => (
              <Link key={city.name} className="city-card" href={`/booking?city=${encodeURIComponent(city.name)}`}>
                <MapPin size={16} aria-hidden="true" /><span>Enquire in {city.name}</span><ArrowRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="content-wrap">
          <SectionHeading eyebrow="Before you enquire" title="Common questions" />
          <FAQList items={serviceFaqs} />
        </div>
      </section>
    </>
  );
}
