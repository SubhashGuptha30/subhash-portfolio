import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-muted-foreground">
        <p>© 2024 Subhash Guptha Gantasala. Built with passion and code.</p>
        <div className="mt-4">
          <Link
            to="/documentation"
            className="hover:text-primary transition-colors"
          >
            Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
