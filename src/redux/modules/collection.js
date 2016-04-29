import Card from 'models/Card'
import _ from 'lodash'

const updateLocalStorage = (cardCollection) => {
  const reducedCollection = _.map(cardCollection, (singleCard) => singleCard.formatForLocalStorage())
  localStorage.setItem('mtgdbReducedCollectionRK', JSON.stringify(reducedCollection))
}

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const CLEAR_COLLECTION = 'CLEAR_COLLECTION'
export const RESTORE_COLLECTION = 'RESTORE_COLLECTION'

// ------------------------------------
// Actions
// ------------------------------------
export const addCard = (card) => ({
  type: ADD_CARD,
  payload: card
})

export const removeCard = (card) => ({
  type: REMOVE_CARD,
  payload: card
})

export const clearCollection = () => ({
  type: CLEAR_COLLECTION
})

export const restoreCollection = (collection) => ({
  type: RESTORE_COLLECTION,
  payload: collection
})

export const actions = {
  addCard,
  removeCard,
  clearCollection,
  restoreCollection
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_CARD]: (state, { payload }) => {
    console.log('%cADD_CARD payload', 'color: #A1C659;', payload)
    let newState = []
    const cardFromState = _.find(state, (objectInState) => objectInState.id === payload.id)

    if (cardFromState) {
      const foo = new Card(cardFromState)
      foo.increase()
      const cardIndex = _.findIndex(state, (objectInState) => objectInState.id === payload.id)
      newState = [
        ...state.slice(0, cardIndex),
        foo,
        ...state.slice(cardIndex + 1)
      ]
      updateLocalStorage(newState)

      return newState
    }

    newState = [
      ...state,
      new Card(payload)
    ]

    updateLocalStorage(newState)

    return newState
  },
  [REMOVE_CARD]: (state, { payload }) => {
    console.log('%cREMOVE_CARD payload', 'color: #A1C659;', payload)
    let newState = []
    const cardIndex = _.findIndex(state, (objectInState) => objectInState.id === payload.id)
    const cardFromState = _.find(state, (objectInState) => objectInState.id === payload.id)

    if (cardFromState.cardsInCollection > 1) {
      // If more then one card
      const foo = new Card(cardFromState)
      foo.decrease()
      newState = [
        ...state.slice(0, cardIndex),
        foo,
        ...state.slice(cardIndex + 1)
      ]
      updateLocalStorage(newState)

      return newState
    }

    // If only one card
    newState = [
      ...state.slice(0, cardIndex),
      ...state.slice(cardIndex + 1)
    ]

    updateLocalStorage(newState)

    return newState
  },
  [CLEAR_COLLECTION]: (state) => initialState,
  [RESTORE_COLLECTION]: (state, { payload }) => payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function collectionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
