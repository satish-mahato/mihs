import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingFile, setEditingFile] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [uploadType, setUploadType] = useState("file");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    loadFiles(currentPage);
  }, [currentPage]);

  const loadFiles = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/get-files?page=${page}`
      );
      setFiles(data.files);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (category, id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/delete-file/${category}/${id}`
      );
      loadFiles(currentPage);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleEdit = async (category, id) => {
    try {
      await axios.put(`http://localhost:5000/api/edit-file/${category}/${id}`, {
        title: newTitle,
      });
      setEditingFile(null);
      loadFiles(currentPage);
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("category", e.target.category.value);

    if (uploadType === "file") {
      formData.append("file", e.target.file.files[0]);
    } else {
      formData.append("image", e.target.image.files[0]);
    }

    setUploadError(null);
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      loadFiles(currentPage);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (file) => {
    console.log("File being viewed:", file);

    // Determine the file type based on the category or file extension
    const fileType = file.fileUrl.endsWith(".pdf") ? "pdf" : "image";

    if (fileType === "pdf") {
      setSelectedPdf(file.fileUrl);
      setModalContent(null); // Clear any previous content
    } else {
      setSelectedPdf(null);
      setModalContent({ url: file.fileUrl, type: "image" }); // Set modal content for non-PDF files
    }

    setModalVisible(true); // Show the modal
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPdf(null);
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        File Dashboard
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-lg mx-auto"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upload a New File
        </h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Enter the title"
            className="p-2 border rounded w-full mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium">
            Category
          </label>
          <input
            name="category"
            type="text"
            placeholder="Enter category"
            className="p-2 border rounded w-full mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <p className="font-medium text-gray-700">
            Choose file type to upload:
          </p>
          <label className="mr-4">
            <input
              type="radio"
              name="uploadType"
              value="file"
              checked={uploadType === "file"}
              onChange={() => setUploadType("file")}
              className="mr-2"
            />
            File
          </label>
          <label>
            <input
              type="radio"
              name="uploadType"
              value="image"
              checked={uploadType === "image"}
              onChange={() => setUploadType("image")}
              className="mr-2"
            />
            Image
          </label>
        </div>
        <div className="mb-4">
          <input
            name={uploadType}
            type="file"
            className="p-2 border rounded w-full"
            required
          />
        </div>
        {loading && (
          <div className="text-center text-blue-500">Uploading...</div>
        )}
        {uploadError && <div className="text-red-500">{uploadError}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-full w-full mt-4"
        >
          Upload
        </button>
      </form>

      {/* File Table */}
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">File URL</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id} className="border-b hover:bg-gray-100">
              <td className="p-4">
                {editingFile === file._id ? (
                  <input
                    type="text"
                    defaultValue={file.title}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border rounded px-2"
                  />
                ) : (
                  file.title
                )}
              </td>
              <td className="p-4">{file.category}</td>
              <td className="p-4">
                <button
                  onClick={() => handleView(file)}
                  className="text-blue-500 underline"
                >
                  View
                </button>
              </td>
              <td className="p-4 flex items-center space-x-2">
                {editingFile === file._id ? (
                  <button
                    onClick={() =>
                      handleEdit(file.category, file._id, newTitle)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingFile(file._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(file.category, file._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded mr-2"
        >
          Previous
        </button>
        <span className="text-gray-700 px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded ml-2"
        >
          Next
        </button>
      </div>

      {/* Modal for Viewing Files */}
      {modalVisible && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={handleCloseModal}
  >
    <div
      className="bg-white p-4 rounded-lg relative max-w-xl w-full overflow-hidden"
      onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
    >
      {/* Close Button */}
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 z-50 hover:bg-red-600 transition duration-300"
      >
        ✕
      </button>

      {selectedPdf ? (
        // PDF Viewer
        <div className="flex flex-col items-center">
          <div
            className="overflow-auto max-h-[70vh] w-full border rounded shadow-sm no-scrollbar"
          >
            <Document
              file={selectedPdf}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex justify-center"
            >
              <Page pageNumber={pageNumber} renderMode="canvas" />
            </Document>
          </div>
          <p className="mt-2 text-sm">
            Page {pageNumber} of {numPages}
          </p>
          {numPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  pageNumber <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                } transition duration-300`}
              >
                Previous Page
              </button>
              <button
                onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
                disabled={pageNumber >= numPages}
                className={`bg-blue-500 text-white px-4 py-2 rounded ml-2 ${
                  pageNumber >= numPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                } transition duration-300`}
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      ) : modalContent ? (
        // Image Viewer
        <div>
          {modalContent.type === "image" && (
            <img
              src={modalContent.url}
              alt="Preview"
              className="w-full rounded-lg shadow-md"
            />
          )}
        </div>
      ) : (
        // Fallback for No Content
        <p className="text-center text-gray-500">No content to display</p>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
