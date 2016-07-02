import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as collectionActions } from 'redux/modules/collection'
import { actions as modalActions } from 'redux/modules/modal'
import { actions as saveAjaxActions } from 'redux/modules/saveCardsFromAjax'
import { actions as decksActions } from 'redux/modules/decks'
import { actions as applicationActions } from 'redux/modules/application'
import CoolCardsDisplay from 'components/CoolCardsDisplay'
import CardsList from 'components/CardsList'
import CardNamesList from 'components/CardNamesList'
import DecksPanel from 'components/DecksPanel'
import Search from 'components/Search'
import Modal from 'components/Modal'
import _ from 'lodash'
import Card from 'models/Card'
import CollectionStats from 'components/CollectionStats'

// TODO - czyścić stan wyszukiwania pomiędzy przelączaniem Searcha

const $ = window.jQuery

const mapStateToProps = (state) => ({
  application: state.application,
  cardsCollectionFromStore: state.collection,
  database: state.database,
  modal: state.modal,
  decks: state.decks
})

const mapDispatchToProps = (dispatch) => ({
  collectionActions: bindActionCreators(collectionActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  saveAjaxActions: bindActionCreators(saveAjaxActions, dispatch),
  decksActions: bindActionCreators(decksActions, dispatch),
  applicationActions: bindActionCreators(applicationActions, dispatch)
})

class MainView extends React.Component {
  constructor () {
    super()
    this.state = {
      outputStyle: 'text',
      cardsToDisplay: 50,
      cardArtworks: [],
      databaseStatus: 'downloading',
      searchResults: [],
      searchCollectionResults: [],
      showSearchDatabasePanel: false, // Shows search database panel when true
      showSearchCollectionPanel: false, // Shows search collection panel when true
      showDecksPanel: false, // Shows search collection panel when true
      showCoolCards: true
    }
    this._addCardToCollection = this._addCardToCollection.bind(this)
    this._removeCardFromCollection = this._removeCardFromCollection.bind(this)
    this._searchInSets = this._searchInSets.bind(this)
    this._showMoreCards = this._showMoreCards.bind(this)
    this._updateCardNamesList = this._updateCardNamesList.bind(this)
    this._openModal = this._openModal.bind(this)
    this._filterCollection = this._filterCollection.bind(this)
    this._addCardToDeck = this._addCardToDeck.bind(this)
  }

  static propTypes = {
    application: React.PropTypes.object,
    cardsCollectionFromStore: React.PropTypes.array,
    database: React.PropTypes.object,
    collectionActions: React.PropTypes.object,
    modalActions: React.PropTypes.object,
    saveAjaxActions: React.PropTypes.object,
    decksActions: React.PropTypes.object,
    applicationActions: React.PropTypes.object,
    modal: React.PropTypes.object,
    decks: React.PropTypes.array
  }

  componentWillMount () {
    // Save in the store, don't download if already in store
    if (!this.props.database.allCards.length && !this.props.database.allSets.length) {
      Promise
      .all([
        $.ajax({url: './AllCards.json', dataType: 'json', cache: true}),
        $.ajax({url: './AllSetsArray.json', dataType: 'json', cache: true})
      ])
      .then(function (data) { // function (data, status, xhr) {
        const allSets = data[1]
        // Save all card data in the store
        console.log('%cPobrano AllCards.json', 'color: #6FB3D2;')
        this.props.saveAjaxActions.saveCards({'name': 'allCards', 'data': Object.values(data[0])})
        console.log('%cPobrano AllSetsArray.json', 'color: #6FB3D2;')
        this.props.saveAjaxActions.saveCards({'name': 'allSets', 'data': allSets})
        // Retrieve card data from local Storage
        const retrievedReducedCollection = JSON.parse(localStorage.getItem('mtgdbReducedCollectionRK'))
        // For each card from the 'retrievedCollection'...
        const transformedRetrievedReducedCollection = _.map(
          retrievedReducedCollection,
          (retrievedCard) => {
            // For each card set...
            for (let i = 0; i < allSets.length; i++) {
              // And for each card in each set...
              for (let j = 0; j < allSets[i].cards.length; j++) {
                // If that card's id is the same as the id of the retrieved card...
                if (allSets[i].cards[j].id === retrievedCard.id) {
                  // Return it
                  return new Card({ ...allSets[i].cards[j], ...retrievedCard })
                }
              }
            }
          }
        )
        // Save retrievedCollection in the store
        if (transformedRetrievedReducedCollection.length) {
          this.props.collectionActions.restoreCollection(transformedRetrievedReducedCollection)
        }
      }.bind(this))
      .catch(function (xhr, status, error) {
        this.setState({databaseStatus: 'error'})
        console.error('Error', arguments)
      }.bind(this))
    }
  }

  componentWillReceiveProps (nextProps) {
    // Get sample from a collection when it arives
    if (
      this.props.cardsCollectionFromStore.length === 0 &&
      nextProps.cardsCollectionFromStore.length !== 0 &&
      this.state.searchCollectionResults.length === 0
    ) {
      this.setState({ searchCollectionResults: _.sampleSize(nextProps.cardsCollectionFromStore, 26) })
    }
  }

  _openModal (cardToDisplay) {
    this.props.modalActions.openModal({ modalName: 'card-details', cardToDisplay })
  }

  _addCardToCollection (card) {
    this.props.collectionActions.addCard(card)
  }

  _removeCardFromCollection (card) {
    this.props.collectionActions.removeCard(card)
  }

  _searchInSets (card) {
    // console.log('You clicked on a ' + card.name, card)
    let cards = []
    const allSets = this.props.database.allSets
    // For each card set...
    for (let i = 0; i < allSets.length; i++) {
      // And for each card in each set...
      for (let j = 0; j < allSets[i].cards.length; j++) {
        // If that card's name is the same as clicked card name and it has a 'multiverseid'...
        if (allSets[i].cards[j].name === card.name && allSets[i].cards[j].multiverseid) {
          // Add that card to an array
          cards.push({
            ...allSets[i].cards[j],
            setIcon: allSets[i].code.toLowerCase()
          })
          // console.log('   I found it in ' + allSets[i].name, allSets[i])
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

  _filterCollection (searchCollectionResults = []) {
    this.setState({ searchCollectionResults, searchResults: [], cardArtworks: [] })
  }

  // DECKS

  _addCardToDeck (cardId) {
    // TODO ten cardId to teraz name. Może zamiast samego name i amount trzymać teżjakieś id?
    // Add card to the deck
    this.props.decksActions.addCardToDeck(cardId, this.props.application.activeDeck)
  }

  render () {
    const {
      searchResults, cardArtworks, cardsToDisplay,
      searchCollectionResults, showDecksPanel, showCoolCards,
      showSearchDatabasePanel, showSearchCollectionPanel
    } = this.state
    const { database, cardsCollectionFromStore } = this.props
    const numberOfCardsInCollection = cardsCollectionFromStore.reduce((a, b) => a + b.cardsInCollection, 0)

    const cardsCollectionPanel = (
      <div className='cards-collection-panel'>
        <h3>Collection ({numberOfCardsInCollection})</h3>
        {/* <CollectionStats /> */}
        {
          showCoolCards ?
            <CoolCardsDisplay
              cards={searchCollectionResults}
              onClick={() => { this.setState({ showCoolCards: false }) }}
            />
            :
            <CardsList
              cards={searchCollectionResults}
              openModal={this._openModal}
              addCard={this._addCardToCollection}
              removeCard={this._removeCardFromCollection}
              addCardToDeck={this._addCardToDeck}
            />
        }
      </div>
    )
    const cardNamesList = (
      <CardNamesList
        cards={searchResults.slice(0, cardsToDisplay)}
        collection={cardsCollectionFromStore}
        moreCardsToShow={searchResults.length > cardsToDisplay}
        onCardClick={this._searchInSets}
        onMoreClick={this._showMoreCards}
      />
    )
    const cardArtworksPanel = (
      <div className='card-artworks-panel'>
        <h3>Artworks</h3>
        <CardsList
          cards={cardArtworks}
          openModal={this._openModal}
          addCard={this._addCardToCollection}
          removeCard={this._removeCardFromCollection}
        />
      </div>
    )
    const panelsNavigationButtons = (
      <div className='panels-navigation-buttons'>
        <div
          className={'panels-navigation-buttons__button' + (showSearchCollectionPanel ? ' panels-navigation-buttons__button--active' : '')}
          onClick={() => { this.setState({ showSearchCollectionPanel: !showSearchCollectionPanel, showSearchDatabasePanel: false }) }}
        >
          <i className='icon fa fa-search' />
        </div>
        <div
          className={'panels-navigation-buttons__button' + (showSearchDatabasePanel ? ' panels-navigation-buttons__button--active' : '')}
          onClick={() => { this.setState({ showSearchDatabasePanel: !showSearchDatabasePanel, showSearchCollectionPanel: false }) }}
        >
          <i className='icon fa fa-plus-circle' />
        </div>
        <div
          className={'panels-navigation-buttons__button' + (showDecksPanel ? ' panels-navigation-buttons__button--active' : '')}
          onClick={() => { this.setState({ showDecksPanel: !showDecksPanel }) }}
        >
          <i className='icon fa fa-clone' />
        </div>
      </div>
    )
    const searchDatabasePanel = (
      <Search
        title='Search Database'
        collectionToSearchIn={database.allCards}
        onSearch={this._updateCardNamesList}
      />
    )
    const searchCollectionPanel = (
      <Search
        title='Search Collection'
        collectionToSearchIn={cardsCollectionFromStore}
        onSearch={this._filterCollection}
        allowToFilterWholeCollection
      />
    )

    return (
      <div className='search-in-collection-view'>
        {this.props.modal ? <Modal /> : null}
        {showSearchDatabasePanel ? searchDatabasePanel : null}
        {showSearchCollectionPanel ? searchCollectionPanel : null}
        {panelsNavigationButtons}
        {searchResults.length ? cardNamesList : null}
        {cardArtworks.length ? cardArtworksPanel : null}
        {cardsCollectionFromStore.length ? cardsCollectionPanel : null}
        {showDecksPanel ? <DecksPanel /> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
