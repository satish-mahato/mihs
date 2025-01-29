import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileTable from "./FileTable";
import UploadForm from "./UploadForm";
import FileModal from "./FileModal";

const Dashboard = () => {
  const [files, setFiles] = useState({ pdfs: [], images: [] });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    loadFiles(currentPage);
  }, [currentPage]);

  const loadFiles = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://auth.sm12.com.np/file/get-files?page=${page}&limit=5`
      );

      const pdfs = [...data.pdfs].reverse();
      const images = [...data.images].reverse();
      const allFiles = [
        ...pdfs.map((file) => ({ ...file, type: "pdf" })),
        ...images.map((file) => ({ ...file, type: "image" })),
      ];

      setFiles({ pdfs, images });
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Failed to load files.");
    } finally {
      setLoading(false);
    }
  };
  const handleView = (file) => {
    const BASE_URL = "https://auth.sm12.com.np/files";

    if (!file || typeof file !== "object") {
      toast.error("Invalid file selected for viewing.");
      console.error("File object is invalid:", file);
      return;
    }

    // Get the file URL and validate it
    const fileUrl = file.pdf || file.image;
    if (!fileUrl || typeof fileUrl !== "string") {
      toast.error("Invalid or missing file URL.");
      console.error("File does not have a valid URL:", file);
      return;
    }

    // Prepend the base URL to the file URL
    const fullUrl = `${BASE_URL}/${fileUrl}`;

    // Determine file type
    const isPdf = fullUrl.toLowerCase().endsWith(".pdf");
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fullUrl);

    if (!isPdf && !isImage) {
      toast.error("Unsupported file type.");
      console.error("Unsupported file type detected:", fullUrl);
      return;
    }

    const fileType = isPdf ? "pdf" : "image";

    // Update modal content
    setModalContent({ url: fullUrl, type: fileType });
    setModalVisible(true);

    // Debugging logs
    console.log("Viewing file:", file);
    console.log("Full File URL:", fullUrl);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Madhesh Institute of Health Sciences
      </h1>
      <p className="text-center text-gray-600 mb-2">
        Janakpurdham,Madhesh Province,Nepal
      </p>

      <UploadForm loadFiles={loadFiles} currentPage={currentPage} />

      <FileTable
        files={files}
        loadFiles={loadFiles}
        currentPage={currentPage}
        handleView={handleView}
      />

      {modalVisible && (
        <FileModal modalContent={modalContent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Dashboard;
