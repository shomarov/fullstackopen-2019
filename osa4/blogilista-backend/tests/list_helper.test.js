const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(testHelper.emptyBlogList)
    expect(result).toBe(0)
  })



  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testHelper.listWithManyBlogs)
    expect(result).toBe(36)
  })

})

test('favorite blog', () => {
  const result = listHelper.favoriteBlog(testHelper.listWithManyBlogs)
  expect(result).toEqual(
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
  )
})

test('author with most blogs', () => {
  const result = listHelper.mostBlogs(testHelper.listWithManyBlogs)
  expect(result).toEqual(
    {
      author: 'Robert C. Martin',
      blogs: 3
    }
  )
})

test('author with most likes', () => {
  const result = listHelper.mostLikes(testHelper.listWithManyBlogs)
  expect(result).toEqual(
    {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
  )
})

/* test('author with most blogs using lodash', () => {
  const result = listHelper.mostBlogsLodash(testHelper.listWithManyBlogs)
  expect(result).toEqual(
    {
      author: 'Robert C. Martin',
      blogs: 3
    }
  )
})

test('author with most likes using lodash', () => {
  const result = listHelper.mostLikesLodash(testHelper.listWithManyBlogs)
  expect(result).toEqual(
    {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
  )
}) */