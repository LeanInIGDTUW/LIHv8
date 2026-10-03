import { animate, motion, useInView } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const rounds = [
  { number: "01", name: "Ideation", date: "31st Oct", side: "left" },
  { number: "02", name: "Prototype", date: "1st Nov", side: "right" },
  { number: "03", name: "Finale", date: "2nd Nov", side: "left" },
];

const wait = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

function TimelineStar({ starRef }) {
  return (
    <div ref={starRef} className="timeline-star" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="presentation">
        <path d="M32 4 40.2 21l18.6 2.6-13.5 13.1 3.2 18.5L32 46.5 15.5 55.2l3.2-18.5L5.2 23.6 23.8 21Z" />
        <ellipse cx="25" cy="30" rx="2.3" ry="4" />
        <ellipse cx="39" cy="30" rx="2.3" ry="4" />
      </svg>
    </div>
  );
}

function TimelineCard({ round, revealed, impacted, cardRef, index }) {
  return (
    <motion.div
      ref={cardRef}
      className={`timeline-stop timeline-stop-${round.side} timeline-stop-${index + 1}`}
      animate={impacted ? {
        x: [0, index % 2 ? 7 : -8, index % 2 ? -4 : 5, 0],
        y: [0, 7, -3, 0],
        rotate: [0, index % 2 ? 0.8 : -0.9, index % 2 ? -0.35 : 0.4, 0],
        scaleX: [1, 1.012, 0.995, 1],
        scaleY: [1, 0.96, 1.015, 1],
      } : { x: 0, y: 0, rotate: 0, scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.28, times: [0, 0.28, 0.68, 1], ease: "easeOut" }}
    >
      <motion.div
        className="timeline-card"
        animate={{ rotateX: revealed ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 230, damping: 20 }}
      >
        <div className="timeline-card-face timeline-card-front">
          <span className="timeline-brick-seam seam-one" />
          <span className="timeline-brick-seam seam-two" />
          <span className="timeline-question-block">?</span>
        </div>

        <div className="timeline-card-face timeline-card-back">
          <div>
            <p>Round {round.number}</p>
            <h3>{round.name}</h3>
          </div>
          <time>{round.date}</time>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineSection() {
  const stageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const starRef = useRef(null);
  const cardRefs = useRef([]);
  const [revealedRounds, setRevealedRounds] = useState([]);
  const [impactedRound, setImpactedRound] = useState(null);
  const isInView = useInView(stageRef, { once: true, amount: 0.46 });

  useLayoutEffect(() => {
    const positionRestingStar = () => {
      if (!stageRef.current || !eyebrowRef.current || !starRef.current) return;

      const stageBox = stageRef.current.getBoundingClientRect();
      const eyebrowBox = eyebrowRef.current.getBoundingClientRect();
      const starSize = starRef.current.getBoundingClientRect().width;
      const x = eyebrowBox.left - stageBox.left + eyebrowBox.width / 2 - starSize / 2;
      const y = eyebrowBox.top - stageBox.top - starSize - 14;

      starRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    positionRestingStar();
    window.addEventListener("resize", positionRestingStar);
    return () => window.removeEventListener("resize", positionRestingStar);
  }, []);

  useEffect(() => {
    if (!isInView || !stageRef.current || !starRef.current) return undefined;

    let cancelled = false;

    const getTargets = () => {
      const stageBox = stageRef.current.getBoundingClientRect();
      const starSize = starRef.current.getBoundingClientRect().width;

      return cardRefs.current.map((card, index) => {
        const cardBox = card.getBoundingClientRect();

        return {
          x: cardBox.left - stageBox.left + cardBox.width * [0.27, 0.72, 0.36][index] - starSize / 2,
          y: cardBox.top - stageBox.top - starSize + 5,
        };
      });
    };

    const impactRound = async (index) => {
      if (cancelled) return;
      setImpactedRound(index);
      setRevealedRounds((current) => [...current, index]);
      await wait(50);    // short impact pause before rebound
    };

    const runTimeline = async () => {
      const targets = getTargets();
      const star = starRef.current;
      const startTransform = new DOMMatrixReadOnly(getComputedStyle(star).transform);
      const start = { x: startTransform.m41, y: startTransform.m42 };

      await animate(
        star,
        {
          x: [start.x, start.x - 8, start.x + 5],
          y: [start.y, start.y + 8, start.y - 13],
          scaleX: [1, 1.08, 0.94],
          scaleY: [1, 0.88, 1.08],
          rotate: [0, -6, 5],
        },
        { duration: 0.14, times: [0, 0.42, 1], ease: "easeOut" },  // launch prep time
      );
      await animate(
        star,
        {
          x: [start.x + 5, start.x - 52, targets[0].x + 42, targets[0].x],
          y: [start.y - 13, start.y - 94, targets[0].y - 82, targets[0].y + 8],
          rotate: [5, -24, 36, -11],
          scaleX: [0.94, 0.88, 1.02, 0.91],
          scaleY: [1.08, 1.02, 0.86, 0.91],
        },
        { duration: 0.38, times: [0, 0.28, 0.72, 1], ease: [0.3, 0.03, 0.16, 1] }, // first flight
      );
      await impactRound(0);
      await animate(
        star,
        {
          x: [targets[0].x, targets[0].x - 19, targets[0].x + 7, targets[0].x],
          y: [targets[0].y + 8, targets[0].y - 38, targets[0].y - 8, targets[0].y],
          rotate: [-9, 14, -5, 0],
        },
        { duration: 0.2, times: [0, 0.36, 0.72, 1], ease: "easeOut" },   //first rebound
      );

      for (let index = 1; index < targets.length; index += 1) {
        if (cancelled) return;

        const previous = targets[index - 1];
        const target = targets[index];
        const direction = index % 2 ? 1 : -1;
        const midpoint = (previous.x + target.x) / 2 + direction * 92;
        const apex = Math.min(previous.y, target.y) - 132 - index * 14;

        await animate(
          star,
          {
            x: [previous.x, previous.x - direction * 24, midpoint, target.x + direction * 25, target.x],
            y: [previous.y, previous.y - 32, apex, target.y - 60, target.y + 9],
            rotate: [0, -direction * 15, direction * 34, -direction * 17, direction * 6],
            scaleX: [0.88, 1.02, 0.84, 0.95, 0.88],
            scaleY: [0.88, 0.78, 0.94, 0.82, 0.88],
          },
          { duration: 0.4, times: [0, 0.15, 0.48, 0.82, 1], ease: [0.27, 0.03, 0.15, 1] },  // fligh between bricks
        );
        await impactRound(index);
        await animate(
          star,
          {
            x: [target.x, target.x - direction * 22, target.x + direction * 9, target.x],
            y: [target.y + 9, target.y - 44, target.y - 11, target.y],
            rotate: [direction * 6, -direction * 19, direction * 7, 0],
          },
          { duration: 0.2, times: [0, 0.38, 0.74, 1], ease: "easeOut" },    // impact rebounds
        );
      }
    };

    runTimeline();

    return () => {
      cancelled = true;
    };
  }, [isInView]);

  return (
    <section id="timeline" className="timeline-section" aria-labelledby="timeline-title">
      <div className="timeline-glow" aria-hidden="true" />

      <div className="timeline-shell">
        <div className="timeline-heading">
          <p ref={eyebrowRef}>Level Select</p>
          <h2 id="timeline-title">The road to finale.</h2>
          <span>Three rounds. One winning journey.</span>
        </div>

        <div ref={stageRef} className="timeline-stage">
          <div className="timeline-path" aria-hidden="true" />
          <TimelineStar starRef={starRef} />

          {rounds.map((round, index) => (
            <TimelineCard
              key={round.number}
              round={round}
              index={index}
              revealed={revealedRounds.includes(index)}
              impacted={impactedRound === index}
              cardRef={(element) => {
                cardRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
