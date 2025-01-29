const express = require("express");
const { upload, handleUploadErrors } = require("../middleware/multerConfig.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const fileController = require("../controllers/fileController.js");

const router = express.Router();

// File upload route
router.post(
  "/upload",
  authMiddleware.authUser,
  upload.fields([{ name: "file" }, { name: "image" }]), // Multer file handling
  handleUploadErrors, // Error handling middleware for file upload
  fileController.uploadFiles // Controller to handle the upload logic
);

// Route to fetch all files
router.get("/get-files", fileController.getFiles);

// Route to fetch files by category
router.get("/files-by-category/:category", fileController.getFilesByCategory);

// Route to edit file details by category and ID
router.put("/edit-file/:category/:id",authMiddleware.authUser, fileController.editFile);

// Route to delete a file by category and ID
router.delete("/delete-file/:category/:id",authMiddleware.authUser, fileController.deleteFile);

module.exports = router;
