export default class Card {
  constructor (card) {
    this.update(card)
    this.image = `http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${this.multiverseid}`
    if (!this.cardUrl) this.cardUrl = this.imageName.split(' ').join('-')
    // this.variants = (this.variants || []).map(card => new Card(card))
  }

  update (raw) {
    for (const prop in raw) this[prop] = raw[prop]
  }

  formatForLocalStorage () {
    const forLocalStorage = {}

    if (this.id) forLocalStorage.id = this.id
    if (this.cardsInCollection) forLocalStorage.cardsInCollection = this.cardsInCollection
    if (this.setIcon) forLocalStorage.setIcon = this.setIcon

    return forLocalStorage
  }
}
