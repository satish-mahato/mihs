import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
Modal.setAppElement("#root"); // Replace '#root' with your app's root element ID

export default function FilesByCategory({ category }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  const [files, setFiles] = useState({ pdfData: [], imageData: [] });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Fetch files from the backend
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/files-by-category/${category}`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }

    fetchFiles();
  }, [category]);

  // React-PDF document load success handler
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // Reset to the first page
  }

  const openModal = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };

  return (
    <div>
      <h1>Files for Category: {category}</h1>

      {/* Display PDF URLs */}
      <div>
        <h2>PDF Files</h2>
        {files.pdfData.map((pdf) => (
          <div key={pdf._id}>
            <h3>{pdf.title}</h3>
            <p>
              PDF URL:{" "}
              <a href={pdf.fileUrl} target="_blank" rel="noopener noreferrer">
                {pdf.fileUrl}
              </a>
            </p>
            <button onClick={() => openModal(pdf.fileUrl)}>View PDF</button>
          </div>
        ))}
      </div>

      {/* Display Image URLs */}
      <div>
        <h2>Image Files</h2>
        {files.imageData.map((image) => (
          <div key={image._id}>
            <h3>{image.title}</h3>
            <p>
              Image URL:{" "}
              <a href={image.fileUrl} target="_blank" rel="noopener noreferrer">
                {image.fileUrl}
              </a>
            </p>
            <img src={image.fileUrl} alt={image.title} width="200" />
          </div>
        ))}
      </div>

      {/* PDF Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="PDF Viewer"
        style={{
          content: { width: "80%", height: "80%", margin: "auto" },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        }}
      >
        {selectedPdf && (
          <div>
            <button onClick={closeModal}>Close</button>
            <Document
              file={selectedPdf}
              onLoadSuccess={onDocumentLoadSuccess}
              style={{ textAlign: "center" }}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <button
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              >
                Previous Page
              </button>
              <button
                onClick={() =>
                  setPageNumber((prev) => Math.min(prev + 1, numPages))
                }
              >
                Next Page
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
