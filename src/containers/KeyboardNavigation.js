import { Component, PropTypes } from 'react'
import key from 'keyboardjs'
import { connect } from 'react-redux'
import { toggleKeyboardMode } from 'store/keyboard'

const mapStateToProps = ({ keyboard }) => ({ keyboard })

const mapDispatchToProps = { toggleKeyboardMode }

class KeyboardNavigation extends Component {
  static propTypes = {
    toggleKeyboardMode: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.initMouseEvents()
  }

  componentWillUnmount () {
    key.reset()
  }

  initMouseEvents = () => {
    key.bind('alt + k', () => {
      this.props.toggleKeyboardMode()
    })
  }

  render = () => null
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardNavigation)
