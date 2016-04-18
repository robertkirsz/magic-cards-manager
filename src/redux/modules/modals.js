import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export const openModal = (modalId) => ({
  type: OPEN_MODAL,
  payload: modalId
})

export const closeModal = (modalId) => ({
  type: CLOSE_MODAL,
  payload: modalId
})

export const actions = {
  openModal,
  closeModal
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OPEN_MODAL]: (state, { payload }) => {
    if (_.indexOf(state, payload) >= 0) return state
    return [
      // ...state,
      payload
    ]
  },
  [CLOSE_MODAL]: (state, { payload }) => {
    const modalIndex = _.indexOf(state, payload)
    return [
      ...state.slice(0, modalIndex),
      ...state.slice(modalIndex + 1)
    ]
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default function temporaryCollectionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
