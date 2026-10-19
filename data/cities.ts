import type { City } from "@/lib/types";

const cityRecords: City[] = [
  { id: "bhopal", slug: "bhopal", name: "Bhopal", description: "Enquire about a puja in Bhopal by sharing your ceremony, preferred date and locality. The PujaPath team will discuss arrangements and confirm availability with you.", areas: ["Arera Colony", "Kolar Road", "MP Nagar", "Bawadiya Kalan", "New Market"], popularPujas: ["Griha Pravesh Puja", "Lakshmi Puja", "Rudrabhishek Puja"], region: "Madhya Pradesh" },
  { id: "indore", slug: "indore", name: "Indore", description: "Plan a puja enquiry in Indore with your preferred ritual, date and neighbourhood. The team will follow up to discuss options before any booking is confirmed.", areas: ["Vijay Nagar", "Palasia", "Rau", "Bhawarkuan", "Sudama Nagar"], popularPujas: ["Ganesh Puja", "Lakshmi Puja", "Vastu Shanti Puja"], region: "Madhya Pradesh" },
  { id: "ahmedabad", slug: "ahmedabad", name: "Ahmedabad", description: "Share your puja requirements for Ahmedabad, including your preferred date and locality. PujaPath will follow up to discuss arrangements and availability.", areas: ["Satellite", "Prahlad Nagar", "Maninagar", "Bopal", "Navrangpura"], popularPujas: ["Griha Pravesh Puja", "Satyanarayan Puja", "Ganesh Puja"], region: "Gujarat" },
  { id: "varanasi", slug: "varanasi", name: "Varanasi", description: "Enquire about a puja in Varanasi (Kashi) and share your preferred ceremony, date and location, including if you have a specific ghat or neighbourhood in mind.", areas: ["Assi Ghat", "Lanka", "Bhelupur", "Sigra", "Godowlia"], popularPujas: ["Rudrabhishek Puja", "Satyanarayan Puja", "Mahamrityunjaya Havan"], aliases: ["Kashi", "Banaras"], region: "Uttar Pradesh" },
  { id: "prayagraj", slug: "prayagraj", name: "Prayagraj", description: "Send a puja enquiry for Prayagraj (Prayag/Allahabad) with your preferred ritual, date and location. Availability and arrangements are confirmed individually.", areas: ["Civil Lines", "George Town", "Naini", "Jhunsi", "Triveni Sangam"], popularPujas: ["Pind Daan Puja", "Satyanarayan Puja", "Hanuman Chalisa Path"], aliases: ["Allahabad", "Prayag"], region: "Uttar Pradesh" },
  { id: "hyderabad", slug: "hyderabad", name: "Hyderabad", description: "Explore puja and pooja guides for Hyderabad, including Griha Pravesh, Satyanarayan Puja and Rudrabhishek. Share your occasion, preferred date and locality to ask about arrangements; availability is confirmed individually.", seoTitle: "Puja and Pooja Services in Hyderabad", seoDescription: "Explore puja and pooja guides for Hyderabad. Share your ceremony, preferred date and locality to ask about arrangements; PujaPath confirms availability individually.", pageHeading: "Puja Services and Pandit Enquiries in Hyderabad", localGuide: { heading: "Plan a puja enquiry around your Hyderabad locality", paragraphs: ["When you enquire, include the ceremony you have in mind and your exact locality. Examples in this guide include Gachibowli, Madhapur, Kondapur, Kukatpally and Secunderabad; they help describe the request but are not confirmed service areas.", "Add a preferred date, language and any family or ritual tradition that matters to you. Puja listings explain their formats and preparation topics; the team will discuss whether arrangements can be made for your specific request."] }, areas: ["Madhapur", "Kondapur", "Gachibowli", "Kukatpally", "Banjara Hills", "Hitech City", "Secunderabad"], popularPujas: ["Griha Pravesh Puja", "Satyanarayan Puja", "Rudrabhishek Puja"], region: "Telangana" },
  { id: "bengaluru", slug: "bengaluru", name: "Bengaluru", description: "Enquire about a home or online puja in Bengaluru (Bangalore), sharing your ceremony, date and locality. The team can discuss language and ritual preferences with you.", areas: ["Indiranagar", "Whitefield", "Jayanagar", "HSR Layout", "Malleshwaram", "Electronic City"], popularPujas: ["Griha Pravesh Puja", "Ganesh Puja", "Lakshmi Puja"], aliases: ["Bangalore", "Bangaluru"], region: "Karnataka" },
  { id: "mumbai", slug: "mumbai", name: "Mumbai", description: "Explore puja services and booking guides for Mumbai, including Satyanarayan Puja, Vastu Shanti and Ganesh Puja. Share your ceremony, preferred date and locality; the team discusses arrangements and confirms availability individually.", seoTitle: "Puja Services and Pandit Booking in Mumbai", seoDescription: "Explore puja services and Pandit booking guides for Mumbai. Share your ceremony, date and locality to ask about arrangements; availability is confirmed individually.", pageHeading: "Puja Services and Pandit Booking Enquiries in Mumbai", localGuide: { heading: "Include your Mumbai area in a puja enquiry", paragraphs: ["Mumbai requests benefit from an exact area as well as the city name. Andheri, Bandra, Borivali, Powai, Dadar, Thane and Navi Mumbai are examples shown in the enquiry guidance, not confirmed service zones.", "Choose a puja to review its ritual details, then share your preferred date, locality, language and any family customs. The team will discuss the specific request and confirm whether arrangements can be made before you decide."] }, areas: ["Andheri", "Thane", "Borivali", "Powai", "Navi Mumbai", "Dadar"], popularPujas: ["Satyanarayan Puja", "Vastu Shanti Puja", "Ganesh Puja"], aliases: ["Bombay"], region: "Maharashtra" },
  { id: "thane", slug: "thane", name: "Thane", description: "Share a puja enquiry for Thane with your ceremony, preferred date and locality. The team will discuss possible arrangements and confirm availability individually.", areas: [], popularPujas: [], region: "Maharashtra", cityGuideIndexable: false },
  { id: "navi-mumbai", slug: "navi-mumbai", name: "Navi Mumbai", description: "Share a puja enquiry for Navi Mumbai with your ceremony, preferred date and locality. The team will discuss possible arrangements and confirm availability individually.", areas: [], popularPujas: [], region: "Maharashtra", cityGuideIndexable: false },
  { id: "delhi", slug: "delhi", name: "Delhi", description: "Enquire about traditional home pujas in Delhi. Share your ceremony, preferred date and neighbourhood; the PujaPath team will follow up about possible arrangements.", areas: ["Dwarka", "Rohini", "Vasant Kunj", "Lajpat Nagar", "Karol Bagh", "Janakpuri"], aliases: ["New Delhi", "Dilli"], popularPujas: ["Griha Pravesh Puja", "Hanuman Puja", "Navgraha Puja"], region: "Delhi" },
  { id: "pune", slug: "pune", name: "Pune", description: "Send a puja enquiry for Pune with your preferred ceremony, date and locality. Ask the team about at-home or online arrangements for your family ritual.", areas: ["Kothrud", "Hinjewadi", "Baner", "Wakad", "Viman Nagar", "Hadapsar"], popularPujas: ["Satyanarayan Puja", "Griha Pravesh Puja", "Rudrabhishek Puja"], aliases: ["Poona"], region: "Maharashtra" },
  { id: "jaipur", slug: "jaipur", name: "Jaipur", description: "Plan a puja enquiry in Jaipur by sharing your ritual, preferred date and locality. The team can discuss preparations and availability before confirming a booking.", areas: ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Jagatpura", "C-Scheme"], popularPujas: ["Griha Pravesh Puja", "Satyanarayan Puja", "Durga Puja"], region: "Rajasthan" },
  { id: "lucknow", slug: "lucknow", name: "Lucknow", description: "Arrange a puja enquiry for Lucknow with your ceremony preferences and date. Share your neighbourhood so the team can discuss the request with you.", areas: ["Gomti Nagar", "Aliganj", "Indira Nagar", "Hazratganj", "Jankipuram"], popularPujas: ["Hanuman Puja", "Satyanarayan Puja", "Navgraha Puja"], region: "Uttar Pradesh" },
  { id: "noida", slug: "noida", name: "Noida", description: "Send a home puja enquiry for Noida with your preferred ceremony, date and sector. The team will follow up to discuss arrangements and availability.", areas: ["Sector 18", "Sector 50", "Sector 62", "Greater Noida", "Indirapuram"], popularPujas: ["Vastu Shanti Puja", "Ganesh Puja", "Satyanarayan Puja"], aliases: ["Noida Extension", "Greater Noida West"], region: "Uttar Pradesh" },
  { id: "gurugram", slug: "gurugram", name: "Gurugram", description: "Enquire about a puja in Gurugram (Gurgaon) by sharing your preferred ceremony, date and neighbourhood. Availability is discussed and confirmed individually.", areas: ["DLF Phase 1", "DLF Phase 3", "Sector 56", "Sector 57", "Sohna Road"], popularPujas: ["Griha Pravesh Puja", "Vastu Shanti Puja", "Satyanarayan Puja"], aliases: ["Gurgaon"], region: "Haryana" },
];

const localityOptions: Record<string, string[]> = {
  mumbai: ["Andheri", "Bandra", "Borivali", "Kandivali", "Malad", "Goregaon", "Jogeshwari", "Vile Parle", "Santacruz", "Khar", "Powai", "Ghatkopar", "Mulund", "Bhandup", "Chembur", "Kurla", "Dadar", "Matunga", "Lower Parel", "Parel", "Worli", "Colaba", "Fort", "Wadala", "Sion"],
  thane: ["Ghodbunder Road", "Hiranandani Estate", "Kasarvadavali", "Kolshet Road", "Majiwada", "Manpada", "Naupada", "Panchpakhadi", "Vartak Nagar", "Wagle Estate"],
  "navi-mumbai": ["Airoli", "CBD Belapur", "Ghansoli", "Kharghar", "Kopar Khairane", "Nerul", "Panvel", "Sanpada", "Seawoods", "Turbhe", "Vashi"],
  pune: ["Hinjewadi", "Wakad", "Baner", "Balewadi", "Aundh", "Kharadi", "Viman Nagar", "Kalyani Nagar", "Koregaon Park", "Hadapsar", "Magarpatta", "Kothrud", "Karve Nagar", "Shivajinagar", "Deccan", "Camp", "Wanowrie", "NIBM", "Kondhwa", "Pimple Saudagar", "Pimple Nilakh", "Pimpri", "Chinchwad", "Lohegaon", "Dhanori"],
  indore: ["Vijay Nagar", "Scheme No. 54", "Scheme No. 78", "Rau", "Nipania", "Super Corridor", "Palasia", "Bhawarkuan", "Bengali Square", "Saket Nagar", "Sudama Nagar", "Annapurna Road", "Rajendra Nagar", "Rau Road", "AB Road", "Mahalaxmi Nagar", "Khajrana", "Tilak Nagar", "Old Palasia", "Bicholi Mardana"],
  bhopal: ["MP Nagar", "Arera Colony", "Shahpura", "Kolar Road", "Hoshangabad Road", "Ayodhya Bypass", "Bawadia Kalan", "Gulmohar", "Chunabhatti", "Habibganj", "TT Nagar", "New Market", "Kohefiza", "Lalghati", "Misrod", "Awadhpuri", "Katara Hills", "Govindpura", "Karond", "Anand Nagar"],
  hyderabad: ["Gachibowli", "HITEC City", "Madhapur", "Kondapur", "Kukatpally", "KPHB", "Miyapur", "Manikonda", "Narsingi", "Kokapet", "Financial District", "Nanakramguda", "Banjara Hills", "Jubilee Hills", "Begumpet", "Ameerpet", "Secunderabad", "LB Nagar", "Dilsukhnagar", "Uppal", "Tarnaka", "Mehdipatnam", "Chandanagar", "Hafeezpet", "Bachupally"],
  bengaluru: ["Whitefield", "Marathahalli", "Bellandur", "Sarjapur Road", "Electronic City", "HSR Layout", "Koramangala", "Indiranagar", "Jayanagar", "JP Nagar", "BTM Layout", "Banashankari", "Rajajinagar", "Malleshwaram", "Hebbal", "Yelahanka", "Hennur", "Kalyan Nagar", "Horamavu", "KR Puram", "Hoodi", "CV Raman Nagar", "Mahadevapura", "Vijayanagar", "Basavanagudi"],
  ahmedabad: ["Satellite", "Vastrapur", "Prahlad Nagar", "SG Highway", "Bopal", "South Bopal", "Thaltej", "Bodakdev", "Navrangpura", "Paldi", "Maninagar", "Chandkheda", "Gota", "Motera", "Vaishnodevi Circle", "Iscon", "Ambawadi", "Shahibaug", "Naroda", "Nikol"],
  varanasi: ["Lanka", "Assi", "BHU", "Bhelupur", "Sigra", "Mahmoorganj", "Shivpur", "Cantt", "Maldahiya", "Lahurabir", "Godowlia", "Dashashwamedh", "Ramnagar", "Sarnath", "Pandeypur", "Chitaipur", "DLW", "Rohania", "Orderly Bazar", "Nadesar"],
  prayagraj: ["Civil Lines", "George Town", "Tagore Town", "Allahpur", "Naini", "Jhunsi", "Katra", "Lukerganj", "Rajapur", "Ashok Nagar", "Teliarganj", "Mumfordganj", "Daraganj", "Kareli", "Dhoomanganj", "Prayag", "Phaphamau", "Naini Industrial Area", "Colonelganj", "Bai Ka Bagh"],
  gurugram: ["DLF Phase 1", "DLF Phase 2", "DLF Phase 3", "DLF Phase 4", "DLF Phase 5", "Golf Course Road", "Golf Course Extension Road", "Sohna Road", "MG Road", "Cyber City", "Sector 14", "Sector 15", "Sector 17", "Sector 21", "Sector 29", "Sector 40", "Sector 43", "Sector 45", "Sector 49", "Sector 50", "Sector 51", "Sector 54", "Sector 56", "Sector 57", "New Gurgaon"],
  delhi: ["Rohini", "Dwarka", "Janakpuri", "Uttam Nagar", "Pitampura", "Punjabi Bagh", "Rajouri Garden", "Paschim Vihar", "Karol Bagh", "Patel Nagar", "Lajpat Nagar", "South Extension", "Greater Kailash", "Saket", "Vasant Kunj", "Vasant Vihar", "Hauz Khas", "Malviya Nagar", "Defence Colony", "Mayur Vihar", "Preet Vihar", "Laxmi Nagar", "Shahdara", "Model Town", "Civil Lines"],
  noida: ["Sector 18", "Sector 27", "Sector 34", "Sector 37", "Sector 41", "Sector 44", "Sector 50", "Sector 51", "Sector 52", "Sector 55", "Sector 61", "Sector 62", "Sector 75", "Sector 76", "Sector 78", "Sector 93", "Sector 104", "Sector 107", "Sector 110", "Sector 117", "Sector 128", "Sector 137", "Sector 143", "Sector 150", "Sector 168"],
};

const legacyLocationPages: Record<string, NonNullable<City["legacyLocationSeo"]>> = {
  mumbai: { enquiryServices: ["satyanarayan-puja", "ganesh-puja", "vastu-puja"], areaEnquiryServices: { andheri: "satyanarayan-puja" } },
  hyderabad: { enquiryServices: ["griha-pravesh-puja", "satyanarayan-puja", "rudrabhishek"], areaEnquiryServices: { gachibowli: "griha-pravesh-puja" } },
  bengaluru: { enquiryServices: ["ganesh-puja", "griha-pravesh-puja", "lakshmi-puja"], areaEnquiryServices: { whitefield: "ganesh-puja" } },
  ahmedabad: { enquiryServices: ["griha-pravesh-puja", "satyanarayan-puja", "ganesh-puja"] },
  pune: { enquiryServices: ["satyanarayan-puja", "griha-pravesh-puja", "home-puja"], areaEnquiryServices: { kharadi: "home-puja" } },
  indore: { enquiryServices: ["ganesh-puja", "lakshmi-puja", "vastu-puja"] },
  bhopal: { enquiryServices: ["griha-pravesh-puja", "lakshmi-puja", "rudrabhishek"], areaEnquiryServices: { "arera-colony": "griha-pravesh-puja" } },
  varanasi: { enquiryServices: ["rudrabhishek", "satyanarayan-puja", "maha-mrityunjaya-jaap"], areaEnquiryServices: { lanka: "rudrabhishek" } },
  prayagraj: { enquiryServices: ["pind-daan", "satyanarayan-puja", "havan"] },
  gurugram: { enquiryServices: ["griha-pravesh-puja", "vastu-puja", "satyanarayan-puja"], areaEnquiryServices: { "dlf-phase-1": "griha-pravesh-puja" } },
  delhi: { enquiryServices: ["griha-pravesh-puja", "navgraha-puja", "havan"] },
  noida: { enquiryServices: ["vastu-puja", "ganesh-puja", "satyanarayan-puja"] },
};

export const cities: City[] = cityRecords.map((city) => ({
  ...city,
  areas: localityOptions[city.slug] || city.areas,
  serviceAvailability: city.serviceAvailability ?? "unverified",
  availablePujas: city.availablePujas ?? [],
  supportedLanguages: city.supportedLanguages ?? [],
  indexableLocalities: city.indexableLocalities ?? {},
  ...(legacyLocationPages[city.slug] ? { legacyLocationSeo: legacyLocationPages[city.slug] } : {}),
  cityGuideIndexable: city.cityGuideIndexable ?? true,
}));

export const preferredLanguages = [
  "Hindi",
  "English",
  "Sanskrit",
  "Marathi",
  "Telugu",
  "Tamil",
  "Kannada",
  "Gujarati",
  "Bengali",
  "Malayalam",
  "Punjabi",
  "Odia",
  "Assamese",
  "Konkani",
] as const;

export const bookingCities = cities;

export function findBookingCity(name: string) {
  const normalized = name.trim().toLocaleLowerCase();
  return cities.find((city) =>
    city.name.toLocaleLowerCase() === normalized ||
    city.aliases?.some((alias) => alias.toLocaleLowerCase() === normalized),
  );
}
