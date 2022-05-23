const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "title1",
    author: "mohammad_1",
    url: "www",
    likes: 10,
  },
  {
    title: "title2",
    author: "mohammad_2",
    url: "www",
    likes: 20,
  },
  {
    title: "title3",
    author: "mohammad_3",
    url: "www",
    likes: 30,
  },
];

const blogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogInDb,
  usersInDb,
};
