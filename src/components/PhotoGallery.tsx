import { photoGallery } from "@/data/personal-space-data";
import { Camera, Images } from "lucide-react";

const PhotoGallery = () => (
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
            className="break-inside-avoid group relative overflow-hidden rounded-lg border border-primary/30 hover:border-primary transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
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
  </section>
);

export default PhotoGallery;
