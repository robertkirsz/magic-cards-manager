import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user })

class UserBadge extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render () {
    const { name, email, picture } = this.props.user

    return (
      <div className="user-badge">
        <div
          className="user-badge__picture"
          style={{ backgroundImage: `url(${picture})` }}
          title={name || email}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(UserBadge)
