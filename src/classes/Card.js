export default class Card {
  constructor (card) {
    this.update(card)
    this.image = `http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${this.multiverseid}`
  }

  update (raw) {
    for (var prop in raw) {
      this[prop] = raw[prop]
    }
  }

  formatForLocalStorage () {
    const forLocalStorage = {}

    if (this.id) forLocalStorage.id = this.id
    if (this.cardsInCollection) forLocalStorage.cardsInCollection = this.cardsInCollection
    if (this.setIcon) forLocalStorage.setIcon = this.setIcon

    return forLocalStorage
  }
}
