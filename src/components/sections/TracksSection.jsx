import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { useRef, useState } from "react";
import "./TracksSection.css";

// ==========================================
// TRACK DATA
// ==========================================

const tracks = [
  {
    id: "open-innovation",
    level: "Level 01",
    name: "Open Innovation",
    theme: "innovation",
    description:
      "An open world for creative ideas and solutions to real-world problems.",
    problemStatements: [],
  },
  {
    id: "sdgs",
    level: "Level 02",
    name: "Sustainable Development Goals",
    theme: "sustainability",
    description:
      "A world focused on sustainability, social impact, and building a better future.",
    problemStatements: [],
  },
  {
    id: "emerging-tech",
    level: "Level 03",
    name: "Emerging Technologies",
    theme: "technology",
    description:
      "A futuristic world exploring how technology can solve meaningful problems.",
    problemStatements: [],
  },
  {
    id: "beginners",
    level: "Bonus Level",
    name: "Beginner's Track",
    theme: "beginner",
    description:
      "A welcoming starting point exclusively for first-year students and first-time hackers.",
    detail:
      "This ideathon celebrates innovative thinking, creativity, and confidence in problem-solving. You do not need a fully developed technical implementation to take part.",
    problemStatements: [],
  },
  {
    id: "elevenlabs",
    level: "Special Track",
    name: "ElevenLabs Track",
    theme: "elevenlabs",
    description:
      "Build innovative solutions using ElevenLabs voice AI technology and unlock exciting rewards.",

    prizes: [
      {
        title: "Track Winner",
        plan: "ElevenLabs Scale",
        duration: "3 months",
        credits: "1.8M credits/month",
        note: "Per team member",
      },
      {
        title: "Overall Winners",
        plan: "ElevenLabs Pro",
        duration: "3 months",
        credits: "600K credits/month",
        note: "Per team member",
      },
      {
        title: "All Participants",
        plan: "ElevenLabs Creator",
        duration: "1 month",
        credits: "131K credits",
        note: "Creator plan access",
      },
    ],
  },
];

// ==========================================
// INDIVIDUAL TRACK CARD
// ==========================================

function TrackDestination({
  track,
  index,
  isSelected,
  onSelect,
  reducedMotion,
}) {
  return (
    <motion.button
      type="button"
      className={`track-destination track-destination-${track.theme}${
        isSelected ? " is-selected" : ""
      }`}
      aria-expanded={isSelected}
      aria-controls="track-briefing"
      onClick={onSelect}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.45,
        delay: reducedMotion ? 0 : index * 0.1,
      }}
      whileHover={reducedMotion ? undefined : { y: -5 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
    >
      <span className="track-destination-world" aria-hidden="true">
        <span className="track-island">
          <span className="track-island-hill" />
          <span className="track-island-grass" />

          <span className={`track-world-icon track-world-icon-${track.theme}`}>
            {track.theme === "beginner"
              ? "★"
              : track.theme === "elevenlabs"
                ? "11"
                : "?"}
          </span>

          {track.theme === "sustainability" && (
            <span className="track-world-sprout">
              <i />
            </span>
          )}

          {track.theme === "technology" && (
            <span className="track-world-crystal">
              <i />
            </span>
          )}

          {track.theme === "innovation" && (
            <span className="track-world-pipe">
              <i />
            </span>
          )}
        </span>

        <span className="track-world-flag">
          <i />
        </span>
      </span>

      <span className="track-destination-copy">
        <span className="track-destination-level">{track.level}</span>

        <span className="track-destination-name">{track.name}</span>

        {track.theme === "beginner" && (
          <span className="track-destination-note">
            Ideathon · First years &amp; first-time hackers
          </span>
        )}

        {track.theme === "elevenlabs" && (
          <span className="track-destination-note">Special Sponsor Track</span>
        )}

        <span className="track-destination-action">
          {isSelected ? "World discovered" : "Explore world"}

          <span aria-hidden="true">{isSelected ? "✓" : "→"}</span>
        </span>
      </span>

      <span className="track-destination-coin" aria-hidden="true">
        ¢
      </span>
    </motion.button>
  );
}

// ==========================================
// MAIN TRACKS SECTION
// ==========================================

function TracksSection() {
  const sectionRef = useRef(null);

  const [selectedTrackId, setSelectedTrackId] = useState(null);

  const reducedMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.18,
  });

  const selectedTrack = tracks.find((track) => track.id === selectedTrackId);

  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="tracks-section"
      aria-labelledby="tracks-title"
    >
      {/* BACKGROUND ATMOSPHERE */}

      <div className="tracks-atmosphere" aria-hidden="true">
        <span className="tracks-cloud tracks-cloud-one" />
        <span className="tracks-cloud tracks-cloud-two" />
        <span className="tracks-cloud tracks-cloud-three" />

        <span className="tracks-sparkle tracks-sparkle-one">✦</span>

        <span className="tracks-sparkle tracks-sparkle-two">✦</span>

        <span className="tracks-sparkle tracks-sparkle-three">✧</span>
      </div>

      <motion.div
        className="tracks-shell"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
      >
        {/* SECTION HEADING */}

        <header className="tracks-heading">
          <p className="tracks-eyebrow">
            <span aria-hidden="true">✦</span>
            Themes &amp; Problem Statements
          </p>

          <h2 id="tracks-title">Choose Your World</h2>

          <p className="tracks-intro">
            Follow the path, find your level, and discover the kind of change
            you want to build.
          </p>
        </header>

        {/* TRACK WORLD */}

        <div
          className="tracks-world"
          role="group"
          aria-label="Choose a hackathon track"
        >
          {/* ROUTE PATH */}

          <svg
            className="tracks-route"
            viewBox="0 0 1000 560"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="tracks-route-desktop-path"
              d="M125 140 C210 140 270 420 375 420 S540 140 625 140 S790 420 875 420 C950 350 950 210 875 140"
            />

            <path
              className="tracks-route-tablet-path"
              d="M250 140 C390 140 610 140 750 140 S750 420 750 420 C610 420 390 420 250 420"
            />

            <path
              className="tracks-route-mobile-path"
              d="M500 70 C560 110 440 170 500 210 S560 310 500 350 S440 450 500 490"
            />
          </svg>

          {/* WORLD SCENERY */}

          <div className="tracks-world-scenery" aria-hidden="true">
            <span className="tracks-scenery-hill tracks-scenery-hill-one" />

            <span className="tracks-scenery-hill tracks-scenery-hill-two" />

            <span className="tracks-scenery-pipe" />

            <span className="tracks-scenery-ground" />
          </div>

          {/* ALL FIVE TRACK CARDS */}

          {tracks.map((track, index) => (
            <TrackDestination
              key={track.id}
              track={track}
              index={index}
              isSelected={selectedTrackId === track.id}
              onSelect={() =>
                setSelectedTrackId((current) =>
                  current === track.id ? null : track.id,
                )
              }
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* MAP HINT */}

        <p className="tracks-map-hint" aria-live="polite">
          <span aria-hidden="true">↑</span>
          Select any world to open its briefing. You can explore in any order.
        </p>

        {/* TRACK BRIEFING */}

        <AnimatePresence>
          {selectedTrack && (
            <motion.section
              id="track-briefing"
              className={`track-briefing track-briefing-${selectedTrack.theme}`}
              aria-labelledby="track-briefing-title"
              initial={reducedMotion ? false : { opacity: 0, height: 0, y: 12 }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={reducedMotion ? undefined : { opacity: 0, height: 0, y: 8 }}
              transition={{
                duration: reducedMotion ? 0 : 0.32,
                ease: "easeOut",
              }}
            >
              <div className="track-briefing-inner">
                {/* BRIEFING HEADER */}

                <div className="track-briefing-heading">
                  <div>
                    <p>{selectedTrack.level} · Track briefing</p>

                    <h3 id="track-briefing-title">{selectedTrack.name}</h3>
                  </div>

                  <button
                    type="button"
                    className="track-briefing-close"
                    onClick={() => setSelectedTrackId(null)}
                    aria-label="Close track briefing and return to world selection"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                {/* DESCRIPTION */}

                <p className="track-briefing-description">
                  {selectedTrack.description}
                </p>

                {selectedTrack.detail && (
                  <p className="track-beginner-detail">
                    {selectedTrack.detail}
                  </p>
                )}

                {/* ELEVENLABS PRIZE BREAKDOWN */}

                {selectedTrack.prizes ? (
                  <div className="track-challenges elevenlabs-briefing">
                    <h4>
                      <span aria-hidden="true">✦</span>
                      Prize Breakdown
                    </h4>

                    <div className="elevenlabs-prize-list">
                      {selectedTrack.prizes.map((prize) => (
                        <div
                          className="elevenlabs-prize-item"
                          key={prize.title}
                        >
                          <span className="elevenlabs-prize-tag">
                            {prize.title}
                          </span>

                          <h5>{prize.plan}</h5>

                          <p className="elevenlabs-duration">
                            {prize.duration}
                          </p>

                          <p className="elevenlabs-credits">{prize.credits}</p>

                          <p className="elevenlabs-prize-note">{prize.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* REGULAR TRACK PROBLEM STATEMENTS */

                  <div className="track-challenges">
                    <h4>
                      <span aria-hidden="true">▧</span>
                      Problem statements
                    </h4>

                    {selectedTrack.problemStatements.length > 0 ? (
                      <ul>
                        {selectedTrack.problemStatements.map((problem) => (
                          <li key={problem.title}>
                            <h5>{problem.title}</h5>
                            <p>{problem.description}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="track-challenges-note">
                        Detailed problem statements have not been published in
                        the current event materials yet. Check back here for the
                        official challenges.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default TracksSection;
