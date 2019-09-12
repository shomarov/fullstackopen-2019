import blogService from '../services/blogs'

export const login = (user) => {
  return async dispatch => {
    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      data: user
    })
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