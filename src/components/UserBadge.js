import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class UserBadge extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render () {
    const { picture } = this.props.user

    return (
      <div className="user-badge">
        <div className="user-badge__picture" style={{ backgroundImage: `url(${picture})` }} />
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(UserBadge)
