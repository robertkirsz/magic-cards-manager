// ------------------------------------
// Actions
// ------------------------------------
export const turnOnKeyboardMode = () => ({ type: 'TURN_ON_KEYBOARD_MODE' })
export const turnOffKeyboardMode = () => ({ type: 'TURN_OFF_KEYBOARD_MODE' })
export const toggleKeyboardMode = () => ({ type: 'TOGGLE_KEYBOARD_MODE' })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  TURN_ON_KEYBOARD_MODE: state => ({ ...state, keyboardMode: true }),
  TURN_OFF_KEYBOARD_MODE: state => ({ ...state, keyboardMode: false }),
  TOGGLE_KEYBOARD_MODE: state => ({ ...state, keyboardMode: !state.keyboardMode })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  keyboardMode: false
}

export default function keyboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
