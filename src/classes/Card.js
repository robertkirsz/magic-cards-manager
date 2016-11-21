import _ from 'lodash'

export default class Card {
  constructor (card) {
    this.update(card)
    this.image = `http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${this.multiverseid}`
    this.setIcon = `setIcon ss ss-${card.setCode} ss-${card.rarity.toLowerCase()}`
    if (!this.cardUrl) this.cardUrl = this.imageName.split(' ').join('-')
  }

  update (raw) {
    for (const prop in raw) this[prop] = raw[prop]
  }

  decrease (variantId) {
    // This mutates the object, so make sure to call it on a copied card
    const variantToUpdate = _.find(this.variants, { id: variantId })
    variantToUpdate.cardsInCollection--
    this.cardsInCollection--
  }

  copy () {
    return new Card(this)
  }

  formatForLocalStorage () {
    return {
      id: this.id,
      cardsInCollection: this.cardsInCollection,
      variants: this.variants
        ? this.variants.map(variant => variant.formatForLocalStorage())
        : undefined
    }
  }
}
