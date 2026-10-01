export type PujaType = "Home" | "Online" | "Home & Online";

export interface Puja {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  isPopular?: boolean;
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
}
