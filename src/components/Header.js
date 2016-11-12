import React from 'react'
import { IndexLink, Link } from 'react-router'
import { LatestSet } from 'components'

export const Header = () => (
  <header className="main-header">
    <nav className="route-navigation">
      <IndexLink to="/" className="nav-link" activeClassName="active">Home</IndexLink>
      <Link to="/all-cards" className="nav-link" activeClassName="active">All cards</Link>
      <Link to="/my-cards" className="nav-link" activeClassName="active">My cards</Link>
    </nav>
    <LatestSet />
  </header>
)

export default Header
