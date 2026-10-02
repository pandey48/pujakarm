import { Breadcrumbs } from "@/components/shared";
import { PanditJoinForm } from "@/components/interactions";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({ title: "Join as a Pandit", description: "Register your interest in joining PujaPath as a Pandit.", path: "/pandit/join" });

export default function PanditJoinPage() {
  return <><section className="page-intro pandit-join-page"><div className="content-wrap"><Breadcrumbs items={[{ label: "Join as Pandit" }]} /><span className="eyebrow">For Pandits & ritual practitioners</span><h1>Register Your Interest</h1><p>Share your contact details, languages, puja services and experience for our review.</p></div></section><section className="section pandit-registration-section"><div className="content-wrap pandit-registration-layout"><aside className="pandit-registration-aside"><span className="pandit-registration-kicker">PANDIT PARTNER</span><h2>Share your practice with us.</h2><p>Tell us where you serve and the rituals you perform. Our team will review your details and get in touch.</p><div className="pandit-registration-points"><p><span>01</span><span><strong>Your details</strong><small>Contact and experience</small></span></p><p><span>02</span><span><strong>Your practice</strong><small>Languages and puja services</small></span></p><p><span>03</span><span><strong>Our review</strong><small>We will contact you soon</small></span></p></div></aside><div className="form-shell"><PanditJoinForm /></div></div></section></>;
}
