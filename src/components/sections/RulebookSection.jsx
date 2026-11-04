import { Download, FileText } from "lucide-react";
import "./RulebookSection.css";

function RulebookSection() {
  return (
    <section className="rulebook-section" aria-labelledby="rulebook-title">
      <div className="rulebook-card">
        <div className="rulebook-icon" aria-hidden="true">
          <FileText size={30} strokeWidth={2.2} />
        </div>

        <div className="rulebook-copy">
          <p className="rulebook-eyebrow">YOUR ADVENTURE GUIDE</p>
          <h2 id="rulebook-title">Rules &amp; Regulations</h2>
          <p className="rulebook-description">
            Your guide to taking part in Lean In Hacks 8.0. Download the
            rulebook for the full rules and regulations.
          </p>
        </div>

        <div className="rulebook-action">
          <a
            href="/LIH-8.0-Rules-and-Regulations.pdf"
            download="LIH 8.0 Rules and Regulations.pdf"
            onClick={() => {
              window.open(
                "/LIH-8.0-Rules-and-Regulations.pdf",
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            <Download size={18} aria-hidden="true" />
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}

export default RulebookSection;
