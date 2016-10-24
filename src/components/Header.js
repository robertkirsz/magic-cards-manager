import React from 'react'
import { IndexLink, Link } from 'react-router'
import { LatestSet } from 'components'

export const Header = () => (
  <header className="header">
    <ul className="nav nav-pills">
      <li className="nav-item">
        <IndexLink to="/" className="nav-link" activeClassName="active">Home</IndexLink>
      </li>
      <li className="nav-item">
        <Link to="/cards" className="nav-link" activeClassName="active">All cards</Link>
      </li>
    </ul>
    <LatestSet />
  </header>
)

export default Header
