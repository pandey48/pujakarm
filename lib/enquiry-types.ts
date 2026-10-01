export const ENQUIRY_STATUSES = ["New", "Contacted", "Follow-up", "Booked", "Not Interested", "Completed"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export type LeadSubmission = {
	type: "lead";
	name: string;
	phone: string;
	whatsapp: string;
	puja: string;
	location: string;
	preferredDate: string;
	message: string;
};

export type PanditRegistrationSubmission = {
	type: "pandit";
	name: string;
	phone: string;
	whatsapp: string;
	city: string;
	state: string;
	experience: string;
	specialization: string;
	languages: string;
	availability: string;
	address: string;
	idProofType: string;
	idProofNumber: string;
};

export type EnquirySubmission = LeadSubmission | PanditRegistrationSubmission;
