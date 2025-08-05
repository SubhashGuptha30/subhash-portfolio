import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import PersonalSpace from "./pages/PersonalSpace";
import ProjectDetail from "./pages/ProjectDetail";
import Documentation from "./pages/Documentation";
import { incrementViews, getViews } from "./integrations/firebase/client";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await incrementViews();
      await getViews(); // This ensures we have a connection and initial data
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <Loader message="Initializing" showProgress={true} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/personal-space" element={<PersonalSpace />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/documentation" element={<Documentation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THIS LINE */}

            {/* Catch-all route for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
