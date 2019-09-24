import blogService from '../services/blogs'
import loginService from '../services/login'
import { initializeBlogs } from './blogReducer'
import { showError, hideError } from './errorReducer'

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(showError())
      setTimeout(() => {
        dispatch(hideError())
      }, 5000)
    }
  }
}

export const setUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}


export default userReducer