/** A photograph. `src` is a local asset; `cloudinaryId` (optional) is used instead when Cloudinary is configured. */
export interface Photo {
  src: string;
  alt: string;
  cloudinaryId?: string;
}

export type ScheduleIcon = "puja" | "ceremony" | "muhurtham" | "photos";

export interface ScheduleItem {
  icon: ScheduleIcon;
  title: string;
  /** Optional line in the local script, shown small under the title (e.g. Devanagari). */
  native?: string;
  /** Leave empty to show "To be confirmed". */
  time: string;
}

export interface InvitationConfig {
  couple: { first: string; second: string; hashtag: string };
  /** ISO date-time with timezone offset. Weekday, date, muhurat time and the countdown are derived from it. */
  event: { start: string; end: string; timezone: string };
  hero: {
    blessing: string;
    /** Each entry is shown on its own line, in capitals. */
    invite: string[];
    weds: string;
    muhuratLabel: string;
    photo: Photo;
  };
  countdown: { heading: string };
  /** Leave `name` empty while the venue is not decided: the page then says "coming soon" and the map button is disabled. */
  venue: { name: string; address: string; mapsQuery: string; soon: string };
  schedule: { heading: string; confirmLater: string; items: ScheduleItem[] };
  journey: { heading: string; paragraphs: string[]; photo: Photo };
  gallery: { heading: string; photos: Photo[] };
  info: {
    heading: string;
    dress: { title: string; lines: string[] };
    guest: { title: string; text: string };
  };
  rsvp: { heading: string; whatsappNumber: string };
  gifts: { heading: string; lines: string[] };
  thanks: { title: string; line: string };
  footer: { made: string };
  cover: { invited: string; tap: string; dear: string };
  /** Background music file in /public (leave empty to hide the music button). */
  musicSrc: string;
  /** Start the music when the guest taps the cover (the tap counts as the permission browsers require). */
  musicOnOpen: boolean;
  nav: { label: string; href: string }[];
}
