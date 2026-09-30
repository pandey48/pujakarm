import type { Metadata } from "next";
import { Breadcrumbs, FAQList } from "@/components/shared";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = { title: "Puja Booking FAQs", description: "Answers to common questions about booking a puja with PujaPath.", alternates: { canonical: "/faq" } };

export default function FAQPage() {
  return <><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "FAQ" }]} /><span className="eyebrow">Good to know</span><h1>Frequently asked questions</h1><p>Some helpful details about choosing a puja, making a request and planning the ceremony.</p></div></section><section className="section"><div className="content-wrap"><div className="info-panel"><FAQList items={faqs} /></div></div></section></>;
}