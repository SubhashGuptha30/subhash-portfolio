import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Share2,
  Download,
  Eye,
  Code,
  Calendar,
  Star,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = parseInt(id || "0");
  const project = projects[projectIndex];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const otherProjects = projects.filter((_, index) => index !== projectIndex);
  const projectImages = Object.keys(project)
    .filter((key) => key.startsWith("projectImage"))
    .sort((a, b) => {
      const numA = parseInt(a.replace("projectImage", ""), 10);
      const numB = parseInt(b.replace("projectImage", ""), 10);
      return numA - numB;
    })
    .map((key) => project[key]);

  const handleImageClick = (imageUrl: string, index: number) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const handleCloseImage = useCallback(() => {
    setSelectedImage(null);
    setIsFullscreen(false);
  }, []);

  const handleNavigateImage = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "next") {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
      } else {
        setCurrentImageIndex(
          (prev) => (prev - 1 + projectImages.length) % projectImages.length
        );
      }
    },
    [projectImages.length]
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      const text = `${project.title} - ${project.description}`;
      await navigator.clipboard.writeText(text);
    }
  };

  const getProjectComplexity = (techStack: string[]) => {
    if (techStack.length >= 5)
      return {
        level: "Advanced",
        color: "text-destructive",
        bg: "bg-destructive/20",
      };
    if (techStack.length >= 3)
      return {
        level: "Intermediate",
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
      };
    return {
      level: "Beginner",
      color: "text-primary",
      bg: "bg-primary/20",
    };
  };

  const complexity = getProjectComplexity(project.tech);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowLeft") {
        handleNavigateImage("prev");
      } else if (e.key === "ArrowRight") {
        handleNavigateImage("next");
      } else if (e.key === "Escape") {
        handleCloseImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, handleNavigateImage, handleCloseImage]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Button
            onClick={() => navigate("/")}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-background/80 backdrop-blur-sm py-4 px-6 sticky top-0 z-40 border-b border-primary/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="group">
              <Link
                to="/"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Portfolio
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share Project</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {project.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className={`${complexity.bg} ${complexity.color} px-3 py-1 rounded-full text-sm font-medium`}
            >
              {complexity.level} Level
            </div>
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {project.tech.length} Technologies
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
                <Code className="w-5 h-5" />
                About This Project
              </h2>
              <p className="text-foreground text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-primary/30">
                <CardContent className="p-4 text-center">
                  <Code className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.tech.length}
                  </h3>
                  <p className="text-muted-foreground text-sm">Technologies</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-primary/30">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {complexity.level}
                  </h3>
                  <p className="text-muted-foreground text-sm">Complexity</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-primary/30">
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Featured
                  </h3>
                  <p className="text-muted-foreground text-sm">Portfolio</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden border-2 border-primary/30">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary flex items-center gap-2">
                <Code className="w-5 h-5" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-accent text-accent-foreground px-4 py-2 rounded text-sm font-medium border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {project.link && (
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/80 text-primary-foreground w-full group"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleShare}
                className="border-primary text-primary hover:bg-primary/10 w-full group"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Project
              </Button>
            </div>
          </div>
        </div>

        {projectImages.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary flex items-center justify-center gap-2">
              <Eye className="w-6 h-6" />
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectImages.map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-lg overflow-hidden border border-primary/30 cursor-pointer"
                  onClick={() => handleImageClick(imageUrl, idx)}
                >
                  <img
                    src={imageUrl}
                    alt={`${project.title} - Image ${idx + 1}`}
                    className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/70 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">
            View More Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((otherProject, index) => {
              const originalIndex = projects.findIndex(
                (p) => p.title === otherProject.title
              );
              const otherComplexity = getProjectComplexity(otherProject.tech);

              return (
                <Card
                  key={index}
                  className="bg-card border-primary/30 text-foreground group hover:border-primary transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/project/${originalIndex}`)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={otherProject.image}
                      alt={otherProject.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <div
                        className={`${otherComplexity.bg} ${otherComplexity.color} text-xs px-2 py-1 rounded-full font-medium`}
                      >
                        {otherComplexity.level}
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary/80">
                      {otherProject.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {otherProject.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {otherProject.tech.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {otherProject.tech.length > 3 && (
                        <span className="bg-accent text-muted-foreground px-2 py-1 rounded text-xs font-medium">
                          +{otherProject.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {selectedImage && (
        <div className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseImage}
              className="absolute top-4 right-4 text-foreground hover:bg-accent z-10"
            >
              <X className="w-6 h-6" />
            </Button>

            {projectImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigateImage("prev")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground hover:bg-accent z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigateImage("next")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground hover:bg-accent z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            <img
              src={projectImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className={`max-w-full max-h-full object-contain transition-all duration-300 border-2 border-primary/50 ${
                isFullscreen ? "w-full h-full" : "rounded-lg"
              }`}
            />

            {projectImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/80 text-foreground px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {projectImages.length}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute bottom-4 right-4 text-foreground hover:bg-accent z-10"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
