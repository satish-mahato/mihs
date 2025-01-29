import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UploadForm = ({ loadFiles, currentPage }) => {
  const [uploadType, setUploadType] = useState("file");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const category = e.target.category.value.trim();
    const selectedFile =
      uploadType === "file" ? e.target.file.files[0] : e.target.image.files[0];

    // Validation
    if (!title || !category) {
      toast.error("Title and category are required!");
      return;
    }

    if (!selectedFile) {
      toast.error(`Please select a ${uploadType} to upload.`);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    if (uploadType === "file" && !selectedFile.name.endsWith(".pdf")) {
      toast.error("Only PDF files are allowed.");
      return;
    }

    // Create FormData
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
        e.target.reset(); // Reset the form
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
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Notice Board</h2>

      {/* Title Input */}
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

      {/* Category Input */}
      {/* Category Input */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-medium">
          Category
        </label>
        <select
          name="category"
          className="p-2 border rounded w-full mt-2"
          required
        >
          <option value="" disabled selected>
            Select a category
          </option>
          <option value="Notice">Notice</option>
          <option value="Institute Notice">Institute Notice</option>
          <option value="Vacancy">Vacancy</option>
          <option value="Exam Notice">Exam Notice</option>
        </select>
      </div>

      {/* Upload Type Selection */}
      <div className="mb-4">
        <p className="font-medium text-gray-700">Choose file type to upload:</p>
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

      {/* File Input */}
      {uploadType === "file" && (
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 font-medium">
            File
          </label>
          <input name="file" type="file" accept=".pdf" className="mt-2" />
        </div>
      )}

      {/* Image Input */}
      {uploadType === "image" && (
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Image
          </label>
          <input name="image" type="file" accept="image/*" className="mt-2" />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default UploadForm;
