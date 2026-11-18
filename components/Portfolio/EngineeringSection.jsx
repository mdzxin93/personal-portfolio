import React from "react";
import Link from "next/link";

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const expertise = [
  { title: "Full-stack engineering", detail: "Building responsive interfaces and connecting them to application logic and data.", proof: "Moped Momos · CloudNAS", links: ["/work/moped-momos", "/work/cloudnas"] },
  { title: "REST API development", detail: "Integrating application services and shaping dependable request and response workflows.", proof: "Web application and service integrations", links: [] },
  { title: "Database architecture", detail: "Designing records, relationships, and operational states around real product workflows.", proof: "OilFlow · Moped Momos", links: ["/work/oilflow", "/work/moped-momos"] },
  { title: "Authentication & authorization", detail: "Separating administrative access from limited operational views.", proof: "Moped Momos · CloudNAS", links: ["/work/moped-momos", "/work/cloudnas"] },
  { title: "AI integration & automation", detail: "Applying speech recognition and structured AI-assisted workflows to practical tasks.", proof: "AutoEditor · Titan Watches", links: ["/work/autoeditor", "/work/titan-watches-voice-analysis"] },
  { title: "Cloud deployment", detail: "Preparing application builds and deployment workflows for web and mobile experiences.", proof: "Moped Momos · client websites", links: ["/work/moped-momos"] },
  { title: "Performance optimization", detail: "Improving delivery, rendering, and application responsiveness through measured changes.", proof: "Portfolio performance work", links: [] },
  { title: "Production debugging", detail: "Tracing real browser, build, and runtime issues before making targeted fixes.", proof: "Portfolio audit and optimization", links: [] },
];

export default function EngineeringSection() {
  return (
    <section id="engineering" className="portfolio-section portfolio-engineering">
      <div className="portfolio-section-head">
        <span className="portfolio-eyebrow">HOW I THINK & BUILD</span>
        <div className="portfolio-section-head__row">
          <h2>Engineering<br />that solves real work.</h2>
          <p>The tools matter, but the decisions behind them matter more. Here is how my engineering work translates into practical product capabilities.</p>
        </div>
      </div>
      <div className="engineering-grid">
        {expertise.map((item, index) => (
          <article className="engineering-card" key={item.title}>
            <span className="engineering-card__number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <div className="engineering-card__proof">
              <span>PROJECT EVIDENCE</span>
              <strong>{item.proof}</strong>
              {item.links.length > 0 && (
                <div className="engineering-card__links">
                  {item.links.map((href) => <Link href={href} key={href}>View case study <Arrow /></Link>)}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
