import { useState, useEffect } from "react";

interface LoaderProps {
  message?: string;
  showProgress?: boolean;
}

const Loader = ({ message = "Loading", showProgress = true }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    let progressInterval: NodeJS.Timeout;
    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }

    return () => {
      clearInterval(dotsInterval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [showProgress]);

  const progressBarLength = 20;
  const filledLength = Math.round((progressBarLength * progress) / 100);
  const emptyLength = progressBarLength - filledLength;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center font-mono text-foreground">
      <div className="relative z-10 text-center p-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {message}
            {dots}
            <span className="animate-blink">_</span>
          </h2>
          <p className="text-muted-foreground">Initializing system...</p>
        </div>

        {showProgress && (
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center justify-center text-lg">
              <span className="text-primary">[</span>
              <span className="text-primary">{"#".repeat(filledLength)}</span>
              <span className="text-muted-foreground">
                {"-".repeat(emptyLength)}
              </span>
              <span className="text-primary">]</span>
              <span className="ml-4 text-foreground">{progress}%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {progress < 30
                ? "Booting up..."
                : progress < 70
                ? "Loading assets..."
                : "Finalizing..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
