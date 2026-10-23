import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import "./TracksComingSoon.css";

const worldMarkers = Array.from({ length: 4 }, (_, index) => index);

function TracksComingSoon() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="tracks-coming-soon"
      aria-labelledby="tracks-coming-soon-title"
    >
      <div className="tracks-coming-soon-atmosphere" aria-hidden="true">
        <span className="tracks-coming-soon-sparkle tracks-coming-soon-sparkle-left">✦</span>
        <span className="tracks-coming-soon-sparkle tracks-coming-soon-sparkle-right">✧</span>
      </div>

      <div className="tracks-coming-soon-shell">
        <motion.header
          className="tracks-coming-soon-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="tracks-coming-soon-eyebrow">YOUR NEXT ADVENTURE AWAITS</p>
          <h2 id="tracks-coming-soon-title">New worlds are on their way.</h2>
          <p className="tracks-coming-soon-description">
            Four tracks. Countless possibilities. We&apos;re putting the finishing
            touches on the challenges. Stay tuned for the official tracks and
            problem statements.
          </p>
        </motion.header>

        <div className="tracks-coming-soon-world" aria-hidden="true">
          <svg
            className="tracks-coming-soon-route"
            viewBox="0 0 1000 280"
            preserveAspectRatio="none"
          >
            <path d="M125 224 C210 224 270 202 375 202 S540 224 625 224 S790 202 875 202" />
          </svg>

          <div className="tracks-coming-soon-cloud tracks-coming-soon-scene-cloud-one" />
          <div className="tracks-coming-soon-cloud tracks-coming-soon-scene-cloud-two" />

          <div className="tracks-coming-soon-markers">
            {worldMarkers.map((marker) => (
              <motion.span
                key={marker}
                className="tracks-coming-soon-marker"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.35,
                  delay: reducedMotion ? 0 : 0.12 + marker * 0.08,
                }}
              >
                <span className="tracks-coming-soon-marker-lock">
                  <span />
                </span>
              </motion.span>
            ))}
          </div>

          <motion.div
            className="tracks-coming-soon-mystery-block"
            animate={
              isInView && !reducedMotion
                ? { y: [0, -8, 0], rotate: [0, -1.5, 1.5, 0] }
                : { y: 0, rotate: 0 }
            }
            transition={
              isInView && !reducedMotion
                ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0 }
            }
          >
            <span>?</span>
          </motion.div>

          <div className="tracks-coming-soon-platform">
            <span className="tracks-coming-soon-platform-grass" />
            <span className="tracks-coming-soon-platform-soil" />
          </div>
          <span className="tracks-coming-soon-coin tracks-coming-soon-coin-one">¢</span>
          <span className="tracks-coming-soon-coin tracks-coming-soon-coin-two">¢</span>
          <span className="tracks-coming-soon-flag">
            <i />
          </span>
        </div>

        <div className="tracks-coming-soon-status">
          <span className="tracks-coming-soon-status-light" aria-hidden="true" />
          <p>TRACKS &amp; PROBLEM STATEMENTS — COMING SOON</p>
        </div>
        <p className="tracks-coming-soon-signoff">
          Get your team ready. The adventure begins soon.
        </p>
      </div>
    </section>
  );
}

export default TracksComingSoon;
