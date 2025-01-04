const express = require("express");
const multer = require("multer");
const PdfSchema = require("../models/pdfDetails");
const ImageSchema = require("../models/imageDetails");
const fs = require("fs");
const path = "./files";

const router = express.Router();
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./files"),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.fields([{ name: "file" }, { name: "image" }]),
  async (req, res) => {
    try {
      const { title } = req.body;
      if (req.files.file) {
        const fileName = req.files.file[0].filename;
        await PdfSchema.create({ title, pdf: fileName });
      }
      if (req.files.image) {
        const imageName = req.files.image[0].filename;
        await ImageSchema.create({ title, image: imageName });
      }
      res.send({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
  }
);

router.get("/get-files", async (req, res) => {
  try {
    const pdfData = await PdfSchema.find({});
    const imageData = await ImageSchema.find({});
    res.send({ status: "ok", pdfData, imageData });
  } catch (error) {
    res.json({ status: error });
  }
});

router.put("/edit-file/:id", async (req, res) => {
  try {
    const { title } = req.body;
    await PdfSchema.findByIdAndUpdate(req.params.id, { title });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

router.delete("/delete-file/:id", async (req, res) => {
  try {
    const file = await PdfSchema.findById(req.params.id);
    if (file) {
      fs.unlinkSync(`./files/${file.pdf}`);
      await PdfSchema.findByIdAndDelete(req.params.id);
      res.send({ status: "ok" });
    } else {
      res.send({ status: "File not found" });
    }
  } catch (error) {
    res.json({ status: error });
  }
});

router.put("/edit-image/:id", async (req, res) => {
  try {
    const { title } = req.body;
    await ImageSchema.findByIdAndUpdate(req.params.id, { title });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

router.delete("/delete-image/:id", async (req, res) => {
  try {
    const image = await ImageSchema.findById(req.params.id);
    if (image) {
      fs.unlinkSync(`./files/${image.image}`);
      await ImageSchema.findByIdAndDelete(req.params.id);
      res.send({ status: "ok" });
    } else {
      res.send({ status: "Image not found" });
    }
  } catch (error) {
    res.json({ status: error });
  }
});

module.exports = router;
