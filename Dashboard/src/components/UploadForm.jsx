import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaHeading,
  FaListUl,
  FaFilePdf,
  FaImage,
  FaCloudUploadAlt,
  FaUpload,
  FaSpinner,
} from "react-icons/fa";

const UploadForm = ({ loadFiles, currentPage }) => {
  const [uploadType, setUploadType] = useState("file");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setSelectedFile(null);
  }, [uploadType]);

  const handleDragOver = (e) => {
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

    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    if (files.length > 1) {
      toast.error("Please upload only one file.");
      return;
    }

    const file = files[0];
    
    // Validate file type
    if (uploadType === "file" && !file.name.endsWith(".pdf")) {
      toast.error("Only PDF files are allowed.");
      return;
    }
    if (uploadType === "image" && !file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const category = e.target.category.value.trim();

    if (!title || !category) {
      toast.error("Title and category are required!");
      return;
    }
    if (!selectedFile) {
      toast.error(`Please select a ${uploadType} to upload.`);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append(uploadType, selectedFile);

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://auth.sm12.com.np/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success || data?.message === "Files uploaded successfully") {
        toast.success(data.message || "File uploaded successfully!");
        loadFiles(currentPage);
        e.target.reset();
      } else {
        throw new Error(data.message || "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to upload file. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-lg mx-auto w-full"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaCloudUploadAlt className="text-blue-500" />
        Upload Notice
      </h2>

      {/* Title Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Title
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-gray-400">
            <FaHeading />
          </span>
          <input
            name="title"
            type="text"
            placeholder="Enter title"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Category Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Category
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-gray-400">
            <FaListUl />
          </span>
          <select
            name="category"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
            required
          >
            <option value="" disabled selected>
              Select category
            </option>
            <option value="Notice">Notice</option>
            <option value="Institute Notice">Institute Notice</option>
            <option value="Vacancy">Vacancy</option>
            <option value="Exam Notice">Exam Notice</option>
          </select>
        </div>
      </div>

      {/* Upload Type Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-3">
          Upload Type
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setUploadType("file")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
              uploadType === "file"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            <FaFilePdf className="text-lg" />
            PDF File
          </button>
          <button
            type="button"
            onClick={() => setUploadType("image")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
              uploadType === "image"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            <FaImage className="text-lg" />
            Image
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        {uploadType === "file" ? (
          <>
            <input
              type="file"
              name="file"
              id="fileUpload"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0] || null)}
            />
            <label
              htmlFor="fileUpload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-gray-100"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
              <p className="text-gray-600 text-sm">
                {selectedFile
                  ? selectedFile.name
                  : "Click to upload PDF file or drag and drop"}
              </p>
            </label>
          </>
        ) : (
          <>
            <input
              type="file"
              name="image"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0] || null)}
            />
            <label
              htmlFor="imageUpload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-gray-100"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
              <p className="text-gray-600 text-sm">
                {selectedFile
                  ? selectedFile.name
                  : "Click to upload image or drag and drop"}
              </p>
            </label>
          </>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Max file size: 5MB • {uploadType === "file" ? "PDF only" : "Images only"}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <>
            <FaUpload />
            Upload Now
          </>
        )}
      </button>
    </form>
  );
};

export default UploadForm;