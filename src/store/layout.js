// ------------------------------------
// Constants
// ------------------------------------
const SAVE_HEADER_HEIGHT = 'SAVE_HEADER_HEIGHT'
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export const saveHeaderHeight = headerHeight => ({ type: SAVE_HEADER_HEIGHT, headerHeight })
export const openModal = (name, props) => ({ type: OPEN_MODAL, name, props })
export const closeModal = () => ({ type: CLOSE_MODAL })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_HEADER_HEIGHT]: (state, { headerHeight }) => ({ ...state, headerHeight }),
  [OPEN_MODAL]: (state, { name, props }) => ({ ...state, modal: { name, props } }),
  [CLOSE_MODAL]: state => ({ ...state, modal: { name: '', props: {} } })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  headerHeight: 42,
  modal: {
    name: '',
    props: {}
  }
}

export default function layoutReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
