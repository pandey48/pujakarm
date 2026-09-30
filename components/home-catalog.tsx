"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PujaGrid } from "@/components/shared";
import type { Puja } from "@/lib/types";

const categoryGroups: Record<string, string[]> = {
  "Deity Pujas": ["Deity Pujas"],
  "Home Pujas": ["Home Pujas"],
  "Shiva Pujas": ["Shiva Pujas"],
  "Graha Shanti": ["Graha Shanti"],
  "Paths & Wellbeing": ["Paths & Wellbeing"],
  "Marriage & Sanskars": ["Marriage & Sanskars"],
  "Ancestral Rituals": ["Ancestral Rituals"],
  "Homam & Havan": ["Homam & Havan"],
};

const popularSlugs = ["ganesh", "griha-pravesh", "satyanarayan", "lakshmi", "rudrabhishek", "navgraha", "durga", "hanuman"];

export function HomeCatalog({ items }: { items: Puja[] }) {
  const [active, setActive] = useState("Popular");
  const visibleItems = useMemo(() => {
    if (active === "Popular") return popularSlugs.flatMap((slug) => { const match = items.find((puja) => puja.id === slug); return match ? [match] : []; });
    return items.filter((puja) => categoryGroups[active]?.includes(puja.category));
  }, [active, items]);
  const tabs = ["Popular", ...Object.keys(categoryGroups)];

  return <section className="pp-catalog" id="pujas">
    <div className="pp-wrap">
      <div className="pp-section-heading"><div><span className="pp-kicker">Browse ceremonies</span><h2>{active === "Popular" ? "Popular Pujas" : active}</h2><p>{active === "Popular" ? "Traditional rituals for important moments in life." : `Browse ${active.toLowerCase()} by name and open any puja for details.`}</p></div><Link className="pp-view" href="/pujas">View All Pujas <span aria-hidden="true">→</span></Link></div>
      <div className="pp-catalog-tabs" aria-label="Filter pujas by category">{tabs.map((category) => <button type="button" key={category} aria-pressed={active === category} className={active === category ? "is-active" : ""} onClick={() => setActive(category)}>{category}</button>)}</div>
      <PujaGrid items={visibleItems} />
      <p className="pp-availability-note">Home and online labels show listed formats. The team confirms availability for each enquiry.</p>
    </div>
  </section>;
}
