import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/constants";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  indexable?: boolean;
};

export function createPageMetadata({ title, description, path, indexable = true }: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${BRAND_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      siteName: BRAND_NAME,
      type: "website",
      url: path,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
    robots: { index: indexable, follow: true },
  };
}