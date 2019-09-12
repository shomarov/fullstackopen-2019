export const blogAddedNotification = (title, author) => {
  return async dispatch => {
    dispatch({
      type: 'BLOG_ADDED',
      title,
      author
    })
  }
}

export const hideNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR'
    })
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'BLOG_ADDED':
      return `a new blog ${action.title} by ${action.author} added`
    case 'CLEAR':
      return null
    default:
      return state
  }
}



export default notificationReducer