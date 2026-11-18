import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/About/AboutSection";
import SmoothScroll from "@/components/SmoothScroll";
import Projects from "@/components/Projects/Projects";
import PortfolioSections from "@/components/Portfolio/PortfolioSections";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import Contact from "@/components/Contact/Contact";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import BlurController from "@/components/GradualBlur/BlurController";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="bg-bg text-fg h-auto w-screen overflow-x-clip">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <Projects />
        <PortfolioSections />
        <HorizontalScroll />
        <Contact />
        <SiteFooter />
        <BlurController />
      </div>
    </SmoothScroll>
  );
}
