
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { projects } from '@/data/projects';
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const handleCardClick = (link: string | null) => {
    if (link) {
      window.open(link, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">My Portfolio</h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">A collection of projects I've poured my heart and soul into.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`bg-gray-900 border-gray-700 text-white group h-80 flex flex-col transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 ${project.link ? 'cursor-pointer' : ''}`}
              onClick={() => handleCardClick(project.link)}
            >
              <div className="relative flex-1 overflow-hidden rounded-t-lg">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                {project.link && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-900/80 backdrop-blur-sm p-2 rounded-full">
                      <ExternalLink className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex-shrink-0">
                <CardTitle className="text-xl font-semibold mb-3 line-clamp-2">{project.title}</CardTitle>
                <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
