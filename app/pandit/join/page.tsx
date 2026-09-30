import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared";
import { PanditJoinForm } from "@/components/interactions";

export const metadata: Metadata = { title: "Join PujaPath as a Pandit", description: "Register your interest in joining PujaPath as a Pandit.", alternates: { canonical: "/pandit/join" } };

export default function PanditJoinPage() {
  return <><section className="page-intro"><div className="content-wrap"><Breadcrumbs items={[{ label: "Join as Pandit" }]} /><span className="eyebrow">For Pandits & ritual practitioners</span><h1>Register Your Interest</h1><p>Share your experience, areas of expertise and availability preferences. You can review and send your details through WhatsApp.</p></div></section><section className="section"><div className="content-wrap"><div className="form-shell"><PanditJoinForm /></div></div></section></>;
}
