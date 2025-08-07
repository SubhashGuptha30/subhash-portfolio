import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/data/skills";
import { Code } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <TooltipProvider>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4 flex items-center justify-center gap-4 text-foreground relative glitch"
              data-text="My Skills"
            >
              <Code className="w-10 h-10 text-primary" />
              My Skills
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              A glimpse into my technical toolbox.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="bg-card border-primary/30 text-center group transition-all duration-300 flex flex-col h-full hover:border-primary hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader className="pt-8">
                  <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <skill.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {skill.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow px-6 pb-8">
                  <p className="text-muted-foreground mb-4">
                    {skill.description}
                  </p>
                  {skill.technologies && (
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                      {skill.technologies.map((tech, techIndex) => (
                        <Tooltip key={techIndex}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent hover:bg-primary/20 transition-colors duration-300 group/tech cursor-pointer">
                              <svg
                                className="w-6 h-6 group-hover/tech:scale-110 transition-transform duration-300"
                                viewBox="0 0 24 24"
                                fill={`#${tech.icon.hex}`}
                              >
                                <path d={tech.icon.path} />
                              </svg>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tech.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TooltipProvider>
    </section>
  );
};

export default Skills;
