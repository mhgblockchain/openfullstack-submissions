const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(401).json({
      error: "username or password must be provided",
    });
  }
  if (username.length < 3 || password.length < 3) {
    return response.status(401).json({
      error: "username or password should be more than three characters",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const filter = { title: 1, author: 1, url: 1 };
  const users = await User.find({}).populate("blogs", filter);
  res.json(users);
});

module.exports = usersRouter;
