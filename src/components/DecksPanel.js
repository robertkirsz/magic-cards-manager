import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as decksActions } from 'redux/modules/decks'
import { actions as applicationActions } from 'redux/modules/application'
import _ from 'lodash'

const mapStateToProps = (state) => ({
  decksCollection: state.decks,
  cardsCollection: state.collection,
  applicationState: state.application
})

const mapDispatchToProps = (dispatch) => ({
  decksActions: bindActionCreators(decksActions, dispatch),
  applicationActions: bindActionCreators(applicationActions, dispatch)
})

class DecksPanel extends React.Component {
  static propTypes = {
    decksCollection: React.PropTypes.array,
    cardsCollection: React.PropTypes.array,
    applicationState: React.PropTypes.object,
    decksActions: React.PropTypes.object,
    applicationActions: React.PropTypes.object,
    onNewDeckAdd: React.PropTypes.func,
    onDeleteDeck: React.PropTypes.func,
    onMakeDeckActive: React.PropTypes.func,
    onClearDecks: React.PropTypes.func
  }

  constructor () {
    super()
    this.state = {}
    this._addNewDeck = this._addNewDeck.bind(this)
    this._setNewDeckName = this._setNewDeckName.bind(this)
    this._deleteDeck = this._deleteDeck.bind(this)
    this._clearDecks = this._clearDecks.bind(this)
    this._makeDeckActive = this._makeDeckActive.bind(this)
  }

  componentWillMount () {
    const retrievedDeckCollection = JSON.parse(localStorage.getItem('mtgdbDecksRK'))

    if (retrievedDeckCollection && retrievedDeckCollection.length) {
      this.props.decksActions.restoreDeckCollection(retrievedDeckCollection)
    }
  }

  _addNewDeck (event) {
    event.preventDefault()
    if (!this.state.newDeckName) return false

    this.props.onNewDeckAdd({ name: this.state.newDeckName })
  }

  _setNewDeckName (event) {
    event.preventDefault()
    this.setState({ newDeckName: event.target.value })
  }

  _deleteDeck (deckId, event) {
    event.stopPropagation()
    this.props.onDeleteDeck(deckId)
  }

  _clearDecks () {
    this.props.onClearDecks()
  }

  _makeDeckActive (deckId) {
    this.props.onMakeDeckActive(deckId)
  }

  render () {
    console.log('%cDecksPanel', 'color: #79BDA8;')
    const { decksCollection, cardsCollection, applicationState } = this.props

    return (
      <div className='decks-panel'>
        <h3>Decks Panel! <i className='fa fa-times' onClick={this._clearDecks} /></h3>
        <form onSubmit={this._addNewDeck}>
          <input onChange={this._setNewDeckName}/>
          <button type='submit'>Add new deck</button>
        </form>
        <h4>store</h4>
        {
          decksCollection.map((deck) => {
            const numberOfCardsInDeck = deck.cards.reduce((a, b) => {
              return a + b.amount
            }, 0)
            return (
              <div
                key={deck.id}
                className={'deck' + (applicationState.activeDeck === deck.id ? ' active' : '')}
                onClick={this._makeDeckActive.bind(this, deck.id)}
              >
                <p>ID: {deck.id}</p>
                <p>Name: {deck.name}</p>
                <p>Unique spells: {deck.cards.length}</p>
                <p>Number of cards: {numberOfCardsInDeck}</p>
                <ul>
                  {
                    deck.cards.map((cardInDeck, i) => {
                      const cardObject = _.find(cardsCollection, (cardInCollection) => cardInCollection.name === cardInDeck.name)
                      return (
                        <li key={i}>
                          {cardObject.name} ({cardInDeck.amount})
                        </li>
                      )
                    })
                  }
                </ul>
                <button onClick={this._deleteDeck.bind(this, deck.id)}>Delete</button>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DecksPanel)
