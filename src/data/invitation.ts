import type { InvitationConfig } from "../types";
import hero from "../assets/photos/hero.webp";
import journey from "../assets/photos/journey.webp";
import g1 from "../assets/photos/gallery-1.webp";
import g2 from "../assets/photos/gallery-2.webp";
import g3 from "../assets/photos/gallery-3.webp";
import g4 from "../assets/photos/gallery-4.webp";

/**
 * ============================================================================
 *  EDIT THIS FILE to reuse the design for another couple.
 *  Everything below is SAMPLE CONTENT taken from the reference mock-up:
 *  the names, date and wording are placeholders, not real wedding details.
 *  Photos: the hero and journey pictures are the supplied artwork; the four
 *  gallery photos are soft samples to be replaced in src/assets/photos
 *  (or give them a `cloudinaryId` and set VITE_CLOUDINARY_CLOUD in .env).
 * ============================================================================
 */
export const invitation: InvitationConfig = {
  couple: { first: "Gori", second: "Shankar", hashtag: "#GoriWedsShankar" },

  // SAMPLE DATE. The weekday is calculated from it, so it can never disagree with the date.
  event: {
    start: "2026-12-01T11:30:00+05:30",
    end: "2026-12-01T16:00:00+05:30",
    timezone: "Asia/Kolkata",
  },

  hero: {
    blessing: "|| Shree Ganeshay Namah ||",
    invite: ["With joy in our hearts", "we invite you to celebrate", "the wedding of"],
    weds: "weds",
    muhuratLabel: "Muhurat",
    photo: { src: hero, alt: "Gori and Shankar seated together in wedding attire among flower garlands, with temples and a sunrise behind them" },
  },

  countdown: { heading: "Countdown to Our Big Day" },

  // Venue not decided yet, as in the reference. Fill these in when it is:
  //   name: "Shree Mangal Karyalay", address: "Main Road, Pune", mapsQuery: "Shree Mangal Karyalay, Main Road, Pune"
  venue: { name: "", address: "", mapsQuery: "", soon: "Location details coming soon" },

  schedule: {
    heading: "Event Schedule",
    confirmLater: "To be confirmed",
    items: [
      { icon: "puja", title: "Ganesh Puja", time: "" },
      { icon: "ceremony", title: "Wedding Ceremony", native: "विवाह", time: "" },
      { icon: "muhurtham", title: "Muhurtham", time: "11:30 AM onwards" },
      { icon: "photos", title: "Blessings & Family Photos", time: "" },
    ],
  },

  journey: {
    heading: "Our Journey",
    paragraphs: [
      "Two souls, guided by faith, brought together by destiny, and blessed by the divine.",
      "As we begin this new chapter, we seek your love, blessings and presence to make our journey more meaningful.",
    ],
    photo: { src: journey, alt: "The couple seated together before a lit brass lamp, blessed by flowers and garlands" },
  },

  gallery: {
    heading: "Photo Gallery",
    photos: [
      { src: g1, alt: "Gold wedding rings resting on red rose petals" },
      { src: g2, alt: "Flower garlands beside a lit brass lamp" },
      { src: g3, alt: "A bouquet of red roses and white flowers" },
      { src: g4, alt: "A brass lamp glowing against warm golden lights" },
    ],
  },

  info: {
    heading: "Dress Code & Guest Information",
    dress: { title: "Dress Code", lines: ["Traditional / Formal", "(Saree, Dhoti, Sherwani, Kurta etc.)"] },
    guest: { title: "Guest Information", text: "Kindly arrive on time and be a part of our special day." },
  },

  rsvp: {
    heading: "RSVP",
    // Digits only, with country code. Used to send RSVP replies through WhatsApp when no endpoint is set.
    // SAMPLE: replace with the family's real number.
    whatsappNumber: "919000000000",
  },

  gifts: {
    heading: "Gifts & Blessings",
    lines: ["Your blessings are the greatest gift.", "If you wish to give a gift, a contribution towards", "our future together would be deeply appreciated."],
  },

  thanks: { title: "Thank You", line: "for being a part of our special day!" },

  footer: { made: "Made with love" },

  cover: { invited: "You are invited", tap: "Tap to open", dear: "Dear" },

  // Leave empty to hide the music button. Example: "/audio/shehnai.mp3" (file placed in /public/audio).
  musicSrc: "",
  musicOnOpen: true,

  nav: [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#our-story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
    { label: "RSVP", href: "#rsvp" },
  ],
};
