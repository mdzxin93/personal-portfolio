import React from "react";

const LetsTalk = () => {
  const handleClick = (event) => {
    event.preventDefault();
    if (typeof window === "undefined") return;
    const target = document.getElementById("contact-section");
    if (!target) return;

    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href="#contact-section"
      onClick={handleClick}
      aria-label="Contact section"
      className="group relative nav_btn_lg nav_btn_dark flex items-center justify-center gap-2 overflow-hidden py-6 cursor-pointer hover:bg-brblue"
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1">
        LET&apos;S TALK
      </span>
      <span className="transition-opacity duration-300 group-hover:opacity-0">
        &nbsp;•&nbsp;
      </span>
      <span className="absolute right-6 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true">
        →
      </span>
    </a>
  );
};

export default LetsTalk;
