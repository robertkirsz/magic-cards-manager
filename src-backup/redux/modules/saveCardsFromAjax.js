// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_CARDS = 'SAVE_CARDS'

// ------------------------------------
// Actions
// ------------------------------------
export const saveCards = (array) => ({
  type: SAVE_CARDS,
  payload: array
})

export const actions = {
  saveCards
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_CARDS]: (state, { payload }) => {
    console.log('%cSAVE_CARDS payload', 'color: #A1C659;', payload)
    return {
      ...state,
      [payload.name]: payload.data
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  allCards: [],
  allSets: []
}

export default function saveCardsFromAjaxReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
