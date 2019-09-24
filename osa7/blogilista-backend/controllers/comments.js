const commentsRouter = require('express').Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')

// this is saved for later experimenting
commentsRouter.get('/', async (request, response, next) => {
  try {
    const comments = await Comment
      .find({ blogId: request.params.id })

    response.json(comments.map(comment => comment.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

commentsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const blog = await Blog.findById(request.params.id)

    const comment = new Comment({
      content: body.content,
      blogId: blog._id
    })

    if (!comment.content) {
      return response.status(400).end()
    }

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = commentsRouter