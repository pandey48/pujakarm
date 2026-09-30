export type VedicMantra = { name: string; sanskrit: string; meaning: string; keywords: string[] };

export const mantras: VedicMantra[] = [
  { name: "Gayatri Mantra", sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं", meaning: "A prayer for wisdom, clarity and light.", keywords: ["gayatri", "mantra", "chant"] },
  { name: "Mahamrityunjaya Mantra", sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्", meaning: "A prayer for healing, courage and well-being.", keywords: ["mahamrityunjaya", "shiva", "mantra", "chant"] },
  { name: "Shanti Mantra", sanskrit: "ॐ सह नाववतु सह नौ भुनक्तु", meaning: "A prayer for peace and shared learning.", keywords: ["shanti", "peace", "mantra", "chant"] },
  { name: "Ganesh Mantra", sanskrit: "ॐ गं गणपतये नमः", meaning: "A prayer to Ganesha for auspicious beginnings.", keywords: ["ganesh", "mantra", "chant"] },
  { name: "Om Namah Shivaya", sanskrit: "ॐ नमः शिवाय", meaning: "A reverent salutation to Lord Shiva.", keywords: ["shiva", "shivaya", "mantra", "chant"] },
];

export const featuredMantras = mantras.slice(0, 3);
