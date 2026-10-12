import { motion } from "motion/react";
import sprig from "../../assets/sprig.png";
import ganesha from "../../assets/ganesha.png";
import { LotusIcon } from "./Icons";

/** Decorative images are hidden from assistive tech and never take pointer events. */
const base = "pointer-events-none select-none";

/** The gold line-art Ganesha, from the reference artwork. */
export function Ganesha({ className = "", height = 40 }: { className?: string; height?: number }) {
  return <img src={ganesha} alt="" aria-hidden width={Math.round(height * 0.82)} height={height} decoding="async" className={`${base} w-auto ${className}`} style={{ height }} />;
}

/** Leafy gold sprig with blush buds; `flip` mirrors it for the right-hand side. */
export function Sprig({ flip = false, className = "", tilt = 0 }: { flip?: boolean; className?: string; tilt?: number }) {
  return (
    <img
      src={sprig}
      alt=""
      aria-hidden
      width={90}
      height={150}
      loading="lazy"
      decoding="async"
      className={`${base} h-auto ${flip ? "-scale-x-100" : ""} ${className}`}
      style={{ transform: `${flip ? "scaleX(-1) " : ""}rotate(${tilt}deg)` }}
    />
  );
}

/** One half of a heading flourish: a line that draws outward, ending in a small leaf and diamond. */
function Flourish({ flip = false, compact = false }: { flip?: boolean; compact?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 70 12"
      className={`h-3 text-gold ${compact ? "w-5" : "w-[58px]"} ${flip ? "-scale-x-100" : ""}`}
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.path
        d="M2 6 H48 C52 6 53 2 57 2 C60 2 61 5 58 6 C61 7 60 10 57 10 C53 10 52 6 48 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      />
      <path d="M64 6l3-3 3 3-3 3z" fill="currentColor" />
    </motion.svg>
  );
}

/** Section heading in spaced capitals with a gold flourish on each side. Words fade up one after another. */
export function SectionHeading({ children, id, className = "", compact = false }: { children: string; id?: string; className?: string; compact?: boolean }) {
  const words = children.split(" ");
  return (
    <div className={`relative z-10 flex items-center justify-center ${compact ? "gap-1.5" : "gap-2.5"} px-2 ${className}`}>
      <Flourish compact={compact} />
      <h2 id={id} aria-label={children} className={`text-center font-display font-semibold uppercase leading-tight text-maroon ${compact ? "text-[11.5px] tracking-[0.05em]" : "text-[15px] tracking-[0.16em]"}`}>
        {words.map((w, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 + i * 0.1 }}
          >
            {w}
            {" "}
          </motion.span>
        ))}
      </h2>
      <Flourish flip compact={compact} />
    </div>
  );
}

/** A centred lotus between two fine gold rules, used to close a section. */
export function LotusDivider({ className = "" }: { className?: string }) {
  const view = { once: true } as const;
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
      <motion.span className="h-px w-14 origin-right bg-gradient-to-l from-gold to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={view} transition={{ duration: 1 }} />
      <motion.span initial={{ opacity: 0, scale: 0.4, rotate: -20 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={view} transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.2 }}>
        <LotusIcon className="h-6 w-6 text-maroon" />
      </motion.span>
      <motion.span className="h-px w-14 origin-left bg-gradient-to-r from-gold to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={view} transition={{ duration: 1 }} />
    </div>
  );
}

/** Stylised street map used in the Location card (drawn here, so it stays sharp at any size). */
export function MapArt({ className = "", animatePin = false }: { className?: string; animatePin?: boolean }) {
  return (
    <svg viewBox="0 0 160 110" className={className} role="img" aria-label="Map of the wedding location">
      <rect width="160" height="110" fill="#F3EBDD" />
      <g fill="#E9DFCB">
        <rect x="6" y="6" width="38" height="26" rx="3" />
        <rect x="52" y="10" width="30" height="22" rx="3" />
        <rect x="96" y="4" width="26" height="30" rx="3" />
        <rect x="130" y="8" width="26" height="24" rx="3" />
        <rect x="6" y="42" width="30" height="28" rx="3" />
        <rect x="104" y="46" width="22" height="26" rx="3" />
        <rect x="134" y="44" width="22" height="30" rx="3" />
        <rect x="8" y="80" width="34" height="24" rx="3" />
        <rect x="56" y="82" width="26" height="22" rx="3" />
        <rect x="100" y="82" width="30" height="22" rx="3" />
      </g>
      <g fill="#DDE6D2">
        <rect x="50" y="44" width="46" height="30" rx="4" />
      </g>
      <g stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M0 36 H160" />
        <path d="M0 76 H160" />
        <path d="M46 0 V110" />
        <path d="M90 0 V110" />
        <path d="M132 0 V110" />
        <path d="M0 100 L160 14" strokeWidth="3" />
      </g>
      <g stroke="#E2D4BA" strokeWidth="0.8" fill="none">
        <path d="M0 36 H160" />
        <path d="M0 76 H160" />
        <path d="M46 0 V110" />
        <path d="M90 0 V110" />
        <path d="M132 0 V110" />
      </g>
      <ellipse cx="80" cy="82" rx="14" ry="4.500" fill="#7E0D1F" opacity="0.18" />
      {/* the pin drops in and bounces when animatePin is set */}
      <motion.g
        initial={animatePin ? { y: -70, opacity: 0 } : false}
        whileInView={animatePin ? { y: 0, opacity: 1 } : undefined}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 240, damping: 8, delay: 0.7 }}
      >
        <path d="M80 80 C72 66 66 60 66 52 a14 14 0 1 1 28 0 c0 8-6 14-14 28Z" fill="#7E0D1F" />
        <circle cx="80" cy="52" r="5.500" fill="#FBF3E4" />
      </motion.g>
    </svg>
  );
}

/** Maroon corner piece with gold filigree, used at the top corners of the footer. */
export function FooterCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 130 84" className={`${base} h-auto w-full ${flip ? "-scale-x-100" : ""}`} aria-hidden preserveAspectRatio="xMinYMax meet">
      <path d="M0 0 C 18 34 60 70 130 84 H0 Z" fill="#5C1219" />
      <path d="M0 0 C 18 34 60 70 130 84" fill="none" stroke="#D9B56A" strokeWidth="1.6" />
      <g fill="none" stroke="#D9B56A" strokeWidth="1.1" strokeLinecap="round">
        <path d="M6 70 C 18 52 34 54 40 66 C 46 76 34 82 28 74 C 24 68 32 64 36 68" />
        <path d="M30 80 C 44 62 66 60 82 72" />
        <path d="M4 54 C 10 40 22 36 30 42 C 36 47 32 54 26 52" />
        <path d="M52 80 C 62 70 78 68 96 78" />
        <path d="M10 30 C 14 22 20 20 24 24" />
        <path d="M60 66 C 70 58 86 58 100 66" />
      </g>
      <g fill="#D9B56A">
        <circle cx="28" cy="74" r="2" />
        <circle cx="38" cy="50" r="1.700" />
        <circle cx="82" cy="72" r="1.700" />
        <circle cx="14" cy="42" r="1.500" />
      </g>
    </svg>
  );
}

/** Large line-art mandala used (very faint) behind each page; ScrollPage turns it with the scroll. */
export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="-100 -100 200 200" className={`${base} ${className}`} aria-hidden>
      <g fill="none" stroke="#B8862F" strokeWidth="0.7">
        {[96, 80, 62, 42].map((r) => (
          <circle key={r} r={r} strokeDasharray={r === 80 ? "1.5 3" : undefined} />
        ))}
        {petals.map((a) => (
          <path key={a} d="M0 -42 C 11 -58 11 -74 0 -92 C -11 -74 -11 -58 0 -42Z" transform={`rotate(${a})`} />
        ))}
        {petals.map((a) => (
          <circle key={`d${a}`} cx="0" cy="-96" r="1.6" fill="#B8862F" transform={`rotate(${a + 11.25})`} />
        ))}
      </g>
    </svg>
  );
}
