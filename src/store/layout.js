// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_HEADER_HEIGHT = 'SAVE_HEADER_HEIGHT'

// ------------------------------------
// Actions
// ------------------------------------
export const saveHeaderHeight = (headerHeight) => ({ type: SAVE_HEADER_HEIGHT, headerHeight })

export const actions = {
  saveHeaderHeight
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_HEADER_HEIGHT]: (state, action) => {
    return { ...state, headerHeight: action.headerHeight }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  headerHeight: 42
}

export default function layout (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
