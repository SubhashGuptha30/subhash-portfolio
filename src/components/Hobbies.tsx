
import { hobbies } from '@/data/personal-space-data';
import { icons, Heart } from 'lucide-react';

const Hobbies = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-yellow-400 animate-pulse" />
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
            Hobbies & Interests
          </h2>
        </div>
        <p className="text-gray-400 text-lg">What fuels my passion beyond code</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {hobbies.map((hobby, index) => {
          const LucideIcon = icons[hobby.icon as keyof typeof icons];
          return (
            <div 
              key={hobby.name} 
              className="group flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/20 hover:-translate-y-3 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                {LucideIcon && (
                  <LucideIcon className="w-12 h-12 text-yellow-400 group-hover:text-yellow-300 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                )}
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-lg font-semibold text-center group-hover:text-yellow-300 transition-colors duration-300">
                {hobby.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hobbies;
