import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInput, setFileInput] = useState([]);
  const [formData, setFormData] = useState({ title: "", date: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Base URL
  const API_BASE = "http://localhost:5000/api";

  // Fetch all gallery files
  const fetchGalleryFiles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/gallery`);
      setGalleryFiles(response.data.data || []);
    } catch (err) {
      console.error("Error fetching gallery files:", err);
      setError("Failed to fetch gallery files.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!formData.title || !formData.date || fileInput.length === 0) {
      alert("Please provide title, date, and select files to upload.");
      return;
    }

    const uploadFormData = new FormData();
    fileInput.forEach((file) => uploadFormData.append("files", file));
    uploadFormData.append("title", formData.title);
    uploadFormData.append("date", formData.date);

    setIsLoading(true);
    try {
      await axios.post(`${API_BASE}/gallery`, uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchGalleryFiles(); // Refresh the list
      setFileInput([]);
      setFormData({ title: "", date: "" });
    } catch (err) {
      console.error("Error uploading files:", err);
      setError("Failed to upload files.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file editing
  const handleEdit = async (id) => {
    if (!formData.title || !formData.date) {
      alert("Please provide title and date to update.");
      return;
    }

    const editFormData = new FormData();
    fileInput.forEach((file) => editFormData.append("files", file));
    editFormData.append("title", formData.title);
    editFormData.append("date", formData.date);

    setIsLoading(true);
    try {
      await axios.put(`${API_BASE}/gallery/${id}`, editFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchGalleryFiles(); // Refresh the list
      setSelectedFile(null);
      setFileInput([]);
      setFormData({ title: "", date: "" });
    } catch (err) {
      console.error("Error editing file:", err);
      setError("Failed to edit file.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file deletion
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE}/gallery/${id}`);
      fetchGalleryFiles(); // Refresh the list
    } catch (err) {
      console.error("Error deleting file:", err);
      setError("Failed to delete file.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Gallery Dashboard
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Loading State */}
        {isLoading && <p className="text-gray-600 mb-4">Loading...</p>}

        {/* File Upload */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Upload Files
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="file"
              multiple
              onChange={(e) => setFileInput([...e.target.files])}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Gallery Files */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Gallery Files
          </h2>
          {galleryFiles.length > 0 ? (
            <ul className="space-y-4">
              {galleryFiles.map((file) => (
                <li
                  key={file._id}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-md flex flex-col"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{file.title}</p>
                      <p className="text-gray-600 text-sm">{file.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedFile(file._id)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(file._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {file.files.map((f, index) => (
                      <li key={index}>
                        <a
                          href={`/${f.filePath}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {f.fileName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No files available.</p>
          )}
        </div>

        {/* File Edit */}
        {selectedFile && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Edit File
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="file"
                multiple
                onChange={(e) => setFileInput([...e.target.files])}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                onClick={() => handleEdit(selectedFile)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
