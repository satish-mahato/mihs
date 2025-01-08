import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [uploadType, setUploadType] = useState("file");

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ url: "", type: "" });
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/get-files");
      setFiles([...data.pdfData, ...data.imageData]);
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
      loadFiles();
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
      loadFiles();
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

    setUploadError(null); // Reset error message on new upload attempt
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      loadFiles();
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (url, type) => {
    setModalContent({ url, type });
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent({ url: "", type: "" });
    setPageNumber(1); // Reset page number when closing modal
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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

        {/* Radio buttons for file type */}
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

        {/* Conditional file input */}
        <div className="mb-4">
          {uploadType === "file" ? (
            <input
              name="file"
              type="file"
              className="p-2 border rounded w-full"
            />
          ) : (
            <input
              name="image"
              type="file"
              className="p-2 border rounded w-full"
            />
          )}
        </div>

        {/* Displaying loading state and error message */}
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

      {/* Files Table */}
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
                  onClick={() => handleView(file.fileUrl, file.type)}
                  className="text-blue-500 underline"
                >
                  View
                </button>
              </td>
              <td className="p-4 flex items-center space-x-2">
                {editingFile === file._id ? (
                  <button
                    onClick={() => handleEdit(file.category, file._id)}
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

      {/* Modal for Viewing PDF or Image */}
      {modalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div className="bg-white p-8 rounded-lg relative max-w-4xl w-full">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
            >
              X
            </button>

            {/* Render PDF */}
            {modalContent.type === "pdf" ? (
              <div>
                <Document
                  file={modalContent.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
                <button
                  onClick={() => setPageNumber(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPageNumber(pageNumber + 1)}
                  disabled={pageNumber >= numPages}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4"
                >
                  Next
                </button>
              </div>
            ) : (
              <img
                src={modalContent.url}
                alt="File Preview"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
