import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import Menu from './components/Menu'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Error from './components/Error'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'


const App = (props) => {
  const user = props.user
  const error = props.error

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      props.setUser(user)
      props.initializeBlogs()
      props.initializeUsers()
    }
    // eslint-disable-next-line
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )

  if (!user) {
    return (
      <div>
        <Error message={error} />
        {loginForm()}
      </div>
    )
  }

  return (
    <Router>
      <Menu />
      <Route exact path="/" render={() => <Blogs />} />
      <Route exact path="/blogs/:id" render={({ match }) =>
        <Blog id={match.params.id} />
      }>
      </Route>
      <Route exact path="/users" render={() => <Users />} />
      <Route exact path="/users/:id" render={({ match }) =>
        <User id={match.params.id} />
      } />
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    error: state.error
  }
}

export default connect(
  mapStateToProps,
  {
    initializeBlogs,
    initializeUsers,
    setUser,
  }
)(App)