const express = require("express");
const { upload, handleUploadErrors } = require("../middleware/multerConfig");
const { validateRequestBody } = require("../utils/validationMiddleware");
const { uploadGalleryFiles } = require("../controllers/galleryController");

const router = express.Router();

router.post(
  "/gallery",
  upload.array("files", 5), // Multer handles file uploads

  handleUploadErrors, // Middleware for handling upload errors
  validateRequestBody, // Validate request body after files are uploaded
  uploadGalleryFiles // Handle the main logic
);

module.exports = router;
