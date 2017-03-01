import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import _slice from 'lodash/slice'
import { Card } from 'components'

const propTypes = {
  cards: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
}

const initialCardsNumber = 20

class CardsSearchList extends Component {
  state = { cardsLimit: initialCardsNumber }

  shouldShowButton = () => {
    return this.props.cards.length > this.state.cardsLimit
  }

  showMoreCards = () => {
    this.setState({ cardsLimit: this.state.cardsLimit + initialCardsNumber })
  }

  onCardClick = card => {
    browserHistory.push(`/${this.props.path}/${card.cardUrl}`)
  }

  render () {
    const { cards } = this.props
    const { cardsLimit } = this.state

    return (
      <div className="cards-search-list">
        {
          _slice(cards, 0, cardsLimit).map(card => (
            <Card
              key={card.id}
              mainCard={card}
              hoverAnimation
              detailsPopup
              onClick={this.onCardClick}
            />
          ))
        }
        {
          this.shouldShowButton() && (
            <div className="cards-search-list__show-more-button card" onClick={this.showMoreCards}>
              <i className="fa fa-search-plus" />
              <span className="cardsNumber">{cardsLimit} / {cards.length}</span>
            </div>
          )
        }
      </div>
    )
  }
}

CardsSearchList.propTypes = propTypes

export default CardsSearchList
