import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import Notification from '../components/Notification'

import styled from 'styled-components'

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const style = {
  padding: 5,
}

const Menu = (props) => {
  return (
    <div>
      <Navigation>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <span style={style}>{props.user.name} logged in</span>
        <button id='logoutButton' onClick={() => props.logout()} >logout</button>
      </Navigation>
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