import React, { useEffect, useRef } from "react";

const WHATSAPP_URL = "https://wa.me/917975788275";

const scrollToSection = (id) => {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;

  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Menu = ({ open, onOutsideClick, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick?.(event);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [onOutsideClick]);

  const navItems = [
    { label: "HOME", target: "top" },
    { label: "ABOUT", target: "about" },
    { label: "WORK", target: "projects-section" },
    { label: "CONTACT", target: "contact-section" },
  ];

  const handleNavClick = (event, target) => {
    event.preventDefault();
    scrollToSection(target);
    onClose?.();
  };

  const panelMotion = open
    ? "translate-y-0 rotate-0 opacity-100 visible"
    : "translate-y-8 rotate-[8deg] opacity-0 invisible pointer-events-none";

  return (
    <div
      className={`absolute top-[4rem] right-0 w-[20rem] origin-top-right transition-all duration-500 ease-out ${panelMotion}`}
      ref={ref}
      aria-hidden={!open}
    >
      <div className="rounded-xl bg-bg-alt text-fg flex flex-col font-Aeonik text-3xl p-8">
        {navItems.map((item, index) => (
          <a
            key={item.target}
            href={item.target === "top" ? "#" : `#${item.target}`}
            onClick={(event) => handleNavClick(event, item.target)}
            tabIndex={open ? 0 : -1}
            className={`flex items-center justify-between transition-colors duration-200 hover:text-brblue cursor-pointer ${
              index === 0 ? "pb-3" : index === navItems.length - 1 ? "pt-3" : "py-3"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-fg-muted">•</span>
          </a>
        ))}
      </div>

      <div className="rounded-xl bg-bg-alt text-fg flex flex-col p-8 my-2">
        <div className="font-Aeonik text-3xl leading-tight">
          Got an idea?
          <br />
          Let&apos;s talk.
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <a
            href="#contact-section"
            tabIndex={open ? 0 : -1}
            onClick={() => onClose?.()}
            className="flex items-center justify-between bg-fg text-bg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span>GET IN TOUCH</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={() => onClose?.()}
            className="flex items-center justify-between border-2 border-fg text-fg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold transition-colors duration-200 hover:bg-accent-soft"
          >
            <span>WHATSAPP</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
