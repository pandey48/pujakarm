import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = { title: "Request a Puja Booking", description: "Share your puja, city and preferred date with PujaPath.", alternates: { canonical: "/booking" }, robots: { index: false, follow: true } };

export default async function BookingPage({ searchParams }: PageProps<"/booking">) {
  const params = await searchParams;
  const puja = typeof params.puja === "string" ? params.puja : "";
  const presetRequirement = params.question === "samagri" ? "I would like to ask about the samagri list and whether items can be arranged for my puja." : "";
  return <><section className="page-intro booking-page"><div className="content-wrap"><Breadcrumbs items={[{ label: "Booking" }]} /><span className="eyebrow">A good place to begin</span><h1>Request a puja booking</h1><p>Share a few details and we’ll contact you to talk through availability and preparations. Your request is not a confirmed booking.</p></div></section><section className="section"><div className="content-wrap"><div className="form-shell"><BookingForm presetPuja={puja} presetRequirement={presetRequirement} /></div></div></section></>;
}
