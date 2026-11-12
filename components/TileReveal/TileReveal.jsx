"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TileReveal.css";

const DEFAULT_VIDEOS = [
  "/5302277_Vertical_Video_Vertical_Content_720x1280.mp4",
  "/6308879_Vertical_Video_Vertical_Content_720x1280.mp4",
  "/10619138-uhd_2160_4096_25fps.mp4",
  "/12155762_1080_1920_60fps.mp4",
  "/14547644_1080_1920_30fps.mp4",
  "/15410984_2160_3840_60fps%20(1).mp4",
];

const VideoTile = ({ src, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(true);
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Handled cleanly if rapid pointer movement triggers interruption
      });
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(false);
    video.pause();
  };

  const handleTouch = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setIsPlaying(true);
      video.play().catch(() => {});
    } else {
      setIsPlaying(false);
      video.pause();
    }
  };

  const handleLoadedMetadata = (e) => {
    if (e.target.currentTime === 0) {
      try {
        e.target.currentTime = 0.05;
      } catch (_) {}
    }
  };

  return (
    <div className="tile">
      <div
        className={`tile-inner ${isPlaying ? "tile-inner--playing" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTouch}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          className="tile-video"
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div
          className={`tile-play-indicator ${
            isPlaying ? "tile-play-indicator--hidden" : ""
          }`}
          aria-hidden="true"
        >
          <div className="tile-play-btn">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>

        {isPlaying && (
          <div className="tile-badge-playing" aria-hidden="true">
            <span className="tile-badge-dot" />
            <span>PLAYING</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TileReveal({
  videos = DEFAULT_VIDEOS,
  images,
  title = (
    <>
      A Thousand Edits, A Million Ideas,
      <br />
      One Evolving Journey
    </>
  ),
  scrollDistance = "250%",
}) {
  const tileSources = videos || images || DEFAULT_VIDEOS;
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const progressRef = useRef(null);
  const gridRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const tiles = gridRef.current?.querySelectorAll(".tile");
    if (!tiles || tiles.length === 0) return;

    const ctx = gsap.context(() => {
      const getW = () => window.innerWidth;
      const getH = () => window.innerHeight;

      // Trajectories for 6 tiles (col: 0, 1, 2; row: 0, 1)
      const entranceMultipliers = [
        { x: -0.65, y: -1.15 }, // top-left
        { x: 0,     y: -1.15 }, // top-center
        { x: 0.65,  y: -1.15 }, // top-right
        { x: -0.65, y: 1.15 },  // bottom-left
        { x: 0,     y: 1.15 },  // bottom-center
        { x: 0.65,  y: 1.15 },  // bottom-right
      ];

      const exitMultipliers = [
        { x: -1.6, y: -1.3 }, // top-left
        { x: 0,    y: -1.3 }, // top-center
        { x: 1.6,  y: -1.3 }, // top-right
        { x: -1.6, y: 1.3 },  // bottom-left
        { x: 0,    y: 1.3 },  // bottom-center
        { x: 1.6,  y: 1.3 },  // bottom-right
      ];

      // Set initial off-screen states
      tiles.forEach((tile, i) => {
        const m = entranceMultipliers[i];
        gsap.set(tile, {
          x: () => m.x * getW(),
          y: () => m.y * getH(),
          scale: 0.85,
          opacity: 0,
        });
      });

      if (headlineRef.current) {
        gsap.set(headlineRef.current, {
          opacity: 0.35,
          scale: 0.94,
        });
      }

      // Master ScrollTrigger timeline pinned with pinSpacing: true
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 2.8)}`,
          pin: sticky,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              const val = Math.round(self.progress * 100);
              progressRef.current.textContent = `${String(val).padStart(2, "0")} / 100`;
            }
          },
        },
      });

      // --- PHASE 1: ENTRANCE (timeline 0.00 -> 0.28) ---
      // Tiles fly in from outside the screen to assemble the 3x2 grid
      tiles.forEach((tile, i) => {
        tl.to(
          tile,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 0.28,
          },
          i * 0.015
        );
      });

      if (headlineRef.current) {
        tl.to(
          headlineRef.current,
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 0.28,
          },
          0
        );
      }

      // --- PHASE 2: HOLD / FULLY LOADED & SETTLED STATE (timeline 0.28 -> 0.66) ---
      // SECTION IS COMPLETELY LOADED ON SCROLLING:
      // All 6 tiles and headline stay 100% visible, settled, and rock-solid
      // while the user scrolls through this hold window.
      tl.to({}, { duration: 0.38 });

      // --- PHASE 3: EXIT BLAST (timeline 0.66 -> 0.93) ---
      // Tiles scale up and blast outwards, clearing the screen
      tiles.forEach((tile, i) => {
        const m = exitMultipliers[i];
        tl.to(
          tile,
          {
            x: () => m.x * getW(),
            y: () => m.y * getH(),
            scale: 2.35,
            opacity: 0,
            ease: "power2.in",
            duration: 0.27,
          },
          0.66 + i * 0.01
        );
      });

      if (headlineRef.current) {
        tl.to(
          headlineRef.current,
          {
            opacity: 0,
            scale: 1.04,
            ease: "power2.in",
            duration: 0.16,
          },
          0.82
        );
      }

      // --- PHASE 4: CLEARANCE BUFFER (timeline 0.93 -> 1.00) ---
      // Screen is 100% clear before unpinning to smoothly transition to next section
      tl.to({}, { duration: 0.07 });

      // Refresh ScrollTrigger after initial mount and layout calculations
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => clearTimeout(refreshTimer);
    }, section);

    return () => ctx.revert();
  }, [scrollDistance]);

  return (
    <section
      ref={sectionRef}
      className="reveal-scroll"
      aria-label="Animated tile reveal"
    >
      <div ref={stickyRef} className="reveal-sticky">
        <div ref={gridRef} className="tile-grid">
          {tileSources.slice(0, 6).map((src, i) => (
            <VideoTile key={src || i} src={src} index={i} />
          ))}
        </div>

        <div ref={headlineRef} className="reveal-center">
          <h1>{title}</h1>
        </div>

        <span className="bottom-note">
          SCROLL TO EXPLORE <span className="arrow">↓</span>
        </span>
        <span ref={progressRef} className="bottom-progress">
          00 / 100
        </span>
      </div>
    </section>
  );
}
