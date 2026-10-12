"use client";

import { useEffect, useState } from "react";

export function RotatingPujaName({ names }: { names: string[] }) {
  const [nameIndex, setNameIndex] = useState(0);

  useEffect(() => {
    if (names.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotation = window.setInterval(() => {
      setNameIndex((index) => (index + 1) % names.length);
    }, 5000);

    return () => window.clearInterval(rotation);
  }, [names]);

  return <span className="home-hero-puja-name">{names[nameIndex] || names[0] || "Puja"}</span>;
}
