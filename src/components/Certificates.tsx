import { useState, useEffect } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  Award,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { certificates } from "@/data/certificates";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<
    (typeof certificates)[0] | null
  >(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleCertificateClick = (certificate: (typeof certificates)[0]) => {
    setSelectedCertificate(certificate);
    setZoomLevel(1);
  };

  const handleClose = () => {
    setSelectedCertificate(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleNavigate = (direction: "next" | "prev") => {
    if (!selectedCertificate) return;
    const currentIndex = certificates.findIndex(
      (c) => c.id === selectedCertificate.id
    );
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % certificates.length;
    } else {
      nextIndex =
        (currentIndex - 1 + certificates.length) % certificates.length;
    }
    setSelectedCertificate(certificates[nextIndex]);
    setZoomLevel(1);
  };

  const handleDownload = () => {
    if (!selectedCertificate) return;
    const link = document.createElement("a");
    link.href = selectedCertificate.image;
    link.download = `${selectedCertificate.title.replace(/\s+/g, "_")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCertificate) return;
      if (e.key === "ArrowLeft") {
        handleNavigate("prev");
      } else if (e.key === "ArrowRight") {
        handleNavigate("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <section id="certificates" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold">Certificates</h2>
          </div>
          <p className="text-xl text-gray-300">
            My professional certifications and achievements
          </p>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-6 min-w-max">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="relative group overflow-hidden rounded-lg cursor-pointer w-80 h-48 flex-shrink-0 shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300"
                onClick={() => handleCertificateClick(certificate)}
              >
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/70 transition-colors duration-300" />
                <div className="relative h-full flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {certificate.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={!!selectedCertificate}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose();
        }}
      >
        <DialogContent className="max-w-5xl w-full h-[95vh] flex flex-col p-0 bg-gray-900 border-gray-700 text-white">
          {selectedCertificate && (
            <TooltipProvider>
              <div className="flex items-center justify-between p-3 border-b border-gray-700 flex-shrink-0">
                <h3
                  className="text-lg font-semibold ml-2 truncate"
                  title={selectedCertificate.title}
                >
                  {selectedCertificate.title}
                </h3>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleNavigate("prev")}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Previous (Left Arrow)</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleNavigate("next")}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Next (Right Arrow)</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="w-[1px] h-6 bg-gray-700 mx-2"></div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.5}
                      >
                        <ZoomOut className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zoom Out</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleResetZoom}
                        disabled={zoomLevel === 1}
                      >
                        <RotateCcw className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset Zoom</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                      >
                        <ZoomIn className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zoom In</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="w-[1px] h-6 bg-gray-700 mx-2"></div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDownload}
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="w-[1px] h-6 bg-gray-700 mx-2"></div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={handleClose}>
                        <X className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Close (Esc)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 flex justify-center items-center bg-gray-800/50">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-full h-auto transition-transform duration-300 shadow-2xl"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </TooltipProvider>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certificates;
