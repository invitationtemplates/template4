# Wedding Invitation, maroon & gold (template4)

Mobile-first Hindu wedding invitation recreated from a reference screenshot: a garland-framed hero with the couple and temples, a round countdown, date & venue cards, a four-step schedule, a journey card, a 2 x 2 gallery, map, dress code, RSVP, gifts & blessings and a maroon footer navigation.

React 18 · Vite · TypeScript · Tailwind CSS · Motion for React (`motion`) · Lucide icons. No backend required.

> **All names, the date and the wording are SAMPLE content** (Gori weds Shankar, 1 December 2026). Replace them in `src/data/invitation.ts`.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve dist/ locally
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). On Vercel the framework preset is **Vite**.

## Opening cover

Guests first see a full-screen "Tap to open" cover over the artwork. Tapping it (or pressing Enter) bursts marigold petals from the gold seal, shrinks the cover into it and reveals the invitation. `?guest=Aunt%20Sara` on the link adds "Dear Aunt Sara". If `musicSrc` is set and `musicOnOpen` is true, music starts on that tap; the floating button pauses it.

## Reuse for another couple

Edit **only** `src/data/invitation.ts`:

| Field | What it controls |
| --- | --- |
| `couple` | Names and hashtag |
| `event.start` / `end` / `timezone` | Weekday, date, muhurat time and the countdown are all **calculated** from these |
| `hero` | Blessing line, invitation lines, "weds", hero picture |
| `venue` | Leave `name` empty for "Location details coming soon" (map button is then disabled). Fill `name`, `address`, `mapsQuery` and the button opens Google Maps |
| `schedule.items` | Four ceremonies; leave `time` empty for "To be confirmed"; `native` is an optional line in the local script |
| `journey`, `gallery`, `info`, `gifts`, `thanks` | Section texts and photos |
| `rsvp.whatsappNumber` | Where RSVP replies go when no endpoint is set (digits, with country code) |
| `musicSrc` / `musicOnOpen`, `cover`, `nav` | Music, cover text, footer/menu links |

## Structure

```
src/
├─ App.tsx                     page composition + cover flow
├─ data/invitation.ts          ← all content
├─ types.ts
├─ components/
│  ├─ sections/                TopBar, OpeningCover, Hero, Countdown, DateVenue, Schedule, Journey,
│  │                           Gallery (+ lightbox), Location, DressCode, Rsvp, Gifts, Footer
│  └─ ui/                      Reveal, Decor (headings, ornaments, map art, footer corners),
│                              Effects (petals, sparkles, flame glow, progress), Icons, MusicPlayer
├─ hooks/useCountdown.ts
├─ lib/                        dates.ts, image.ts (Cloudinary), rsvp.ts (integration point), guest.ts, calendar.ts
├─ assets/                     photos/, ganesha.png, sprig.png
└─ styles/index.css
```

## Assets

| File | Notes |
| --- | --- |
| `src/assets/photos/hero.webp` | The supplied hero artwork, **extended** (sky and garlands continued upward, scenery continued to the right) so the couple sits low-left and the invitation text reads over open sky, as in the reference. Replace with your own at about **1000 x 1190**; keep the couple in the lower-left third and leave sky above them |
| `src/assets/photos/journey.webp` | Couple crop from the hero artwork (900 x 748) |
| `src/assets/photos/gallery-1…4.webp` | **Soft samples** cut from the reference screenshot; replace with real photos (about 1200 x 600) |
| `src/assets/ganesha.png`, `sprig.png` | Gold line-art Ganesha (from the reference) and a leafy sprig; transparent PNG |
| `public/og-image.jpg` | Link preview, 1200 x 630 |

## RSVP: how replies are handled

`src/lib/rsvp.ts` never pretends to save data:

1. `VITE_RSVP_ENDPOINT` set → the reply is POSTed as JSON (Google Apps Script web app, Supabase edge function, your API).
2. Otherwise, with a WhatsApp number → a pre-filled WhatsApp message to the family opens, and the success text says exactly that.
3. Otherwise nothing is sent, and the page says so.

## Cloudinary (optional)

Give photos a `cloudinaryId` in `invitation.ts` and set `VITE_CLOUDINARY_CLOUD` in `.env`; photos are then served as `f_auto,q_auto,w_<size>`.

## Animation and accessibility

- Motion for React handles the cover, entrances, scroll reveals, lightbox, menu and countdown; lamp glow, petals, sparkle and shimmer are CSS keyframes (transform/opacity only). GSAP was not needed.
- `prefers-reduced-motion` is respected (`MotionConfig reducedMotion="user"` plus a CSS override).
- Images below the fold are lazy-loaded; menu, gallery, form and the cover are keyboard-usable (Esc closes overlays, arrows move through photos).
- The hero text is sized in units of the column width (`--u`), so it stays aligned with the artwork on every phone from 320 px up.
