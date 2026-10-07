import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, CityCard, FAQList, PujaGrid, SectionHeading } from "@/components/shared";
import { BookingForm } from "@/components/booking-form";
import { cities } from "@/data/cities";
import { pujas } from "@/data/pujas";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/app/schema";
import { mumbaiSeoPages } from "@/data/mumbai-seo";
import { slugify } from "@/lib/utils";

const mumbaiFaqs = [
  { question: "How can I enquire about a Pandit in Mumbai?", answer: "Choose a puja and submit your preferred date, Mumbai locality and contact details. PujaPath will follow up to discuss whether a suitable Pandit and format can be arranged." },
  { question: "Can I request a puja at home in Mumbai?", answer: "You can request an at-home puja for your locality. The team checks the specific ceremony, date and location before confirming availability." },
  { question: "Can I join a puja online from Mumbai?", answer: "Some listed pujas support online participation. Open the puja details and enquire so the team can confirm whether that format is available for your request." },
  { question: "Which areas of Mumbai are served?", answer: "You can share your exact locality, including areas such as Andheri, Borivali, Powai, Dadar, Thane or Navi Mumbai. These examples are enquiry locations, not a guarantee of service coverage." },
];

function findCity(slug: string) {
  const normalizedSlug = slugify(slug);
  return cities.find((city) =>
    city.slug === normalizedSlug || city.aliases?.some((alias) => slugify(alias) === normalizedSlug),
  );
}

function getCityFaqs(city: (typeof cities)[number]) {
  if (city.slug === "mumbai") return mumbaiFaqs;
  const localityText = city.areas.length
    ? `You can include your exact area, such as ${city.areas.slice(0, 3).join(", ")}. These are examples for your enquiry, not confirmed service zones.`
    : "Include your exact neighbourhood in the enquiry so the team can discuss the location with you.";

  return [
    { question: `How can I enquire about a Pandit in ${city.name}?`, answer: `Choose a puja and submit your preferred date, ${city.name} locality and contact details. PujaPath will follow up to discuss whether a suitable Pandit and format can be arranged.` },
    { question: `Can I request a puja at home in ${city.name}?`, answer: `You can send an at-home puja enquiry for ${city.name}. The team checks the ceremony, date and location before confirming availability.` },
    { question: `Which areas of ${city.name} can I include?`, answer: localityText },
  ];
}

export function generateStaticParams() { return cities.map((city) => ({ city: city.slug })); }
export async function generateMetadata({ params }: PageProps<"/cities/[city]">): Promise<Metadata> {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) return { title: "City not found", robots: { index: false, follow: true } };
  const isMumbai = city.slug === "mumbai";
  const title = isMumbai ? "Pandit in Mumbai | Puja at Home & Online Puja" : `Pandit in ${city.name} | Puja at Home & Online`;
  const description = `Enquire about a Pandit in ${city.name} for ${city.popularPujas.slice(0, 2).join(" or ")}. Share your date and locality; PujaPath will confirm availability with you.`;
  const keywords = [
    `Pandit in ${city.name}`,
    `puja at home in ${city.name}`,
    `puja services ${city.name}`,
    ...(city.aliases || []),
    ...city.areas.slice(0, 5).map((area) => `Pandit in ${area}`),
  ];
  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/cities/${city.slug}` },
    openGraph: { title: `${title} | PujaPath`, description, siteName: "PujaPath", type: "website", url: `/cities/${city.slug}`, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: `${title} | PujaPath`, description, images: ["/opengraph-image"] },
    robots: { index: true, follow: true },
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
    <ServiceSchema city={city.name} />
    <FaqSchema items={faqs} />
    <BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: city.name, href: `/cities/${city.slug}` }]} />
    <section className="page-intro">
      <div className="content-wrap">
        <Breadcrumbs items={[{ label: "Cities", href: "/cities" }, { label: city.name }]} />
        <span className="eyebrow">Puja and Pandit enquiry guide{city.region ? ` · ${city.region}` : ""}</span>
        <div className="city-hero">
          <div>
            <h1>{isMumbai ? "Pandit Booking & Puja at Home in Mumbai" : `Pandit & Puja Enquiries in ${city.name}`}</h1>
            <p>{city.description} These city details are enquiry guidance, not a live availability calendar; the team confirms options individually.</p>
            {city.aliases && <p className="city-aliases">Also searched as: {city.aliases.join(", ")}</p>}
          </div>
          <div className="city-hero-stat">
            <strong>{city.region ? `Explore puja enquiries in ${city.region}` : "Enquiry location"}</strong>
            <span>Availability is checked after you share your ceremony, date and locality.</span>
          </div>
        </div>
      </div>
    </section>
    {isMumbai && <section className="section section-tint"><div className="content-wrap"><SectionHeading eyebrow="Mumbai puja enquiries" title="Choose the kind of help you need" text="These guides explain the enquiry process for different services. A request does not guarantee a Pandit, date or location." /><div className="mumbai-seo-grid">{mumbaiSeoPages.filter((page) => ["pandit-booking-mumbai", "puja-at-home-mumbai", "online-puja-mumbai"].includes(page.slug)).map((page) => <Link className="mumbai-seo-card" href={`/${page.slug}`} key={page.slug}><span>{page.h1}</span><ArrowRight size={16} /><p>{page.intro}</p></Link>)}</div></div></section>}
    <section className="section">
      <div className="content-wrap">
        <SectionHeading eyebrow="Rituals to enquire about" title={`Popular Pujas in ${city.name}`} text="Choose a ceremony to see details and send an availability request." />
        <PujaGrid items={cityPujas} />
      </div>
    </section>
    {city.areas.length > 0 && <section className="section section-tint">
      <div className="content-wrap">
        <SectionHeading eyebrow="Locality examples" title={`Where in ${city.name}?`} text="These are example localities for the enquiry form, not confirmed service zones. Add your exact area when you request a booking." />
        <div className="area-pills">{city.areas.map((area) => <span key={area}>{area}</span>)}</div>
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
