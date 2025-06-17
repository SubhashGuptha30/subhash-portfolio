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
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          Subhash.dev
        </Link>

        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Navigation Links */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-700">
            <ul className="flex flex-col p-4 space-y-2">
              <li>
                <a
                  href="#home"
                  onClick={() => {
                    onSectionClick("home");
                    closeMenu();
                  }}
                  className={`block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors duration-300 ${
                    activeSection === "home" ? "text-cyan-400 bg-gray-800" : ""
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={() => {
                    onSectionClick("about");
                    closeMenu();
                  }}
                  className={`block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors duration-300 ${
                    activeSection === "about" ? "text-cyan-400 bg-gray-800" : ""
                  }`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#languages"
                  onClick={() => {
                    onSectionClick("languages");
                    closeMenu();
                  }}
                  className={`block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors duration-300 ${
                    activeSection === "languages"
                      ? "text-cyan-400 bg-gray-800"
                      : ""
                  }`}
                >
                  Languages
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={() => {
                    onSectionClick("portfolio");
                    closeMenu();
                  }}
                  className={`block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors duration-300 ${
                    activeSection === "portfolio"
                      ? "text-cyan-400 bg-gray-800"
                      : ""
                  }`}
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={() => {
                    onSectionClick("skills");
                    closeMenu();
                  }}
                  className={`block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors duration-300 ${
                    activeSection === "skills"
                      ? "text-cyan-400 bg-gray-800"
                      : ""
                  }`}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#certificates"
                  onClick={() => {
                    onSectionClick("certificates");
                    closeMenu();
                  }}
                  className={`block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors duration-300 ${
                    activeSection === "certificates"
                      ? "text-cyan-400 bg-gray-800"
                      : ""
                  }`}
                >
                  Certificates
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => {
                    onSectionClick("contact");
                    closeMenu();
                  }}
                  className={`block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors duration-300 ${
                    activeSection === "contact"
                      ? "text-cyan-400 bg-gray-800"
                      : ""
                  }`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
