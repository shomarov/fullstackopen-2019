import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { initializeBlogs } from '../reducers/blogReducer'
import { login, logout, setUser } from '../reducers/userReducer'
import { showError, hideError } from '../reducers/errorReducer'
import loginService from '../services/login'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const clearLoginFields = () => {
    username.clear()
    password.clear()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value
      })
      props.login(user)
      props.initializeBlogs()
    } catch (exception) {
      props.showError()
      setTimeout(() => {
        props.hideError()
      }, 5000)
      clearLoginFields()
    }
  }

  return (
    <div className="login">
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username.input} />
        </div>
        <div>
          password
          <input {...password.input} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  initializeBlogs,
  login,
  logout,
  setUser,
  showError,
  hideError
}

export default connect(null, mapDispatchToProps)(LoginForm)