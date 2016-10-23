import React, { PropTypes } from 'react'
import { Header, SearchModule } from 'components'
import './CoreLayout.scss'
import 'styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div id="app" className="container">
    <Header />
    <SearchModule />
    {children}
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
