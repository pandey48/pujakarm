import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { CityLanguageBar } from "@/components/city-language-bar";
import { Footer } from "@/components/shared";
import { FixedBookingBar } from "@/components/fixed-booking-bar";
import { BRAND_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";
import "./pujapath.css";
import "./site-polish.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Pandit Booking, Puja at Home & Online Puja", template: "%s | PujaPath" },
  description: "Explore Hindu pujas and request a Pandit for a ceremony at home or online. Share your city and preferences; PujaPath confirms availability before booking.",
  keywords: ["online puja booking", "Pandit booking", "Hindu rituals", "home puja", "online puja"],
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  alternates: { canonical: "/" },
  openGraph: { title: "Pandit Booking, Puja at Home & Online Puja | PujaPath", description: "Explore Hindu pujas and request a Pandit for a ceremony at home or online. Availability is confirmed before booking.", siteName: BRAND_NAME, type: "website", url: SITE_URL, images: [{ url: "/opengraph-image" }] },
  twitter: { card: "summary_large_image", title: "Pandit Booking, Puja at Home & Online Puja | PujaPath", description: "Explore Hindu pujas and request a Pandit for a ceremony at home or online. Availability is confirmed before booking.", images: ["/opengraph-image"] },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><Navbar /><CityLanguageBar /><main className="main-content">{children}</main><Footer /><FixedBookingBar /></body>
    </html>
  );
}
