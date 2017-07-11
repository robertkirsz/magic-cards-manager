import { Component } from 'react'
import PropTypes from 'proptypes'
import { connect } from 'react-redux'
import key from 'keyboardjs'

const mapStateToProps = ({ keyboard }) => ({
  mainCardFocusSetIndex: keyboard.mainCardFocusSetIndex,
  mainCardFocusResetIndexTimestamp: keyboard.mainCardFocusResetIndexTimestamp,
  variantCardFocusSetIndex: keyboard.variantCardFocusSetIndex,
  variantCardFocusResetIndexTimestamp: keyboard.variantCardFocusResetIndexTimestamp
})

class KeyboardNavigation extends Component {
  static propTypes = {
    onCardsListPage: PropTypes.bool.isRequired,
    onCardDetailsPage: PropTypes.bool.isRequired,
    mainCardFocusSetIndex: PropTypes.number,
    mainCardFocusResetIndexTimestamp: PropTypes.number.isRequired,
    variantCardFocusSetIndex: PropTypes.number,
    variantCardFocusResetIndexTimestamp: PropTypes.number.isRequired
  }

  state = {
    mainCardIndex: null,
    variantCardIndex: null
  }

  componentWillMount () {
    this.initMouseEvents()
  }

  componentWillUnmount () {
    key.reset()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.mainCardFocusSetIndex !== nextProps.mainCardFocusSetIndex) {
      this.setState({ mainCardIndex: nextProps.mainCardFocusSetIndex })
    }

    if (this.props.mainCardFocusResetIndexTimestamp !== nextProps.mainCardFocusResetIndexTimestamp) {
      this.setState({ mainCardIndex: null })
    }

    if (this.props.variantCardFocusSetIndex !== nextProps.variantCardFocusSetIndex) {
      this.setState({ variantCardIndex: nextProps.mainCardFocusSetIndex })
    }

    if (this.props.variantCardFocusResetIndexTimestamp !== nextProps.variantCardFocusResetIndexTimestamp) {
      this.setState({ variantCardIndex: null })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // Blur active card if 'mainCardIndex' got nullified
    if (this.props.onCardsListPage && this.state.mainCardIndex === null && prevState.mainCardIndex !== null) {
      if (document.activeElement.getAttribute('class') === 'card atvImg') {
        document.activeElement.blur()
      }
    }

    // Blur active card if 'variantCardIndex' got nullified
    if (this.props.onCardDetailsPage && this.state.variantCardIndex === null && prevState.variantCardIndex !== null) {
      if (document.activeElement.getAttribute('class') === 'card atvImg') {
        document.activeElement.blur()
      }
    }

    // Update focus state on search list's cards
    if (this.props.onCardsListPage && this.state.mainCardIndex !== prevState.mainCardIndex) {
      const cards = document.querySelectorAll('.cards-search-list .card')
      if (__DEV__) console.log('cards', this.state.mainCardIndex + 1, 'of', cards.length)
      if (this.props.onCardsListPage) cards[this.state.mainCardIndex] && cards[this.state.mainCardIndex].focus()
    }

    // Update focus state on card details page cards
    if (this.props.onCardDetailsPage && this.state.variants !== prevState.variantCardIndex) {
      const variants = document.querySelectorAll('.card-variants-list .card')
      if (__DEV__) console.log('variants', this.state.variantCardIndex + 1, 'of', variants.length)
      if (this.props.onCardDetailsPage) variants[this.state.variantCardIndex] && variants[this.state.variantCardIndex].focus()
    }
  }

  initMouseEvents = () => {
    key.bind(['up', 'left'], e => {
      e.preventDefault()

      if (this.props.onCardsListPage) {
        let mainCardIndex = 0
        if (this.state.mainCardIndex === null) mainCardIndex = 0
        else if (this.state.mainCardIndex > 0) mainCardIndex = this.state.mainCardIndex - 1
        this.setState({ mainCardIndex })
      }

      if (this.props.onCardDetailsPage) {
        let variantCardIndex = 0
        if (this.state.variantCardIndex > 0) variantCardIndex = this.state.variantCardIndex - 1
        this.setState({ variantCardIndex })
      }
    })

    key.bind(['down', 'right'], e => {
      e.preventDefault()

      if (this.props.onCardsListPage) {
        if (this.state.mainCardIndex === null) {
          this.setState({ mainCardIndex: 0 })
          return
        }
        const cards = document.querySelectorAll('.cards-search-list .card')
        if (this.state.mainCardIndex < cards.length - 1) { this.setState({ mainCardIndex: this.state.mainCardIndex + 1 }) }
      }

      if (this.props.onCardDetailsPage) {
        if (this.state.variantCardIndex === null) {
          this.setState({ variantCardIndex: 0 })
          return
        }
        const variants = document.querySelectorAll('.card-variants-list .card')
        if (this.state.variantCardIndex < variants.length - 1) { this.setState({ variantCardIndex: this.state.variantCardIndex + 1 }) }
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

export default connect(mapStateToProps)(KeyboardNavigation)
