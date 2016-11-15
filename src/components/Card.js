import React, { PropTypes } from 'react'
import CardBack from 'components/assets/card_back.jpg'

export const Card = ({ card, onClick, setIcon, showCount }) => {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ backgroundImage: `url(${card.image}), url(${CardBack})` }}
    >
      {setIcon && <span className={card.setIcon} />}
      {
        showCount &&
        card.cardsInCollection > 0 &&
        <span className="card__count">
          {card.cardsInCollection}
        </span>
      }
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.object,
  onClick: PropTypes.func,
  setIcon: PropTypes.bool,
  showCount: PropTypes.bool
}

export default Card
