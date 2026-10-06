"use client";

import Link from "next/link";
import { HomeSearch } from "@/components/home-search";
import { pujas } from "@/data/pujas";

const featuredPujas = pujas.slice(0, 10);
const popularPujas = pujas.slice(0, 4);

export function HeroDiscovery() {
  return <>
    <HomeSearch placeholderPuja={featuredPujas[0].name} />
    <div className="pp-hero-popular" aria-label="Popular puja searches">
      <span>Popular searches</span>
      {popularPujas.map((puja) => <Link key={puja.id} href={`/pujas?q=${encodeURIComponent(puja.name)}`}>{puja.name}</Link>)}
    </div>
  </>;
}
