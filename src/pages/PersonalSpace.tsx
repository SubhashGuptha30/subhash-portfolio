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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-30 animation-delay-2000"></div>
      </div>

      <header className="relative py-8 px-6 max-w-7xl mx-auto">
        <Button asChild variant="ghost" className="group">
          <Link
            to="/subhash-portfolio"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Portfolio
          </Link>
        </Button>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Personal Space
            </h1>
            <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A glimpse into my world beyond programming — where creativity meets
            passion.
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Content Sections with staggered animations */}
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
