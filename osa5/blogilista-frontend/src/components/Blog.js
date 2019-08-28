import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog }

    updatedBlog.likes = updatedBlog.likes + 1
    updatedBlog.user = updatedBlog.user.id

    const returnedBlog = await blogService.update(updatedBlog)
    const updatedBlogs = blogs.filter(b => b.id !== returnedBlog.id).concat(returnedBlog)

    setBlogs(updatedBlogs.sort((blog1, blog2) => blog1.likes - blog2.likes))
  }

  const handleRemove = async (blog) => {
    window.confirm(`remove blog ${blog.title} by ${blog.author}`)

    await blogService.remove(blog.id)

    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const removeButtonVisible = {
    display:
      user.id === blog.user.id || user.id === blog.user
        ? '' : 'none'
  }

  return (
    <div style={blogStyle} className="blog">
      <div onClick={toggleVisible} className="titleAuthor">
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} className="otherInfo">
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes
          <button onClick={() => handleLike(blog)}>like</button>
          <div>added by {blog.author}</div>
          <div>
            <button style={removeButtonVisible}
              onClick={() => handleRemove(blog)}>remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog