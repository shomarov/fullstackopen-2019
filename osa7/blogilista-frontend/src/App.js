import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'

const App = (props) => {
  const blogs = props.blogs
  const user = props.user
  const notification = props.notification
  const error = props.error

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      props.setUser(user)
      props.initializeBlogs()
    }
    // eslint-disable-next-line
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog entry' ref={blogFormRef}>
      <CreateBlogForm
        toggleVisibility={() => blogFormRef.current.toggleVisibility()}
      />
    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    props.logout()
  }

  if (!user) {
    return (
      <div>
        <Error message={error} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div>
        {user.name} logged in
        <button onClick={() => handleLogout()}>log out</button>
      </div>
      <h2>create new</h2>
      {blogForm()}
      {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
        <Blog key={blog.id} blog={blog}
          user={user} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    notification: state.notification,
    error: state.error
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  login,
  logout,
  setUser
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App)
