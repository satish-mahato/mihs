import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestFilePopup = ({ category, onClose }) => {
  const [latestPdf, setLatestPdf] = useState(null);
  const [latestImage, setLatestImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/files-by-category/${category}`
        );
        const pdfData = response.data.pdfData;
        const imageData = response.data.imageData;

        // Get the latest items
        setLatestPdf(pdfData[pdfData.length - 1]);
        setLatestImage(imageData[imageData.length - 1]);

        // Auto-close the popup after 5 seconds
        setTimeout(onClose, 5000);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setTimeout(onClose, 5000); // Close even on error
      }
    };

    fetchData();
  }, [category, onClose]);

  if (!latestPdf && !latestImage && !error) return null; // Don't show anything until data is loaded

  return (
    <div className="fixed bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-sm z-50">
      <div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Latest Files</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {latestPdf && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Latest PDF</h3>
            <p className="text-sm text-gray-600">{latestPdf.name}</p>
            <a
              href={latestPdf.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm hover:underline"
            >
              View PDF
            </a>
          </div>
        )}

        {latestImage && (
          <div>
            <h3 className="font-semibold text-gray-700">Latest Image</h3>
            <p className="text-sm text-gray-600">{latestImage.title}</p>
            <a
              href={latestImage.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 text-sm hover:underline"
            >
              View Image
            </a>
          </div>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ✖
      </button>
    </div>
  );
};

export default LatestFilePopup;
