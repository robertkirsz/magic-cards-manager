import _ from 'lodash'
import Card from 'classes/Card'

const updateLocalStorage = (cardMyCards) => {
  // const reducedMyCards = _.map(cardMyCards, (singleCard) => singleCard.formatForLocalStorage())
  // localStorage.setItem('mtgdbReducedMyCardsRK', JSON.stringify(reducedMyCards))
}

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const CLEAR_MY_CARDS = 'CLEAR_MY_CARDS'
export const RESTORE_MY_CARDS = 'RESTORE_MY_CARDS'

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

export const clearMyCards = () => ({
  type: CLEAR_MY_CARDS
})

export const restoreMyCards = (cards) => ({
  type: RESTORE_MY_CARDS,
  payload: cards
})

export const actions = {
  addCard,
  removeCard,
  clearMyCards,
  restoreMyCards
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

    if (cardFromState.cardsInMyCards > 1) {
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
  [CLEAR_MY_CARDS]: (state) => initialState,
  [RESTORE_MY_CARDS]: (state, { payload }) => payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function myCards (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
