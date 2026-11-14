"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const heroVisualRef = useRef(null);
  const loaderRef = useRef(null);
  const [currentText, setCurrentText] = useState("ಮೊಹಮ್ಮದ್ ಜೈನ್");

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.overflow = "hidden";

    // Initial hidden state for the hero image reveal.
    gsap.set(heroVisualRef.current, { autoAlpha: 0, scale: 1.05 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (loaderRef.current) {
          loaderRef.current.style.display = "none";
        }
      },
    });

    // Match the loader progress to its reveal duration.
    tl.fromTo(
      loaderRef.current?.querySelector(".loader-progress-fill"),
      { scaleX: 0 },
      { scaleX: 1, duration: 3.8, ease: "none" },
      "start"
    );

    // Loader slide up reveal
    tl.to(
      loaderRef.current,
      {
        y: "-100%",
        duration: 1.0,
        ease: "power3.inOut",
      },
      "start+=2.8"
    );

    // Hero image reveal (fade & scale down to 1)
    tl.to(
      heroVisualRef.current,
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      },
      "start+=2.9"
    );

    // Timeout-based interactive name transitions in different languages
    const t1 = setTimeout(() => setCurrentText("मोहम्मद ज़ैन"), 900);
    const t2 = setTimeout(() => setCurrentText("MOHAMMED ZAIN"), 1800);

    return () => {
      tl.kill();
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const target = document.getElementById("projects-section") || document.getElementById("about");
    if (target) {
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const target = document.getElementById("about");
    if (target) {
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Framer Motion reveal variants (triggered once loader is finished)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <>
      {/* Loader Overlay */}
      <div
        id="loader"
        ref={loaderRef}
        style={{
          backgroundColor: "#111111",
          zIndex: 2147483647,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex w-full max-w-[340px] flex-col items-center justify-center px-6 text-center"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.35em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-5 text-[9px] font-semibold uppercase text-white/45"
          >
            Personal Portfolio · 2026
          </motion.span>

          {/* Uploaded portrait — framed as the loader's main visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6 h-[190px] w-[174px] overflow-hidden rounded-[26px] border border-white/15 bg-[#24211e] shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:h-[218px] sm:w-[194px]"
          >
            <img
              src="/about-portrait.png"
              alt="Mohammed Zain"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[center_28%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
            <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10" />
          </motion.div>

          <div className="mb-2 flex h-10 w-full items-center justify-center overflow-hidden">
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="whitespace-nowrap text-[19px] font-bold uppercase tracking-[0.12em] text-[#F5F1EA] sm:text-[22px]"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              {currentText}
            </motion.div>
          </div>

          <span className="mb-5 text-[9px] font-medium uppercase tracking-[0.24em] text-white/40">
            Full-Stack Developer · AI Enthusiast
          </span>

          <div className="h-[2px] w-36 overflow-hidden rounded-full bg-white/15">
            <div className="loader-progress-fill h-full w-full origin-left scale-x-0 rounded-full bg-[#F5F1EA]" />
          </div>
          <span className="mt-3 text-[8px] font-medium uppercase tracking-[0.3em] text-white/35">
            Preparing experience
          </span>
        </motion.div>
      </div>

      {/* Hero Section Container */}
      <section
        id="hero-section"
        ref={sectionRef}
        className="relative w-full h-[100svh] min-h-[620px] lg:h-screen lg:min-h-[600px] overflow-hidden select-none transition-colors duration-300"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        {/* Static hero image — video playback removed */}
        <div
          ref={heroVisualRef}
          className="absolute inset-x-3 top-[76px] bottom-3 w-auto h-auto z-0 overflow-hidden bg-black rounded-[28px] border-[6px] border-[#242424] shadow-[0_16px_44px_rgba(0,0,0,0.28)] lg:inset-0 lg:w-full lg:h-full lg:rounded-none lg:border-0 lg:shadow-none"
        >
          <img
            src="/hero-section.png"
            alt="Mohammed Zain — portfolio hero"
            fetchPriority="high"
            decoding="async"
            className="hero-background-media absolute inset-0 w-full h-full object-cover object-[66%_28%] lg:object-[46%_center]"
          />

          {/* Mobile portrait-card gradient; desktop keeps its original left gradient. */}
          <div
            className="absolute inset-x-0 bottom-0 h-[76%] z-[1] pointer-events-none lg:hidden"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.76) 42%, rgba(0,0,0,0.16) 78%, transparent 100%)" }}
          />
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-7/12 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 35%, transparent 100%)",
              opacity: 0.88,
            }}
          />
        </div>

        {/* Content Corner Overlay - Vertically Centered in the Middle-Left */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 top-auto left-0 right-0 translate-y-0 z-[100000] lg:z-10 w-full max-w-none flex flex-col items-start text-left pointer-events-auto bg-transparent backdrop-blur-none px-5 pt-6 pb-14 lg:pb-0 rounded-b-[22px] border-0 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:left-[8vw] lg:right-auto lg:w-[min(680px,58vw)] lg:max-w-[680px] lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:rounded-none lg:border-none"
        >
          <motion.span
            variants={itemVariants}
            className="text-[9px] sm:text-xs font-semibold tracking-[0.22em] text-white/75 lg:text-fg-muted uppercase mb-2 lg:mb-3"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            HELLO, I&apos;M ZAIN
          </motion.span>
          
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center gap-2 mb-5 sm:mb-6"
          >
            <div className="w-10 h-px bg-fg/40" />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="w-full text-[clamp(1.25rem,6.8vw,1.9rem)] lg:text-[clamp(2.25rem,5.35vw,5.35rem)] font-extrabold uppercase leading-[0.94] lg:leading-[0.98] tracking-[-0.065em] text-white lg:text-fg mb-3 lg:mb-6"
            style={{ fontFamily: "'AeonikBold', 'Neue Montreal', 'Inter', sans-serif", textWrap: "balance" }}
          >
            <span className="block whitespace-nowrap">Full-Stack</span>
            <span className="block whitespace-nowrap">&amp; AI Enthusiast</span>
            <span className="mt-2 lg:mt-3 block text-[0.58rem] lg:text-[clamp(0.78rem,1.25vw,1.05rem)] font-semibold leading-tight tracking-[0.14em] lg:tracking-[0.2em] text-white/75 lg:text-fg-muted/80">FULL-STACK DEVELOPMENT · AI · TECHNICAL SEO</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[11px] sm:text-base text-white/80 lg:text-fg-muted leading-[1.5] lg:leading-[1.7] mb-4 lg:mb-8 max-w-[42ch] line-clamp-2 lg:line-clamp-none"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            I build thoughtful, scalable web experiences and integrate practical AI features into products using modern web technologies and LLM APIs.
          </motion.p>

          {/* View Work & Download CV Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 lg:gap-5"
          >
            <a
              href="#projects-section"
              onClick={handleScrollToWork}
              className="px-4 py-2.5 lg:px-6 lg:py-3 bg-white text-black lg:bg-fg lg:text-bg hover:bg-white/90 lg:hover:bg-fg/90 rounded-full flex items-center gap-2 text-[11px] lg:text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-sm"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              <span>View My Work</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>

            <a
              href="/Zain-Resume.pdf"
              download="Zain-Resume.pdf"
              className="text-[11px] lg:text-xs font-semibold text-white lg:text-fg hover:text-white/80 lg:hover:text-fg/80 flex items-center gap-1.5 pb-0.5 border-b border-current transition-all"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19 12 12 19 5 12"/>
              </svg>
            </a>
          </motion.div>

          {/* Social Links on Bottom-Left */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 sm:gap-5 mt-5 lg:mt-8 text-white/85 lg:text-fg/60"
          >
            <a href="https://github.com/mdzxin93" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:text-fg transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 lg:w-4 lg:h-4 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/mohammed-zain-j-437987293/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:text-fg transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 lg:w-4 lg:h-4 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://www.instagram.com/the_mohxmmed_zxin17/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:text-fg transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 lg:w-4 lg:h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/917975788275" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:text-fg transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 lg:w-4 lg:h-4 fill-current"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.468-2.423-1.495-.895-.798-1.5-1.785-1.676-2.086-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.677-1.633-.927-2.236-.244-.587-.493-.507-.677-.517-.176-.01-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.913 1.23 3.114c.15.2 2.123 3.243 5.143 4.545.719.31 1.28.496 1.717.635.722.23 1.379.197 1.899.12.579-.087 1.78-.728 2.031-1.431.25-.703.25-1.305.175-1.431-.075-.126-.276-.201-.577-.352zm-5.466 7.618h-.005a10.02 10.02 0 0 1-5.112-1.396l-.367-.218-3.799.996 1.014-3.702-.239-.38a10.028 10.028 0 0 1-1.536-5.32c0-5.539 4.507-10.045 10.05-10.045 2.684.001 5.207 1.047 7.106 2.946a10.007 10.007 0 0 1 2.945 7.105c-.002 5.54-4.508 10.046-10.046 10.046zm8.525-18.57A11.94 11.94 0 0 0 12.006 0C5.385 0 .003 5.382.003 12.003c0 2.112.551 4.174 1.6 5.993L0 24l6.173-1.619a11.97 11.97 0 0 0 5.833 1.508h.005c6.621 0 12.003-5.382 12.003-12.003a11.94 11.94 0 0 0-3.489-8.459z"/></svg>
            </a>
          </motion.div>
        </motion.div>

      </section>
    </>
  );
};

export default HeroSection;
