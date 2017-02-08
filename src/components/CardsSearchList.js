import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Card } from 'components'

const CardsSearchList = props => (
  <div className="cards-search-list">
    {
      props.cards.map(card => (
        <Card
          key={card.id}
          mainCard={card}
          onClick={() => { browserHistory.push(`/${props.path}/${card.cardUrl}`) }}
        />
      ))
    }
  </div>
)

CardsSearchList.propTypes = {
  cards: PropTypes.array,
  path: PropTypes.string,
  addCard: PropTypes.func
}

export default CardsSearchList
