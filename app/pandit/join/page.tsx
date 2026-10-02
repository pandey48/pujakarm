import { Breadcrumbs } from "@/components/shared";
import { PanditJoinForm } from "@/components/interactions";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({ title: "Join as a Pandit", description: "Register your interest in joining PujaPath as a Pandit.", path: "/pandit/join" });

export default function PanditJoinPage() {
  return <><section className="page-intro pandit-join-page"><div className="content-wrap"><Breadcrumbs items={[{ label: "Join as Pandit" }]} /><span className="eyebrow">For Pandits & ritual practitioners</span><h1>Register Your Interest</h1><p>Share your contact details, languages, puja services and experience for our review.</p></div></section><section className="section"><div className="content-wrap"><div className="form-shell"><PanditJoinForm /></div></div></section></>;
}
