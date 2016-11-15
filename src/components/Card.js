import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addCard, removeCard } from 'store/myCards'
import CardBack from 'components/assets/card_back.jpg'

export class Card extends Component {
  static propTypes = {
    mainCard: PropTypes.object,
    variantCard: PropTypes.object,
    setIcon: PropTypes.bool,
    showCount: PropTypes.bool,
    showAddRemove: PropTypes.bool,
    addCard: PropTypes.func,
    removeCard: PropTypes.func,
    onClick: PropTypes.func
  }

  constructor () {
    super()

    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
  }

  addCard () {
    this.props.addCard(this.props.mainCard, this.props.variantCard)
  }

  removeCard () {
    this.props.removeCard(this.props.mainCard, this.props.variantCard)
  }

  render () {
    const { mainCard, variantCard, setIcon, showCount, showAddRemove, onClick } = this.props

    const cardData = variantCard || mainCard
    const numberOfCards = <span className="card__count">{cardData.cardsInCollection}</span>
    const addRemoveControls = (
      <div>
        <button onClick={this.addCard}>+</button>
        <button onClick={this.removeCard}>-</button>
      </div>
    )

    return (
      <div
        className="card"
        onClick={onClick}
        style={{ backgroundImage: `url(${cardData.image}), url(${CardBack})` }}
      >
        {setIcon && <span className={cardData.setIcon} />}
        {showCount && numberOfCards}
        {showAddRemove && addRemoveControls}
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { addCard, removeCard }

export default connect(mapStateToProps, mapDispatchToProps)(Card)
