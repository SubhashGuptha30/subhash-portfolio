
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Languages from '@/components/Languages';
import Portfolio from '@/components/Portfolio';
import Skills from '@/components/Skills';
import Certificates from '@/components/Certificates';
import PersonalSpaceLink from '@/components/PersonalSpaceLink';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'languages', 'portfolio', 'skills', 'certificates', 'personal-space-link', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />
      <Hero onSectionClick={scrollToSection} />
      <About />
      <Languages />
      <Portfolio />
      <Skills />
      <Certificates />
      <PersonalSpaceLink />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
