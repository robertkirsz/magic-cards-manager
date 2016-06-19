import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  cardsCollection: state.collection,
  applicationState: state.application
})

class Deck extends React.Component {
  static propTypes = {
    deckData: React.PropTypes.object,
    applicationState: React.PropTypes.object,
    cardsCollection: React.PropTypes.array,
    onMakeDeckActive: React.PropTypes.func,
    onDeleteDeck: React.PropTypes.func
  }

  constructor () {
    super()
    this._makeDeckActive = this._makeDeckActive.bind(this)
    this._deleteDeck = this._deleteDeck.bind(this)
  }

  _makeDeckActive () {
    this.props.onMakeDeckActive(this.props.deckData.id)
  }

  _deleteDeck () {
    this.props.onDeleteDeck(this.props.deckData.id)
  }

  render () {
    const deck = this.props.deckData
    const { applicationState, cardsCollection } = this.props
    const numberOfCardsInDeck = deck.cards.reduce((a, b) => {
      return a + b.amount
    }, 0)

    return (
      <div
        key={deck.id}
        className={'deck' + (applicationState.activeDeck === deck.id ? ' active' : '')}
      >
        <main className='deck__body'>
          <p>ID: {deck.id}</p>
          <p>Name: {deck.name}</p>
          <p>Unique spells: {deck.cards.length}</p>
          <p>Number of cards: {numberOfCardsInDeck}</p>
          <ul>
            {
              cardsCollection.length ?
                deck.cards.map((cardInDeck, i) => {
                  const cardObject = _.find(cardsCollection, (cardInCollection) => cardInCollection.name === cardInDeck.name)
                  return (
                    <li key={i}>
                      {cardObject.name} ({cardInDeck.amount})
                    </li>
                  )
                })
                :
                <li>Loading cards...</li>
              }
          </ul>
        </main>
        <div className='deck__buttons'>
          <button
            className='activate-deck-button button button--icon'
            onClick={this._makeDeckActive}
          >
            <span className='fa fa-crosshairs' />
          </button>
          <button
            className='delete-deck-button button button--icon'
            onClick={this._deleteDeck}
          >
            <span className='fa fa-trash' />
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, )(Deck)
