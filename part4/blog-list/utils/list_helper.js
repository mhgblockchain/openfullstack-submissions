// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => {
    return sum + current.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = (blogs) => {
  const occurrences = [];
  for (let i = 0; i < blogs.length; i++) {
    if (!occurrences.some((blog) => blog.author === blogs[i].author)) {
      occurrences.push({ author: blogs[i].author, blogsNum: 1 });
    } else {
      occurrences.map((obj) =>
        obj.author === blogs[i].author
          ? { ...obj, blogsNum: obj.blogsNum++ }
          : obj
      );
    }
  }

  return occurrences.reduce((prev, current) => {
    return prev.blogsNum > current.blogsNum ? prev : current;
  });
};

const mostLikes = (blogs) => {
  const occurrences = [];
  for (let i = 0; i < blogs.length; i++) {
    if (!occurrences.some((blog) => blog.author === blogs[i].author)) {
      occurrences.push({ author: blogs[i].author, likes: blogs[i].likes });
    } else {
      occurrences.map((obj) =>
        obj.author === blogs[i].author
          ? { ...obj, likes: (obj.likes += blogs[i].likes) }
          : obj
      );
    }
  }

  return occurrences.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
