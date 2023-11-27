const express = require("express");
const {
  fetAllBlog,
  fetchBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

router
  .get("/", fetAllBlog)
  .post("/createproduct", createBlog)
  .get("/:id", fetchBlogById)
  .put("/:id", updateBlog)
  .delete("/:id", deleteBlog);

module.exports = router;
