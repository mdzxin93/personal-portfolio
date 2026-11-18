"use client";

import { useEffect, useRef } from "react";
import GradualBlur from "@/components/GradualBlur/GradualBlur";

export default function BlurController() {
  const blurRef = useRef(null);

  useEffect(() => {
    const blur = blurRef.current;
    const footer = document.getElementById("main-footer");
    if (!blur || !footer) return;

    let footerInView = false;
    const updateBlurState = () => {
      blur.style.opacity = window.scrollY >= 20 && !footerInView ? "1" : "0";
    };

    const footerObserver = new IntersectionObserver(([entry]) => {
      footerInView = entry.isIntersecting;
      updateBlurState();
    });

    footerObserver.observe(footer);
    window.addEventListener("scroll", updateBlurState, { passive: true });
    updateBlurState();

    return () => {
      footerObserver.disconnect();
      window.removeEventListener("scroll", updateBlurState);
    };
  }, []);

  return (
    <div
      ref={blurRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        transition: "opacity 300ms ease",
      }}
    >
      <GradualBlur
        target="parent"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={6}
        curve="bezier"
        exponential={false}
        opacity={0.9}
        zIndex={1}
      />
    </div>
  );
}
