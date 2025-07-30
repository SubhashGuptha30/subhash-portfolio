import { useState, useEffect } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeViewer from "./ResumeViewer";
import resumePdf from "/uploads/Resume.pdf";
import { TypeAnimation } from "react-type-animation";

interface HeroProps {
  onSectionClick: (sectionId: string) => void;
}

const Hero = ({ onSectionClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const commandStyle = "text-primary font-bold";
  const textStyle = "text-foreground";

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 lg:py-0 px-6"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-3">
              <p className={textStyle}>
                <span className={commandStyle}>{">"}</span> Hello, I'm
              </p>
              <h1
                className="text-5xl lg:text-7xl font-bold text-primary text-flicker relative glitch"
                data-text="Subhash Guptha"
              >
                Subhash Guptha<span className="animate-blink">_</span>
              </h1>
              <TypeAnimation
                sequence={[
                  "AI/ML Cloud Engineer",
                  1000,
                  "Full Stack Developer",
                  1000,
                  "Data Scientist",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                className="bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-sm inline-block font-semibold"
                repeat={Infinity}
              />
            </div>

            <p className={`${textStyle} leading-relaxed`}>
              <span className={commandStyle}>{">"}</span> AI/ML Cloud Engineer
              with a passion for developing and deploying intelligent, scalable
              solutions. Experienced in building and maintaining machine
              learning infrastructure on the cloud.
            </p>
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => onSectionClick("portfolio")}
                  className="bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  View My Work <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onSectionClick("contact")}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Get In Touch
                </Button>
              </div>
              <ResumeViewer pdfUrl={resumePdf}>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 w-full"
                >
                  View Resume <FileText className="ml-2 w-4 h-4" />
                </Button>
              </ResumeViewer>
            </div>
          </div>
          <div
            className={`flex justify-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative group w-80 h-80">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="w-full h-full rounded-full border-2 border-primary bg-background p-1 transition-all duration-500 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <img
                    alt="Subhash Guptha"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    src="https://i.postimg.cc/P5ZRbzxg/519c0e2b-b038-4a33-abb9-9bfa8731c5aa.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
