import { motion, useReducedMotion } from "framer-motion";
import Coin from "../objects/Coin.jsx";
import "./PrizePoolSection.css";

/* Track-specific prize cards are saved here for the full prize reveal.
const prizeTracks = [
  { number: "01", name: "Open Innovation", theme: "innovation" },
  { number: "02", name: "Sustainable Development Goals", theme: "sustainability" },
  { number: "03", name: "Emerging Technologies", theme: "technology" },
  { number: "04", name: "Beginner’s Track", theme: "beginner" },
];
*/

const prizePositions = [
  { name: "1st Position", icon: "★" },
  { name: "Runner-up", icon: "☆" },
];

function PrizePoolSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="prizes" className="prize-pool-section" aria-labelledby="prize-pool-title">
      <div className="prize-pool-atmosphere" aria-hidden="true">
        <span className="cloud prize-pool-cloud prize-pool-cloud-one" />
        <span className="cloud prize-pool-cloud prize-pool-cloud-two" />
        <span className="cloud prize-pool-cloud prize-pool-cloud-three" />
        <span className="prize-pool-sparkle prize-pool-sparkle-one">✦</span>
        <span className="prize-pool-sparkle prize-pool-sparkle-two">✦</span>
      </div>

      <div className="prize-pool-shell">
        <header className="prize-pool-heading">
          <p className="prize-pool-eyebrow">LEVEL REWARDS</p>
          <h2 id="prize-pool-title">Prize Pool</h2>
          <p className="prize-pool-intro">
            Every bold idea deserves a moment in the spotlight. Stay tuned as
            the prize pool takes shape.
          </p>
        </header>

        <div className="prize-pool-scene" aria-hidden="true">
          <svg className="prize-pool-bush prize-pool-bush-left" viewBox="0 0 360 140" focusable="false">
            <path d="M1 138Q15 118 42 126Q37 89 67 78Q86 69 103 87Q107 44 144 48Q167 49 179 75Q201 43 234 57Q252 66 259 91Q286 67 315 87Q334 97 331 119Q350 119 359 138Z" />
            <path className="prize-pool-bush-detail" d="M30 123Q42 109 55 119M96 101Q108 91 121 103M215 91Q226 78 239 91M291 113Q303 101 316 113" />
          </svg>
          <svg className="prize-pool-bush prize-pool-bush-right" viewBox="0 0 360 140" focusable="false">
            <path d="M1 138Q15 118 42 126Q37 89 67 78Q86 69 103 87Q107 44 144 48Q167 49 179 75Q201 43 234 57Q252 66 259 91Q286 67 315 87Q334 97 331 119Q350 119 359 138Z" />
            <path className="prize-pool-bush-detail" d="M30 123Q42 109 55 119M96 101Q108 91 121 103M215 91Q226 78 239 91M291 113Q303 101 316 113" />
          </svg>
          <Coin className="prize-pool-coin prize-pool-coin-one" />
          <Coin className="prize-pool-coin prize-pool-coin-two" />
          <Coin className="prize-pool-coin prize-pool-coin-three" />
          <Coin className="prize-pool-coin prize-pool-coin-four" />
          <img className="prize-pool-castle" src="/images/prize-castle.png" alt="" />
          <span className="prize-pool-ground" />
        </div>

        <div className="prize-pool-announcement">
          <span className="prize-pool-announcement-coin" aria-hidden="true">✦</span>
          <div>
            <strong>Prize reveal coming soon!</strong>
            <p>More details will be announced here.</p>
          </div>
        </div>

        <div className="prize-pool-grid" aria-label="Prize positions">
          {prizePositions.map((position, index) => (
            <motion.article
              key={position.name}
              className="prize-track-card prize-position-card"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.08 }}
            >
              <span className="prize-position-icon" aria-hidden="true">{position.icon}</span>
              <div>
                <h3>{position.name}</h3>
                <p>Coming Soon</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Track-specific prize cards are preserved for when individual prizes are announced.
        <div className="prize-pool-grid" aria-label="Prizes by track">
          {prizeTracks.map((track, index) => (
            <motion.article
              key={track.number}
              className={`prize-track-card prize-track-card-${track.theme}`}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.08 }}
            >
              <div className="prize-track-heading">
                <span className="prize-track-number">WORLD {track.number}</span>
                <h3>{track.name}</h3>
              </div>
              <div className="prize-track-places">
                <div className="prize-track-place">
                  <span className="prize-track-place-icon" aria-hidden="true">★</span>
                  <span>Winner</span>
                  <strong>Coming Soon</strong>
                </div>
                <div className="prize-track-place">
                  <span className="prize-track-place-icon" aria-hidden="true">☆</span>
                  <span>1st Runner-up</span>
                  <strong>Coming Soon</strong>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}

export default PrizePoolSection;
