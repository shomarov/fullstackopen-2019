export const showError = () => {
  return async dispatch => {
    dispatch({
      type: 'BAD_LOGIN'
    })
  }
}

export const hideError = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR'
    })
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'BAD_LOGIN':
      return 'wrong username or password'
    case 'CLEAR':
      return null
    default:
      return state
  }
}


export default notificationReducer