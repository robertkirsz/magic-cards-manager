import _ from 'lodash'
import Card from 'classes/Card'

const updateLocalStorage = (cardMyCards) => {
  // const reducedMyCards = _.map(cardMyCards, (singleCard) => singleCard.formatForLocalStorage())
  // localStorage.setItem('mtgdbReducedMyCardsRK', JSON.stringify(reducedMyCards))
}

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const CLEAR_MY_CARDS = 'CLEAR_MY_CARDS'
export const RESTORE_MY_CARDS = 'RESTORE_MY_CARDS'

// ------------------------------------
// Actions
// ------------------------------------
export const addCard = (card, variant) => ({
  type: ADD_CARD, card, variant
})

export const removeCard = (card) => ({
  type: REMOVE_CARD,
  payload: card
})

export const clearMyCards = () => ({
  type: CLEAR_MY_CARDS
})

export const restoreMyCards = (cards) => ({
  type: RESTORE_MY_CARDS,
  payload: cards
})

export const actions = {
  addCard,
  removeCard,
  clearMyCards,
  restoreMyCards
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_CARD]: (state, { card, variant }) => {
    console.log('%cADD_CARD', 'color: #A1C659;', variant)
    // Make copies of both main card and its chosen variant
    let cardCopy = card.copy()
    const variantCopy = variant.copy()
    // Copy card collection from store
    let cardsCollection = [...state.cards]
    // Check if this card already exists in collection
    const cardInCollection = _.find(cardsCollection, cardFromCollection => cardFromCollection.name === cardCopy.name)
    // If it does...
    if (cardInCollection) {
      console.log('%c   existing card', 'color: #A1C659;')
      // Reassign it as a 'cardCopy'
      cardCopy = cardInCollection.copy()
      // Check if it contains chosen variant
      const variantToUpdate = _.find(cardCopy.variants, { id: variantCopy.id })
      // If it does...
      if (variantToUpdate) {
        console.log('%c   variant exists', 'color: #A1C659;')
        // Increment its count
        variantToUpdate.cardsInCollection++
      // In other case...
      } else {
        console.log('%c   variant does not exist', 'color: #A1C659;')
        // Set variant's count to 1
        variantCopy.cardsInCollection = 1
        // Insert it into main card
        cardCopy.variants.push(variantCopy)
      }
      // Increment main card's count
      cardCopy.cardsInCollection++
      // Get that card's index in the collection
      const cardIndex = _.findIndex(cardsCollection, cardFromCollection => cardFromCollection.name === card.name)
      // Use that index to insert the updated card into the collection
      cardsCollection = [
        ...cardsCollection.slice(0, cardIndex),
        cardCopy,
        ...cardsCollection.slice(cardIndex + 1)
      ]
      // Save changes to Local Storage
      updateLocalStorage(cardsCollection)
      console.warn('cardsCollection', cardsCollection)
      // Update the store
      return {
        ...state,
        cards: cardsCollection
      }
    }

    // If chosen card doesn't exist in the collection yet...
    console.log('%c   new card', 'color: #A1C659;')
    // Set both its chosen variant's counts to one
    cardCopy.cardsInCollection = 1
    variantCopy.cardsInCollection = 1
    // Add variant to the main card
    cardCopy.variants = [variantCopy]
    // Add the main card to the collection
    cardsCollection.push(cardCopy)
    // Save changes to Local Storage
    updateLocalStorage(cardsCollection)
    // Update the store
    return {
      ...state,
      cards: cardsCollection
    }
  },
  [REMOVE_CARD]: (state, { payload }) => {
    console.log('%cREMOVE_CARD payload', 'color: #A1C659;', payload)
    let cardsArray = []
    const cardIndex = _.findIndex(state, (objectInState) => objectInState.id === payload.id)
    const cardFromState = _.find(state, (objectInState) => objectInState.id === payload.id)

    if (cardFromState.cardsInMyCards > 1) {
      // If more then one card
      const foo = new Card(cardFromState)
      foo.decrease()
      cardsArray = [
        ...state.slice(0, cardIndex),
        foo,
        ...state.slice(cardIndex + 1)
      ]
      updateLocalStorage(cardsArray)

      return {
        ...state,
        cards: cardsArray
      }
    }

    // If only one card
    cardsArray = [
      ...state.slice(0, cardIndex),
      ...state.slice(cardIndex + 1)
    ]

    updateLocalStorage(cardsArray)

    return {
      ...state,
      cards: cardsArray
    }
  },
  [CLEAR_MY_CARDS]: (state) => initialState,
  [RESTORE_MY_CARDS]: (state, { payload }) => payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  cards: [],
  filteredCards: null
}

export default function myCards (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
