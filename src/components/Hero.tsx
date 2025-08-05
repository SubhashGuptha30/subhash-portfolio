import { useState, useEffect } from "react";
import { ArrowRight, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscribeToViews } from "@/integrations/firebase/client";
import ResumeViewer from "./ResumeViewer";
import resumePdf from "/uploads/Resume.pdf";
import { TypeAnimation } from "react-type-animation";

interface HeroProps {
  onSectionClick: (sectionId: string) => void;
}

const Hero = ({ onSectionClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const unsubscribe = subscribeToViews((count) => {
      setViews(count);
    });
    return () => unsubscribe();
  }, []);

  const commandStyle = "text-primary font-bold";
  const textStyle = "text-foreground";

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 lg:py-0 px-6 bg-background"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div
              className={`space-y-3 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
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
              <div className="flex items-center gap-2 text-muted-foreground mt-4">
                <Eye className="w-5 h-5" />
                <span>
                  {views !== null ? `${views.toLocaleString()} views` : "..."}
                </span>
              </div>
            </div>

            <p
              className={`${textStyle} leading-relaxed transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <span className={commandStyle}>{">"}</span> AI/ML Cloud Engineer
              with a passion for developing and deploying intelligent, scalable
              solutions. Experienced in building and maintaining machine
              learning infrastructure on the cloud.
            </p>
            <div
              className={`flex flex-col items-start gap-4 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
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
            className={`flex justify-center transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="relative group w-80 h-80">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse group-hover:animate-none"></div>
              <div className="relative w-full h-full rounded-full border-2 border-primary bg-background p-1 transition-all duration-500 group-hover:scale-105">
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
