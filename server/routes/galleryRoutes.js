const express = require("express");
const { upload, handleUploadErrors } = require("../middleware/multerConfig.js");
const { validateRequestBody } = require("../utils/validationMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  uploadGalleryFiles,
  editGalleryFiles,
  getGalleryFiles,
  deleteGalleryFiles,
  getAllGalleryFiles,
} = require("../controllers/galleryController.js");

const router = express.Router();

// Route for uploading gallery files
router.post(
  "/gallery",authMiddleware.authUser,
  upload.array("files", 5), // Multer handles file uploads
  handleUploadErrors, // Middleware for handling upload errors
  validateRequestBody, // Validate request body after files are uploaded
  uploadGalleryFiles // Handle the main logic
);

// Route for editing gallery files
router.put(
  "/gallery/:id",authMiddleware.authUser,
  upload.array("files", 5), // Multer handles file uploads
  handleUploadErrors, // Middleware for handling upload errors
  validateRequestBody, // Validate request body after files are uploaded
  editGalleryFiles // Handle the edit logic
);

// Route for getting gallery files
router.get("/gallery/:id?", getGalleryFiles); // Optional ID for specific or all records

// Route for deleting gallery files
router.delete("/gallery/:id",authMiddleware.authUser, deleteGalleryFiles); // Delete a specific record by ID

router.get("gallery", getAllGalleryFiles);

module.exports = router;
