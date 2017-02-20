import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user })

const propTypes = { user: PropTypes.object }

const UserBadge = ({ user: { displayName, email, photoURL } }) => (
  <div
    className="user-badge"
    title={displayName || email}
    style={{ backgroundImage: `url(${photoURL})` }}
  />
)

UserBadge.propTypes = propTypes

export default connect(mapStateToProps)(UserBadge)
