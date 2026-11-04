import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./GuidelinesSection.css";

const guidelines = [
  { number: "01", title: "Team size", description: "1–4 members" },
  { number: "02", title: "Registration fee", description: "Absolutely free" },
  { number: "03", title: "Hackathon mode", description: "Hybrid" },
  { number: "04", title: "Team Composition", description: "Every team must have at least one female member" },
];

const faqs = [
  {
    question: "Who can participate in Lean In Hacks 8.0?",
    answer: "Students currently enrolled in a university program, from any year, course, or specialization, can participate.",
  },
  {
    question: "What are the team requirements?",
    answer: "Teams must have 1–4 members, with at least one female member. Inter-college and inter-specialization teams are allowed.",
  },
  {
    question: "Can beginners participate?",
    answer: "Absolutely! The dedicated Beginner’s Track is designed for first-year students and follows an ideathon format. A prototype or UI/UX design is sufficient; a complete technical implementation isn't required.",
  },
  {
    question: "When will the tracks and problem statements be released?",
    answer: "They will be announced soon. Stay tuned for updates!",
  },
  {
    question: "Where will the hackathon take place?",
    answer: "The hackathon will be conducted in hybrid mode. The finale will be hosted onsite, with a virtual connection available for participants who cannot attend in person.",
  },
  {
    question: "Can I participate if I’m based outside Delhi?",
    answer: "Absolutely. If you cannot travel for the onsite finale, we’ll connect you virtually to the venue so you can present and take part remotely. Your location should not hold you back.",
  },
  {
    question: "Where will announcements and updates be shared?",
    answer: (
      <>
        Our Discord server is the primary communication channel.{" "}
        <a href="https://discord.gg/W3esvKJf3" target="_blank" rel="noopener noreferrer">
          Join it
        </a>{" "}
        for announcements, deadlines, schedules, and important event updates.
      </>
    ),
  },
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
