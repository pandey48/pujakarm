import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { Breadcrumbs } from "@/components/shared";
import { guides } from "@/data/guides";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Puja Guides and Booking Advice",
  description: "Practical guidance for planning a puja, preparing your enquiry and discussing ceremony arrangements with PujaPath.",
  path: "/guides",
});

export default function GuidesPage() {
  return <><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Puja Guides" }]} /><span className="eyebrow">Plan with clarity</span><h1>Puja Guides</h1><p>Practical information about choosing a ritual, preparing an enquiry and discussing arrangements. Availability and ceremony details are confirmed for each request.</p></div></section><section className="section"><div className="content-wrap"><div className="guide-grid">{guides.map((guide) => <article className="guide-card" key={guide.slug}><span className="guide-card-icon"><BookOpenText size={21} /></span><span className="eyebrow">{guide.readingMinutes} min read</span><h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2><p>{guide.description}</p><Link className="text-link" href={`/guides/${guide.slug}`}>Read the guide <ArrowRight size={16} /></Link></article>)}</div></div></section></>;
}
