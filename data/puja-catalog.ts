export type CatalogCategory =
  | "Deity Pujas"
  | "Home Pujas"
  | "Shiva Pujas"
  | "Graha Shanti"
  | "Paths & Wellbeing"
  | "Marriage & Sanskars"
  | "Ancestral Rituals"
  | "Homam & Havan";

const entries: { category: CatalogCategory; names: string[] }[] = [
  { category: "Deity Pujas", names: [
    "Ganesh Puja", "Lakshmi Puja", "Vishnu Puja", "Durga Puja", "Hanuman Puja", "Satyanarayan Puja", "Krishna Puja", "Saraswati Puja", "Navratri Puja", "Kali Puja", "Baglamukhi Puja", "Kuber Puja", "Annapurna Puja", "Venkateswara Puja", "Ayyappa Puja", "Subramanya Puja", "Dattatreya Puja", "Ganga Puja", "Shri Ram Puja", "Hayagriva Puja", "Sri Chakra (Navavarana) Puja", "Chhath Puja", "Karva Chauth Puja", "Hartalika Teej Puja", "Vat Savitri Puja", "Govardhan Puja", "Ekadashi Vrat Udyapan", "Tulsi Vivah", "Varalakshmi Vratham", "Mangala Gauri Vratham",
  ] },
  { category: "Home Pujas", names: ["Griha Pravesh Puja", "Vastu Shanti Puja", "Bhoomi Puja", "Office & Shop Opening Puja", "Vahan (Vehicle) Puja"] },
  { category: "Shiva Pujas", names: ["Rudrabhishek", "Maha Rudrabhishek", "Laghu Rudra", "Shiv Puja", "Mahamrityunjaya Jaap", "Maha Shivratri Puja", "Kaal Bhairav Puja", "Pradosh Vrat Puja", "Parthiv Shivling Puja", "Gauri Shankar Puja"] },
  { category: "Graha Shanti", names: ["Navagraha Puja", "Shani Shanti Puja", "Rahu Ketu Shanti Puja", "Mangal Dosha Puja", "Kaal Sarp Dosh Puja", "Guru (Brihaspati) Graha Shanti", "Budh Graha Shanti", "Shukra Graha Shanti", "Surya Graha Shanti", "Chandra Graha Shanti", "Gand Mool Shanti Puja", "Grahan Dosh Shanti Puja"] },
  { category: "Paths & Wellbeing", names: ["Ayushya Homam", "Durga Saptashati Path", "Narasimha Puja", "Sundarkand Path", "Akhand Ramayan Path", "Shrimad Bhagwat Katha", "Lalita Sahasranama Parayanam", "Hanuman Chalisa Path", "Shiv Mahapuran Katha", "Devi Bhagwat Katha"] },
  { category: "Marriage & Sanskars", names: ["Vivah Sanskar (Hindu Wedding Ceremony)", "Vivah Badha Nivaran Puja", "Katyayani Puja", "Kundali Milan & Consultation", "Namkaran Sanskar", "Mundan Sanskar", "Upanayana (Janeu) Sanskar", "Annaprashan Sanskar", "Karnavedha Sanskar", "Aksharabhyasam (Vidyarambh)", "Seemantham (Godh Bharai)", "Nischitartham (Engagement Ceremony)", "Shashtipurti", "Sathabhishekam", "Kumbh Vivah"] },
  { category: "Ancestral Rituals", names: ["Pind Daan", "Shraddha", "Tarpan", "Tripindi Shraddha", "Narayan Bali", "Pitru Dosha Puja", "Asthi Visarjan Assistance", "Garud Puran Path", "Antim Sanskar (Last Rites Assistance)", "Terahvi"] },
  { category: "Homam & Havan", names: ["Havan", "Ganapati Homam", "Navagraha Homam", "Sudarshan Homam", "Lakshmi Kubera Homam", "Chandi Homam", "Rudra Homam", "Dhanvantari Homam", "Gayatri Homam", "Saraswati Homam", "Swayamvara Parvathi Homam", "Santhana Gopala Homam"] },
];

export const pujaCatalog = entries.flatMap(({ category, names }) => names.map((name) => ({ name, category })));

export const homeOnlyCatalogPujas = new Set([
  "Ayyappa Puja", "Chhath Puja", "Bhoomi Puja", "Vahan (Vehicle) Puja", "Vivah Sanskar (Hindu Wedding Ceremony)", "Namkaran Sanskar", "Mundan Sanskar", "Upanayana (Janeu) Sanskar", "Karnavedha Sanskar", "Nischitartham (Engagement Ceremony)", "Shashtipurti", "Sathabhishekam", "Kumbh Vivah", "Tripindi Shraddha", "Narayan Bali", "Asthi Visarjan Assistance", "Antim Sanskar (Last Rites Assistance)", "Terahvi",
]);
