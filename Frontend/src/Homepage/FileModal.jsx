import { Document, Page } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const FileModal = ({ modalContent, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const onDocumentLoadSuccess = async ({ numPages }) => {
    setIsLoading(false);
    setHasError(false);
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
    setIsLoading(false);
    setHasError(true);
  };

  const goToPrevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const goToNextPage = () => setPageNumber((p) => Math.min(numPages, p + 1));

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handlePdfDownload = () => {
    handleDownload(modalContent.url, modalContent.title || "document.pdf");
  };

  const handleImageDownload = () => {
    handleDownload(modalContent.url, modalContent.title || "image.jpg");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-2 sm:p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl flex flex-col w-full mx-2 sm:mx-4 max-w-[95vw] sm:max-w-4xl overflow-hidden"
        style={{
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b">
          <h2 className="text-sm sm:text-base font-medium text-gray-800 break-words max-w-[75%]">
            {modalContent.title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          {modalContent.type === "pdf" ? (
            <div className="flex flex-col items-center space-y-2 sm:space-y-4">
              <div
                ref={containerRef}
                className="border-2 border-gray-100 rounded-lg w-full overflow-auto bg-gray-50 relative"
                style={{ minHeight: "50vh" }}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-gray-50/90">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-blue-600" />
                    <p className="text-sm text-gray-600 font-medium">Loading PDF...</p>
                  </div>
                )}
                {hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 p-2 bg-white/90">
                    <XMarkIcon className="w-8 h-8 text-red-500" />
                    <p className="text-red-600 text-center text-sm font-medium">
                      Failed to load PDF. Please try again or download the file.
                    </p>
                  </div>
                )}
                <Document
                  file={modalContent.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex justify-center p-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-blue-600" />
                    </div>
                  }
                >
                  {containerWidth > 0 && (
                    <Page
                      key={`page-${containerWidth}`}
                      pageNumber={pageNumber}
                      width={containerWidth}
                      className="w-full"
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  )}
                </Document>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
                {numPages > 1 && (
                  <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg">
                    <button
                      onClick={goToPrevPage}
                      disabled={pageNumber <= 1}
                      className="p-1 sm:p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                    </button>
                    <p className="text-sm sm:text-base text-gray-600 font-medium min-w-[80px] sm:min-w-[100px] text-center">
                      Page {pageNumber} of {numPages}
                    </p>
                    <button
                      onClick={goToNextPage}
                      disabled={pageNumber >= numPages}
                      className="p-1 sm:p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowRightIcon className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                )}
                <button
                  onClick={handlePdfDownload}
                  className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base shadow-sm"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 sm:space-y-4">
              <div className="relative w-full bg-gray-50 rounded-lg border-2 border-gray-100">
                {!imgLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-blue-600" />
                    <p className="text-sm text-gray-600 font-medium">
                      Loading Image...
                    </p>
                  </div>
                )}
                <img
                  src={modalContent.url}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(false)}
                />
              </div>
              <button
                onClick={handleImageDownload}
                className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base shadow-sm"
              >
                <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download Image</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileModal;