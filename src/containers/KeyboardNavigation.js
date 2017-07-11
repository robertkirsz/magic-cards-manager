import { Component } from 'react'
import PropTypes from 'proptypes'
import key from 'keyboardjs'

export default class KeyboardNavigation extends Component {
  static propTypes = {
    onCardsListPage: PropTypes.bool.isRequired,
    onCardDetailsPage: PropTypes.bool.isRequired
  }

  state = {
    cardIndex: null,
    cardVariantIndex: null
  }

  componentWillMount () {
    this.initMouseEvents()
  }

  componentWillUnmount () {
    key.reset()
  }

  componentDidUpdate (prevProps, prevState) {
    // Blur active card if 'cardIndex' got nullified
    if (this.state.cardIndex === null && prevState.cardIndex !== null) {
      if (document.activeElement.getAttribute('class') === 'card atvImg') {
        document.activeElement.blur()
      }
    }

    // Blur active card if 'cardVariantIndex' got nullified
    if (this.state.cardVariantIndex === null && prevState.cardVariantIndex !== null) {
      if (document.activeElement.getAttribute('class') === 'card atvImg') {
        document.activeElement.blur()
      }
    }

    // Update focus state on search list's cards
    if (this.state.cardIndex !== prevState.cardIndex) {
      const cards = document.querySelectorAll('.cards-search-list .card')
      if (__DEV__) console.log('cards', this.state.cardIndex + 1, 'of', cards.length)
      if (this.props.onCardsListPage) cards[this.state.cardIndex].focus()
    }

    // Update focus state on card details page cards
    if (this.state.variants !== prevState.cardVariantIndex) {
      const variants = document.querySelectorAll('.card-variants-list .card')
      if (__DEV__) console.log('variants', this.state.variants + 1, 'of', variants.length)
      if (this.props.onCardDetailsPage) variants[this.state.cardVariantIndex].focus()
    }
  }

  initMouseEvents = () => {
    key.bind(['up', 'left'], e => {
      e.preventDefault()

      if (this.props.onCardsListPage) {
        let cardIndex = 0
        if (this.state.cardIndex === null) cardIndex = 0
        else if (this.state.cardIndex > 0) cardIndex = this.state.cardIndex - 1
        this.setState({ cardIndex })
      }

      if (this.props.onCardDetailsPage) {
        let cardVariantIndex = 0
        if (this.state.cardVariantIndex > 0) cardVariantIndex = this.state.cardVariantIndex - 1
        this.setState({ cardVariantIndex })
      }
    })

    key.bind(['down', 'right'], e => {
      e.preventDefault()

      if (this.props.onCardsListPage) {
        if (this.state.cardIndex === null) {
          this.setState({ cardIndex: 0 })
          return
        }
        const cards = document.querySelectorAll('.cards-search-list .card')
        if (this.state.cardIndex < cards.length - 1) { this.setState({ cardIndex: this.state.cardIndex + 1 }) }
      }

      if (this.props.onCardDetailsPage) {
        if (this.state.cardVariantIndex === null) {
          this.setState({ cardVariantIndex: 0 })
          return
        }
        const variants = document.querySelectorAll('.card-variants-list .card')
        if (this.state.cardVariantIndex < variants.length - 1) { this.setState({ cardVariantIndex: this.state.cardVariantIndex + 1 }) }
      }
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
