const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    files: [
      {
        fileName: { type: String, required: true },
        filePath: { type: String, required: true },
      },
    ],
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);

module.exports = mongoose.model("GalleryImg", fileSchema);
