import Generic from './Generic'
import _ from 'lodash'

export default class Deck extends Generic {
  constructor (deck) {
    super(deck)
    this.update(deck)
  }

  update (raw) {
    this.name = raw.name
    this.cards = raw.cards || []

    // for (var prop in raw) {
    //   if (raw[prop]) this[prop] = raw[prop]
    // }
  }

  addCard (cardId) {
    // Check if this card is in deck already
    // const cardInDeck = _.find(this.cards, (card) => card.id === cardId)
    const cardInDeckIndex = _.findIndex(this.cards, (card) => card.name === cardId)
    console.log('cardInDeckIndex', cardInDeckIndex)
    // If it is in deck already, increase it's amount
    if (cardInDeckIndex !== -1) {
      this.cards[cardInDeckIndex].amount = this.cards[cardInDeckIndex].amount + 1
    } else {
      // If not, add it to the deck
      this.cards.push({
        name: cardId,
        amount: 1
      })

      console.log('this.cards', this.cards);
    }

    this.updatedAt = new Date()
  }

  formatForWire () {
    const forWire = {}

    for (var prop in this) {
      if (this[prop]) forWire[prop] = this[prop]
    }

    return forWire
  }
}
