import React from 'react'
import { connect } from 'react-redux'
import { ManaCost, bracketsToArray } from 'utils'

const mapStateToProps = (state) => ({
  application: state.application
})

const Card = ({
  card, addCardToCollection, removeCardFromCollection,
  showControls, openModal, addCardToDeck, showAddToDeckButton }) => {
  // Jeśli karta ma 'manaCost', zbierz ją do tablicy
  const manaCostArray = (card.manaCost !== undefined) ? bracketsToArray(card.manaCost) : card.manaCost
  // Na podstawie tablicy wygeneruj ikony many
  const manaCost = (card.manaCost !== undefined) ? <ManaCost manaArray={manaCostArray} /> : null
  const rarity = card.rarity.toLowerCase()
  const setIcon = card.setIcon ? <i className={'ss ss-' + card.setIcon + ' ss-' + rarity}></i> : null
  const cardsInCollection = card.cardsInCollection > 1
    ? <i className='cardsInCollection'>{card.cardsInCollection}</i> : null

  return (
    <div className='card'>
      <div className='card__image'>
        <img src={'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=' + card.multiverseid} />
      </div>
      <span>{setIcon} {cardsInCollection}</span>
      <i className='fa fa-search' onClick={function () { openModal(card) }} />
      {showAddToDeckButton ? <i className='fa fa-clone' onClick={addCardToDeck} /> : null}
      {
        showControls ?
          <div className='card__controls'>
            <button onClick={addCardToCollection}>
              <i className='fa fa-plus-circle' />
            </button>
            {
              card.cardsInCollection ?
                <button onClick={removeCardFromCollection}>
                  <i className='fa fa-minus-circle' />
                </button>
                : null
            }
          </div>
          : null
      }
      <div className='card__info'>
        <p>{card.name}{manaCost}</p>
        <p>{card.type} <i className={'mtg magic-origins ' + rarity}></i></p>
        <p>{card.text}</p>
        <p><em>{card.flavor}</em></p>
        <p>{card.number} {card.artist}</p>
        <p>{card.power}/{card.toughness}</p>
      </div>
    </div>
  )
}

class CardsList extends React.Component {
  static propTypes = {
    cards: React.PropTypes.array,
    addCard: React.PropTypes.func,
    removeCard: React.PropTypes.func,
    onAddClick: React.PropTypes.func,
    onRemoveClick: React.PropTypes.func,
    openModal: React.PropTypes.func,
    application: React.PropTypes.object,
    addCardToDeck: React.PropTypes.func
  }

  // key={card.id + '' + i} pozwala na wyświetlanie duplikatów
  // Zrobić żeby przy outputStyle == picture nie renderował opisu zamiast tylko go ukrywać w css
  render () {
    const { addCard, removeCard, application, openModal, addCardToDeck } = this.props

    return (
      <div className='cardList'>
        {this.props.cards.map((card, i) => (
          <Card
            key={card.id + '' + i}
            card={card}
            openModal={openModal}
            showControls={!application.locked}
            addCardToCollection={function () { addCard(card) }}
            removeCardFromCollection={function () { removeCard(card) }}
            addCardToDeck={function () { addCardToDeck(card.name) }}
            showAddToDeckButton={application.activeDeck !== null}
          />))}
      </div>
    )
  }
}

export default connect(mapStateToProps)(CardsList)
