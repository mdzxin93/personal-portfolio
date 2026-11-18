import FeaturedVideo from "@/components/Featured/FeaturedVideo";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubHeader from "@/components/Featured/SubHeader";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="h-auto relative mt-16 md:mt-[10rem] px-6 sm:px-12 lg:px-20 pb-24 z-10 flex flex-col gap-8 md:gap-12"
    >
      <Skiggle />
      <Header />

      <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-16 items-start relative z-10">
        <div className="w-full md:w-[42%] lg:w-[38%] flex-shrink-0 flex justify-center md:justify-start">
          <FeaturedVideo />
        </div>

        <div className="w-full md:flex-grow">
          <SubHeader />
        </div>
      </div>
    </section>
  );
}
