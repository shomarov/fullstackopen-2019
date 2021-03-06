const express = require('express')
const app = express()
const config = require('./utils/config')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })

app.use(cors())
app.use(bodyParser.json())

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app