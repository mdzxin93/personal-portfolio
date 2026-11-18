"use client";
import { Suspense, useRef, useEffect } from "react";
import FeaturedVideo from "@/components/Featured/FeaturedVideo";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubHeader from "@/components/Featured/SubHeader";
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import SmoothScroll from "@/components/SmoothScroll";
import GradualBlur from "@/components/GradualBlur/GradualBlur";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import SiteFooter from "@/components/SiteFooter/SiteFooter";

export default function Home() {
  const ref = useRef(null);
  const blurRef = useRef(null);

  useEffect(() => {
    const blur = blurRef.current;
    const footer = document.getElementById("main-footer");
    if (!blur || !footer) return;

    let footerInView = false;
    const updateBlurState = () => {
      blur.style.opacity = window.scrollY >= 20 && !footerInView ? "1" : "0";
    };

    const footerObserver = new IntersectionObserver(([entry]) => {
      footerInView = entry.isIntersecting;
      updateBlurState();
    });

    footerObserver.observe(footer);
    window.addEventListener("scroll", updateBlurState, { passive: true });
    updateBlurState();

    return () => {
      footerObserver.disconnect();
      window.removeEventListener("scroll", updateBlurState);
    };
  }, []);

  return (
    <SmoothScroll>
    <Suspense
      fallback={
        <div className="w-screen bg-black h-screen text-white text-4xl md:text-7xl lg:text-9xl flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="bg-bg text-fg h-auto w-screen overflow-x-clip">
        <Navbar />

        <HeroSection />
        {/* </div> */}
        <div
          id="about"
          className="h-auto relative mt-16 md:mt-[10rem] px-6 sm:px-12 lg:px-20 pb-24 z-10 flex flex-col gap-8 md:gap-12"
          ref={ref}
        >
          <Skiggle />
          <Header />
          
          <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-16 items-start relative z-10">
            {/* Left Column: Portrait Image */}
            <div className="w-full md:w-[42%] lg:w-[38%] flex-shrink-0 flex justify-center md:justify-start">
              <FeaturedVideo refForward={ref} />
            </div>

            {/* Right Column: Copy & Core Expertise */}
            <div className="w-full md:flex-grow">
              <SubHeader />
            </div>
          </div>

        </div>

        <Projects />

        <HorizontalScroll />
        <Contact />
        <SiteFooter />

        {/* GradualBlur — hidden when footer is in view */}
        <div
          ref={blurRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 99999,
            opacity: 0,
            transition: "opacity 300ms ease",
          }}
        >
          <GradualBlur
            target="parent"
            position="bottom"
            height="6rem"
            strength={2}
            divCount={6}
            curve="bezier"
            exponential={false}
            opacity={0.9}
            zIndex={1}
          />
        </div>
        {/* <FeaturedWork />
        <Connection className="" />
        <div className="mt-80 w-full h-screen relative">
          <Experience className="w-full h-full rounded-3xl" />
        </div> */}
        {/* <div className="bg-brblue flex items-center justify-center w-full h-screen font-extrabold text-9xl"> this is the footer  </div> */}
        {/* <div className="relative">
          <div className="absolute text-9xl font-bold text-center w-full h-full top-80">
            HIRE       ME
          </div>
          <Footer />
          <div className="absolute text-3xl font-bold text-center w-full h-full top-[40rem]">
            made by mtarif
          </div>
        </div> */}
      </div>
    </Suspense>
    </SmoothScroll>
  );
}
