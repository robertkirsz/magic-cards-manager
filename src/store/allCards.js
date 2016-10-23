import _ from 'lodash'
import moment from 'moment'
import { fetchAllSets } from 'api'
import { Card } from 'classes'

// ------------------------------------
// Constants
// ------------------------------------
export const ALL_CARDS_REQUEST = 'ALL_CARDS_REQUEST'
export const ALL_CARDS_SUCCESS = 'ALL_CARDS_SUCCESS'
export const ALL_CARDS_ERROR   = 'ALL_CARDS_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const sendRequest = () => ({ type: ALL_CARDS_REQUEST })
export const responseSuccess = (allSets) => ({ type: ALL_CARDS_SUCCESS, allSets })
export const responseError = (error) => ({ type: ALL_CARDS_ERROR, error })
export const getCards = () => {
  return (dispatch, getState) => {
    // Return if request is pending
    if (getState().allCards.fetching) return
    // Dispatch action so we can show spinner
    dispatch(sendRequest())
    //  Send and return API request
    return fetchAllSets()
      .then((response) => {
        // Throw error if something's wrong
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
        // Otherwise return response in JSON format
        return response.json()
      })
      .then((allSets) => dispatch(responseSuccess(allSets))) // Get the response and return all Magic sets
      .catch((error) => dispatch(responseError(error))) // Catch any errors
  }
}

export const actions = {
  sendRequest,
  responseSuccess,
  responseError,
  getCards
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ALL_CARDS_REQUEST]: (state, action) => {
    return state.fetching ? state : { ...state, fetching: true, error: null }
  },
  [ALL_CARDS_SUCCESS]: (state, action) => {
    const { allSets } = action

    const allCards = [] // Will contain every single Magic card
    const uniqueCards = {} // Will contain unique cards
    // Compares release dates and chooses the latest one
    const latestSet = _.reduce(allSets, (result, value, key) => {
      if (!result.releaseDate) return value
      return moment(value.releaseDate).isAfter(result.releaseDate) ? value : result
    }, {})
    // Get every Magic card
    _.forEach(allSets, (set) => allCards.push(...set.cards))
    // Group them by name: { 'Naturalize': { (...), variants: [{...}, {...}] } }
    _.forEach(allCards, (card) => {
      uniqueCards[card.name] = {
        ...card,
        variants: uniqueCards[card.name] ? [...uniqueCards[card.name].variants, card] : []
      }
    })
    // Convert object to an array
    let arrayOfCards = _.map(uniqueCards, (card) => new Card(card))
    // Hide basic lands
    arrayOfCards = _.reject(arrayOfCards, (card) => _.get(card, 'supertypes[0]') === 'Basic')
    // Remove tokens
    arrayOfCards = _.reject(arrayOfCards, { layout: 'token' })

    return {
      ...state,
      fetching: false,
      error: null,
      cards: arrayOfCards,
      cardsNumber: arrayOfCards.length,
      latestSet
    }
  },
  [ALL_CARDS_ERROR]: (state, action) => {
    return { ...state, fetching: false, error: action.error }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  error: null,
  cards: {},
  cardsNumber: 0,
  latestSet: {}
}

export default function allCards (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
