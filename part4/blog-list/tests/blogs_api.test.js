const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("testing GET", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 1000000);

  test("there are 3 blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the first title is title3", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((res) => res.title);
    expect(titles).toContain("title1");
  });

  test("id is the unique identifier", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("testing POST", () => {
  test("test the post method", async () => {
    const newBlog = {
      title: "title4",
      author: "mohammad_4",
      url: "www",
      likes: 40,
    };
    const token = process.env.TOKEN;

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect("Content-Type", /application\/json/)
      .expect(201);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    const titles = response.body.map((res) => res.title);
    expect(titles).toContain("title4");
  }, 1000000);

  test("test missing likes for blog", async () => {
    const newBlog = {
      title: "title4",
      author: "mohammad_4",
      url: "www",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect("Content-Type", /application\/json/)
      .expect(201);

    const response = await api.get("/api/blogs");
    expect(response.body[response.body.length - 1].likes).toBe(0);
  });

  test("bad request error for missing title and url", async () => {
    const newBlog = {
      author: "mohammad_4",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect("Content-Type", /application\/json/)
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogAtStart = await helper.blogInDb();
    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogAtEnd = await helper.blogInDb();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogAtEnd.map((r) => r.content);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe("test update PATCH", () => {
  test("test the patch route", async () => {
    const blogAtStart = await helper.blogInDb();
    const blogToUpdate = blogAtStart[0];

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: 20 });

    const blogAtEnd = await helper.blogInDb();
    expect(blogAtEnd[0].likes).toBe(20);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mohammad",
      name: "mohammad hossein golestan",
      password: "mohammad1",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper status code and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "secret1",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("invalid username and password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "se",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username or password should be more than three characters"
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("username and password must be provided", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "Superuser",
      password: "se",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username or password must be provided"
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  }, 1000000);
});

afterAll(() => {
  mongoose.connection.close();
});
