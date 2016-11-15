import React, { PropTypes } from 'react'
import CardBack from 'components/assets/card_back.jpg'

export const Card = ({ card, onClick, setIcon }) => {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ backgroundImage: `url(${card.image}), url(${CardBack})` }}
    >
      {setIcon && <i className={card.setIcon} />}
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.object,
  onClick: PropTypes.func,
  setIcon: PropTypes.bool
}

export default Card
