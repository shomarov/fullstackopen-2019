import React from 'react'
import { connect } from 'react-redux'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import BlogTitle from './BlogTitle'

const Blogs = (props) => {

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable elementId='createNewBlogButton' buttonLabel='create new blog entry' ref={blogFormRef}>
      <CreateBlogForm
        toggleVisibility={() => blogFormRef.current.toggleVisibility()}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>create new</h2>
      {blogForm()}
      {
        props.blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
          <BlogTitle key={blog.id} blog={blog} />
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}


export default connect(mapStateToProps)(Blogs)