import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ADToBS } from "bikram-sambat-js";

const FileTable = ({ files, loadFiles, handleView }) => {
  const [editingFile, setEditingFile] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = async (category, id) => {
    try {
      await axios.delete(
        `https://auth.sm12.com.np/file/delete-file/${category}/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("File deleted successfully!");
      loadFiles(currentPage);
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file. Please try again.");
    }
  };

  const handleEdit = async (category, id) => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty!");
      return;
    }

    try {
      await axios.put(
        `https://auth.sm12.com.np/file/edit-file/${category}/${id}`,
        { title: newTitle },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEditingFile(null);
      toast.success("File updated successfully!");
      loadFiles(currentPage);
    } catch (error) {
      console.error("Error updating file:", error);
      toast.error("Failed to update file. Please try again.");
    }
  };

  const allFiles =
    filter === "pdf"
      ? files.pdfs
      : filter === "image"
      ? files.images
      : [...files.pdfs, ...files.images];

  const totalPages = Math.ceil(allFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFiles = allFiles.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="px-4 sm:px-8">
      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show All
        </button>
        <button
          onClick={() => setFilter("pdf")}
          className={`px-4 py-2 rounded ${
            filter === "pdf" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show PDFs
        </button>
        <button
          onClick={() => setFilter("image")}
          className={`px-4 py-2 rounded ${
            filter === "image" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show Images
        </button>
      </div>

      {/* File Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Title</th>
              <th className="p-4 hidden sm:table-cell">Category</th>
              <th className="p-4 hidden sm:table-cell">Upload Date (Nepali)</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFiles.map((file) => (
              <tr key={file.id} className="border-b hover:bg-gray-100">
                <td className="p-4">
                  {editingFile === file.id ? (
                    <input
                      type="text"
                      defaultValue={file.title}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="border rounded px-2 w-full"
                    />
                  ) : (
                    file.title
                  )}
                </td>
                <td className="p-4 hidden sm:table-cell">{file.category}</td>
                <td className="p-4 hidden sm:table-cell">
                  {ADToBS(new Date(file.uploadTime).toISOString())}
                </td>
                <td className="p-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => file && handleView(file)}
                    className="text-blue-500 underline"
                  >
                    View
                  </button>
                  {editingFile === file.id ? (
                    <button
                      onClick={() => handleEdit(file.category, file.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingFile(file.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(file.category, file.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center flex-wrap gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-200 disabled:bg-gray-400"
        >
          Previous
        </button>
        {getPaginationRange().map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-200 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileTable;
