"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/lib/enquiry-types";


export function AdminLogout() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin");
  }
  return <button className="admin-logout" type="button" onClick={logout}>Sign out</button>;
}

export function AdminEnquiryActions({ id, initialStatus }: { id: string; initialStatus: EnquiryStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not update this enquiry.");
      setNote("");
      setMessage("Enquiry updated.");
      router.refresh();
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Could not update this enquiry.");
    } finally {
      setPending(false);
    }
  }

  return <form className="admin-actions-form" onSubmit={save}><label htmlFor="enquiry-status">Status</label><select id="enquiry-status" value={status} onChange={(event) => setStatus(event.target.value as EnquiryStatus)}>{ENQUIRY_STATUSES.map((item) => <option key={item}>{item}</option>)}</select><label htmlFor="enquiry-note">Add a note</label><textarea id="enquiry-note" value={note} onChange={(event) => setNote(event.target.value)} rows={4} maxLength={2000} placeholder="Internal follow-up note" /><button className="button" disabled={pending}>{pending ? "Saving…" : "Save update"}</button>{message && <p role="status">{message}</p>}</form>;
}
