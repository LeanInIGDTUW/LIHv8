import { useEffect, useRef } from "react";

function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    const interactiveSelector = 'a, button, [role="button"], img';

    const handlePointerMove = (event) => {
      cursor.style.opacity = "1";
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const handlePointerDown = () => {
      cursor.classList.add("is-clicking");
    };

    const handlePointerUp = () => {
      cursor.classList.remove("is-clicking");
    };

    const handleHover = (event) => {
      const target = event.target.closest(interactiveSelector);
      cursor.classList.toggle("is-hovering", Boolean(target));
    };

    const handleLeave = () => {
      cursor.classList.remove("is-hovering");
    };

    const syncInteractiveElements = () => {
      document.querySelectorAll(interactiveSelector).forEach((element) => {
        element.onpointerenter = handleHover;
        element.onpointerleave = handleLeave;
      });
    };

    document.body.style.cursor = "none";
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    syncInteractiveElements();

    const observer = new MutationObserver(() => {
      syncInteractiveElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      observer.disconnect();
      document.body.style.cursor = "";
      cursor.classList.remove("is-hovering", "is-clicking");
      cursor.style.opacity = "0";
    };
  }, []);

  return <div ref={cursorRef} className="pixel-cursor" aria-hidden="true" />;
}

export default Cursor;
