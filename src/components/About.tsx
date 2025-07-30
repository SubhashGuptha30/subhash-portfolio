import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, GraduationCap } from "lucide-react";

const educationHistory = [
  {
    degree: "High School Diploma",
    institution: "Gowtham Model School",
    duration: "July 2009 - April 2021",
    details: null,
  },
  {
    degree: "Intermediate, PCM",
    institution: "KSN Junior College",
    duration: "Aug 2021 - May 2023",
    details: "Subjects: Physics, Chemistry, Mathematics",
  },
  {
    degree: "B.Tech in Artificial Intelligence",
    institution: "Amrita Vishwa Vidyapeetham",
    duration: "Sep 2023 - June 2027",
    details: "Current GPA: 7.06",
  },
];

const About = () => {
  const commandStyle = "text-primary font-bold";
  const textStyle = "text-foreground";

  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 text-primary" />
            <h2
              className="text-4xl font-bold text-foreground relative glitch"
              data-text="About Me"
            >
              About Me
            </h2>
          </div>
          <p className={`text-xl ${textStyle}`}>
            Passionate about AI and emerging technologies
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3
              className="text-2xl font-semibold text-primary relative glitch"
              data-text="My Journey"
            >
              My Journey
            </h3>
            <p className={`${textStyle} leading-relaxed`}>
              <span className={commandStyle}>{">"}</span> Currently pursuing
              B.Tech in Artificial Intelligence (2023-2027) at Amrita Vishwa
              Vidyapeetham, I'm passionate about leveraging cutting-edge
              technology to solve real-world problems. My journey in tech
              started with curiosity about how intelligent systems work, and has
              evolved into a deep commitment to developing innovative AI
              solutions.
            </p>
            <p className={`${textStyle} leading-relaxed`}>
              <span className={commandStyle}>{">"}</span> Beyond academics, I
              enjoy exploring creative hobbies like writing and photo design,
              which help me bring a unique perspective to my technical work. I'm
              always eager to learn emerging technologies and develop skills
              that align with modern industry trends.
            </p>
          </div>
          <div className="space-y-6">
            <h3
              className="text-2xl font-semibold text-primary flex items-center gap-2 relative glitch"
              data-text="Education"
            >
              <GraduationCap className="w-6 h-6" />
              Education
            </h3>
            <div className="relative pl-10">
              <div className="absolute left-5 top-1 h-full w-0.5 bg-primary/30" />
              <div className="space-y-8">
                {educationHistory
                  .slice()
                  .reverse()
                  .map((edu, index) => (
                    <div
                      key={index}
                      className="relative animate-fade-in"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="absolute -left-7 top-1 h-4 w-4 rounded-full bg-background border-2 border-primary" />
                      <Card className="bg-card border-primary/30 hover:border-primary transition-colors duration-300">
                        <CardHeader>
                          <CardTitle className="text-xl text-primary">
                            {edu.degree}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {edu.institution} • {edu.duration}
                          </CardDescription>
                        </CardHeader>
                        {edu.details && (
                          <CardContent>
                            <p className={textStyle}>{edu.details}</p>
                          </CardContent>
                        )}
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
