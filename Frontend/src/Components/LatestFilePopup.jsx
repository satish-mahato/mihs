import { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PopUpModal = ({
  file: propFile,
  open: propOpen,
  onClose: propOnClose,
}) => {
  const modalRef = useRef(null);
  const isControlled = propFile !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [latestNotice, setLatestNotice] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const basePath = "https://auth.sm12.com.np/files/";

  useEffect(() => {
    if (!isControlled) {
      const fetchLatestNotice = async () => {
        try {
          const response = await fetch(
            "https://auth.sm12.com.np/file/files-by-category/notice"
          );
          const data = await response.json();
          const allNotices = [...data.pdfs, ...data.images]
            .filter((notice) => notice.uploadTime)
            .sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));

          if (allNotices.length > 0) {
            const notice = allNotices[0];
            setLatestNotice(notice);
            setInternalIsOpen(true);
          }
        } catch (error) {
          console.error("Error fetching notices:", error);
        }
      };
      fetchLatestNotice();
    }
  }, [isControlled, setLatestNotice, setInternalIsOpen]);

  const selectedFile = isControlled
    ? propFile
    : latestNotice && {
        url: latestNotice.pdf
          ? `${basePath}${latestNotice.pdf}`
          : `${basePath}${latestNotice.image}`,
        type: latestNotice.pdf ? "pdf" : "image",
        title: latestNotice.title,
      };

  const isOpen = isControlled ? propOpen : internalIsOpen;

  const closeModal = useCallback(() => {
    isControlled ? propOnClose() : setInternalIsOpen(false);
    setImgLoaded(false);
    setImgError(false);
  }, [isControlled, propOnClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setIsLoading(false);
    setHasError(false);
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onPageLoadSuccess = (page) => {
    const viewport = page.getViewport({ scale: 1 });
    const maxWidth = window.innerWidth * 0.8;
    setPageWidth(Math.min(viewport.width, maxWidth));
  };

  useEffect(() => {
    setPageWidth(null);
  }, [pageNumber]);

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
    handleDownload(selectedFile.url, selectedFile.title || "document.pdf");
  };

  const handleImageDownload = () => {
    handleDownload(selectedFile.url, selectedFile.title || "image.jpg");
  };

  if (!isOpen || !selectedFile) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999] p-2 sm:p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden mx-2 sm:mx-4 w-fit max-w-[90vw]"
      >
        <div className="flex justify-between items-center p-3 sm:p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-base sm:text-xl font-semibold break-words max-w-[80%]">
            {selectedFile.title || "Notice"}
          </h2>
          <button
            onClick={closeModal}
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-2 sm:p-4">
          {selectedFile.type === "pdf" ? (
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div
                className="border-2 border-gray-100 rounded-xl bg-gray-50 relative min-h-[200px] sm:min-h-[300px]"
                style={{ width: pageWidth ? `${pageWidth}px` : "auto" }}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 sm:space-y-3 bg-gray-50/90">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-4 border-b-4 border-blue-600" />
                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                      Loading PDF...
                    </p>
                  </div>
                )}
                {hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 sm:space-y-3 p-2 sm:p-4 bg-white/90">
                    <XMarkIcon className="w-8 h-8 sm:w-12 sm:h-12 text-red-500" />
                    <p className="text-sm sm:text-base text-red-600 text-center font-medium">
                      Failed to load PDF. Please try again or download the file.
                    </p>
                  </div>
                )}

                <Document
                  file={selectedFile.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex justify-center p-4 sm:p-8">
                      <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-4 border-b-4 border-blue-600" />
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    width={pageWidth}
                    onLoadSuccess={onPageLoadSuccess}
                    className="w-full"
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </Document>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full">
                {numPages > 1 && (
                  <div className="flex items-center gap-3 sm:gap-4 bg-gray-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg">
                    <button
                      onClick={goToPrevPage}
                      disabled={pageNumber <= 1}
                      className="p-1 sm:p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                    </button>
                    <p className="text-sm sm:text-base text-gray-600 font-medium min-w-[80px] sm:min-w-[100px] text-center">
                      Page {pageNumber} of {numPages}
                    </p>
                    <button
                      onClick={goToNextPage}
                      disabled={pageNumber >= numPages}
                      className="p-1 sm:p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handlePdfDownload}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors font-medium shadow-sm text-sm sm:text-base"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="relative bg-gray-50 rounded-xl border-2 border-gray-100 max-h-[70vh]">
                {!imgLoaded && !imgError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 sm:space-y-3">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-4 border-b-4 border-blue-600" />
                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                      Loading Image...
                    </p>
                  </div>
                )}
                {imgError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 sm:space-y-3 p-2 sm:p-4 bg-white/90">
                    <XMarkIcon className="w-8 h-8 sm:w-12 sm:h-12 text-red-500" />
                    <p className="text-sm sm:text-base text-red-600 text-center font-medium">
                      Failed to load image. Please try again or download the file.
                    </p>
                  </div>
                )}
                <img
                  src={selectedFile.url}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg max-h-[70vh]"
                  onLoad={() => {
                    setImgLoaded(true);
                    setImgError(false);
                  }}
                  onError={() => {
                    setImgLoaded(false);
                    setImgError(true);
                  }}
                />
              </div>

              <button
                onClick={handleImageDownload}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors font-medium shadow-sm text-sm sm:text-base"
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

export default PopUpModal;
