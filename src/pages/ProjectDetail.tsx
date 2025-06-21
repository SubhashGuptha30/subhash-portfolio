import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = parseInt(id || "0");
  const project = projects[projectIndex];

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

  const otherProjects = projects.filter((_, index) => index !== projectIndex);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Back Button */}
      <header className="bg-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Button asChild variant="ghost" className="group">
            <Link
              to="/"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Project Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {project.title}
        </h1>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Project Description */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
                About This Project
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Right: Project Image, Tech Stack, GitHub Link */}
          <div className="space-y-6">
            {/* Project Main Image */}
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Technologies Used */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub Link */}
            {project.link && (
              <div>
                <Button
                  asChild
                  className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 w-full"
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
              </div>
            )}
          </div>
        </div>

        {/* Project Images Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
            Project Gallery
          </h2>
          <div className="relative">
            <div className="columns-1 gap-5 space-y-4">
              {Object.keys(project)
                .filter((key) => key.startsWith("projectImage"))
                .sort((a, b) => {
                  // Sort by the number after 'projectImage'
                  const numA = parseInt(a.replace("projectImage", ""), 10);
                  const numB = parseInt(b.replace("projectImage", ""), 10);
                  return numA - numB;
                })
                .map((key, idx) => (
                  <div
                    key={key}
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center bg-gray-800"
                  >
                    <img
                      src={project[key]}
                      alt={`${project.title} - Image ${idx + 1}`}
                      className="w-full h-auto rounded-xl transition-all duration-700"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* More Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
            View More Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((otherProject, index) => {
              const originalIndex = projects.findIndex(
                (p) => p.title === otherProject.title
              );
              return (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 text-white group hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/project/${originalIndex}`)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={otherProject.image}
                      alt={otherProject.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300">
                      {otherProject.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {otherProject.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
