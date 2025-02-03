import { Document, Page } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const FileModal = ({ modalContent, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const modalRef = useRef(null);

  // Handle document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  // Navigation functions
  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-4 sm:p-6 rounded-lg max-w-3xl w-full relative shadow-lg mx-4 sm:mx-auto overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 z-50 hover:bg-red-600 transition duration-300"
        >
          ✕
        </button>

        {/* Content Rendering */}
        {modalContent.type === "pdf" ? (
          <div className="flex flex-col items-center">
            <Document
              file={modalContent.url}
              onLoadSuccess={onDocumentLoadSuccess}
              className="border w-full max-h-[80vh] overflow-auto"
            >
              <Page
                pageNumber={pageNumber}
                className="w-full"
                width={Math.min(window.innerWidth * 0.9, 600)} // Responsive width
                scale={window.innerWidth < 640 ? 0.7 : 1} // Scale down for smaller screens
              />
            </Document>
            {/* Navigation Controls */}
            {numPages > 1 && (
              <div className="mt-4 flex items-center justify-center space-x-2 sm:space-x-4 text-sm sm:text-base">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <p className="text-center">
                  Page {pageNumber} of {numPages}
                </p>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={modalContent.url}
              alt="Image Preview"
              className="max-w-full max-h-[80vh] rounded object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileModal;