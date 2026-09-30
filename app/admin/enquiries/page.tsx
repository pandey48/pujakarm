import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLogout } from "@/components/admin-controls";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listEnquiries, type EnquiryStatus } from "@/lib/enquiry-store";

export const dynamic = "force-dynamic";

const statuses: EnquiryStatus[] = ["New", "Contacted", "Quoted", "Confirmed", "Completed", "Cancelled"];
const displayDate = (value: string) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(value));

export default async function AdminEnquiriesPage() {
  if (!await isAdminAuthenticated()) redirect("/admin");
  const enquiries = await listEnquiries();
  return <main className="admin-page admin-wide"><div className="admin-page-heading"><div><span className="pp-kicker">Private workspace</span><h1>Enquiries</h1><p>Customer submission time and requested puja date are shown separately.</p></div><AdminLogout /></div>
    <div className="admin-stat-grid"><article><span>Total enquiries</span><strong>{enquiries.length}</strong></article>{statuses.slice(0, 5).map((status) => <article key={status}><span>{status}</span><strong>{enquiries.filter((item) => item.status === status).length}</strong></article>)}</div>
    {enquiries.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Enquiry ID</th><th>Customer</th><th>Puja</th><th>City</th><th>Puja date</th><th>Preferred time</th><th>Type</th><th>Status</th><th>Submitted at</th><th /></tr></thead><tbody>{enquiries.map((item) => <tr key={item.id}><td><Link href={`/admin/enquiries/${encodeURIComponent(item.id)}`}>{item.id}</Link></td><td>{item.name}<small>{item.phone}</small></td><td>{item.puja}</td><td>{item.city}</td><td>{item.pujaDate}</td><td>{item.preferredTime || "Any"}</td><td>{item.bookingType}</td><td><span className={`admin-status status-${item.status.toLowerCase()}`}>{item.status}</span></td><td>{displayDate(item.createdAt)}</td><td><Link className="admin-open-link" href={`/admin/enquiries/${encodeURIComponent(item.id)}`}>Open</Link></td></tr>)}</tbody></table></div> : <div className="admin-empty"><h2>No enquiries yet</h2><p>New booking requests will appear here after they are submitted.</p><Link href="/booking">Open the booking form</Link></div>}
  </main>;
}
