import { motion } from "motion/react";
import ScrollPage from "../ui/ScrollPage";
import { Camera, Flower2 } from "lucide-react";
import type { InvitationConfig, ScheduleIcon } from "../../types";
import { RingsIcon, TempleIcon } from "../ui/Icons";
import { LotusDivider, SectionHeading } from "../ui/Decor";

const icons: Record<ScheduleIcon, JSX.Element> = {
  puja: <Flower2 className="h-[26px] w-[26px]" strokeWidth={1.6} />,
  ceremony: <RingsIcon className="h-[28px] w-[28px]" />,
  muhurtham: <TempleIcon className="h-[28px] w-[28px]" />,
  photos: <Camera className="h-[26px] w-[26px]" strokeWidth={1.6} />,
};

/**
 * Event Schedule: a gold timeline draws left to right across the card, and the four medallions pop onto
 * it one after another, each releasing a ripple as it lands; the text then fades up beneath.
 */
export default function Schedule({ schedule }: { schedule: InvitationConfig["schedule"] }) {
  const view = { once: true, amount: 0.3 } as const;

  return (
    <ScrollPage id="schedule" tone="peach">
      <SectionHeading>{schedule.heading}</SectionHeading>

      <div className="paper-card relative mx-auto mt-8 max-w-[360px] overflow-hidden px-5 py-7">
        {/* the timeline that connects the medallions, drawn top to bottom */}
        <motion.span
          aria-hidden
          className="absolute bottom-12 left-[44px] top-12 w-[2px] origin-top bg-gradient-to-b from-gold-soft via-gold to-gold-soft"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={view}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        <ol className="relative space-y-7">
          {schedule.items.map((item, i) => {
            const at = 0.3 + i * 0.35;
            return (
              <li key={item.title} className="flex items-center gap-5">
                <span className="relative block h-14 w-14 shrink-0">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-gold"
                    initial={{ scale: 1, opacity: 0 }}
                    whileInView={{ scale: 2, opacity: [0, 0.8, 0] }}
                    viewport={view}
                    transition={{ duration: 1, delay: at + 0.25 }}
                  />
                  <motion.span
                    className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-b from-[#94162b] to-maroon-deep text-gold-light shadow-soft ring-2 ring-gold-soft ring-offset-2 ring-offset-[#FFF7E8]"
                    initial={{ scale: 0, rotate: -120 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={view}
                    transition={{ type: "spring", stiffness: 170, damping: 11, delay: at }}
                  >
                    {icons[item.icon]}
                  </motion.span>
                </span>

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={view}
                  transition={{ duration: 0.6, delay: at + 0.25 }}
                >
                  <h3 className="font-body text-[20px] font-bold leading-tight text-ink">{item.title}</h3>
                  {item.native && <p className="font-devanagari text-[13px] font-semibold text-maroon-soft">{item.native}</p>}
                  {item.time ? (
                    <p className="mt-0.5 font-body text-[18px] font-semibold leading-tight text-maroon">{item.time}</p>
                  ) : (
                    <p className="mt-0.5 font-body text-[17px] italic leading-tight text-gold-deep">{schedule.confirmLater}</p>
                  )}
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>

      <LotusDivider className="mt-5" />
    </ScrollPage>
  );
}
