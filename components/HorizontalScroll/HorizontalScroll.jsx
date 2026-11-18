"use client";

import React, { useEffect, useRef } from "react";

const TEXT = "I Transform Ideas into Production-Ready Applications.";

const HorizontalScroll = () => {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const evidenceSection = document.getElementById("impact");
    if (!wrapper || !evidenceSection) return;

    let cancelled = false;
    let initialized = false;
    let context;

    const initializeAnimation = async () => {
      if (initialized || cancelled) return;
      initialized = true;

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

          const scrollTween = gsap.to(text, {
            xPercent: -110,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
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

          ScrollTrigger.refresh();
        }, wrapper);
      } catch {
        // Keep the complete headline readable if the optional animation fails.
      }
    };

    // Defer the headline animation until the complete “Evidence over empty
    // numbers” section has passed the middle of the viewport. This keeps the
    // headline from appearing or animating while the evidence cards are being read.
    const hasPassedReadingPoint = () =>
      evidenceSection.getBoundingClientRect().bottom <= window.innerHeight * 0.5;

    if (hasPassedReadingPoint()) {
      initializeAnimation();
    } else {
      const gateObserver = new IntersectionObserver(
        ([entry]) => {
          if (hasPassedReadingPoint()) {
            gateObserver.disconnect();
            initializeAnimation();
          }
        },
        { rootMargin: "0px 0px -50% 0px", threshold: 0 }
      );

      gateObserver.observe(evidenceSection);

      return () => {
        cancelled = true;
        gateObserver.disconnect();
        if (context) context.revert();
      };
    }

    return () => {
      cancelled = true;
      if (context) context.revert();
    };
  }, []);

  const renderText = () =>
    TEXT.split(" ").map((word, wordIndex, words) => (
      <span
        key={wordIndex}
        className="hs-word"
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
      >
        {word.split("").map((char, charIndex) => (
          <span
            key={charIndex}
            className="hs-char"
            style={{ display: "inline-block" }}
          >
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && (
          <span className="hs-char" style={{ display: "inline-block" }}>
            &nbsp;
          </span>
        )}
      </span>
    ));

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
