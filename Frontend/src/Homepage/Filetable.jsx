import React, { useState, useEffect } from "react";
import axios from "axios";
import { ADToBS } from "bikram-sambat-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileModal from "./FileModal";
import { FiChevronLeft, FiChevronRight, FiDownload } from "react-icons/fi";

const FileTable = () => {
  const [files, setFiles] = useState({ pdfs: [], images: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All Notices");
  const [selectedFile, setSelectedFile] = useState(null);
  const itemsPerPage = 5;

  const categories = [
    { name: "All Notices", url: "https://auth.sm12.com.np/file/get-files/" },
    {
      name: "Notice",
      url: "https://auth.sm12.com.np/file/files-by-category/notice",
    },
    {
      name: "Institute Notice",
      url: "https://auth.sm12.com.np/file/files-by-category/institute notice",
    },
    {
      name: "Vacancy",
      url: "https://auth.sm12.com.np/file/files-by-category/vacancy",
    },
    {
      name: "Exam Notice",
      url: "https://auth.sm12.com.np/file/files-by-category/exam%20notice",
    },
  ];

  const fetchFiles = async (categoryUrl, categoryName) => {
    try {
      const response = await axios.get(categoryUrl);
      setFiles({
        pdfs: response.data.pdfs || [],
        images: response.data.images || [],
      });
      setActiveCategory(categoryName);
      setCurrentPage(1);
      toast.success(`${categoryName} loaded successfully!`);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Failed to load files. Please try again.");
    }
  };

  useEffect(() => {
    fetchFiles("https://auth.sm12.com.np/file/get-files/", "All Notices");
  }, []);

  const allFiles = [...files.pdfs, ...files.images];
  const totalPages = Math.ceil(allFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFiles = allFiles.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleView = (file) => {
    const basePath = "https://auth.sm12.com.np/files/";
    const fileUrl = file.pdf ? basePath + file.pdf : basePath + file.image;
    const fileType = file.pdf ? "pdf" : "image";
    setSelectedFile({ ...file, url: fileUrl, type: fileType });
  };

  const closePreview = () => {
    setSelectedFile(null);
  };

  const CategoryButton = ({ name, url }) => (
    <button
      onClick={() => fetchFiles(url, name)}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        activeCategory === name
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-9">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notices</h2>

      {/* Category Selector */}
      <div className="mb-6 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-3">
          {categories.map((category) => (
            <CategoryButton
              key={category.name}
              name={category.name}
              url={category.url}
            />
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <table className="w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left rounded-tl-xl">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Upload Date (Nepali)</th>
              <th className="p-4 text-left rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFiles.map((file, index) => (
              <tr
                key={file.id}
                className={`${
                  index === paginatedFiles.length - 1
                    ? ""
                    : "border-b border-gray-100"
                } hover:bg-gray-50 transition-colors duration-200`}
              >
                <td className="p-4 font-medium text-gray-700">{file.title}</td>
                <td className="p-4 text-gray-600">
                  <span className="inline-flex justify-center items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm text-center">
                    {file.category}
                  </span>
                </td>
                <td className="p-4 text-gray-500">
                  {ADToBS(new Date(file.uploadTime).toISOString())}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleView(file)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <FiDownload className="w-5 h-5" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-700">{file.title}</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs text-center"> 
                {file.category}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {ADToBS(new Date(file.uploadTime).toISOString())}
              </p>
              <button
                onClick={() => handleView(file)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <FiDownload className="w-4 h-4" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} -{" "}
          {Math.min(startIndex + itemsPerPage, allFiles.length)} of{" "}
          {allFiles.length} results
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page + 1)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  currentPage === page + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {selectedFile && (
        <FileModal modalContent={selectedFile} onClose={closePreview} />
      )}
    </div>
  );
};

export default FileTable;
