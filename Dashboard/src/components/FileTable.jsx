import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ADToBS } from "bikram-sambat-js";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaSave,
  FaFilePdf,
  FaImage,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 hidden sm:block">
          Documents Management
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>All</span>
            <span className="bg-white/20 rounded-full px-2 py-1 text-sm">
              {files.pdfs.length + files.images.length}
            </span>
          </button>
          <button
            onClick={() => setFilter("pdf")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              filter === "pdf"
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaFilePdf className="flex-shrink-0" />
            <span>PDFs</span>
            <span className="bg-white/20 rounded-full px-2 py-1 text-sm">
              {files.pdfs.length}
            </span>
          </button>
          <button
            onClick={() => setFilter("image")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              filter === "image"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaImage className="flex-shrink-0" />
            <span>Images</span>
            <span className="bg-white/20 rounded-full px-2 py-1 text-sm">
              {files.images.length}
            </span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-6 py-4 font-semibold text-gray-700">Title</th>
                <th className="px-6 py-4 font-semibold text-gray-700 hidden md:table-cell">
                  Category
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 hidden lg:table-cell">
                  Upload Date
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedFiles.map((file) => (
                <tr
                  key={file.id}
                  className="hover:bg-gray-50 transition-colors group even:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium max-w-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {file.category === "pdf" || file.pdf ? (
                          <FaFilePdf className="text-red-600 text-2xl" />
                        ) : (
                          <FaImage className="text-green-600 text-2xl" />
                        )}
                      </div>
                      {editingFile === file.id ? (
                        <input
                          type="text"
                          defaultValue={file.title}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-gray-800">{file.title}</span>
                          <span className="text-sm text-gray-500 md:hidden">
                            {file.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 capitalize">
                      {file.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        {ADToBS(new Date(file.uploadTime).toISOString())}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(file.uploadTime).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleView(file)}
                        className="p-2 hover:bg-gray-100 rounded-md text-blue-600 hover:text-blue-700 transition-colors"
                        title="View"
                      >
                        <FaEye className="text-xl" />
                      </button>
                      {editingFile === file.id ? (
                        <button
                          onClick={() => handleEdit(file.category, file.id)}
                          className="p-2 hover:bg-gray-100 rounded-md text-green-600 hover:text-green-700 transition-colors"
                          title="Save"
                        >
                          <FaSave className="text-xl" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingFile(file.id)}
                          className="p-2 hover:bg-gray-100 rounded-md text-yellow-600 hover:text-yellow-700 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(file.category, file.id)}
                        className="p-2 hover:bg-gray-100 rounded-md text-red-600 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedFiles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No files found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, allFiles.length)} of{" "}
          {allFiles.length} entries
        </div>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <FaChevronLeft />
          </button>
          {getPaginationRange().map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              } transition-colors`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileTable;