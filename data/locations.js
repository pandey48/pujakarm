const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const cityData = [
  {
    name: "Mumbai",
    region: "Maharashtra",
    areas: "Andheri|Bandra|Borivali|Kandivali|Malad|Goregaon|Jogeshwari|Vile Parle|Santacruz|Khar|Powai|Ghatkopar|Mulund|Bhandup|Chembur|Kurla|Dadar|Matunga|Lower Parel|Parel|Worli|Colaba|Fort|Wadala|Sion",
    services: ["satyanarayan-puja", "ganesh-puja", "vastu-puja"],
    areaServices: { Andheri: "satyanarayan-puja" },
  },
  {
    name: "Hyderabad",
    region: "Telangana",
    areas: "Gachibowli|HITEC City|Madhapur|Kondapur|Kukatpally|KPHB|Miyapur|Manikonda|Narsingi|Kokapet|Financial District|Nanakramguda|Banjara Hills|Jubilee Hills|Begumpet|Ameerpet|Secunderabad|LB Nagar|Dilsukhnagar|Uppal|Tarnaka|Mehdipatnam|Chandanagar|Hafeezpet|Bachupally",
    services: ["griha-pravesh-puja", "satyanarayan-puja", "rudrabhishek"],
    areaServices: { Gachibowli: "griha-pravesh-puja" },
  },
  {
    name: "Bengaluru",
    region: "Karnataka",
    areas: "Whitefield|Marathahalli|Bellandur|Sarjapur Road|Electronic City|HSR Layout|Koramangala|Indiranagar|Jayanagar|JP Nagar|BTM Layout|Banashankari|Rajajinagar|Malleshwaram|Hebbal|Yelahanka|Hennur|Kalyan Nagar|Horamavu|KR Puram|Hoodi|CV Raman Nagar|Mahadevapura|Vijayanagar|Basavanagudi",
    services: ["ganesh-puja", "griha-pravesh-puja", "lakshmi-puja"],
    areaServices: { Whitefield: "ganesh-puja" },
  },
  {
    name: "Ahmedabad",
    region: "Gujarat",
    areas: "Satellite|Vastrapur|Prahlad Nagar|SG Highway|Bopal|South Bopal|Thaltej|Bodakdev|Navrangpura|Paldi|Maninagar|Chandkheda|Gota|Motera|Vaishnodevi Circle|Iscon|Ambawadi|Shahibaug|Naroda|Nikol",
    services: ["griha-pravesh-puja", "satyanarayan-puja", "ganesh-puja"],
  },
  {
    name: "Pune",
    region: "Maharashtra",
    areas: "Hinjewadi|Wakad|Baner|Balewadi|Aundh|Kharadi|Viman Nagar|Kalyani Nagar|Koregaon Park|Hadapsar|Magarpatta|Kothrud|Karve Nagar|Shivajinagar|Deccan|Camp|Wanowrie|NIBM|Kondhwa|Pimple Saudagar|Pimple Nilakh|Pimpri|Chinchwad|Lohegaon|Dhanori",
    services: ["satyanarayan-puja", "griha-pravesh-puja", "home-puja"],
    areaServices: { Kharadi: "home-puja" },
  },
  {
    name: "Indore",
    region: "Madhya Pradesh",
    areas: "Vijay Nagar|Scheme No. 54|Scheme No. 78|Rau|Nipania|Super Corridor|Palasia|Bhawarkuan|Bengali Square|Saket Nagar|Sudama Nagar|Annapurna Road|Rajendra Nagar|Rau Road|AB Road|Mahalaxmi Nagar|Khajrana|Tilak Nagar|Old Palasia|Bicholi Mardana",
    services: ["ganesh-puja", "lakshmi-puja", "vastu-puja"],
  },
  {
    name: "Bhopal",
    region: "Madhya Pradesh",
    areas: "MP Nagar|Arera Colony|Shahpura|Kolar Road|Hoshangabad Road|Ayodhya Bypass|Bawadia Kalan|Gulmohar|Chunabhatti|Habibganj|TT Nagar|New Market|Kohefiza|Lalghati|Misrod|Awadhpuri|Katara Hills|Govindpura|Karond|Anand Nagar",
    services: ["griha-pravesh-puja", "lakshmi-puja", "rudrabhishek"],
    areaServices: { "Arera Colony": "griha-pravesh-puja" },
  },
  {
    name: "Varanasi",
    region: "Uttar Pradesh",
    areas: "Lanka|Assi|BHU|Bhelupur|Sigra|Mahmoorganj|Shivpur|Cantt|Maldahiya|Lahurabir|Godowlia|Dashashwamedh|Ramnagar|Sarnath|Pandeypur|Chitaipur|DLW|Rohania|Orderly Bazar|Nadesar",
    services: ["rudrabhishek", "satyanarayan-puja", "maha-mrityunjaya-jaap"],
    areaServices: { Lanka: "rudrabhishek" },
  },
  {
    name: "Prayagraj",
    region: "Uttar Pradesh",
    areas: "Civil Lines|George Town|Tagore Town|Allahpur|Naini|Jhunsi|Katra|Lukerganj|Rajapur|Ashok Nagar|Teliarganj|Mumfordganj|Daraganj|Kareli|Dhoomanganj|Prayag|Phaphamau|Naini Industrial Area|Colonelganj|Bai Ka Bagh",
    services: ["pind-daan", "satyanarayan-puja", "havan"],
  },
  {
    name: "Gurugram",
    region: "Haryana",
    areas: "DLF Phase 1|DLF Phase 2|DLF Phase 3|DLF Phase 4|DLF Phase 5|Golf Course Road|Golf Course Extension Road|Sohna Road|MG Road|Cyber City|Sector 14|Sector 15|Sector 17|Sector 21|Sector 29|Sector 40|Sector 43|Sector 45|Sector 49|Sector 50|Sector 51|Sector 54|Sector 56|Sector 57|New Gurgaon",
    services: ["griha-pravesh-puja", "vastu-puja", "satyanarayan-puja"],
    areaServices: { "DLF Phase 1": "griha-pravesh-puja" },
  },
  {
    name: "Delhi",
    region: "Delhi",
    areas: "Rohini|Dwarka|Janakpuri|Uttam Nagar|Pitampura|Punjabi Bagh|Rajouri Garden|Paschim Vihar|Karol Bagh|Patel Nagar|Lajpat Nagar|South Extension|Greater Kailash|Saket|Vasant Kunj|Vasant Vihar|Hauz Khas|Malviya Nagar|Defence Colony|Mayur Vihar|Preet Vihar|Laxmi Nagar|Shahdara|Model Town|Civil Lines",
    services: ["griha-pravesh-puja", "navgraha-puja", "havan"],
  },
  {
    name: "Noida",
    region: "Uttar Pradesh",
    areas: "Sector 18|Sector 27|Sector 34|Sector 37|Sector 41|Sector 44|Sector 50|Sector 51|Sector 52|Sector 55|Sector 61|Sector 62|Sector 75|Sector 76|Sector 78|Sector 93|Sector 104|Sector 107|Sector 110|Sector 117|Sector 128|Sector 137|Sector 143|Sector 150|Sector 168",
    services: ["vastu-puja", "ganesh-puja", "satyanarayan-puja"],
  },
];

export const locations = cityData.map((city) => ({
  ...city,
  slug: slugify(city.name),
  areas: city.areas.split("|").map((name) => ({ name, slug: slugify(name) })),
  areaServices: Object.fromEntries(
    Object.entries(city.areaServices || {}).map(([areaName, serviceSlug]) => [
      slugify(areaName),
      serviceSlug,
    ]),
  ),
}));

export { slugify };
