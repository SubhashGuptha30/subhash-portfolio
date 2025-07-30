import {
  ExternalLink,
  Sparkles,
  Palette,
  BookOpen,
  FileText,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { creativeWorks } from "@/data/creativeWorks";

const CreativeGallery = () => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "script":
        return FileText;
      case "poetry":
        return BookOpen;
      case "story":
        return Palette;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="creative" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Palette className="w-10 h-10 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Creative Gallery
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A glimpse into my creative side.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creativeWorks.map((work, index) => {
            const TypeIcon = getTypeIcon(work.type);

            const CardComponent = () => (
              <Card className="bg-card border border-primary/30 overflow-hidden group hover:border-primary transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

                    <div className="absolute top-4 right-4">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                        <TypeIcon className="w-4 h-4" />
                        {work.type}
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-primary flex items-center justify-between">
                      <span>{work.title}</span>
                      {work.link && (
                        <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground pt-2">
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
                className="block transform transition-transform duration-300 hover:-translate-y-1"
                aria-label={`View ${work.title}`}
              >
                <CardComponent />
              </a>
            ) : (
              <div
                key={index}
                className="transform transition-transform duration-300 hover:-translate-y-1"
              >
                <CardComponent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CreativeGallery;
