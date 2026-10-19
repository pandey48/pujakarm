export type PujaType = "Home" | "Online" | "Home & Online";

export interface Puja {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  isPopular?: boolean;
  isIndexable?: boolean;
  duration: string;
  panditCount: string;
  type: PujaType;
  benefits: string[];
  samagri: string[];
  cities: string[];
  image: string;
  faqs: { question: string; answer: string }[];
}

export interface City {
  id: string;
  slug: string;
  name: string;
  description: string;
  areas: string[];
  popularPujas: string[];
  serviceAvailability?: "unverified" | "verified";
  availablePujas?: string[];
  supportedLanguages?: string[];
  cityGuideIndexable?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  pageHeading?: string;
  localGuide?: {
    heading: string;
    paragraphs: string[];
  };
  indexableLocalities?: Record<string, { title: string; description: string; content: string }>;
  legacyLocationSeo?: {
    enquiryServices: string[];
    areaEnquiryServices?: Record<string, string>;
  };
  aliases?: string[];
  region?: string;
}
