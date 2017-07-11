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

  state = { cardIndex: null }

  componentWillMount () {
    this.initMouseEvents()
  }

  componentWillUnmount () {
    key.reset()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.cardIndex !== prevState.cardIndex) {
      const cards = document.querySelectorAll('.cards-search-list .card')
      cards[this.state.cardIndex].focus()
    }
  }

  initMouseEvents = () => {
    key.bind(['up', 'left'], e => {
      e.preventDefault()

      console.log('up')

      let cardIndex = ''

      if (this.state.cardIndex === null) cardIndex = 0
      else if (this.state.cardIndex > 0) cardIndex = this.state.cardIndex - 1

      this.setState({ cardIndex })
    })

    key.bind(['down', 'right'], e => {
      e.preventDefault()
      if (this.state.cardIndex === null) {
        this.setState({ cardIndex: 0 })
        return
      }
      const cards = document.querySelectorAll('.cards-search-list .card')
      if (this.state.cardIndex < cards.length - 1) this.setState({ cardIndex: this.state.cardIndex + 1 })
    })

    key.bind('enter', e => {
      e.preventDefault()
      if (document.activeElement.getAttribute('class') === 'card atvImg') {
        document.activeElement.click()
      }
    })
  }

  render = () => null
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardNavigation)
