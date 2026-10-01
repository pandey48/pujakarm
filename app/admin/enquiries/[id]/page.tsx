import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminEnquiryActions, AdminLogout } from "@/components/admin-controls";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminEnquiry } from "@/lib/admin-enquiries";

export const dynamic = "force-dynamic";

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(value));
}

function formatPujaDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date(`${value}T12:00:00.000Z`));
}

export default async function AdminEnquiryDetailPage({ params }: PageProps<"/admin/enquiries/[id]">) {
  if (!await isAdminAuthenticated()) redirect("/admin");
  const { id } = await params;
  const enquiry = await getAdminEnquiry(id);
  if (!enquiry) notFound();
  const phoneDigits = enquiry.phone.replace(/\D/g, "");
  const whatsappDigits = phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

  return <main className="admin-page admin-detail-page">
    <div className="admin-page-heading"><div><Link className="admin-back-link" href="/admin/enquiries">← All enquiries</Link><h1>{enquiry.id}</h1><p>{enquiry.status} · Submitted {formatTimestamp(enquiry.createdAt)}</p></div><AdminLogout /></div>
    <div className="admin-detail-grid">
      <section className="admin-detail-card"><h2>Customer details</h2><dl>
        <dt>Name</dt><dd>{enquiry.name}</dd>
        <dt>Mobile</dt><dd>{enquiry.phone ? <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a> : "Not provided"}</dd>
        <dt>WhatsApp</dt><dd>{enquiry.whatsapp || "Not provided"}</dd>
        <dt>City</dt><dd>{enquiry.city || "Not provided"}</dd>
        <dt>Location</dt><dd>{enquiry.location || "Not provided"}</dd>
        <dt>Enquiry type</dt><dd>{enquiry.enquiryType}</dd>
        <dt>Source</dt><dd>{enquiry.source}</dd>
        <dt>Language</dt><dd>{enquiry.languagePreference || "Not provided"}</dd>
      </dl><div className="admin-contact-actions">{enquiry.phone && <><a href={`tel:${enquiry.phone}`}>Call</a><a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer">WhatsApp</a></>}</div></section>
      <section className="admin-detail-card"><h2>Puja details</h2><dl>
        <dt>Puja</dt><dd>{enquiry.puja || "Not specified"}</dd>
        <dt>Pandit</dt><dd>{enquiry.panditName || "Not specified"}</dd>
        <dt>Puja date</dt><dd>{enquiry.pujaDate ? formatPujaDate(enquiry.pujaDate) : "Not specified"}</dd>
        <dt>Preferred time</dt><dd>{enquiry.preferredTime || "Any suitable time"}</dd>
        <dt>Booking type</dt><dd>{enquiry.bookingType || "Not specified"}</dd>
        <dt>Message</dt><dd>{enquiry.message || enquiry.additionalRequirement || "None"}</dd>
        <dt>Gotra</dt><dd>{enquiry.gotra || "Not provided"}</dd>
        <dt>Created at</dt><dd>{formatTimestamp(enquiry.createdAt)}</dd>
        <dt>Updated at</dt><dd>{formatTimestamp(enquiry.updatedAt)}</dd>
      </dl></section>
      <section className="admin-detail-card"><h2>Update enquiry</h2><AdminEnquiryActions id={enquiry.id} initialStatus={enquiry.status} /></section>
      <section className="admin-detail-card"><h2>Internal notes</h2>{enquiry.notes.length ? <ul>{enquiry.notes.map((note) => <li key={note}>{note}</li>)}</ul> : <p>No internal notes.</p>}</section>
    </div>
  </main>;
}
