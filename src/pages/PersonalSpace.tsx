import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreativeGallery from "@/components/CreativeGallery";
import PhotoGallery from "@/components/PhotoGallery";
import Watchlist from "@/components/Watchlist";
import Hobbies from "@/components/Hobbies";
import Footer from "@/components/Footer";

const PersonalSpace = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="animated-soft-gradient-background"></div>
      <header className="py-8 px-6 max-w-7xl mx-auto relative z-10">
        <Button asChild variant="ghost" className="group">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Portfolio
          </Link>
        </Button>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl md:text-7xl font-bold text-primary">
              Personal Space
            </h1>
            <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-primary/80 animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A glimpse into my world beyond programming — where creativity meets
            passion.
          </p>
          <div className="mt-8 w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-24">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CreativeGallery />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <PhotoGallery />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Watchlist />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Hobbies />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PersonalSpace;
