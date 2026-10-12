import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { invitation } from "./data/invitation";
import { eventParts } from "./lib/dates";
import { readGuest } from "./lib/guest";
import { photoUrl } from "./lib/image";
import TopBar from "./components/sections/TopBar";
import OpeningCover from "./components/sections/OpeningCover";
import Hero from "./components/sections/Hero";
import Countdown from "./components/sections/Countdown";
import DateVenue from "./components/sections/DateVenue";
import Schedule from "./components/sections/Schedule";
import Journey from "./components/sections/Journey";
import Gallery from "./components/sections/Gallery";
import Location from "./components/sections/Location";
import DressCode from "./components/sections/DressCode";
import Rsvp from "./components/sections/Rsvp";
import Gifts from "./components/sections/Gifts";
import Footer from "./components/sections/Footer";
import MusicPlayer from "./components/ui/MusicPlayer";
import PageDots from "./components/ui/PageDots";
import { ScrollProgress, TapSparkles } from "./components/ui/Effects";

const PAGES = [
  { id: "home", label: "Welcome" },
  { id: "countdown", label: "Countdown" },
  { id: "date-venue", label: "Date and venue" },
  { id: "schedule", label: "Event schedule" },
  { id: "our-story", label: "Our journey" },
  { id: "gallery", label: "Photo gallery" },
  { id: "location", label: "Location" },
  { id: "info", label: "Dress code and guest information" },
  { id: "rsvp", label: "RSVP" },
  { id: "gifts", label: "Gifts and thank you" },
];

type Stage = "closed" | "opening" | "open";

/**
 * Page composition. All content comes from src/data/invitation.ts; every section is its own component.
 *
 * Flow: the "Tap to open" cover is shown first. The invitation mounts the moment it is tapped, so its
 * entrance animations play underneath while the cover shrinks away.
 */
export default function App() {
  const { event, couple } = invitation;
  const parts = useMemo(() => eventParts(event.start, event.end, event.timezone), [event.start, event.end, event.timezone]);
  const title = `${couple.first} weds ${couple.second} · Wedding Invitation`;
  const guest = useMemo(readGuest, []);
  const [stage, setStage] = useState<Stage>("closed");

  // Warm the hero picture while the guest is looking at the cover.
  useEffect(() => {
    const img = new Image();
    img.src = photoUrl(invitation.hero.photo, 1000);
  }, []);

  // Always begin at the top, even after a reload that restored a scroll position.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    // "user" makes Motion skip movement-based animation when the device asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <div className="page">
        {stage !== "closed" && (
          <>
            <ScrollProgress />
            <PageDots pages={PAGES} />
            <TopBar nav={invitation.nav} title={title} />
            <main>
              <Hero config={invitation} parts={parts} />
              <Countdown countdown={invitation.countdown} start={event.start} />
              <DateVenue venue={invitation.venue} parts={parts} />
              <Schedule schedule={invitation.schedule} />
              <Journey journey={invitation.journey} />
              <Gallery gallery={invitation.gallery} />
              <Location venue={invitation.venue} />
              <DressCode info={invitation.info} />
              <Rsvp rsvp={invitation.rsvp} />
              <Gifts gifts={invitation.gifts} thanks={invitation.thanks} couple={couple} parts={parts} />
            </main>
            <Footer nav={invitation.nav} made={invitation.footer.made} />
          </>
        )}
        <MusicPlayer src={invitation.musicSrc} autoStart={stage !== "closed" && invitation.musicOnOpen} />
      </div>

      <TapSparkles />

      {stage !== "open" && (
        <OpeningCover
          config={invitation}
          parts={parts}
          guest={guest}
          onOpenStart={() => setStage("opening")}
          onOpened={() => {
            setStage("open");
            window.scrollTo(0, 0);
          }}
        />
      )}
    </MotionConfig>
  );
}
