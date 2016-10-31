import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Card } from 'components'
import _ from 'lodash'

export const CardsSearchList = (props) => {
  return (
    <div className="cards-search-list">
      {_.map(props.cards, (card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => { browserHistory.push(`/cards/${card.cardUrl}`) }}
        />
      ))}
    </div>
  )
}

CardsSearchList.propTypes = {
  cards: PropTypes.array,
  addCard: PropTypes.func
}

export default CardsSearchList
