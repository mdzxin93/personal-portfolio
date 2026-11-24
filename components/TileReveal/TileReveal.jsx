"use client";

import React, { useEffect, useRef, useState } from "react";
import "./TileReveal.css";

const DEFAULT_VIDEOS = [
  {
    src: "/videos/thousand-edits/01-whatsapp-2026-11-21-17-52-13.mp4",
    poster: "/videos/thousand-edits/posters/01-whatsapp-2026-11-21-17-52-13.jpg",
  },
  {
    src: "/videos/thousand-edits/02-whatsapp-2026-11-21-17-38-21.mp4",
    poster: "/videos/thousand-edits/posters/02-whatsapp-2026-11-21-17-38-21.jpg",
  },
  {
    src: "/videos/thousand-edits/03-whatsapp-2026-11-21-17-45-44.mp4",
    poster: "/videos/thousand-edits/posters/03-whatsapp-2026-11-21-17-45-44.jpg",
  },
  {
    src: "/videos/thousand-edits/04-whatsapp-2026-11-18-16-47-00.mp4",
    poster: "/videos/thousand-edits/posters/04-whatsapp-2026-11-18-16-47-00.jpg",
  },
  {
    src: "/videos/thousand-edits/05-accessaries-1.mp4",
    poster: "/videos/thousand-edits/posters/05-accessaries-1.jpg",
  },
  {
    src: "/videos/thousand-edits/06-outfut-4.mp4",
    poster: "/videos/thousand-edits/posters/06-outfut-4.jpg",
  },
];

const getVideoSrc = (item) => (typeof item === "string" ? item : item?.src);
const getVideoPoster = (item) => (typeof item === "string" ? undefined : item?.poster);

const VideoTile = ({ src, poster, index = 0, canLoad = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !canLoad) return;

    let loaded = false;
    let loadTimer;
    let cancelled = false;

    const startPreview = () => {
      if (cancelled) return;
      if (loaded) {
        video.play().catch(() => {});
        return;
      }
      loadTimer = window.setTimeout(() => {
        if (cancelled || loaded) return;
        video.src = src;
        video.preload = "metadata";
        video.load();
        loaded = true;
        video.play().catch(() => {});
      }, Math.min(index, 5) * 180);
    };

    const stopPreview = () => {
      if (loadTimer) {
        window.clearTimeout(loadTimer);
        loadTimer = undefined;
      }
      video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startPreview();
        else stopPreview();
      },
      { threshold: 0.15, rootMargin: "0px" }
    );

    observer.observe(video);
    return () => {
      cancelled = true;
      observer.disconnect();
      stopPreview();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src, index, canLoad]);

  return (
    <div className="tile">
      <div className="tile-inner">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          disablePictureInPicture
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
  const [canLoadVideos, setCanLoadVideos] = useState(false);
  const [isStatic, setIsStatic] = useState(false);

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
      setIsStatic(true);
      setCanLoadVideos(true);
      if (progressRef.current) progressRef.current.textContent = "100 / 100";
      return;
    }

    let cancelled = false;
    let ctx;

    const loadScrollAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const entranceMultipliers = [
          { x: -70, y: -120 },
          { x: 0, y: -120 },
          { x: 70, y: -120 },
          { x: -70, y: 120 },
          { x: 0, y: 120 },
          { x: 70, y: 120 },
        ];

        gsap.set(tiles, {
          opacity: 0,
          scale: 0.9,
          xPercent: (i) => (entranceMultipliers[i] || { x: 0 }).x,
          yPercent: (i) => (entranceMultipliers[i] || { y: 0 }).y,
          force3D: true,
        });

        if (headlineRef.current) {
          gsap.set(headlineRef.current, {
            opacity: 0.2,
            scale: 0.96,
            yPercent: 8,
            force3D: true,
          });
        }

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out", force3D: true },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
          onComplete: () => {
            if (progressRef.current) progressRef.current.textContent = "100 / 100";
            setCanLoadVideos(true);
            gsap.set([tiles, headlineRef.current].filter(Boolean), {
              clearProps: "willChange",
            });
          },
        });

        timeline.to(
          tiles,
          {
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: "power3.out",
          },
          0
        );

        if (headlineRef.current) {
          timeline.to(
            headlineRef.current,
            {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            0.1
          );
        }
      }, section);
    };

    loadScrollAnimation().catch(() => {
      // The visible static layout remains available if the optional animation fails.
      setCanLoadVideos(true);
      setIsStatic(true);
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [scrollDistance]);

  return (
    <section
      ref={sectionRef}
      className={`reveal-scroll${isStatic ? " is-static" : ""}`}
      aria-label="Animated tile reveal"
    >
      <div ref={stickyRef} className="reveal-sticky">
        <div ref={gridRef} className="tile-grid">
          {tileSources.slice(0, 6).map((item, i) => {
            const src = getVideoSrc(item);
            const poster = getVideoPoster(item);
            return (
              <VideoTile
                key={src || i}
                src={src}
                poster={poster}
                index={i}
                canLoad={canLoadVideos}
              />
            );
          })}
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
