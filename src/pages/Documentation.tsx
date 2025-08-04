import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Shield,
  AlertTriangle,
  Info,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const Documentation = () => {
  const Section = ({
    title,
    icon: Icon,
    children,
  }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <Icon className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 px-6 max-w-5xl mx-auto">
        <Button asChild variant="ghost" className="group">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Portfolio
          </Link>
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-primary mb-4">
            Website Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            All the details about this portfolio website.
          </p>
        </div>

        <Section title="About This Site" icon={Info}>
          <p>
            This website is a personal portfolio designed and developed by
            Subhash Guptha to showcase his skills, projects, and creative
            endeavors. It serves as a central hub for his professional work and
            personal interests.
          </p>
          <ul>
            <li>
              <strong>Author:</strong> Subhash Guptha
            </li>
            <li>
              <strong>Version:</strong> 1.0.0
            </li>
            <li>
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </li>
          </ul>
        </Section>

        <Section title="Website Features" icon={Sparkles}>
          <p>
            This portfolio is built with a variety of modern features to create
            an engaging and dynamic user experience:
          </p>
          <ul>
            <li>
              <strong>Animated Hero Section:</strong> A dynamic and engaging
              hero section with animated backgrounds, text effects, and a typing
              animation for job titles.
            </li>
            <li>
              <strong>Interactive Sections:</strong> Smooth-scrolling navigation
              and fade-in animations for all content sections that trigger on
              every scroll.
            </li>
            <li>
              <strong>Personal Space:</strong> A unique section that offers a
              glimpse into my creative side, including galleries, a watchlist,
              and hobbies, all with interactive elements.
            </li>
            <li>
              <strong>Scroll to Top Button:</strong> A convenient button that
              appears on scroll to allow users to easily navigate back to the
              top of the page.
            </li>
            <li>
              <strong>Responsive Design:</strong> Fully responsive layout that
              looks great on all devices, from mobile phones to desktop
              computers.
            </li>
          </ul>
        </Section>

        <Section title="Warnings" icon={AlertTriangle}>
          <p>Please be aware of the following while using this website:</p>
          <ul>
            <li>
              The information provided is for general informational purposes
              only. All information on the site is provided in good faith,
              however, I make no representation or warranty of any kind, express
              or implied, regarding the accuracy, adequacy, validity,
              reliability, availability, or completeness of any information on
              the site.
            </li>
            <li>
              Some animations and visual effects may be resource-intensive on
              older devices.
            </li>
          </ul>
        </Section>

        <Section title="Terms and Conditions" icon={FileText}>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>
          <ul>
            <li>
              All content, including text, images, and code, is the property of
              Subhash Guptha unless otherwise stated and is protected by
              copyright laws.
            </li>
            <li>
              You are permitted to use the website for your personal,
              non-commercial use only.
            </li>
            <li>
              You must not misuse this website by knowingly introducing viruses
              or other material that is malicious or technologically harmful.
            </li>
          </ul>
        </Section>

        <Section title="Disclaimers" icon={Shield}>
          <p>
            The views and opinions expressed on this website are those of the
            author and do not necessarily reflect the official policy or
            position of any other agency, organization, employer, or company.
          </p>
          <p>
            This website may contain links to external websites that are not
            provided or maintained by or in any way affiliated with the author.
            Please note that the author does not guarantee the accuracy,
            relevance, timeliness, or completeness of any information on these
            external websites.
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
