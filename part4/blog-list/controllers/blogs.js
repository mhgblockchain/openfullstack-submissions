const express = require("express");
const blogRouter = express.Router();
// const jwt = require("jsonwebtoken");

const Blog = require("../models/blog");
// const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

//Post Method
blogRouter.post("/", userExtractor, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user.id,
    });

    const blogToSave = await blog.save();
    user.blogs = user.blogs.concat(blogToSave._id);
    await user.save();

    return res.status(201).json(blogToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
blogRouter.get("/", async (req, res) => {
  try {
    // console.log("req.user", req.user);

    const filter = { username: 1, name: 1, url: 1 };
    const blogs = await Blog.find({}).populate("user", filter);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
blogRouter.get("/:id", async (req, res) => {
  try {
    const data = await Blog.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
blogRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Blog.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
blogRouter.delete("/:id", userExtractor, async (req, res) => {
  try {
    const user = req.user;
    const blogId = req.params.id;
    const blog = await Blog.findByIdAndDelete(blogId);
    if (user.id.toString() !== blog.user._id.toString()) {
      return res.status(401).json({ error: "token missing or invalid" });
    } else {
      res.status(204).send(`Document with ${blog.title} has been deleted..`);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = blogRouter;
