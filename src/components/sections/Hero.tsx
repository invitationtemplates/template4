import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import ganesha from "../../assets/ganesha.png";
import { FlameGlow, Petals, Sparkles } from "../ui/Effects";
import { BAR } from "../ui/ScrollPage";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Every size in the hero's writing is a pixel value at the reference's 383px width, scaled with the column
 * (`--u`, 1px at that width), so the text sits over the artwork exactly as designed on every phone.
 * `--h` is the height of the first screen (everything below the top bar).
 */
const u = (n: number) => `calc(var(--u) * ${n})`;
const vars = {
  "--u": "calc(min(100vw, 430px) / 383)",
  "--h": `max(560px, calc(100svh - ${BAR}px))`,
} as CSSProperties;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

/**
 * Hero: the whole first screen. The supplied artwork (garland-framed couple, temples, sunrise) fills it
 * with the invitation written over the sky. The picture settles with a slow zoom, the lamps glow, petals
 * drift, the names shimmer; as the guest scrolls away the picture zooms on and the writing drifts up.
 */
export default function Hero({ config, parts }: { config: InvitationConfig; parts: EventParts }) {
  const { couple, hero } = config;
  const day = parts.day.padStart(2, "0");

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);

  return (
    <section id="home" ref={ref} className="relative snap-start" style={vars}>
      <div className="relative overflow-hidden" style={{ height: "var(--h)" }}>
        {/* The artwork is a tall 1:2 picture, always at least as wide as the screen and anchored at the bottom,
            so the couple stays low-left. Lamp glows are positioned in this same box. */}
        <motion.div className="absolute inset-0" style={{ scale: photoScale, transformOrigin: "25% 100%" }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: "max(100%, calc(var(--h) * 0.5))", aspectRatio: "1 / 2" }}>
            <motion.img
              src={photoUrl(hero.photo, 1000)}
              alt={hero.photo.alt}
              width={1000}
              height={2000}
              decoding="async"
              {...({ fetchpriority: "high" } as Record<string, string>)}
              className="h-full w-full"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.8, ease }}
            />
            <FlameGlow className="left-[24%] top-[94.8%]" />
            <FlameGlow className="left-[87%] top-[90.8%] scale-75" delay="-0.9s" />
          </div>
        </motion.div>

        {/* Soft light behind the writing so the maroon type stays crisp over the garlands */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[58%] bg-[radial-gradient(ellipse_at_50%_36%,rgba(255,243,224,0.66),rgba(255,243,224,0.2)_62%,transparent_82%)]" />
        <Sparkles count={12} />
        <Petals />

        <motion.div className="absolute inset-x-0 top-0 flex flex-col items-center text-center" style={{ paddingTop: u(34), y: textY, opacity: textOpacity }}>
          <motion.img {...enter(0.2)} src={ganesha} alt="" aria-hidden width={32} height={39} className="w-auto" style={{ height: u(26) }} />

          <motion.p {...enter(0.35)} className="font-display font-semibold uppercase text-gold-deep" style={{ fontSize: u(8.4), letterSpacing: "0.1em", marginTop: u(5) }}>
            {hero.blessing}
          </motion.p>

          <motion.div {...enter(0.5)} className="font-body font-bold uppercase text-ink" style={{ fontSize: u(10.4), lineHeight: 1.45, letterSpacing: "0.06em", marginTop: u(12) }}>
            {hero.invite.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </motion.div>

          <h1 className="flex flex-col items-center" style={{ marginTop: u(4) }}>
            <motion.span
              initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease, delay: 0.75 }}
              className="maroon-text animate-shimmer font-script"
              style={{ fontSize: u(60), lineHeight: 1.04, padding: "0.26em 0.34em", margin: "-0.26em -0.34em" }}
            >
              {couple.first}
            </motion.span>

            <motion.span {...enter(1.05)} className="flex items-center font-script text-maroon" style={{ gap: u(8), fontSize: u(24), lineHeight: 1, marginTop: u(-3) }}>
              <motion.span className="origin-right bg-gradient-to-l from-gold to-transparent" style={{ height: 1, width: u(34) }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 1.3 }} />
              {hero.weds}
              <motion.span className="origin-left bg-gradient-to-r from-gold to-transparent" style={{ height: 1, width: u(34) }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 1.3 }} />
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease, delay: 1.15 }}
              className="maroon-text animate-shimmer font-script"
              style={{ fontSize: u(68), lineHeight: 1.04, padding: "0.26em 0.34em", margin: `calc(${u(-4)} - 0.26em) -0.34em -0.26em` }}
            >
              {couple.second}
            </motion.span>
          </h1>

          <motion.div {...enter(1.5)} className="flex items-center text-gold" style={{ gap: u(6), marginTop: u(2) }} aria-hidden>
            <span className="bg-gradient-to-r from-transparent to-gold" style={{ height: 1, width: u(50) }} />
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: u(9), height: u(9) }}>
              <path d="M12 21C5 15.500 2 11.500 2 8a5 5 0 0 1 10-1.500A5 5 0 0 1 22 8c0 3.500-3 7.500-10 13Z" />
            </svg>
            <span className="bg-gradient-to-l from-transparent to-gold" style={{ height: 1, width: u(50) }} />
          </motion.div>

          <motion.div {...enter(1.65)} className="grid items-end" style={{ gridTemplateColumns: "1fr auto 1fr", width: u(236), marginTop: u(14) }}>
            <span className="flex items-center justify-end font-display font-semibold uppercase text-maroon" style={{ fontSize: u(8.6), letterSpacing: "0.12em", gap: u(5), paddingBottom: u(7) }}>
              {parts.monthLong}
              <span className="bg-gold" style={{ height: 1, width: u(14) }} />
            </span>
            <span className="flex flex-col items-center border-x border-gold text-maroon" style={{ paddingInline: u(14) }}>
              <span className="font-display font-semibold uppercase" style={{ fontSize: u(7.6), letterSpacing: "0.14em" }}>
                {parts.weekday}
              </span>
              <span className="font-heading font-medium" style={{ fontSize: u(40), lineHeight: 1 }}>
                {day}
              </span>
            </span>
            <span className="flex items-center font-display font-semibold uppercase text-maroon" style={{ fontSize: u(8.6), letterSpacing: "0.12em", gap: u(5), paddingBottom: u(7) }}>
              <span className="bg-gold" style={{ height: 1, width: u(14) }} />
              {parts.year}
            </span>
          </motion.div>

          <motion.p {...enter(1.8)} className="font-body font-bold uppercase text-ink" style={{ fontSize: u(9.6), letterSpacing: "0.08em", marginTop: u(7) }}>
            {hero.muhuratLabel}: {parts.startTime} onwards
          </motion.p>
        </motion.div>
      </div>

      <a
        href="#countdown"
        aria-label="Scroll to the next page"
        className="absolute bottom-5 left-1/2 z-20 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-gold-soft bg-cream/95 text-maroon shadow-card"
      >
        <ChevronDown className="h-5 w-5 animate-bob" aria-hidden />
      </a>
    </section>
  );
}
