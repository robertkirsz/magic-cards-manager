// ------------------------------------
// Constants
// ------------------------------------
const SAVE_HEADER_HEIGHT = 'SAVE_HEADER_HEIGHT'
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const OPEN_SEARCH_MODULE = 'OPEN_SEARCH_MODULE'
const CLOSE_SEARCH_MODULE = 'CLOSE_SEARCH_MODULE'

// ------------------------------------
// Actions
// ------------------------------------
export const saveHeaderHeight = headerHeight => ({ type: SAVE_HEADER_HEIGHT, headerHeight })
export const openModal = (name, props) => ({ type: OPEN_MODAL, name, props })
export const closeModal = () => ({ type: CLOSE_MODAL })
export const openSearchModule = () => ({ type: OPEN_SEARCH_MODULE })
export const closeSearchModule = () => ({ type: CLOSE_SEARCH_MODULE })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_HEADER_HEIGHT]: (state, { headerHeight }) => ({ ...state, headerHeight }),
  [OPEN_MODAL]: (state, { name, props = {} }) => ({ ...state, modal: { name, props } }),
  [CLOSE_MODAL]: state => ({ ...state, modal: { name: '', props: {} } }),
  [OPEN_SEARCH_MODULE]: state => ({ ...state, searchModule: true }),
  [CLOSE_SEARCH_MODULE]: state => ({ ...state, searchModule: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  headerHeight: 42,
  searchModule: false,
  modal: {
    name: '',
    props: {}
  }
}

export default function layoutReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
