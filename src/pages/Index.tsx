import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AnimatedSection from "@/components/AnimatedSection";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Languages from "@/components/Languages";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import PersonalSpaceLink from "@/components/PersonalSpaceLink";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "languages",
        "portfolio",
        "skills",
        "certificates",
        "personal-space-link",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-white relative">
      <div className="animated-grid-background"></div>
      <Navigation
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      <Hero onSectionClick={scrollToSection} />
      <div className="bg-card py-20">
        <AnimatedSection>
          <About />
        </AnimatedSection>
      </div>
      <div className="bg-background py-20">
        <AnimatedSection>
          <Languages />
        </AnimatedSection>
      </div>
      <div className="bg-card py-20">
        <AnimatedSection>
          <Portfolio />
        </AnimatedSection>
      </div>
      <div className="bg-background py-20">
        <AnimatedSection>
          <Skills />
        </AnimatedSection>
      </div>
      <div className="bg-card py-20">
        <AnimatedSection>
          <Certificates />
        </AnimatedSection>
      </div>
      <div className="bg-background py-20">
        <AnimatedSection>
          <PersonalSpaceLink />
        </AnimatedSection>
      </div>
      <div className="bg-card py-20">
        <AnimatedSection>
          <Contact />
        </AnimatedSection>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
