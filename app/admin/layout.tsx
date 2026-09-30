import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private admin area",
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
