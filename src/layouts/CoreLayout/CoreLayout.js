import React, { PropTypes } from 'react'
import { Header, SearchModule, LoadingScreen } from 'components'
import 'styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div id="app">
    <LoadingScreen />
    <div className="fixed-wrapper">
      <Header />
      <SearchModule />
    </div>
    {children}
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
