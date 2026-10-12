import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Mandala } from "./Decor";

/** Height of the sticky top bar; each page fills the screen below it. */
export const BAR = 58;

const tones = {
  plain: "",
  warm: "bg-gradient-to-b from-cream-warm/60 via-cream to-cream-warm/60",
  peach: "bg-gradient-to-b from-peach/45 via-cream to-peach/35",
} as const;

/**
 * One full-screen "page" of the invitation. The section fills the screen (below the top bar), snaps into
 * place while scrolling, and its content is driven by the scroll position itself: it rises and scales up as
 * the page arrives, holds while it is on screen, and eases away upward as the next page comes in. A large
 * faint mandala behind it turns with the scroll.
 */
export default function ScrollPage({
  id,
  tone = "plain",
  className = "",
  children,
}: {
  id: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [80, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2]);
  const spin = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative flex snap-start flex-col justify-center overflow-hidden border-b border-gold-soft/30 px-4 py-10 ${tones[tone]} ${className}`}
      style={{ minHeight: `max(560px, calc(100svh - ${BAR}px))` }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -ml-[210px] -mt-[210px] w-[420px] opacity-[0.1]" style={reduce ? undefined : { rotate: spin }}>
        <Mandala className="w-full" />
      </motion.div>

      <motion.div className="relative" style={reduce ? undefined : { y, scale, opacity }}>
        {children}
      </motion.div>
    </section>
  );
}
