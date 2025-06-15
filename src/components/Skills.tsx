
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skills } from '@/data/skills';
import { Code } from 'lucide-react';
// Removed tooltip imports

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-900/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">My Skills</h2>
          </div>
          <p className="mt-4 text-lg leading-8 text-gray-400">A glimpse into my technical toolbox.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <Card 
              key={index} 
              className="bg-gray-800/40 border-gray-700 text-center group transition-all duration-300 flex flex-col h-full hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10"
            >
              <CardHeader className="pt-8">
                <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-400/20 transition-all duration-300">
                  <skill.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-6 pb-8">
                <p className="text-gray-400 mb-4">{skill.description}</p>
                {skill.technologies && (
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {skill.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700/50 hover:bg-cyan-400/20 transition-colors duration-300 group/tech cursor-pointer"
                        title={tech.name}
                      >
                        <svg
                          className="w-5 h-5 group-hover/tech:scale-110 transition-transform duration-300"
                          viewBox="0 0 24 24"
                          fill={`#${tech.icon.hex}`}
                        >
                          <path d={tech.icon.path} />
                        </svg>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
