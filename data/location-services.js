const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const serviceData = [
  ["Satyanarayan Puja", "A devotional puja and katha for family occasions and moments of gratitude.", "satyanarayan-puja"],
  ["Griha Pravesh Puja", "A traditional ceremony for entering a new home, with preparations discussed for your family.", "griha-pravesh-puja"],
  ["Ganesh Puja", "A prayer to Lord Ganesha for a new beginning, family occasion or ceremony.", "ganesh-puja"],
  ["Lakshmi Puja", "A devotional puja to Goddess Lakshmi for festivals and family observances.", "lakshmi-puja"],
  ["Durga Puja", "A devotional ceremony honoring Maa Durga with prayers and offerings.", "durga-puja"],
  ["Navgraha Puja", "A traditional prayer honoring the nine celestial influences.", "navgraha-puja"],
  ["Havan", "A Vedic fire ritual planned with the Pandit according to the occasion and family tradition.", "havan"],
  ["Rudrabhishek", "A Shiva puja with abhishek and Rudra mantras, with ritual details discussed in advance.", "rudrabhishek"],
  ["Maha Mrityunjaya Jaap", "A devotional mantra recitation arranged with guidance from a Pandit.", "maha-mrityunjaya-jaap"],
  ["Wedding Puja", "A wedding ceremony enquiry where traditions, rituals and family requirements can be discussed.", "wedding-puja"],
  ["Vastu Puja", "A traditional prayer for a home or space, with the ceremony sequence confirmed for your needs.", "vastu-puja"],
  ["Pind Daan", "An ancestral offering planned with sensitivity to customary observances and location needs.", "pind-daan"],
  ["Shradh Puja", "A remembrance ceremony enquiry with details discussed respectfully with the team.", "shradh-puja"],
  ["Mundan Ceremony", "A traditional first-haircut ceremony enquiry for your family and chosen date.", "mundan-ceremony"],
  ["Namkaran", "A naming ceremony enquiry where the family can discuss customary ritual details.", "namkaran"],
  ["Online Puja", "Ask about joining a suitable puja remotely; format and participation are confirmed individually.", "online-puja"],
  ["Home Puja", "Enquire about a Pandit-led ceremony at home and discuss arrangements for your locality.", "home-puja"],
  ["Pandit Booking", "Share your ceremony, location and date preference so the team can discuss Pandit availability.", "pandit-booking"],
];

const catalogSlugs = {
  "satyanarayan-puja": "satyanarayan-puja",
  "griha-pravesh-puja": "griha-pravesh-puja",
  "ganesh-puja": "ganesh-puja",
  "lakshmi-puja": "lakshmi-puja",
  "durga-puja": "durga-puja",
  "navgraha-puja": "navgraha-puja",
  "rudrabhishek": "rudrabhishek-puja",
  "vastu-puja": "vastu-shanti-puja",
  "pind-daan": "pind-daan-puja",
};

export const locationServices = serviceData.map(([name, shortDescription, slug]) => ({
  name,
  slug: slug || slugify(name),
  shortDescription,
  seoTitlePattern: "{service} in {area}, {city}",
  seoDescriptionPattern: "Enquire about {service} in {area}, {city}. Share your ceremony and preferred date; PujaPath will discuss arrangements and confirm availability with you.",
  catalogSlug: catalogSlugs[slug] || null,
}));

export function findLocationService(slug) {
  return locationServices.find((service) => service.slug === slug);
}
