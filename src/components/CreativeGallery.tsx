import React, { useState } from "react";
import {
  ExternalLink,
  Sparkles,
  Palette,
  BookOpen,
  FileText,
  X,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { creativeWorks } from "@/data/creativeWorks";

const CreativeGallery = () => {
  const [selectedWork, setSelectedWork] = useState<
    (typeof creativeWorks)[0] | null
  >(null);

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

  const handleCardClick = (work: (typeof creativeWorks)[0]) => {
    if (work.link) {
      window.open(work.link, "_blank", "noopener noreferrer");
    } else {
      setSelectedWork(work);
    }
  };

  const CardComponent = ({ work }: { work: (typeof creativeWorks)[0] }) => {
    const TypeIcon = getTypeIcon(work.type);
    return (
      <Card
        onClick={() => handleCardClick(work)}
        className="bg-card border border-primary/30 overflow-hidden group hover:border-primary transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
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
          <CardHeader className="flex-grow">
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
            A collection of my scripts, stories, and poems.
          </p>
        </div>

        <div className="[column-count:1] md:[column-count:2] lg:[column-count:3] gap-8 space-y-8">
          {creativeWorks.map((work, index) => (
            <div
              key={index}
              className="break-inside-avoid transform transition-transform duration-300 hover:-translate-y-1"
            >
              <CardComponent work={work} />
            </div>
          ))}
        </div>
      </div>

      {selectedWork && (
        <Dialog
          open={!!selectedWork}
          onOpenChange={() => setSelectedWork(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedWork.title}</DialogTitle>
              <DialogDescription>{selectedWork.type}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <img
                src={selectedWork.image}
                alt={selectedWork.title}
                className="w-full h-auto object-contain rounded-lg max-h-[60vh]"
              />
              <p className="text-muted-foreground mt-4">
                {selectedWork.description}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedWork(null)} variant="outline">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default CreativeGallery;
