import React, { useState } from 'react'
import { connect } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const user = props.user
  const blog = props.blog

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleRemove = () => {
    window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    props.removeBlog(blog)
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
          <button onClick={() => props.likeBlog(blog)}>like</button>
          <div>added by {blog.author}</div>
          <div>
            <button style={removeButtonVisible}
              onClick={() => handleRemove()}>remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  removeBlog,
  likeBlog
}

export default connect(null, mapDispatchToProps)(Blog)