"use client";

import { useEffect, useRef } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

export function DeferredHeroVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const connection = (navigator as NavigatorWithConnection).connection;
    const isSlowConnection = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";

    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData || isSlowConnection) return;

    let timer: number | undefined;
    const startVideo = () => {
      timer = window.setTimeout(() => {
        video.src = src;
        video.load();
        void video.play().catch(() => {});
      }, 1200);
    };

    if (document.readyState === "complete") startVideo();
    else window.addEventListener("load", startVideo, { once: true });

    return () => {
      window.removeEventListener("load", startVideo);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [src]);

  return <video ref={videoRef} className="pp-search-hero-video" muted loop playsInline preload="none" poster={poster} aria-hidden="true" />;
}