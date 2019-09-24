const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
      .populate('comments')

    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1 })
      .populate('comments')

    return response.json(blog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const body = request.body
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (!blog.title || !blog.url) {
      return response.status(400).end()
    } else if (!blog.likes) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = request.body

    if (!blog.title || !blog.url) {
      return response.status(400).end()
    } else if (!blog.likes) {
      blog.likes = 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blog.id, blog, { new: true })
    updatedBlog.save()
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)

    if (user.id.toString() === blog.user.toString()) {
      user.blogs = user.blogs.filter(b => b.id !== blog.id)
      await Blog.findByIdAndDelete(request.params.id)
      await user.save()
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'unauthorized attempt' })
    }
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter