import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const starRef = useRef(null);
  const cardRefs = useRef([]);
  const [revealedRounds, setRevealedRounds] = useState([]);
  const isInView = useInView(stageRef, { once: true, amount: 0.46 });

  useEffect(() => {
    if (!isInView || !stageRef.current || !starRef.current) return undefined;

    let cancelled = false;

    const getTargets = () => {
      const stageBox = stageRef.current.getBoundingClientRect();

      return cardRefs.current.map((card) => {
        const cardBox = card.getBoundingClientRect();

        return {
          x: cardBox.left - stageBox.left + cardBox.width / 2 - 30,
          y: cardBox.top - stageBox.top - 52,
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

      star.style.transform = `translate(${targets[0].x}px, ${targets[0].y + 110}px)`;

      await animate(
        star,
        { opacity: [0, 1], x: targets[0].x, y: targets[0].y },
        { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] },
      );
      await animate(
        star,
        { y: [targets[0].y, targets[0].y - 19, targets[0].y] },
        { duration: 0.3, times: [0, 0.48, 1], ease: "easeOut" },
      );
      await revealRound(0);

      for (let index = 1; index < targets.length; index += 1) {
        if (cancelled) return;

        const previous = targets[index - 1];
        const target = targets[index];
        const midpoint = (previous.x + target.x) / 2 + (index % 2 ? 36 : -36);
        const apex = Math.min(previous.y, target.y) - 96;

        await animate(
          star,
          {
            x: [previous.x, midpoint, target.x],
            y: [previous.y, apex, target.y],
            rotate: [0, index % 2 ? 16 : -16, 0],
          },
          { duration: 0.78, times: [0, 0.46, 1], ease: [0.35, 0, 0.2, 1] },
        );
        await animate(
          star,
          { y: [target.y, target.y - 20, target.y] },
          { duration: 0.3, times: [0, 0.48, 1], ease: "easeOut" },
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
          <p>Level Select</p>
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
