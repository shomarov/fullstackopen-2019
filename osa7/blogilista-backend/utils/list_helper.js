// eslint-disable-next-line no-unused-vars
const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  }

  const sumOfLikes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)

  return sumOfLikes
}

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes
      ? blog
      : favorite
  }, blogs[0])

  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }
}

const mostBlogs = (blogs) => {
  const authorsAndAmountOfBlogs = blogs.reduce((authors, blog) => {
    const index = authors.findIndex(author => author.name === blog.author)
    index === -1
      ? authors.push(
        {
          name: blog.author,
          blogs: 1
        })
      : authors[index].blogs = authors[index].blogs + 1
    return authors
  }, [])

  const mostBlogs = authorsAndAmountOfBlogs.reduce((authorOfMostBlogs, author) => {
    authorOfMostBlogs =
      authorOfMostBlogs.blogs > author.blogs
        ? authorOfMostBlogs
        : author

    return authorOfMostBlogs
  }, authorsAndAmountOfBlogs[0])

  return {
    author: mostBlogs.name,
    blogs: mostBlogs.blogs
  }
}

const mostLikes = (blogs) => {
  const authorsAndAmountOfLikes = blogs.reduce((authors, blog) => {
    const index = authors.findIndex(author => author.name === blog.author)
    index === -1
      ? authors.push(
        {
          name: blog.author,
          likes: blog.likes
        })
      : authors[index].likes = authors[index].likes + blog.likes
    return authors
  }, [])

  const mostLikes = authorsAndAmountOfLikes.reduce((authorOfMostLikes, author) => {
    authorOfMostLikes =
      authorOfMostLikes.likes > author.likes
        ? authorOfMostLikes
        : author

    return authorOfMostLikes
  }, authorsAndAmountOfLikes[0])

  return {
    author: mostLikes.name,
    likes: mostLikes.likes
  }
}

/* const mostBlogsLodash = (blogs) => {

}

const mostLikesLodash = (blogs) => {

} */

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
