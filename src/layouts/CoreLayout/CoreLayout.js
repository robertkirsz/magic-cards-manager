import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Measure from 'react-measure'
import { saveHeaderHeight } from 'store/layout'
import { Header, SearchModule, LoadingScreen } from 'components'
import 'styles/core.scss'

export const CoreLayout = (props) => (
  <div id="app">
    <LoadingScreen />
    <Measure
      onMeasure={({ height }) => {
        if (height !== props.headerHeight)
          props.saveHeaderHeight(height)
      }}
    >
      <div className="fixed-wrapper">
        <Header />
        <SearchModule />
      </div>
    </Measure>
    {props.children}
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  headerHeight: PropTypes.number,
  saveHeaderHeight: PropTypes.func
}

const mapStateToProps = ({ layout }) => ({ headerHeight: layout.headerHeight })
const mapDispatchToProps = { saveHeaderHeight }

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
