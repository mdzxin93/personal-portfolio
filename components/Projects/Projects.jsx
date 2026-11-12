"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TileReveal from "@/components/TileReveal/TileReveal";

const PROJECTS = [
  {
    number: "01",
    name: "Aspire Digital Solutions",
    href: "https://aspiredigitalsolutions.in",
    role: "Digital Marketing & Web Development",
    kind: "LIVE WEBSITE",
    note: "Agency website presenting digital marketing, web development, and growth services.",
    image: "/images/aspire-sites/aspire-digital-solutions.png",
  },
  {
    number: "02",
    name: "Bhakti Yogshala",
    href: "https://bhaktiyogshala.com",
    role: "Yoga & Wellness",
    kind: "LIVE WEBSITE",
    note: "Yoga and wellness website with class, practice, and programme information.",
    image: "/images/aspire-sites/bhakti-yogshala.png",
  },
  {
    number: "03",
    name: "Bharat Appliance Services",
    href: "https://bharatapplainceservices.com",
    role: "Appliance Repair & Services",
    kind: "LIVE WEBSITE",
    note: "Service website for appliance support, repair offerings, and customer enquiries.",
    image: "/images/aspire-sites/bharat-appliance-services.png",
  },
  {
    number: "04",
    name: "SkinoCare",
    href: "https://skinocareapp.com",
    role: "Skincare & Digital Health",
    kind: "LIVE WEBSITE",
    note: "Skincare-focused digital platform presenting its services and user experience.",
    image: "/images/aspire-sites/skinocare.png",
  },
  {
    number: "05",
    name: "Nourish With Relma",
    href: "https://nourishwithrelma.com",
    role: "Nutrition & Wellness",
    kind: "LIVE WEBSITE",
    note: "Nutrition and wellness website sharing guidance, services, and brand information.",
    image: "/images/aspire-sites/nourish-with-relma.png",
  },
  {
    number: "06",
    name: "Shefa Hospital",
    href: "https://shefahospital.sa/",
    role: "Healthcare",
    kind: "LIVE WEBSITE",
    note: "Multispecialty hospital website highlighting specialist care, emergency services, and patient appointments.",
    image: "/images/aspire-sites/shefa-hospital.png",
  },
  {
    number: "07",
    name: "Euderm",
    href: "https://euderm.com",
    role: "Dermatology & Skincare",
    kind: "LIVE WEBSITE",
    note: "Skincare and dermatology website presenting products, services, and brand information.",
    image: "/images/aspire-sites/euderm.png",
  },
  {
    number: "08",
    name: "AA DESIGNO",
    href: "https://aadesigno.com/",
    role: "Commercial Interior Design",
    kind: "LIVE WEBSITE",
    note: "Commercial interior design studio showcasing workplace spaces, projects, and consultation services.",
    image: "/images/aspire-sites/aa-designo.png",
  },
  {
    number: "09",
    name: "Service Centre India",
    href: "https://servicecentreindia.com",
    role: "Service & Support",
    kind: "LIVE WEBSITE",
    note: "Customer-facing service website with support and service information.",
    image: "/images/aspire-sites/service-centre-india.png",
  },
  {
    number: "10",
    name: "Aspire Appliance Services",
    href: "https://aspireapplianceservices.in",
    role: "Appliance Repair & Services",
    kind: "LIVE WEBSITE",
    note: "Appliance service website presenting repair support and customer contact information.",
    image: "/images/aspire-sites/aspire-appliance-services.png",
  },
];

const VENTURES = [
  {
    name: "AutoEditor",
    role: "AI Video Editing · Reference-Driven Workflows",
    href: "https://github.com/mdzxin93/autoeditor",
    kind: "05 / AI VIDEO PRODUCTION",
    note: "Turns raw footage and a reference video into styled edits with cuts, zooms, captions, B-roll, and storyboards.",
    image: "/images/projects/autoeditor-project.png",
  },
  {
    name: "Titan Watches Voice Analysis",
    role: "WhatsApp Business · Voice AI",
    href: "https://github.com/mdzxin93/titan-watches-voice-analysis",
    kind: "06 / BUSINESS AUTOMATION",
    note: "A local watch-store workspace with a product storefront, customer inbox, order tracking, and Whisper-powered voice-note transcription.",
    image: "/images/projects/titan-watches-voice-analysis.png",
  },
];

const SolutionsAccordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="solutions-accordion" aria-label="Products and solutions">
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <article
            key={item.name}
            className={`solution-panel${isActive ? " solution-panel--active" : ""}`}
            style={{ "--solution-image": `url("${item.image}")` }}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveIndex(index);
              }
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                setActiveIndex((index + 1) % items.length);
              }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                setActiveIndex((index - 1 + items.length) % items.length);
              }
            }}
          >
            <img className="solution-panel__image" src={item.image} alt="" aria-hidden="true" />
            <span className="solution-panel__shade" aria-hidden="true" />
            <span className="solution-panel__topline">
              <span>{item.kind}</span>
              <span className="solution-panel__index">{String(index + 1).padStart(2, "0")}</span>
            </span>
            <span className="solution-panel__content">
              <span className="solution-panel__role">{item.role}</span>
              <span className="solution-panel__name">{item.name}</span>
              {isActive && (
                <span className="solution-panel__details">
                  <span className="solution-panel__note">{item.note}</span>
                  {item.href && (
                    <a
                      className="solution-panel__cta"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Explore <ArrowIcon />
                    </a>
                  )}
                </span>
              )}
            </span>
            <span className="solution-panel__expand" aria-hidden="true">{isActive ? "−" : "+"}</span>
          </article>
        );
      })}
    </div>
  );
};

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const Row = ({ item, index }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <li className="pj-row">
      <Wrapper
        className={`pj-link${hasLink ? "" : " pj-link--static"}`}
        {...wrapperProps}
      >
        <span className="pj-num">{item.number || String(index + 1).padStart(2, "0")}</span>
        {item.image ? (
          <img
            src={item.image}
            alt={`${item.name} website preview`}
            loading="lazy"
            className="project-preview w-24 h-16 sm:w-40 sm:h-24 object-cover object-top bg-white/5 rounded-xl border border-white/10 shrink-0"
          />
        ) : (
          <span className="project-preview-placeholder w-24 h-16 sm:w-40 sm:h-24 rounded-xl border border-white/10 shrink-0" aria-label="Website preview unavailable">
            {item.name.split(" ").map((part) => part[0]).join("").slice(0, 3).toUpperCase()}
          </span>
        )}
        <div className="pj-meta">
          <span className="pj-name">{item.name}</span>
          {item.role && <span className="pj-role">{item.role}</span>}
          {item.note && <span className="pj-note">{item.note}</span>}
        </div>
        <span className="pj-kind">{item.kind}</span>
        <span className="pj-arrow" aria-hidden="true">
          {hasLink ? <ArrowIcon /> : <span className="pj-dot">·</span>}
        </span>
      </Wrapper>
    </li>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const venturesRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        const rows = sectionRef.current.querySelectorAll(".pj-row");
        gsap.from(rows, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        const titles = sectionRef.current.querySelectorAll(".pj-title");
        gsap.from(titles, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      if (venturesRef.current) {
        const vRows = venturesRef.current.querySelectorAll(".pj-row");
        gsap.from(vRows, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: venturesRef.current,
            start: "top 80%",
            once: true,
          },
        });

        const vTitles = venturesRef.current.querySelectorAll(".pj-title");
        gsap.from(vTitles, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: venturesRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="projects-section" ref={sectionRef}>
        <div className="pj-head">
          <span className="pj-label">ASPIRE DIGITAL SOLUTIONS — 10 SELECTED WEBSITES</span>
          <h2 className="pj-title">website portfolio</h2>
        </div>

        <ul className="pj-list">
          {PROJECTS.map((p, i) => (
            <Row key={p.name} item={p} index={i} />
          ))}
        </ul>
      </section>

      {/* Animated Tile Reveal Section */}
      <TileReveal />

      <section id="ventures" className="pj-section" ref={venturesRef}>
        <div className="pj-head">
          <span className="pj-label">WHAT I BUILD</span>
          <h2 className="pj-title">products &amp; solutions</h2>
        </div>

        <SolutionsAccordion items={VENTURES} />
      </section>
    </>
  );
};

export default Projects;
