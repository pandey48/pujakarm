import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared";
import { guides } from "@/data/guides";
import { BreadcrumbSchema } from "@/app/schema";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return { title: "Guide not found", robots: { index: false, follow: true } };
  const path = `/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: { title: `${guide.title} | PujaPath`, description: guide.description, siteName: "PujaPath", type: "article", url: path, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: `${guide.title} | PujaPath`, description: guide.description, images: ["/opengraph-image"] },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const path = `/guides/${guide.slug}`;
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    mainEntityOfPage: `${SITE_URL}${path}`,
    author: { "@type": "Organization", name: "PujaPath", url: SITE_URL },
    publisher: { "@type": "Organization", name: "PujaPath", url: SITE_URL },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData).replace(/</g, "\\u003c") }} /><BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Puja Guides", href: "/guides" }, { label: guide.title, href: path }]} /><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Puja Guides", href: "/guides" }, { label: guide.title }]} /><span className="eyebrow">{guide.readingMinutes} min read · Updated {guide.updatedAt}</span><h1>{guide.title}</h1><p>{guide.description}</p></div></section><article className="section guide-article"><div className="content-wrap guide-article-content">{guide.sections.map((section) => <section className="detail-section" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul className="check-list">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<div className="cta-strip"><div><h2>Ready to ask about your puja?</h2><p>Share your ceremony, preferred date and locality. The team will discuss availability and arrangements with you.</p></div><Link className="button" href="/booking">Send an enquiry <ArrowRight size={16} /></Link></div><p><Link className="text-link" href="/cities/mumbai">Pandit and puja enquiries in Mumbai <ArrowRight size={16} /></Link></p></div></article></>;
}
