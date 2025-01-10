const express = require("express");
const { upload, handleUploadErrors } = require("../middleware/multerConfig");
const { validateRequestBody } = require("../utils/validationMiddleware");
const {
  uploadGalleryFiles,
  editGalleryFiles,
  getGalleryFiles,
  deleteGalleryFiles,
  getAllGalleryFiles,
} = require("../controllers/galleryController");

const router = express.Router();

// Route for uploading gallery files
router.post(
  "/gallery",
  upload.array("files", 5), // Multer handles file uploads
  handleUploadErrors, // Middleware for handling upload errors
  validateRequestBody, // Validate request body after files are uploaded
  uploadGalleryFiles // Handle the main logic
);

// Route for editing gallery files
router.put(
  "/gallery/:id",
  upload.array("files", 5), // Multer handles file uploads
  handleUploadErrors, // Middleware for handling upload errors
  validateRequestBody, // Validate request body after files are uploaded
  editGalleryFiles // Handle the edit logic
);

// Route for getting gallery files
router.get("/gallery/:id?", getGalleryFiles); // Optional ID for specific or all records

// Route for deleting gallery files
router.delete("/gallery/:id", deleteGalleryFiles); // Delete a specific record by ID

router.get("gallery", getAllGalleryFiles);

module.exports = router;
