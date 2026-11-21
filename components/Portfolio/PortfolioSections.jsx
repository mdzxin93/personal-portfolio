import React from "react";
import Image from "next/image";
import Link from "next/link";
import { engineeringProjects } from "@/app/work/projects";

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const timeline = [
  { date: "Jun 2024 — Present", title: "Web Development Intern", org: "Aspire Digital Solutions · Mysuru", body: "Developing responsive web interfaces with React, TypeScript, JavaScript, and PHP; integrating REST APIs; and assisting with debugging, automated testing, server-side tasks, and CI/CD maintenance under senior guidance." },
  { date: "Jan 2023 — Jun 2024", title: "SEO & Web Development Intern", org: "Aspire Appliance Services · Mysuru", body: "Maintained responsive WordPress websites and worked on technical, on-page, and off-page SEO, metadata, keyword research, indexing, user experience, and page-speed improvements." },
  { date: "2023 — Present", title: "B.E. Information Science & Engineering", org: "Vidyavardhaka College of Engineering · Mysuru", body: "Undergraduate engineering studies. Resume-listed CGPA: 8.0." },
  { date: "Across college years", title: "Hackathon team leadership", org: "6+ hackathons", body: "Led and coordinated teams across more than six hackathon experiences, helping organize collaborative product-building work." },
];

const metrics = [
  { value: "10", label: "Client website entries", note: "Shown in the current Selected Work section" },
  { value: "6+", label: "Hackathons led", note: "Team leadership experience" },
  { value: "20%", label: "API response-time improvement", note: "Previously reported project result" },
  { value: "8.0", label: "CGPA", note: "As listed on the current resume" },
];

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="portfolio-section-head">
      <span className="portfolio-eyebrow">{eyebrow}</span>
      <div className="portfolio-section-head__row">
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  );
}

export default function PortfolioSections() {
  return (
    <div className="portfolio-additions">
      <section id="case-studies" className="portfolio-section portfolio-case-studies">
        <SectionHeading eyebrow="BEHIND THE BUILD" title={<>Selected engineering<br />case studies.</>} copy="Explore the problem, my contribution, the product workflow, and the implementation decisions behind each project." />
        <div className="case-study-grid">
          {engineeringProjects.map((project) => (
            <Link className="case-study-card" href={`/work/${project.slug}`} key={project.slug}>
              <div className="case-study-card__visual">
                {project.image ? (
                  <Image src={project.image} alt={`${project.name} project interface preview`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" quality={82} unoptimized priority />
                ) : (
                  <div className="case-study-card__placeholder">
                    <span>PROJECT / {project.number}</span>
                    <strong>{project.name}</strong>
                    <small>Case study</small>
                  </div>
                )}
                <span className="case-study-card__open"><Arrow /></span>
              </div>
              <div className="case-study-card__meta">
                <span>{project.category}</span>
                <span>{project.status}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <span className="case-study-card__link">Explore case study <Arrow /></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="journey" className="portfolio-section portfolio-journey">
        <SectionHeading eyebrow="THE JOURNEY SO FAR" title={<>Experience built<br />one step at a time.</>} copy="A clear view of my education, professional experience, and the team environments where I have learned to ship work." />
        <div className="journey-list">
          {timeline.map((item, index) => (
            <article className="journey-item" key={item.title}>
              <div className="journey-item__rail"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
              <div className="journey-item__content">
                <span className="journey-item__date">{item.date}</span>
                <h3>{item.title}</h3>
                <strong>{item.org}</strong>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="portfolio-resume-link" href="/Zain-Resume.pdf" target="_blank" rel="noreferrer">View resume <Arrow /></a>
      </section>

      <section id="impact" className="portfolio-section portfolio-impact">
        <SectionHeading eyebrow="PROGRESS, NOT PROMISES" title={<>Evidence over<br />empty numbers.</>} copy="A few concrete indicators from my current work and experience. Each figure is tied to a stated source or project context." />
        <div className="impact-grid">
          {metrics.map((metric) => (
            <article className="impact-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <h3>{metric.label}</h3>
              <p>{metric.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
