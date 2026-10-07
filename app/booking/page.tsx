import { Breadcrumbs } from "@/components/shared";
import { BookingForm } from "@/components/booking-form";
import { createPageMetadata } from "@/lib/page-metadata";
import { findLocationService } from "@/data/location-services";

export const metadata = createPageMetadata({ title: "Request a Puja Booking", description: "Share your puja, city and preferred date with PujaPath.", path: "/booking", indexable: false });

export default async function BookingPage({ searchParams }: PageProps<"/booking">) {
  const params = await searchParams;
  const selectedPuja = typeof params.puja === "string" ? params.puja : "";
  const serviceRequest = typeof params.serviceRequest === "string" ? params.serviceRequest : "";
  const locationService = findLocationService(serviceRequest);
  const presetLocation = typeof params.location === "string"
    ? params.location
    : typeof params.city === "string"
      ? params.city
      : "";
  const presetDate = typeof params.date === "string" ? params.date : "";
  const presetFormat = typeof params.format === "string" ? params.format : "";
  const isAstrologerEnquiry = params.service === "online-astrologer";
  const puja = isAstrologerEnquiry ? "online-astrologer" : selectedPuja || locationService?.catalogSlug || "";
  const isSamagriEnquiry = params.question === "samagri";
  const presetRequirement = isAstrologerEnquiry
    ? "I would like to book an online astrologer consultation. Please share available session times and details."
    : locationService
      ? `I would like to enquire about ${locationService.name}. Please discuss the available arrangements for my location and preferred date.`
    : isSamagriEnquiry
      ? "I would like to book puja samagri along with my puja. Please help arrange the items needed for my ceremony."
      : "";
  const heading = isAstrologerEnquiry ? "Request an Online Astrologer Consultation" : isSamagriEnquiry ? "Request Puja Samagri" : locationService ? `Enquire about ${locationService.name}` : "Request a puja booking";
  const intro = isAstrologerEnquiry
    ? "Share your questions and preferred time. Our team will confirm consultant availability and session details."
    : locationService
      ? "Share a few details about the ceremony and location. The team will follow up to discuss arrangements and confirm availability."
    : isSamagriEnquiry
      ? "Choose your puja and share your location. We’ll discuss the required items and arrangements with you."
      : "Share a few details and we’ll contact you to talk through availability and preparations. Your request is not a confirmed booking.";
  return <><section className="page-intro booking-page"><div className="content-wrap"><Breadcrumbs items={[{ label: "Booking" }]} /><span className="eyebrow">A good place to begin</span><h1>{heading}</h1><p>{intro}</p></div></section><section className="section"><div className="content-wrap"><div className="form-shell"><BookingForm presetPuja={puja} presetRequirement={presetRequirement} presetLocation={presetLocation} presetDate={presetDate} presetFormat={presetFormat} /></div></div></section></>;
}
