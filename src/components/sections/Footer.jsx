
import { Instagram, Linkedin, Twitter } from "lucide-react";
import "./Footer.css";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/leanin.igdtuw/",
    Icon: Instagram,
  },
  {
    name: "X",
    href: "https://x.com/lean_in_igdtuw",
    Icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/lean-in-igdtuw/",
    Icon: Linkedin,
  },
];

function Footer() {
  return (
    <footer className="lih-footer" aria-labelledby="lih-footer-title">
      <div className="lih-footer-shell">
        <div className="lih-footer-main">
          <div className="lih-footer-brand">
            <a
              className="lih-footer-logo-link"
              href="https://www.linkedin.com/company/lean-in-igdtuw/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lean In IGDTUW on LinkedIn"
            >
              <img
                className="lih-footer-logo"
                src="/images/logos/image.png"
                alt=""
                width="56"
                height="56"
              />
            </a>

            <div>
              <h2 id="lih-footer-title">Lean In @ IGDTUW</h2>
              <p className="lih-footer-tagline">
                <strong>We rise by lifting others!</strong>
              </p>
            </div>

            <p className="lih-footer-intro">
              <strong>
                Lean In is one of IGDTUW&apos;s oldest technical societies,
                fostering technology, mentorship, sisterhood, and peer learning.
              </strong>
            </p>
          </div>

          <nav className="lih-footer-social" aria-label="Stay Connected">
            <h3>Follow us</h3>

            <ul>
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} (opens in a new tab)`}
                  >
                    <Icon
                      aria-hidden="true"
                      size={20}
                      strokeWidth={2}
                    />
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="lih-footer-contact">
              <h3>For Queries</h3>
              {/* <p>LeanIn IGDTUW</p> */}
              <a href="mailto:leaninginigdtuw@gmail.com">
                leaninginigdtuw@gmail.com
              </a>
            </div>
          </nav>
        </div>

        <div className="lih-footer-bottom">
          <p>
            <strong>
              © {new Date().getFullYear()} Lean In @ IGDTUW. All rights reserved.
            </strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
