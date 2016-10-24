import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import CardBack from 'components/assets/card_back.jpg'

const cardClick = (id) => {
  browserHistory.push(`/cards/${id}`)
}

export const Card = ({ card }) => (
  <div
    className="card"
    onClick={() => { cardClick(card.id) }}
    style={{ backgroundImage: `url(${card.image}), url(${CardBack})` }}
  />
)

Card.propTypes = {
  card: PropTypes.object
}

export default Card
