import { motion } from "motion/react";
import ScrollPage from "../ui/ScrollPage";
import { CalendarDays, MapPin } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { SectionHeading, Sprig } from "../ui/Decor";

const label = "font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-deep";
const view = { once: true, amount: 0.35 } as const;

/** Text lines inside a card rise one after another once the card has flipped open. */
const line = (n: number) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: view,
  transition: { duration: 0.6, delay: 0.55 + n * 0.12 },
});

/**
 * Date & Venue: the two cards flip open in 3D from opposite sides (like cards turned over on a table),
 * the icon spins in, and the text follows line by line.
 */
export default function DateVenue({ venue, parts }: { venue: InvitationConfig["venue"]; parts: EventParts }) {
  const hasVenue = venue.name.trim() !== "";
  const flip = (side: 1 | -1) => ({
    initial: { opacity: 0, rotateY: side * 80, x: side * 30 },
    whileInView: { opacity: 1, rotateY: 0, x: 0 },
    viewport: view,
    transition: { type: "spring" as const, stiffness: 70, damping: 14, delay: side === -1 ? 0 : 0.18 },
  });
  const icon = {
    initial: { scale: 0, rotate: -180 },
    whileInView: { scale: 1, rotate: 0 },
    viewport: view,
    transition: { type: "spring" as const, stiffness: 160, damping: 11, delay: 0.4 },
  };

  return (
    <ScrollPage id="date-venue" tone="plain">
      <SectionHeading>Date &amp; Venue</SectionHeading>

      <div className="relative mx-auto mt-8 grid max-w-[340px] grid-cols-1 gap-6 [perspective:900px]">
        <motion.article {...flip(-1)} className="paper-card h-full overflow-hidden px-4 pb-8 pt-8 text-center">
          <Sprig className="absolute -left-1 bottom-0 w-10 opacity-80" tilt={6} />
          <motion.span {...icon} className="mx-auto block w-fit">
            <CalendarDays className="h-11 w-11 text-maroon" strokeWidth={1.5} aria-hidden />
          </motion.span>
          <motion.p {...line(0)} className={`mt-2 ${label}`}>
            Wedding Date
          </motion.p>
          <motion.p {...line(1)} className="mt-2 font-heading text-[26px] font-semibold leading-tight text-maroon">
            {parts.monthLong} {parts.day.padStart(2, "0")}, {parts.year}
          </motion.p>
          <motion.p {...line(2)} className="font-body text-[22px] font-semibold text-ink">
            {parts.weekday}
          </motion.p>
        </motion.article>

        <motion.article {...flip(1)} className="paper-card h-full overflow-hidden px-4 pb-8 pt-8 text-center">
          <Sprig flip className="absolute -right-1 bottom-0 w-10 opacity-80" tilt={6} />
          <motion.span {...icon} className="mx-auto block w-fit">
            <MapPin className="h-11 w-11 text-maroon" strokeWidth={1.5} aria-hidden />
          </motion.span>
          <motion.p {...line(0)} className={`mt-2 ${label}`}>
            Wedding Venue
          </motion.p>
          {hasVenue ? (
            <>
              <motion.p {...line(1)} className="mt-2 font-heading text-[26px] font-semibold leading-tight text-maroon">
                {venue.name}
              </motion.p>
              <motion.p {...line(2)} className="font-body text-[20px] font-semibold text-ink">
                {venue.address}
              </motion.p>
            </>
          ) : (
            <motion.p {...line(1)} className="mt-2 font-heading text-[26px] font-semibold leading-tight text-maroon">
              {venue.soon}
            </motion.p>
          )}
        </motion.article>
      </div>
    </ScrollPage>
  );
}
