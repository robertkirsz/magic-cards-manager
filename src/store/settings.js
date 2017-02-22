import { updateUserSettings } from 'utils/firebase'

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_SETTING = 'TOGGLE_SETTING'
const CARD_DETAILS_POPUP_DELAY = 'CARD_DETAILS_POPUP_DELAY'
const LOAD_INITIAL_SETTINGS = 'LOAD_INITIAL_SETTINGS'

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
export const loadInitialSettings = settings => ({
  type: LOAD_INITIAL_SETTINGS,
  settings
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_SETTING]: (state, { property, value }) => {
    const newState = { ...state, [property]: value }
    updateUserSettings(newState)
    return newState
  },
  [CARD_DETAILS_POPUP_DELAY]: (state, { delayValue }) => {
    const _delayValue = delayValue === 'false'
      ? false
      : parseInt(delayValue, 10)
    const newState = { ...state, cardDetailsPopupDelay: _delayValue }
    updateUserSettings(newState)
    return newState
  },
  [LOAD_INITIAL_SETTINGS]: (state, { settings }) => settings
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
