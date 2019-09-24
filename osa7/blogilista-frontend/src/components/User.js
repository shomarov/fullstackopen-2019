import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  const user = props.user

  if (!user) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user.id === ownProps.id),
  }
}


export default connect(mapStateToProps)(User)