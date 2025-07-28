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
  Share2,
  Calendar,
  Building,
  Filter,
  Search,
  ExternalLink,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { certificates } from "@/data/certificates";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<
    (typeof certificates)[0] | null
  >(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique certification types for filtering
  const certificationTypes = Array.from(
    new Set(certificates.map((cert) => cert.subTitle))
  );

  // Filter and sort certificates
  const filteredCertificates = certificates
    .filter((certificate) => {
      const matchesSearch =
        certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.certifiedBy
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterBy === "all" || certificate.subTitle === filterBy;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

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
    const currentIndex = filteredCertificates.findIndex(
      (c) => c.id === selectedCertificate.id
    );
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % filteredCertificates.length;
    } else {
      nextIndex =
        (currentIndex - 1 + filteredCertificates.length) %
        filteredCertificates.length;
    }
    setSelectedCertificate(filteredCertificates[nextIndex]);
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

  const handleShare = async () => {
    if (!selectedCertificate) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedCertificate.title,
          text: `${selectedCertificate.title} - ${selectedCertificate.certifiedBy}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      const text = `${selectedCertificate.title} - ${selectedCertificate.certifiedBy}`;
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCertificateStatus = (dateString: string) => {
    const certificateDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - certificateDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 0) {
      return {
        status: "upcoming",
        text: "Upcoming",
        icon: Clock,
        color: "text-yellow-400",
      };
    } else if (diffInDays <= 365) {
      return {
        status: "recent",
        text: "Recent",
        icon: CheckCircle,
        color: "text-green-400",
      };
    } else {
      return {
        status: "valid",
        text: "Valid",
        icon: CheckCircle,
        color: "text-cyan-400",
      };
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCertificate) return;
      if (e.key === "ArrowLeft") {
        handleNavigate("prev");
      } else if (e.key === "ArrowRight") {
        handleNavigate("next");
      } else if (e.key === "Escape") {
        handleClose();
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

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Types</SelectItem>
                  {certificationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="date">By Date</SelectItem>
                  <SelectItem value="name">By Name</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-gray-600 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none bg-gray-700 hover:bg-gray-600 text-white"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredCertificates.length} of {certificates.length}{" "}
            certificates
          </div>
        </div>

        {/* Certificates Display */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No certificates found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => {
              const status = getCertificateStatus(certificate.date);
              const StatusIcon = status.icon;

              return (
                <div
                  key={certificate.id}
                  className="group relative bg-gray-700 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
                  onClick={() => handleCertificateClick(certificate)}
                >
                  {/* Certificate Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <div className="bg-cyan-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                        {certificate.subTitle}
                      </div>
                      <div
                        className={`bg-gray-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${status.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {status.text}
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {certificate.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-cyan-400" />
                        <span className="truncate">
                          {certificate.certifiedBy}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>{formatDate(certificate.date)}</span>
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Award className="w-6 h-6 text-black" />
                        </div>
                        <p className="text-white font-medium">
                          View Certificate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCertificates.map((certificate) => {
              const status = getCertificateStatus(certificate.date);
              const StatusIcon = status.icon;

              return (
                <div
                  key={certificate.id}
                  className="group bg-gray-700 rounded-lg p-4 cursor-pointer shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => handleCertificateClick(certificate)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-16 flex-shrink-0">
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {certificate.title}
                        </h3>
                        <div className="flex gap-2 flex-shrink-0">
                          <div className="bg-cyan-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                            {certificate.subTitle}
                          </div>
                          <div
                            className={`bg-gray-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${status.color}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {status.text}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4 text-cyan-400" />
                          {certificate.certifiedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          {formatDate(certificate.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Certificate Viewer Dialog */}
      <Dialog
        open={!!selectedCertificate}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose();
        }}
      >
        <DialogContent className="max-w-5xl w-full h-[95vh] flex flex-col p-0 bg-gray-900 border-gray-700 text-white">
          {selectedCertificate && (
            <TooltipProvider>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">
                    {selectedCertificate.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {selectedCertificate.certifiedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedCertificate.date)}
                    </span>
                    <span
                      className={`flex items-center gap-1 ${
                        getCertificateStatus(selectedCertificate.date).color
                      }`}
                    >
                      {(() => {
                        const StatusIcon = getCertificateStatus(
                          selectedCertificate.date
                        ).icon;
                        return <StatusIcon className="w-4 h-4" />;
                      })()}
                      {getCertificateStatus(selectedCertificate.date).text}
                    </span>
                  </div>
                </div>

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
                      <Button variant="ghost" size="icon" onClick={handleShare}>
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share Certificate</p>
                    </TooltipContent>
                  </Tooltip>
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

              {/* Certificate Image */}
              <div className="flex-1 overflow-auto p-4 flex justify-center items-center bg-gray-800/50">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-full h-auto transition-transform duration-300 shadow-2xl rounded-lg"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                  }}
                />
              </div>

              {/* Footer Info */}
              <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="bg-cyan-500 text-black px-2 py-1 rounded text-xs font-medium">
                      {selectedCertificate.subTitle}
                    </span>
                    <span className="text-gray-400">
                      Certificate ID: {selectedCertificate.id}
                    </span>
                  </div>
                  <span className="text-gray-400">
                    {Math.round(zoomLevel * 100)}% zoom
                  </span>
                </div>
              </div>
            </TooltipProvider>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certificates;
