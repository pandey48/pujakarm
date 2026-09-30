import type { Puja } from "@/lib/types";
import { homeOnlyCatalogPujas, pujaCatalog } from "@/data/puja-catalog";

const cities = ["Bhopal", "Indore", "Ahmedabad", "Varanasi", "Prayagraj", "Hyderabad", "Bengaluru", "Mumbai", "Delhi", "Pune", "Jaipur", "Lucknow", "Noida"];
const ritualFaqs = [
  { question: "What should I prepare before the puja?", answer: "After your request, our team will confirm the ritual details, samagri arrangements and anything to prepare at home." },
  { question: "Can I request a preferred date?", answer: "Yes. Share your preferred date and time in the booking request. We will confirm availability with you." },
];

const corePujas: Puja[] = [
  { id: "griha-pravesh", slug: "griha-pravesh-puja", name: "Griha Pravesh Puja", shortDescription: "A traditional housewarming ritual for a blessed beginning.", description: "Welcome auspiciousness into your new home with a thoughtfully guided Griha Pravesh ceremony. The Pandit will discuss your family traditions and the suitable sequence before the day.", category: "Griha Pravesh", duration: "3–4 hours", panditCount: "1–2 Pandits", type: "Home", benefits: ["Begin life in a new home with a traditional ceremony", "Includes Ganesh puja and Vastu prayers", "Ritual sequence explained before the puja"], samagri: ["Kalash and coconut", "Flowers and fruits", "Havan samagri", "Puja thali and essentials"], cities, image: "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "satyanarayan", slug: "satyanarayan-puja", name: "Satyanarayan Puja", shortDescription: "A devotional observance for gratitude and family well-being.", description: "Gather your loved ones for the Satyanarayan Katha and puja, performed with care and guidance in a language your family is comfortable with.", category: "Shanti & Dosha Puja", duration: "2–3 hours", panditCount: "1 Pandit", type: "Home & Online", benefits: ["A meaningful family devotional gathering", "Katha recitation in a preferred language", "Suitable for milestones and special occasions"], samagri: ["Panchamrit ingredients", "Flowers and tulsi", "Fruits and prasad", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "rudrabhishek", slug: "rudrabhishek-puja", name: "Rudrabhishek Puja", shortDescription: "An offering to Lord Shiva with Rudra mantras and abhishek.", description: "A guided Shiva puja featuring abhishek and Vedic chanting, arranged for your home or joined online with clear guidance for offerings.", category: "Shiv Puja", duration: "2–3 hours", panditCount: "1–2 Pandits", type: "Home & Online", benefits: ["Traditional Rudra mantra recitation", "Guided abhishek offerings", "Home or online participation"], samagri: ["Milk and water", "Bilva leaves", "Flowers and fruits", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1758256822717-cbdbf29bb2bb?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "ganesh", slug: "ganesh-puja", name: "Ganesh Puja", shortDescription: "A prayer to Lord Ganesha before a new beginning.", description: "Mark a new venture, move or family occasion with a Ganesh puja led by a Pandit who will guide you through each step.", category: "Ganesh Puja", duration: "1–2 hours", panditCount: "1 Pandit", type: "Home & Online", benefits: ["Traditional Ganesh invocation", "A welcoming ritual for new beginnings", "Guidance for family participation"], samagri: ["Durva grass and flowers", "Modak or fruits", "Coconut", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1764304589223-30bfbfdaa9ef?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "ganesh-homam", slug: "ganesh-homam", name: "Ganesh Homam", shortDescription: "A fire offering with prayers to Ganesha for an auspicious beginning.", description: "Plan a Ganesh Homam with a Pandit who can discuss the ritual sequence, family tradition and preparation requirements with you before the requested date.", category: "Havan & Homam", duration: "2–3 hours", panditCount: "1–2 Pandits", type: "Home", benefits: ["Traditional Ganesh invocation", "Havan sequence discussed in advance", "Preparation guidance for your family"], samagri: ["Havan kund and samagri", "Durva grass and flowers", "Coconut and fruits", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "lakshmi", slug: "lakshmi-puja", name: "Lakshmi Puja", shortDescription: "A devotional puja to invite prosperity and gratitude.", description: "Perform a Lakshmi puja at home or online with a Pandit to guide the invocation, offerings and aarti in a calm, welcoming setting.", category: "Devi Puja", duration: "1.5–2 hours", panditCount: "1 Pandit", type: "Home & Online", benefits: ["Devotional Lakshmi invocation", "Suitable for festivals and family occasions", "Step-by-step ritual guidance"], samagri: ["Lotus or seasonal flowers", "Kumkum and rice", "Fruits and sweets", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "navgraha", slug: "navgraha-puja", name: "Navgraha Puja", shortDescription: "A Vedic prayer honoring the nine celestial influences.", description: "A traditional Navgraha puja led with care and context, with the format and offerings confirmed with your Pandit ahead of time.", category: "Shanti & Dosha Puja", duration: "2–3 hours", panditCount: "1–2 Pandits", type: "Home", benefits: ["Traditional nine-planet invocation", "A guided and considered ritual sequence", "Personal preparation guidance"], samagri: ["Nine grain offerings", "Flowers and fruits", "Havan samagri", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1764304589223-30bfbfdaa9ef?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "hanuman", slug: "hanuman-puja", name: "Hanuman Puja", shortDescription: "A heartfelt prayer honoring Lord Hanuman.", description: "A focused Hanuman puja with devotional recitation and aarti, suitable for home or online participation.", category: "Shanti & Dosha Puja", duration: "1–2 hours", panditCount: "1 Pandit", type: "Home & Online", benefits: ["Devotional Hanuman invocation", "Chalisa or stotra by arrangement", "Family-friendly guided participation"], samagri: ["Sindoor and flowers", "Jaggery or sweets", "Oil diya", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "hanuman-chalisa", slug: "hanuman-chalisa-path", name: "Hanuman Chalisa Path", shortDescription: "A devotional recitation of the Hanuman Chalisa with prayer and aarti.", description: "Arrange a Hanuman Chalisa Path with a Pandit and discuss the recitation, family participation and language preferences before the requested date.", category: "Paths & Wellbeing", duration: "1–2 hours", panditCount: "1 Pandit", type: "Home & Online", benefits: ["Chalisa recitation and aarti", "Language preference discussed in advance", "Suitable for home or online enquiry"], samagri: ["Hanuman Chalisa text", "Flowers and diya", "Prasad offerings", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1764304589223-30bfbfdaa9ef?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "vastu", slug: "vastu-shanti-puja", name: "Vastu Shanti Puja", shortDescription: "A house blessing for harmony in your living space.", description: "A Vastu Shanti ceremony to mark a new home or refresh a familiar space, with a Pandit helping you prepare for the ritual.", category: "Vastu Puja", duration: "3–4 hours", panditCount: "1–2 Pandits", type: "Home", benefits: ["Traditional space blessing", "Includes guided Ganesh invocation", "Preparation checklist shared in advance"], samagri: ["Kalash and mango leaves", "Havan samagri", "Flowers and fruits", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "wedding", slug: "vivah-puja", name: "Vivah Puja", shortDescription: "Vedic guidance for sacred wedding ceremonies.", description: "Arrange a Pandit for your wedding rituals with a planning conversation to align traditions, ceremony timings and language preferences.", category: "Marriage & Sanskar", duration: "As per ceremony", panditCount: "1–2 Pandits", type: "Home", benefits: ["Ritual planning conversation", "Language preference considered", "Ceremony sequence discussed in advance"], samagri: ["Wedding havan samagri", "Flowers and garlands", "Kalash and offerings", "Ritual essentials"], cities, image: "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "havan", slug: "mahamrityunjaya-havan", name: "Mahamrityunjaya Havan", shortDescription: "A sacred fire ritual with Mahamrityunjaya mantra jaap.", description: "A carefully arranged havan with mantra recitation, led by an experienced Pandit in a suitable home setting.", category: "Havan & Homam", duration: "2–3 hours", panditCount: "1–2 Pandits", type: "Home", benefits: ["Guided mantra and havan sequence", "Pandit shares space preparation needs", "Family can participate in offerings"], samagri: ["Havan kund and wood", "Havan samagri", "Ghee and herbs", "Flowers and offerings"], cities, image: "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "pind-daan", slug: "pind-daan-puja", name: "Pind Daan Puja", shortDescription: "A traditional ancestral offering performed with care.", description: "Connect with a Pandit to plan a Pind Daan ceremony and discuss customary observances, timing and location requirements.", category: "Pind Daan & Shraddha", duration: "2–3 hours", panditCount: "1 Pandit", type: "Home", benefits: ["Personal discussion before booking", "Ritual performed with sensitivity", "Location needs confirmed in advance"], samagri: ["Rice flour and sesame", "Kusha grass", "Flowers and water", "Offerings as guided"], cities, image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
  { id: "durga", slug: "durga-puja", name: "Durga Puja", shortDescription: "A devotional ceremony honoring Maa Durga.", description: "Invite a Pandit to guide your Durga puja with traditional mantras, offerings and aarti at home or online.", category: "Devi Puja", duration: "2–3 hours", panditCount: "1 Pandit", type: "Home & Online", benefits: ["Traditional Devi invocation", "Festival and family occasion formats", "Guided offerings and aarti"], samagri: ["Red flowers and cloth", "Fruits and sweets", "Kumkum and diya", "Puja essentials"], cities, image: "https://images.unsplash.com/photo-1764304589223-30bfbfdaa9ef?auto=format&fit=crop&w=900&q=85", faqs: ritualFaqs },
];

const categoryBySlug: Record<string, string> = {
  "griha-pravesh-puja": "Home Pujas",
  "satyanarayan-puja": "Deity Pujas",
  "rudrabhishek-puja": "Shiva Pujas",
  "ganesh-puja": "Deity Pujas",
  "ganesh-homam": "Homam & Havan",
  "lakshmi-puja": "Deity Pujas",
  "navgraha-puja": "Graha Shanti",
  "hanuman-puja": "Deity Pujas",
  "hanuman-chalisa-path": "Paths & Wellbeing",
  "vastu-shanti-puja": "Home Pujas",
  "vivah-puja": "Marriage & Sanskars",
  "mahamrityunjaya-havan": "Homam & Havan",
  "pind-daan-puja": "Ancestral Rituals",
  "durga-puja": "Deity Pujas",
};

const ritualImages: Record<string, string> = {
  "Deity Pujas": "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=900&q=85",
  "Home Pujas": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=900&q=85",
  "Shiva Pujas": "https://images.unsplash.com/photo-1758256822717-cbdbf29bb2bb?auto=format&fit=crop&w=900&q=85",
  "Graha Shanti": "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=85",
  "Paths & Wellbeing": "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=85",
  "Marriage & Sanskars": "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=900&q=85",
  "Ancestral Rituals": "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=85",
  "Homam & Havan": "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?auto=format&fit=crop&w=900&q=85",
};

const imageForPuja = (name: string, category: string) => {
  const normalized = name.toLowerCase();
  if (/rudra|shiv|mahamrityunjaya|bhairav|pradosh/.test(normalized)) return ritualImages["Shiva Pujas"];
  if (/ganesh|ganapati/.test(normalized)) return "https://images.unsplash.com/photo-1764304589223-30bfbfdaa9ef?auto=format&fit=crop&w=900&q=85";
  if (/durga|kali|devi|chandi/.test(normalized)) return "https://images.unsplash.com/photo-1761471681038-06270dea0f2f?auto=format&fit=crop&w=900&q=85";
  if (/lakshmi|laxmi/.test(normalized)) return "https://images.unsplash.com/photo-1590228948882-cf73e8efe843?auto=format&fit=crop&w=900&q=85";
  if (/hanuman|sundarkand/.test(normalized)) return "https://images.unsplash.com/photo-1564984069790-2d0767de5856?auto=format&fit=crop&w=900&q=85";
  if (/vivah|wedding|marriage|engagement/.test(normalized)) return "https://images.unsplash.com/photo-1781077128268-62c6962aafe9?auto=format&fit=crop&w=900&q=85";
  if (/griha|vastu|bhoomi|vahan|opening|home/.test(normalized)) return ritualImages["Home Pujas"];
  return ritualImages[category] || ritualImages["Deity Pujas"];
};

const slugify = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
const canonicalKey = (value: string) => {
  const slug = slugify(value);
  if (slug === "rudrabhishek") return "rudrabhishek-puja";
  if (slug === "navagraha-puja") return "navgraha-puja";
  if (slug === "pind-daan") return "pind-daan-puja";
  if (slug === "ganapati-homam") return "ganesh-homam";
  if (slug === "vivah-sanskar-hindu-wedding-ceremony") return "vivah-puja";
  return slug;
};

const knownPujas = new Set(corePujas.map((puja) => canonicalKey(puja.name)));
const catalogPujas: Puja[] = pujaCatalog.flatMap(({ name, category }) => {
  const key = canonicalKey(name);
  if (knownPujas.has(key)) return [];
  knownPujas.add(key);
  const slug = slugify(name);
  const homeOnly = homeOnlyCatalogPujas.has(name);
  return [{
    id: `catalog-${slug}`,
    slug,
    name,
    shortDescription: `${category} for ${name}, with ritual details discussed for your family's tradition.`,
    description: `${name} is a traditional ${category.toLowerCase()} chosen by families for devotion and important occasions. The exact ritual sequence, language and offerings vary by family and region, so these details are discussed with the Pandit before your requested date is confirmed.`,
    category,
    duration: "Varies by ritual",
    panditCount: "As per ceremony",
    type: homeOnly ? "Home" : "Home & Online",
    benefits: ["Discuss your family tradition and language preference", "Ask about the ceremony sequence and preparation", "Request a date and location for an availability check"],
    samagri: ["The final samagri list depends on the chosen vidhi", "Offerings and arrangements are confirmed before booking"],
    cities,
    image: imageForPuja(name, category),
    faqs: ritualFaqs,
  }];
});

export const pujas: Puja[] = [
  ...corePujas.map((puja) => {
    const category = categoryBySlug[puja.slug] || puja.category;
    return { ...puja, category, image: imageForPuja(puja.name, category) };
  }),
  ...catalogPujas,
];

export const categories = ["Deity Pujas", "Home Pujas", "Shiva Pujas", "Graha Shanti", "Paths & Wellbeing", "Marriage & Sanskars", "Ancestral Rituals", "Homam & Havan"];
