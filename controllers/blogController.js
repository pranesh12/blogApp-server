const Blog = require("../models/blogModel");

exports.fetAllBlog = async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
  try {
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById({ _id: id });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { author, title, content, image, category, readtime } = req.body;

    await Blog.create({
      author,
      title,
      content,
      image,
      category,
      readtime,
    });

    res.status(201).json({ message: "Blog Created Successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { author, title, content, image, category, readtime } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findOneAndDelete({ _id: id });
    res.json({ message: "Blog has been deleted" });
  } catch (error) {
    res.json(error);
  }
};
