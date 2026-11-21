import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { engineeringProjects, getEngineeringProject } from "../projects";

export function generateStaticParams() {
  return engineeringProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const project = getEngineeringProject(params.slug);
  if (!project) return { title: "Project not found | Mohammed Zain" };
  return {
    title: `${project.name} — Case Study | Mohammed Zain`,
    description: project.summary,
  };
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const DEMONSTRATION_VISUALS = {
  oilflow: [
    { src: "/images/projects/oilflow-project.png", label: "OilFlow · Admin dashboard", alt: "OilFlow running admin dashboard", verified: true },
  ],
  "moped-momos": [
    { src: "/images/projects/moped-momos-project.png", label: "Moped Momos · Admin order desk", alt: "Moped Momos admin order desk", verified: true },
    { src: "/images/case-studies/moped-kitchen.png", label: "Moped Momos · Kitchen queue", alt: "Moped Momos kitchen order queue", verified: true },
  ],
  agrimap: [
    { src: "/images/projects/agrimap-project.png", label: "AgriMap · Desktop dashboard", alt: "AgriMap desktop GIS dashboard with synthetic field data", verified: true },
  ],
  "titan-watches-voice-analysis": [
    { src: "/images/case-studies/titan-dashboard.png", label: "Titan Watches · Operations dashboard", alt: "Titan Watches operations dashboard", verified: true },
    { src: "/images/case-studies/titan-storefront.png", label: "Titan Watches · Product storefront", alt: "Titan Watches product storefront", verified: true },
    { src: "/images/case-studies/titan-inbox.png", label: "Titan Watches · Customer inbox", alt: "Titan Watches customer inbox", verified: true },
    { src: "/images/case-studies/titan-orders.png", label: "Titan Watches · Order management", alt: "Titan Watches order management screen", verified: true },
  ],
  autoeditor: [
    { src: "/images/projects/autoeditor-project.png", label: "AutoEditor · Existing project visual", alt: "AutoEditor project interface preview", verified: false },
  ],
  cloudnas: [
    { src: "/images/projects/cloudnas-project.png", label: "CloudNAS · Existing project visual", alt: "CloudNAS project interface preview", verified: false },
  ],
};

export default function ProjectCaseStudy({ params }) {
  const project = getEngineeringProject(params.slug);
  if (!project) notFound();

  return (
    <main className="case-page">
      <nav className="case-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/#case-studies">Case studies</Link><span>/</span><span>{project.name}</span>
      </nav>

      <header className="case-hero">
        <span className="portfolio-eyebrow">{project.number} / {project.category}</span>
        <div className="case-hero__top">
          <h1>{project.name}</h1>
          <span className="case-status">{project.status}</span>
        </div>
        <p>{project.summary}</p>
        <div className="case-actions">
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Open live preview <Arrow /></a>}
          {project.repository && <a href={project.repository} target="_blank" rel="noreferrer">View source code <Arrow /></a>}
          <a href="/Zain-Resume.pdf" target="_blank" rel="noreferrer">My resume <Arrow /></a>
        </div>
      </header>

      <section className="case-visual" aria-label="Project interface preview">
        {project.image ? (
          <Image src={project.image} alt={`${project.name} interface preview`} fill priority sizes="(max-width: 900px) 100vw, 90vw" quality={85} />
        ) : (
          <div className="case-visual__placeholder">
            <span>INTERFACE CAPTURE</span>
            <strong>{project.name}</strong>
            <p>Verified product screenshots have not been added to this portfolio yet.</p>
          </div>
        )}
      </section>

      <div className="case-content">
        <section className="case-overview">
          <span className="portfolio-eyebrow">01 / OVERVIEW</span>
          <div><h2>What it is</h2><p>{project.overview}</p></div>
        </section>
        <section className="case-two-column">
          <article><span className="portfolio-eyebrow">02 / THE PROBLEM</span><h2>The challenge</h2><p>{project.problem}</p></article>
          <article><span className="portfolio-eyebrow">03 / MY CONTRIBUTION</span><h2>What I worked on</h2><p>{project.contribution}</p></article>
        </section>
        <section className="case-responsibilities">
          <span className="portfolio-eyebrow">04 / RESPONSIBILITIES</span>
          <h2>From idea to implementation.</h2>
          <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="case-features">
          <span className="portfolio-eyebrow">05 / PRODUCT CAPABILITIES</span>
          <h2>What the product does.</h2>
          <div className="case-feature-grid">{project.features.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div>
        </section>
        <section className="case-architecture">
          <span className="portfolio-eyebrow">06 / ARCHITECTURE & TECHNOLOGY</span>
          <h2>How it is structured.</h2>
          <div className="case-architecture__grid">
            <div><h3>Application architecture</h3><ul>{project.architecture.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Data model · conceptual</h3><ul>{project.dataModel.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Technologies & concepts</h3><div className="case-tags">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div></div>
          </div>
        </section>
        <section className="case-solution">
          <span className="portfolio-eyebrow">07 / CHALLENGE & RESPONSE</span>
          <div><h2>{project.challenge}</h2><p>{project.solution}</p></div>
        </section>
        <section className="case-gallery">
          <span className="portfolio-eyebrow">08 / DEMONSTRATION</span>
          <h2>Product visuals & walkthrough.</h2>
          <div className="case-gallery__grid">
            {(DEMONSTRATION_VISUALS[project.slug] || (project.image ? [{ src: project.image, label: "Project preview", alt: project.name + " project preview", verified: false }] : [])).map((visual) => (
              <figure className="case-gallery__item" key={visual.src}>
                <Image src={visual.src} alt={visual.alt} width={1600} height={1000} sizes="(max-width: 700px) 100vw, 50vw" quality={85} />
                <figcaption><strong>{visual.label}</strong>{!visual.verified && <span>Existing project preview · fresh runtime capture pending</span>}</figcaption>
              </figure>
            ))}
            {!DEMONSTRATION_VISUALS[project.slug] && !project.image && <p className="case-gallery__pending">A verified application screenshot is not available yet.</p>}
          </div>
          <p className="case-stage-note">{project.stageNote}</p>
        </section>
      </div>

      <footer className="case-footer">
        <Link href="/#case-studies">← Back to all case studies</Link>
        <Link href="/#contact-section">Have a project in mind? Let&apos;s talk <Arrow /></Link>
      </footer>
    </main>
  );
}
