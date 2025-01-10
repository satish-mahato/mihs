const PdfSchema = require("../models/pdfDetails");
const ImageSchema = require("../models/imageDetails");
const fs = require("fs");

const uploadFiles = async (req, res, next) => {
  try {
    const { title, category } = req.body;
    const uploadTime = new Date();

    if (!title || !category) {
      return res.status(400).json({ error: "Title and category are required" });
    }

    if (req.files.file) {
      const fileName = req.files.file[0].filename;
      await PdfSchema.create({ title, category, uploadTime, pdf: fileName });
    }

    if (req.files.image) {
      const imageName = req.files.image[0].filename;
      await ImageSchema.create({
        title,
        category,
        uploadTime,
        image: imageName,
      });
    }

    res.status(201).json({ message: "Files uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

const getFiles = async (req, res, next) => {
  try {
    const pdfData = await PdfSchema.find({});
    const imageData = await ImageSchema.find({});

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
