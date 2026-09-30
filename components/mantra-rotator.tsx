"use client";

import { useEffect, useState } from "react";

const mantras = [
  "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
  "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
  "ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः।",
];

export function MantraRotator() {
  const [index, setIndex] = useState(0);
  const words = mantras[index].split(/\s+/);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % mantras.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pp-hero-mantra" aria-live="polite" aria-atomic="true">
      <p key={index} className="pp-mantra-line" lang="sa">{words.map((word, wordIndex) => <span className="pp-mantra-word" key={`${index}-${wordIndex}`} style={{ animationDelay: `${wordIndex * 360}ms` }}>{word}{wordIndex < words.length - 1 ? " " : ""}</span>)}</p>
      <span className="pp-mantra-count">0{index + 1} <i /> 03</span>
    </div>
  );
}
