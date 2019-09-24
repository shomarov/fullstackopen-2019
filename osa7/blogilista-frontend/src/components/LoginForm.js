import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const clearLoginFields = () => {
    username.clear()
    password.clear()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login(username, password)
    clearLoginFields()
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


export default connect(null, { login })(LoginForm)