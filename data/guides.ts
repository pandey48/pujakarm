export type Guide = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  readingMinutes: number;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

// Add reviewed editorial guides here. Keep service claims aligned with the enquiry workflow.
export const guides: Guide[] = [
  {
    slug: "how-to-book-a-pandit-for-puja-at-home",
    title: "How to Book a Pandit for Puja at Home",
    description: "A practical guide to choosing a puja, sharing your requirements and confirming arrangements for a home ceremony.",
    updatedAt: "2026-10-07",
    readingMinutes: 4,
    sections: [
      {
        heading: "Start with the occasion and puja",
        paragraphs: [
          "Begin by describing the occasion and the ritual your family has in mind. If you are unsure which puja fits, share the occasion and ask for guidance rather than selecting a ceremony based only on its name.",
          "PujaPath’s puja pages describe the listed ritual and its formats. Read the details, then use the enquiry form to ask about the service that matches your needs.",
        ],
      },
      {
        heading: "Share the details that affect arrangements",
        paragraphs: [
          "Include your city and locality, preferred date, language preference and any family or tradition-specific requirements. A clear request helps the team understand what needs to be discussed with a Pandit.",
        ],
        bullets: ["Puja or occasion", "City and locality", "Preferred date", "Language and format preference", "Questions about samagri or preparation"],
      },
      {
        heading: "Discuss the ceremony before confirming",
        paragraphs: [
          "Ask who will perform the ritual, what preparation is expected, whether samagri is arranged, and what the listed format means for your ceremony. These details can vary by puja and location, so confirm them for your request.",
          "Submitting an enquiry is not a confirmed booking. Wait for the team to discuss availability, arrangements and any costs with you before deciding.",
        ],
      },
      {
        heading: "Request a Pandit in Mumbai",
        paragraphs: [
          "For a Mumbai request, include your exact locality with the preferred date. Areas shown on the Mumbai pages are enquiry examples; the team confirms whether a particular location and date can be served.",
        ],
      },
    ],
  },
];
