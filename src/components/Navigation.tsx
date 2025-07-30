import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = ({
  activeSection,
  onSectionClick,
}: {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-primary/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary text-flicker">
          Subhash.dev<span className="animate-blink">_</span>
        </Link>

        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-foreground hover:text-primary focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Navigation Links */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm border-t border-primary/20">
            <ul className="flex flex-col p-4 space-y-2">
              {[
                "home",
                "about",
                "languages",
                "portfolio",
                "skills",
                "certificates",
                "contact",
              ].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={() => {
                      onSectionClick(section);
                      closeMenu();
                    }}
                    className={`block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded transition-colors duration-200 ${
                      activeSection === section ? "text-primary bg-accent" : ""
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
