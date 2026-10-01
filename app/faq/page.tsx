import { Breadcrumbs, FAQList } from "@/components/shared";
import { faqs } from "@/data/faqs";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({ title: "Puja Booking FAQs", description: "Answers to common questions about booking a puja with PujaPath.", path: "/faq" });

export default function FAQPage() {
  return <><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "FAQ" }]} /><span className="eyebrow">Good to know</span><h1>Frequently asked questions</h1><p>Some helpful details about choosing a puja, making a request and planning the ceremony.</p></div></section><section className="section"><div className="content-wrap"><div className="info-panel"><FAQList items={faqs} /></div></div></section></>;
}