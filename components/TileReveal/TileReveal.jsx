"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const getVideo = () => {
    const video = videoRef.current;
    if (!video) return null;
    // Keep every large video completely off the network until the visitor
    // explicitly interacts with its tile.
    if (!video.hasAttribute("src")) {
      video.src = src;
      video.load();
    }
    return video;
  };

  const handleMouseEnter = () => {
    if (window.matchMedia("(hover: none)").matches) return;
    const video = getVideo();
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
    const video = getVideo();
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
          data-src={src}
          muted
          loop
          playsInline
          preload="none"
          poster="/video_frame_preview.jpg"
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

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const tiles = gridRef.current?.querySelectorAll(".tile");
    if (!tiles || tiles.length === 0) return;

    // Keep mobile and reduced-motion experiences fully visible and static.
    const useStaticReveal = window.matchMedia(
      "(max-width: 768px), (prefers-reduced-motion: reduce)"
    ).matches;
    if (useStaticReveal) {
      if (progressRef.current) progressRef.current.textContent = "100 / 100";
      return;
    }

    let cancelled = false;
    let refreshTimer;
    let ctx;

    const loadScrollAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const getW = () => window.innerWidth;
        const getH = () => window.innerHeight;
        const entranceMultipliers = [
          { x: -0.65, y: -1.15 },
          { x: 0, y: -1.15 },
          { x: 0.65, y: -1.15 },
          { x: -0.65, y: 1.15 },
          { x: 0, y: 1.15 },
          { x: 0.65, y: 1.15 },
        ];

        tiles.forEach((tile, i) => {
          const m = entranceMultipliers[i] || { x: 0, y: 0 };
          gsap.set(tile, {
            x: m.x * getW(),
            y: m.y * getH(),
            scale: 0.85,
            opacity: 0,
          });
        });

        if (headlineRef.current) {
          gsap.set(headlineRef.current, { opacity: 0.35, scale: 0.94 });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
          onComplete: () => {
            if (progressRef.current) progressRef.current.textContent = "100 / 100";
          },
        });

        tiles.forEach((tile, i) => {
          timeline.to(
            tile,
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              duration: 0.7,
            },
            i * 0.045
          );
        });

        if (headlineRef.current) {
          timeline.to(
            headlineRef.current,
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              duration: 0.65,
            },
            0.12
          );
        }

        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
      }, section);
    };

    loadScrollAnimation().catch(() => {
      // The visible static layout remains available if the optional animation fails.
    });

    return () => {
      cancelled = true;
      clearTimeout(refreshTimer);
      if (ctx) ctx.revert();
    };
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
