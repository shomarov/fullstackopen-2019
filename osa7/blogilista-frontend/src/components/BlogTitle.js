import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

const BlogTitle = (props) => {
  const blog = props.blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} key={blog.id}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}


export default connect(null,
  {
    removeBlog,
    likeBlog
  }
)(BlogTitle)