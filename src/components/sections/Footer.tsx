import { motion } from "motion/react";
import { CalendarDays, Heart, Home, ImageIcon, Mail, MapPin } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { FooterCorner } from "../ui/Decor";
import { Sparkles } from "../ui/Effects";

const icons: Record<string, JSX.Element> = {
  "#home": <Home className="h-[22px] w-[22px]" strokeWidth={1.7} />,
  "#our-story": <CalendarDays className="h-[22px] w-[22px]" strokeWidth={1.7} />,
  "#gallery": <ImageIcon className="h-[22px] w-[22px]" strokeWidth={1.7} />,
  "#location": <MapPin className="h-[22px] w-[22px]" strokeWidth={1.7} />,
  "#rsvp": <Mail className="h-[22px] w-[22px]" strokeWidth={1.7} />,
};

const view = { once: true, amount: 0.3 } as const;

/**
 * Footer: the filigree corners slide in from the sides, the five navigation icons bounce up one after
 * another, and the "Made with love" line fades in last. Rounded like the phone frame.
 */
export default function Footer({ nav, made }: { nav: InvitationConfig["nav"]; made: string }) {
  return (
    <footer className="relative mt-0 rounded-b-[28px] bg-gradient-to-b from-maroon-deep to-maroon-night text-[#F3DDB0]">
      <div className="absolute bottom-full left-0 right-0 flex justify-between overflow-hidden" aria-hidden>
        <motion.div initial={{ x: -90, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={view} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="w-[34%]">
          <FooterCorner />
        </motion.div>
        <motion.div initial={{ x: 90, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={view} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="w-[34%]">
          <FooterCorner flip />
        </motion.div>
      </div>
      <Sparkles count={8} />

      <nav aria-label="Footer" className="relative">
        <ul className="grid grid-cols-5 px-3 pb-3 pt-5">
          {nav.map((item, i) => (
            <li key={item.href}>
              <motion.a
                href={item.href}
                initial={{ y: 40, opacity: 0, scale: 0.5 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={view}
                transition={{ type: "spring", stiffness: 190, damping: 11, delay: 0.25 + i * 0.1 }}
                whileTap={{ scale: 0.92 }}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center gap-1 py-1 font-body text-[14px] font-semibold text-[#F3DDB0]"
              >
                {icons[item.href] ?? <Home className="h-[22px] w-[22px]" strokeWidth={1.7} />}
                {item.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>

      <motion.p
        className="relative flex items-center justify-center gap-3 pb-5 pt-1 font-body text-[17px] font-medium text-[#FBE9C4]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <Heart className="h-3.5 w-3.5 animate-pulse fill-gold-light text-gold-light" aria-hidden />
        {made}
        <Heart className="h-3.5 w-3.5 animate-pulse fill-gold-light text-gold-light [animation-delay:-0.8s]" aria-hidden />
      </motion.p>
    </footer>
  );
}
