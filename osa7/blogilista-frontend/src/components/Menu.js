import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import Notification from '../components/Notification'

const style = {
  padding: 5,
  background: 'lightgrey'
}

const Menu = (props) => {
  return (
    <div>
      <div style={style}>
        <Link to="/" style={style}>blogs</Link>
        <Link to="/users" style={style}>users</Link>
        <span style={style}>{props.user.name} logged in</span>
        <button onClick={() => props.logout()} >logout</button>
      </div>
      <Notification message={props.notification} />
      <h2>blog app</h2>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification
  }
}

export default connect(mapStateToProps, { logout })(Menu)