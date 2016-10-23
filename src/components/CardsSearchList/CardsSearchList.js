import React, { PropTypes } from 'react'
import './CardsSearchList.scss'
import CardBack from './card_back.jpg'
import _ from 'lodash'

export const CardsSearchList = (props) => {
  return (
    <div className="cards-search-list">
      {
        _.map(props.cards, (card) => (
          <div
            className="card"
            onClick={() => console.log(card)}
            key={card.multiverseid}
            style={{ backgroundImage: `url(${card.image}), url(${CardBack})` }}
            />
          ))
      }
    </div>
  )
}

CardsSearchList.propTypes = {
  cards: PropTypes.array
}

export default CardsSearchList
