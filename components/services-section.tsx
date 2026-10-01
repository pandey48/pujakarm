import Link from "next/link";
import { ArrowRight, House, PackageCheck, Sparkles, Video } from "lucide-react";

const services = [
  {
    title: "Home Puja",
    type: "At home",
    description: "Invite a Pandit to perform a traditional puja at home.",
    action: "Explore Home Pujas",
    href: "/pujas?type=Home",
    Icon: House,
  },
  {
    title: "Online Puja",
    type: "Online participation",
    description: "Join selected ceremonies online; availability is confirmed before booking.",
    action: "Explore Online Pujas",
    href: "/pujas?type=Online",
    Icon: Video,
  },
  {
    title: "Online Astrologer Consultant",
    type: "Consultation",
    description: "Request an online consultation to discuss your questions with an astrologer.",
    action: "Book Consultation",
    href: "/booking?service=online-astrologer",
    Icon: Sparkles,
  },
  {
    title: "Puja Samagri",
    type: "Puja add-on",
    description: "We can arrange the items needed for your puja. Book puja samagri together with your puja enquiry.",
    action: "Book Puja Samagri",
    href: "/services/puja-samagri",
    Icon: PackageCheck,
  },
];

export function ServicesSection() {
  return (
    <section className="pp-services" id="services" aria-labelledby="services-title">
      <div className="pp-wrap">
        <div className="pp-section-heading">
          <div>
            <span className="pp-kicker">Support for your ceremony</span>
            <h2 id="services-title">Our Services</h2>
            <p>Plan your puja and the preparations that go with it.</p>
          </div>
        </div>
        <div className="pp-service-grid">
          {services.map(({ title, type, description, action, href, Icon }) => (
            <article className="pp-service-card" key={title}>
              <div className="pp-service-card-top">
                <span className="pp-service-icon"><Icon size={23} strokeWidth={1.7} /></span>
                <span className="pp-service-type">{type}</span>
              </div>
              <strong>{title}</strong>
              <p>{description}</p>
              <Link className="pp-service-action" href={href}>{action}<ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}