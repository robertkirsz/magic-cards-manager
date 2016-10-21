import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export const openModal = (modalData) => ({
  type: OPEN_MODAL,
  payload: modalData
})

export const closeModal = () => ({
  type: CLOSE_MODAL
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
    // console.log('OPEN_MODAL state', state)
    // console.log('OPEN_MODAL payload', payload)
    // if (_.indexOf(state, payload) >= 0) return state
    return payload
  },
  [CLOSE_MODAL]: () => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null

export default function temporaryCollectionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
