"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const loaderRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState("ಮೊಹಮ್ಮದ್ ಜೈನ್");

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.overflow = "hidden";

    // Initial hidden state setup for background video (slightly scaled up to ease in)
    gsap.set(videoContainerRef.current, { autoAlpha: 0, scale: 1.05 });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaderDone(true);
        document.body.style.overflow = "";
        if (loaderRef.current) {
          loaderRef.current.style.display = "none";
        }
      },
    });

    // Loader slide up reveal
    tl.to(
      loaderRef.current,
      {
        y: "-100%",
        duration: 1.0,
        ease: "power3.inOut",
        onStart: () => {
          setLoaderDone(true);
        },
      },
      "start+=2.8"
    );

    // Background video reveal (fade & scale down to 1)
    tl.to(
      videoContainerRef.current,
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

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // Unmute the video for audio playback
      videoRef.current.muted = false;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Unmuted playback failed, attempting muted:", err);
          videoRef.current.muted = true;
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch((e) => console.log("Video playback failed:", e));
        });
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
          zIndex: 100002,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center px-4"
        >
          {/* Logo Avatar */}
          <img
            src="/hero-image.png"
            alt="Mohammed Zain J"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 mb-6 object-cover object-top shadow-lg"
          />

          {/* Language Text Animating */}
          <div className="h-10 flex items-center justify-center overflow-hidden">
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#F5F1EA] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-widest uppercase"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              {currentText}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Hero Section Container */}
      <section
        id="hero-section"
        ref={sectionRef}
        className="relative w-full h-screen min-h-[600px] overflow-hidden select-none transition-colors duration-300"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        {/* Background Visual: Still Image by default, Video with audio when played */}
        <div
          ref={videoContainerRef}
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black cursor-pointer group"
          title={isPlaying ? "Click to pause video" : "Click to play video"}
        >
          {/* Default Still Image */}
          <img
            src="/hero-image.png"
            alt="Mohammed Zain"
            className={`hero-background-media absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {/* Video (plays in a continuous loop with audio until paused) */}
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            loop
            playsInline
            preload="auto"
            className={`hero-background-media absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Theme-aware smooth gradient on left to guarantee text readability */}
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
          animate={loaderDone ? "visible" : "hidden"}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-1/2 -translate-y-1/2 left-5 right-5 sm:left-10 sm:right-auto lg:left-[8vw] z-10 w-auto sm:w-[min(680px,58vw)] max-w-[680px] flex flex-col items-start text-left pointer-events-auto bg-bg/90 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-fg/10 lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-none"
        >
          <motion.span
            variants={itemVariants}
            className="text-[10px] sm:text-xs font-semibold tracking-[0.24em] text-fg-muted uppercase mb-3"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            HELLO, I&apos;M ZAIN
          </motion.span>
          
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-5 sm:mb-6"
          >
            <div className="w-10 h-px bg-fg/40" />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="w-full text-[clamp(2.25rem,5.35vw,5.35rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.065em] text-fg mb-5 sm:mb-6"
            style={{ fontFamily: "'AeonikBold', 'Neue Montreal', 'Inter', sans-serif", textWrap: "balance" }}
          >
            <span className="block whitespace-nowrap">Full-Stack</span>
            <span className="block whitespace-nowrap">&amp; AI Enthusiast</span>
            <span className="mt-3 block text-[clamp(0.78rem,1.25vw,1.05rem)] font-semibold leading-tight tracking-[0.2em] text-fg-muted/80">FULL-STACK DEVELOPMENT · AI · TECHNICAL SEO</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-fg-muted leading-[1.7] mb-7 sm:mb-8 max-w-[46ch]"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            I build thoughtful, scalable web experiences and integrate practical AI features into products using modern web technologies and LLM APIs.
          </motion.p>

          {/* View Work & Download CV Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
          >
            <a
              href="#projects-section"
              onClick={handleScrollToWork}
              className="px-6 py-3 bg-fg text-bg hover:bg-fg/90 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-sm"
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
              className="text-xs font-semibold hover:text-fg/80 flex items-center gap-1.5 pb-0.5 border-b border-current transition-all"
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
            className="flex items-center gap-5 mt-8 text-fg/60"
          >
            <a href="https://github.com/mdzxin93" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className="hover:text-fg transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/mohammed-zain-j-437987293/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" className="hover:text-fg transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://www.instagram.com/the_mohxmmed_zxin17/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram" className="hover:text-fg transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/917975788275" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp" className="hover:text-fg transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.468-2.423-1.495-.895-.798-1.5-1.785-1.676-2.086-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.677-1.633-.927-2.236-.244-.587-.493-.507-.677-.517-.176-.01-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.913 1.23 3.114c.15.2 2.123 3.243 5.143 4.545.719.31 1.28.496 1.717.635.722.23 1.379.197 1.899.12.579-.087 1.78-.728 2.031-1.431.25-.703.25-1.305.175-1.431-.075-.126-.276-.201-.577-.352zm-5.466 7.618h-.005a10.02 10.02 0 0 1-5.112-1.396l-.367-.218-3.799.996 1.014-3.702-.239-.38a10.028 10.028 0 0 1-1.536-5.32c0-5.539 4.507-10.045 10.05-10.045 2.684.001 5.207 1.047 7.106 2.946a10.007 10.007 0 0 1 2.945 7.105c-.002 5.54-4.508 10.046-10.046 10.046zm8.525-18.57A11.94 11.94 0 0 0 12.006 0C5.385 0 .003 5.382.003 12.003c0 2.112.551 4.174 1.6 5.993L0 24l6.173-1.619a11.97 11.97 0 0 0 5.833 1.508h.005c6.621 0 12.003-5.382 12.003-12.003a11.94 11.94 0 0 0-3.489-8.459z"/></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Small Play/Pause Button (Floating Bottom-Right) */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={loaderDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={togglePlay}
          className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 flex items-center gap-3 bg-bg/85 border border-fg/10 hover:border-fg/30 px-4 py-2.5 rounded-full text-fg hover:bg-fg hover:text-bg transition-all active:scale-95 shadow-md group cursor-pointer"
          style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
        >
          <span className="w-7 h-7 rounded-full bg-fg/10 group-hover:bg-bg/10 flex items-center justify-center transition-colors">
            {isPlaying ? (
              /* Pause Icon */
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              /* Play Icon */
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current translate-x-[1px]">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </span>
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase pr-2">
            {isPlaying ? "PAUSE VIDEO" : "PLAY VIDEO"}
          </span>
        </motion.button>
      </section>
    </>
  );
};

export default HeroSection;
