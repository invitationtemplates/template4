import { motion } from "motion/react";
import ScrollPage from "../ui/ScrollPage";
import { Gift } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { LotusDivider, Sprig } from "../ui/Decor";
import { Sparkles } from "../ui/Effects";
import Reveal from "../ui/Reveal";
import { useReveal } from "../ui/useReveal";

const view = { once: true, amount: 0.4 } as const;

/** "Thank You" written in from left to right; the unclipped wrapper is what scroll triggers. */
function Handwritten({ children }: { children: string }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.5);
  return (
    <div ref={ref}>
      <motion.p
        className="maroon-text animate-shimmer mt-1 inline-block pr-2 font-script text-[46px] leading-tight"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
        transition={{ duration: 1.9, ease: "easeInOut", delay: 0.4 }}
      >
        {children}
      </motion.p>
    </div>
  );
}

/** A sprig that grows up from the bottom while swaying open, like a stem unfurling. */
function Unfurl({ flip = false }: { flip?: boolean }) {
  return (
    <motion.div
      className={`absolute top-2 w-10 origin-bottom ${flip ? "-right-1" : "-left-1"}`}
      initial={{ scaleY: 0.1, opacity: 0, rotate: flip ? 14 : -14 }}
      whileInView={{ scaleY: 1, opacity: 1, rotate: 0 }}
      viewport={view}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <Sprig flip={flip} className="w-full" tilt={10} />
    </motion.div>
  );
}

/**
 * Gifts & blessings, then the "Thank You" sign-off. "Thank You" is revealed left to right as if it were
 * being written; the couple's names and date follow. Bottom padding leaves room for the footer corners.
 */
export default function Gifts({
  gifts,
  thanks,
  couple,
  parts,
}: {
  gifts: InvitationConfig["gifts"];
  thanks: InvitationConfig["thanks"];
  couple: InvitationConfig["couple"];
  parts: EventParts;
}) {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: view,
    transition: { duration: 0.7, delay },
  });

  return (
    <ScrollPage id="gifts" tone="peach" className="text-center !pb-32">
      <Sparkles count={10} />
      <Unfurl />
      <Unfurl flip />

      <Reveal className="relative">
        <h2 className="flex items-center justify-center gap-2 font-display text-[16px] font-semibold uppercase tracking-[0.14em] text-maroon">
          <motion.span initial={{ scale: 0, rotate: -40 }} whileInView={{ scale: 1, rotate: 0 }} viewport={view} transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}>
            <Gift className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden />
          </motion.span>
          {gifts.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-[270px] font-body text-[19px] font-medium leading-[1.45] text-ink">{gifts.lines.join(" ")}</p>
      </Reveal>

      <div className="relative mt-5">
        <motion.div className="mx-auto flex items-center justify-center gap-2 text-gold" aria-hidden initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={view} transition={{ duration: 1 }}>
          <span className="h-px w-16 bg-gradient-to-l from-gold to-transparent" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-16 bg-gradient-to-r from-gold to-transparent" />
        </motion.div>

        <Handwritten>{thanks.title}</Handwritten>
        <motion.p {...fade(1.9)} className="font-body text-[16px] font-medium text-ink">
          {thanks.line}
        </motion.p>
        <motion.p {...fade(2.1)} className="mt-1.5 font-script text-[27px] leading-tight text-maroon">
          {couple.first} weds {couple.second}
        </motion.p>
        <motion.p {...fade(2.3)} className="font-body text-[15.5px] font-medium text-ink-soft">
          {parts.monthLong} {parts.day.padStart(2, "0")}, {parts.year}
        </motion.p>
        <LotusDivider className="mt-3" />
      </div>
    </ScrollPage>
  );
}
