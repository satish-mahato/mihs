const mongoose = require("mongoose");

const PdfSchema = new mongoose.Schema({
  title: String,
  pdf: String
});

module.exports = mongoose.model("PdfDetails", PdfSchema);
