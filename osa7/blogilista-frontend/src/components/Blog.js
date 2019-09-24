import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { likeBlog } from '../reducers/blogReducer'
import { addComment } from '../reducers/blogReducer'

const Blog = (props) => {
  const comment = useField('text')
  const blog = props.blog

  if (!blog) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    props.addComment(blog.id, comment.input.value)
    comment.clear()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={() => props.likeBlog(blog)}>like</button>
      </div>
      <div>
        added by {blog.author}
      </div>
      <h2>comments</h2>
      <form onSubmit={handleSubmit}>
        <input {...comment.input}></input>
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id),
  }
}


export default connect(mapStateToProps, { likeBlog, addComment })(Blog)