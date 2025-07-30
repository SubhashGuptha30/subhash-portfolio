import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { projects } from "@/data/projects";
import {
  ExternalLink,
  Folders,
  ArrowRight,
  Search,
  Filter,
  Grid3X3,
  List,
  Github,
  Calendar,
  Code,
  Star,
  Eye,
  Download,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Portfolio = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  // Get unique tech stacks for filtering
  const allTechStacks = projects.flatMap((project) => project.tech);
  const uniqueTechStacks = Array.from(new Set(allTechStacks));

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesFilter =
        filterBy === "all" || project.tech.includes(filterBy);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "tech") {
        return a.tech.length - b.tech.length;
      }
      return 0;
    });

  const handleCardClick = (index: number, link: string | null) => {
    navigate(`/project/${index}`);
  };

  const handleProjectPreview = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
  };

  const handleShare = async (project: (typeof projects)[0]) => {
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
        color: "text-yellow-400", // Keeping yellow for intermediate for now
        bg: "bg-yellow-500/20",
      };
    return {
      level: "Beginner",
      color: "text-primary",
      bg: "bg-primary/20",
    };
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4 flex items-center justify-center gap-4 text-foreground relative glitch"
            data-text="My Portfolio"
          >
            <Folders className="w-10 h-10 text-primary" />
            My Portfolio
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A collection of projects I've poured my heart and soul into.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-primary/30 text-foreground placeholder-muted-foreground"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40 bg-input border-primary/30 text-foreground">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by tech" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-primary/30 text-foreground">
                  <SelectItem value="all">All Technologies</SelectItem>
                  {uniqueTechStacks.map((tech) => (
                    <SelectItem key={tech} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-input border-primary/30 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-primary/30 text-foreground">
                  <SelectItem value="name">By Name</SelectItem>
                  <SelectItem value="tech">By Complexity</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-primary/30 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="w-4 h-4 mr-1" />
                  List
                </Button>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Display */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Folders className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const complexity = getProjectComplexity(project.tech);
              const originalIndex = projects.findIndex(
                (p) => p.title === project.title
              );

              return (
                <Card
                  key={index}
                  className="bg-card border-primary/30 text-foreground group h-96 flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 cursor-pointer relative overflow-hidden"
                  onClick={() => handleCardClick(originalIndex, project.link)}
                >
                  <div className="relative flex-1 overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                    {/* Project Badges */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <div
                        className={`${complexity.bg} ${complexity.color} text-xs px-2 py-1 rounded-full font-medium`}
                      >
                        {complexity.level}
                      </div>
                      <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
                        {project.tech.length} Tech
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                          <Eye className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <p className="text-foreground font-medium">
                          View Project
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0">
                    <CardTitle className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="bg-accent text-muted-foreground px-2 py-1 rounded text-xs font-medium border border-primary/20">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProjectPreview(project);
                              }}
                              className="flex-1 bg-accent hover:bg-accent/80 text-accent-foreground"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Quick Preview</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(project);
                              }}
                              className="bg-accent hover:bg-accent/80 text-accent-foreground"
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
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project, index) => {
              const complexity = getProjectComplexity(project.tech);
              const originalIndex = projects.findIndex(
                (p) => p.title === project.title
              );

              return (
                <Card
                  key={index}
                  className="bg-card border-primary/30 text-foreground group hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
                  onClick={() => handleCardClick(originalIndex, project.link)}
                >
                  <div className="flex items-center gap-6 p-6">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-background/40 rounded" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex gap-2 flex-shrink-0">
                          <div
                            className={`${complexity.bg} ${complexity.color} text-xs px-2 py-1 rounded-full font-medium`}
                          >
                            {complexity.level}
                          </div>
                          <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
                            {project.tech.length} Tech
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="bg-accent text-muted-foreground px-2 py-1 rounded text-xs font-medium border border-primary/20">
                              +{project.tech.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 ml-auto">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleProjectPreview(project);
                                  }}
                                  className="bg-accent hover:bg-accent/80 text-accent-foreground"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Quick Preview</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShare(project);
                                  }}
                                  className="bg-accent hover:bg-accent/80 text-accent-foreground"
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
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Preview Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-primary/50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {selectedProject.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </Button>
              </div>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-lg mb-4 border border-primary/20"
              />

              <p className="text-muted-foreground mb-4">
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const originalIndex = projects.findIndex(
                      (p) => p.title === selectedProject.title
                    );
                    navigate(`/project/${originalIndex}`);
                    setSelectedProject(null);
                  }}
                  className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Project
                </Button>
                {selectedProject.link && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
