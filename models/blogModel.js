const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: {
    type: String,
    required: [true, "Please a provide a content "],
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  readtime: {
    type: Number,
    default: 3,
  },
});

const Blog = mongoose.model("blogs", productSchema);
module.exports = Blog;
