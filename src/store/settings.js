// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_SETTING = 'TOGGLE_SETTING'
const CARD_DETAILS_POPUP_DELAY = 'CARD_DETAILS_POPUP_DELAY'

// ------------------------------------
// Actions
// ------------------------------------
export const toggleSetting = (property, value) => ({
  type: TOGGLE_SETTING,
  property,
  value
})
export const changeCardDetailsPopupDelay = delayValue => ({
  type: CARD_DETAILS_POPUP_DELAY,
  delayValue
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_SETTING]: (state, { property, value }) => ({
    ...state,
    [property]: value
  }),
  [CARD_DETAILS_POPUP_DELAY]: (state, { delayValue }) => {
    const _delayValue = delayValue === 'false'
      ? false
      : parseInt(delayValue, 10)
    return { ...state, cardDetailsPopupDelay: _delayValue }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  cardDetailsPopupDelay: 1000,
  cardModalAnimation: true,
  cardHoverAnimation: true
}

export default function settingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
