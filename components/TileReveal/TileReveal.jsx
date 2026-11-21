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

const VideoTile = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let loaded = false;
    const startPreview = () => {
      if (!loaded) {
        video.src = src;
        video.load();
        loaded = true;
      }
      video.play().catch(() => {});
    };
    const stopPreview = () => video.pause();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startPreview();
      else stopPreview();
    }, { threshold: 0.15, rootMargin: "120px" });

    observer.observe(video);
    return () => {
      observer.disconnect();
      stopPreview();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <div className="tile">
      <div className="tile-inner">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          className="tile-video"
          aria-label="Silent looping video preview"
        />
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
