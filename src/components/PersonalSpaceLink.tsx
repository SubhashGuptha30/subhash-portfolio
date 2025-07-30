import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
const PersonalSpaceLink = () => {
  return (
    <section id="personal-space-link" className="py-20 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className="text-4xl font-bold mb-4 text-foreground relative glitch"
          data-text="Beyond the Code"
        >
          Beyond the Code
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Step into my personal space to see what I'm passionate about outside
          of technology.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-md transition-all duration-300 hover:scale-105"
        >
          <Link to="/personal-space">
            <Sparkles className="mr-2 h-5 w-5" />
            Explore My Personal Space
          </Link>
        </Button>
      </div>
    </section>
  );
};
export default PersonalSpaceLink;
