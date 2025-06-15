
import { ExternalLink, Sparkles, Palette, BookOpen, FileText } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { creativeWorks } from '@/data/creativeWorks';

const CreativeGallery = () => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'script':
        return FileText;
      case 'poetry':
        return BookOpen;
      case 'story':
        return Palette;
      default:
        return Sparkles;
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type.toLowerCase()) {
      case 'script':
        return 'from-emerald-500 to-teal-600';
      case 'poetry':
        return 'from-purple-500 to-pink-600';
      case 'story':
        return 'from-blue-500 to-indigo-600';
      default:
        return 'from-cyan-500 to-blue-600';
    }
  };

  return (
    <section id="creative" className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
              <Palette className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Creative Gallery
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A glimpse into my creative side out of the office
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creativeWorks.map((work, index) => {
            const TypeIcon = getTypeIcon(work.type);
            const gradientClass = getTypeGradient(work.type);
            
            const CardComponent = () => (
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 border border-gray-700/50 overflow-hidden group hover:scale-105 hover:border-purple-500/50 transition-all duration-500 cursor-pointer backdrop-blur-sm relative">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-cyan-500/10 transition-all duration-500 rounded-lg"></div>
                
                <div className="relative">
                  <div className="relative overflow-hidden">
                    <img 
                      src={work.image} 
                      alt={work.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Floating type badge with icon */}
                    <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
                      <div className={`bg-gradient-to-r ${gradientClass} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm`}>
                        <TypeIcon className="w-4 h-4" />
                        {work.type}
                      </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-400/30 group-hover:border-purple-400/60 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-300"></div>
                  </div>
                  
                  <CardHeader className="bg-gray-900 relative z-10">
                    <CardTitle className="text-cyan-400 group-hover:text-cyan-300 flex items-center gap-3 transition-colors duration-300">
                      <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {work.title}
                      </span>
                      {work.link && (
                        <div className="p-1 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors duration-300">
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:rotate-12 transform" />
                        </div>
                      )}
                    </CardTitle>
                    <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                      {work.description}
                    </CardDescription>
                    
                  </CardHeader>
                </div>
              </Card>
            );

            return work.link ? (
              <a
                key={index}
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
                aria-label={`View ${work.title}`}
              >
                <CardComponent />
              </a>
            ) : (
              <div 
                key={index}
                className="transform transition-transform duration-300 hover:-translate-y-2"
                onClick={() => {
                  console.log(`Clicked on ${work.title} - link will be added later`);
                }}
              >
                <CardComponent />
              </div>
            );
          })}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </section>
  );
};

export default CreativeGallery;
