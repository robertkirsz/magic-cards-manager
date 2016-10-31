export default class Card {
  constructor (card) {
    this.update(card)
    this.image = `http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${this.multiverseid}`
    if (!this.cardUrl) this.cardUrl = this.imageName.split(' ').join('-')
    if (!this.cardsInCollection) this.cardsInCollection = 1
  }

  update (raw) {
    for (const prop in raw) this[prop] = raw[prop]
  }

  increase () {
    this.cardsInCollection++
  }

  decrease () {
    this.cardsInCollection--
  }

  formatForLocalStorage () {
    const forLocalStorage = {}

    if (this.id) forLocalStorage.id = this.id
    if (this.cardsInCollection) forLocalStorage.cardsInCollection = this.cardsInCollection
    if (this.setIcon) forLocalStorage.setIcon = this.setIcon

    return forLocalStorage
  }
}
