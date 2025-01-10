const GalleryImg = require("../models/GalleryImg");
const { ERROR_MESSAGES } = require("../utils/errorMessages");

const uploadGalleryFiles = async (req, res, next) => {
  try {
    const { title, date } = req.body;
    console.log(req.body);

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

module.exports = { uploadGalleryFiles };
