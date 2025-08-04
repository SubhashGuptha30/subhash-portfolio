import React, { useState, useCallback, useEffect } from "react";
import { photoGallery } from "@/data/personal-space-data";
import { Camera, Images, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PhotoGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === null ? 0 : (prevIndex + 1) % photoGallery.length
      );
    }
  }, [selectedImageIndex]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === null
          ? 0
          : (prevIndex - 1 + photoGallery.length) % photoGallery.length
      );
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex, handleNext, handlePrev]);

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Camera className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">Photo Gallery</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Capturing moments through my lens
        </p>
      </div>

      <div className="relative">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {photoGallery.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className="break-inside-avoid group relative overflow-hidden rounded-lg border border-primary/30 hover:border-primary transition-all duration-300 cursor-pointer"
            >
              <img
                className="w-full h-auto rounded-lg transition-all duration-500 group-hover:scale-105"
                src={photo.src}
                alt={photo.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-sm font-medium">{photo.alt}</p>
              </div>
              <Images className="absolute top-4 right-4 w-5 h-5 text-foreground opacity-0 group-hover:opacity-70 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {selectedImageIndex !== null && (
        <Dialog
          open={selectedImageIndex !== null}
          onOpenChange={() => setSelectedImageIndex(null)}
        >
          <DialogContent className="max-w-5xl w-full h-[90vh] bg-background/80 backdrop-blur-sm border-primary/30 p-2 flex items-center justify-center">
            <img
              src={photoGallery[selectedImageIndex].src}
              alt={photoGallery[selectedImageIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/50 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm">
              {photoGallery[selectedImageIndex].alt}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
            >
              <ArrowRight />
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default PhotoGallery;
