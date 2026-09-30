import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { adminIsConfigured, isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (await isAdminAuthenticated()) redirect("/admin/enquiries");
  const configured = adminIsConfigured();
  return <main className="admin-page"><section className="admin-login-card"><span className="pp-kicker">PujaPath · Private</span><h1>Admin sign in</h1>{configured ? <><p>Sign in to review and manage puja enquiries.</p><AdminLoginForm /></> : <div className="admin-setup-note"><strong>Admin access needs setup.</strong><p>Set <code>PUJAPATH_ADMIN_PASSWORD</code> and a random <code>PUJAPATH_SESSION_SECRET</code> of at least 32 characters in the server environment, then restart the app.</p></div>}</section></main>;
}
