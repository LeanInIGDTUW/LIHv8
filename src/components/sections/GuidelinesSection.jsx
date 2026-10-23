import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./GuidelinesSection.css";

const guidelines = [
  { number: "01", title: "Who can participate?", description: "Hackers from any college can join." },
  { number: "02", title: "Team requirement", description: "Each team needs at least 1 female member." },
  { number: "03", title: "Hackathon format", description: "The hackathon will be conducted in hybrid mode." },
  { number: "04", title: "Build phase", description: "Teams build their product online over the weekend." },
  { number: "05", title: "Final pitch", description: "Top teams pitch their projects offline." },
];

const faqs = [
  { question: "How do I register?", answer: "Registration steps and dates will be added here soon." },
  { question: "Is there a participation fee?", answer: "The official fee information will be confirmed here." },
  { question: "Can teammates be from different colleges?", answer: "Cross-college team rules will be shared here soon." },
  { question: "What will our team need to submit?", answer: "Submission requirements and deadlines will be added here." },
  { question: "What happens during the online build phase?", answer: "The detailed schedule and check-in process will be posted here." },
  { question: "Where will the finale take place?", answer: "Venue and travel information will be announced here." },
];

function GuidelinesSection() {
  const [openFaq, setOpenFaq] = useState(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="guidelines" className="guidelines-section" aria-labelledby="guidelines-title">
      <div className="guidelines-atmosphere" aria-hidden="true">
        <div className="guidelines-glow" />
        <div className="cloud cloud-one opacity-80" />
        <div className="cloud cloud-two opacity-70" />
        <div className="cloud cloud-three opacity-60" />
      </div>

      <div className="guidelines-shell">
        <header className="guidelines-heading">
          <p>How the Game Works</p>
          <h2 id="guidelines-title">Guidelines and FAQs</h2>
        </header>

        <div className="guidelines-grid">
          {guidelines.map((item) => (
            <article className="guideline-card" key={item.number}>
              <span className="guideline-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className="guidelines-faq-layout">
          <div className="guidelines-faq-list" aria-label="Frequently asked questions">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="guidelines-faq" key={faq.question}>
                  <button
                    className="guidelines-faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`guidelines-faq-answer-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="guidelines-faq-toggle" aria-hidden="true" />
                  </button>
                  <motion.div
                    id={`guidelines-faq-answer-${index}`}
                    className="guidelines-faq-answer"
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden={!isOpen}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <img className="guidelines-mario" src="/images/characters/mario.png" alt="" aria-hidden="true" />

      <div className="guidelines-ground" aria-hidden="true">
        <div className="guidelines-ground-soil" />
        <div className="guidelines-ground-grass" />
      </div>
    </section>
  );
}

export default GuidelinesSection;
