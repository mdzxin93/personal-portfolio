import React from "react";

const SERVICES = [
  {
    title: "Frontend Development",
    body: "React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS for fast, responsive web apps.",
  },
  {
    title: "Backend & Databases",
    body: "Node.js, Express.js, REST APIs, Supabase, and PostgreSQL powering scalable server architecture.",
  },
  {
    title: "AI & Automation",
    body: "OpenAI integration, AI chatbots, WhatsApp automation, AI agents, AI workflows, and CRM automation.",
  },
  {
    title: "CMS, SaaS & Dashboards",
    body: "WordPress, Shopify, custom admin dashboards, authentication systems, and API integrations.",
  },
  {
    title: "E-commerce & Integrations",
    body: "Online storefronts, payment flows, third-party services, and connected business tools that streamline customer journeys.",
  },
  {
    title: "Cloud Deployment & DevOps",
    body: "Git-based workflows, Vercel deployments, environment configuration, and production checks for reliable releases.",
  },
];

const SubHeader = () => {
  return (
    <div className="w-full flex flex-col items-start text-left px-4 md:px-0">
      <div className="w-full text-base md:text-lg lg:text-xl flex flex-col gap-3 md:gap-4 leading-relaxed text-left">
        <p>Hi, I&apos;m Mohammed Zain, a Full-Stack Developer and AI enthusiast.</p>
        <p>
          I build scalable web applications, SaaS platforms, AI-powered products,
          dashboards, and modern digital experiences that solve real business problems.
        </p>
      </div>

      <div className="about-inline-services w-full mt-8 md:mt-12 h-auto">
        <div className="about-inline-services__head">
          <span className="about-inline-services__label">CORE EXPERTISE</span>
        </div>
        <div className="about-inline-services__grid">
          {SERVICES.map((service) => (
            <article key={service.title} className="about-inline-services__item">
              <h4>{service.title}</h4>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
