import React, { PropTypes } from 'react'
import './CardsSearchList.scss'
import CardBack from './card_back.jpg'
import _ from 'lodash'

export const CardsSearchList = (props) => {
  return (
    <div className="cards-search-list">
      {
        _.map(props.cards, (card) => {
          const backgroundImage = `url(http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${card.multiverseid}), url(${CardBack})`
          console.log(card)
          return (
            <div
              className="card"
              key={card.multiverseid}
              style={{ backgroundImage }}
            />
          )
        })
      }
    </div>
  )
}

CardsSearchList.propTypes = {
  cards: PropTypes.array
}

export default CardsSearchList
