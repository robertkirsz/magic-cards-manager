import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { UserBadge, LockButton } from 'components'
import { signOut } from 'store/user'
import { openModal } from 'store/layout'

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = { signOut, openModal }

export const Header = ({ user, signOut, openModal }) => {
  const { signedIn } = user

  // Brand and toggle get grouped for better mobile display
  const brandAndToggle = (
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
      <a className="navbar-brand">Magic Cards Manager</a>
    </div>
  )

  const navigationLinks = (
    <ul className="route-navigation nav navbar-nav">
      <li><Link to="all-cards" activeClassName="active">All cards</Link></li>
      <li><Link to="my-cards" activeClassName="active">My cards</Link></li>
    </ul>
  )

  const authenticationLinks = (
    <ul className="nav navbar-nav nav-pills navbar-right">
      <li role="presentation">
        <a onClick={() => openModal('sign in')}>
          Sign In
        </a>
      </li>
      <li role="presentation">
        <a onClick={() => openModal('sign up')}>
          Sign Up
        </a>
      </li>
    </ul>
  )

  // Collect the nav links, forms, and other content for toggling
  const userDropdown = (
    <ul className="nav navbar-nav navbar-right">
      <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <UserBadge />
        </a>
        <ul className="dropdown-menu">
          <li><a>Profile</a></li>
          <li><a>Settings</a></li>
          <li role="separator" className="divider" />
          <li><a onClick={signOut}>Log out</a></li>
        </ul>
      </li>
    </ul>
  )

  return (
    <nav id="MainHeader" className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        {brandAndToggle}
        <p className="navbar-text">
          {signedIn && <LockButton />}
        </p>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          {navigationLinks}
          {signedIn ? userDropdown : authenticationLinks}
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
