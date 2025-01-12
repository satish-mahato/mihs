const PdfSchema = require("../models/pdfDetails");
const ImageSchema = require("../models/imageDetails");
const fs = require("fs");

const uploadFiles = async (req, res, next) => {
  try {
    const { title, category } = req.body;
    const uploadTime = new Date(); // Timestamp for sorting

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({ error: "Title and category are required" });
    }

    // Handle file uploads for PDFs
    if (req.files.file) {
      const fileName = req.files.file[0].filename;
      await PdfSchema.create({
        title,
        category,
        uploadTime,
        pdf: fileName,
      });
    }

    // Handle file uploads for Images
    if (req.files.image) {
      const imageName = req.files.image[0].filename;
      await ImageSchema.create({
        title,
        category,
        uploadTime,
        image: imageName,
      });
    }

    res.status(201).json({ message: "Files uploaded successfully and sorted by latest upload time" });
  } catch (error) {
    next(error);
  }
};


const getFiles = async (req, res, next) => {
  try {
    // Extract page and limit from query parameters, with defaults
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    // Fetch total counts for both schemas
    const totalPdfCount = await PdfSchema.countDocuments();
    const totalImageCount = await ImageSchema.countDocuments();
    const totalFiles = totalPdfCount + totalImageCount;

    // Determine total pages
    const totalPages = Math.ceil(totalFiles / limit);

    // Fetch combined paginated data
    const pdfLimit = Math.min(limit, totalPdfCount - skip); // PDFs to fetch
    const imageLimit = limit - pdfLimit; // Remaining limit for images

    const pdfData = await PdfSchema.find().skip(skip).limit(pdfLimit);

    const imageData = await ImageSchema.find()
      .skip(skip - totalPdfCount > 0 ? skip - totalPdfCount : 0)
      .limit(imageLimit);

    // Map file URLs
    const pdfsWithUrl = pdfData.map((pdf) => ({
      ...pdf._doc,
      fileUrl: `${req.protocol}://${req.get("host")}/files/${pdf.pdf}`,
    }));

    const imagesWithUrl = imageData.map((image) => ({
      ...image._doc,
      fileUrl: `${req.protocol}://${req.get("host")}/files/${image.image}`,
    }));

    // Combine data
    const files = [...pdfsWithUrl, ...imagesWithUrl];

    res.status(200).json({ files, totalPages, currentPage: page });
  } catch (error) {
    next(error);
  }
};

const getFilesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const pdfData = await PdfSchema.find({ category });
    const imageData = await ImageSchema.find({ category });

    const pdfsWithUrl = pdfData.map((pdf) => ({
      ...pdf._doc,
      fileUrl: `${req.protocol}://${req.get("host")}/files/${pdf.pdf}`,
    }));

    const imagesWithUrl = imageData.map((image) => ({
      ...image._doc,
      fileUrl: `${req.protocol}://${req.get("host")}/files/${image.image}`,
    }));

    res.status(200).json({ pdfData: pdfsWithUrl, imageData: imagesWithUrl });
  } catch (error) {
    next(error);
  }
};

const editFile = async (req, res, next) => {
  try {
    const { category, id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "New title is required" });
    }

    let updatedFile = await PdfSchema.findOneAndUpdate(
      { _id: id, category },
      { title },
      { new: true }
    );

    if (!updatedFile) {
      updatedFile = await ImageSchema.findOneAndUpdate(
        { _id: id, category },
        { title },
        { new: true }
      );
    }

    if (!updatedFile) {
      return res.status(404).json({ error: "File or image not found" });
    }

    res.status(200).json({ message: "File updated successfully", updatedFile });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { category, id } = req.params;

    let fileToDelete = await PdfSchema.findOne({ _id: id, category });
    if (fileToDelete) {
      fs.unlinkSync(`./files/${fileToDelete.pdf}`);
      await PdfSchema.deleteOne({ _id: id });
    } else {
      fileToDelete = await ImageSchema.findOne({ _id: id, category });
      if (fileToDelete) {
        fs.unlinkSync(`./files/${fileToDelete.image}`);
        await ImageSchema.deleteOne({ _id: id });
      }
    }

    if (!fileToDelete) {
      return res.status(404).json({ error: "File or image not found" });
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFiles,
  getFiles,
  getFilesByCategory,
  editFile,
  deleteFile,
};
