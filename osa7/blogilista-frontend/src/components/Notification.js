import React from 'react'
import { connect } from 'react-redux'

const notificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)