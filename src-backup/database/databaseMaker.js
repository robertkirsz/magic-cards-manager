// -------------
// This file sends request for cards
// and returns an object
// -------------

import _ from 'lodash'

export default () => {
  const $ = window.jQuery

  return $.ajax({
    url: 'https://mtgjson.com/json/AllSets.json',
    dataType: 'json',
    cache: true
  })
  .done((allSets) => {
    const allCards = [] // Will contain every single Magic card
    const uniqueCards = {} // Will contain unique cards
    const latestSet = allSets[allSets.length - 1]
    // Get every Magic card
    _.forEach(allSets, set => allCards.push(...set.cards))
    // Group them by name: { 'Naturalize': { (...), variants: [{...}, {...}] } }
    _.forEach(allCards, (card) => {
      uniqueCards[card.name] = {
        ...card,
        variants: uniqueCards[card.name] ?
          [...uniqueCards[card.name].variants, card] : []
      }
    })
    return {
      magicCards: uniqueCards,
      latestSet,
      setsNumber: allSets.length,
      uniqueCardsNumber: uniqueCards.length
    }
  })
  .fail((error) => {
    console.error('❌ Error while fetching database', error)
    return false
  })
}
