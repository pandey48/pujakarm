import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/shared";
import { FixedBookingBar } from "@/components/fixed-booking-bar";
import { BRAND_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";
import "./pujapath.css";
import "./site-polish.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Book Trusted Pandits & Puja Services", template: "%s | PujaPath" },
  description: "Book experienced Pandits online for puja, havan, Griha Pravesh, Satyanarayan Puja and Hindu rituals in India and worldwide.",
  keywords: ["online puja booking", "Pandit booking", "Hindu rituals", "home puja", "online puja"],
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  alternates: { canonical: "/" },
  openGraph: { title: "PujaPath | Book Trusted Pandits & Puja Services", description: "Book experienced Pandits online for puja, havan and Hindu rituals in India and worldwide.", siteName: BRAND_NAME, type: "website", url: SITE_URL, images: [{ url: "/opengraph-image" }] },
  twitter: { card: "summary_large_image", title: "PujaPath | Book Trusted Pandits & Puja Services", description: "Book experienced Pandits online for puja, havan and Hindu rituals worldwide.", images: ["/opengraph-image"] },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><Navbar /><main className="main-content">{children}</main><Footer /><FixedBookingBar /></body>
    </html>
  );
}
