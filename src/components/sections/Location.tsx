import { motion } from "motion/react";
import ScrollPage from "../ui/ScrollPage";
import { Map as MapIcon } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { MapArt, SectionHeading } from "../ui/Decor";

const view = { once: true, amount: 0.35 } as const;

/**
 * Location: the card rises and settles with a spring, the map zooms out from a close-up while its pin
 * drops in and bounces, and the venue text and button slide in from the right.
 * Until a venue is configured the button is disabled and says so, instead of opening a meaningless map.
 */
export default function Location({ venue }: { venue: InvitationConfig["venue"] }) {
  const hasVenue = venue.name.trim() !== "" && venue.mapsQuery.trim() !== "";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;
  const slide = (n: number) => ({
    initial: { opacity: 0, x: 28 },
    whileInView: { opacity: 1, x: 0 },
    viewport: view,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.5 + n * 0.14 },
  });

  return (
    <ScrollPage id="location" tone="peach">
      <SectionHeading>Location</SectionHeading>

      <motion.div
        className="mt-5"
        initial={{ opacity: 0, y: 70, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={view}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
        <div className="paper-card mx-auto flex max-w-[360px] flex-col gap-5 overflow-hidden p-4">
          <div className="relative overflow-hidden rounded-xl border border-gold-soft">
            <motion.div initial={{ scale: 1.6 }} whileInView={{ scale: 1 }} viewport={view} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
              <MapArt className="block w-full" animatePin />
            </motion.div>
            {/* radar ripple under the pin, once it has landed */}
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-[74%] -ml-4 -mt-2 h-4 w-8 animate-ripple rounded-full border border-maroon/60 [animation-delay:1.1s] motion-reduce:hidden" />
          </div>

          <div className="px-1 pb-2 text-center">
            <motion.h3 {...slide(0)} className="font-heading text-[26px] font-semibold leading-tight text-maroon">
              {hasVenue ? venue.name : "Wedding Venue"}
            </motion.h3>
            <motion.p {...slide(1)} className="mt-1 font-body text-[19px] font-medium leading-snug text-ink-soft">
              {hasVenue ? venue.address : venue.soon}
            </motion.p>

            <motion.div {...slide(2)}>
              {hasVenue ? (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-maroon mt-5 w-full">
                  <MapIcon className="h-5 w-5" aria-hidden /> Open in Maps
                </a>
              ) : (
                <button type="button" disabled title="The location will be shared soon" className="btn-maroon mt-5 w-full">
                  <MapIcon className="h-5 w-5" aria-hidden /> Open in Maps
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ScrollPage>
  );
}
