export type MumbaiSeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string; bullets?: string[]; subsections?: { heading: string; body: string }[] }[];
  faqs: { question: string; answer: string }[];
  pujaSlug?: string;
  related: string[];
};

export const mumbaiSeoPages: MumbaiSeoPage[] = [
  {
    slug: "pandit-booking-mumbai", title: "Pandit in Mumbai | Book Pandit for Puja at Home | PujaPath", description: "Request a Pandit for puja at home or online in Mumbai. Share your ceremony, preferred date and locality; PujaPath will confirm availability before booking.", h1: "Book a Pandit in Mumbai for Puja at Home & Online Puja",
    intro: "Looking to book a Pandit in Mumbai? Tell PujaPath which ceremony you have in mind, when you would like it, and whether you prefer a home or online format. The team will discuss the request and confirm availability before anything is booked.",
    sections: [
      { heading: "How to book a Pandit in Mumbai", body: "Start with the occasion and the puja you are considering. In your request, include your preferred date, Mumbai locality, language preference and any family tradition the Pandit should know about. These details help the team understand the request; they do not guarantee a match or date.", bullets: ["Choose a puja or describe the occasion", "Share your date, locality and preferences", "Discuss the ritual, preparation and any costs before confirming"] },
      { heading: "Choose the format that suits your family", body: "Some PujaPath listings can be requested for a ceremony at home, while others may also have an online option. Check the individual puja details and ask the team which format can be arranged for your Mumbai request." },
      { heading: "Locality and availability", body: "The Mumbai enquiry guide currently lists Andheri, Thane, Borivali, Powai, Navi Mumbai and Dadar as example localities. They are prompts for your enquiry, not confirmed service zones. Share your exact area and the team will check whether the request can be supported." },
    ],
    faqs: [
      { question: "How can I book a Pandit in Mumbai?", answer: "Choose a puja or describe your occasion, then submit your preferred date, locality and contact details through the booking form. PujaPath will follow up to discuss availability and arrangements." },
      { question: "Can I find a Pandit near me in Mumbai?", answer: "Enter your exact locality in the enquiry. Locality examples on the site are not confirmed coverage areas; PujaPath checks whether the requested date and place can be supported." },
      { question: "Can I choose a language or tradition?", answer: "You can mention language and family tradition preferences in your request. The team can discuss whether they can be accommodated before you confirm." },
      { question: "Is my requested date confirmed when I submit the form?", answer: "No. The form sends an enquiry. Date, Pandit and other arrangements are confirmed with you separately." },
    ], pujaSlug: "satyanarayan-puja", related: ["puja-at-home-mumbai", "online-puja-mumbai", "mumbai"],
  },
  {
    slug: "puja-at-home-mumbai", title: "Puja at Home in Mumbai | PujaPath", description: "Explore puja at home in Mumbai and request a Pandit for your family ritual. Share the ceremony, date and locality to discuss availability and preparation.", h1: "Puja at Home in Mumbai",
    intro: "Arrange a home puja enquiry in Mumbai around your occasion and family customs. PujaPath listings explain common rituals and preparation topics; the exact service, samagri, travel and availability are discussed for each request.",
    sections: [
      { heading: "What happens when you request a home puja?", body: "Select a ceremony and send your preferred date, locality and contact details. The team can discuss the ritual sequence, language, expected duration and what your family may need to prepare. Wait for confirmation before making final arrangements." },
      { heading: "Pujas families may request at home", body: "The catalogue includes home pujas such as Satyanarayan Puja, Griha Pravesh, Ganesh Puja and Vastu Shanti. Suitability depends on your occasion and tradition, so ask about the ceremony details before selecting a service.", bullets: ["Satyanarayan Puja for a family devotional gathering", "Griha Pravesh Puja for entering a new home", "Ganesh Puja or Vastu Shanti for a new beginning"] },
      { heading: "Samagri and preparation", body: "The puja listing gives examples of commonly discussed items, but the final samagri list and who arranges each item can vary. Confirm these details directly with the team for your request." },
    ],
    faqs: [
      { question: "How does puja at home work?", answer: "Send an enquiry with your ceremony, preferred date and Mumbai locality. The team discusses the ritual, preparation and availability, then confirms any arrangements with you." },
      { question: "Is samagri included?", answer: "Samagri arrangements depend on the puja and location. Ask what is included and what your family should arrange before confirming." },
      { question: "Which puja is suitable for a new home?", answer: "Families often enquire about Griha Pravesh Puja and may ask about related Ganesh or Vastu prayers. Discuss your family tradition and the home-entry date with the Pandit." },
    ], pujaSlug: "griha-pravesh-puja", related: ["pandit-booking-mumbai", "griha-pravesh-puja-mumbai", "vastu-puja-mumbai"],
  },
  {
    slug: "online-puja-mumbai", title: "Online Puja Services in Mumbai | PujaPath", description: "Request an online puja from Mumbai. Explore rituals that list an online format and ask PujaPath about joining, offerings, timing and availability.", h1: "Online Puja Services in Mumbai",
    intro: "Join selected Hindu pujas online from Mumbai when the ritual listing and arrangements support it. Send an enquiry to discuss the ceremony, how participation works, timing and any offerings or preparation needed at your end.",
    sections: [
      { heading: "How online puja works", body: "Choose a puja that lists an online format, share your preferred date and ask how the ceremony will be conducted. The team will explain how to join and what, if anything, your family should prepare. Online format and schedule are confirmed individually." },
      { heading: "Pujas currently listed with an online format", body: "The curated PujaPath listings currently mark Satyanarayan Puja, Rudrabhishek Puja, Ganesh Puja, Lakshmi Puja, Hanuman Puja, Hanuman Chalisa Path and Durga Puja as home and online options. This is a format shown in the catalogue, not a date-specific availability promise; confirm the exact puja and format before booking." },
      { heading: "How the live video arrangement works", body: "Send an enquiry for one of the listed online pujas with your preferred date and contact details. Once PujaPath confirms the request, ask for the live video joining method and start time; the current website does not host an in-page video room or show an instant availability calendar. Join using the separately provided instructions and keep any requested offerings ready." },
      { heading: "What to ask before you book", body: "Ask about the joining method, time zone and start time, whether family members can participate, and which offerings or items you should keep ready. Confirm any fees and the final schedule directly with PujaPath." },
    ],
    faqs: [
      { question: "Can I book an online puja from Mumbai?", answer: "You can send an enquiry for a puja whose listing offers an online format. PujaPath will confirm whether the ritual, date and arrangements are available." },
      { question: "How do I join the online puja?", answer: "The joining details are shared as part of confirming the specific request. Ask the team which video or participation method will be used." },
      { question: "Will the online puja use live video?", answer: "The team confirms the joining method and start time for your request. The current PujaPath website does not host an in-page video room." },
      { question: "Do I need to arrange puja items?", answer: "Preparation varies by ceremony. The team can explain which offerings, if any, you should arrange before the session." },
    ], pujaSlug: "satyanarayan-puja", related: ["pandit-booking-mumbai", "puja-at-home-mumbai", "satyanarayan-puja-mumbai"],
  },
  {
    slug: "satyanarayan-puja-mumbai", title: "Satyanarayan Puja in Mumbai | PujaPath", description: "Request Satyanarayan Puja in Mumbai at home or online. Discuss Katha, preferred language, date, samagri and availability with PujaPath.", h1: "Satyanarayan Puja in Mumbai",
    intro: "Plan a Satyanarayan Puja and Katha for a family occasion in Mumbai. The PujaPath listing offers home and online enquiry formats; share your preferred date and ask about the Katha, language and preparation before confirming.",
    sections: [
      { heading: "About the Satyanarayan Puja and Katha", body: "This devotional observance commonly brings family together for puja and Katha recitation. The sequence and language can vary with family practice, so share your preferences when you enquire." },
      { heading: "At home or online", body: "The PujaPath catalogue lists Satyanarayan Puja for home and online requests. Ask which format is available for your date and how participants should prepare or join." },
      { heading: "Plan your enquiry", body: "Include your locality, date, preferred language and approximate gathering details. Confirm the duration, samagri responsibilities and any charges before deciding.", subsections: [{ heading: "When families may hold it", body: "Families may arrange Satyanarayan Puja for a milestone, festival or another devotional gathering. Ask the Pandit how your family tradition guides the date and Katha sequence." }, { heading: "Who may enquire", body: "A household planning a shared prayer and Katha can ask about this format. The Pandit can confirm whether the requested home or online arrangement suits the ceremony." }] },
    ],
    faqs: [
      { question: "Can Satyanarayan Puja be performed at home in Mumbai?", answer: "PujaPath lists this puja for home enquiries. Submit your Mumbai locality and date so the team can check availability." },
      { question: "Can I request the Katha in a preferred language?", answer: "You can share a language preference. The team will discuss whether it can be arranged for your request." },
      { question: "What should I arrange for the puja?", answer: "The samagri list depends on the ritual plan and family tradition. Ask for the final list and clarify who will arrange each item." },
    ], pujaSlug: "satyanarayan-puja", related: ["online-puja-mumbai", "puja-at-home-mumbai", "pandit-booking-mumbai"],
  },
  {
    slug: "griha-pravesh-puja-mumbai", title: "Griha Pravesh Puja in Mumbai | PujaPath", description: "Enquire about a Griha Pravesh Puja in Mumbai for your new home. Discuss the ceremony sequence, date, Pandit availability and samagri with PujaPath.", h1: "Griha Pravesh Puja in Mumbai",
    intro: "A Griha Pravesh Puja marks a family's entry into a new home. Share your Mumbai locality and planned move-in date to ask about the ceremony and related prayers that fit your family tradition.",
    sections: [
      { heading: "Choosing a Griha Pravesh ceremony", body: "The PujaPath listing describes a home ceremony that includes Ganesh puja and Vastu prayers. The appropriate sequence can depend on tradition and the home, so discuss the details with the Pandit before confirming." },
      { heading: "Plan the date and preparation", body: "When sending a request, provide your preferred date, locality and any timing constraints. Ask what the ceremony involves, how long to allow, and which items your family or the service will arrange.", subsections: [{ heading: "When families may perform it", body: "Families enquire when they plan to enter a new home. The date and auspicious timing follow the household’s tradition and should be agreed with the family’s religious adviser." }, { heading: "Who may enquire", body: "A household preparing to move into a new residence can ask about Griha Pravesh, the ceremony sequence and whether related Ganesh or Vastu prayers are appropriate." }] },
      { heading: "Mumbai availability is confirmed individually", body: "Mumbai is available as an enquiry city in the project. That does not establish service coverage in every neighbourhood or guarantee a Pandit for a date; include your exact locality so the team can check." },
    ],
    faqs: [
      { question: "Which puja is suitable for entering a new home?", answer: "Griha Pravesh Puja is commonly associated with entering a new home. You can ask whether Ganesh puja or Vastu prayers are part of the proposed sequence." },
      { question: "How early should I enquire?", answer: "Share your planned date as soon as you can. PujaPath must confirm Pandit and schedule availability before the request becomes a booking." },
      { question: "Does the service include all samagri?", answer: "The final arrangements can vary. Request a written or clear item list and confirm who will provide each item." },
    ], pujaSlug: "griha-pravesh-puja", related: ["vastu-puja-mumbai", "satyanarayan-puja-mumbai", "ganesh-puja-mumbai"],
  },
  {
    slug: "rudrabhishek-puja-mumbai", title: "Rudrabhishek Puja in Mumbai | PujaPath", description: "Request Rudrabhishek Puja in Mumbai at home or online. Ask about abhishek offerings, Rudra mantra recitation, preparation and date availability.", h1: "Rudrabhishek Puja in Mumbai",
    intro: "Enquire about Rudrabhishek Puja in Mumbai for a Shiva-focused observance with abhishek and Rudra mantra recitation. The catalogue lists home and online formats; confirm the ritual details and availability for your request.",
    sections: [
      { heading: "What the puja may involve", body: "The PujaPath listing describes abhishek offerings and Rudra mantra recitation. The exact sequence and materials should be discussed with the Pandit in keeping with your family's tradition." },
      { heading: "Home and online enquiries", body: "Both formats appear on the current Rudrabhishek listing. Ask about practical arrangements for your selected format, including the items needed and how online participation would work." },
      { heading: "Share your preferences", body: "Include your preferred date, Mumbai locality, language and questions about offerings. The team will confirm whether the request can be arranged before you make plans.", subsections: [{ heading: "When families may request it", body: "People may enquire for a Shiva-focused observance on a date chosen according to family practice. Ask the Pandit about timing, the abhishek sequence and offerings rather than assuming a standard schedule." }, { heading: "Who may enquire", body: "Families seeking a guided Rudrabhishek with mantra recitation can describe their preferred home or online format and discuss whether it can be arranged." }] },
    ],
    faqs: [
      { question: "Can Rudrabhishek be requested online?", answer: "The listing includes an online enquiry format. PujaPath will confirm whether that format is available for your date and preferred ritual." },
      { question: "What offerings should I prepare?", answer: "Offerings may include items such as water, milk or bilva leaves, but the final list depends on the chosen vidhi. Confirm it with the Pandit." },
      { question: "How long does Rudrabhishek take?", answer: "The current listing gives an approximate duration of two to three hours. Confirm the expected timing for your planned ceremony." },
    ], pujaSlug: "rudrabhishek-puja", related: ["online-puja-mumbai", "puja-at-home-mumbai", "pandit-booking-mumbai"],
  },
  {
    slug: "ganesh-puja-mumbai", title: "Ganesh Puja in Mumbai | PujaPath", description: "Enquire about Ganesh Puja in Mumbai for a new beginning or family occasion. Discuss the ritual, date, format and preparation with PujaPath.", h1: "Ganesh Puja in Mumbai",
    intro: "Request a Ganesh Puja in Mumbai for a new venture, move or family occasion. Share what you are marking and ask the Pandit about a sequence appropriate to your family practice.",
    sections: [
      { heading: "A puja for a new beginning", body: "The PujaPath listing describes a traditional Ganesh invocation with guidance for family participation. Tell the team about your occasion so the ritual details can be discussed in context." },
      { heading: "At home or online", body: "The current listing includes home and online enquiry options. Ask about date availability, the joining or home arrangements, and offerings such as durva grass, flowers or modak before you confirm." },
      { heading: "Make a clear booking request", body: "Provide your preferred date, Mumbai locality, language preference and any timing constraints. A submitted request is an enquiry; the team confirms the arrangements with you.", subsections: [{ heading: "When families may perform it", body: "Ganesh Puja is often requested before a new beginning or as part of a family occasion. The exact date and sequence depend on the household’s tradition." }, { heading: "Who may enquire", body: "A family marking a move, new venture or gathering can ask whether this puja and a home or online format suit their occasion." }] },
    ],
    faqs: [
      { question: "Can I request Ganesh Puja for a new home or business?", answer: "You can describe the occasion in your enquiry. The team can discuss whether Ganesh Puja or another listed ceremony may suit your request." },
      { question: "Can my family participate online?", answer: "The listing includes an online format. Confirm how participation works and whether the format is available for your date." },
      { question: "What items are needed?", answer: "Common items listed include durva grass, flowers, modak or fruits, and other puja essentials. Confirm the final list and arrangements first." },
    ], pujaSlug: "ganesh-puja", related: ["griha-pravesh-puja-mumbai", "online-puja-mumbai", "pandit-booking-mumbai"],
  },
  {
    slug: "lakshmi-puja-mumbai", title: "Lakshmi Puja in Mumbai | PujaPath", description: "Explore Lakshmi Puja in Mumbai and send an enquiry about a home or online ceremony. Confirm the ritual format, date and preparation with PujaPath.", h1: "Lakshmi Puja in Mumbai",
    intro: "Explore a Lakshmi Puja enquiry for your Mumbai home or family occasion. PujaPath's catalogue includes Lakshmi Puja as a service listing; the ceremony format, date and arrangements need to be confirmed for each request.",
    sections: [
      { heading: "Discuss the ceremony you have in mind", body: "Families may have different customs for Lakshmi Puja. Share the occasion and tradition you follow, and ask which sequence the Pandit proposes before booking." },
      { heading: "Confirm format and preparation", body: "The exact available format can depend on the listing and request. Ask whether the puja can be arranged at home or online, what offerings are customary for your ceremony, and who will arrange them." },
      { heading: "Requesting a puja in Mumbai", body: "Send your preferred date and exact locality so PujaPath can check the request. A Mumbai city selection is not a confirmation of neighbourhood coverage or availability.", subsections: [{ heading: "When families may perform it", body: "Families may observe Lakshmi Puja during a festival or another occasion in their tradition. Ask the Pandit about the intended ceremony rather than assuming a single seasonal or annual schedule." }, { heading: "Who may enquire", body: "Households planning a Lakshmi-focused observance can share their occasion, preferred format and preparation questions for an availability check." }] },
    ],
    faqs: [
      { question: "Can I enquire about Lakshmi Puja at home in Mumbai?", answer: "You can submit a request with your date and locality. PujaPath will confirm whether the requested format can be arranged." },
      { question: "Is Lakshmi Puja only performed during Diwali?", answer: "Families observe Lakshmi Puja on different occasions and according to their traditions. Describe your occasion so the Pandit can discuss the appropriate ritual." },
      { question: "What should I prepare?", answer: "Preparation and offerings vary by family tradition and ceremony. Ask for a final samagri list before the date." },
    ], pujaSlug: "lakshmi-puja", related: ["havan-puja-mumbai", "pandit-booking-mumbai", "puja-at-home-mumbai"],
  },
  {
    slug: "havan-puja-mumbai", title: "Havan Puja in Mumbai | PujaPath", description: "Request a Havan Puja in Mumbai and discuss the purpose, ceremony, fire-safety arrangements, samagri and Pandit availability with PujaPath.", h1: "Havan Puja in Mumbai",
    intro: "Enquire about a Havan in Mumbai and explain the occasion or prayer you have in mind. Since havan procedures and materials differ, clarify the ritual plan, venue requirements and preparation before confirming.",
    sections: [
      { heading: "Choose the right havan enquiry", body: "PujaPath lists Havan and several specific homams. The appropriate ritual depends on your occasion and family practice; share your context rather than choosing by name alone." },
      { heading: "Plan the space and samagri", body: "Ask about the havan kund, samagri, ventilation and other venue requirements. Confirm who supplies each item and whether the location is suitable for the planned ceremony." },
      { heading: "Availability and timing", body: "Provide your preferred date, Mumbai locality and timing needs. PujaPath will discuss whether the Pandit and arrangements can be confirmed for your request.", subsections: [{ heading: "When families may request a havan", body: "A Havan is planned for a family occasion or observance according to the chosen ritual and tradition. Ask the Pandit which ceremony fits your purpose and the date you have in mind." }, { heading: "Who should check the venue", body: "Anyone planning a fire ritual at home should first confirm space, ventilation and building requirements with the household or property manager and the Pandit." }] },
    ],
    faqs: [
      { question: "What is included in a Havan Puja?", answer: "The ritual sequence and included arrangements depend on the specific havan. Ask for details about the Pandit's service, samagri and venue preparation." },
      { question: "Can a havan be performed at home?", answer: "Some listed homams are home services, while arrangements depend on the specific ritual and home. Confirm suitability and requirements with the team." },
      { question: "What should I ask before confirming?", answer: "Clarify the ritual purpose, date, duration, samagri, venue requirements, costs and what your household needs to arrange." },
    ], pujaSlug: "havan", related: ["lakshmi-puja-mumbai", "vastu-puja-mumbai", "pandit-booking-mumbai"],
  },
  {
    slug: "vastu-puja-mumbai", title: "Vastu Puja in Mumbai | PujaPath", description: "Enquire about Vastu Shanti Puja in Mumbai for a home or property. Discuss the occasion, preferred date, ceremony and preparation with PujaPath.", h1: "Vastu Puja in Mumbai",
    intro: "Ask about Vastu Shanti Puja in Mumbai for a new home, property or another occasion. Share the context and your family's custom; the Pandit can discuss the ceremony and preparation without assuming one ritual fits every situation.",
    sections: [
      { heading: "Vastu Shanti and related ceremonies", body: "PujaPath's catalogue lists Vastu Shanti Puja among home pujas. For a new home entry, families may also ask about Griha Pravesh. Discuss whether these are separate or combined in the ceremony being proposed." },
      { heading: "What to include in your request", body: "Tell the team whether the property is new, being renovated or associated with another occasion. Include your preferred date and locality, then ask about the sequence, duration and samagri." },
      { heading: "Confirm arrangements for your property", body: "Venue needs and ritual details vary. Ask what space is required and whether the proposed arrangements suit your home before confirming the booking.", subsections: [{ heading: "When families may enquire", body: "Some households ask about Vastu Shanti for a new or renovated property, or alongside a home-entry ceremony. The exact purpose and sequence should follow the family’s tradition." }, { heading: "Who may enquire", body: "A homeowner or family coordinating work at a property can describe the situation and ask the Pandit whether this listed ritual is suitable." }] },
    ],
    faqs: [
      { question: "Is Vastu Puja the same as Griha Pravesh Puja?", answer: "They are related home ceremonies but are not necessarily the same. Ask the Pandit whether your occasion calls for one, the other, or a combined sequence." },
      { question: "Can I request Vastu Shanti for an existing home?", answer: "Describe your occasion and the team can discuss whether this listed puja may be appropriate for your request." },
      { question: "What details should I share?", answer: "Share the property context, preferred date, locality and any family tradition. Confirm the ritual plan and preparation before booking." },
    ], pujaSlug: "vastu-shanti-puja", related: ["griha-pravesh-puja-mumbai", "havan-puja-mumbai", "puja-at-home-mumbai"],
  },
  {
    slug: "navgraha-puja-mumbai", title: "Navgraha Puja in Mumbai | PujaPath", description: "Explore Navgraha Puja and related homam enquiries in Mumbai. Share your occasion and discuss the ritual, date and preparation with PujaPath.", h1: "Navgraha Puja in Mumbai",
    intro: "Enquire about a Navgraha ceremony in Mumbai and explain what guidance you are seeking. PujaPath's catalogue includes Navagraha Puja and Navagraha Homam listings; ask the Pandit which service details fit your request.",
    sections: [
      { heading: "Navgraha Puja or Navagraha Homam?", body: "The catalogue lists both a puja and a homam. These are distinct service listings. Discuss the intended ceremony, sequence and preparation with the Pandit rather than assuming they are interchangeable." },
      { heading: "Plan the date and ritual details", body: "Include your preferred date, locality and any family customs. Ask what the ceremony involves, expected duration and which offerings or items your family should arrange." },
      { heading: "Mumbai enquiries", body: "Submit your exact locality and contact details to request an availability check. City or locality selection does not guarantee that the date or service can be arranged.", subsections: [{ heading: "When families may ask about it", body: "Families may enquire about a Navgraha ceremony according to their own tradition or guidance from a religious adviser. PujaPath does not prescribe a ritual or promise a religious outcome." }, { heading: "Who may enquire", body: "A household considering the listed Navgraha Puja can ask how it differs from Navagraha Homam and confirm which service, if any, fits its request." }] },
    ],
    faqs: [
      { question: "Is Navgraha Puja available as an online service?", answer: "Formats depend on the specific listing and request. Check the current puja details and ask PujaPath to confirm whether online participation can be arranged." },
      { question: "What is the difference between Navgraha Puja and Homam?", answer: "They are distinct ceremony listings with different procedures. Ask the Pandit to explain which one aligns with your occasion and tradition." },
      { question: "What information should I provide?", answer: "Share your preferred date, locality, occasion and questions about the ritual. The team will discuss availability and preparation." },
    ], pujaSlug: "navgraha-puja", related: ["havan-puja-mumbai", "pandit-booking-mumbai", "online-puja-mumbai"],
  },
];

export const mumbaiSeoSlugs = mumbaiSeoPages.map((page) => page.slug);

// Only curated puja listings with an explicit online format are included here.
export const onlinePujaSlugs = [
  "satyanarayan-puja",
  "rudrabhishek-puja",
  "ganesh-puja",
  "lakshmi-puja",
  "hanuman-puja",
  "hanuman-chalisa-path",
  "durga-puja",
];
