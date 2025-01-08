import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.min.js";

const Dashboard = () => {
  const endpoint = "http://localhost:5000";
  const [pdfs, setPdfs] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/get-files`);
      setPdfs(
        response.data.pdfData.map((item) => ({
          ...item,
          fileUrl: item.fileUrl || `${endpoint}/files/${item.pdf}`,
        }))
      );

      setImages(response.data.imageData);
    } catch (error) {
      console.error("Error fetching files:", error);
      alert("Failed to fetch files. Please try again.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile && !selectedFile.type.includes("pdf")) {
      alert("Only PDF files are allowed!");
      return;
    }
    if (
      selectedImage &&
      !["image/png", "image/jpeg"].includes(selectedImage.type)
    ) {
      alert("Only PNG or JPG images are allowed!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (selectedFile) formData.append("file", selectedFile);
    if (selectedImage) formData.append("image", selectedImage);

    try {
      await axios.post(`${endpoint}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchFiles();
      setTitle("");
      setSelectedFile(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleDeleteFile = async (id) => {
    try {
      await axios.delete(`${endpoint}/api/delete-file/${id}`);
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Please try again.");
    }
  };

  const handleEditFile = async (id, newTitle) => {
    try {
      await axios.put(`${endpoint}/api/edit-file/${id}`, { title: newTitle });
      fetchFiles();
    } catch (error) {
      console.error("Error editing file:", error);
      alert("Failed to edit file. Please try again.");
    }
  };

  const openModal = (pdfUrl) => {
    if (pdfUrl) {
      setModalContent(pdfUrl);
      setShowModal(true);
    } else {
      alert("Failed to load PDF. Invalid URL.");
    }
  };

  const closeModal = () => {
    setModalContent(null);
    setShowModal(false);
    setNumPages(null);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < numPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <form className="mb-4" onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="block mb-2"
        />
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          className="block mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Upload
        </button>
      </form>
      <div>
        <h2 className="text-xl font-bold">PDF Files</h2>
        <ul>
          {pdfs.map((pdf) => (
            <li
              key={pdf._id}
              className="flex items-center justify-between border p-2 mb-2"
            >
              <span>{pdf.title}</span>
              <div>
                <button
                  onClick={() =>
                    handleEditFile(
                      pdf._id,
                      prompt("Enter new title:", pdf.title)
                    )
                  }
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFile(pdf._id)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => openModal(pdf.fileUrl)}
                  className="bg-green-500 text-white px-2 py-1"
                >
                  Show
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 w-3/4 h-3/4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1"
            >
              Close
            </button>
            {modalContent && (
              <div className="h-full overflow-y-auto">
                <Document
                  file={modalContent}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  onLoadError={(error) =>
                    console.error("PDF loading error:", error)
                  }
                >
                  <Page pageNumber={currentPage} />
                </Document>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 px-4 py-2"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {numPages}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === numPages}
                    className="bg-gray-300 px-4 py-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
