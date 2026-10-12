import { motion } from "motion/react";
import ScrollPage from "../ui/ScrollPage";
import type { InvitationConfig } from "../../types";
import { photoUrl } from "../../lib/image";
import { LotusDivider } from "../ui/Decor";
import { useReveal } from "../ui/useReveal";

const view = { once: true, amount: 0.3 } as const;
const ease = [0.22, 1, 0.36, 1] as const;
const HIDE = "inset(0 100% 0 0)";
const SHOW = "inset(0 0% 0 0)";

/** The photo is revealed with a curtain wipe (and settles from a zoom). Its wrapper is what scroll triggers. */
function JourneyPhoto({ photo }: { photo: InvitationConfig["journey"]["photo"] }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gold-soft shadow-soft">
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: HIDE }}
        animate={{ clipPath: inView ? SHOW : HIDE }}
        transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
      >
        <motion.img
          src={photoUrl(photo, 700)}
          alt={photo.alt}
          width={900}
          height={748}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[35%_50%]"
          initial={{ scale: 1.5 }}
          animate={{ scale: inView ? 1 : 1.5 }}
          transition={{ duration: 2.2, ease, delay: 0.2 }}
        />
      </motion.div>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}

/** A paragraph that slides up out of a mask; the (unmoved) mask is what scroll triggers. */
function MaskedLine({ children, delay }: { children: string; delay: number }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className="mt-3 overflow-hidden">
      <motion.p
        className="font-body text-[19px] font-medium leading-[1.4] text-ink"
        initial={{ y: "110%" }}
        animate={{ y: inView ? 0 : "110%" }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.p>
    </div>
  );
}

/**
 * Our Journey: the card settles in, the photo opens with a curtain wipe, the heading tracks in from wide
 * spacing, and each paragraph slides up out of a mask.
 */
export default function Journey({ journey }: { journey: InvitationConfig["journey"] }) {
  return (
    <ScrollPage id="our-story" tone="warm">
      <motion.div
        className="paper-card relative mx-auto flex max-w-[360px] flex-col gap-5 overflow-hidden p-4"
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={view}
        transition={{ duration: 0.9, ease }}
      >
        <JourneyPhoto photo={journey.photo} />

        <div className="px-1 pb-2 text-center">
          <motion.h2
            className="font-display text-[17px] font-semibold uppercase text-maroon"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.14em" }}
            viewport={view}
            transition={{ duration: 1.2, ease, delay: 0.4 }}
          >
            {journey.heading}
          </motion.h2>
          {journey.paragraphs.map((p, i) => (
            <MaskedLine key={p} delay={0.6 + i * 0.25}>
              {p}
            </MaskedLine>
          ))}
        </div>
      </motion.div>

      <LotusDivider className="mt-5" />
    </ScrollPage>
  );
}
