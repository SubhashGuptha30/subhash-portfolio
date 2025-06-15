
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, GraduationCap } from 'lucide-react';

const educationHistory = [
  {
    degree: 'High School Diploma',
    institution: 'Gowtham Model School',
    duration: 'July 2009 - April 2021',
    details: null,
  },
  {
    degree: 'Intermediate, PCM',
    institution: 'KSN Junior College',
    duration: 'Aug 2021 - May 2023',
    details: 'Subjects: Physics, Chemistry, Mathematics',
  },
  {
    degree: 'B.Tech in Artificial Intelligence',
    institution: 'Amrita Vishwa Vidyapeetham',
    duration: 'Sep 2023 - June 2027',
    details: 'Current GPA: 7.06',
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold">About Me</h2>
          </div>
          <p className="text-xl text-gray-300">Passionate about AI and emerging technologies</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-cyan-400">My Journey</h3>
            <p className="text-gray-300 leading-relaxed">
              Currently pursuing B.Tech in Artificial Intelligence (2023-2027) at Amrita Vishwa Vidyapeetham, 
              I'm passionate about leveraging cutting-edge technology to solve real-world problems. My journey 
              in tech started with curiosity about how intelligent systems work, and has evolved into a deep 
              commitment to developing innovative AI solutions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Beyond academics, I enjoy exploring creative hobbies like writing and photo design, which help 
              me bring a unique perspective to my technical work. I'm always eager to learn emerging technologies 
              and develop skills that align with modern industry trends.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-cyan-400 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              Education
            </h3>
            <div className="relative pl-10">
              <div className="absolute left-5 top-1 h-full w-0.5 bg-cyan-400/30" />
              <div className="space-y-8">
                {educationHistory.slice().reverse().map((edu, index) => (
                  <div 
                    key={index} 
                    className="relative animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="absolute -left-7 top-1 h-4 w-4 rounded-full bg-gray-800 border-2 border-cyan-400" />
                    <Card className="bg-gray-900 border-gray-700 hover:border-cyan-400 transition-colors duration-300">
                      <CardHeader>
                        <CardTitle className="text-xl text-cyan-400">{edu.degree}</CardTitle>
                        <CardDescription className="text-gray-400">{edu.institution} • {edu.duration}</CardDescription>
                      </CardHeader>
                      {edu.details && (
                        <CardContent>
                          <p className="text-gray-300">{edu.details}</p>
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
