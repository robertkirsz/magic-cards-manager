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
    variantIndex: null
  }

  componentWillMount () {
    this.initMouseEvents()
  }

  componentWillUnmount () {
    key.reset()
  }

  componentDidUpdate (prevProps, prevState) {
    // Blur active card if 'cardIndex' got nullified
    if (this.props.onCardsListPage && this.state.cardIndex === null && prevState.cardIndex !== null) {
      if (document.activeElement.getAttribute('class') === 'card atvImg') {
        document.activeElement.blur()
      }
    }

    // Blur active card if 'variantIndex' got nullified
    if (this.props.onCardDetailsPage && this.state.variantIndex === null && prevState.variantIndex !== null) {
      if (document.activeElement.getAttribute('class') === 'card atvImg') {
        document.activeElement.blur()
      }
    }

    // Update focus state on search list's cards
    if (this.props.onCardsListPage && this.state.cardIndex !== prevState.cardIndex) {
      const cards = document.querySelectorAll('.cards-search-list .card')
      if (__DEV__) console.log('cards', this.state.cardIndex + 1, 'of', cards.length)
      if (this.props.onCardsListPage) cards[this.state.cardIndex].focus()
    }

    // Update focus state on card details page cards
    if (this.props.onCardDetailsPage && this.state.variants !== prevState.variantIndex) {
      const variants = document.querySelectorAll('.card-variants-list .card')
      if (__DEV__) console.log('variants', this.state.variantIndex + 1, 'of', variants.length)
      if (this.props.onCardDetailsPage) variants[this.state.variantIndex].focus()
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
        let variantIndex = 0
        if (this.state.variantIndex > 0) variantIndex = this.state.variantIndex - 1
        this.setState({ variantIndex })
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
        if (this.state.variantIndex === null) {
          this.setState({ variantIndex: 0 })
          return
        }
        const variants = document.querySelectorAll('.card-variants-list .card')
        if (this.state.variantIndex < variants.length - 1) { this.setState({ variantIndex: this.state.variantIndex + 1 }) }
      }
    })

    key.bind('enter', e => {
      e.preventDefault()
      const activeCard = document.querySelector('.card:focus')
      if (activeCard) document.activeElement.click()
    })

    key.bind(['=', 'num+'], e => {
      e.preventDefault()
      const addButton = document.querySelector('.card:focus .card__add-remove-buttons .add-button')
      if (addButton) addButton.click()
    })

    key.bind(['-', 'num-'], e => {
      e.preventDefault()
      const removeButton = document.querySelector('.card:focus .card__add-remove-buttons .remove-button')
      if (removeButton) removeButton.click()
    })
  }

  render = () => null
}
