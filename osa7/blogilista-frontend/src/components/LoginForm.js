import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'

import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

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
          <Input id='username' {...username.input} />
        </div>
        <div>
          password
          <Input id='password' {...password.input} />
        </div>
        <Button id='loginButton' type="submit">login</Button>
      </form>
    </div>
  )
}


export default connect(null, { login })(LoginForm)