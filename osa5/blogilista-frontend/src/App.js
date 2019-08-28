import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
      />
    </Togglable>
  )

  const resetLoginFields = () => {
    username.reset()
    password.reset()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
      resetLoginFields()
    } catch (exception) {
      setError('wrong username or password')
      resetLoginFields()
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog entry' ref={blogFormRef}>
      <CreateBlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        setNotification={setNotification}
        toggleVisibility={() => blogFormRef.current.toggleVisibility()}
      />
    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
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
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}
          user={user} />
      )}
    </div>
  )
}

export default App
