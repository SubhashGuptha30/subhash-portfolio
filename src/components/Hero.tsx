import { useState, useEffect } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeViewer from "./ResumeViewer";
import resumePdf from "/uploads/Resume.pdf";

interface HeroProps {
  onSectionClick: (sectionId: string) => void;
}

const Hero = ({ onSectionClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 lg:py-0 px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"></div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <p className="text-cyan-400 text-lg">Hello, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-bold font-mono text-green-400">
                Subhash
                <span className="text-green-400 px-2 lg:px-4">Guptha</span>
                <span className="animate-ping">_</span>
              </h1>
              <div className="bg-green-400 text-gray-900 px-4 py-2 rounded-full inline-block">
                <span className="font-semibold">AI/ML Cloud Engineer</span>
              </div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed font-mono">
              AI/ML Cloud Engineer with a passion for developing and deploying
              intelligent, scalable solutions. Experienced in building and
              maintaining machine learning infrastructure on the cloud.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 lg:flex-col">
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => onSectionClick("portfolio")}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  View My Work <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onSectionClick("contact")}
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Get In Touch
                </Button>
              </div>
              <ResumeViewer pdfUrl={resumePdf}>
                <Button
                  variant="outline"
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 py-3 rounded-lg transition-all duration-300 px-[115px]"
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
            <div className="relative group">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-1 transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-12 group-hover:rotate-x-12 transform-gpu perspective-1000">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-400/50">
                  <img
                    alt="Subhash Guptha"
                    className="w-72 h-72 rounded-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    src="https://i.postimg.cc/P5ZRbzxg/519c0e2b-b038-4a33-abb9-9bfa8731c5aa.jpg"
                    style={{
                      transform: "translateZ(20px)",
                    }}
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-400 text-gray-900 px-4 py-2 rounded-full font-semibold transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-400/50">
                AI/ML Cloud Engineer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
