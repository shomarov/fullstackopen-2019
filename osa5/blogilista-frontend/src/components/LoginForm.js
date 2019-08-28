import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password }) => {

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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm