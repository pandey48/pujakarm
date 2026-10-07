import { notFound } from "next/navigation";
import { locationServices } from "@/data/location-services";
import { LocationSeoPage } from "@/components/location-seo-page";
import { BRAND_NAME, SITE_URL } from "@/lib/constants";
import { getAreaFeaturedService, getSeoLocationParams, resolveLocationPage } from "@/lib/location-seo";

export const dynamicParams = true;

export function generateStaticParams() {
  return getSeoLocationParams();
}

function getMetadataContent(page) {
  const city = page.city;
  const area = page.area;
  if (page.kind === "city") {
    const title = `Puja & Pandit Booking in ${city.name}`;
    const description = `Explore puja and Pandit enquiries in ${city.name} for ${city.services.map((slug) => locationServices.find((service) => service.slug === slug)?.name).filter(Boolean).join(", ")}. Share your locality and preferred date; availability is confirmed individually.`;
    return { title, description };
  }
  if (page.kind === "area") {
    const title = `Pandit & Puja Services in ${area.name}, ${city.name}`;
    const description = `Explore puja enquiries in ${area.name}, ${city.name}. Share your ceremony, preferred date and locality; PujaPath will discuss home or online arrangements and confirm availability with you.`;
    return { title, description };
  }
  const title = page.service.seoTitlePattern
    .replace("{service}", page.service.name)
    .replace("{area}", area.name)
    .replace("{city}", city.name);
  const description = page.service.seoDescriptionPattern
    .replaceAll("{service}", page.service.name)
    .replaceAll("{area}", area.name)
    .replaceAll("{city}", city.name);
  return { title, description };
}

export async function generateMetadata({ params }) {
  const { city: citySlug, segments = [] } = await params;
  const page = resolveLocationPage(citySlug, segments);
  if (!page) return { title: "Puja location not found", robots: { index: false, follow: true } };
  const path = `/puja/${page.city.slug}${page.area ? `/${page.area.slug}` : ""}${page.service ? `/${page.service.slug}` : ""}`;
  const { title, description } = getMetadataContent(page);
  const brandedTitle = `${title} | ${BRAND_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: brandedTitle, description, siteName: BRAND_NAME, type: "website", url: path, images: [{ url: `${SITE_URL}/opengraph-image`, alt: brandedTitle }] },
    twitter: { card: "summary_large_image", title: brandedTitle, description, images: [`${SITE_URL}/opengraph-image`] },
    robots: { index: true, follow: true },
  };
}

export default async function LocationSeoRoute({ params }) {
  const { city: citySlug, segments = [] } = await params;
  const page = resolveLocationPage(citySlug, segments);
  if (!page) notFound();

  const city = page.city;
  const firstArea = city.areas[0];
  const serviceLinks = page.kind === "city"
    ? city.services.map((serviceSlug) => {
      const service = locationServices.find((item) => item.slug === serviceSlug);
      const targetArea = city.areas.find((area) => getAreaFeaturedService(city, area)?.slug === serviceSlug) || firstArea;
      return service && getAreaFeaturedService(city, targetArea)?.slug === serviceSlug
        ? { label: `${service.name} near ${targetArea.name}`, href: `/puja/${city.slug}/${targetArea.slug}/${service.slug}` }
        : null;
    }).filter(Boolean)
    : page.kind === "area"
      ? [{ label: `${page.featuredService.name} in ${page.area.name}`, href: `/puja/${city.slug}/${page.area.slug}/${page.featuredService.slug}` }]
      : [];
  const areaLinks = page.kind === "city"
    ? city.areas.map((area) => ({ label: `Puja enquiries in ${area.name}`, href: `/puja/${city.slug}/${area.slug}` }))
    : [];
  const areaIndex = page.area ? city.areas.findIndex((item) => item.slug === page.area.slug) : -1;
  const nearbyAreaLinks = page.kind === "area"
    ? [-2, -1, 1, 2]
      .map((offset) => city.areas[(areaIndex + offset + city.areas.length) % city.areas.length])
      .filter((item, index, items) => item && item.slug !== page.area.slug && items.findIndex((other) => other.slug === item.slug) === index)
      .map((item) => ({ label: `${item.name}, ${city.name}`, href: `/puja/${city.slug}/${item.slug}` }))
    : [];
  const relatedServiceLinks = page.kind === "service"
    ? locationServices
      .filter((item) => item.slug !== page.service.slug && item.catalogSlug)
      .slice(0, 4)
      .map((item) => ({ label: item.name, href: `/pujas/${item.catalogSlug}` }))
      .concat([{ label: `More pujas in ${page.area.name}`, href: `/puja/${city.slug}/${page.area.slug}` }])
    : [];
  const bookingHref = `/booking?location=${encodeURIComponent(page.area ? `${page.area.name}, ${city.name}` : city.name)}${page.service ? `&serviceRequest=${encodeURIComponent(page.service.slug)}` : page.featuredService ? `&serviceRequest=${encodeURIComponent(page.featuredService.slug)}` : ""}`;

  return (
    <LocationSeoPage
      page={page}
      areaLinks={areaLinks}
      nearbyAreaLinks={nearbyAreaLinks}
      serviceLinks={serviceLinks}
      relatedServiceLinks={relatedServiceLinks}
      bookingHref={bookingHref}
    />
  );
}
