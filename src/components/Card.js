import React, { PropTypes } from 'react'
import CardBack from 'components/assets/card_back.jpg'

export const Card = (props) => (
  <div
    className="card"
    onClick={props.onClick}
    style={{ backgroundImage: `url(${props.card.image}), url(${CardBack})` }}
  />
)

Card.propTypes = {
  card: PropTypes.object,
  onClick: PropTypes.func
}

export default Card
