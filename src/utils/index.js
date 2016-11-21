import _ from 'lodash'
import { Card } from 'classes'

// Reads collection from the Local Storage
export const loadLocalStorage = (allCards) => {
  try {
    const retrievedCollection = localStorage.getItem('mtgdbReducedCollectionRK')
    // Return empty array if there's nothing in the Local Storage
    if (retrievedCollection === null) return []

    // TODO: comments and refactoring

    const loadedCollection = _.map(JSON.parse(retrievedCollection), (retrievedCard) => {
      const mainCard = new Card(_.find(allCards, { id: retrievedCard.id }))
      mainCard.cardsInCollection = retrievedCard.cardsInCollection
      mainCard.variants = _.map(retrievedCard.variants, (variant) => {
        const foo = new Card(_.find(mainCard.variants, { id: variant.id }))
        foo.cardsInCollection = variant.cardsInCollection
        return foo
      })
      return mainCard
    })

    return loadedCollection
  } catch (error) {
    console.error('ERROR loadLocalStorage', error)
    return false
  }
}

// Reformats the collections and saves it in the Local Storage
export const saveLocalStorage = (collection) => {
  try {
    const reducedCollection = _.map(collection, singleCard => singleCard.formatForLocalStorage())
    const serializedCollection = JSON.stringify(reducedCollection)
    localStorage.setItem('mtgdbReducedCollectionRK', serializedCollection)
    return true
  } catch (error) {
    console.error('ERROR saveLocalStorage', error)
    return false
  }
}
