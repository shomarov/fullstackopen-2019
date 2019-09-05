const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: null
      })
    }, time)
  }
}


export default notificationReducer