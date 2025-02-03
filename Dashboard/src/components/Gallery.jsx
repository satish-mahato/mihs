import React, { useState, useEffect } from "react";
import { ADToBS } from "bikram-sambat-js";
import {
  uploadGalleryFiles,
  getGalleryFiles,
  editGalleryFiles,
  deleteGalleryFiles,
} from "../api/GalleryApi";
import Modal from "react-modal";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaEye,
  FaTrash,
  FaCalendarAlt,
  FaHeading,
  FaFileUpload,
} from "react-icons/fa";

Modal.setAppElement("#root");

const ITEMS_PER_PAGE = 6;

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [files, setFiles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await getGalleryFiles();
      setGallery(response.data.data);
    } catch (err) {
      console.error("Error fetching gallery files:", err);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 6) {
      alert("Maximum 6 files allowed. Selecting first 6.");
      const filesArray = Array.from(droppedFiles).slice(0, 6);
      setFiles(filesArray);
    } else {
      setFiles(droppedFiles);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length > 6) {
      alert("Maximum 6 g files allowed");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      if (editId) {
        await editGalleryFiles(editId, formData);
        alert("Gallery updated successfully");
      } else {
        await uploadGalleryFiles(formData);
        alert("Files uploaded successfully");
      }
      setTitle("");
      setDate(new Date().toISOString().split("T")[0]);
      setFiles([]);
      setEditId(null);
      fetchGallery();
    } catch (err) {
      console.error("Error uploading files:", err);
    }
  };
  const handleEdit = (record) => {
    setEditId(record.id);
    setTitle(record.title);
    setDate(record.date.split("T")[0]);
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

  const handleView = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < selectedRecord.files.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedRecord.files.length - 1
    );
  };

  const sortedGallery = [...gallery].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = sortedGallery.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedGallery.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600 drop-shadow-md">
          📷 Gallery Management
        </h1>

        {/* Upload/Edit Form */}
        <form
          onSubmit={handleUpload}
          className="max-w-2xl mx-auto mb-12 bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaHeading className="inline mr-2 text-blue-500" />
                Title
              </label>
              <input
                type="text"
                placeholder="Enter gallery title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2 text-blue-500" />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFileUpload className="inline mr-2 text-blue-500" />
                Upload Files
              </label>
              <div
                className="flex items-center justify-center w-full"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label
                  className={`flex flex-col w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <div className="p-6 text-center">
                    <p className="text-gray-600">
                      {isDragging
                        ? "Drop files here"
                        : "Click to select files or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Maximum 6 files (images or documents)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const selected = e.target.files;
                      if (selected.length > 6) {
                        alert("Maximum 6 files allowed. Selecting first 6.");
                        const filesArray = Array.from(selected).slice(0, 6);
                        setFiles(filesArray);
                      } else {
                        setFiles(selected);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
              {files.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                  Selected files:
                  <ul className="list-disc pl-5 mt-2">
                    {Array.from(files).map((file, index) => (
                      <li key={index} className="truncate">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {editId ? (
                <>
                  <FaEdit className="inline mr-2" />
                  Update Gallery
                </>
              ) : (
                <>
                  <FaFileUpload className="inline mr-2" />
                  Upload Files
                </>
              )}
            </button>
          </div>
        </form>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((record) => {
            const nepaliDate = ADToBS(new Date(record.date));
            return (
              <div
                key={record.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 truncate">
                      {record.title}
                    </h2>
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {record.files.length} files
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span>{nepaliDate}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {record.files.slice(0, 3).map((file, idx) => (
                      <div
                        key={idx}
                        className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                      >
                        {file.fileName.match(/\.(jpeg|jpg|gif|png)$/) ? (
                          <img
                            src={`https://auth.sm12.com.np/${file.filePath}`}
                            alt={file.fileName}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <FaFileUpload className="text-gray-400 text-2xl" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between space-x-2">
                    <button
                      onClick={() => handleEdit(record)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleView(record)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FaEye className="mr-2" /> View
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, sortedGallery.length)} of{" "}
            {sortedGallery.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } transition-colors`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } transition-colors`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal for Viewing Images */}
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="Gallery Image Modal"
          className="modal-content"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
        >
          {selectedRecord && (
            <div className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden">
              <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedRecord.title}</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="relative p-6">
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  {selectedRecord.files[currentImageIndex].fileName.match(
                    /\.(jpeg|jpg|gif|png)$/
                  ) ? (
                    <img
                      src={`https://auth.sm12.com.np/${selectedRecord.files[currentImageIndex].filePath}`}
                      alt={selectedRecord.files[currentImageIndex].fileName}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <FaFileUpload className="text-6xl text-gray-400 mb-4" />
                      <p className="text-gray-600 font-medium">
                        {selectedRecord.files[currentImageIndex].fileName}
                      </p>
                    </div>
                  )}
                </div>

                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <button
                    onClick={handlePrevImage}
                    className="p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                  >
                    <FaChevronLeft size={24} />
                  </button>
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <button
                    onClick={handleNextImage}
                    className="p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                  >
                    <FaChevronRight size={24} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-100 flex items-center justify-center">
                <div className="flex space-x-2">
                  {selectedRecord.files.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full ${
                        currentImageIndex === idx
                          ? "bg-blue-600"
                          : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default GalleryPage;
