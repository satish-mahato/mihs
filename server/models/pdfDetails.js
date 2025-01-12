const mongoose = require("mongoose");

const PdfSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    pdf: String, // File name for the PDF
    uploadTime: Date, // Custom field for sorting, if needed
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Pdf", PdfSchema);
