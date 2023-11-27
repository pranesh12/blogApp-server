const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: {
    type: String,
    required: [true, "Please a provide a content "],
    minlength: [10, "Please provide a content least 10 characters "],
  },
  image: {
    type: String,
    default: "default.jpg",
  },
  readtime: {
    type: Number,
    default: 3,
  },
});

const Blog = mongoose.model("blogs", productSchema);
module.exports = Blog;
