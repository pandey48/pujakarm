import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminEnquiryActions, AdminLogout } from "@/components/admin-controls";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getEnquiry } from "@/lib/enquiry-store";

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
  const enquiry = await getEnquiry(id);
  if (!enquiry) notFound();
  const phoneDigits = enquiry.phone.replace(/\D/g, "");
  const whatsappDigits = phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

  return <main className="admin-page admin-detail-page"><div className="admin-page-heading"><div><Link className="admin-back-link" href="/admin/enquiries">← All enquiries</Link><h1>{enquiry.id}</h1><p>{enquiry.status} · Submitted {formatTimestamp(enquiry.createdAt)}</p></div><AdminLogout /></div><div className="admin-detail-grid"><section className="admin-detail-card"><h2>Customer details</h2><dl><dt>Name</dt><dd>{enquiry.name}</dd><dt>Mobile</dt><dd><a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a></dd><dt>Email</dt><dd>{enquiry.email || "Not provided"}</dd><dt>City</dt><dd>{enquiry.city}</dd><dt>Location</dt><dd>{enquiry.location || "Not provided"}</dd><dt>Language</dt><dd>{enquiry.languagePreference || "Not provided"}</dd></dl><div className="admin-contact-actions"><a href={`tel:${enquiry.phone}`}>Call</a><a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer">WhatsApp</a></div></section><section className="admin-detail-card"><h2>Puja details</h2><dl><dt>Puja</dt><dd>{enquiry.puja}</dd><dt>Puja date</dt><dd>{formatPujaDate(enquiry.pujaDate)}</dd><dt>Preferred time</dt><dd>{enquiry.preferredTime || "Any suitable time"}</dd><dt>Booking type</dt><dd>{enquiry.bookingType}</dd><dt>Gotra</dt><dd>{enquiry.gotra || "Not provided"}</dd><dt>Additional requirements</dt><dd>{enquiry.additionalRequirement || "None"}</dd><dt>Created at</dt><dd>{formatTimestamp(enquiry.createdAt)}</dd><dt>Updated at</dt><dd>{formatTimestamp(enquiry.updatedAt)}</dd></dl></section><section className="admin-detail-card"><h2>Update enquiry</h2><AdminEnquiryActions id={enquiry.id} initialStatus={enquiry.status} /></section><section className="admin-detail-card"><h2>Internal notes</h2>{enquiry.notes.length ? <ul className="admin-notes">{enquiry.notes.map((note, index) => <li key={`${note}-${index}`}>{note}</li>)}</ul> : <p>No notes have been added.</p>}</section></div></main>;
}
