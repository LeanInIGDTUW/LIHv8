import { useEffect } from "react";
import "./CustomCursor.css";

const interactiveSelector =
  "a, button, input, textarea, select, [role='button']";

function CustomCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const cursor = document.querySelector(".pixel-cursor");
    if (!cursor) return undefined;

    document.body.classList.add("pixel-cursor-enabled");

    const moveCursor = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const handleMouseOver = (event) => {
      const target = event.target;
      cursor.classList.toggle(
        "hovering",
        target instanceof Element && target.closest(interactiveSelector) !== null,
      );
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("pixel-cursor-enabled");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="pixel-cursor" aria-hidden="true">
      <svg
        width="20"
        height="24"
        viewBox="0 0 16 20"
        shapeRendering="crispEdges"
      >
        <path
          d="M1 1H4V3H6V5H8V7H10V9H12V11H14V13H10V14H9V16H8V18H7V19H5V17H4V15H3V13H2V15H1Z"
          fill="#fff"
          stroke="#111"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

export default CustomCursor;
