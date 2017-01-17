import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export class HomeView extends Component {
  static propTypes = {
    headerHeight: PropTypes.number
  }

  render () {
    return (
      <div style={{ marginTop: this.props.headerHeight + 20 }}>
        <h1>Home</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ layout }) => ({ headerHeight: layout.headerHeight })

export default connect(mapStateToProps)(HomeView)
