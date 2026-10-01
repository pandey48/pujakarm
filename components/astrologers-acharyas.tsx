import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { MessageCircle, UserRound } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import styles from "./astrologers-acharyas.module.css";

const consultationMessage = "Namaste, I found your profile on PujaPath. I would like to ask a question and consult with you.";
const WHATSAPP_NUMBER_KARTIK = "9243078181";
const WHATSAPP_NUMBER_LOVEKUSH = "9243078181";
const WHATSAPP_NUMBER_DEVENDRA = "9243078181";

const profiles = [
  { name: "Kartik Krishna", designation: "Astrologer", focus: "Personalized astrology guidance", photo: "/images/WhatsApp Image 2026-10-02 at 1.05.30 AM.jpeg", photoAlt: "Kartik Krishna - Astrologer", whatsapp: WHATSAPP_NUMBER_KARTIK, initials: "KK" },
  { name: "Lovekush Pandey", designation: "Acharya", focus: "Specialist in Vedic mantras and recitation", photo: "/images/WhatsApp Image 2026-10-02 at 1.05.29 AM.jpeg", photoAlt: "Lovekush Pandey - Acharya", whatsapp: WHATSAPP_NUMBER_LOVEKUSH, initials: "LP" },
  { name: "Acharya Devendra Pandey", designation: "Acharya", focus: "Specialist in all pujas", photo: "/images/WhatsApp Image 2026-10-02 at 1.05.30 AM (1).jpeg", photoAlt: "Acharya Devendra Pandey - Acharya", whatsapp: WHATSAPP_NUMBER_DEVENDRA, initials: "DP" },
];

function normalizePhoneNumber(phoneNumber: string) {
  const digits = phoneNumber.replace(/\D/g, "");
  return digits ? (digits.length === 10 ? `91${digits}` : digits) : WHATSAPP_NUMBER.replace(/\D/g, "");
}

function createWhatsAppUrl(phoneNumber: string) {
  return `https://wa.me/${normalizePhoneNumber(phoneNumber)}?text=${encodeURIComponent(consultationMessage)}`;
}

export function AstrologersAcharyas() {
  return (
    <section id="astrologers-acharyas" className={styles.section} aria-labelledby="astrologers-acharyas-title">
      <div className="pp-wrap">
        <div className="pp-section-heading">
          <div>
            <span className="pp-kicker">Personal guidance</span>
            <h2 id="astrologers-acharyas-title">Get Free Puja Consultation</h2>
            <p>We&apos;ll call you back within 15 minutes.</p>
          </div>
        </div>
        <div className={styles.grid}>
          {profiles.map((profile) => (
              <article className={`${styles.card} ${styles.compactCard} ${profile.designation === "Acharya" ? styles.acharyaCard : ""}`} key={profile.name}>
              {existsSync(join(process.cwd(), "public", profile.photo.slice(1))) ? (
                <Image className={`${styles.photoImage} ${profile.name === "Kartik Krishna" ? styles.kartikPhoto : ""}`} src={profile.photo} alt={profile.photoAlt} width={148} height={148} unoptimized />
              ) : (
                <div className={styles.photo} role="img" aria-label={`${profile.photoAlt}; photo to be added`}>
                  <span className={styles.photoInitials}>{profile.initials}</span>
                  <span className={styles.photoNote}><UserRound size={14} /> Photo to be added</span>
                </div>
              )}
              <div className={styles.content}>
                <span className={styles.designation}>{profile.designation}</span>
                <h3>{profile.name}</h3>
                <p>{profile.focus}</p>
                <a className={styles.askButton} href={createWhatsAppUrl(profile.whatsapp)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} aria-hidden="true" />
                  Ask a Question
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}