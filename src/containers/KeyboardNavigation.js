import { Component } from 'react'
import PropTypes from 'proptypes'
import { connect } from 'react-redux'
import key from 'keyboardjs'

// TODO: on card details page focus on first card by default
// TODO: add card on enter key
// TODO: on start (when index is null) "up, right, left" goes to first car, "down" does to last
// TODO: clear index on Esc

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
      const cards = this.getCards()
      cards[this.state.mainCardIndex] && cards[this.state.mainCardIndex].focus()
    }

    // Update focus state on card details page cards
    if (this.props.onCardDetailsPage && this.state.variantCardIndex !== prevState.variantCardIndex) {
      const variants = this.getVariants()
      variants[this.state.variantCardIndex] && variants[this.state.variantCardIndex].focus()
    }
  }

  getCards = () => document.querySelectorAll('.cards-search-list .card')
  getCardWrappers = () => document.querySelectorAll('.cards-search-list .card-wrapper')

  getVariants = () => document.querySelectorAll('.card-variants-list .card')
  getVariantWrappers = () => document.querySelectorAll('.card-variants-list .card-wrapper')

  initMouseEvents = () => {
    key.bind('up', e => {
      e.preventDefault()

      if (this.props.onCardsListPage) {
        const cards = this.getCardWrappers()
        const singleCard = cards[0]

        if (singleCard) {
          const cardWidth = singleCard.getBoundingClientRect().width
          const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          const ratio = Math.floor(windowWidth / cardWidth)

          if (this.state.mainCardIndex + 1 <= ratio) return
          else this.setState({ mainCardIndex: this.state.mainCardIndex - ratio })
        }
      }

      if (this.props.onCardDetailsPage) {
        const variants = this.getVariantWrappers()
        const singleVariant = variants[0]

        if (singleVariant) {
          const variantCardWidth = singleVariant.getBoundingClientRect().width
          const parentWidth = document.querySelector('.card-variants-list').getBoundingClientRect().width
          const ratio = Math.floor(parentWidth / variantCardWidth)

          if (this.state.variantCardIndex + 1 <= ratio) return
          else this.setState({ variantCardIndex: this.state.variantCardIndex - ratio })
        }
      }
    })

    key.bind('down', e => {
      e.preventDefault()

      if (this.props.onCardsListPage) {
        const cards = this.getCardWrappers()
        const singleCard = cards[0]

        if (singleCard) {
          const cardWidth = singleCard.getBoundingClientRect().width
          const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          const ratio = Math.floor(windowWidth / cardWidth)

          if (this.state.mainCardIndex >= cards.length - ratio) this.setState({ mainCardIndex: cards.length - 1 })
          else this.setState({ mainCardIndex: this.state.mainCardIndex + ratio })
        }
      }

      if (this.props.onCardDetailsPage) {
        const variants = this.getVariantWrappers()
        const singleVariant = variants[0]

        if (singleVariant) {
          const variantCardWidth = singleVariant.getBoundingClientRect().width
          const parentWidth = document.querySelector('.card-variants-list').getBoundingClientRect().width
          const ratio = Math.floor(parentWidth / variantCardWidth)

          if (this.state.variantCardIndex >= variants.length - ratio) this.setState({ variantCardIndex: variants.length - 1 })
          else this.setState({ variantCardIndex: this.state.variantCardIndex + ratio })
        }
      }
    })

    key.bind('left', e => {
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

    key.bind('right', e => {
      e.preventDefault()

      if (this.props.onCardsListPage) {
        if (this.state.mainCardIndex === null) {
          this.setState({ mainCardIndex: 0 })
          return
        }

        const cards = this.getCardWrappers()

        if (this.state.mainCardIndex < cards.length - 1) { this.setState({ mainCardIndex: this.state.mainCardIndex + 1 }) }
      }

      if (this.props.onCardDetailsPage) {
        if (this.state.variantCardIndex === null) {
          this.setState({ variantCardIndex: 0 })
          return
        }

        const variants = this.getVariantWrappers()

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
