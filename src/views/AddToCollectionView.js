import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as collectionActions } from 'redux/modules/collection'
import { actions as modalsActions } from 'redux/modules/modals'
import { actions as saveAjaxActions } from 'redux/modules/saveCardsFromAjax'
import { actions as decksActions } from 'redux/modules/decks'
import { actions as applicationActions } from 'redux/modules/application'
import CardsList from 'components/CardsList'
import CardNamesList from 'components/CardNamesList'
// import DecksPanel from 'components/DecksPanel'
import Search from 'components/Search'
import Modal from 'components/Modal'

const $ = window.jQuery

const mapStateToProps = (state) => ({
  application: state.application,
  collection: state.collection,
  database: state.database,
  modals: state.modals,
  decks: state.decks
})

const mapDispatchToProps = (dispatch) => ({
  collectionActions: bindActionCreators(collectionActions, dispatch),
  modalsActions: bindActionCreators(modalsActions, dispatch),
  saveAjaxActions: bindActionCreators(saveAjaxActions, dispatch),
  decksActions: bindActionCreators(decksActions, dispatch),
  applicationActions: bindActionCreators(applicationActions, dispatch)
})

class AddToCollectionView extends React.Component {
  constructor () {
    super()
    this.state = {
      outputStyle: 'text',
      cardsToDisplay: 50,
      cardArtworks: [],
      databaseStatus: 'downloading',
      searchResults: []
    }
    this._addCardToCollection = this._addCardToCollection.bind(this)
    this._removeCardFromCollection = this._removeCardFromCollection.bind(this)
    this._searchInSets = this._searchInSets.bind(this)
    this._showMoreCards = this._showMoreCards.bind(this)
    this._updateCardNamesList = this._updateCardNamesList.bind(this)
    this._openModal = this._openModal.bind(this)
    this._addNewDeck = this._addNewDeck.bind(this)
    this._deleteDeck = this._deleteDeck.bind(this)
    this._clearDecks = this._clearDecks.bind(this)
    this._addCardToDeck = this._addCardToDeck.bind(this)
    this._makeDeckActive = this._makeDeckActive.bind(this)
  }

  static propTypes = {
    application: React.PropTypes.object,
    collection: React.PropTypes.array,
    database: React.PropTypes.object,
    collectionActions: React.PropTypes.object,
    modalsActions: React.PropTypes.object,
    saveAjaxActions: React.PropTypes.object,
    decksActions: React.PropTypes.object,
    applicationActions: React.PropTypes.object,
    modals: React.PropTypes.array,
    decks: React.PropTypes.array
  }

  componentWillMount () {
    const retrievedCollection = JSON.parse(localStorage.getItem('mtgdbCollectionRK'))

    if (retrievedCollection && retrievedCollection.length) {
      this.props.collectionActions.restoreCollection(retrievedCollection)
    }

    // Save to state, don't download if already in state
    if (!this.props.database.allCards.length && !this.props.database.allSets.length) {
      Promise
      .all([
        $.ajax({url: './AllCards.json', dataType: 'json', cache: true}),
        $.ajax({url: './AllSetsArray.json', dataType: 'json', cache: true})
      ])
      .then(function (data) { // function (data, status, xhr) {
        console.log('%cPobrano AllCards.json', 'color: #6FB3D2;')
        this.props.saveAjaxActions.saveCards({'name': 'allCards', 'data': Object.values(data[0])})
        console.log('%cPobrano AllSetsArray.json', 'color: #6FB3D2;')
        this.props.saveAjaxActions.saveCards({'name': 'allSets', 'data': data[1]})
      }.bind(this))
      .catch(function (xhr, status, error) {
        this.setState({databaseStatus: 'error'})
        console.error('Error', arguments)
      }.bind(this))
    }
  }

  _openModal (card) {
    console.log('card.id', card.id)
    this.props.modalsActions.openModal('testId')
  }

  _addCardToCollection (card) {
    this.props.collectionActions.addCard(card)
  }

  _removeCardFromCollection (card) {
    this.props.collectionActions.removeCard(card)
  }

  _searchInSets (card) {
    console.log('You clicked on a ' + card.name, card)
    let cards = []
    const allSets = this.props.database.allSets
    for (let i = 0; i < allSets.length; i++) {
      for (let j = 0; j < allSets[i].cards.length; j++) {
        if (allSets[i].cards[j].name === card.name && allSets[i].cards[j].multiverseid) {
          cards.push({
            ...allSets[i].cards[j],
            setIcon: allSets[i].code.toLowerCase()
          })
          console.log('   I found it in ' + allSets[i].name, allSets[i])
        }
      }
    }
    this.setState({cardArtworks: cards})
  }

  _showMoreCards () {
    this.setState({ cardsToDisplay: this.state.cardsToDisplay + 50 })
  }

  _updateCardNamesList (searchResults = []) {
    this.setState({ searchResults, cardArtworks: [] })
  }

  _addNewDeck (deckData) {
    this.props.decksActions.createDeck(deckData)
  }

  _deleteDeck (deckId) {
    // Deactivate deck if it's active
    if (this.props.application.activeDeck === deckId) this._makeDeckActive(deckId)
    // Delete deck
    this.props.decksActions.deleteDeck(deckId)
  }

  _clearDecks () {
    // Delete all decks
    this.props.decksActions.clearDecks()
  }

  _addCardToDeck (cardId) {
    // TODO ten cardId to teraz name. Może zamiast samego name i amount trzymać teżjakieś id?
    // Add card to the deck
    this.props.decksActions.addCardToDeck(cardId, this.props.application.activeDeck)
  }

  _makeDeckActive (deckId) {
    this.props.applicationActions.activateDeck(deckId)
  }

  render () {
    const { searchResults, cardArtworks, cardsToDisplay } = this.state
    const { collection } = this.props

    const numberOfCardsInCollection = collection.reduce((a, b) => {
      return a + b.cardsInCollection
    }, 0)

    return (
      <div className='search-in-collection-view'>
        {this.props.modals[0] === 'testId' ? <Modal /> : null}
        <Search
          collectionToSearchIn={this.props.database.allCards}
          onSearch={this._updateCardNamesList}
        />
        <div className='test'>
          <div><i className='fa fa-search' /></div>
          <div><i className='fa fa-plus-circle' /></div>
          <div><i className='fa fa-clone' /></div>
        </div>
        {
          searchResults.length ?
            <CardNamesList
              cards={searchResults.slice(0, cardsToDisplay)}
              collection={collection}
              moreCardsToShow={searchResults.length > cardsToDisplay}
              onCardClick={this._searchInSets}
              onMoreClick={this._showMoreCards}
            /> : null
        }
        {
          cardArtworks.length ?
            <div className='cardArtworks'>
              <h3>Artworks</h3>
              <CardsList
                cards={cardArtworks}
                openModal={this._openModal}
                addCard={this._addCardToCollection}
                removeCard={this._removeCardFromCollection}
              />
            </div> : null
        }
        {
          collection.length ?
            <div className='collection'>
              <h3>Collection ({numberOfCardsInCollection})</h3>
              <CardsList
                cards={collection}
                openModal={this._openModal}
                addCard={this._addCardToCollection}
                removeCard={this._removeCardFromCollection}
                addCardToDeck={this._addCardToDeck}
              />
            </div> : null
        }
        {/* }<DecksPanel
          onNewDeckAdd={this._addNewDeck}
          onDeleteDeck={this._deleteDeck}
          onClearDecks={this._clearDecks}
          onMakeDeckActive={this._makeDeckActive}
        /> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCollectionView)
