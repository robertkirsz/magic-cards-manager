import React from 'react'
import { IndexLink, Link } from 'react-router'
import { LatestSet } from 'components'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to="/" activeClassName="route--active">
      Home
    </IndexLink>
    {' · '}
    <Link to="/all-cards" activeClassName="route--active">
      All Cards
    </Link>
  </div>
    <LatestSet />
)

export default Header
