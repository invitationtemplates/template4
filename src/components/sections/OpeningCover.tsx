import { useEffect, useState, type KeyboardEvent } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import ganesha from "../../assets/ganesha.png";
import { Petals, Sparkles } from "../ui/Effects";
import { LotusIcon } from "../ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

// Petals bursting from the seal when tapped: [angle deg, distance px, size px, colour]
const COLOURS = ["from-[#F5A524] to-[#E8590C]", "from-[#E5484D] to-[#B3122A]", "from-[#FFD166] to-[#F59E0B]", "from-[#F4A6A6] to-[#D6455B]"];
const BURST: [number, number, number, string][] = Array.from({ length: 18 }, (_, i) => [i * 20 + (i % 2) * 7, 110 + ((i * 37) % 120), 10 + ((i * 5) % 9), COLOURS[i % COLOURS.length]]);

/**
 * Full-screen "Tap to open" cover over the wedding artwork. Tap (or Enter/Space) -> petals burst from the
 * gold seal, the writing fades, and the cover shrinks into the seal to reveal the invitation underneath.
 * `onOpenStart` fires synchronously inside the tap so music can start under the tap's permission.
 */
export default function OpeningCover({
  config,
  parts,
  guest,
  onOpenStart,
  onOpened,
}: {
  config: InvitationConfig;
  parts: EventParts;
  guest: string;
  onOpenStart: () => void;
  onOpened: () => void;
}) {
  const { couple, cover, hero } = config;
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [tapped, setTapped] = useState(false);
  const reduce = useReducedMotion();

  // Lock page scroll behind the cover and put keyboard focus on it.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    scope.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [scope]);

  const open = async () => {
    if (tapped) return;
    setTapped(true);
    onOpenStart();

    if (reduce) {
      await animate(scope.current, { opacity: 0 }, { duration: 0.35 });
      onOpened();
      return;
    }
    animate("[data-seal]", { scale: [1, 0.88, 1.12] }, { duration: 0.5 });
    animate("[data-content]", { opacity: 0, y: -12 }, { duration: 0.5, delay: 0.3 });
    await animate(scope.current, { clipPath: "circle(0% at 50% 80%)" }, { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.45 });
    onOpened();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      ref={scope}
      role="button"
      tabIndex={0}
      aria-label={`${cover.tap}: open the wedding invitation of ${couple.first} and ${couple.second}`}
      onClick={open}
      onKeyDown={onKey}
      style={{ clipPath: "circle(150% at 50% 80%)" }}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-maroon-night outline-none"
    >
      <div className="relative mx-auto h-full w-full max-w-[430px] overflow-hidden">
        <motion.img
          src={photoUrl(hero.photo, 900)}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[10%_100%]"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 3, ease }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-maroon-night/85 via-maroon-night/45 to-maroon-night/90" />
        <div aria-hidden className="absolute inset-x-0 top-[12%] h-[42%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(63,12,18,0.55),transparent_70%)]" />
        <Sparkles count={16} />
        <Petals />

        <div data-content className="relative flex h-full flex-col items-center px-6 pt-[10svh] text-center">
          <motion.img initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease, delay: 0.2 }} src={ganesha} alt="" aria-hidden width={52} height={63} className="h-[56px] w-auto" />

          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.35 }} className="mt-2 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-[#F6E2B0] drop-shadow-[0_1px_6px_rgba(63,12,18,0.9)]">
            {config.hero.blessing}
          </motion.p>

          {guest && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.45 }} className="mt-4 font-heading text-[18px] italic text-[#FBE9C4]">
              {cover.dear} {guest}
            </motion.p>
          )}

          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.55 }} className="mt-5 font-display text-[13px] font-semibold uppercase tracking-[0.3em] text-[#F6E2B0] drop-shadow-[0_1px_6px_rgba(63,12,18,0.9)]">
            {cover.invited}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.8 }}
            className="glow-text -mx-[0.22em] mt-2 px-[0.22em] py-[0.2em] -mb-[0.2em] font-script text-[clamp(54px,17vw,72px)] leading-[1.05]"
          >
            {couple.first}
            <span className="block text-[0.5em] leading-none text-[#F1D58F]">weds</span>
            {couple.second}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="mt-3 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-[#FFF1D2] drop-shadow-[0_1px_6px_rgba(63,12,18,0.9)]">
            {parts.monthLong} {parts.day.padStart(2, "0")}, {parts.year}
          </motion.p>
        </div>

        {/* Seal + prompt */}
        <div className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2">
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 140, damping: 14, delay: 1.3 }}>
            <div data-seal className="relative grid h-[84px] w-[84px] place-items-center">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full border-2 border-gold-light/70 [animation-duration:2.2s] motion-reduce:hidden" />
              <span aria-hidden className="absolute -inset-3 animate-flame rounded-full bg-[radial-gradient(circle,rgba(255,200,100,0.5),rgba(255,200,100,0)_70%)]" />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#F1D58F,#C9984A_55%,#8F6420)] text-maroon-deep shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6),inset_0_0_0_3px_rgba(255,244,210,0.5)]">
                <LotusIcon className="h-9 w-9" />
              </span>
            </div>
          </motion.div>

          {tapped &&
            !reduce &&
            BURST.map(([angle, dist, size, colour], i) => (
              <motion.span
                key={i}
                aria-hidden
                className={`pointer-events-none absolute left-1/2 top-1/2 rounded-[60%_40%_60%_40%] bg-gradient-to-br ${colour}`}
                style={{ width: size, height: size * 1.3, marginLeft: -size / 2, marginTop: -size / 2 }}
                initial={{ x: 0, y: 0, opacity: 0.95, rotate: 0, scale: 0.6 }}
                animate={{ x: Math.cos((angle * Math.PI) / 180) * dist, y: Math.sin((angle * Math.PI) / 180) * dist - 30, opacity: 0, rotate: angle + 140, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            ))}
        </div>

        <motion.p
          data-content
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute inset-x-0 top-[calc(80%+66px)] animate-pulse text-center font-display text-[13px] font-bold uppercase tracking-[0.3em] text-[#F6E2B0] drop-shadow-[0_1px_6px_rgba(63,12,18,0.9)]"
        >
          {cover.tap}
        </motion.p>
      </div>
    </div>
  );
}
