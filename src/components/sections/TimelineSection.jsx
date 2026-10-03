import { animate, motion, useInView } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const rounds = [
  { number: "01", name: "Ideation", date: "31st Oct", side: "left" },
  { number: "02", name: "Prototype", date: "1st Nov", side: "right" },
  { number: "03", name: "Finale", date: "2nd Nov", side: "left" },
];

const wait = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

function TimelineStar({ starRef, winking }) {
  return (
    <div ref={starRef} className="timeline-star" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="presentation">
        <path d="M32 4 40.2 21l18.6 2.6-13.5 13.1 3.2 18.5L32 46.5 15.5 55.2l3.2-18.5L5.2 23.6 23.8 21Z" />
        <ellipse cx="25" cy="30" rx="2.3" ry="4" />
        <motion.ellipse
          cx="39"
          cy="30"
          rx="2.3"
          animate={{ ry: winking ? [4, 0.35, 0.35, 4] : 4 }}
          transition={{ duration: 0.48, times: [0, 0.22, 0.68, 1] }}
        />
      </svg>
    </div>
  );
}

function TimelineCard({ round, revealed, cardRef, index }) {
  return (
    <div
      ref={cardRef}
      className={`timeline-stop timeline-stop-${round.side} timeline-stop-${index + 1}`}
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
    </div>
  );
}

function TimelineSection() {
  const stageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const starRef = useRef(null);
  const cardRefs = useRef([]);
  const [revealedRounds, setRevealedRounds] = useState([]);
  const [winking, setWinking] = useState(false);
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

      return cardRefs.current.map((card, index) => {
        const cardBox = card.getBoundingClientRect();

        return {
          x: cardBox.left - stageBox.left + cardBox.width * [0.31, 0.68, 0.39][index] - 39,
          y: cardBox.top - stageBox.top - 66,
        };
      });
    };

    const revealRound = async (index) => {
      if (cancelled) return;
      setRevealedRounds((current) => [...current, index]);
      await wait(420);
    };

    const runTimeline = async () => {
      const targets = getTargets();
      const star = starRef.current;
      const startTransform = new DOMMatrixReadOnly(getComputedStyle(star).transform);
      const start = { x: startTransform.m41, y: startTransform.m42 };

      setWinking(true);
      await wait(540);
      setWinking(false);
      await animate(
        star,
        {
          x: [start.x, start.x - 12, start.x + 8, start.x],
          y: [start.y, start.y + 10, start.y - 16, start.y],
          scaleX: [1, 1.13, 0.9, 1],
          scaleY: [1, 0.82, 1.12, 1],
          rotate: [0, -7, 6, 0],
        },
        { duration: 0.58, times: [0, 0.2, 0.6, 1], ease: "easeInOut" },
      );
      await animate(
        star,
        {
          x: [start.x, start.x - 46, targets[0].x + 34, targets[0].x],
          y: [start.y, start.y - 82, targets[0].y - 104, targets[0].y + 8],
          rotate: [0, -18, 28, -9],
          scale: [1, 0.92, 0.88, 0.88],
        },
        { duration: 0.88, times: [0, 0.28, 0.7, 1], ease: [0.32, 0.02, 0.18, 1] },
      );
      await animate(
        star,
        {
          x: [targets[0].x, targets[0].x - 19, targets[0].x + 7, targets[0].x],
          y: [targets[0].y + 8, targets[0].y - 38, targets[0].y - 8, targets[0].y],
          rotate: [-9, 14, -5, 0],
        },
        { duration: 0.46, times: [0, 0.38, 0.75, 1], ease: "easeOut" },
      );
      await revealRound(0);

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
          { duration: 0.92, times: [0, 0.16, 0.5, 0.82, 1], ease: [0.3, 0.02, 0.18, 1] },
        );
        await animate(
          star,
          {
            x: [target.x, target.x - direction * 22, target.x + direction * 9, target.x],
            y: [target.y + 9, target.y - 44, target.y - 11, target.y],
            rotate: [direction * 6, -direction * 19, direction * 7, 0],
          },
          { duration: 0.48, times: [0, 0.4, 0.76, 1], ease: "easeOut" },
        );
        await revealRound(index);
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
          <TimelineStar starRef={starRef} winking={winking} />

          {rounds.map((round, index) => (
            <TimelineCard
              key={round.number}
              round={round}
              index={index}
              revealed={revealedRounds.includes(index)}
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
