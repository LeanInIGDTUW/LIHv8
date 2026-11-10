import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Pipe from "../objects/Pipe.jsx";

const rounds = [
  {
    number: "01", name: "Opening Ceremony", date: "20th Nov", side: "left",
    details: <>We kick off with an <strong>online opening ceremony</strong> covering the format, tracks and timelines, followed by the <strong>official unveiling of the problem statements</strong>. Teams can then choose a challenge and prepare for the next round.</>,
  },
  {
    number: "02", name: "Ideation", date: "21st Nov", side: "right",
    details: <>This <strong>online, non-eliminatory</strong> round takes place on Discord. Teams share their ideas with mentors, receive <strong>constructive feedback</strong> and refine their approach. No submission is required; it counts for <strong>10% of the overall score</strong>.</>,
  },
  {
    number: "03", name: "Prototype", date: "22nd Nov", side: "left",
    details: <>In this <strong>online, eliminatory</strong> round, teams build a <strong>functional prototype or MVP</strong> and submit their repository, documentation, presentation and demo. A <strong>judging panel</strong> selects the finalists; this round counts for <strong>90% of the overall score</strong>.</>,
  },
  {
    number: "04", name: "Finale", date: "TBD", side: "right",
    details: <>Shortlisted teams present their prototypes <strong>offline</strong> to an <strong>expert judging panel</strong> (<strong>venue: TBD</strong>). The event closes with the <strong>announcement of winners and prize distribution</strong>. Tentative date: <strong>28 November 2026</strong>.</>,
  },
];

const wait = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

const randomBetween = (minimum, maximum) =>
  minimum + Math.random() * (maximum - minimum);

const dustColors = ["#8f4d39", "#a65e45", "#bc7253", "#d08a62"];

const createDustParticles = () =>
  Array.from({ length: 28 }, (_, index) => {
    const side = ["top", "right", "bottom", "left"][index % 4];
    const horizontalSide = side === "top" || side === "bottom";
    const outwardX = side === "left" ? randomBetween(-96, -42)
      : side === "right" ? randomBetween(42, 96)
        : randomBetween(-72, 72);
    const outwardY = side === "top" ? randomBetween(-82, -30)
      : side === "bottom" ? randomBetween(30, 72)
        : randomBetween(-48, 42);

    return {
      left: horizontalSide ? randomBetween(3, 97) : side === "left" ? 1 : 99,
      top: horizontalSide ? side === "top" ? 2 : 98 : randomBetween(5, 95),
      x: outwardX,
      y: outwardY,
      size: randomBetween(3, 8),
      delay: randomBetween(0, 0.09),
      duration: randomBetween(0.42, 0.72),
      rotation: randomBetween(-240, 240),
      gravity: randomBetween(8, 25),
      opacity: randomBetween(0.48, 0.82),
      scale: randomBetween(0.75, 1.25),
      peak: randomBetween(0.2, 0.38),
      color: dustColors[Math.floor(Math.random() * dustColors.length)],
    };
  });

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

function TimelineScenery() {
  return (
    <div className="timeline-scenery" aria-hidden="true">
      <svg className="timeline-pink-wave" viewBox="0 0 1900 520" preserveAspectRatio="none" role="presentation">
        <path
          className="timeline-pink-wave-shape"
          d="M0 265C120 265 225 273 345 267C485 260 590 266 710 270C840 274 960 265 1090 262C1225 259 1360 263 1490 257C1635 253 1765 259 1900 258V520H0Z"
        />
      </svg>
      <span className="hill timeline-scene-hill timeline-scene-hill-left"><i /></span>
      <span className="hill timeline-scene-hill timeline-scene-hill-gold"><i /></span>

      <div className="timeline-land timeline-land-left">
        <span className="timeline-land-grass" />
        <span className="timeline-land-soil" />
      </div>
      <div className="timeline-land timeline-land-right">
        <span className="timeline-land-grass" />
        <span className="timeline-land-soil" />
      </div>

      <Pipe variant="medium" className="timeline-scene-pipe timeline-scene-pipe-left" />
      <Pipe variant="tall" className="timeline-scene-pipe timeline-scene-pipe-centre" />
      <div className="timeline-plant-wrap">
        <span className="timeline-piranha">
          <i className="timeline-piranha-mouth" />
          <i className="timeline-piranha-spot spot-one" />
          <i className="timeline-piranha-spot spot-two" />
          <i className="timeline-piranha-spot spot-three" />
        </span>
        <span className="timeline-plant-stem" />
        <span className="timeline-plant-leaf leaf-left" />
        <span className="timeline-plant-leaf leaf-right" />
        <Pipe variant="small" className="timeline-scene-pipe timeline-scene-pipe-plant" />
      </div>
    </div>
  );
}

function TimelineCard({ round, revealed, impacted, expanded, canToggle, onToggle, cardRef, index }) {
  const dustParticles = useMemo(createDustParticles, []);
  const [frontVisible, setFrontVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={cardRef}
      className={`timeline-stop timeline-stop-${round.side} timeline-stop-${index + 1}`}
      animate={impacted ? {
        y: [0, 9, -10, 4, -2, 0],
        scaleX: [1, 1.035, 0.985, 1.012, 0.997, 1],
        scaleY: [1, 0.91, 1.065, 0.975, 1.012, 1],
      } : { x: 0, y: 0, rotate: 0, scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.42, times: [0, 0.2, 0.46, 0.68, 0.84, 1], ease: "easeOut" }}
    >
      <motion.div
        className="timeline-card"
        animate={{ rotateX: revealed ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 230, damping: 20 }}
        onAnimationComplete={() => {
          if (revealed) setFrontVisible(false);
        }}
      >
        {frontVisible && (
          <div className="timeline-card-face timeline-card-front">
            <span className="timeline-brick-seam seam-one" />
            <span className="timeline-brick-seam seam-two" />
            <span className="timeline-question-block">?</span>
          </div>
        )}

        <button
          className="timeline-card-face timeline-card-back"
          type="button"
          disabled={!canToggle}
          aria-expanded={expanded}
          aria-controls={`timeline-details-${round.number}`}
          onClick={onToggle}
        >
          <span className="timeline-card-title">
            <span className="timeline-card-kicker">Stage {round.number}</span>
            <strong>{round.name}</strong>
          </span>
          <span className="timeline-card-action">
            {round.date === "TBD"
              ? <span className="timeline-date">TBD</span>
              : <time>{round.date}</time>}
            <span className={expanded ? "timeline-card-chevron is-open" : "timeline-card-chevron"} aria-hidden="true" />
          </span>
        </button>
      </motion.div>

      {impacted && (
        <div className="timeline-dust" aria-hidden="true">
          {dustParticles.map((particle, particleIndex) => (
            <motion.span
              key={particleIndex}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size,
                height: particle.size,
                background: particle.color,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
              animate={{
                x: [0, particle.x * 0.68, particle.x],
                y: [0, particle.y, particle.y + particle.gravity],
                opacity: [0, particle.opacity, 0],
                scale: [0.2, particle.scale, 0.35],
                rotate: particle.rotation,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                times: [0, particle.peak, 1],
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
      <motion.div
        id={`timeline-details-${round.number}`}
        className="timeline-details"
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!expanded}
      >
        <div className="timeline-details-inner"><p>{round.details}</p></div>
      </motion.div>
    </motion.div>
  );
}

function TimelineSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const starRef = useRef(null);
  const cardRefs = useRef([]);
  const [revealedRounds, setRevealedRounds] = useState([]);
  const [impactedRound, setImpactedRound] = useState(null);
  const [openRound, setOpenRound] = useState(null);
  const [timelineFinished, setTimelineFinished] = useState(false);
  const [cloudsActive, setCloudsActive] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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
    let scrollFrame = null;
    let scrollStartedAt = 0;

    const stopAutoScroll = (event) => {
      if (event.type === "wheel" && event.deltaY > 0) return;
      if (performance.now() - scrollStartedAt < 300) return;
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = null;
    };

    const scrollWithStar = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const firstCard = cardRefs.current[0];
      const lastCard = cardRefs.current[cardRefs.current.length - 1];
      if (!firstCard || !lastCard) return;

      const startY = window.scrollY;
      const getEndY = () => {
        const firstTop = firstCard.getBoundingClientRect().top + window.scrollY;
        const lastBottom = lastCard.getBoundingClientRect().bottom + window.scrollY;
        const cardsHeight = lastBottom - firstTop;
        const target = cardsHeight > window.innerHeight - 32
          ? lastBottom - window.innerHeight + 16
          : firstTop - Math.max(16, (window.innerHeight - cardsHeight) / 2);
        return Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          Math.max(startY, target),
        );
      };
      if (getEndY() - startY < 12) return;

      scrollStartedAt = performance.now();
      const scrollDuration = 3000;
      const advanceScroll = (now) => {
        if (cancelled) return;
        const progress = Math.min((now - scrollStartedAt) / scrollDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const endY = getEndY();
        window.scrollTo(0, Math.max(window.scrollY, startY + (endY - startY) * eased));
        if (progress < 1) scrollFrame = window.requestAnimationFrame(advanceScroll);
        else scrollFrame = null;
      };

      scrollFrame = window.requestAnimationFrame(advanceScroll);
    };

    window.addEventListener("wheel", stopAutoScroll, { passive: true });
    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    window.addEventListener("keydown", stopAutoScroll);

    const getTarget = (index) => {
      const stageBox = stageRef.current.getBoundingClientRect();
      const starSize = starRef.current.getBoundingClientRect().width;
      const cardBox = cardRefs.current[index].getBoundingClientRect();
      return {
        x: cardBox.left - stageBox.left + cardBox.width * [0.27, 0.72, 0.36, 0.64][index] - starSize / 2,
        y: cardBox.top - stageBox.top - starSize + 5,
      };
    };

    const impactRound = async (index) => {
      if (cancelled) return;
      setImpactedRound(index);
      setRevealedRounds((current) => [...current, index]);
      if (index === 0) setOpenRound(0);
      await wait(index === 0 ? 380 : 80);
    };

    const runTimeline = async () => {
      await wait(500);             // auto scroll delay
      if (cancelled) return;

      const firstTarget = getTarget(0);
      const star = starRef.current;
      const startTransform = new DOMMatrixReadOnly(getComputedStyle(star).transform);
      const start = { x: startTransform.m41, y: startTransform.m42 };
      const firstDrift = randomBetween(-78, 74);
      const firstApproach = randomBetween(-48, 50);
      const firstSpin = randomBetween(28, 64) * (Math.random() > 0.5 ? 1 : -1);

      setCloudsActive(true);
      scrollWithStar();

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
          x: [start.x + 5, start.x + firstDrift, firstTarget.x + firstApproach, firstTarget.x],
          y: [start.y - 13, start.y - randomBetween(82, 142), firstTarget.y - randomBetween(54, 104), firstTarget.y + 8],
          rotate: [5, firstSpin * -0.45, firstSpin, -11],
          scaleX: [0.94, 0.88, 1.02, 0.91],
          scaleY: [1.08, 1.02, 0.86, 0.91],
        },
        { duration: 0.38, times: [0, 0.28, 0.72, 1], ease: [0.3, 0.03, 0.16, 1] }, // first flight
      );
      await impactRound(0);
      const firstReboundX = randomBetween(-31, 29);
      await animate(
        star,
        {
          x: [firstTarget.x, firstTarget.x + firstReboundX, firstTarget.x - firstReboundX * 0.3, firstTarget.x],
          y: [firstTarget.y + 8, firstTarget.y - randomBetween(34, 62), firstTarget.y - randomBetween(6, 17), firstTarget.y],
          rotate: [-9, randomBetween(-26, 27), randomBetween(-11, 12), 0],
        },
        { duration: 0.2, times: [0, 0.36, 0.72, 1], ease: "easeOut" },   //first rebound
      );

      for (let index = 1; index < cardRefs.current.length; index += 1) {
        if (cancelled) return;

        const previous = getTarget(index - 1);
        const target = getTarget(index);
        const direction = index % 2 ? 1 : -1;
        const reverseKick = randomBetween(18, 52);
        const midpoint = (previous.x + target.x) / 2 + direction * randomBetween(45, 155);
        const lateDrift = randomBetween(-62, 64);
        const apex = Math.min(previous.y, target.y) - randomBetween(116, 205);
        const spin = randomBetween(42, 94) * (Math.random() > 0.5 ? 1 : -1);
        const reboundX = randomBetween(17, 38) * (Math.random() > 0.5 ? 1 : -1);

        await animate(
          star,
          {
            x: [previous.x, previous.x - direction * reverseKick, midpoint, target.x + lateDrift, target.x],
            y: [previous.y, previous.y - randomBetween(25, 58), apex, target.y - randomBetween(42, 88), target.y + 9],
            rotate: [0, spin * -0.25, spin, spin * -0.38, direction * 6],
            scaleX: [0.88, 1.02, 0.84, 0.95, 0.88],
            scaleY: [0.88, 0.78, 0.94, 0.82, 0.88],
          },
          { duration: 0.4, times: [0, 0.15, 0.48, 0.82, 1], ease: [0.27, 0.03, 0.15, 1] },  // fligh between bricks
        );
        await impactRound(index);
        await animate(
          star,
          {
            x: [target.x, target.x + reboundX, target.x - reboundX * 0.35, target.x],
            y: [target.y + 9, target.y - randomBetween(38, 68), target.y - randomBetween(7, 19), target.y],
            rotate: [direction * 6, randomBetween(-32, 34), randomBetween(-12, 13), 0],
          },
          { duration: 0.2, times: [0, 0.38, 0.74, 1], ease: "easeOut" },    // impact rebounds
        );
      }
      if (!cancelled) setTimelineFinished(true);
    };

    runTimeline();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("wheel", stopAutoScroll);
      window.removeEventListener("touchstart", stopAutoScroll);
      window.removeEventListener("keydown", stopAutoScroll);
    };
  }, [isInView]);

  return (
    <section ref={sectionRef} id="timeline" className="timeline-section" aria-labelledby="timeline-title">
      <div className="timeline-glow" aria-hidden="true" />
      <span className="timeline-heading-sparkle timeline-heading-sparkle-left" aria-hidden="true">✦</span>
      <span className="timeline-heading-sparkle timeline-heading-sparkle-right" aria-hidden="true">✦</span>

      <div className="timeline-shell">
        <div className="timeline-heading">
          <p ref={eyebrowRef}>Level Select</p>
          <h2 id="timeline-title">Hackathon Timeline</h2>
          <span>Four stages. One adventure.</span>
        </div>

        <div ref={stageRef} className="timeline-stage">
          <div
            className={`timeline-stage-clouds ${cloudsActive ? "is-active" : ""}`}
            aria-hidden="true"
          >
            <span className="cloud timeline-bg-cloud timeline-bg-cloud-one" />
            <span className="cloud timeline-bg-cloud timeline-bg-cloud-two" />
            <span className="cloud timeline-bg-cloud timeline-bg-cloud-three" />
          </div>
          <div className="timeline-path" aria-hidden="true" />
          <TimelineStar starRef={starRef} />

          {rounds.map((round, index) => (
            <TimelineCard
              key={round.number}
              round={round}
              index={index}
              revealed={revealedRounds.includes(index)}
              impacted={impactedRound === index}
              expanded={openRound === index}
              canToggle={revealedRounds.includes(index) && (index === 0 || timelineFinished)}
              onToggle={() => setOpenRound((current) => current === index ? null : index)}
              cardRef={(element) => {
                cardRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </div>

      <TimelineScenery />
    </section>
  );
}

export default TimelineSection;
