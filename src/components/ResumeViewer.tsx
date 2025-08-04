import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Loader2 } from "lucide-react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface ResumeViewerProps {
  pdfUrl: string;
  children: React.ReactNode;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ pdfUrl, children }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const [loadError, setLoadError] = useState<Error | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoadError(null);
    console.log(`PDF loaded successfully with ${numPages} pages.`);
  }

  function onDocumentLoadError(error: Error): void {
    console.error("Failed to load PDF file:", error);
    setLoadError(error);
  }

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setScale(1.0);

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setNumPages(null);
          setLoadError(null);
          setScale(1.0);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="flex items-center justify-between">
            Resume
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
                <span className="sr-only">Zoom Out</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleResetZoom}
                disabled={scale === 1.0}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Reset Zoom</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                disabled={scale >= 2.5}
              >
                <ZoomIn className="h-4 w-4" />
                <span className="sr-only">Zoom In</span>
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            A dialog showing the resume PDF with controls to zoom in, zoom out,
            and reset zoom.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex flex-col justify-center items-center h-full text-gray-500 dark:text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                <p className="mt-2 text-sm">Loading Resume...</p>
              </div>
            }
            error={
              <div className="flex flex-col justify-center items-center h-full text-red-500 p-4 text-center">
                <p className="font-semibold">Failed to load PDF</p>
                <p className="text-xs">
                  Please check the console for more details.
                </p>
                {loadError && (
                  <pre className="text-xs mt-2 text-left bg-red-50 dark:bg-red-900/20 p-2 rounded w-full overflow-auto">
                    {loadError.message}
                  </pre>
                )}
              </div>
            }
            className="flex justify-center py-4"
          >
            {numPages && !loadError ? (
              <div>
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_${index + 1}`} className="mb-4 last:mb-0">
                    <Page
                      pageNumber={index + 1}
                      scale={scale}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      className="shadow-lg"
                      loading={
                        <div
                          style={{ height: 1188 * scale, width: 840 * scale }}
                          className="flex justify-center items-center bg-white dark:bg-gray-800"
                        >
                          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeViewer;
