// ------------------------------------
// Actions
// ------------------------------------
export const setMainCardFocus = index => ({ type: 'SET_MAIN_CARD_FOCUS', index })
export const resetMainCardFocus = () => ({ type: 'RESET_MAIN_CARD_FOCUS' })
export const setVariantCardFocus = index => ({ type: 'SET_VARIANT_CARD_FOCUS', index })
export const resetVariantCardFocus = () => ({ type: 'RESET_VARIANT_CARD_FOCUS' })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  SET_MAIN_CARD_FOCUS: (state, { index }) => ({ ...state, mainCardFocusSetIndex: index }),
  RESET_MAIN_CARD_FOCUS: state => ({ ...state, mainCardFocusResetIndexTimestamp: Date.now() }),
  SET_VARIANT_CARD_FOCUS: (state, { index }) => ({ ...state, variantCardFocusSetIndex: index }),
  RESET_VARIANT_CARD_FOCUS: state => ({ ...state, variantCardFocusResetIndexTimestamp: Date.now() })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  mainCardFocusSetIndex: null,
  mainCardFocusResetIndexTimestamp: 0,
  variantCardFocusSetIndex: null,
  variantCardFocusResetIndexTimestamp: 0
}

export default (state = initialState, action) => ACTION_HANDLERS[action.type]
  ? ACTION_HANDLERS[action.type](state, action)
  : state
