import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Share2, X } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { Ganesha } from "../ui/Decor";
import { LotusIcon } from "../ui/Icons";

/**
 * Sticky top bar like the reference: menu on the left, Ganesha in the centre, a lotus (share) on the right.
 * The menu opens a small panel of anchor links; Escape closes it.
 */
export default function TopBar({ nav, title }: { nav: InvitationConfig["nav"]; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const share = async () => {
    const data = { title, text: title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* the guest cancelled the share sheet */
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gold-soft/50 bg-cream/95 backdrop-blur-md">
      <div className="relative flex h-[58px] items-center justify-between px-4">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-full text-gold-deep"
        >
          {open ? <X className="h-7 w-7" strokeWidth={1.8} /> : <Menu className="h-7 w-7" strokeWidth={1.8} />}
        </button>

        <a href="#home" aria-label="Back to the top" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Ganesha height={40} />
        </a>

        <button type="button" onClick={share} aria-label={copied ? "Link copied" : "Share this invitation"} title={copied ? "Link copied" : "Share this invitation"} className="grid h-10 w-10 place-items-center rounded-full text-gold-deep">
          <LotusIcon className={`h-7 w-7 ${copied ? "text-maroon" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Main"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gold-soft/50 bg-cream"
          >
            <ul className="px-6 py-2 font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-maroon">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-gold-soft/40 last:border-0">
                  <a href={item.href} onClick={() => setOpen(false)} className="block py-3">
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="py-3">
                <button type="button" onClick={share} className="flex items-center gap-2 text-gold-deep">
                  <Share2 className="h-4 w-4" /> {copied ? "Link copied" : "Share invitation"}
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
