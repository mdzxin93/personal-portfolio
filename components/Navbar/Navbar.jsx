"use client";

import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";

import LetsTalk from "./LetsTalk";
import MenuButton from "./MenuButton";
import Link from "next/link";
import MusicButton from "./MusicButton";

// Shared contact targets — Mohammed Zain J
const EMAIL = "mohammedkhasiminfo@gmail.com";
const WHATSAPP_URL = "https://wa.me/917975788275";
const TELEGRAM_URL = "https://t.me/+917975788275";

// Smooth-scroll to an in-page section. Uses the global Lenis instance
// exposed by SmoothScroll (window.__lenis) so mobile nav clicks feel
// identical to any other scroll on the site, and falls back to native
// scrollIntoView when Lenis isn't ready yet.
const scrollToSection = (id) => {
  if (typeof window === "undefined") return;
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const MOBILE_NAV_ITEMS = [
  { label: "HOME", target: "top" },
  { label: "ABOUT", target: "about" },
  { label: "WORK", target: "projects-section" },
  { label: "CONTACT", target: "contact-section" },
];

import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const [rotate, setRotate] = useSpring(() => ({
    transform: `rotate(0deg)`,
    config: { tension: 300, friction: 20, mass: 1 },
  }));

  const [open, set] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    set(true);
    if (typeof window !== "undefined") {
      const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      setTheme(current);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    const lenis = window.__lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", checkScroll);
    }
    return () => {
      window.removeEventListener("scroll", checkScroll);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", checkScroll);
      }
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = next;
    }
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  };

  // Lock body scroll while the mobile menu is open so the user doesn't
  // accidentally scroll the page behind the overlay.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const handleMobileNav = (e, target) => {
    if (pathname !== "/") {
      setMobileOpen(false);
      return;
    }
    e.preventDefault();
    setMobileOpen(false);
    setRotate({ transform: "rotate(0deg)" });
    // Give the overlay a frame to close before scrolling so the user
    // sees the motion rather than a jumpy pre-scroll flash.
    setTimeout(() => scrollToSection(target), 50);
  };

  return (
    <>
      {/* Navbar small screen */}
      {/* z-[100001] keeps the navbar (and the dropdown menu it contains) on
          top of every other layer — including the footer (z: 100000) and
          the GradualBlur overlay (z: 99999) — so the menu is always
          accessible and never clipped by another stacking context. */}
      <div className={`fixed top-0 left-0 z-[100001] w-full lg:hidden px-5 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-bg/85 backdrop-blur-md border-b border-fg/10 shadow-sm"
          : "py-5 bg-transparent"
      }`}>
        <div className="flex items-center justify-between w-full font-extrabold">
          <Link
            href="/"
            aria-label="Home"
            onClick={(e) => handleMobileNav(e, "top")}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
          >
            <img
              src="/hero-image.png"
              alt="Mohammed Zain J"
              className="w-8 h-8 rounded-full object-cover object-top border border-fg/10"
            />
            <span className="tracking-wider font-semibold text-lg text-fg" style={{ letterSpacing: "-0.03em" }}>
              MOHAMMED ZAIN
            </span>
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="nav_btn_sm flex items-center justify-center cursor-pointer"
            onMouseEnter={() => !mobileOpen && setRotate({ transform: "rotate(90deg)" })}
            onMouseLeave={() => !mobileOpen && setRotate({ transform: "rotate(0deg)" })}
            onClick={() => {
              const next = !mobileOpen;
              setMobileOpen(next);
              setRotate({ transform: next ? "rotate(45deg)" : "rotate(0deg)" });
            }}
          >
            <animated.div className="text-[0.55rem] leading-none" style={rotate}>
              {mobileOpen ? "✕" : "⬤ ⬤"}
            </animated.div>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay — only rendered on small screens. Covers the
          viewport below the navbar with navigation + contact buttons. */}
      <div
        className={`fixed inset-0 z-[100000] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-bg"
          onClick={() => {
            setMobileOpen(false);
            setRotate({ transform: "rotate(0deg)" });
          }}
        />
        <div className="relative z-10 h-full w-full flex flex-col pt-24 pb-8 px-6">
          <nav className="flex flex-col gap-1">
            {MOBILE_NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={item.target === "top" ? "#" : `#${item.target}`}
                onClick={(e) => handleMobileNav(e, item.target)}
                className="flex items-center justify-between py-4 border-b border-theme-border text-fg text-3xl font-semibold transition-colors duration-200 hover:text-brblue"
                style={{
                  letterSpacing: "-0.03em",
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `transform 0.4s ease ${0.05 + i * 0.05}s, opacity 0.4s ease ${
                    0.05 + i * 0.05
                  }s, color 0.2s ease`,
                }}
              >
                <span>{item.label}</span>
                <span className="text-fg-muted text-base">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <div className="flex items-center justify-between py-1">
              <span className="text-fg-muted text-xs tracking-[0.2em] uppercase">Theme</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 border border-fg/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-fg hover:bg-accent-soft transition-colors cursor-pointer"
              >
                <span>{theme === "dark" ? "☀️ LIGHT" : "🌙 DARK"}</span>
              </button>
            </div>
            <p className="text-fg-muted text-xs tracking-[0.2em] uppercase mt-1">Get in touch</p>
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between bg-fg text-bg rounded-full px-5 py-4 text-sm tracking-[0.2em] font-semibold"
            >
              <span>EMAIL</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-2 border-fg text-fg rounded-full px-5 py-4 text-sm tracking-[0.2em] font-semibold"
            >
              <span>WHATSAPP</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-2 border-fg text-fg rounded-full px-5 py-4 text-sm tracking-[0.2em] font-semibold"
            >
              <span>TELEGRAM</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navbar large screen */}
      <div
        className={`fixed top-0 left-0 w-full px-6 lg:px-20 z-[100001] transition-all duration-300 ${
          isScrolled
            ? "py-4 bg-bg/85 backdrop-blur-md border-b border-fg/10 shadow-sm"
            : "pt-12 pb-8 bg-transparent"
        }`}
      >
        <div className="items-center justify-between hidden lg:flex">
          <div className="flex items-center">
            <Link href="/" aria-label="Home" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
              <img
                src="/hero-image.png"
                alt="Mohammed Zain J"
                className="w-10 h-10 rounded-full object-cover object-top border border-fg/10"
              />
              <span className="font-AeonikMedium text-2xl tracking-wider text-fg uppercase">MOHAMMED ZAIN.</span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-around font-AeonikMedium">
            <Trail open={open} className="flex">
              <MusicButton />
              <LetsTalk />
              <MenuButton />
            </Trail>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
