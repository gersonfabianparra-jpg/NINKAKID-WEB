import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FloatingActions from "@/components/shared/FloatingActions";
import SectionDots from "@/components/shared/SectionDots";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Packages from "@/components/sections/Packages";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Coverage from "@/components/sections/Coverage";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <HowItWorks />
        <Packages />
        <Testimonials />
        <Gallery />
        <Coverage />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <SectionDots />
    </>
  );
}
