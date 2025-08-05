import { Link } from "react-router-dom";
import { Code } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-primary/20 py-12 bg-card">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Subhash Guptha
          </h3>
          <p className="text-muted-foreground text-sm">
            AI/ML Cloud Engineer & Full Stack Developer
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <Link
                to="/documentation"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Documentation
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Built With
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Code className="w-5 h-5" />
            <span>React, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-muted-foreground/50">
        <p>
          © {new Date().getFullYear()} Subhash Guptha Gantasala. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
