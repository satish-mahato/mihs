import React, { useState, useEffect } from "react";
import BikramSambat, { ADToBS } from "bikram-sambat-js"; // Import ADToBS
import {
  uploadGalleryFiles,
  getGalleryFiles,
  editGalleryFiles,
  deleteGalleryFiles,
} from "../api/GalleryApi";

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch all gallery files on load
  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await getGalleryFiles();
      setGallery(data.data);
    } catch (err) {
      console.error("Error fetching gallery files:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      if (editId) {
        // Editing an existing record
        await editGalleryFiles(editId, formData);
        alert("Gallery updated successfully");
        setEditId(null);
      } else {
        // Uploading new record
        await uploadGalleryFiles(formData);
        alert("Files uploaded successfully");
      }
      setTitle("");
      setDate("");
      setFiles([]);
      fetchGallery();
    } catch (err) {
      console.error("Error uploading files:", err);
    }
  };

  const handleEdit = (record) => {
    setEditId(record._id);
    setTitle(record.title);
    setDate(record.date);
    setFiles([]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteGalleryFiles(id);
        alert("Gallery record deleted successfully");
        fetchGallery();
      } catch (err) {
        console.error("Error deleting gallery record:", err);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery Management</h1>

      {/* Upload/Edit Form */}
      <form onSubmit={handleUpload} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editId ? "Update Record" : "Upload Files"}
        </button>
      </form>

      {/* Gallery List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gallery.map((record) => {
          // Convert Gregorian date to Nepali (Bikram Sambat) date
          const nepaliDate = ADToBS(record.date);

          return (
            <div
              key={record._id}
              className="p-4 border rounded shadow hover:shadow-lg"
            >
              <h2 className="font-bold">{record.title}</h2>
              <p className="text-sm text-gray-600">
                Date: {nepaliDate}
              </p>
              <ul className="mt-2">
                {record.files.map((file, idx) => (
                  <li key={idx}>
                    <a
                      href={`https://auth.sm12.com.np/${file.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {file.fileName}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(record)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
