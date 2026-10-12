import { useRef } from "react";
import ScrollPage from "../ui/ScrollPage";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCountdown } from "../../hooks/useCountdown";
import type { InvitationConfig } from "../../types";
import { Sprig } from "../ui/Decor";
import Reveal from "../ui/Reveal";

/**
 * One countdown dial. Entrance: it spins in from a tiny size, then a gold arc draws around it showing
 * how much of that unit has passed. The number slides when it changes.
 */
function Dial({ value, max, label, index }: { value: number; max: number; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const text = String(value).padStart(2, "0");
  const fraction = Math.min(1, Math.max(0, value / max));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -200, scale: 0.2 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 80, damping: 13, delay: index * 0.15 }}
      className="relative mx-auto aspect-square w-full max-w-[132px] rounded-full border-[1.5px] border-gold bg-gradient-to-b from-[#FFFBF1] to-[#FBEBD4] shadow-soft"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
        <motion.circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="#B8862F"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? fraction : 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: inView ? 0.5 + index * 0.1 : 0 }}
        />
      </svg>
      <span aria-hidden className="absolute inset-[5px] rounded-full border border-gold-soft" />
      <span aria-hidden className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-gold bg-cream" />
      <span aria-hidden className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-gold bg-cream" />
      <div className="relative grid h-full place-items-center">
        <div className="text-center">
          <div className="relative h-[50px] overflow-hidden font-heading text-[42px] font-medium leading-[50px] text-maroon" aria-hidden>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={text} className="block" initial={{ y: "70%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-70%", opacity: 0 }} transition={{ duration: 0.35 }}>
                {text}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="-mt-0.5 font-body text-[17px] font-semibold text-ink-soft">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

/** A sprig that grows up from its base when scrolled into view. */
function GrowingSprig({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`absolute top-1/2 w-11 -translate-y-1/2 ${flip ? "-right-2" : "-left-2"}`}>
      <motion.div
        className="origin-bottom"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <Sprig flip={flip} className="w-full" tilt={-8} />
      </motion.div>
    </div>
  );
}

/** "Countdown to Our Big Day": four dials, a live timer for screen readers, and a message once the day arrives. */
export default function Countdown({ countdown, start }: { countdown: InvitationConfig["countdown"]; start: string }) {
  const c = useCountdown(start);
  const summary = c.done ? "The wedding day has arrived" : `${c.days} days, ${c.hours} hours, ${c.minutes} minutes and ${c.seconds} seconds to go`;

  return (
    <ScrollPage id="countdown" tone="warm" className="text-center">
      <GrowingSprig />
      <GrowingSprig flip />

      <Reveal>
        <h2 className="mx-auto max-w-[270px] font-display text-[19px] font-semibold uppercase leading-snug tracking-[0.14em] text-maroon">{countdown.heading}</h2>
      </Reveal>

      <p className="sr-only" role="timer">
        {summary}
      </p>

      {c.done ? (
        <p className="mt-5 font-script text-[40px] leading-tight text-maroon">The celebration has begun!</p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-[300px] grid-cols-2 gap-x-8 gap-y-10">
          <Dial value={c.days} max={90} label="Days" index={0} />
          <Dial value={c.hours} max={24} label="Hours" index={1} />
          <Dial value={c.minutes} max={60} label="Minutes" index={2} />
          <Dial value={c.seconds} max={60} label="Seconds" index={3} />
        </div>
      )}
    </ScrollPage>
  );
}
