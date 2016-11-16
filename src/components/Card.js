import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactTimeout from 'react-timeout' // Prevents errors when updating unmounted component
import _ from 'lodash'
import { addCard, removeCard } from 'store/myCards'
import CardBack from 'components/assets/card_back.jpg'

export class Card extends Component {
  static propTypes = {
    mainCard: PropTypes.object,
    variantCard: PropTypes.object,
    setIcon: PropTypes.bool,
    showCount: PropTypes.bool,
    showAdd: PropTypes.bool,
    showRemove: PropTypes.bool,
    addCard: PropTypes.func,
    removeCard: PropTypes.func,
    onClick: PropTypes.func,
    setTimeout: PropTypes.func
  }

  constructor () {
    super()

    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.animate = this.animate.bind(this)

    this.state = {
      animations: []
    }
  }

  addCard () {
    this.props.addCard(this.props.mainCard, this.props.variantCard)
    this.animate('add')
  }

  removeCard () {
    this.props.removeCard(this.props.mainCard, this.props.variantCard)
    this.animate('remove')
  }

  animate (animationType) {
    const id = Date.now()
    let animations = [...this.state.animations]

    animations.push({ id, animationType })

    this.setState({ animations })

    this.props.setTimeout(() => {
      let animations = [...this.state.animations]
      const index = _.findIndex(animations, { id })

      animations = [
        ...animations.slice(0, index),
        ...animations.slice(index + 1)
      ]

      this.setState({ animations })
    }, 1000)
  }

  render () {
    const { mainCard, variantCard, setIcon, showCount, showAdd, showRemove, onClick } = this.props
    const { animations } = this.state

    const cardData = variantCard || mainCard
    const numberOfCards = <span className="card__count">{cardData.cardsInCollection}</span>
    const addRemoveControls = (
      <div className="add-remove-buttons">
        {showAdd &&
          <button onClick={this.addCard}>
            <span className="fa fa-plus-circle" />
          </button>
        }
        {showRemove &&
          <button onClick={this.removeCard}>
            <span className="fa fa-minus-circle" />
          </button>
        }
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
        {(showAdd || showRemove) && addRemoveControls}
        {
          animations.map((o) => (
            o.animationType === 'add'
              ? <span key={o.id} className="card__animation card__animation--add">+1</span>
              : <span key={o.id} className="card__animation card__animation--remove">-1</span>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { addCard, removeCard }

export default ReactTimeout(connect(mapStateToProps, mapDispatchToProps)(Card))
