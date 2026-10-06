import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BreadcrumbSchema, FaqSchema } from "@/app/schema";
import { Breadcrumbs, FAQList } from "@/components/shared";
import { mumbaiSeoPages, mumbaiSeoSlugs, onlinePujaSlugs } from "@/data/mumbai-seo";
import { pujas } from "@/data/pujas";

export function generateStaticParams() {
  return mumbaiSeoSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = mumbaiSeoPages.find((item) => item.slug === slug);
  if (!page) return { title: "Page not found", robots: { index: false, follow: true } };
  const canonical = `/${page.slug}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical },
    openGraph: { title: page.title, description: page.description, siteName: "PujaPath", type: "website", url: canonical, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: ["/opengraph-image"] },
    robots: { index: true, follow: true },
  };
}

export default async function MumbaiServicePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = mumbaiSeoPages.find((item) => item.slug === slug);
  if (!page) notFound();
  const puja = page.pujaSlug ? pujas.find((item) => item.slug === page.pujaSlug) : undefined;
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Mumbai", href: "/mumbai" }, { label: page.h1, href: `/${page.slug}` }];

  return <>
    <BreadcrumbSchema items={breadcrumbs} />
    <FaqSchema items={page.faqs} />
    <section className="page-intro mumbai-seo-hero">
      <div className="content-wrap">
        <Breadcrumbs items={[{ label: "Mumbai", href: "/mumbai" }, { label: page.h1 }]} />
        <span className="eyebrow">Puja enquiries · Mumbai</span>
        <h1>{page.h1}</h1>
        <p>{page.intro}</p>
        <div className="mumbai-seo-actions">
          <Link className="button" href={puja ? `/booking?puja=${puja.slug}` : "/booking"}>Request a booking <ArrowRight size={16} /></Link>
          <Link className="text-link" href="/cities/mumbai">Mumbai enquiry guide</Link>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="content-wrap mumbai-seo-content">
        <article className="mumbai-seo-article">
          {page.sections.map((section) => <section className="detail-section" key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
            {section.subsections?.map((subsection) => <div key={subsection.heading}>
              <h3>{subsection.heading}</h3>
              <p>{subsection.body}</p>
            </div>)}
            {section.bullets && <ul className="check-list">{section.bullets.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul>}
          </section>)}
          {page.slug === "online-puja-mumbai" && <section className="detail-section"><h2>Explore listed online pujas</h2><ul className="mumbai-online-list">{onlinePujaSlugs.map((pujaSlug) => {
            const onlinePuja = pujas.find((item) => item.slug === pujaSlug);
            return onlinePuja ? <li key={pujaSlug}><Link href={`/pujas/${pujaSlug}`}>{onlinePuja.name}<ArrowRight size={15} /></Link></li> : null;
          })}</ul></section>}
          <section className="detail-section" aria-labelledby="mumbai-faq-title">
            <h2 id="mumbai-faq-title">Frequently asked questions</h2>
            <FAQList items={page.faqs} />
          </section>
        </article>
        <aside className="mumbai-seo-aside">
          <span className="eyebrow">Explore next</span>
          <h2>Related PujaPath guides</h2>
          <ul className="mumbai-core-links">{[
            ["pandit-booking-mumbai", "Pandit Booking in Mumbai"],
            ["puja-at-home-mumbai", "Puja at Home in Mumbai"],
            ["online-puja-mumbai", "Online Puja Services in Mumbai"],
          ].filter(([slug]) => slug !== page.slug).map(([relatedSlug, label]) => <li key={relatedSlug}><Link href={`/${relatedSlug}`}>{label}<ArrowRight size={15} /></Link></li>)}</ul>
          <ul>{page.related.map((relatedSlug) => {
            const related = mumbaiSeoPages.find((item) => item.slug === relatedSlug);
            if (relatedSlug === "mumbai") return <li key={relatedSlug}><Link href="/mumbai">Mumbai puja guide<ArrowRight size={15} /></Link></li>;
            return related ? <li key={relatedSlug}><Link href={`/${related.slug}`}>{related.h1}<ArrowRight size={15} /></Link></li> : null;
          })}</ul>
          {page.slug === "pandit-booking-mumbai" && <p className="mumbai-profile-note">The site does not currently publish confirmed, bookable Mumbai Pandit profiles. Ask the team for the proposed Pandit’s identity, background and availability before confirming a booking.</p>}
          {puja && <Link className="mumbai-puja-link" href={`/pujas/${puja.slug}`}>Read about {puja.name}<ArrowRight size={15} /></Link>}
        </aside>
      </div>
    </section>
    <section className="section section-tint"><div className="content-wrap mumbai-seo-bottom-cta"><div><span className="eyebrow">Start with your occasion</span><h2>Ask about a puja in Mumbai</h2><p>Share your date, locality and preferences. PujaPath will follow up to discuss availability and arrangements.</p></div><Link className="button" href={puja ? `/booking?puja=${puja.slug}` : "/booking"}>Send an enquiry <ArrowRight size={16} /></Link></div></section>
  </>;
}
