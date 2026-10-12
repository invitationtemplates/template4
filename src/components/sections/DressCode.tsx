import { motion } from "motion/react";
import ScrollPage from "../ui/ScrollPage";
import { Shirt, Users } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { SectionHeading } from "../ui/Decor";

const label = "font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-deep";
const view = { once: true, amount: 0.3 } as const;

/**
 * Dress Code & Guest Information: the two cards tip up from the table like the pages of a book
 * (rotating on their top edge), then each icon swings in with a small wobble.
 */
export default function DressCode({ info }: { info: InvitationConfig["info"] }) {
  const tip = (n: number) => ({
    initial: { opacity: 0, rotateX: -75, y: 30 },
    whileInView: { opacity: 1, rotateX: 0, y: 0 },
    viewport: view,
    transition: { type: "spring" as const, stiffness: 70, damping: 13, delay: n * 0.2 },
    style: { transformOrigin: "50% 0%" },
  });
  const icon = (n: number) => ({
    initial: { rotate: -35, scale: 0.4, opacity: 0 },
    whileInView: { rotate: [-35, 14, -8, 0], scale: 1, opacity: 1 },
    viewport: view,
    transition: { duration: 0.9, delay: 0.45 + n * 0.2 },
  });

  return (
    <ScrollPage id="info" tone="warm">
      <SectionHeading compact>{info.heading}</SectionHeading>

      <div className="mx-auto mt-8 grid max-w-[340px] grid-cols-1 gap-6 [perspective:800px]">
        <motion.article {...tip(0)} className="paper-card h-full px-6 py-7">
          <motion.span {...icon(0)} className="block w-fit">
            <Shirt className="h-11 w-11 text-maroon" strokeWidth={1.4} aria-hidden />
          </motion.span>
          <p className={`mt-3 ${label}`}>{info.dress.title}</p>
          <p className="mt-2 font-body text-[21px] font-semibold leading-snug text-ink">
            {info.dress.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </motion.article>

        <motion.article {...tip(1)} className="paper-card h-full px-6 py-7">
          <motion.span {...icon(1)} className="block w-fit">
            <Users className="h-11 w-11 text-maroon" strokeWidth={1.4} aria-hidden />
          </motion.span>
          <p className={`mt-3 ${label}`}>{info.guest.title}</p>
          <p className="mt-2 font-body text-[21px] font-semibold leading-snug text-ink">{info.guest.text}</p>
        </motion.article>
      </div>
    </ScrollPage>
  );
}
