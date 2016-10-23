import React, { PropTypes } from 'react'
import CardBack from 'components/assets/card_back.jpg'

export const Card = ({ card }) => (
  <div
    className="card"
    onClick={() => console.log(card)}
    style={{ backgroundImage: `url(${card.image}), url(${CardBack})` }}
  />
)

Card.propTypes = {
  card: PropTypes.object
}

export default Card
