import Image from "next/image";

export function HeroBackdrop({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      preload
      quality={75}
      sizes="(max-width: 640px) 100vw, 1440px"
      className="pp-search-hero-video"
    />
  );
}
