// FileModal.js
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

  const onDocumentLoadSuccess = ({ numPages }) => {
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
    handleDownload(
      modalContent.url,
      modalContent.title || "document.pdf"
    );
  };

  const handleImageDownload = () => {
    handleDownload(
      modalContent.url,
      modalContent.title || "image.jpg"
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl flex flex-col max-w-4xl w-full h-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words max-w-full sm:max-w-[70%]">
            {modalContent.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {modalContent.type === "pdf" ? (
            <div className="flex flex-col items-center space-y-4">
              <div
                ref={containerRef}
                className="border-2 border-gray-100 rounded-xl w-full overflow-auto bg-gray-50 relative"
                style={{ minHeight: "300px" }}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-gray-50/90">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600" />
                    <p className="text-gray-600 font-medium">Loading PDF...</p>
                  </div>
                )}

                {hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-4 bg-white/90">
                    <XMarkIcon className="w-12 h-12 text-red-500" />
                    <p className="text-red-600 text-center font-medium">
                      Failed to load PDF. Please try again or download the file.
                    </p>
                  </div>
                )}

                <Document
                  file={modalContent.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600" />
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

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                {numPages > 1 && (
                  <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
                    <button
                      onClick={goToPrevPage}
                      disabled={pageNumber <= 1}
                      className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                    </button>
                    <p className="text-gray-600 font-medium min-w-[100px] text-center">
                      Page {pageNumber} of {numPages}
                    </p>
                    <button
                      onClick={goToNextPage}
                      disabled={pageNumber >= numPages}
                      className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowRightIcon className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handlePdfDownload}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-sm"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full bg-gray-50 rounded-xl border-2 border-gray-100">
                {!imgLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600" />
                    <p className="text-gray-600 font-medium">
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-sm"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
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