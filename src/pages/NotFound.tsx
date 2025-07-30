import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      `404 Error: User attempted to access non-existent route: ${location.pathname}`
    );
  }, [location.pathname]);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background font-mono text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-3xl border-2 border-destructive/50 bg-card p-8 rounded-lg shadow-lg shadow-destructive/10">
        <div className="text-center mb-6">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto animate-pulse" />
          <h1 className="text-6xl font-bold text-destructive mt-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mt-2">
            COMMAND NOT FOUND
          </h2>
        </div>

        <div className="bg-input p-4 rounded-md text-left text-sm space-y-2">
          <p>
            <span className="text-primary">user@subhash.dev</span>
            <span className="text-muted-foreground">:~$</span>
            <span className="text-foreground"> cd {location.pathname}</span>
          </p>
          <p className="text-destructive">
            bash: cd: {location.pathname}: No such file or directory
          </p>
          <p>
            <span className="text-primary">user@subhash.dev</span>
            <span className="text-muted-foreground">:~$</span>
            <span className="animate-blink">_</span>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-6">
            The requested path could not be found. It might have been moved,
            deleted, or you may have mistyped the URL.
          </p>
          <Button
            onClick={handleBackToHome}
            className="bg-primary text-primary-foreground hover:bg-primary/80"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
