import React, { Component, PropTypes } from 'react'
import CardBack from './card_back.jpg'


class Card extends Component {
  static propTypes = {
    card: PropTypes.object,
    addCardToCollection: PropTypes.func,
    removeCardFromCollection: PropTypes.func,
    openModal: PropTypes.func,
    addCardToDeck: PropTypes.func,
    showControls: PropTypes.bool,
    showAddToDeckButton: PropTypes.bool
  }

  render () {
    const {
      card, addCardToCollection, removeCardFromCollection,
      showControls, openModal, addCardToDeck, showAddToDeckButton
    } = this.props
    const rarity = card.rarity.toLowerCase()
    const setIcon = card.setIcon ? <i className={'ss ss-' + card.setIcon + ' ss-' + rarity}></i> : null
    const cardsInCollection = card.cardsInCollection > 1 ? <i className='cardsInCollection'>{card.cardsInCollection}</i> : null
    const backgroundImage = 'url(http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=' + card.multiverseid + '), url(' + CardBack + ')'

    return (
      <div className='card'>
        <div
          className='card__image'
          style={{ backgroundImage }}
        />
        <div className='card__buttons'>
          <i className='fa fa-info-circle' onClick={function () { openModal(card) }} />
          {showAddToDeckButton ? <i className='fa fa-clone' onClick={addCardToDeck} /> : null}
          {
            showControls ?
              <div className='card__buttons__controls'>
                <i className='fa fa-plus-circle' onClick={addCardToCollection} />
                {
                  card.cardsInCollection ?
                    <i className='fa fa-minus-circle' onClick={removeCardFromCollection} />
                    : null
                }
              </div>
              : null
          }
        </div>
        <div className='card__info'>
          {setIcon} {cardsInCollection}
        </div>
        {/* <div className='card__details'>
          <p>{card.name}{manaCost}</p>
          <p>{card.type} <i className={'mtg magic-origins ' + rarity}></i></p>
          <p>{card.text}</p>
          <p><em>{card.flavor}</em></p>
          <p>{card.number} {card.artist}</p>
          <p>{card.power}/{card.toughness}</p>
        </div> */}
      </div>
    )
  }
}

export default Card
