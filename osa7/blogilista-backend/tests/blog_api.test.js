const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

let token

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.listWithManyBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  const response = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'password'
    })

  token = response.body.token
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.listWithManyBlogs.length)
})

test('identification field of a blog object is id', async () => {
  const blogsInDb = await helper.blogsInDb()

  expect(blogsInDb[0].id).toBeDefined()
})

test('blog can be added', async () => {
  const newBlog = {
    'title': 'My first blog',
    'author': 'Donald Trump',
    'url': 'https://www.whitehouse.gov/',
    'likes': 14
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.listWithManyBlogs.length + 1)
})

test('blog added has the right content', async () => {
  const newBlog = {
    title: 'My first blog',
    author: 'Donald Trump',
    url: 'https://www.whitehouse.gov/',
    votes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()

  const formattedBlogsForTest = blogsInDb.reduce((blogInfo, blog) => {
    const newObject = { title: blog.title, author: blog.author, url: blog.url }
    blogInfo.push(newObject)
    return blogInfo
  }, [])

  delete newBlog.votes
  expect(formattedBlogsForTest).toContainEqual(newBlog)
})

test('if field likes is undefined, set to zero', async () => {
  const newBlog = {
    'title': 'My first blog',
    'author': 'Donald Trump',
    'url': 'https://www.whitehouse.gov/'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const addedBlog = response.body

  expect(addedBlog.likes).toBe(0)
})

test('if added blog does not contain fields title or url, respond with 400 bad request',
  async () => {
    const newBlog = {
      'url': 'https://www.whitehouse.gov/'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

afterAll(() => {
  mongoose.connection.close()
})