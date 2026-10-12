import { useCallback, useEffect, useRef, useState } from "react";
import ScrollPage from "../ui/ScrollPage";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { InvitationConfig, Photo } from "../../types";
import { photoUrl } from "../../lib/image";
import { SectionHeading } from "../ui/Decor";
import { useReveal } from "../ui/useReveal";

/** Full-screen photo viewer: arrows, swipe, and keys (Esc, left, right). */
function Lightbox({ photos, index, onClose, onChange }: { photos: Photo[]; index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = photos.length;
  const go = useCallback((d: number) => index !== null && onChange((index + d + n) % n), [index, n, onChange]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, go, onClose]);

  const arrow = "absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-maroon";

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photos[index].alt}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-maroon-night/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            key={index}
            src={photoUrl(photos[index], 1400)}
            alt={photos[index].alt}
            className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-maroon">
            <X className="h-5 w-5" />
          </button>
          {n > 1 && (
            <>
              <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), go(-1))} className={`${arrow} left-3`}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), go(1))} className={`${arrow} right-3`}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Each tile opens from a different edge: left, right, bottom, top.
const WIPES = ["inset(0 100% 0 0)", "inset(0 0 0 100%)", "inset(100% 0 0 0)", "inset(0 0 100% 0)"];

/** One gallery tile: wipes open from its own edge while the picture settles from a zoom. */
function WipeTile({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.3);
  const hide = WIPES[index % 4];
  const delay = 0.18 * index;
  return (
    <div ref={ref} className="aspect-[1/1.2]">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo: ${photo.alt}`}
        className="group relative h-full w-full overflow-hidden rounded-xl border border-gold-soft shadow-soft"
        initial={{ clipPath: hide }}
        animate={{ clipPath: inView ? "inset(0 0% 0 0)" : hide }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.img
          src={photoUrl(photo, 700)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          initial={{ scale: 1.5 }}
          animate={{ scale: inView ? 1 : 1.5 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay }}
        />
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-night/25 to-transparent" />
      </motion.button>
    </div>
  );
}

/** 2 x 2 photo grid with a lightbox. The section hides itself when there are no photos. */
export default function Gallery({ gallery }: { gallery: InvitationConfig["gallery"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const { photos } = gallery;
  if (photos.length === 0) return null;

  const show = (i: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(i);
  };
  const close = () => {
    setOpen(null);
    opener.current?.focus();
  };

  return (
    <ScrollPage id="gallery" tone="plain">
      <SectionHeading>{gallery.heading}</SectionHeading>

      <div className="mx-auto mt-8 grid max-w-[360px] grid-cols-2 gap-3.5">
        {photos.map((p, i) => (
          <WipeTile key={p.src} photo={p} index={i} onOpen={() => show(i)} />
        ))}
      </div>

      <Lightbox photos={photos} index={open} onClose={close} onChange={setOpen} />
    </ScrollPage>
  );
}
