import { useEffect, useState } from "react";
import axios from "axios";

const Paging = () => {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFiles(currentPage);
  }, [currentPage]);

  const fetchFiles = async (page) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/get-files?page=${page}&limit=5`
      );
      setFiles(data.files);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to fetch files. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        File Dashboard
      </h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded">{error}</div>
      )}

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-blue-500 font-semibold"
                >
                  Loading...
                </td>
              </tr>
            ) : files.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 font-semibold"
                >
                  No files available.
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file._id} className="border-b hover:bg-gray-100">
                  <td className="p-4">{file.title}</td>
                  <td className="p-4">{file.category}</td>
                  <td className="p-4">
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <p className="text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Paging;
