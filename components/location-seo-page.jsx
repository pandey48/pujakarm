import Link from "next/link";
import { ArrowRight, BookOpen, House, MapPin, Video } from "lucide-react";
import { Breadcrumbs, SectionHeading } from "@/components/shared";
import { BreadcrumbSchema, FaqSchema } from "@/app/schema";
import { BRAND_NAME, SITE_URL } from "@/lib/constants";

function JsonLd({ value }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }}
    />
  );
}

function LocationServiceSchema({ name, description, city, area }) {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: { "@type": "Organization", name: BRAND_NAME, url: SITE_URL },
        areaServed: area
          ? { "@type": "Place", name: `${area.name}, ${city.name}` }
          : { "@type": "City", name: city.name },
      }}
    />
  );
}

function getFaqs(page) {
  const { city, area, service } = page;
  if (page.kind === "city") {
    return [
      { question: `How can I enquire about a puja in ${city.name}?`, answer: `Choose a ceremony and share your preferred date and locality in the booking request. PujaPath will follow up to discuss arrangements and confirm availability.` },
      { question: `Can I ask about a home puja in ${city.name}?`, answer: `You can send an enquiry for an at-home ceremony. The team discusses your request and confirms whether suitable arrangements can be made.` },
      { question: `Can I join a puja online from ${city.name}?`, answer: `Some pujas support online participation. Ask about your chosen ceremony so the team can confirm its format.` },
      { question: `Which areas are listed for ${city.name}?`, answer: `The location guide lists areas such as ${city.areas.slice(0, 4).map((item) => item.name).join(", ")}. These are places to include in an enquiry, not a guarantee of coverage.` },
    ];
  }
  if (page.kind === "area") {
    return [
      { question: `How can I enquire about a Pandit in ${area.name}?`, answer: `Share your ceremony, preferred date and exact location in ${area.name}, ${city.name}. The team will discuss your request and confirm availability before any booking.` },
      { question: `Can I request a home puja in ${area.name}?`, answer: `You can ask about an at-home ceremony in ${area.name}. The team confirms the arrangements for your specific request.` },
      { question: `Can I arrange an online puja in ${area.name}, ${city.name}?`, answer: `Some ceremonies can be joined online. Contact the team with your chosen puja to confirm whether that format is suitable.` },
      { question: `Which puja services can I enquire about in ${area.name}?`, answer: `Explore the puja enquiry linked on this page or browse the full puja catalogue. Services, dates and arrangements are confirmed individually.` },
    ];
  }
  return [
    { question: `How do I enquire about ${service.name} in ${area.name}?`, answer: `Use the booking link to share your preferred date and details for ${area.name}, ${city.name}. The team will discuss the ceremony and confirm availability.` },
    { question: `Can ${service.name} be arranged at home?`, answer: `You can ask about an at-home format in your enquiry. The team will confirm the arrangements for this specific ceremony and location.` },
    { question: `Is an online format available for ${service.name}?`, answer: `Online participation depends on the ceremony. Contact the team to confirm whether it can be arranged for your request.` },
  ];
}

function getIntro(page) {
  const { city, area, service } = page;
  if (page.kind === "city") {
    return `Explore puja and Pandit enquiries in ${city.name}. Share your ceremony, preferred date and locality; PujaPath will discuss possible home or online arrangements and confirm availability with you.`;
  }
  if (page.kind === "area") {
    const index = city.areas.findIndex((item) => item.slug === area.slug);
    const intros = [
      `Families planning a ceremony in ${area.name}, ${city.name}, can share their puja, preferred date and any traditions they would like to discuss. PujaPath follows up about preparations and confirms whether arrangements can be made.`,
      `For a puja enquiry in ${area.name}, start with the ceremony and the date you have in mind. Add your locality details so the team can discuss Pandit, home or online arrangements for ${city.name}.`,
      `Whether you are planning a family observance or a home ceremony in ${area.name}, share the details that matter to you. The PujaPath team will discuss the request and confirm availability individually.`,
      `Use this ${area.name}, ${city.name} guide to explore a puja enquiry, nearby location pages and ceremony options. Your preferred date, ritual and arrangements are confirmed with the team before booking.`,
    ];
    return intros[index % intros.length];
  }
  return `${service.shortDescription} Families in ${area.name}, ${city.name}, can share their preferred date and ritual details. PujaPath will discuss possible arrangements and confirm availability before a booking.`;
}

function LocationLinks({ items, className = "location-link-grid" }) {
  return (
    <div className={className}>
      {items.map((item) => (
        <Link href={item.href} className="location-link-card" key={item.href}>
          <span>{item.label}</span><ArrowRight size={16} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

export function LocationSeoPage({ page, areaLinks = [], nearbyAreaLinks = [], serviceLinks = [], relatedServiceLinks = [], bookingHref }) {
  const { kind, city, area, service } = page;
  const faqs = getFaqs(page);
  const currentLabel = kind === "city" ? city.name : kind === "area" ? area.name : service.name;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Puja", href: "/pujas" },
    { label: city.name, href: `/puja/${city.slug}` },
    ...(area ? [{ label: area.name, href: `/puja/${city.slug}/${area.slug}` }] : []),
    ...(service ? [{ label: service.name }] : []),
  ];
  const heading = kind === "city"
    ? `Puja & Pandit Booking in ${city.name}`
    : kind === "area"
      ? `Puja & Pandit Booking in ${area.name}, ${city.name}`
      : `${service.name} in ${area.name}, ${city.name}`;
  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FaqSchema items={faqs} />
      <LocationServiceSchema
        name={service ? service.name : area ? `Puja and Pandit enquiries in ${area.name}` : `Puja and Pandit enquiries in ${city.name}`}
        description={getIntro(page)}
        city={city}
        area={area}
      />
      <section className="location-seo-hero">
        <div className="content-wrap">
          <Breadcrumbs items={breadcrumbItems.slice(1).map((item, index, list) => ({
            label: item.label,
            ...(index < list.length - 1 ? { href: item.href } : {}),
          }))} />
          <div className="location-seo-hero-content">
            <span className="eyebrow"><MapPin size={15} aria-hidden="true" /> Puja enquiries · {area ? `${area.name}, ` : ""}{city.name}</span>
            <h1>{heading}</h1>
            <p>{getIntro(page)}</p>
            <div className="location-seo-cta-row">
              <Link className="button" href={bookingHref}>Enquire about a puja <ArrowRight size={16} /></Link>
              <span>Availability is confirmed individually before booking.</span>
            </div>
          </div>
        </div>
      </section>

      {kind === "city" && (
        <>
          <section className="section">
            <div className="content-wrap">
              <SectionHeading eyebrow={`Explore ${city.name}`} title={`Puja services in ${city.name}`} text={`Browse ceremony enquiries and choose a location to share your requirements. Home or online arrangements depend on the selected puja and are confirmed with the team.`} />
              <LocationLinks items={serviceLinks} />
            </div>
          </section>
          <section className="section section-tint">
            <div className="content-wrap">
              <SectionHeading eyebrow="Local puja guides" title={`Popular areas in ${city.name}`} text="Choose a neighbourhood guide to explore local enquiry details and related ceremonies." />
              <LocationLinks items={areaLinks} />
            </div>
          </section>
        </>
      )}

      {kind === "area" && (
        <>
          <section className="section">
            <div className="content-wrap location-seo-columns">
              <article className="location-seo-panel">
                <span className="location-seo-panel-icon"><BookOpen size={19} /></span>
                <h2>Pandit booking in {area.name}</h2>
                <p>Tell us which ceremony you are planning, when you would like to hold it and any family customs to consider. A request is an enquiry only; the team will discuss the details and confirm availability with you.</p>
              </article>
              <article className="location-seo-panel">
                <span className="location-seo-panel-icon"><House size={19} /></span>
                <h2>Home puja and online options</h2>
                <p>Ask about a Pandit-led home ceremony or online participation for your chosen puja. The available format and preparations depend on the ritual and are confirmed individually.</p>
              </article>
            </div>
          </section>
          <section className="section section-tint">
            <div className="content-wrap">
              <SectionHeading eyebrow="Puja enquiries" title={`Explore a puja in ${area.name}`} text="Open the featured ceremony guide or browse the full catalogue to compare puja details." />
              <LocationLinks items={serviceLinks} />
              <p className="location-catalog-link"><Link href="/pujas">Browse all pujas <ArrowRight size={15} /></Link></p>
            </div>
          </section>
          <section className="section">
            <div className="content-wrap">
              <SectionHeading eyebrow="Nearby location guides" title={`Other areas near ${area.name}`} text={`Explore another area in ${city.name}. These links are location guides and do not represent confirmed service coverage.`} />
              <LocationLinks items={nearbyAreaLinks} />
            </div>
          </section>
        </>
      )}

      {kind === "service" && (
        <>
          <section className="section">
            <div className="content-wrap location-seo-columns">
              <article className="location-seo-panel">
                <span className="location-seo-panel-icon"><BookOpen size={19} /></span>
                <h2>About {service.name}</h2>
                <p>{service.shortDescription} Ritual details, family traditions and preparation can be discussed with the Pandit before confirming a booking.</p>
              </article>
              <article className="location-seo-panel">
                <span className="location-seo-panel-icon"><MapPin size={19} /></span>
                <h2>Enquiries for {area.name}, {city.name}</h2>
                <p>Include your exact locality and preferred date in the request. The team will check whether this ceremony can be arranged for your location.</p>
              </article>
            </div>
            <div className="content-wrap location-service-formats">
              <span><House size={16} /> Ask about a home puja</span>
              <span><Video size={16} /> Ask about online participation</span>
              <p>Format and availability depend on the ceremony and are confirmed with you.</p>
            </div>
          </section>
          <section className="section section-tint">
            <div className="content-wrap">
              <SectionHeading eyebrow="Keep exploring" title={`Related puja services near ${area.name}`} text="Compare other ceremony details or return to the local puja enquiry guide." />
              <LocationLinks items={relatedServiceLinks} />
            </div>
          </section>
        </>
      )}

      <section className="section section-tint">
        <div className="content-wrap">
          <SectionHeading eyebrow="Frequently asked questions" title={`${currentLabel} puja enquiries`} />
          <div className="location-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          {kind !== "city" && (
            <p className="location-parent-link">
              <Link href={`/puja/${city.slug}`}>Explore all puja enquiries in {city.name} <ArrowRight size={15} /></Link>
            </p>
          )}
        </div>
      </section>
      <section className="location-seo-final-cta">
        <div className="content-wrap">
          <div>
            <span className="eyebrow">Share your preferences</span>
            <h2>Plan your puja enquiry with PujaPath</h2>
            <p>Tell us about the ceremony and location. Our team will follow up to discuss preparations and availability.</p>
          </div>
          <Link className="button" href={bookingHref}>Start an enquiry <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
