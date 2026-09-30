"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Flame, PackageCheck } from "lucide-react";
import type { Puja } from "@/lib/types";

export function SamagriGuide({ items }: { items: Puja[] }) {
  const [selectedSlug, setSelectedSlug] = useState(items[0]?.slug ?? "");
  const selected = items.find((item) => item.slug === selectedSlug) ?? items[0];
  if (!selected) return null;

  return <section className="pp-samagri" aria-labelledby="samagri-title">
    <div className="pp-wrap pp-samagri-layout">
      <div className="pp-samagri-intro">
        <span className="pp-samagri-icon"><PackageCheck size={22} /></span>
        <span className="pp-kicker">Prepare with confidence</span>
        <h2 id="samagri-title">Know what your puja may need</h2>
        <p>Browse a starter checklist for a ritual. Your Pandit will confirm the final items for your family tradition and location.</p>
        <Link className="pp-view" href={`/booking?puja=${selected.slug}&question=samagri`}>Ask about samagri <ArrowRight size={16} /></Link>
      </div>
      <div className="pp-samagri-card">
        <label htmlFor="samagri-puja">Choose a puja</label>
        <select id="samagri-puja" value={selected.slug} onChange={(event) => setSelectedSlug(event.target.value)}>
          {items.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}
        </select>
        <h3><Flame size={17} /> {selected.name}</h3>
        <ul>{selected.samagri.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
        <small>Common preparation ideas only. Final requirements can vary by vidhi and location.</small>
      </div>
    </div>
  </section>;
}
