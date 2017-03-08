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

  state = {
    cardIndex: 0
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
        e.preventDefault()
        const cards = document.querySelectorAll('.cards-search-list .card-wrapper')

        if (this.state.cardIndex > 0) {
          console.log('cards', cards.length, cards[0])
          cards[this.state.cardIndex].focus()
          this.setState({ cardIndex: this.state.cardIndex - 1 })
        }
      })

      key.bind('down', e => {
        e.preventDefault()
        const cards = document.querySelectorAll('.cards-search-list .card-wrapper')

        // TODO: not working correctly

        if (this.state.cardIndex < cards.length - 1) {
          console.log('cards', cards.length, cards[0])
          cards[this.state.cardIndex].focus()
          this.setState({ cardIndex: this.state.cardIndex + 1 })
        }
      })
    })
  }

  render = () => null
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardNavigation)
