"use client";

import { useSyncExternalStore } from "react";
import { Bookmark, Play } from "lucide-react";
import type { VedicMantra } from "@/data/mantras";

const STORAGE_KEY = "pujapath-saved-mantras";

function readSaved(name: string) {
  try {
    return (JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]") as string[]).includes(name);
  } catch {
    return false;
  }
}

export function MantraCard({ mantra }: { mantra: VedicMantra }) {
  const saved = useSyncExternalStore((notify) => {
    const onChange = () => notify();
    window.addEventListener("storage", onChange);
    window.addEventListener("pujapath-mantra-save", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("pujapath-mantra-save", onChange);
    };
  }, () => readSaved(mantra.name), () => false);

  function toggleSaved() {
    try {
      const items = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]") as string[];
      const next = saved ? items.filter((item) => item !== mantra.name) : [...new Set([...items, mantra.name])];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("pujapath-mantra-save"));
    } catch { return; }
  }

  return <article className="pp-mantra-card"><div className="pp-mantra-top"><button className="pp-play" type="button" disabled aria-label={`${mantra.name} audio not available yet`} title="Audio recording not available yet"><Play size={15} fill="currentColor" /></button><span className="pp-audio-unavailable">Audio coming soon</span><button className={`pp-save ${saved ? "is-saved" : ""}`} type="button" aria-pressed={saved} aria-label={saved ? `Remove ${mantra.name} from saved mantras on this device` : `Save ${mantra.name} on this device`} onClick={toggleSaved}><Bookmark size={17} fill={saved ? "currentColor" : "none"} /></button></div><h3>{mantra.name}</h3><p className="pp-sanskrit" lang="sa">{mantra.sanskrit}</p><p className="pp-meaning">{mantra.meaning}</p></article>;
}
