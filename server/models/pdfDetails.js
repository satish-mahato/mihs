const mongoose = require("mongoose");
const moment = require("moment-timezone");

const PdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  uploadTime: { type: Date, required: true },
  pdf: { type: String, required: true },
});

// Middleware to convert uploadTime to Nepal Time (Asia/Kathmandu) before saving
PdfSchema.pre("save", function (next) {
  if (this.uploadTime) {
    // Convert the uploadTime to Nepal Time (UTC +5:45)
    this.uploadTime = moment
      .tz(this.uploadTime, "Asia/Kathmandu")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  next();
});

module.exports = mongoose.model("Pdf", PdfSchema);
