import { Component, PropTypes } from 'react'
import key from 'keyboardjs'
import { connect } from 'react-redux'
import { toggleKeyboardMode } from 'store/keyboard'

const mapStateToProps = ({ keyboard }) => ({ keyboard })

const mapDispatchToProps = { toggleKeyboardMode }

class KeyboardNavigation extends Component {
  static propTypes = {
    keyboard: PropTypes.object.isRequired,
    toggleKeyboardMode: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.initMouseEvents()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.keyboard.keyboardMode && !this.props.keyboard.keyboardMode) {
      key.setContext('keyboardMode')
    }

    if (!nextProps.keyboard.keyboardMode && this.props.keyboard.keyboardMode) {
      key.setContext('default')
    }
  }

  componentWillUnmount () {
    key.reset()
  }

  initMouseEvents = () => {
    // TODO: this doesn't work when there is a context set
    key.bind('alt + k', e => {
      e.preventRepeat()
      this.props.toggleKeyboardMode()
    })

    key.withContext('keyboardMode', () => {
      key.bind('up', e => {
        const cards = document.querySelectorAll('.cards-search-list .card-wrapper')
        console.log('cards', cards.length)
      })
    })
  }

  render = () => null
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardNavigation)
