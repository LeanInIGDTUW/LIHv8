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
      stiffness: 92,
      damping: 15,
      mass: 0.9,
      delay: index * 0.14,
    },
  }),
};

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
