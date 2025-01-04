const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({ title: String, image: String });
module.exports = mongoose.model("ImageDetails", ImageSchema);
