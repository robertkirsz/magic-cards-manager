// ------------------------------------
// Actions
// ------------------------------------
export const setMainCardFocus = () => ({ type: 'SET_MAIN_CARD_FOCUS' })
export const resetMainCardFocus = () => ({ type: 'RESET_MAIN_CARD_FOCUS' })
export const setVariantCardFocus = () => ({ type: 'SET_VARIANT_CARD_FOCUS' })
export const resetVariantCardFocus = () => ({ type: 'RESET_VARIANT_CARD_FOCUS' })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  SET_MAIN_CARD_FOCUS: state => ({ ...state, mainCardFocusSetTimestamp: Date.now() }),
  RESET_MAIN_CARD_FOCUS: state => ({ ...state, mainCardFocusResetTimestamp: Date.now() }),
  SET_VARIANT_CARD_FOCUS: state => ({ ...state, variantCardFocusSetTimestamp: Date.now() }),
  RESET_VARIANT_CARD_FOCUS: state => ({ ...state, variantCardFocusResetTimestamp: Date.now() })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  mainCardFocusSetTimestamp: null,
  mainCardFocusResetTimestamp: null,
  variantCardFocusSetTimestamp: null,
  variantCardFocusResetTimestamp: null
}

export default (state = initialState, action) => ACTION_HANDLERS[action.type]
  ? ACTION_HANDLERS[action.type](state, action)
  : state
