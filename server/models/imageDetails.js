const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    image: String, // File name for the image
    uploadTime: Date, // Custom field for sorting, if needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
