const GalleryImg = require("../models/GalleryImg");
const { ERROR_MESSAGES } = require("../utils/errorMessages");
const fs = require("fs/promises");
const path = require("path");

const uploadGalleryFiles = async (req, res, next) => {
  try {
    const { title, date } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: ERROR_MESSAGES.FILE_REQUIRED });
    }

    const files = req.files.map((file) => ({
      fileName: file.originalname,
      filePath: file.path,
    }));

    const fileRecord = new GalleryImg({ title, date, files });
    await fileRecord.save();

    res.status(201).json({
      message: "Files uploaded successfully",
      data: fileRecord,
    });
  } catch (err) {
    next(err);
  }
};

const editGalleryFiles = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, date } = req.body;

    const galleryRecord = await GalleryImg.findById(id);
    if (!galleryRecord) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }

    if (req.files && req.files.length > 0) {
      // Delete old files from the file system
      if (galleryRecord.files && galleryRecord.files.length > 0) {
        for (const file of galleryRecord.files) {
          const filePath = path.resolve(file.filePath);
          try {
            await fs.unlink(filePath);
          } catch (err) {
            console.error(`Failed to delete file: ${filePath}`, err);
          }
        }
      }

      // Add new files
      const files = req.files.map((file) => ({
        fileName: file.originalname,
        filePath: file.path,
      }));
      galleryRecord.files = files;
    }

    if (title) galleryRecord.title = title;
    if (date) galleryRecord.date = date;

    await galleryRecord.save();

    res.status(200).json({
      message: "Gallery record updated successfully",
      data: galleryRecord,
    });
  } catch (err) {
    next(err);
  }
};

const getGalleryFiles = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      const galleryRecord = await GalleryImg.findById(id);
      if (!galleryRecord) {
        return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
      }
      return res.status(200).json({ data: galleryRecord });
    }

    const galleryRecords = await GalleryImg.find();
    res.status(200).json({ data: galleryRecords });
  } catch (err) {
    next(err);
  }
};

const deleteGalleryFiles = async (req, res, next) => {
  try {
    const { id } = req.params;

    const galleryRecord = await GalleryImg.findById(id);
    if (!galleryRecord) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }

    // Delete files from the file system
    if (galleryRecord.files && galleryRecord.files.length > 0) {
      for (const file of galleryRecord.files) {
        const filePath = path.resolve(file.filePath);
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
        }
      }
    }

    // Delete the record from the database
    await GalleryImg.findByIdAndDelete(id);

    res.status(200).json({
      message: "Gallery record and associated files deleted successfully",
      data: galleryRecord,
    });
  } catch (err) {
    next(err);
  }
};

const getAllGalleryFiles = async (req, res, next) => {
  try {
    const galleryRecords = await GalleryImg.find();
    const allFiles = galleryRecords.flatMap((record) => record.files);

    res.status(200).json({
      message: "All gallery files retrieved successfully",
      data: allFiles,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadGalleryFiles,
  editGalleryFiles,
  getGalleryFiles,
  deleteGalleryFiles,
  getAllGalleryFiles,
};
