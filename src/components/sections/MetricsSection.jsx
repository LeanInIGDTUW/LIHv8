import { motion } from "framer-motion";
import Pipe from "../objects/Pipe.jsx";

const metrics = [
  { value: "1200+", label: "Hackers", height: 220 },
  { value: "250+", label: "Teams", height: 310 },
  { value: "80+", label: "Prototypes", height: 220 },
];

const labelVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.16 + index * 0.14, duration: 0.42 },
  }),
};

const pipeVariants = {
  hidden: { y: "105%" },
  visible: (index) => ({
    y: 0,
    transition: {
      type: "spring",
      stiffness: 158,
      damping: 14,
      mass: 0.68,
      delay: index * 0.1,
    },
  }),
};

function seededRandom(seed) {
  let value = seed;

  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function makeCoinBurst(seed, count) {
  const random = seededRandom(seed);

  return Array.from({ length: count }, (_, index) => {
    const slot = count === 1 ? 0.5 : index / (count - 1);
    const direction = random() > 0.5 ? 1 : -1;

    return {
      x: -138 + slot * 276 + (random() - 0.5) * 22,
      arc: 94 + random() * 142,
      spin: direction * (560 + random() * 920),
      restY: -12 - random() * 9,
      tilt: -16 + random() * 32,
      launchDelay: random() * 0.105,
      duration: 0.72 + random() * 0.25,
      size: 0.78 + random() * 0.3,
      bounce: 6 + random() * 11,
    };
  });
}

const coinBursts = [
  makeCoinBurst(17, 7),
  makeCoinBurst(43, 9),
  makeCoinBurst(91, 6),
];

const coinVariants = {
  hidden: ({ height, size }) => ({
    x: 0,
    y: -height + 18,
    rotate: 0,
    scale: size * 0.32,
    scaleY: 1,
    opacity: 0,
  }),
  visible: ({
    height,
    pipeIndex,
    x,
    arc,
    spin,
    restY,
    tilt,
    launchDelay,
    duration,
    size,
    bounce,
  }) => {
    const startY = -height + 18;

    return {
      x: [0, x * 0.16, x * 0.58, x * 1.04, x * 0.985, x, x],
      y: [
        startY,
        startY - arc,
        startY - arc * 0.43,
        restY,
        restY - bounce,
        restY + 2,
        restY,
      ],
      rotate: [
        0,
        spin * 0.29,
        spin * 0.69,
        spin + tilt * 1.8,
        spin + tilt * 0.6,
        spin + tilt * 1.12,
        spin + tilt,
      ],
      scale: [size * 0.32, size * 1.1, size, size, size, size, size],
      scaleY: [1, 1, 1, 0.68, 0.82, 0.5, 0.48],
      opacity: [0, 1, 1, 1, 1, 1, 1],
      transition: {
        delay: 0.025 + pipeIndex * 0.1 + launchDelay,
        duration,
        ease: [0.18, 0.74, 0.2, 1],
        times: [0, 0.19, 0.43, 0.7, 0.8, 0.91, 1],
      },
    };
  },
};

function MetricCoins({ height, pipeIndex }) {
  return (
    <motion.div
      className="metric-coins-rise"
      custom={pipeIndex}
      variants={pipeVariants}
      aria-hidden="true"
    >
      <div className="metric-coins">
      {coinBursts[pipeIndex].map((coin, coinIndex) => (
        <motion.span
          key={coinIndex}
          className="metric-burst-coin"
          custom={{ ...coin, height, pipeIndex, coinIndex }}
          variants={coinVariants}
        >
          <i />
        </motion.span>
      ))}
      </div>
    </motion.div>
  );
}

function MetricPipe({ metric, index }) {
  return (
    <div className="metric-column">
      <motion.div
        className="metric-label"
        custom={index}
        variants={labelVariants}
      >
        <strong>{metric.value}</strong>
        <span>{metric.label}</span>
      </motion.div>

      <div className="metric-pipe-window">
        <motion.div
          className="metric-pipe-rise"
          custom={index}
          variants={pipeVariants}
        >
          <Pipe variant="metric" style={{ height: metric.height }} />
        </motion.div>
      </div>

      <MetricCoins height={metric.height} pipeIndex={index} />
    </div>
  );
}

function MetricsSection() {
  return (
    <section
      id="metrics"
      aria-labelledby="metrics-title"
      className="metrics-section"
    >
      <div className="metrics-sky" aria-hidden="true">
        <span className="metrics-sparkle sparkle-one">✦</span>
        <span className="metrics-sparkle sparkle-two">✦</span>
        <span className="metrics-sparkle sparkle-three">✦</span>
        <span className="cloud metrics-cloud metrics-cloud-left" />
        <span className="cloud metrics-cloud metrics-cloud-right" />
      </div>

      <div className="metrics-content">
        <motion.div
          className="metrics-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p>Previous Editions</p>
          <h2 id="metrics-title">Last year, by the numbers.</h2>
        </motion.div>

        <motion.div
          className="metrics-pipes"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {metrics.map((metric, index) => (
            <MetricPipe key={metric.label} metric={metric} index={index} />
          ))}
        </motion.div>
      </div>

      <div className="metrics-ground" aria-hidden="true">
        <span className="metrics-grass" />
        <span className="metrics-soil" />
      </div>
    </section>
  );
}

export default MetricsSection;
