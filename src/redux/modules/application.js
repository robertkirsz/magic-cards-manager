// import Card from 'models/Card'

// const _ = require('lodash')

// const updateLocalStorage = (state) => {
//   localStorage.setItem('mtgdbApplicationStateRK', JSON.stringify(state))
// }

// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_LOCK = 'TOGGLE_LOCK'
export const ACTIVATE_DECK = 'ACTIVATE_DECK'

// ------------------------------------
// Actions
// ------------------------------------
export const toggleLock = () => ({
  type: TOGGLE_LOCK
})

export const activateDeck = (deckId) => ({
  type: ACTIVATE_DECK,
  payload: deckId
})

export const actions = {
  toggleLock,
  activateDeck
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_LOCK]: (state) => {
    // updateLocalStorage(newState)
    return {
      ...state,
      locked: !state.locked
    }
  },
  [ACTIVATE_DECK]: (state, { payload }) => {
    return {
      ...state,
      activeDeck: state.activeDeck === payload ? null : payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  locked: false,
  activeDeck: null
}
export default function temporaryCollectionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
