import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

const ME = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleError = (error) => {
    console.log('bad username or password')
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const [getUser, user] = useLazyQuery(ME)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const result = await login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      getUser()
    }

    setUsername('')
    setPassword('')
  }

  if (user.data && user.data.me) {
    const loggedInUser = {
      username: user.data.me.username,
      favoriteGenre: user.data.me.favoriteGenre
    }
    props.setUser(loggedInUser)
    localStorage.setItem('library-user', JSON.stringify(loggedInUser))
    props.setPage('books')
  }

  return (
    <div>
      <form>
        <div>username:
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>password:
      <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button onClick={submit}>login</button>
      </form>
    </div>
  )

}

export default LoginForm