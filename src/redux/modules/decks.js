import Deck from 'models/Deck'
import _ from 'lodash'

const updateLocalStorage = (decks) => {
  localStorage.setItem('mtgdbDecksRK', JSON.stringify(decks))
}

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_DECK = 'CREATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'
export const CLEAR_DECKS = 'CLEAR_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const RESTORE_DECK_COLLECTION = 'RESTORE_DECK_COLLECTION'

// ------------------------------------
// Actions
// ------------------------------------
export const createDeck = (deck) => ({
  type: CREATE_DECK,
  payload: deck
})

export const deleteDeck = (deckId) => ({
  type: DELETE_DECK,
  payload: deckId
})

export const updateDeck = (deckId, propertyName, newValue) => ({
  type: UPDATE_DECK,
  payload: { deckId, propertyName, newValue }
})

export const clearDecks = () => ({
  type: CLEAR_DECKS
})

export const addCardToDeck = (cardId, deckId) => ({
  type: ADD_CARD_TO_DECK,
  payload: { cardId, deckId }
})

export const restoreDeckCollection = (deckCollection) => ({
  type: RESTORE_DECK_COLLECTION,
  payload: deckCollection
})

export const actions = {
  createDeck,
  deleteDeck,
  updateDeck,
  clearDecks,
  addCardToDeck,
  restoreDeckCollection
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_DECK]: (state, { payload }) => {
    console.log('%cCREATE_DECK payload', 'color: #A1C659;', payload)

    const newDeck = new Deck(payload)
    const newState = [
      ...state,
      newDeck
    ]

    updateLocalStorage(newState)

    return newState
  },
  [DELETE_DECK]: (state, { payload }) => {
    console.log('%cDELETE_DECK payload', 'color: #A1C659;', payload)

    const deckIndex = _.findIndex(state, (objectInState) => objectInState.id === payload)

    const newState = [
      ...state.slice(0, deckIndex),
      ...state.slice(deckIndex + 1)
    ]

    updateLocalStorage(newState)

    return newState
  },
  [UPDATE_DECK]: (state) => (state, { payload }) => {
    console.log('%cUPDATE_DECK payload', 'color: #A1C659;', payload)
    const deckFromState = _.find(state, (objectInState) => objectInState.id === payload.deckId)
    const deckIndex = _.findIndex(state, (objectInState) => objectInState.id === payload.deckId)
    const updatedDeck = new Deck(deckFromState)

    updatedDeck[payload.propertyName] = payload.newValue

    const newState = [
      ...state.slice(0, deckIndex),
      updatedDeck,
      ...state.slice(deckIndex + 1)
    ]

    updateLocalStorage(newState)

    return newState
  },
  [CLEAR_DECKS]: (state) => {
    console.log('%cCLEAR_DECKS', 'color: #A1C659;')
    updateLocalStorage([])

    return []
  },
  [ADD_CARD_TO_DECK]: (state, { payload }) => {
    console.log('%cADD_CARD_TO_DECK payload', 'color: #A1C659;', payload)
    const deckFromState = _.find(state, (objectInState) => objectInState.id === payload.deckId)
    const deckIndex = _.findIndex(state, (objectInState) => objectInState.id === payload.deckId)
    const updatedDeck = new Deck(deckFromState)

    updatedDeck.addCard(payload.cardId)

    const newState = [
      ...state.slice(0, deckIndex),
      updatedDeck,
      ...state.slice(deckIndex + 1)
    ]

    updateLocalStorage(newState)

    return newState
  },
  [RESTORE_DECK_COLLECTION]: (state, { payload }) => {
    console.log('%cRESTORE_DECK_COLLECTION payload', 'color: #A1C659;', payload)

    return payload
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function deckReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
