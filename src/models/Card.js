import Generic from './Generic'
// import _ from 'lodash'

export default class Card extends Generic {
  constructor (card) {
    super(card)
    this.update(card)
    if (!this.cardsInCollection) this.cardsInCollection = 1
  }

  update (raw) {
    // if (raw.first_name)      this.first_name = raw.first_name
    for (var prop in raw) {
      this[prop] = raw[prop]
    }
  }

  increase () {
    this.cardsInCollection++
  }

  decrease () {
    this.cardsInCollection--
  }

  formatForWire () {
    const forWire = {}

    for (var prop in this) {
      if (this[prop]) forWire[prop] = this[prop]
    }

    return forWire
  }
}
