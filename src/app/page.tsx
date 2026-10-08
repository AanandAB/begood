import Hero from "@/components/hero/Hero";
import Statement from "@/components/sections/Statement";
import PlanningSelector from "@/components/planning/PlanningSelector";
import WorkCarousel from "@/components/sections/WorkCarousel";
import Process from "@/components/sections/Process";
import Details from "@/components/sections/Details";
import Trust from "@/components/sections/Trust";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <PlanningSelector />
      <WorkCarousel />
      <Process />
      <Details />
      <Trust />
      <Contact />
    </>
  );
}
