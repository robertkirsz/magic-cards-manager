import React, { PropTypes } from 'react'
import { Card } from 'components'
import _ from 'lodash'

export const CardsSearchList = (props) => {
  return (
    <div className="cards-search-list">
      {_.map(props.cards, (card) => <Card key={card.id} card={card} />)}
    </div>
  )
}

CardsSearchList.propTypes = {
  cards: PropTypes.array
}

export default CardsSearchList
