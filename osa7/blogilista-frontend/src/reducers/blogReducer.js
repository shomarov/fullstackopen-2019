import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(newBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: returnedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = { ...blog }
    updatedBlog.likes = updatedBlog.likes + 1
    updatedBlog.user = updatedBlog.user.id
    const returnedBlog = await blogService.update(updatedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: returnedBlog
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG': {
      const blog = action.data
      return state.concat(blog)
    }
    case 'REMOVE_BLOG': {
      const blog = action.data
      return state.filter(b => b.id !== blog.id)
    }
    case 'LIKE_BLOG': {
      const updatedBlog = action.data
      return state.filter(b => b.id !== updatedBlog.id).concat(updatedBlog)
    }
    default:
      return state
  }
}

export default blogReducer