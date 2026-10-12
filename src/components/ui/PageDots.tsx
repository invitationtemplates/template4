import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Small page indicator pinned to the right edge of the column: one dot per page, the current one grows
 * and fills with maroon. Each dot is a link to its page.
 */
export default function PageDots({ pages }: { pages: { id: string; label: string }[] }) {
  const [active, setActive] = useState(pages[0]?.id);

  useEffect(() => {
    const els = pages.map((p) => document.getElementById(p.id)).filter((e): e is HTMLElement => !!e);
    // The page that crosses the middle of the screen is the current one.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pages]);

  return (
    <nav
      aria-label="Pages"
      className="fixed top-1/2 z-40 -translate-y-1/2"
      style={{ right: "calc(50vw - min(50vw, 215px) + 5px)" }}
    >
      <ul className="flex flex-col items-center gap-2.5">
        {pages.map((p) => {
          const on = p.id === active;
          return (
            <li key={p.id}>
              <a href={`#${p.id}`} aria-label={p.label} aria-current={on ? "true" : undefined} className="grid h-4 w-4 place-items-center">
                <motion.span
                  className="block rounded-full border border-gold bg-cream/80"
                  animate={{ height: on ? 16 : 7, width: 7, backgroundColor: on ? "#7E0D1F" : "rgba(250,243,227,0.85)", borderColor: on ? "#7E0D1F" : "#B8862F" }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
