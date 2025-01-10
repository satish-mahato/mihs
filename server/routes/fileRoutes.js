const express = require("express");
const { upload, handleUploadErrors } = require("../middleware/multerConfig");
const fileController = require("../controllers/fileController");

const router = express.Router();

// File upload route
router.post(
  "/upload",
  upload.fields([{ name: "file" }, { name: "image" }]), // Multer file handling
  handleUploadErrors, // Error handling middleware for file upload
  fileController.uploadFiles // Controller to handle the upload logic
);

// Route to fetch all files
router.get("/get-files", fileController.getFiles);

// Route to fetch files by category
router.get("/files-by-category/:category", fileController.getFilesByCategory);

// Route to edit file details by category and ID
router.put("/edit-file/:category/:id", fileController.editFile);

// Route to delete a file by category and ID
router.delete("/delete-file/:category/:id", fileController.deleteFile);

module.exports = router;
