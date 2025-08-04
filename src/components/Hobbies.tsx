import { hobbies } from "@/data/personal-space-data";
import { icons, Heart } from "lucide-react";

const Hobbies = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-primary animate-pulse" />
          <h2 className="text-4xl font-bold text-foreground">
            Hobbies & Interests
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          What fuels my passion beyond code
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {hobbies.map((hobby, index) => {
          const LucideIcon = icons[hobby.icon as keyof typeof icons];
          return (
            <div
              key={hobby.name}
              className="group relative flex flex-col items-center gap-4 p-8 bg-card rounded-lg border border-primary/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                {LucideIcon && (
                  <div className="p-4 bg-primary/10 rounded-full">
                    <LucideIcon className="w-12 h-12 text-primary group-hover:text-primary/80 transition-all duration-300 group-hover:scale-110" />
                  </div>
                )}
                <span className="text-xl font-semibold text-center text-foreground group-hover:text-primary transition-colors duration-300">
                  {hobby.name}
                </span>
                <p className="text-muted-foreground text-center text-sm">
                  {hobby.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hobbies;
