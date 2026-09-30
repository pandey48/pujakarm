"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HomeSearch } from "@/components/home-search";
import { pujas } from "@/data/pujas";

const featuredPujas = pujas.slice(0, 10);
const popularPujas = pujas.slice(0, 4);

export function HeroDiscovery() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % featuredPujas.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

  return <>
    <HomeSearch placeholderPuja={featuredPujas[activeIndex].name} />
    <div className="pp-hero-popular" aria-label="Popular puja searches">
      <span>Popular searches</span>
      {popularPujas.map((puja) => <Link key={puja.id} href={`/pujas?q=${encodeURIComponent(puja.name)}`}>{puja.name}</Link>)}
    </div>
  </>;
}
