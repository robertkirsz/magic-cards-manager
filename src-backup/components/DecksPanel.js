import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as decksActions } from 'redux/modules/decks'
import { actions as applicationActions } from 'redux/modules/application'

import Deck from 'components/Deck'

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
    onNewDeckAdd: React.PropTypes.func
  }

  constructor () {
    super()
    this.state = {}
    this._addNewDeck = this._addNewDeck.bind(this)
    this._setNewDeckName = this._setNewDeckName.bind(this)
    this._deleteDeck = this._deleteDeck.bind(this)
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

    this.props.decksActions.createDeck({ name: this.state.newDeckName })
  }

  _setNewDeckName (e) {
    this.setState({ newDeckName: e.target.value })
  }

  _deleteDeck (deckId) {
    // Deactivate deck if it's active
    if (this.props.applicationState.activeDeck === deckId) this._makeDeckActive(deckId)
    // Delete deck
    this.props.decksActions.deleteDeck(deckId)
  }

  _makeDeckActive (deckId) {
    this.props.applicationActions.activateDeck(deckId)
  }

  render () {
    console.log('%cDecksPanel', 'color: #79BDA8;')
    const { decksCollection } = this.props

    return (
      <div className='decks-panel'>
        <h3>Decks</h3>
        <form onSubmit={this._addNewDeck}>
          <input onChange={this._setNewDeckName} />
          <button type='submit'>Add new deck</button>
        </form>
        {
          decksCollection.map(singleDeck => (
            <Deck
              key={singleDeck.id}
              deckData={singleDeck}
              onMakeDeckActive={this._makeDeckActive}
              onDeleteDeck={this._deleteDeck}
            />
          ))
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DecksPanel)
