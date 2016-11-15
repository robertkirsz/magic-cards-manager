import _ from 'lodash'

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

export const removeCard = (card, variant) => ({
  type: REMOVE_CARD, card, variant
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
    console.log('%cADD_CARD', 'color: #A1C659;', variant.name)
    // Make copies of both main card and its chosen variant
    let cardCopy = card.copy()
    const variantCopy = variant.copy()
    // Copy card collection from store
    let cardsCollection = [...state.cards]
    // Check if this card already exists in collection
    const cardsInCollection = _.find(cardsCollection, cardFromCollection => cardFromCollection.name === cardCopy.name)
    // If it does...
    if (cardsInCollection) {
      // Reassign it as a 'cardCopy'
      cardCopy = cardsInCollection.copy()
      // Check if it contains chosen variant
      const variantToUpdate = _.find(cardCopy.variants, { id: variantCopy.id })
      // If it does...
      if (variantToUpdate) {
        console.log('%c   existing card - existing variant - incrementing', 'color: #A1C659;')
        // Increment its count
        variantToUpdate.cardsInCollection++
      // In other case...
      } else {
        console.log('%c   existing card - new variant', 'color: #A1C659;')
        // Set variant's count to 1
        variantCopy.cardsInCollection = 1
        // Insert it into main card
        cardCopy.variants.push(variantCopy)
      }
      // Increment main card's count
      cardCopy.cardsInCollection++
      // Get that card's index in the collection
      const cardIndex = _.findIndex(cardsCollection, cardFromCollection => cardFromCollection.id === cardCopy.id)
      // Use that index to insert the updated card into the collection
      cardsCollection = [
        ...cardsCollection.slice(0, cardIndex),
        cardCopy,
        ...cardsCollection.slice(cardIndex + 1)
      ]
      // Save changes to Local Storage
      updateLocalStorage(cardsCollection)
      // Update the store
      return {
        ...state,
        cards: cardsCollection
      }
    }

    // If chosen card doesn't exist in the collection yet...
    console.log('%c   new card - new variant', 'color: #A1C659;')
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
  [REMOVE_CARD]: (state, { card, variant }) => {
    console.log('%cREMOVE_CARD payload', 'color: #A1C659;', variant.name)
    // Copy card collection from store
    let cardsCollection = [...state.cards]
    // Make copies of both main card and its chosen variant
    let cardCopy = _.find(cardsCollection, { id: card.id }).copy()
    const variantCopy = _.find(cardCopy.variants, { id: variant.id }).copy()
    // Find their respective indexes
    const cardIndex = _.findIndex(cardsCollection, cardFromCollection => cardFromCollection.id === cardCopy.id)
    const variantIndex = _.findIndex(cardCopy.variants, cardVariant => cardVariant.id === variantCopy.id)

    // If there is only one main card...
    if (cardCopy.cardsInCollection === 1) {
      console.log('%c   only one main card - removing it', 'color: #A1C659;')
      // Remove it from the collection
      cardsCollection = [
        ...cardsCollection.slice(0, cardIndex),
        ...cardsCollection.slice(cardIndex + 1)
      ]
    }

    // If there are more copies of the main card...
    if (cardCopy.cardsInCollection > 1) {
      // If there is only one card of the chosen variant...
      if (variantCopy.cardsInCollection === 1) {
        console.log('%c   only one variant card - removing it', 'color: #A1C659;')
        // Remove it from the main card
        cardCopy.variants = [
          ...cardCopy.variants.slice(0, variantIndex),
          ...cardCopy.variants.slice(variantIndex + 1)
        ]
      }

      // If there are more copies of the chosen variant...
      if (variantCopy.cardsInCollection > 1) {
        console.log('%c   more variant cards - decrementing', 'color: #A1C659;')
        // Decrement it
        variantCopy.cardsInCollection--
        // Update main card's varaint array
        cardCopy.variants = [
          ...cardCopy.variants.slice(0, variantIndex),
          variantCopy,
          ...cardCopy.variants.slice(variantIndex + 1)
        ]
      }

      // Decrement the main card
      cardCopy.cardsInCollection--
      // Update the cards collection
      cardsCollection = [
        ...cardsCollection.slice(0, cardIndex),
        cardCopy,
        ...cardsCollection.slice(cardIndex + 1)
      ]
    }

    // Save changes to Local Storage
    updateLocalStorage(cardsCollection)
    // Update the store
    return {
      ...state,
      cards: cardsCollection
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
