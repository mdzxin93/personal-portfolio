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
          const words = text.querySelectorAll(".hs-word");

          // Reset to the true beginning so the reveal always starts at “I”.
          gsap.set(text, { x: 0 });

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

          // Reveal complete words in reading order: “I” is always first.
          words.forEach((word) => {
            gsap.from(word, {
              yPercent: gsap.utils.random(-120, 120),
              rotation: gsap.utils.random(-10, 10),
              opacity: 0,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: word,
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

    // Keep the headline hidden until the entire “Evidence over empty numbers”
    // section has cleared the top edge of the viewport. It can enter only after
    // the metrics section has fully moved out of view.
    const hasPassedReadingPoint = () =>
      evidenceSection.getBoundingClientRect().bottom <= 0;

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
        { rootMargin: "0px", threshold: 0 }
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
