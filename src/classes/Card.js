import _find from 'lodash/find'
import _forEach from 'lodash/forEach'

export default class Card {
  constructor (card) {
    this.update(card)
    this.image = `http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${this.multiverseid}`
    this.setIcon = `ss ss-${card.setCode} ss-${card.rarity.toLowerCase()}`
    if (!this.cardUrl) this.cardUrl = this.imageName.split(' ').join('-')
  }

  update (raw) {
    for (const prop in raw) this[prop] = raw[prop]
  }

  decrease (variantId) {
    // This mutates the object, so make sure to call it on a copied card
    const variantToUpdate = _find(this.variants, { id: variantId })
    variantToUpdate.cardsInCollection--
    this.cardsInCollection--
  }

  copy () {
    return new Card(this)
  }

  formatForFirebase () {
    const { cardsInCollection, variants } = this

    const formattedCard = { cardsInCollection }

    if (variants) {
      formattedCard.variants = {}
      _forEach(variants, variant => {
        formattedCard.variants[variant.id] = variant.formatForFirebase()
      })
    }

    return formattedCard
  }
}
