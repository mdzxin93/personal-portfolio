"use client";

import React, { useEffect, useRef } from "react";

const TEXT = "I Transform Ideas into Production-Ready Applications.";

const HorizontalScroll = () => {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let cancelled = false;
    let context;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        try {
          const [gsapModule, scrollTriggerModule] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);
          if (cancelled) return;

          const gsap = gsapModule.default;
          const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
          gsap.registerPlugin(ScrollTrigger);

          const sticky = stickyRef.current;
          const text = textRef.current;
          if (!sticky || !text) return;

          context = gsap.context(() => {
            const chars = text.querySelectorAll(".hs-char");

            const getPinDistance = () => {
              const textWidth = text.scrollWidth;
              const viewport = window.innerWidth;
              return Math.max(textWidth - viewport * 0.1, viewport);
            };

            const scrollTween = gsap.to(text, {
              xPercent: -110,
              ease: "none",
              scrollTrigger: {
                trigger: sticky,
                start: "top top",
                end: () => "+=" + getPinDistance(),
                scrub: 0.5,
                pin: sticky,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            chars.forEach((char) => {
              gsap.from(char, {
                yPercent: gsap.utils.random(-200, 200),
                rotation: gsap.utils.random(-20, 20),
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: char,
                  containerAnimation: scrollTween,
                  start: "left 100%",
                  end: "left 30%",
                  scrub: 1,
                },
              });
            });
          }, wrapper);
        } catch {
          // The heading remains visible and readable without the animation.
        }
      },
      { rootMargin: "900px 0px" }
    );

    observer.observe(wrapper);
    return () => {
      cancelled = true;
      observer.disconnect();
      if (context) context.revert();
    };
  }, []);

  // Split text into words and chars while preserving spaces
  const renderText = () => {
    return TEXT.split(" ").map((word, wi, arr) => (
      <span key={wi} className="hs-word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {word.split("").map((char, ci) => (
          <span key={ci} className="hs-char" style={{ display: "inline-block" }}>
            {char}
          </span>
        ))}
        {wi < arr.length - 1 && <span className="hs-char" style={{ display: "inline-block" }}>&nbsp;</span>}
      </span>
    ));
  };

  return (
    <section className="Horizontal" ref={wrapperRef}>
      <div className="hs-sticky" ref={stickyRef}>
        <h3 className="Horizontal__text heading-xl" ref={textRef}>
          {renderText()}
        </h3>
      </div>
    </section>
  );
};

export default HorizontalScroll;
