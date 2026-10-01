import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, PackageCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/shared";

const description = "Book puja samagri along with your puja enquiry. PujaPath helps arrange the items needed for your ceremony.";

export const metadata: Metadata = {
  title: "Puja Samagri Booking",
  description,
  alternates: { canonical: "/services/puja-samagri" },
  openGraph: {
    title: "Puja Samagri Booking | PujaPath",
    description,
    siteName: "PujaPath",
    type: "website",
    url: "/services/puja-samagri",
  },
};

export default function PujaSamagriPage() {
  return (
    <>
      <section className="page-intro">
        <div className="content-wrap">
          <Breadcrumbs items={[{ label: "Services", href: "/#services" }, { label: "Puja Samagri" }]} />
          <span className="eyebrow">Ceremony preparations</span>
          <h1>Puja Samagri</h1>
          <p>{description}</p>
        </div>
      </section>
      <section className="section">
        <div className="content-wrap">
          <div className="samagri-service-detail">
            <span className="pp-service-icon"><PackageCheck size={27} strokeWidth={1.7} /></span>
            <h2>Arrange puja essentials with your booking</h2>
            <p>We can arrange the items needed for your puja. Book puja samagri together with your puja enquiry.</p>
            <ul className="check-list">
              <li><Check size={16} />Request samagri along with your puja.</li>
              <li><Check size={16} />Discuss required items based on your puja and location.</li>
              <li><Check size={16} />Confirm final items and availability with our team.</li>
            </ul>
            <Link className="button" href="/booking?question=samagri">Book Puja Samagri <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}