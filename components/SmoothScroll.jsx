"use client";

import { useEffect } from "react";
import "lenis/dist/lenis.css";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.innerWidth < 1024;

    // Keep touch devices on native scrolling. Load the desktop-only smooth
    // scrolling engine only when it can actually be used.
    if (isTouch) return;

    let cancelled = false;
    let lenis = null;
    let gsap = null;
    let ticker = null;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ])
      .then(([lenisModule, gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;

        const Lenis = lenisModule.default;
        gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          syncTouch: true,
          smoothTouch: true,
          touchMultiplier: 1.5,
        });

        window.__lenis = lenis;
        lenis.on("scroll", ScrollTrigger.update);

        ticker = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
      })
      .catch(() => {
        // Native scrolling remains available if the optional engine fails.
      });

    return () => {
      cancelled = true;
      if (ticker && gsap) gsap.ticker.remove(ticker);
      if (lenis) {
        lenis.destroy();
        if (window.__lenis === lenis) delete window.__lenis;
      }
    };
  }, []);

  return children;
};

export default SmoothScroll;
