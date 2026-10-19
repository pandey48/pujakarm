import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Breadcrumbs, CityCard, FAQList, PujaGrid, SectionHeading } from "@/components/shared";
import { BookingForm } from "@/components/booking-form";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { BreadcrumbSchema, ServiceSchema } from "@/app/schema";
import { mumbaiSeoPages } from "@/data/mumbai-seo";
import { slugify } from "@/lib/utils";
import { whatsappUrl } from "@/lib/constants";

const mumbaiFaqs = [
  { question: "How can I enquire about a Pandit in Mumbai?", answer: "Choose a puja and submit your preferred date, Mumbai locality and contact details. PujaPath will follow up to discuss whether a suitable Pandit and format can be arranged." },
  { question: "Can I request a puja at home in Mumbai?", answer: "You can request an at-home puja for your locality. The team checks the specific ceremony, date and location before confirming availability." },
  { question: "Can I join a puja online from Mumbai?", answer: "Some listed pujas support online participation. Open the puja details and enquire so the team can confirm whether that format is available for your request." },
  { question: "Which areas of Mumbai are served?", answer: "You can share your exact locality, including areas such as Andheri, Borivali, Powai, Dadar, Thane or Navi Mumbai. These examples are enquiry locations, not a guarantee of service coverage." },
];

const hyderabadFaqs = [
  { question: "Which pujas can I explore for Hyderabad?", answer: "The catalogue includes Griha Pravesh Puja, Satyanarayan Puja and Rudrabhishek. A listing is not a guarantee of local availability; share your date and locality so the team can discuss your request." },
  { question: "Can I mention a Telugu language preference?", answer: "Yes. Include Telugu or another language preference and any family tradition in your enquiry. The team will confirm what can be arranged for your request." },
  { question: "Which Hyderabad localities can I include?", answer: "You can share an exact area such as Gachibowli, Madhapur, Kondapur, Kukatpally or Secunderabad. These are examples to describe your location, not confirmed service zones." },
];

function findCity(slug: string) {
  const normalizedSlug = slugify(slug);
  return cities.find((city) =>
    city.slug === normalizedSlug || city.aliases?.some((alias) => slugify(alias) === normalizedSlug),
  );
}

function getCityFaqs(city: (typeof cities)[number]) {
  if (city.slug === "mumbai") return mumbaiFaqs;
  if (city.slug === "hyderabad") return hyderabadFaqs;
  const localityText = city.areas.length
    ? `You can include your exact area, such as ${city.areas.slice(0, 3).join(", ")}. These are examples for your enquiry, not confirmed service zones.`
    : "Include your exact neighbourhood in the enquiry so the team can discuss the location with you.";

  return [
    { question: `How can I enquire about a Pandit in ${city.name}?`, answer: `Choose a puja and submit your preferred date, ${city.name} locality and contact details. PujaPath will follow up to discuss whether a suitable Pandit and format can be arranged.` },
    { question: `Can I request a puja at home in ${city.name}?`, answer: `You can send an at-home puja enquiry for ${city.name}. The team checks the ceremony, date and location before confirming availability.` },
    { question: `Which areas of ${city.name} can I include?`, answer: localityText },
  ];
}

export function generateStaticParams() { return cities.filter((city) => city.cityGuideIndexable !== false).map((city) => ({ city: city.slug })); }
export async function generateMetadata({ params }: PageProps<"/cities/[city]">): Promise<Metadata> {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) return { title: "City not found", robots: { index: false, follow: true } };
  const title = city.seoTitle || `Puja Services and Pandit Enquiries in ${city.name}`;
  const description = city.seoDescription || `${city.description} Arrangements and availability are confirmed individually for each enquiry.`;
  return {
    title,
    description,
    alternates: { canonical: `/cities/${city.slug}` },
    openGraph: { title: `${title} | PujaPath`, description, siteName: "PujaPath", type: "website", url: `/cities/${city.slug}`, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: `${title} | PujaPath`, description, images: ["/opengraph-image"] },
    robots: { index: city.cityGuideIndexable !== false, follow: true },
  };
}

export default async function CityDetailPage({ params }: PageProps<"/cities/[city]">) {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) notFound();
  if (slugify(slug) !== city.slug) permanentRedirect(`/cities/${city.slug}`);
  const cityPujas = city.popularPujas.map((name) => pujas.find((puja) => puja.name === name)).filter((puja) => puja !== undefined);
  const isMumbai = city.slug === "mumbai";
  const faqs = getCityFaqs(city);
  const relatedCities = cities.filter((item) => item.slug !== city.slug).slice(0, 4);

  return <>
    {city.serviceAvailability === "verified" && city.availablePujas?.length ? <ServiceSchema city={city.name} /> : null}
    <BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: city.name, href: `/cities/${city.slug}` }]} />
    <section className="page-intro">
      <div className="content-wrap">
        <Breadcrumbs items={[{ label: "Cities", href: "/cities" }, { label: city.name }]} />
        <span className="eyebrow">Puja and Pandit enquiry guide{city.region ? ` · ${city.region}` : ""}</span>
        <div className="city-hero">
          <div>
            <h1>{city.pageHeading || `Puja and Pandit Enquiries in ${city.name}`}</h1>
            <p>{city.description} These city details are enquiry guidance, not a live availability calendar; the team confirms options individually.</p>
            {city.aliases && <p className="city-aliases">Also searched as: {city.aliases.join(", ")}</p>}
            <div className="city-hero-actions">
              <Link className="button" href={`/booking?location=${encodeURIComponent(city.name)}`}>Send a booking enquiry <ArrowRight size={16} /></Link>
              <a className="city-whatsapp-cta" href={whatsappUrl(`Namaste PujaPath, I would like to enquire about a puja in ${city.name}.`)} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" />Ask on WhatsApp</a>
            </div>
          </div>
          <div className="city-hero-stat">
            <strong>{city.region ? `Explore puja enquiries in ${city.region}` : "Enquiry location"}</strong>
            <span>Availability is checked after you share your ceremony, date and locality.</span>
          </div>
        </div>
      </div>
    </section>
    {city.localGuide && <section className="section section-tint"><div className="content-wrap city-local-guide"><SectionHeading eyebrow={`Local planning · ${city.name}`} title={city.localGuide.heading} />{city.localGuide.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>}
    {isMumbai && <section className="section section-tint"><div className="content-wrap"><SectionHeading eyebrow="Mumbai puja enquiries" title="Choose the kind of help you need" text="These guides explain the enquiry process for different services. A request does not guarantee a Pandit, date or location." /><div className="mumbai-seo-grid">{mumbaiSeoPages.filter((page) => ["pandit-booking-mumbai", "puja-at-home-mumbai", "online-puja-mumbai"].includes(page.slug)).map((page) => <Link className="mumbai-seo-card" href={`/${page.slug}`} key={page.slug}><span>{page.h1}</span><ArrowRight size={16} /><p>{page.intro}</p></Link>)}</div></div></section>}
    <section className="section">
      <div className="content-wrap">
        <SectionHeading eyebrow="Rituals to enquire about" title={`Pujas to explore for ${city.name}`} text="Choose a ceremony to see details and send an availability request. The city list does not represent confirmed service availability." />
        {cityPujas.length
          ? <PujaGrid items={cityPujas} />
          : <p>No city-specific puja information is configured yet. <Link href="/pujas" className="text-link">Browse the full puja catalogue <ArrowRight size={16} /></Link></p>}
      </div>
    </section>
    {city.areas.length > 0 && <section className="section section-tint">
      <div className="content-wrap">
        <SectionHeading eyebrow="Locality examples" title={`Where in ${city.name}?`} text="These are example localities for the enquiry form, not confirmed service zones. Add your exact area when you request a booking." />
        <div className="area-pills">{city.areas.map((area) => <Link href={`/booking?location=${encodeURIComponent(`${area}, ${city.name}`)}`} key={area}>{area}</Link>)}</div>
      </div>
    </section>}
    <section className="section">
      <div className="content-wrap">
        <SectionHeading eyebrow="Common questions" title={`${city.name} puja enquiries`} />
        <FAQList items={faqs} />
        {isMumbai && <p><Link href="/mumbai" className="text-link">Browse Mumbai puja guides <ArrowRight size={16} /></Link></p>}
      </div>
    </section>
    <section className="section section-tint">
      <div className="content-wrap">
        <SectionHeading eyebrow="Explore nearby options" title="Browse other city guides" text="Open another location guide to explore rituals, locality examples and enquiry details." />
        <div className="city-grid">{relatedCities.map((relatedCity) => <CityCard city={relatedCity} key={relatedCity.id} />)}</div>
      </div>
    </section>
    <section className="section">
      <div className="content-wrap">
        <div className="contact-grid">
          <div>
            <span className="eyebrow">Start with a request</span>
            <h2 className="story-copy h2">Ask about your puja in {city.name}</h2>
            <p>Let us know your ceremony and preferred date. We will follow up about location and Pandit availability before confirming anything.</p>
            <Link href={`/booking?location=${encodeURIComponent(city.name)}`} className="text-link">Open enquiry form <ArrowRight size={16} /></Link>
            {city.slug === "mumbai" && <Link href="/mumbai" className="text-link">Explore Mumbai puja guides <ArrowRight size={16} /></Link>}
          </div>
          <div className="form-shell"><BookingForm presetLocation={city.name} /></div>
        </div>
      </div>
    </section>
  </>;
}
